// class Dog {

//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     name;
//     age;

//     eat() {
//         console.log('肉骨头真好吃');
//     }
// };

// 上面的代码等价于下面这个构造函数

// function Dog (name, age) {
//     this.name = name;
//     this.age = age;
// }

// Dog.prototype.eat = function () {
//     console.log('肉骨头真好吃');
// }

// var dog = new Dog('旺财', 12);

// __proto__: 构造函数的原型
// dog.__proto__ === Dog.prototype;
// Dog.prototype.__proto__ === Object.prototype;
// Dog.__proto__ === Function.prototype
// Function.prototype.__proto__ === Object.prototype

// 实现JS中的深拷贝

// 1. 使用JSON.stringify
// const liLei = {
//     name: 'liLei',
//     age: 28,
//     habits: ['coding', 'hiking', 'running']
// }

// const liLeiStr = JSON.stringify(liLei);
// const liLeiCopy = JSON.parse(liLeiStr);
// liLeiCopy.habits.splice(0, 1);

// console.log('李雷副本的habit数组是', liLeiCopy.habits);
// console.log('李雷的habits数组是', liLei.habits);


// 2. 使用递归
// function DeepCopy(obj) {

//     if (typeof obj !== 'object' || obj === null) {
//         return obj;
//     }

//     let copy = {};

//     if (obj instanceof  Array) {
//         copy = [];
//     }

//     for (const key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             copy[key] = DeepCopy(obj[key]);
//         }
//     }

//     return copy;

// };
