### bind

一句话介绍bind：

> bind() 方法会创建一个新函数，当这个新函数被调用时，bind()的第一个参数将作为它运行时的this，之后的一系列参数都会在传递的实参钱传入作为它的参数。(来自于MDN)

由此我们可以首先得出bind函数的两个特点：

1. 返回一个函数
2. 可以传入参数

### 返回函数的模拟实现

从第一个特点开始，我们举个例子：

```javascript
var foo = {
    value: 1
};
function bar() {
    console.log(this.value);
}
// 返回一个函数
var bindFoo = bar.bind(foo);

bindFoo(); // 1
```

关于指定this的指向，我们可以使用call或者apply实现，关于call和apply的模拟实现，可以查看上一篇《call和apply的模拟实现》，现在来写第一版的代码：

```javascript
// 第一版
Function.prototype.bind = function (context): Function {
  const self = this;
  return function() {
    return self.call(context);
  }
};
```

此外，返回` self.call(context)` 是考虑到函数是可能存在返回值的。

### 传参的模拟实现

接下来看第二点，可以传入参数，这个就让人费解了，在bind的时候，是否可以传参呢？在执行bind返回的函数的时候，可不可以传参呢？让我们看个例子：

```javascript
var foo = {
    value: 1
};

funciton bar(name, age) {
	console.log(this.value);
    console.log(name);
    console.log(age);
}

var bindFoo = bar.bind(foo, 'daisy');
bindFoo('18');
// 1
// daisy
// 18
```

函数需要传name和age两个参数，竟然还可以在bind的时候，只传一个name，在执行返回的函数的时候，再传另一个参数age

```javascript
// 第二版
Function.prototype.bind = function (context, ...arg) {
  const self = this;
  return function (...argument) {
    return self.call(context, ...arg, ...argument);
  };
};
```

### 构造函数效果的模拟实现

完成了这两点，最难的部分到了，因为bind还有一个特点，就是：

> 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器，提供的this值被忽略，同时调用时的参数被提供给模拟函数。

也就是说当bind返回当函数作为构造函数的时候，bind时指定的this值会失效，但传入的参数依然生效，举个例子：

```javascript
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```

注意：尽管在全局和foo中都声明了value值，最后依然返回了undefined，说明绑定的this失效了，如果大家了解new的模拟实现，就会知道这个时候的this已经指向了obj。

我们可以通过修改返回的函数的原型类实现，让我们写一下：

```javascript
Function.prototype.bind = function(context, ...args) {
  var self = this;
  var fBound = function(...argument) {
    /**
     * 当作为构造函数时，this指向示例，此时结果为true，将绑定函数的this指向该实例，可以让实例获得来自绑定函数的值
     * 以上面的demo为例，如果改成`this instanceof fBounf ? null : context`，实例只是一个空对象，将nul改成this，实例会具有habit属性
     * 当作为普通函数时，this指向window，此时结果为false，将绑定的this指向context
     */
    return self.apply(this instanceof fBound ? this : context, ...args, ...argument);
  }
  // 修改返回函数的prototype为绑定函数的prototype，实例就可以继承绑定函数的原型的值
  fBound.prototype = this.prototype;
  return fBound;
}
```

### 构造函数效果的优化实现

但是在这个写法中，我们直接将fBound.prototype = this.prototype，我们直接修改fBound.prototype的时候，也会直接修改绑定函数的prototype。这个时候，我们可以通过一个空函数来进行中转：

```javascript
// 第四版
Function.prototype.bind = function(context, ...args) {
  var self = this;
  var fNOP = function() {};
  var fBound = function(...argumnet) {
    return self.apply(this instanceof fNOP ? this : context, ...args, ...argumnet);
  }
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}
```

到此为止，大的问题都已经解决

