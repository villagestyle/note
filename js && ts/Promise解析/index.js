// 源码
// function Sprimise(fn) {
//     if (typeof this !== 'object') {
//         throw new TypeError('Promise must be constructed via new');
//     }
//     if (typeof fn !== 'function') {
//         throw new TypeError(`Promisr constructor\'s argument is not a function`);
//     }

//     // 0 - pending
//     // 1 - fulfilled(resolved)
//     // 2 - rejected
//     this._deferredState = 0;
//     this._state = 0;
//     // promise 执行结果
//     this._value = null;
//     // then注册回调数组
//     this._deferreds = null;
//     if (fn === noop) return;
//     // 接受Promise回调函数 和 this 作为参数
//     doResolve(fn, this);
// }

// function Promise(executor) {
//     var self = this;
//     self.status = 'pending'; // Promise当前的状态
//     self.data = undefined; // promise的值
//     self.onResolvedCallback = []; // Promise resolve时的回调函数集, 因为在promise结束之前有可能有多个回调添加到它上面
//     self.onRejectCallback = []; // Promise reject的回调函数集, 因为在promise结束之前可能会有多个回调添加到它上面
// }

// 简单实现
// function Promise(executor) {
//     var self = this;
//     self.onResolvedCallback = [];
//     function resolve(value) {
//         self.data = value;
//         self.onResolvedCallback.forEach(cb => cb(value));
//     }
//     executor(resolve.bind(self));
// }

// Promise.prototype.then = function (onResolved) {
//     var self = this;
//     return new Promise(resolve => {
//         self.onResolvedCallback.push(function () {
//             var result = onResolved(self.data);
//             if (resolve instanceof Promise) {
//                 result.then(resolve);
//             } else {
//                 resolve(result)
//             }
//         })
//     })
// }

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


class SPromise {
    constructor(fn) {
        this.state = PENDING; // 当前状态
        this.value = null; // 终值
        this.reason = null; // 拒因
        // 成功态回调队列
        this.onFulfilledCallbacks = [];
        // 拒绝态回调队列
        this.onRejectedCallbacks = [];

        // 成功态回调
        const resolve = value => {
            // 根据eventloop, 使用setTimeout确保onFulfilled异步执行
            setTimeout(() => {
                if (this.state === PENDING) {
                    // 状态迁移至fulfilled(执行态), 保证调用次数不超过一次
                    this.state = FULFILLED;
                    // 最终值
                    this.value = value;
                    // 执行成功回调
                    this.onFulfilledCallbacks.map(cb => {
                        this.value = cb(this.value);
                    })
                }
            }, 0)
        }

        // 拒绝态回调
        const rejecet = reason => {
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.state = REJECTED;
                    this.reason = reason;
                    this.onRejectedCallbacks.map(cb => {
                        this.reason = cb(reason);
                    })
                }
            }, 0)
        }

        try {
            fn(resolve, rejecet);
        } catch (e) {
            rejecet(e)
        }
    }

    // then方法返回一个promise对象
    then(onFulfilled, onRejected) {
        typeof onFulfilled === 'function' && this.onFulfilledCallbacks.push(onFulfilled);
        typeof onRejected === 'function' && this.onRejectedCallbacks.push(onRejected);
        // 返回this支持then方法可以被同一个promise调用多次
        return this;
    }
}


// 参考 https://juejin.im/post/5c41297cf265da613356d4ec#heading-5