// 非单例
// class SingleDog {
//     show() {
//         console.log('我是一个单例对象');
//     }
// }

// const s1 = new SingleDog();
// const s2 = new SingleDog();

// s1 === s2; // false

// =====================================================

// class SingleDog {

//     static instance: SingleDog;

//     show() {
//         console.log('我才是单例对象');
//     }

//     static getInstance() {
//         if (!SingleDog.instance) {
//             SingleDog.instance = new SingleDog();
//         }
//         return SingleDog.instance;
//     }
// }

// const s1 = SingleDog.getInstance();
// const s2 = SingleDog.getInstance();

// s1 === s2; // true


// 实现一个 Storage
// 实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。

// 静态方法版
// class Storage1 {

//     static instance: Storage1;
//     public store: any = {};

//     static getInstance () {

//         if (!Storage1.instance) {
//             Storage1.instance = new Storage1();
//         }
//         return Storage1.instance;

//     }

//     public getItem (key: string) {
//         return this.store[key]
//     }
    
//     public setItem (key: string, value: any) {
//         this.store[key] = value;
//         return this.store[key];
//     }

// }

// const storage1 = Storage1.getInstance();
// const storage2 = Storage1.getInstance();

// storage1.setItem('name', '老王');
// storage1.getItem('name') === storage2.getItem('name');

// 闭包版

// 先实现一个基础的StorrageBase类, 把getItem和setItem方法放在他的原型链上
// function StorageBase() {

//     StorageBase.prototype.getItem = (key: string) => {
//         localStorage.getItem(key);
//     }

//     StorageBase.prototype.setItem = (key: string, value: any) => {
//         localStorage.setItem(key, value)
//     }

// }

// const Storage2 = (function() {
//     let instance = null;

//     return function() {

//         if (!instance) {
//             instance = new StorageBase();
//         }
//         return instance;

//     }

// }())

// const storage1 = Storage2();
// const storage2 = Storage2();

// storage1.setItem('name', '老王');
// storage1.getItem('name') === storage2.getItem('name');

// 实现一个全局的模态框

// class Modal {

//     static modal: HTMLDivElement;

//     create(text) {

//         if (!Modal.modal) {
//             this.init(text);
//         } else {
//             this.update(text);
//         }
//         return this;

//     }

//     init(text) {
//         Modal.modal = document.createElement('div');
//         Modal.modal.style.display = 'none';
//         Modal.modal.style.width = '200px';
//         Modal.modal.style.height = '200px';
//         Modal.modal.style.position = 'fixed';
//         Modal.modal.style.left = 'calc(50% - 100px)';
//         Modal.modal.style.top = '200px';
//         Modal.modal.style.backgroundColor = '#fff';
//         Modal.modal.innerText = text || '这是模态框';
//         document.body.appendChild(Modal.modal);
//     }

//     update(text) {
//         Modal.modal.innerText = text;
//     }

//     show() {
//         Modal.modal.style.display = 'block';
//     }

//     hide() {
//         Modal.modal.style.display = 'none';
//     }

// }

// new Modal().create('这是第一个模态框').show();
// new Modal().create('这是第二个模态框').show();

