### new

一句话介绍new：

> new运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

或许有些难懂，我没在模拟new之前，先看看new实现了哪些功能：

```javascript
function Otaku(name, age) {
  this.name = name;
  this.age = age;

  this.habit = 'games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYouName = function() {
  console.log('I am ' + this.name);
}

var person = new Otaku('老王', 18);

console.log(person.name);
console.log(person.age);
console.log(person.strength);
person.sayYouName();
```

从这个例子中，我们可以看到，实例person可以：

1. 访问到构造函数中的属性
2. 可以访问到构造函数原型中的属性

接下来，我们可以试着模拟一下了。

因为 new 是关键字，所以无法像bind函数一样直接覆盖，所以我们写一个函数，命名为`objectFactory`，来模拟new的效果，用的时候是这样的：

```javascript
function Otaku() {
	...
}
// 使用new
var person = new Otaku();
// 使用objectFactory
var person = objectFactory(Otaku)
```

### 初步实现

分析：

因为new的结果是一个新对象，所以在模拟实现的时候，我们也要建立一个新对象，假设这个对象叫obj，因为obj会具有Otaku构造函数里的属性，想想经典继承的例子，我们可以使用`Otaku.apply(obj, arguments)`来给obj添加新的属性。

在原型与原型链的解析篇中，我们就讲了原型和原型链，我们知道实例的`__proto__`属性会指向构造函数的prototype，也正是因为建立起这样的关系，实例可以访问原型上的属性。

现在，我们可以尝试着写第一版了：

```javascript
function objectFactory(Constructor: Function, ...args) {
  var obj: any = new Object();
  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, ...args);
  return obj;
}
```

> 使用`__proto__`可以直接修改原型链

在这一版中， 我们：

1. 用new Object的方式创建了一个新的对象 obj
2. 将obj的原型指向构造函数，这样obj就可以访问到构造函数原型中的属性
3. 使用apply，改变构造函数this的指向到新建的对象，这样obj就可以访问到构造函数中的属性
4. 返回obj

复制以下的代码，到浏览器中，我们可以做一下测试：

```javascript
function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

function objectFactory(Constructor, ...args) {
  var obj = new Object();
  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, [...args]);
  return obj;
}

var person = objectFactory(Otaku, 'Kevin', '18')

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin
```

### 返回值效果实现

接下来我们再来看一种情况

构造函数可能拥有返回值的情况下，实例访问的值是从返回值中获取的

值可能是对象、基本类型、函数等

```javascript
function objectFactory(Constructor: Function, ...args) {
  var obj = Object.create(Constructor.prototype);
  const ret = Constructor.apply(obj, ...args);
  return ret instanceof Object ? obj : ret;
}
```

