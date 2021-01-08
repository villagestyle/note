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
};

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
});

ojbk.x = 10;
ojbk.y = 10;
ojbk.moveBy(5, 5);

// 映射类型Pick
/* 抽取对象子集的Pick映射类型 */
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
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

export const enum ObjectFlags {
  Class = 1 << 0,
  interface = 1 << 1
}

enum Days {
  Sum,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}

// Days.Wed // number = 3

enum color {
  red,
  blue,
  green = "g",
  grey = "y",
  pop = 7,
  origin
}

// Color.blue === 1; // true
// Color.green === 'g'; // true
// Color.origin === 8;
// 如果紧接在计算所得项后，未手动赋值的项就会报错

enum Config {
  baseURL = "www.baidu.com"
}

const config = {
  baseURL: "www.baidu.com"
};

const enum NoYes {
  No,
  Yes
}

var a: MethodDecorator;

// 数组去重
var array = ["1", "1", "1", "2", "2"];

// 双重for循环
// function unique(arr: typeof array) {
//   var result = [];
//   var hasSimilar = false;
//   result.push(arr[0]);
//   for (var i = 0; i < arr.length; i++) {
//     for (var j = 0; j < result.length; j++) {
//       if (arr[i] === result[j]) {
//         hasSimilar = true;
//         break;
//       }
//     }
//     if (!hasSimilar) {
//       result.push(arr[i])
//     }
//     hasSimilar = false;
//   }
//   return result;
// }

// unique(array);

// indexOf方法
// function unique(arr: any[]) {
//   var res = [];
//   for (var i = 0; i < arr.length; i++) {
//     if (res.indexOf(arr[i]) === -1) {
//       res.push(arr[i]);
//     }
//   }
//   return res;
// }

// unique(array);

// 先排序再去重
// 对于[1, '1', 1, '1']这种数组无法起到排序作用，会导致错误
// var array2 = [1, '1', 1, '1'];
// function unique(arr) {
//   if (arr.length === 0 || arr.length === 1) {
//     return arr;
//   }
//   let res = [];
//   const selfArr = arr.slice(0);
//   selfArr
//     .sort((a, b) => a - b)
//     .reduce((pre, cur) => {
//       if (cur !== pre) {
//         res.push(pre);
//         res.push(cur);
//       }
//       return pre = cur;
//     });
//   return res;
// }

// unique(array2);

interface Good {
  id: number;
  desc: string;
  price: number;
  number: number;
}

var goodList: Good[] = [
  {
    number: 1,
    id: 1,
    price: 1,
    desc: "1"
  },
  {
    number: 2,
    id: 2,
    price: 2,
    desc: "2"
  }
];

function del(id: number) {
  return goodList.filter(d => {
    if (d.id === id && d.number === 1) {
      return false;
    } else if (d.id === id) {
      d.number--;
    }
    return true;
  });
}

// 如果希望每隔 1s 输出一个结果，应该如何改造？注意不可改动 square 方法
const list = [1, 2, 3];
const square = num => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};

var tests = async () => {
  for (var i = 0; i < list.length; i++) {
    const res = await square(list[i]);
    console.log(res);
  }
};
tests();

let fn: Function = async () => {};

parseInt("1", 0);
parseInt("2", 1);
parseInt("3", 2);
// ['1', '2', '3'].map(parseInt)

// 防抖
function debounce(fn: Function) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, 500);
  };
}

// 节流
function throttle(fn: Function) {
  let canRun = true;
  return function (...arg) {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arg);
      canRun = true;
    }, 500);
  };
}

// 都是通过闭包实现变量管理/不需要生成全局变量

// Set也会检查筛选掉引用地址相同的变量

var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

// depth 深度
// arr.flat([depth]);
// arr.flat(5)

function fnFlat(arr: any[]) {
  return arr.reduce((pre, cur) => {
    if (typeof cur === "number") {
      pre.push(cur);
      return pre;
    } else {
      return pre.concat(fnFlat(cur));
    }
  }, []);
}

class LRUCache {
  CACHE: {
    [key: number]: number;
  } = {};
  max: number = 3;
  private keyCache: number[] = [];

  constructor(
    cache: {
      [key: number]: number;
    },
    max: number
  ) {
    this.CACHE = cache;
    this.max = max;
  }

  public put(key: number, value: number) {
    this.CACHE[key] = value;
    this.keyCache.push(key);
    if (this.keyCache.length > this.max) {
      delete this.CACHE[this.keyCache.shift()];
    }
  }

  public get(key: number) {
    return this.CACHE[key] || -1;
  }
}

// 单链表
function List() {
  let Node = function (ele) {
    this.element = ele;
    this.next = null;
  };

  // 初始化头节点为null
  let head = null;

  // 链表长度
  let length = 0;

  // 操作
  this.getList = function () {
    return head;
  };

  this.search = function (element) {
    let p = head;
    if (!p) return false;
    while (p) {
      if (p.element === element) return true;
      p = p.next;
    }
    return false;
  };

  this.append = function (element) {
    let node = new Node(element);
    let p = head;
    if (!head) {
      head = node;
    } else {
      while (p.next) {
        p = p.next;
      }
      p.next = node;
    }
    length += 1;
  };

  this.insert = function (position, element) {
    let node = new Node(element);
    if (position >= 0 && position <= length) {
      let prev = head;
      let cur = head;
      let index = 0;
      if (position === 0) {
        node.next = head;
        head = node;
      } else {
        while (index < position) {
          prev = cur;
          cur = cur.next;
          index++;
        }
        prev.next = node;
        node.next = cur;
      }
      length += 1;
    } else {
      return null;
    }
  };

  this.remove = function (element) {
    let p = head;
    let prev = head;
    while (p) {
      if (p.element === element) {
        p = p.next;
        prev.next = p;
      } else {
        prev = p;
        p = p.next;
      }
    }
  };

  this.isEmpty = function () {};

  this.size = function () {};
}

// 双链表
function DoublyLinkedList() {
  let Node = function (ele) {
    this.element = ele;
    this.prev = null;
    this.next = null;
  };
  let head = null;
  let tail = null;
  let length = 0;

  this.insert = function (position, element) {
    let node = new Node(element);
    if (position >= 0 && position < length) {
      let prev = head;
      let cur = head;
      let index = 0;
      if (position === 0) {
        if (!head) {
          head = node;
          tail = node;
        } else {
          node.next = head;
          head.prev = node;
          head = node;
        }
      } else if (position === length) {
        cur = tail;
        cur.prev = node;
        head = node;
      } else if (position === length) {
        cur = tail;
        cur.next = head;
        head = node;
      } else {
        while (index < position) {
          prev = cur;
          cur = cur.next;
          index++;
        }
        prev.next = node;
        node.next = cur;
        cur.prev = node;
        node.prev = prev;
      }
      length += 1;
      return true;
    } else {
      return false;
    }
  };

  this.removeAt = function (position) {
    if (position >= 0 && position < length && length > 0) {
      let prev = head;
      let cur = head;
      let index = 0;
      if (position === 0) {
        // 移除头节点
        if (length === 1) {
          head = null;
          tail = null;
        } else {
          head = head.next;
          head.prev = null;
        }
      } else if (position === length - 1) {
        cur = tail;
        tail = cur.prev;
        tail.next = null;
      } else {
        while (index < position) {
          prev = cur;
          cur = cur.next;
          index++;
        }
        prev.next = cur.next;
        cur.next.pre = prev;
      }
      length -= 1;
      return cur.element;
    } else {
      return null;
    }
  };

  this.isEmpty = function () {
    return length === 0;
  };

  this.size = function () {
    return length;
  };
}

// 循环单链表
function CircularLinkedList() {
  let Node = function (element) {
    this.element = element;
    // 后继指针
    this.next = null;
  };
  // 初始头节点为 null
  let head = null;

  // 链表长度
  let length = 0;
  // 操作
  this.search = function (element) {
    if (!head) return false;
    let p = head;
    let index = 0;
    while (index++ < length) {
      if (p.element === element) return true;
      p = p.next;
    }
    return false;
  };

  this.insert = function (positon, element) {
    let node = new Node(element);
    if (positon >= 0 && positon <= length) {
      let prev = head;
      let cur = head;
      let index = 0;
      if (positon === 0) {
        while (index < length) {
          prev = cur;
          cur = cur.next;
          index++;
        }
        prev.next = node;
        node.next = cur;
        head = node;
      } else {
        while (index < positon) {
          prev = cur;
          cur = cur.next;
          index++;
        }
        prev.next = node;
        node.next = cur;
      }
      length += 1;
    } else {
      return null;
    }
  };

  this.remove = function (element) {
    let p = head;
    let prev = head;
    let index = 0;
    if (!head) return;
    if (length === 1 && head.element === element) {
      head = null;
      length--;
      return;
    }
    while (index++ < length) {
      if (p.element === element) {
        p = p.next;
        prev.next = p;
        length--;
      } else {
        prev = p;
        p = p.next;
      }
    }
  };
  this.isEmpty = function () {
    return length === 0;
  };
  this.size = function () {
    return length;
  };
}

// 合并两个有序链表
// 将两个升序链表合并为一个新的升序链表并返回，新链表是用过拼接给定的两个链表的所有节点组成的
// 示例：
/**
 * 输入 1 > 2 > 3, 1 > 3 > 4
 * 输出 1 > 1 > 2 > 3 > 4 > 4
 */

/**
 * 方案1
 * 抽取两个链表中的所有数据进入数组, 排序后再转为链表
 */

function mergeLinkedList(list1, list2) {
  // 抽取数据
  const arr1 = extractData(list1);
  const arr2 = extractData(list2);

  // 排序
  const result = [...arr1, arr2].sort((a, b) => a - b);

  // 将结果数组转换成链表
  return toLinkedList(result);
}

function Node(ele: any): Node {
  return {
    next: null,
    element: ele
  };
}

function extractData(head: any) {
  let arr = [];
  let cur = head;
  while (cur) {
    arr.push(cur.element);
    cur = cur.next;
  }
  return arr;
}

function toLinkedList<T>(arr: Array<T>): LinkedList {
  if (arr.length === 0) {
    return null;
  } else {
    const linkedArr = arr.map(d => Node(d));
    const linkedList: LinkedList = {
      head: null,
      size: 0
    };
    let head = null;
    let index = 0;
    const result = linkedArr.reduce((pre, cur) => {
      if (!pre) {
        pre = cur;
        head = pre;
      } else {
        pre.next = cur;
        pre = cur;
      }
      index++;
      return pre;
    }, null);
    linkedList.head = head;
    linkedList.size = index;
    return linkedList;
  }
}

interface Node {
  element: any;
  next: Node;
}

interface LinkedList {
  size: number;
  head: Node;
}

/**
 * 方案2
 * 基于两个链表都为有序链表, 可以进行逐级对比
 */

/**
 *
 * @param list1 head
 * @param list2 head
 */
function mergeOrderLinkedList(list1: Node, list2: Node) {
  if (!list1.element) {
    return list2.element;
  }
  if (!list2.element) {
    return list1.element;
  }

  if (list1.element < list2.element) {
    list1.next = mergeOrderLinkedList(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeOrderLinkedList(list2.next, list1);
    return list2;
  }
}

class MinStack {
  min: number;
  stack: number[] = [];

  push(val: number) {
    this.stack.push(val);
    this.min = Math.min(...this.stack);
  }

  pop() {
    this.min = Math.min(...this.stack);
    return this.stack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.min;
  }
}

// 滑动窗口最大值问题
/**
 * 给定一个数组nums和滑动窗口的大小k, 请找出所有滑动窗口里的最大值
 * 示例:
 * 输入 nums = [1, 3, -1, -3, 5, 3, 6, 7], 和 k = 3
 * 输出 [3, 3, 5, 5, 6, 7]
 */

/**
 * 方案1 对数组做切片求最大值
 */

function maxSlidingWindow(nums: number[], k: number) {
  const result = [];
  for (var i = 0; i < nums.length - k + 1; i++) {
    const arr = nums.slice(i, i + k);
    result.push(Math.max(...arr));
  }
  return result;
}

// 求多个数组的交集

var arr1 = [1, 2, 3, 4, 5];
var arr2 = [3, 4, 5, 6, 7];
var arr3 = [5, 6, 7, 8, 9];

function intersection(...arr: [number[]]) {
  var ret = [];
  var set = new Set();
  var result = [];
  arr.map(d => {
    ret = ret.concat(d);
  });
  ret.map((d: number) => {
    if (set.has(d) && !result.includes(d)) {
      result.push(d);
    }
    set.add(d);
  });
  return result;
}

function f(n) {
  const cache = [];
  /**
   * @param amount 剩余的总价
   * min: 最小的总钱数
   * 返回min值
   */
  function makeChange(amount) {
    if (amount < 0) return 0;

    // 校验是否已经计算过
    if (cache[amount]) return cache[amount];

    let min = Infinity;
    if (amount >= 1) {
      min = Math.min(makeChange(amount - 1) + 1, min);
    }

    if (amount >= 5) {
      min = Math.min(makeChange(amount - 5) + 1, min);
    }

    if (amount >= 11) {
      min = Math.min(makeChange(amount - 11) + 1, min);
    }

    /**
     * amount = 15
     * Math.min(makeChange(14) + 1, Infinity) ==> makeChange(14) + 1
     *
     *
     * makeChange(10)
     *
     *
     * makeChange(4)
     *
     *
     */

    return (cache[amount] = min);
  }
  return makeChange(n);
}

var waysToChange = function (n) {
  const cache = [];

  function change(amount) {
    // 10
    let count = 0;
    if (cache[amount]) return cache[amount];

    if (amount >= 1) {
      count += change(amount - 1); // 1
    }

    if (amount >= 5) {
      count += change(amount - 5); // 5
    }

    if (amount >= 10) {
      count += change(amount - 10); // + 1
    }

    if (amount >= 25) {
      count += change(amount - 25);
    }

    if (amount === 0) {
      count++;
    }
    return (count[amount] = count);
  }
  return change(n);
};

/**
 * change(5)
 * change(4)
 * change(3)
 * change(2)
 * change(1)
 * change(0) ++
 *
 * change(0) ++
 *
 * return 1;
 */

var str = "[()]";

var isValid = function (s: string) {
  var arr = [];
  for (var i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "[":
        arr.push("]");
        break;
      case "(":
        arr.push(")");
        break;
      case "{":
        arr.push("}");
        break;
      case ")": {
        if (arr.pop() !== "(") return false;
        break;
      }
      case "]": {
        if (arr.pop() !== "[") return false;
        break;
      }
      case "}": {
        if (arr.pop() !== "{") return false;
        break;
      }
    }
  }
  return !arr.length;
};

// [
//   {
//     id: '',
//     userId: '',
//     songSheet: [
//       {
//         id: '',
//         name: '',
//         songs: []
//       },
//       {
//         id: '',
//         name: '',
//         songs: []
//       }
//     ]
//   }
// ]

[
  {
    id: '',
    userId: '',
    assess_token: '',
    refresh_token: ''
  }
]

// 链表
interface HooK {
  queue: Queue;
  next: HooK;
}

interface Queue {
  dispatch: any;
  last: Update; // update链表的head
}

// 环状链表结构
interface Update {
  action: any; // 动作
  next: Update;
}

interface Com {
  // 设置setState('') setState(0)
  hook: HooK // hook链表的head
}

/**
 * 碰到useState('')怎么解析
 * 
 * 生成空hook对象
 * 判断hook链表是否生成
 * 
 * 以存在就接入到上个hook对象的next里
 * 不存在就把当前hook对象作为hook链表的head
 * 
 * 获取初始值 => 判断初始值类型
 * 
 * 初始值类型为Function => val = fn()
 * val = val
 * 
 * 添加queue更新队列
 * key = value
 * 
 * 添加dispatch方法
 * 
 * 如何添加dispatch方法
 * 绑定dispatchAction方法, 预注入fiber对象和Hook.queue对象
 * 
 * dispatchAction的功能是?
 * 初始化更新队列queue.update
 * 
 * 如何预注入
 * const dispatch = dispatchAction.bind(null, fiber, Hook.queue);
 * dispatchAction: (fiber, queue, action) => void
 * 
 * 返回[initialValue, dispatch]
 */

//  enum Direction {
//    North,
//    South,
//    East,
//    West
//  }

//  const enumxx: Direction = Direction.East;
//  var dir: string[] = ['2'];

//  console.log(dir[enumxx])

// var unknow: unknown;

// String.toString.call(null, unknow);

// window.history.replaceState

const video = document.createElement('video');

var str = '这 不错 哦'
var reg = new RegExp(`[${str.split(' ').join('|')}]`, 'gi')
var str = '不错----这+++哦***';
str.replace(reg, '');