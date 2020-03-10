class MVue {
    $options;
    $data;
    data;

    constructor(options) {
        this.$options = options;
        this.$data = options.data;
        this.data = options.data;
        this.observe(this.$data); // 绑定为响应式数据
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

        Object.defineProperty(obj, key, {
            get() {
                return val;
            },
            set(newValue) {
                if (newValue === val) {
                    return;
                }
                val = newValue;
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

// watcher 用来做具体更新的函数
class Watcher {
    constructor() {
        // 将当前的watcher实例指定到dep静态属性target 目前只是用来和dep通信
        Dep.tarfet = this;
    }

    update() {
        console.log('更新了');
    }
}

/**
 * 用法 new compile(el, vm) el是要遍历的元素， vm是vue的实例
 */
class Compile {
    // el有可能是一个选择器也有可能是一个字符串也有可能是dom，这里只考虑选择器
    $el;
    $vm;
    constructor(el, vm) {
        // 遍历宿主对象
        this.$el = document.querySelector(el);
        this.$vm = vm; // 保存一个成员变量方便一会儿使用

        if (this.$el) {
            // 转换内部内容为代码片段
        }
    }

    // 将宿主元素中的代码片段拿出来遍历，这样做比较高效，这是一个性能上的考虑
    node2Fragment(el) {
        const frag = document.createDocumentFragment(); // 创建一个代码片段
        let child = el.firstChild;
        while (child) { // appendChild会将之前el中所有的元素搬走
            frameElement.appendChild(child);
            child = el.firstChild
        }
        // 将el中的元素全部转换到代码片段中
        return frag;
    }

    compile(el) {
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(ele => { // 遍历片段来检查类型做对应的操作
            // 类型判断
            if (this.isElement(ele)) {
                // 元素
                // console.log('编译元素' + ele.nodeName);
            } else if (this.isInterpolation(ele)) {
                // 插值
                this.compileText(ele);
            }
            // 递归子节点
            if (ele.childNodes && ele.childNodes.length > 0) {
                this.compile(ele)
            }
        })
    }
}
