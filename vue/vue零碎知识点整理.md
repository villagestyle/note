## 1. vue双向绑定的原理
通过Object.defineProperty()来实现数据劫持, 数据劫持结合发布者-订阅者模式
```
/**
    * Adds a property to an object, or modifies attributes of an existing property.
    * @param o Object on which to add or modify the property. This can be a native JavaScript object (that is, a user-defined object or a built in object) or a DOM object.
    * @param p The property name.
    * @param attributes Descriptor for the property. It can be for a data property or an accessor property.
*/
defineProperty(o: any, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): any;
```

### ( 1 ) 分析Object.defineProperty
官方解释: 将属性添加到对象中, 或修改现有属性的属性。
Object.defineProperty接收三个参数
官方解释：
1. 要在其上定义属性的对象。
2. 要定义或修改的属性的名称。
3. 将被定义或修改的属性描述符。

解析：
```
// Object.defineProperty的基本使用
let obj = {
    a: 1,
    get: function(key) {
        return this[key]
    },
    set: function(key, value) {
        this[key] = value;
    }
}
let temp = 'a'
Object.defineProperty(obj, 'name', {
    get: function() {
        return temp
    },
    set: function(val) {
        console.log('触发set方法')
        temp = val
    }
})
obj.name; // 'a'
obj.name = 5; // '触发set方法'
obj.name; // 5
Object.keys(obj) // ["a", "get", "set"], enumerable为false则不会被遍历到
for(let k in obj){console.log(k)} // a, get, set enumerable为false则不会被遍历到
```
> 读取obj.name会从get中获取值, 可以使用直接obj.name对其进行赋值(触发set方法)

> 不能同时使用value和get
>> error：不能同时指定访问器和值或可写属性
```
Object.defineProperty(obj, b, {
    value: 'sss', // 修改后的值, 默认为undefined
    writable: true, // 是否可修改, 默认为false
    get: function() {
        return
    }
    // 一个给属性提供getter的方法, 如果没有getter则为undefined。该方法返回值被用作属性值。默认为undefined(返回当前属性值)
    set: function(val) {
        console.log('触发set方法')
        temp = val
    }
    // 一个给属性提供setter的方法, 如果没有setter则为undefined, 该方法将接受唯一参数, 并将该参数的新值分配给该属性。默认值为undefined(修改当前属性)
    configrable：描述属性(当前的属性描述符)是否配置, 以及可否删除, 默认为false
    enumerable：可枚举性, 描述属性是否会出现在for in或者Object.keys()的遍历中, 默认为false
})
```

## 2. 手动实现vue的双向绑定
> 简单实现

```
var eleInput = document.getElementById('input');
var eleP = document.querySelector('p');

var obj = {}
let modalText = '';
Object.defineProperty(obj, 'text', {
    get: function () {
        return modalText
    },
    set: function (val) {
        eleP.innerText = val;
        modalText = val;
    }
})

eleInput.oninput = function inputHandle(e) {
    obj.text = eleInput.value;
}
```
解析：
关键点在于data如何更新view，因为view更新data其实可以通过事件监听即可，比如input标签监听 'input' 事件就可以实现了。所以我们着重来分析下，当数据改变，如何更新视图的。
数据更新视图的重点是如何知道数据变了，只要知道数据变了，那么接下去的事都好处理。如何知道数据变了，其实上文我们已经给出答案了，就是通过Object.defineProperty( )对属性设置一个set函数，当数据改变了就会来触发这个函数，所以我们只要将一些需要更新的方法放在这里面就可以实现data更新view了。

> 具体见 ``` 参考 vue的双向绑定原理及实现 ```


> 参考 深入浅出Object.defineProperty() https://www.jianshu.com/p/8fe1382ba135

> 参考 vue的双向绑定原理及实现 https://www.cnblogs.com/canfoo/p/6891868.html


## 2. NextTick函数

在DOM更新完成后调用

使用场景

在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。

> 参考 简单理解Vue中的nextTick https://www.jianshu.com/p/a7550c0e164f

## 3. vue3配合ts进行开发
遇到的一些问题

1. 如何在vue项目中使用ts ?
> 在创建项目是选择自定义选项, 选择ts进行开发

2. Could not find a declaration file for module 'vue-xxx'.
> 如果导入的第三方插件/库不支持ts则会报这个错, 解决方案: 
``` 
1. 找到shims-vue-d.ts文件
2. 手动导入包 declare module 'vue-xxx'
3. 在项目中就可以正常导入了
 ```
 3. 6

## 4. 组件通信
### 1. 父组件 -> 子组件
1. 使用props进行通信
### 2. 子组件 -> 父组件
1. 使用emit() 传递数据
### 3. 父子组件相互通信
1. 使用第三方存储库(vuex/localStorage)进行操纵
2. 使用上述的两种方法进行互相通信
3. 使用v-modal

#### 详解v-modal通信
1. 单向通信

```
// 父组件
<cell-picker v-model="schoolType"><cell-picker>
// 子组件
<script>
    let schoolType = '这是我要传出去的数据';
    this.$emit('input', schoolType);
    // 父组件将会接收到当前的这个数据, 但此时的通信是单向的, 父组件中数据发生变化将不会改变子组件的状态
</script>
```

2. 双向通信
```
// 父组件
<cell-picker v-model="schoolType"><cell-picker>
// 子组件
export default {
    // model接收的两个值的类型都为string类型
    model: {
        prop: 'msg',
        event: 'submit' // 自定义, 可使用已存在的事件, 也可使用自定义的事件('input','ccc')
    },
    props: {
        // 在props中声明这个变量
        msg: ''
    },
    updated() {
        // 每次父组件的值更新, msg的只也会随之更新
        console.log(this.msg)
        /// msg的值为readOnly, 不能进行修改操作
    }
    ...
    next() {
        let schoolType = ...;
        this.$emit('submit', schoolType);
        // 此处将会把子组件内的数据传出
    }
}
```

## 5. vue的移动端适配方案
1. 使用js+rem的方式进行适配, 使用window.resize动态的调整html的font-size的大小, 从而达到适配的效果
2. vw适配方案
### 详解
> 参考 https://www.jianshu.com/p/1f1b23f8348f

### 6. 强制数据渲染 this.$forceUpdate()

### 7. vue3.0中使用的双向绑定(proxy)

