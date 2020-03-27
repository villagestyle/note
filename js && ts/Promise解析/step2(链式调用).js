// 定义三种状态
const PENDING = "PENDING";
const FUIFILLED = "FUIFILLED";
const REJECTED = "REKECTED";

function MyPromise(executor) {
    let self = this; // 缓存当前promise实例
    self.value = null;
    self.error = null;
    self.status = PENDING;
    self.onFulfilledCallbacks = []; // 成功的回调函数集合
    self.onRejectedCallbacks = []; // 失败的回调函数集合

    const resolve = value => {
        console.log("执行成功回调");
        if (self.status !== PENDING) return;
        setTimeout(() => {
            self.status = FUIFILLED;
            self.value = value;
            console.log(self.onFulfilledCallbacks);
            self.onFulfilledCallbacks.forEach(cb => cb(self.value));
        });
    };

    const reject = error => {
        console.log("执行失败回调");
        if (self.status !== PENDING) return;
        setTimeout(() => {
            self.status = REJECTED;
            self.error = error;
            self.onRejectedCallbacks.forEach(cb => cb(self.error));
        });
    };
    executor(resolve, reject);
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    console.log('then声明');
    let bridgePromise;
    let self = this;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : onFulfilled => onFulfilled;
    onRejected = typeof onRejected === 'function' ? onRejected : onRejected => onRejected;
    // 需要返回MyPromise
    if (this.status === PENDING) {
        console.log('执行数据收集');
        return bridgePromise = new MyPromise((resolve, reject) => {
            self.onFulfilledCallbacks.push(
                (value) => {
                    try {
                        console.log(onFulfilled);
                        let x = onFulfilled(value); // x指向第一个then中返回的MyPromise
                        resolve(x); // 将新的promise返回
                    } catch (e) {
                        reject(e);
                    }
                }
            );
            self.onRejectedCallbacks.push((error) => {
                try {
                    let x = onRejected(error);
                    resolve(x);
                } catch (e) {
                    reject(e);
                }
            })
        })
    }

    if (this.status === FUIFILLED) {
        // 如果状态时fulfilled, 直接执行成功回调, 并将成功值传入
        onFulfilledCallbacks(this.value);
    }

    if (this.status === REJECTED) {
        // 如果状态是rejected, 直接执行失败回调, 并将失败原因传入
        onRejected(this.error);
    }
};


// 如果要实现链式调用?
var data = 1;
var pro = new MyPromise((res, reject) => {
    console.log('第一次同步回调');
    setTimeout(() => {
        res(data++);
    }, 1000)
})
pro.then(ret => {
    console.log('第一次输出');
    console.log(ret); // 1
    return new MyPromise((res) => {
        console.log('第二个的内容');
        setTimeout(() => {
            res(1555);
        })
    })
}).then(ret => {
    console.log('第二次输出');
    console.log(ret);
})


// 链式调用
// var pro = new Promise((resolve, reject) => {
//     console.log('执行次数');
//     this.data = 1;
//     setTimeout(() => {
//         this.data++
//         reject(this.data);
//         resolve(this.data);
//     }, 1000);
// })

// pro.then(ret => {
//     console.log(ret);
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(55)
//         }, 0)
//     })
// }).then(ret => { console.log(ret) });
// pro.then(ret => console.log(pro)); // 多次执行
// pro.then(ret => console.log(pro));