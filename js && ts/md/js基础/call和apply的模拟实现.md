### call和apply的模拟实现

一句话介绍call：

> call() 方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法

举个例子：

```javascript
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo);
```

注意两点：

1. call改变了this的指向，指向到foo
2. bar函数执行了

### 模拟实现第一步

那么我们该怎么模拟实现这两个效果呢？

试想当调用 call 的时候，把 foo 对象改造成如下：

```javascript
var foo = {
    value: 1,
    bar: function() {
		console.log(this.value);
    }
};

foo.bar(); // 1
```

这个时候this就指向了 foo

但是这样却给foo对象本身添加了一个属性，不过不用担心，我们可以使用delete将他删除

所以我们模拟的步骤可以分为：

1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数

以上个例子为例，就是：

```javascript
// 第一步
foo.fn = bar;
// 第二步
foo.fn();
// 第三布
delete foo.fn
```

fn 是对象的属性名，反正最后也要删除它，所以起成什么都无所谓。

根据这个思路，我们可以尝试着去写第一版的call2函数：

```javascript
Function.prototype.call2 = function(context) {
    // 首先要获取调用call的函数，用this可以获取
    context.fn = this;
    context.fn();
    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
}

function bar() {
	console.log(this.value);
}

bar.call2(foo);
```

### 模拟实现第二步

最一开始也讲了，call函数还能给定参数执行函数。举个例子：

```javascript
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}

bar.call(foo, 'kevin', 18);
```

注意：传入的参数并不确定

```javascript
// 第二版
Function.prototype.call = function (context, ...arg) {
  context.fn = this;
  context.fn(...arg);
  delete context.fn;
};
```

### 模拟实现第三步

模拟代码已经完成 80%，还有两个小点要注意：

**1.this 参数可以传 null，当为 null 的时候，视为指向 window**

**2.函数是可以有返回值的！**

不过都很好解决：

```javascript
// 第三版
Function.prototype.call = function (context, ...arg) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...arg);
  delete context.fn;
  return result;
};
```

### apply的模拟实现

apply的实现和call类似：

```javascript
Function.prototype.apply = function (context, args) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
```

