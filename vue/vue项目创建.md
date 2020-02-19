# vue

使用脚手架创建项目 vue-cli 命令：
> vue create project-name (vue3.x)

启动vue项目
> npm run serve

## 1、路由系统

### 1. 安装vue-router ( Vue.js 官方的路由管理器 )

在main.js中引入vue-router
```
// main.js
import Vue from 'vue'
import App from './App.vue'
import routers from './router/index';
import VueRouter from 'vue-router';

Vue.config.productionTip = false
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  routers
}).$mount('#app')

```
### 2. 配置router.js
```
const routers = [
    {
        name: 'Twice',
        component: Twice,
        path: '/twice',
        meta: {
            title: 'Twice页面'
        }
    },
]
export default routers;
```
### 3. 引入router.js
```
// main.js
import Vue from 'vue'
import App from './App.vue'
import routers from './router/index';
import VueRouter from 'vue-router';

Vue.config.productionTip = false
Vue.use(VueRouter);
const router = new VueRouter({
  routes: routers
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
```

### 4. 路由懒加载
> ES 提出的import方法, const HelloWorld = () =>import('需要加载的模块地址')

```
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 懒加载
const HelloWorld = ()=>import("@/components/HelloWorld")
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component:HelloWorld
    }
  ]
})
```

## 2、 二级路由

> 创建一级路由, 利用children将一级路由和二级路由串联起来
>> 在一级路由处放置 ``` <router-view></router-view> ``` 标签来引用二级路由

## 3、缓存页面
### 1. 使用缓存页面
```
// 使用keep-alive包裹即可
<keep-alive>
  <router-view></router-view>
</keep-alive>
```
> keep-alive是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。
keep-alive 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
keep-alive 与 transition 相似，只是一个抽象组件，它不会在DOM树中渲染(真实或者虚拟都不会)，也不在父组件链中存在，比如：你永远在 this.$parent 中找不到 keep-alive 。

### 2. 判断页面是否需要缓存
#### ( 1 ) 在路由信息中的meta中设置参数
```
// router.js
{
   path: '/a',
   name: 'A',
   component: A,
   meta: {
    keepAlive: false // 不需要缓存
   }
}

// 使用
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

#### ( 2 ) 直接缓存所有组件/路由, 使用include来处理需要缓存的组件/路由, 使用exclude来排除不需要缓存的路由

```
<keep-alive include="['a','b']">//缓存name为a,b的组件
<keep-alive include ="a,b">//缓存name为a,b的组件
<keep-alive :include="/^store/">//缓存name以store开头的组件
  <router-view/>//可以为router-view
  <component :is="view"></component>//也可以是动态组件
</keep-alive>
```
> exclude跟include正好相反，在exclude里的组件不会被缓存。用法类似，不作赘述

### 3. 缓存组件的生命周期

缓存组件第一次打开的时候，和普通组件一样，也需要执行created, mounted等函数。
但是在被再次激活和被停用时，这几个普通组件的生命周期函数都不会执行，会执行两个比较独特的生命周期函数。
```
activated
这个会在缓存的组件重新激活时调用

deactivated
这个会在缓存的组件停用时调用
```

### 4. 清除已缓存的页面

#### 1. 使用exclude来控制页面的缓存( 当前用到的方法 )
> 删除tab页时将值注入到exclude对应的列表中

> 新增tab页时将值从列表中删除( 需要缓存该页面的话 )

其他页面中进行增删则可将列表放入浏览器缓存中进行全局管理

tab页缓存初步完成
