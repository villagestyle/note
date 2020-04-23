## 从ECMA规范理解this

ps: 此处的ECMA规范为[es5](http://yanhaijing.com/es5/#211)

在《JavaScript深入之执行上下文栈》中讲到，当JavaScript代码执行一段可执行代码(executable code)时，会创建对应的执行上下文(execution context)。

对于每个执行上下文，都有三个重要属性

- 变量对象
- 作用域链
- this

## Reference

Reference类型就是用来解释 delete、typeof 以及赋值等操作行为的。

按尤雨溪的话来说，就是

> 这里的 Reference 是一个 Specification Type，也就是 “ 只存在于规范里的抽象类型 ” 。他们是为了更好的描述语言的底层行为逻辑才存在的，但并不存在于实际的js代码中。

Reference由三个部分组成，分别是：

- base value
- reference name
- strict reference

可是这些到底是什么呢？

我们简单理解的话：

base value 就是属性所在的对象或者就是 EnvironmentRecord，它的值只可能是 undefined，an Object，a Boolean，a String，a Number，or an environment record 其中的的一种

referenced name就是属性的名称。

举个例子：

```javascript
var foo = 1;

// 对应的Reference是：
var fooReference = {
	base: EnvironmentRecord,
    name: 'foo',
    strict: false
}
```

再举个例子：

```javascript
var foo = {
	bar: function() {
		return this;
    }
}

// bar对应的Reference是：
var BarReference = {
	base: foo,
    propertyBane: 'bar',
    strict: false
}
```

而且规范中还提供了获取Reference组成部分的方法，比如 GetBase 和 IsPropertyReference。

这两个方法很简单，简单看一看：

1. GetBase

   > Get Base(V) : Returns the base value of the reference V

   返回reference的base value

2. IsPropertyReference

   > IsPropertyReference(V) : Returns true if either the base value is an object or HasPrimitiveVase(V) is true; otherwise returns false

   简单的理解，如果base value是一个对象，就返回true

### getValue

除此之外，紧接着在8.7.1章规范中就讲了一个用于从 Reference 类型获取对应值的方法： GetValue.

简单模拟GetValue的使用：

```javascript
var foo = 1;

var fooReference = {
	base: EnvironmentRecord,
    name: `foo`,
    strict: false
};

GetValue(fooReference) // 1;
```

GetValue 返回对象属性真正的值，打码师要注意：

**调用GetValue，返回的将是一个具体的值，而不再是一个Reference**

这个很重要

## 如何确定this的值

关于 Reference 讲了那么多，为什么要讲 Reference 呢？ 到底 Reference 跟本文的主题this有哪些关联呢？如果你能耐心看完之前的内容，一下进入高能阶段：

看规范 11.2.3 Function Calls:

这里讲了当函数调用的时候，如何确定this的取值。

让我们简述一下：

1. 计算MemberExpression的结果赋值给ref
2. 判断ref是不是一个Reference类型
   - 如果 ref 是 Reference，并且 IsPropertyReference(ref)是true，那么 this 的值为 GetBase(ref)
   - 如果 ref 是 Reference，并且base value值是Environment Record，那么this的值为ImplicitThisValue(ref)
   - 如果 ref 不是Reference，那么 this 的值为undefined

### 具体分析

让我们一步一步看：

1. 计算MemberExpressoion的结果赋值给ref

   什么是 MemberExpression？ 看规范 11.2 Left-Hand-Side Expression:

   MemberExpression: 

   - PrimaryExpression // 原始表达式
   - FunctionExporession // 函数定义表达式
   - MemberExpression [[Exporession]] // 属性访问表达式
   - MemberExpression.IdentifierName // 属性访问表达式
   - new MemberExpression Arguments // 对象创建表达式

   举个例子： 

   ```javascript
   function foo() {
   	console.lop(this);
   }
   
   foo(); // MemberExpression 是 foo
   
   function foo() {
   	return function() {
   		console.log(this);
       }
   }
   
   foo()(); // MemberExpression 是 foo()
   
   var foo = {
       bar: function() {
   		return this;
       }
   }
   foo.bar() // MemberExpression 是 foo.bar
   ```

   所以简单的理解 MemberExpression就是 () 左边的部分。

2. 判断ref是不是一个Reference类型。

   关键就在于看规范是如何处理各种 MemberExpression，返回的结果是不是一个Reference类型。

   举最后一个例子：

   ```javascript
   var value = 1;
   
   var foo = {
       value: 2,
       bar: function () {
   		return this.value;
       }
   }
   
   // 示例1
   console.log(foo.bar());
   // 示例2
   console.log(foo.bar()());
   // 示例3
   console.log((foo.bar = foo.bar)());
   // 示例4
   console.log((false || foo.bar)());
   // 示例5
   console.log((foo.bar, foo.bar)());
   ```

   **foo.bar()**

   我们得知该表达式返回了一个 Reference 类型，

   根据之前的内容，我们知道该值为：
   
   ```javascript
   var Reference = {
   	base: foo,
       name: 'bar',
       strict: false
   }
   ```
   
   接下来按照上面的判断流程走：
   
   > 如果ref是Reference，并且 IsPropertyReference(ref) 是true，那么 this 的值为 GetBase(ref)
   
   该值是Reference类型，那么 IsPropertyReference(ref) 的结果是什么呢？
   
   前面我们已经铺垫了 IsPropertyReference 方法，如果 base value 是一个对象，结果返回 true
   
   base value 为 foo，是一个对象，所以 IsPropertyReference(ref) 的结果是true
   
   这个时候我们就能确定this的值了：
   
   ```javascript
   this = GetBase(ref);
   ```
   
   GetBase 也已经铺垫了，获得 base value 值，这个例子中就是foo，所以 this 的值就是foo，示例1的结果就是2！
   
   **(foo.bar)()**
   
   看示例2：
   
   ```javascript
   console.log((foo.bar)());
   ```
   
   foo.bar 被 () 包住，查看规范11.1.6
   
   实际上 () 并没有对 MemberExpression 进行计算，所以其实和示例1的结果是一样的。
   
   **(foo.bar = foo.bar)()**
   
   看示例3，有赋值操作符，查看规范 11.13.1 Simple Assignment (=)：
   
   计算的第三步：
   
   > Let rval be GetValue
   
   因为GetValue返回的不是Reference类型，
   
   按照之前讲的判断逻辑：
   
   > 如果ref不是Reference，那么this的值为undefined
   
   this为undefined，非严格模式下，this的值为undefined的时候，其值会被隐式转换成全局对象。
   
   **（false || foo.bar()）**
   
   看示例4，逻辑与算法，查看规范11.11
   
   计算第二步：
   
   > let lval be GetValue(ref)
   
   因为使用了GetValue，所以返回的不是Reference类型，this为undefined
   
   **(foo.bar, foo.bar())**
   
   看示例5，逗号操作符，查看规范11.14
   
   计算第二步：
   
   > call GetValue(ref)
   
   因为使用了GetValue，所以返回的不是Reference类型，this为undefined

### 揭晓结果

所以最后一个例子的结果是:

```javascript
var value = 1;
var foo = {
    value: 2,
    bar: function() {
		return this.value;
    }
}
// 示例1
console.log(foo.bar()); // 2
// 示例2
console.log(foo.bar()()); // 2
// 示例3
console.log((foo.bar = foo.bar)()); // 1
// 示例4
console.log((false || foo.bar)()); // 1
// 示例5
console.log((foo.bar, foo.bar)()); // 1
```

注意：以上是在非严格模式下的结果，严格模式下因为this返回undefined，所以示例3会报错。

### 补充

最最后，忘记了一个最最普通的情况：

```javascript
function foo() {
	console.log(this);
}
foo();
```

MemberExpression 是 foo，解析标识符，查看规范 10.3.1，会返回一个Reference类型的值：

```javascript
var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
}
```

接下来判断：

> 如果ref是Reference，并且IsPropertyReference(ref)是true，那么this的值为GetBase(ref)

因为basevalue是EnvironmentRecord，并不是一个Object类型

IsPropertyReference(ref)的结果为 false，进入下个判断：

> 如果ref是reference，并且base value值是Environment Record，那么this的值为ImplcitThisValue(ref)

base value 正是 Environment Record，所以会调用 ImplcitThisValue(ref)

查看规范 10.2.1.1.6，ImplcitThisValue方法的介绍，该函数始终返回 undefined。

所以最后this的值就是undefined

## 多说一句 

尽管我们可以简单的理解 this 为调用函数的对象，如果是这样的话，如何解释下面这个例子呢？

```
var value = 1;
var foo = {
	value: 2,
	bar: function() {
		return this.value;
	}
}
console.log((false || foo.bar))
```



