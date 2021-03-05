// js的基本数据类型
/**
 * 1. string
 * 2. number
 * 3. null
 * 4. undefined
 * 5. boolean
 * 6. bigint
 * 7. symbol
 * 8. Object
 */

// js中number的存储空间有多少
/**
 * js中number的最大值为Math.pow(2, 53);
 * 大于最大值后会发生截断, 等于最大值
 */

//  new 一个构造函数, 如果函数中有返回: return 1, return {}, return null, return true, 会发生什么情况;

/**
 * 在typescript中, 使用 "new" 关键字只能调用 void 函数。
 *
 * 在js中, 如果返回值为对象(不能为null), 则返回对象, 否则返回new构造的新对象
 */

// function Fn() {
//     this.a = 1;
//     return 1;
// }
// var fn1 = new Fn();

// 闭包是什么
/**
 * 闭包指的是有权访问另一个函数作用域中的变量的函数
 */

//  闭包产生的本质
/**
 * 当前环境中存在指向父级作用域的引用
 */

//  简单介绍MVVM
/**
 * 全程Model-View-ViewModel, Modal表示数据模型层, View表示视图层,
 * ViewModel是View和Model层的桥梁, 数据绑定到ViewModel层并自动渲染到页面中,
 * 视图变化通知ViewModel层更新数据
 */

// vue是如何实现响应式数据的呢
/**
 * Vue2: Object.defineProperty 重新定义 data 中的所有属性,
 * Object.defineProperty 可以使数据的获取和设置(getter, setter)增加一个拦截的功能,
 * 拦截属性的获取, 进行依赖收集(getter), 拦截属性的更新操作, 进行通知(setter)
 *
 * 具体的过程：首先Vue使用initData初始化用户传入的参数, 然后使用new Observer对对象进行观测,
 * 如果数据是一个对象类型就会调用this.walk(value)对对象进行处理, 内部使用defineeReactive循环对象属性响应式变化,
 * 核心就是使用Object.defineProperty重新定义数据
 * https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a5a919f243644a3a0fbeaa884d2f9cd~tplv-k3u1fbpfcp-watermark.image
 * 
 * Vue3: Proxy
 */

// Vue中是如何检测数组变化的
/**
 * Vue2:
 * 改写数组的原型，当用户调用数组的一些方法的时候，通知视图去更新，
 * 具体的方法如下：pop, push, unshift, shift, splice, sort, reverse  (7种)
 * 
 * Vue3: Proxy可直接监听对象数组的变化
 */

// Vue事件绑定原理
/**
 * 原生DOM的绑定：Vue在创建真实DOM时会调用createElm，默认会调用invokeCreateHooks。
 * 会遍历当前平台下的相对的属性处理代码，其中就有updateDOMListeners方法，内部会传入add()方法
 * 
 * 组件绑定事件：原生事件，自定义事件，组件绑定之间时通过Vue中自定义的$on方法实现的
 * 
 * 可以理解为：组件的nativeOnOn等价于普通元素On，组件的On会单独处理
 */

//  v-model中的实现原理以及如何自定义v-model
/**
 * v-model可以看成时value+input方法的语法糖，原生的v-model，会根据标签的不同生成不同的事件和属性，
 * 解析出一个指令来。
 * 
 * 自定义：自己写model属性，里面放上prop和event
 */

//  为什么Vue采用异步渲染呢？
/**
 * Vue时组件级更新，如果不采用异步更新，那么每次更新数据都会对当前组件进行重新渲染，所以为了性能，
 * Vue会在本轮数据更新后，再异步更新视图，核心思想nextTick。
 * 
 * dep.notify通知watcher进行更新，subs[i].update依次调用watcher的update，queueWatcher将watcher去重
 * 放入队列，next(flushSchedulerQueue)在下一Tick中刷新watcher队列(异步)
 */

//  nextTick
/**
 * 异步方法，异步渲染最后一步，与js事件循环联系精密。主要利用了宏任务微任务，定义了一个异步方法，
 * 多次调用nextTick会将方法存入队列，通过异步方法清空当前队列
 */

//  Vue声明周期
/**
 * 什么时候调用：
 * beforeCreate：实例初始化之后，数据观测之前调用
 * created：实例创建完之后调用，实例完成，数据观测，属性和方法的运算，watch/event事件回调，无$el
 * before：在挂载之前调用，相关render函数首次被调用
 * mounted：el被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子
 * beforeUpdate：数据更新前调用，发生在虚拟Dom重新渲染和打补丁，在这之后会调用该钩子
 * updated：由于数据更改导致Dom重新渲染和打补丁，在这之后会调用该钩子
 * beforeDestory：实例销毁前调用，实例仍可用
 * destoryed：实例销毁之后调用，调用后，Vue实例指示的所有东西都会解绑，所有事件监听器和所有子实例都会被移除
 * 
 * 每个生命周期内部可以做什么：
 * created：实例已经创建完成，因为他是最早触发的，所以可以进行一些数据，资源的请求
 * mounted：实例已经挂载完成，可以进行一些dom操作
 * beforeUpdate：可以在这个钩子中进一步的更改状态，不会触发重渲染
 * updated：可以执行依赖于DOM操作，但是要避免更爱状态，可能会导致更新无线循环
 * destoryed：可以执行一些优化操作，清空定时器，解除绑定事件
 * 
 * 请求一般放在哪个声明周期：
 * 一般时放在mounted中，保证逻辑统一性，因为声明周期是同步执行的，ajax是异步执行的，
 * 但是服务器渲染ssr是放在created中的，因为服务器渲染不支持mounted方法
 * 
 * 什么时候使用beforeDestory？
 * 当前页面使用$on，需要解绑事件，清除定时器，解除事件绑定，scroll mousemove
 */

//  Vue组件通行
/**
 * 父子间通信：
 * 父组件提供数据通过属性prop传给子组件，子组件通过$on绑定父组件的事件，然后通过$emit触发自己的事件(发布订阅)
 * 
 * 获取父子组件实例的方法：
 * 父组件提供数据，子组件注入。Provide，Inject常用于插件中
 * ref获取组件实例，调用组件的属性方法
 * 
 * 跨组件通信EventBus，其实基于$on，$emit
 * vuex状态管理
 */

//  vuex
/**
 * Vuex是一个专为vue应用程序开发的状态管理模式
 * 
 * modules > 
 * {
 *  mutations,
 *  actions,
 *  getters,
 *  state
 *  }
 */

 

