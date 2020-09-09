# Hook

## hook要解决的问题

1. 在``Calss Component``类组件间复用状态逻辑很难，React之前解决复用问题的思路是：``render props``和高阶组件，缺点是难理解、存在过多的嵌套形成“嵌套地狱”
2. 复杂的``Class Component``类组件会变得难以理解：类组件的生命周期函数中会充斥这各种状态逻辑和副作用，这些副作用难以复用，且很零散，如在``comoinentDidMount``和``componentDidUpdate``中获取数据，但是在``componentDidUpdate``中获取数据，但是在``componentDidMount``中可能也包括很多其他的逻辑，使得组件越开发越臃肿，且逻辑明显扎堆在各种生命周期函数中，是的React开发成为了“面向生命周期编程”。
3. ``Class Component``难以理解的问题，比如说：
   1. this指针问题
   2. 组件预编译技术会在class中遇到优化失败的care
   3. class不能很好的压缩
   4. class在热重载时会出现不稳定的情况

React团队希望v16版本推出的hook可以解决掉上面的问题，然而在实现hook的时候也要解决掉一些难点：

1. ``Class Component``可以永杰储存实例的状态，而``Function Component``却不能，因为每次重新执行函数``state``都会被重新赋值为0

2. 每一个``Class Component``的实例都拥有一个成员函数``this.setState``用以改变自身的状态，而``Function Component``只是一个函数，并不能拥有``this.setState``这种用法，只能通过全局的setState方法，或者其他方法来实现对应。

3. 在某一个组件中，会存在多次hook的更新调用，我们不希望每一次更新都产生一次渲染，比如说下面

   ```typescript
   setAge(18);
   setAge(19);
   setAge(20);
   ```

   我们只关心最后一个更新计算出来的值。

4. ......

为了解决上面的难点，React团队设计了Hook架构的核心逻辑，借助闭包、两个链表（一个组件的hook调用链表，每一个hook对象都有很多``update``组成的链表``queue``）和透传``dispatch``源码

## hook对象的结构

```typescript
type Hook = {
    memoizedState: any, // 上次更新之后的最终状态值
    queue: UpdateQueue, // 更新队列
    next: Hook, // 下一个hook对象
}
```

上面的``next``指针时做什么用的呢？

在一个``Functional Component``中可以多次调用``hook``，如下面一样：

```tsx
let [name, setName] = useState('');
let [age, setAge] = useState(0);
```

每次调用一次hook方法，都会生成一个hook对象，上面的代码调用了两次``setState``会生成两个``hook``对象，这两个``hook``是通过``next``指针**串联成了一个链表**，如下图所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddadaf4161b0459f8e86d0ca19e29606~tplv-k3u1fbpfcp-zoom-1.image)

## Update对象的数据结构

```typescript
type Update = {
    expirationTime: ExpirationTime, // 过期时间
    action: A, // 修改动作
    eagerReducer: ((S, A) => S) | null, // 下一个reducer
    eagerState: S | null, // 下一次的state
    next: Update | null, // 下一个update
}
```

update对象上记录了数据变更的信息，会发现上面有next指针，多个update对象也串联成一个链表的结构。

## queue对象的数据结构

上面的update会组成一个链表，记录在queue对象的last属性中，不同版本的react的变量名略有差异，新版本的react是``pending``属性，这里需要注意由于我们需要插入update对象，然后在最后遍历链表进行计算，所以update组成的是一个``环状链表``，last指向最后一个update，对应update的next即为第一个update。

```typescript
type queue = {
    last: Update | null, // 记录了第一个update对象
    dispatch,
    lastRenderedReducer,
    lastRenderedState,
}
```

在react源码中，上面三个最核心 的数据结构：``hook,queue,update``是存在引用关系的，如下图所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0139df4cd9204b72a1d916f28ceb23d6~tplv-k3u1fbpfcp-zoom-1.image)

```typescript
// 链表
interface HooK {
  queue: Queue;
  next: HooK;
}

interface Queue {
  dispatch: any;
  last: Update; // update链表的head
}

// 环状链表结构
interface Update {
  action: any; // 动作
  next: Update;
}

// 组件
interface Com {
  // 设置setState('') setState(0)
  hook: HooK // hook链表的head
}
```

## useState()

React中大部分hook分为两个阶段：第一次初始化mount阶段和更新时update阶段。

useState也不例外，对应了两个方法：

1. mountState
2. updateState

### mountState

mountState方法中做了什么

1. 生成一个hook对象，并挂载到fiber对象的memoizedState属性所指向的链表中
2. 生成hook对象的memoizedState属性用来记录更新的值，生成hook对象的queue属性，也就是初始化的update链表
3. 生成dispatch方法返回给用户，dispatch就是我们拿到的解构的第二个参数

详细的源码解析如下：

```typescript
export type Hook = {|
  memoizedState: any,
  baseState: any,
  baseQueue: Update<any, any> | null,
  queue: UpdateQueue<any, any> | null,
  next: Hook | null,
|};

function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  // 
  return typeof action === 'function' ? action(state) : action;
}

let currentlyRenderingFiber: Fiber = (null: any);
let workInProgressHook: Hook | null = null;

function mountState<S>(initialState: (() => S) | S):[S, Dispatch<BasicStateAction<S>>] {
    const hook = mountWorkInProgressHook(); // 空的链表位置
    if (typeof initialState === 'funciton') {
        initialState = initialState();
    }
    hook.memoizedState = hook.baseState = initialState; // 初始化值
    // 初始化更新队列（一个hook可能会产生多个update,通过queue对象来记录update链表,queue.pending指向了update链表中的第一个(head),queue.dispatch记录解构给用户的disoatch）
    const queue = (hook.queue = {
        pending: null,
        dispatch: null, // 用以修改值, 解构出来的第二个参数
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: (initialState: any),
    });
    // 调用.bind预注入fiber和hook.queue
    const dispatch: Dispatch<BasicStateAction<S>> = (queue.dispatch =   (dispatchAction.bind(
    null,
    currentlyRenderingFiber, // 当前的实例
    queue
    ): any));
    // type Dispatch<A> = A => void; 
    // dispatch接收一个参数, 返回值为空
    // 接收参数后 => 参数A => dispatchAction(null, currentlyRenderingFiber, queue, A)
    // 前三个参数为预注入
    return [hook.memoizedState, dispatch];
}

// 判断Component的Hook链表是否初始化完成(已创建)
function mountWorkInProgressHook(): Hook {
    const hook: Hook = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
    };
    if (workInProgressHook === null) {
        // 初始化链表
        currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
    } else {
        // 如果已存在链表，则在链表后方接入一个空的hook对象
        workInProgressHook = workInProgressHook.next = hook;
    }
    return workInProgressHook
}
```

上面的代码需要注意的是，dispatch方法是通过``dispatchAction.bind()``生成的，然后挂载到了hook对象的queue属性上。

用户在初始化时每调用一次``hook Api``都会生成一个独一无二的dispatch方法。

dispatch的生成：bind方法除了改变this的指向，还可以预注入参数。上面的代码的这一行操作``dispatchAction.bind``，实际上的作用除了把this绑定到null上，同事生成了一个新的方法，新方法提前预注入了fiber(当前fiber对象)和hook.queue。当我们在业务代码中调用``setName('aaa')``时，实际上调用和入参的是``dispatch(fiber, hook.queue, 'aaa')``。也就是说，一个``functionalComponent``里可以调用多次hook方法，从而对应的fider对象和hook对象之间存在一对多的关系，这种关系是通过``bind()``预注入参数的方式记录在新生成的函数中，也可以说是闭包，因为新生成的函数中保持对fiber和hook这两个变量的引用，从而不会被js引擎的垃圾回收销毁，hook对象身上记录了更新信息，从而在``Functional Component``里面实现了数据持久化。

上面的代码，在最开始通过调用``mountWorkInProgressHook``方法新生成了一个hook对象。

## useMemo() 



## useEffect()



## useContext()



## useHistory() [react-router-dom]



## useDispatch() [react-redux]



## useSelector() [react-redux]



