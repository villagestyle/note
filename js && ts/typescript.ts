function greeter(person: String): string {
  return person + ',hi'
}
let user = 'Jane User';

let data: any = 'aa';

let bool: boolean = true;

interface Person {
  name: String,
  age: Number
}

var tom: Person = {
  name: 'tom',
  age: 2
}

interface Person2 {
  name: String,
  age?: Number
}

let jane: Person2 = {
  name: '112'
}

interface Person3 {
  name: String;
  age?: Number;
  [propName: string]: any
}

let sony: Person3 = {
  name: 'sony',
  height: 185,
  weight: 150
}

interface Person4 {
  readonly id: String, // 设置为只读，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
  name: String,
  ang?: Number,
  [propName: string]: any
}

let kangk: Person4 = {
  id: '152asq4r8', // 试图修改该属性会报错
  name: 'kang',
  height: 999
}

let fibonacci: Array<number> = [1, 2, 3, 4]

let list: any[] = [1, 2, '5', {
  name: 555
}];

// function sum(num1: number, num2: number): number {
//     return num1 + num2;
// }

let mySum: (x: number, y: number) => number = function (x: number, y: number) {
  return x + y;
}

interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc;
mySearch = function (score: string, subString: string) {
  return score.search(subString) !== -1;
}

// function buildName(firstName: string = 'lily', lastName: string = 'pandagan'): string{
//     return firstName + ' ' + lastName;
// }

// let ache = buildName();
// let jone = buildName('tom', 'cat')
console.log('11')


function push(array: Array<any>, ...items: any[]) {
  // 得到的items是一个数组
  items.forEach(item => {
    array.push(item)
  })
}

// let a = [];
// push(a, 1, 2, 3);
// console.log(a);


function reverce(x: number | string): number | string {
  if (typeof x === 'string') {
    return x.split('').reverse().join('');
  } else {
    return Number(x.toString().split('').reverse().join(''))
  }
}

console.log(reverce(54321))
console.log(reverce('123456'))

// 类型断言 <>
function getLength(something: string | number): number {
  if ((<string>something).length) { // 断言something将会是string类型
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
    console.log(`meow my name is ${this.name}`)
  }
}
let cat = new Cat('tom');


// 类与接口
// 如果你希望在类中使用必须遵循的接口（类）或是别人定义的对象结构，可以使用 implements 关键字来确保兼容性：

interface Alerm {
  alert();
}

class Door {

}

class SecurityDoor extends Door implements Alerm {
  alert() {
    console.log('secur')
  }
}

class Car implements Alerm {
  alert() {
    console.log('car alert')
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
creareArray(3, 5)


// 申明合并
// 如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型

interface Alermt {
  price: number
}

interface Alermt {
  name: string
}

interface Alermt {
  id: string
}

interface Alermt {
  price: number;
  name: string;
  id: string;
  type: string;
  alert(): string
}

class Alerms implements Alermt {
  price: 55;
  name: '标签';
  id: '1';
  type: '办公用品';
  alert(): string {
    return ''
  }
}

// 枚举 enum

enum Color { Red = 5, Green, Blue, ligntBlue };
let colorName: string = Color[6];
console.log(colorName); // 'Green'

interface SqureConfig {
  color?: string;
  width: number;
}
function createSqure(config: SqureConfig): SqureConfig {
  let newSquare = { color: 'white', width: 888 };
  if (config.color) {
    newSquare.color = config.color;
  }
  newSquare.width = config.width;
  return newSquare;
}

interface Point {
  readonly x: number;
  y: number
}

let point1: Point = {
  x: 55,
  y: 6
}

point1.y = 555;
// point1.x = 666; // Cannot assign to 'x' because it is a read-only property

// 用接口描述函数类型
interface SearchFunc2 {
  (score: string, subString: string): boolean
}
let searchFunc2: SearchFunc2;
searchFunc2 = function () {
  return true;
}

function toDetail(arr: Array<any> | number | string): number {
  if (typeof arr === 'number') {
    return arr + 50;
  } else {
    return arr.length;
  }
}

class Animal4 {
  name: string
}

class Dog extends Animal4 {
  breed: string
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
  { id: 5, label: "Hello", color: "red", sorting: 6 }],
  keys = ['label', 'color'],
  filtered = listOfTags.filter(
    (s =>
       o => (k => !s.has(k) && s.add(k))(keys.map(k => o[k]).join('|'))
       )(new Set)
    );

console.log(filtered);

interface SearchPage {
  pageNum: number,
  rows: number,
  name: string,
  schoolYearId: number,
  [propName: string]: any
}

let obg: SearchPage = {
  pageNum: 1,
  rows: 1,
  name: '',
  schoolYearId: 1,
  text: 1
}