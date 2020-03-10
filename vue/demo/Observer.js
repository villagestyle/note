class Observer {
    constructor(data) {
        this.observe(data);
    }

    observe(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach(key => {
            // 为属性添加响应式
            this.defineReactive(data, key, data[key])
        })
    }

    defineReactive(data, key, value) {
        // 递归遍历
        this.observe(value);
        // 创建依赖收集器
        const dep = new Dep();
        // 劫持数据
        Object.defineProperty(data, key, {
            get: () => {
                // 订阅数据变化时, 往Dep中添加观察者
                Dep.target && dep.addDep(Dep.target);
                return value;
            },
            set: (newVal) => {
                if (newVal !== value) {
                    value = newVal;
                    console.log('通知外部更新视图');
                }
                this.observe(value); // 重新劫持更改后的数据
                // 通知变化
                dep.notify();
            }
        })
    }
}

class Dep {
    deps;
    constructor() {
        this.deps = [];
    }

    // 收集观察者
    addDep(watcher) {
        this.deps.push(watcher);
    }

    // 通知观察者去更新
    notify() {
        console.log('通知观察者进行更新');
        console.log(this.deps);
        this.deps.forEach(watcher => watcher.update());
    }
}

// 对比新旧值
class Watcher {
    // expr: 值的索引
    constructor(vm, expr, callback) {
        this.vm = vm;
        this.expr = expr;
        this.callback = callback;
        this.oldVal = this.getOldVal(); // 保存旧值
    }

    // 取旧值
    getOldVal() {
        Dep.target = this;
        const oldVal = compileUtil.getVal(this.expr, this.vm);3
        Dep.target = null;
        return oldVal;
    }

    update() {
        // 判断新旧值是否一致
        const newVal = compileUtil.getVal(this.expr, this.vm);
        if (newVal !== this.oldVal) {
            this.callback(newVal);
        }
    }
}