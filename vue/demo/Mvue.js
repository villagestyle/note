class MVue {
    $options;
    $data;
    data;
    dep;

    constructor(options) {
        this.$options = options;
        this.$data = options.data;
        this.data = options.data;
        this.observe(this.$data); // 绑定为响应式数据

        // 模拟watcher创建
        new Watcher();
    }

    observe(value) {
        if (!value && typeof value !== 'object') {
            return; // 当值为空或为基本类型时返回
        }
        // 遍历对象
        Object.keys(value).forEach(key => {
            this.defineReactive(value, key, value[key]);
        })
    }

    // 定义响应式
    defineReactive(obj, key, val) {
        if (typeof val === 'object') {
            this.observe(val); // 递归数据来实现每个数据的响应式
        }
        const dep = new Dep()

        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addDep(Dep.target); // 添加依赖
                return val;
            },
            set: (newValue) => {
                if (newValue === val) {
                    return;
                }
                this.observe(newValue);
                val = newValue;
                dep.notify();
                console.log(key + '属性更新,' + '更新为' + val);
            }
        })
    }
}

/**
 * 用来管理watcher
 */
class Dep {
    deps;
    constructor() {
        this.deps = [];
    }

    addDep(dep) {
        this.deps.push(dep);
    }

    notify() {
        this.deps.forEach(dep => dep.update());
    }
}

// watcher 监视器、观察者负责更新视图
class Watcher {
    constructor() {
        // 将当前的watcher实例指定到dep静态属性target
        Dep.target = this;
        console.log('执行初始化watcher');
        console.log(this);
    }

    update() {
        console.log('更新了');
    }
}
