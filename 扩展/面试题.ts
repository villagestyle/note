// vue的生命周期，各代表什么，什么情况下使用，举例说明。
/***
 * 初始化事件
 * beforeCreated
 * 初始化注入
 * created 实例已创建完成, 数据、属性、事件的配置都已完成, 此时视图还未渲染
 * beforeMounted 页面挂载前
 * mounted 页面挂载结束, 此时可以进行dom操作
 * beforeUpdate 数据更新之前
 * updated 数据更新后
 * beforeDestroy 组件销毁之前
 * destroyed 销毁完毕
 */
// created 和 mounted 有什么区别？
/**
 * created：在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
 * mounted：在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
 */
// v-bind 和 v-on 代表什么？
/**
 * v-bind: 绑定值
 * v-on: 绑定事件
 */
// 组件之间（父子组件、兄弟组件、毫无关系之间的组件）如何传值？
/**
 * 父子之间传值
 * on emit 中间件 本地存储 状态管理
 * 兄弟之间传值
 * 中间件 状态管理 本地存储
 * 组件之间
 * 状态管理 本地存储
 */
/**
 *
 */
// 说出一些vue常用的基础指令。
/**
 * v-if v-show v-else
 */
// vue-router有哪几种导航钩子？
/**
 * 一、全局导航钩子
 * 前置钩子(跳转前)
 * router.beforeEach((to, from, next) => {})
 * 后置钩子(跳转后)
 * 后置钩子中不存在next函数, 所以无法改变导航
 * routerafterEach((to, from) => {})
 *
 * to: Route 代表要进入的目标, 是一个路由对象
 * from Route 代表正在离开的路由, 也是一个路由对象
 * next: function 这是一个必须被调用的方法(不调用则无法向下执行), 具体的执行效果以来next方法调用的参数
 *  1. next() 进入管道中的下一个钩子， 如果这是最后一个钩子，则代表导航状态为true
 *  2. next(false) 代表中断掉当前的导航, 即to代表的路由对象不会进入, 被中断, 此时url地址会被重置到from路由对应的地址
 *  3. next('\')和next({path: '\'}): 在中断掉当前导航的同事, 跳转到一个不同的地址
 *  4. next(error): 如果传入参数是一个error实例, 那么导航会被终止的同时会将错误传递到router.onError() 注册过的回调
 * next方法必须被调用, 否则钩子函数无法resolved
 * 二、路由独享的钩子
 * 直接在路由配置上定义的钩子
 * 例:
 * {
 *  path: '/file',
 *  component: File,
 *  beforeEnter: (to, from, next) => {
 *      参数内容同上
 *  }
 * }
 * 三、组件内部的导航钩子
 * vue组件内部
 * beforeRouteEnter(to, from, next) {
 *  进入该组件前(组件还未被渲染)(无法访问到全局的this)
 * }
 * beforeRouteUpdate(to, from, next) {
 *  在当前路由改变，但是该组件被复用时调用
 *  举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
 *  由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
 *  可以访问组件实例 `this`
 * }
 * beforeRouteLeave(to, from, next) {
 *   导航离开该组件的对应路由时调用
 *   可以访问组件实例 `this`
 * }
 */
// axios是什么？怎么使用？描述使用它实现登录功能的流程？
// axios+tp5进阶中，调用axios.post(‘api/user’)是进行的什么操作？axios.put(‘api/user/8′)呢？
// 什么是RESTful API？怎么使用?
