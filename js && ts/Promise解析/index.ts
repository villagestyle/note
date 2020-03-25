// var data: string[] = [];
// var pro = new Promise((resolve, reject) => {
//     console.log('promise1')
//     setTimeout(() => {
//         console.log('请求执行完毕');
//         resolve([',', '5']); // 类比接口中返回的值
//     }, 1000);
// }).then(ret => {
//     console.log('then');
//     console.log(ret);
// })
// console.log(pro); // PENDING
// setTimeout(() => {
//     console.log(pro) // RESOLVE
// }, 1000);
// 如果下方需要用到data, 此时data为[]
// pro.then(ret => {
//     data = ret as string[];
//     console.log(data);
//     // 此时获取到data的值
// })

// 这个时候处理了什么
// 获得一个promise的实例, promise内部的代码被执行 state => PENDING, 
// 内部异步代码执行完毕之后(被resolve/reject返回后), 边做对应的状态

class myPromise {

    public PENGDING = 'PENGDING';
    public RESOLVED = "RESOLVED";
    public REJECTED = 'REJECTED';

    public _this: myPromise;
    public currentState: 'PENGDING' | 'RESOLVED' | 'REJECTED' = 'PENGDING';
    public value: any = null;
    public resolveCallbacks: Function[] = [];
    public rejectedCallbacks: Function[] = [];

    constructor(fn: Function) {
        this.init();
        try {
            fn(this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    }

    init() {
        this._this = this;
    }

    resolve(value: any) {
        if (value instanceof myPromise) {
            // return value.then
        }
        setTimeout(() => {
            if (this.currentState === 'PENGDING') {
                this.currentState = 'RESOLVED';
                this.value = value;
                this.resolveCallbacks.forEach(cb => cb());
            }
        })
    }

    reject(value: any) {
        setTimeout(() => {
            if (this.currentState === 'PENGDING') {
                this.currentState = 'REJECTED';
                this.value = value;
                this.rejectedCallbacks.forEach(cb => cb());
            }
        })
    }
}

myPromise.prototype.then = function (onResolved, onRejected): myPromise {
    let promise2: myPromise = null;
    const self: myPromise = this;
    onRejected = typeof onRejected === 'function' ? onRejected : (v: any) => v;
    onResolved = typeof onResolved === 'function' ? onResolved : (reason: any) => { throw { reason } };

    if (self.currentState === "PENGDING") {
        return promise2 = new myPromise(function(resolve, reject){
            setTimeout(() => {
                try {
                    var x = onResolved(self.value);
                    resolutionProcedure(promise2, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            })
        })
    }

    if (self.currentState === 'REJECTED') {

    }

    if (self.currentState === 'RESOLVED') {

    }

    return promise2;
}

// function resolutionProcedure() {

// }