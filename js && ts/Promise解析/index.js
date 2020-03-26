const PENGDING = 'PENGDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
function myPromise(fn) {
    let _this = this;
    _this.currentState = PENGDING;
    _this.value = undefined;
    _this.resolveCallbacks = [];
    _this.rejectedCallbacks = [];

    _this.resolve = function (value) {
        if (value instanceof myPromise) {
            return value.then(_this.resolve, _this.reject);
        }
        setTimeout(() => {
            if (_this.currentState === PENGDING) {
                _this.currentState = RESOLVED;
                _this.value = value;
                _this.resolveCallbacks.forEach(cb => {
                    cb();
                });
            }
        })
    }

    _this.reject = function (reason) {
        setTimeout(() => {
            if (_this.currentState === PENGDING) {
                _this.currentState = REJECTED;
                _this.value = reason;
                _this.rejectedCallbacks.forEach(cb => cb());
            }
        })
    }

    try {
        fn(_this.resolve, this.reject);
    } catch (e) {
        this.reject(e);
    }
}

myPromise.prototype.then = function (onResolved, onRejected) {
    var self = this;
    var promise2;
    onResolved = typeof onResolved === 'function' ? onResolved : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r };

    if (self.currentState === RESOLVED) {
        return (promise2 = new myPromise(function (resolve, reject) {
            setTimeout(() => {
                try {
                    var x = onResolved(self.value);
                    resolutionProcedure(promise2, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            })
        }))
    }

    if (self.currentState === REJECTED) {
        return (promise2 = new myPromise(function (resolve, reject) {
            setTimeout(function () {
                // 异步执行onRejected
                try {
                    var x = onRejected(self.value);
                    resolutionProcedure(promise2, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            })
        }))
    }

    if (self.currentState === PENGDING) {
        return (promise2 = new myPromise(function (resolve, reject) {
            self.resolvedCallbacks.push(function () {
                // 考虑到可能会报错, 使用try catch包裹
                try {
                    var x = onResolved(self.value);
                    resolutionProcedure(promise2, x, resolve, reject);
                } catch (reason) {
                    reject(reason)
                }
            })

            self.rejectedCallbacks.push(function () {
                try {
                    var x = onRejected(self.value);
                    resolutionProcedure(promise2, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            })
        }))
    }
}

myPromise.prototype.catch = function (rejectFn) {
    return this.then(undefined, rejectFn);
}

myPromise.prototype.finally = function (callback) {
    return this.then(
        value => myPromise.resolve(callback()).then(() => value),
        reason => myPromise.resolve(callback()).then(() => { throw reason })
    )
}

myPromise.resolve = function (value) {
    return new myPromise(function (resolve, reject) {
        return resolve(value)
    })
}

myPromise.reject = function (value) {
    return new myPromise(function (resolve, reject) {
        return reject(value)
    })
}

myPromise.rece = function (promises) {
    return new myPromise((resolve, reject) => {
        for (var i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)
        }
    })
}

// all方法(获取所有的promise, 都执行then, 把结果放到数组一起返回)
myPromise.all = function (promises) {
    let arr = [];
    let i = 0;

    function processData(index, data) {
        arr[index] = data;
        i++;
        if (index === promises.length) {
            resolve(arr);
        }
    }

    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then((data) => {
                processData(i, data);
            }, reject);
        }
    })
}

// 规范2.3
function resolutionProcedure(promise2, x, resolve, reject) {
    // 规范2.3.1, x不能和promise相同, 避免循环引用
    if (promise2 === x) {
        return reject(new TypeError('Error'));
    }
    // 规范2.3.2
    // 如果x为promise, 状态为pending需要继续等待否则执行
    if (x instanceof myPromise) {
        if (x.currentState === PENGDING) {
            x.then(function (value) {
                // 再次调用该函数是为了确认x resolve的参数是什么类型, 如果是基本类型就再次resolve
                // 把值传给下个then
                resolutionProcedure(promise2, value, resolve, reject);
            }, reject)
        } else {
            x.then(resolve, reject);
        }
        return;
    }
    // 规范2.3.3.3.3
    // reject或者resolve其中一个执行过的话, 忽略其他的
    let called = false;
    // 规范2.3.3 判断x是否为对象或者函数
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        // 规范2.3.3.2 如果不能取出then, 就reject
        try {
            // 规范2.3.3.1
            let then = x.then;
            // 如果then是函数, 调用x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    // 规范2.3.3.3.1
                    resolutionProcedure(promise2, y, resolve, reject);
                },
                    e => {
                        if (called) return;
                        called = true;
                        reject(e);
                    })
            } else {
                // 规范2.3.3.4
                resolve(x)
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        // 规范2.3.4, x为基本类型
        resolve(x);
    }
}

// 参考 https://juejin.im/post/5e7854ff518825495d69d4a9#heading-10

// var obj = {
//     a: 1
// }
// var value = obj.a;
// Object.defineProperty(obj, 'a', {
//     get: () => {
//         console.log('触发get方法');
//         return value;
//     },
//     set: (val) => {
//         console.log('触发set方法');
//         if (val === value) return;
//         value = val;
//     }
// })