## let var const
var 会出现变量提升的情况
let, const都是块级作用域, 会造成暂时性死区(无法重复声明)

## 数组方法reduce
Array.reduce()接受两个参数：一个是对数组每个元素执行的回调方法，一个是初始值。
这个回调也接受两个参数：accumulator是当前聚合值，current是数组循环时的当前元素。无论你返回什么值，都将作为累加器提供给循环中的下一个元素。初始值将作为第一次循环的累加器。
```
var total = [1, 2, 3].reduce(function (sum, current) {
  return sum + current;
}, 0);

var obj = [
    {a: 1},
    {b: 2},
    {c: 3}
];
var result = obj.reduce((sum, cur) => {
    return {...sum, ...cur}
}, {})
```

## window.onstorage
WindowEventHandlers.onstorage 属性包含一个在storage事件触发时的事件句柄。 当存储域发生改变时会触发事件。(例如： 有新的项被存储)
// 支持性较差, (Chrome, Firefox, Edge)主流浏览器支持, (Safari, Opera, IE, Android Browser)支持性较差
```
window.onstorage = function(e) {
  console.log( e.key + ' 键已经从 ' + e.oldValue + ' 改变为 ' + e.newValue + '.');
};
```

## Event Loop

### 1. Event Loop 是什么?
event loop是一个执行模型，在不同的地方有不同的实现。浏览器和NodeJS基于不同的技术实现了各自的Event Loop。
> 个人理解: js代码的生命周期/执行流程
### 2. 宏队列和微队列
宏队列，macrotask，也叫tasks。 一些异步任务的回调会依次进入macro task queue，等待后续被调用，这些异步任务包括：

* setTimeout
* setInterval
* setImmediate (Node独有)
* requestAnimationFrame (浏览器独有)
* I/O
* UI rendering (浏览器独有)

微队列，microtask，也叫jobs。 另一些异步任务的回调会依次进入micro task queue，等待后续被调用，这些异步任务包括：

* process.nextTick (Node独有)
* Promise
* Object.observe
* MutationObserver

（注：这里只针对浏览器和NodeJS）

步骤详解:
1. 执行全局Script同步代码，这些同步代码有一些是同步语句，有一些是异步语句（比如setTimeout等）；
2. 全局Script代码执行完毕后，调用栈Stack会清空；
3. 从微队列microtask queue中取出位于队首的回调任务，放入调用栈Stack中执行，执行完后 microtask queue长度减1；
4. 继续取出位于队首的任务，放入调用栈Stack中执行，以此类推，直到直到把microtask queue中的所有任务都执行完毕。注意，如果在执行microtask的过程中，又产生了microtask，那么会加入到队列的末尾，也会在这个周期被调用执行；
5. microtask queue中的所有任务都执行完毕，此时microtask queue为空队列，调用栈Stack也为空；
6. 取出宏队列macrotask queue中位于队首的任务，放入Stack中执行；
7. 执行完毕后，调用栈Stack为空；
8. 重复第3-7个步骤；
9. 重复第3-7个步骤；

```
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})

setTimeout(() => {
  console.log(6);
})

console.log(7);

1
4
7
5
2
3
6
```

> promise中的内容是同步执行的, 回调是异步的

> 详情见参考链接

> 参考 https://segmentfault.com/a/1190000016278115


promise有几种状态，什么时候会进入catch？

三个状态：
pending、fulfilled、reject
两个过程：
padding -> fulfilled、padding -> rejected当pending为rejectd时，会进入catch
* pending：初始状态，既不是成功也不是失败
* fulfilled：意味着操作完全成功
* rejected：意味着操作失败
reject 是用来抛出异常，catch 是用来处理异常
reject 是 Promise 的方法，而 catch 是 Promise 实例的方法
reject后的东西，一定会进入then中的第二个回调，如果then中没有写第二个回调，则进入catch
网络异常（比如断网），会直接进入catch而不会进入then的第二个回调