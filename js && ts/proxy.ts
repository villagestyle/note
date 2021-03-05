// const target = {};
// const handle: ProxyHandler<typeof target> = null;

// const proxy = new Proxy(target, handle);

/**
 * target：要使用Proxy包装的目标对象(可以是任何类型的对象，包括原生数组，函数，甚至另一个代理)；
 * handle：一个通常已函数作为属性的目标，用来定制拦截行为
 */

// ## 仅作介绍使用, 描述对于获取数据的拦截行为
// const originObj: any = {};
// const obj2 = new Proxy(originObj, {
//     get: function(target, propKey, receiver) {
//         return '10';
//     }
// });

// obj2.a; // 10
// obj2.b; // 10

// originObj.a; // undefined;
// originObj.b; // undefined;

// ProxyHandler的定义
interface ProxyHandler<T extends object> {
  getPrototypeOf?(target: T): object | null;
  setPrototypeOf?(target: T, v: any): boolean;
  isExtensible?(target: T): boolean;
  preventExtensions?(target: T): boolean;
  getOwnPropertyDescriptor?(
    target: T,
    p: PropertyKey
  ): PropertyDescriptor | undefined;
  // in操作符的捕捉器
  has?(target: T, p: PropertyKey): boolean;
  // 属性读取操作的捕捉器
  get?(target: T, p: PropertyKey, receiver: any): any;
  // 属性设置操作的捕捉器
  set?(target: T, p: PropertyKey, value: any, receiver: any): boolean;
  // delete操作符的捕捉器
  deleteProperty?(target: T, p: PropertyKey): boolean;
  defineProperty?(
    target: T,
    p: PropertyKey,
    attributes: PropertyDescriptor
  ): boolean;
  // Object.getOwnPropertyNames方法和Object.getOwnPropertySymbol方法的捕捉器
  ownKeys?(target: T): PropertyKey[];
  // 函数调用操作的捕捉器
  apply?(target: T, thisArg: any, argArray?: any): any;
  // new操作符的捕捉器
  construct?(target: T, argArray: any, newTarget?: any): object;
}

// const person = {
//     like: 'girl'
// }

// const obj = new Proxy<typeof person>(person, {
//     get: function(target, propKey) {
//         if (propKey in target) {
//             return target[propKey];
//         } else {
//             throw new ReferenceError(`prop name "${propKey}" dose not exist`);
//         }
//     }
// });

// obj.like;
// 上面的代码表示在读取代理目标的值时，如果有值则直接返回，没有值就抛出一个自定义的错误

/**
 * 如果要访问的目标属性是不可写以及不可配置的，则返回的值必须与该目标属性的值相同
 * 如果要访问的目标属性没有配置访问方法，即get方法是undefined的，则返回值必须为undefined
 */
// const obj = {};

// Object.defineProperty(obj, 'a', {
//     configurable: false, // 是否可配置
//     enumerable: false,
//     value: 10,
//     writable: false // 是否可写入
// });

// const p = new Proxy(obj, {
//     get: function(target, prop) {
//         return 20;
//     }
// });

// p.a; // Uncaught TypeError: 'get' on proxy: property 'a' is a read-only and non-configurable..

interface ProxyConstructor {
  revocable<T extends object>(
    target: T,
    handler: ProxyHandler<T>
  ): { proxy: T; revoke: () => void };
  new <T extends object>(target: T, handler: ProxyHandler<T>): T;
}

// ## 可撤销的Proxy
// Proxy.revocable

// const target = { name: 'laowang' };
// const { proxy, revoke }  = Proxy.revocable(target, null);

// proxy.name; // laowang
// revoke();
// proxy.name; // TypeError: Revoked
