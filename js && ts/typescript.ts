// function greeter(person: String): string {
//   return person + ",hi";
// }
// let user = "Jane User";

// let data: any = "aa";

// let bool: boolean = true;

// interface Person {
//   name: String;
//   age: Number;
// }

// var tom: Person = {
//   name: "tom",
//   age: 2
// };

// interface Person2 {
//   name: String;
//   age?: Number;
// }

// let jane: Person2 = {
//   name: "112"
// };

// interface Person3 {
//   name: String;
//   age?: Number;
//   [propName: string]: any;
// }

// let sony: Person3 = {
//   name: "sony",
//   height: 185,
//   weight: 150
// };

// interface Person4 {
//   readonly id: String; // 设置为只读，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
//   name: String;
//   ang?: Number;
//   [propName: string]: any;
// }

// let kangk: Person4 = {
//   id: "152asq4r8", // 试图修改该属性会报错
//   name: "kang",
//   height: 999
// };

// let fibonacci: Array<number> = [1, 2, 3, 4];

// let list: any[] = [
//   1,
//   2,
//   "5",
//   {
//     name: 555
//   }
// ];

// // function sum(num1: number, num2: number): number {
// //     return num1 + num2;
// // }

// let mySum: (x: number, y: number) => number = function (x: number, y: number) {
//   return x + y;
// };

// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }

// let mySearch: SearchFunc;
// mySearch = function (score: string, subString: string) {
//   return score.search(subString) !== -1;
// };

// // function buildName(firstName: string = 'lily', lastName: string = 'pandagan'): string{
// //     return firstName + ' ' + lastName;
// // }

// // let ache = buildName();
// // let jone = buildName('tom', 'cat')
// console.log("11");

// function push(array: Array<any>, ...items: any[]) {
//   // 得到的items是一个数组
//   items.forEach(item => {
//     array.push(item);
//   });
// }

// // let a = [];
// // push(a, 1, 2, 3);
// // console.log(a);

// function reverce(x: number | string): number | string {
//   if (typeof x === "string") {
//     return x.split("").reverse().join("");
//   } else {
//     return Number(x.toString().split("").reverse().join(""));
//   }
// }

// console.log(reverce(54321));
// console.log(reverce("123456"));

// 类型断言 <>
function getLength(something: string | number): number {
  if ((<string>something).length) {
    // 断言something将会是string类型
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}

let dat: Date = new Date();

class Animal {
  // 使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

let ab = new Animal();
Animal.isAnimal(ab);

class Animal2 {
  name: string;
  constructor(name) {
    this.name = name;
  }
  // get name() {
  //     return 'jack'
  // }
  // set name(value) {
  //     console.log('setting' + value)
  // }
}

// 抽象类
// 抽象类是不允许被实例化的
abstract class Animal3 {
  public name;
  public constructor(name: string) {
    this.name = name;
  }
  public abstract sayHi();
}
// let a = new Animal3('jace'); // 无法创建抽象类的实例

// 抽象类中的抽象方法必须被子类实现,不然报错

// class Cat extends Animal3 { // 非抽象类“Cat”不会实现继承自“Animal3”类的抽象成员“sayHi”
//     public eat() {
//         console.log(`${this.name} is eating`)
//     };
// }

// let cat = new Cat('tom')

// 正确使用抽象类的例子
class Cat extends Animal3 {
  public sayHi() {
    console.log(`meow my name is ${this.name}`);
  }
}
let cat = new Cat("tom");

// 类与接口
// 如果你希望在类中使用必须遵循的接口（类）或是别人定义的对象结构，可以使用 implements 关键字来确保兼容性：

interface Alerm {
  alert();
}

class Door {}

class SecurityDoor extends Door implements Alerm {
  alert() {
    console.log("secur");
  }
}

class Car implements Alerm {
  alert() {
    console.log("car alert");
  }
}

// 泛型
// 让类型推论自动推算出来

function creareArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
creareArray(3, 5);

// 申明合并
// 如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型

interface Alermt {
  price: number;
}

interface Alermt {
  name: string;
}

interface Alermt {
  id: string;
}

interface Alermt {
  price: number;
  name: string;
  id: string;
  type: string;
  alert(): string;
}

class Alerms implements Alermt {
  price: 55;
  name: "标签";
  id: "1";
  type: "办公用品";
  alert(): string {
    return "";
  }
}

// 枚举 enum

enum Color {
  Red = 5,
  Green,
  Blue,
  ligntBlue
}
let colorName: string = Color[6];
console.log(colorName); // 'Green'

interface SqureConfig {
  color?: string;
  width: number;
}
function createSqure(config: SqureConfig): SqureConfig {
  let newSquare = { color: "white", width: 888 };
  if (config.color) {
    newSquare.color = config.color;
  }
  newSquare.width = config.width;
  return newSquare;
}

interface Point {
  readonly x: number;
  y: number;
}

let point1: Point = {
  x: 55,
  y: 6
};

point1.y = 555;
// point1.x = 666; // Cannot assign to 'x' because it is a read-only property

// 用接口描述函数类型
interface SearchFunc2 {
  (score: string, subString: string): boolean;
}
let searchFunc2: SearchFunc2;
searchFunc2 = function () {
  return true;
};

function toDetail(arr: Array<any> | number | string): number {
  if (typeof arr === "number") {
    return arr + 50;
  } else {
    return arr.length;
  }
}

class Animal4 {
  name: string;
}

class Dog extends Animal4 {
  breed: string;
}

interface NotOkey {
  [x: number]: Animal4;
  // [x:string]: 'Dog'; // 数字索引类型“Animal4”不能赋给字符串索引类型“Dog”
  name: Dog;
}

// o => item
const listOfTags = [
    { id: 1, label: "Hello", color: "red", sorting: 0 },
    { id: 2, label: "World", color: "green", sorting: 1 },
    { id: 3, label: "Hello", color: "blue", sorting: 4 },
    { id: 4, label: "Sunshine", color: "yellow", sorting: 5 },
    { id: 5, label: "Hello", color: "red", sorting: 6 }
  ],
  keys = ["label", "color"],
  filtered = listOfTags.filter(
    (s => o => (k => !s.has(k) && s.add(k))(keys.map(k => o[k]).join("|")))(
      new Set()
    )
  );

console.log(filtered);

interface SearchPage {
  pageNum: number;
  rows: number;
  name: string;
  schoolYearId: number;
  [propName: string]: any;
}

let obg: SearchPage = {
  pageNum: 1,
  rows: 1,
  name: "",
  schoolYearId: 1,
  text: 1
};

interface Obj<T, R> {
  key: string;
  value: T;
  userInfo: R;
}

interface Data {
  name: string;
}

const obj1: Obj<string, Data> = {} as Obj<string, Data>;

// 执行上下文栈
// 加入全局上下文
// 解析函数代码
// 创建函数
// 保存作用域到内部[[scope]]
// 执行函数 -- 初始化函数
// 创建函数上下文
// 复制作用域到函数上下文
// 创建活动对象AO
// 初始化活动对象
// 将活动对象压入作用域顶端
// 执行上下文栈中添加函数上下文
// 执行函数 -- 代码执行
// 随着函数执行更新活动对象
// 在代码执行过程中,使用到值时,将会进入函数上下文中的活动对象中进行查找,
// 如果查找不到,则顺着函数上下文中的Scope向上查找(Scope中存储了活动对象及上级作用域)
// 执行函数 -- 函数执行完毕
// 从执行上下文栈中弹出函数上下文

// var foo = {
//   value: 1
// };

// function bar(name, age, time) {
//   return {
//     name,
//     age,
//     time,
//     value: this.value
//   };
// }
// // call 函数还能给定参数执行函数
// // this 参数可以传 null，当为 null 的时候，视为指向 window
// // 函数是可以有返回值的！

// Function.prototype.call = function (context, ...arg: any[]) {
//   context = context || window;
//   context.fn = this;
//   const result = context.fn(...arg);
//   delete context.fn;
//   return result;
// };

// bar.call(foo, "老王", 18, 2);

// Function.prototype.apply = function (context, args: any[]) {
//   context = context || window;
//   context.fn = this;
//   const result = context.fn(...args);
//   delete context.fn;
//   return result;
// };

// bar.apply(foo, ["老王", 18, 2]);

/**
 * 返回一个函数
 * 可以传入参数
 */
// Function.prototype.bind = function (context, ...arg): Function {
//   const self = this;
//   return function(...argument) {
//     return self.call(context, ...arg, ...argument);
//   }
// };

// var foo = {
//   value: 1
// };

// function bar() {
//   console.log(this.value);
// }

// var bindFoo = bar.bind(foo);

// bindFoo(); // 1

Function.prototype.bind = function (context, ...arg) {
  const self = this;
  return function (...argument) {
    return self.call(context, ...arg, ...argument);
  };
};

var foo = {
  value: 1
};

function bar(name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);
}

var bindFoo = bar.bind(foo, "daisy");
bindFoo("18");

Function.prototype.bind = function (context, ...args) {
  var self = this;
  var fBound = function (...argument) {
    /**
     * 当作为构造函数时，this指向示例，此时结果为true，将绑定函数的this指向该实例，可以让实例获得来自绑定函数的值
     * 以上面的demo为例，如果改成`this instanceof fBounf ? null : context`，实例只是一个空对象，将nul改成this，实例会具有habit属性
     * 当作为普通函数时，this执行window，此时结果为false，将绑定的this指向context
     */
    return self.apply(
      this instanceof fBound ? this : context,
      ...args,
      ...argument
    );
  };
  // 修改返回函数的prototype为绑定函数的prototype，实例就可以继承绑定函数的原型的值
  fBound.prototype = this.prototype;
  return fBound;
};

/**
 * 但是在这个写法中，我们直接将 fBound.prototype = this.prototype，我们直接修改 fBound.prototype 的时候，
 * 也会直接修改绑定函数的 prototype。这个时候，我们可以通过一个空函数来进行中转：
 */
Function.prototype.bind = function (context, ...args) {
  var self = this;
  var fNOP = function () {};
  var fBound = function (...argumnet) {
    return self.apply(
      this instanceof fNOP ? this : context,
      ...args,
      ...argumnet
    );
  };
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

// function Otaku(name, age) {
//   this.name = name;
//   this.age = age;

//   this.habit = 'games';
// }

// Otaku.prototype.strength = 60;

// Otaku.prototype.sayYouName = function() {
//   console.log('I am ' + this.name);
// }

// var person = new Otaku('老王', 18);

// console.log(person.name);
// console.log(person.age);
// console.log(person.strength);
// person.sayYouName();

// function objectFactory(Constructor: Function, ...args) {
//   // Object.create 创建具有指定原型或空原型的对象。
//   var obj = Object.create(Constructor.prototype);
//   const ret = Constructor.apply(obj, ...args);
//   return ret instanceof Object ? obj : ret;
// }

// function Otaku(name: string, age: string | number) {
//   this.strength = 60;
//   this.age = age;

// return {
//   name: name,
//   hobit: 'games'
// }
// }

// var person = new Otaku("kevin", "18");

// function foo2(name, age, sex?, hobbit?) {
//   console.log(name, arguments[0]); // 'name' 'name'

//   // 改变形参
//   name = 'new name';
//   console.log(name, arguments[0]); // new name new name

//   // 改变arguments
//   arguments[1] = 'new age';
//   console.log(age, arguments[1]); // new age new age

//   // 测试未传入的值是否会绑定
//   console.log(sex); // undefined
//   sex = 'new sex';
//   console.log(sex, arguments[2]); // new sex undefined

//   arguments[3] = 'new hobit';
//   console.log(hobbit, arguments[3]); // undefined new hobit
// }

// foo2('name', 'age');

// 1. 工厂模式
// interface Person extends Object {
//   name: string;
//   getName: () => void;
// }
// function createPerson(name: string): Person {
//   var o: Person = {} as Person;
//   o.name = name;
//   o.getName = () => {
//     console.log(this.name);
//   }
//   return o;
// }

// 缺点: 对象无法识别，因为所有的实例都指向一个对象

// 2. 构造函数模式
// function Person(name) {
//   this.name = name;
//   this.getName = function() {
//     console.log(this.name);
//   }
// }

// var person1 = new Person(`kevin`);

// 3. 原型模式
// function Person() {
// }

// Person.prototype.name = 'kevin';
// Person.prototype.getName = function() {
//   console.log(this.name);
// }

// var person1 = new Person();

// 4. 组合模式(原型模式 + 构造函数模式)
// function Person(name) {
//   this.name = name;
// }
// Person.prototype.getName = function() {
//   console.log(this.name);
// }

// var person1 = new Person('kevin');

// 4.1 动态原型模式

// function Person(name) {
//   this.name = name;
//   if (typeof this.getName != 'function') {
//     Person.prototype.getName = function() {
//       console.log(this.name);
//     }
//   }
// }

// var person1 = new Person('kevin');
// var person2 = new Person('kevin');

function Person(name) {
  this.name = name;
  if (typeof this.getName != "function") {
    Person.prototype = {
      constructor: Person,
      getName: function () {
        console.log(this.name);
      }
    };
  }
}

var person1 = new Person("kevin");
var person2 = new Person("kevin2");

// 报错，不存在该方法
person1.getName();
// 注释掉上面的代码，这句是可以执行的
person2.getName();

// new
var obj = Object.create(Person.prototype);
obj.__proto__ === Person.prototype;
// Person.apply(obj); == > obj.Person(name);
obj.Person(name);
// obj.name = name;
// obj.getName != "function"  true
Person.prototype = {
  constructor: Person,
  getName: function () {
    console.log(this.name);
  }
};
// return obj; === > person1

// apply的实现
// Function.prototype.apply = function(context, args) {
//   context = context || window;
//   context.fn = this;
//   const ret = context.fn(...args);
//   delete context.fn;
//   return ret;
// }

// new 的执行过程
/**
 * 新建一个对象，
 * 对象的原型指向Person.prototype
 * Person.apply(obj)
 * 返回obj
 */

// function myNew(Cons: Function, ...args) {
//   const obj = Object.create(Cons.prototype);
//   const ret = Cons.apply(obj, args);
//   return ret instanceof Object ? ret : obj;
// }

// Person.apply(obj);

// function Water(name) {
//   this.name = name;
//   if (typeof this.getName !== "function") {
//     console.log('执行次数');
//     Water.prototype = {
//       constructor: Water,
//       getName: function () {
//         console.log(this.name);
//       }
//     };
//     return new Water(name);
//   }
// }

// var coco = new Water("coco");
// coco.getName();

// var baishi = new Water("baishi");
// baishi.getName();

// var wahaha = new Water("wahaha");
// wahaha.getName();

// function Parent() {
//   this.name = 'kevin'
// }

// Parent.prototype.getName = function() {
//   console.log(this.name);
// }

// function Child() {
// }

// Child.prototype = {
//   constructor: Child,
//   __proto__: Parent.prototype
// }

// var child1 = new Child();
// console.log(child1.getName());
// var child2 = new Child();
// console.log(child2.getName());

// function Parent() {
//   this.name = 'kevin'
// }

// Parent.prototype.getName = function() {
//   console.log(this.name);
// }

// function Child() {
// }

// // child的原型指向Parent的实例
// Child.prototype = new Parent();

// var child1 = new Child();
// console.log(child1.getName());

// 问题
// var funcs: Function[] = [];
// for (var i = 0; i < 3; i++) {
//   funcs[i] = function() {
//     console.log(i);
//   }
// }
// funcs[0]();
// funcs[1]();
// funcs[2]();

// 解法1
// var funcs: Function[] = [];
// for (let i = 0; i < 3; i++) {
//   funcs[i] = function() {
//     console.log(i);
//   }
// }
// funcs[0]();
// funcs[1]();
// funcs[2]();

// 解法2
// var funcs: Function[] = [];
// for (var i = 0; i < 3; i++) {
//   funcs[i] = (function(j) {
//     return function() {
//       console.log(j);
//     }
//   }(i))
// }
// funcs[0]();
// funcs[1]();
// funcs[2]();

// const不允许修改值绑定，但是可以修改值
// 在引用类型中，const定义的值的引用地址不允许被改变，但是值可以被改变
// const arr = [];
// arr = []; // error

// silicon valley  172

/** 函数重载 */
declare function test(a: number): number;
declare function test(a: string): string;

const resS = test("Hello World"); // resS => string
const resN = test(1234); // resN => number

// interface User {
//   name: string;
//   age: number;
// }

// declare function test(para: User): number;
// declare function test(para: number, flag: boolean): number;

// const user = {
//   name: 'jack',
//   age: 12
// }

// // Error: 参数不匹配
// const res = test(user, false);

// interface User {
//   name: string;
//   age: number;
// }

// const user = {
//   name: "jack",
//   age: 16
// };

// class SomeClass {
//   /**
//    * 注释1
//    */
//   public test(para: User): number;
//   /**
//    * 注释2
//    */
//   public test(para: number, flag: boolean): number;
//   public test() {
//     return 1;
//   }
// }

// const someClass = new SomeClass();

// // ok
// someClass.test(user);
// someClass.test(123, false);

// // Error
// someClass.test(123);
// someClass.test(user, false);

type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // type of this in methods is D & M
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let ojbk = makeObject({
  data: {
    x: 0,
    y: 0
  },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx;
      this.y += dy;
    }
  }
})

ojbk.x = 10;
ojbk.y = 10;
ojbk.moveBy(5, 5);


// 映射类型Pick
/* 抽取对象子集的Pick映射类型 */
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T];
// 新类型中只包含指定的FunctionPropertyNames<T>的类型
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}

type T40 = FunctionPropertyNames<Part>;
type T42 = FunctionProperties<Part>;

/* 
keyof T
[id, name, subparts, updatePart]
K: 'id' | 'name' | 'subparts' | 'updatePart'
T[K]: value
value extends Function // 值是否继承于Function(是否是Function类型)
*/

// class SomeClass {
//   value = [1, 2, 3];

//   someMethod() {
//     this.value.find(/* ... */); // ok
//     this.find(/* ... */); // Error: SomeClass没有find方法
//   }
// }

// type ArrayMethodName = 'filter' | 'forEach' | 'find';

// type SelectArrayMethod<T> = {
//   [k in ArrayMethodName]: Array<T>[k]
// }

// interface SomeClass extends SelectArrayMethod<number> {};

// class SomeClass {
//   value = [1, 2, 3];
  
//   someMethods() {
//     this.forEach // ok
//     this.find // ok
//     this.filter // ok
//     this.value // ok
//     this.someMethods(); // ok
//     }
// }

// const someClass = new SomeClass();
// someClass.find // ok
// someClass.filter // ok
// someClass.forEach // ok 
// someClass.value // ok
// someClass.someMethods // ok

// interface MiPhone {
//   name: string;
// }

// const mi5: MiPhone = {
//   name: 'Mi 5'
// }

// const mi3: typeof mi5 = {
//   name: 'Mi 3'
// };

// console.log(typeof mi5);

// interface User {
//   name: string;
//   age: number;
// }

// export default class NewRoom extends Vue {
//   private user = {} as User;
// }
