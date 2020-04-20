## 从ECMA规范理解this

ps: 此处的ECMA规范为es5

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
   - 如果 ref 是 Reference，并且 IsPropertyReference(ref)是true
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

   在示例1中，MemberExpression计算的结果是foo.bar，那么foo.bar是不是一个 Reference 呢？

   

