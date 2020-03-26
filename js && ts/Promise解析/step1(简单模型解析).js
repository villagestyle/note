// 定义三种状态
const PENDING = "PENDING";
const FUIFILLED = "FUIFILLED";
const REJECTED = "REKECTED";

function MyPromise (executor) {
    let self = this; // 缓存当前promise实例
    self.value = null;
    self.error = null;
    self.status = PENDING;
    self.onFulfilled = null; // 成功的回调函数
    self.onRejected = null; // 失败的回调函数

    const resolve = (value) => {
        console.log('执行成功回调');
        if (self.status !== PENDING) return;
        setTimeout(() => {
            self.status = FUIFILLED;
            self.value = value;
            self.onFulfilled(self.value); // resolve时执行成功回调
        })
    }

    const reject = (error) => {
        console.log('执行失败回调');
        if (self.status !== PENDING) return;
        setTimeout(() => {
            self.status = REJECTED;
            self.error = error;
            self.onRejected(self.error); // resolve时执行成功回调
        })
    }
    console.log(executor); // 回调函数 (res, rej) => {}
    executor(resolve, reject);
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    
    if (this.status === PENDING) {
        this.onFulfilled = onFulfilled;
        this.onRejected = onRejected;    
    }

    if (this.status === FUIFILLED) {
        // 如果状态时fulfilled, 直接执行成功回调, 并将成功值传入
        onFulfilled(this.value);
    }

    if (this.status === REJECTED) {
        // 如果状态是rejected, 直接执行失败回调, 并将失败原因传入
        onRejected(this.error);
    }
}

var pro = new MyPromise((res, rej) => {
    setTimeout(() => {
        console.log(1);
        res(1); // 触发回调
    }, 1000);
})
.then(() => {
    // 成功回调
    console.log('执行成功');
}, 
() => {
    // 失败回调
})

console.log(pro);

// var pro = new Promise((res, rej) => {
//     console.log('执行pro内部');
//     setTimeout(() => {
//         console.log('执行外层定时器');
//         setTimeout(() => {
//             console.log('执行内部定时器');
//             // res(1);
//         }, 1000);
//     }, 1000);
// }).then(ret => {
//     console.log('执行完毕');
// })

// function resolve() {
//     then();
// }

// function then () {
//     console.log('成功回调');
// }

// setTimeout(() => {
//     console.log(111);
//     resolve();
// }, 1000);

// promise有三个状态, PENDING FUIFILLED REJECTED
// resolve, reject 内部方法
// 当初始化promise时, 他会声明状态为PENDING, 当用户在
// promise中调用resolve或者reject时(状态会变为对应的状态), 
// 就会触发相应的回调(then, catch)来执行回调中的方法(简易模型如上)

// 还未实现链式调用