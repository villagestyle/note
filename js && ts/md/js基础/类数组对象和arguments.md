## 类数组对象

所谓的类数组对象：

> 拥有一个 length 属性和若干索引属性的对象

举个例子：

```javascript
var array = ['name', 'age', 'sex'];

var arrayLike = {
    0: 'name',
    1: 'age',
    2: 'sex',
    length: 3
}
```

即便如此，为什么叫做类数组对象呢？

那让我们从读写、获取长度、遍历三个方面来看看这两个对象。

### 读写

```javascript
console.log(array[0]); // name
console.log(arrayLike[0]); // name

array[0] = 'new name';
arrayLike[0] = 'new name';
```

### 遍历

```javascript
for (var i = 0, len = array.length; i < len, i++) {
    ...
}

for (var i = 0, len = arrayLike.length; i < len; i ++){
	...
}
```

### 长度

```javascript
console.log(array.length); // 3
console.log(arrayLike.length); // 3
```

是不是很像？

但是类数组是不能使用数组的方法的

### 调用数组方法

如果类数组方法想要调用数组的方法怎么办呢？

既然无法直接调用，我们可以使用`Function.call`间接调用：

```javascript
var arrayLike = {0: 'name', 1: 'sex', length: 3};

Array.prototype.join.call(arrayLike, '&'); // name&age&sex

Array.prototype.slice.call(arrayLike, 0); // ['name', 'age', 'sex']
// slice可以做到类数组转数组

Array.prototype.map.call(arrayLike, (item) => {
    return item.toUpperCase();
});
// ['NAME', 'AGE', 'SEX']
```

### 类数组转数组

在上面的例子中已经提到了一种类数组转数组的方法，再补充三个：

```javascript
var arrayLike = {0: 'name', 1: 'sex', 2: 'age', length: 3};
// 1. slice
Array.prototype.slice.call(arrayLike, 0); // ['name', 'sex', 'age']
// 2. splice
Array.prototype.splice.call(arrayLike, 0);
// 3. ES6 Array.form
Array.form(arrayLike);
// 4. apply + concat
Array.prototype.concat.apply([], arrayLike);
```

要说到类数组对象，Arguments 对象就是一个类数组对象，在客户端 JavaScript 中，一些 DOM 方法(`document.getElementByTag`等)也返回类数组对象。

## Arguments对象

Arguments对象只定义在函数体中，包括了函数的参数和其他属性，在函数体中，arguments指代该函数的Arguments对象。

举个例子：

```javascript
function foo(name, age, sex) {
    console.log(arguments);
}
foo('name', 'age', 'sex');

/**
* {
*	0: 'name', 1: age, 2 sex, length: 3
*	callee: foo(name, age, sex)
* }
*/
```

我们可以看到除了类数组的索引属性和length属性之后，还有一个callee属性，接下来我们一个一个介绍

### length属性

Arguments 对象的length属性，表示实参的长度

```javascript
function foo(b, c, d) {
    console.log('实参的长度：' + arguments.length);
}
console.log('形参的长度为：' + foo.length);
foo(1);

// 形参的长度为：3
// 实参的长度为：1
```

### callee属性（已被移除不再使用）

Arguments 对象的 callee 属性，通过它可以调用函数自身。

讲个闭包经典提面试题使用 callee 的解决方法：

```javascript
var data = [];

for(var i = 0; i< 3; i++) {
	(data[i] = function() {
        console.log(arguments.callee.i)
    }).i = i;
};

data[0]();
data[1]();
data[2]();
```

接下来讲讲arguments对象的几个注意要点：

### arguments 和对应参数的绑定

```javascript
function foo2(name, age, sex?, hobbit?) {
  console.log(name, arguments[0]); // 'name' 'name'

  // 改变形参
  name = 'new name';
  console.log(name, arguments[0]); // new name new name

  // 改变arguments
  arguments[1] = 'new age';
  console.log(age, arguments[1]); // new age new age

  // 测试未传入的值是否会绑定
  console.log(sex); // undefined
  sex = 'new sex';
  console.log(sex, arguments[2]); // new sex undefined 

  arguments[3] = 'new hobit';
  console.log(hobbit, arguments[3]); // undefined new hobit
}

foo2('name', 'age');
```

传入的参数，实参和arguments的值会共享，当没有传入时，实参和arguments值不会共享。

除此之外，以上是在非严格模式下，在严格模式下，实参和arguments是不会共享的。

### 传递参数

将参数从一个函数传递到另一个函数

```javascript
// 使用 apply 将 foo 的参数传递给 bar
function foo() {
    console.log(this); // window
	bar.apply(this, arguments);
}
function bar(a, b, c) {
    console.log(a, b, c); // 1, 2, 3
}

foo(1 , 2, 3);
```

### ES6

使用es6的...运算符，我们可以轻松的转成数组。

```javascript
function func(...args) {
    console.log(args);
}
func(1, 2, 3);
```