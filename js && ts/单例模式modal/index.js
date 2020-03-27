// 1. 使用类定义

// class Modal {
//     modal = null;
//     create() {
//         const modal = document.createElement('div');
//         modal.className = 'demo-modal';
//         modal.style.display = 'none';
//         document.body.append(modal);
//         this.modal = modal;
//     }

//     show(msg) {
//         if (!this.modal) this.create();
//         this.modal.style.display = 'block';
//         this.modal.innerText = msg;
//     }

//     hide() {
//         if (!this.modal) return;
//         this.modal.style.display = 'none';
//     }
// }
// const modal = new Modal();

// 2. 构造函数定义
// const Modal = (function () {
//     let modal;
//     console.log('执行modal重置');
//     return function () {
//         if (!modal) {
//             modal = document.createElement('div');
//             modal.className = 'demo-modal';
//             modal.style.display = 'none';
//             document.body.append(modal);
//         }
//         return modal;
//     }
// }())

// 分解为

// let modal;
// const Modal = function () {
//     if (!modal) {
//         modal = document.createElement('div');
//         modal.className = 'demo-modal';
//         modal.style.display = 'none';
//         document.body.append(modal);
//     }
//     return modal;
// }

// 重写
// 使用闭包实现
// const Modal = (function () {
//     let modal = null;
//     return function () {
//         if (!modal) {
//             modal = document.createElement('div');
//             modal.className = 'demo-modal';
//             modal.style.display = 'none';
//             document.body.append(modal);
//         }
//         return modal;
//     }
// })()