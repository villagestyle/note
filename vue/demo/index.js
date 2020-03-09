class Compile {
    el; // 备份节点
    vm;
    constructor(el, vm) {
        // 判断el是否为元素节点对象
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        // 新建文档碎片(代码片段)对象， 放入内存中 可以减少页面的回流和重绘
        const fragment = this.node2Fragment(this.el); // 将所有节点放置进文档碎片(代码片段)中
        // 编译模板
        this.compile(fragment);
        // 将元素重绘到页面上
        this.el.appendChild(fragment);
    }

    isElementNode(node) {
        return node.nodeType === 1; // 等于1代表元素为元素节点对象
    }

    // 将所有元素添加至代码片段中(剪切操作)
    node2Fragment(el) {
        const frag = document.createDocumentFragment(); // 创建代码片段(文档碎片)
        let firstChild;
        // 个人问题: 元素嵌套怎么解决
        while (firstChild = el.firstChild) {
            // 含有文本节点
            frag.appendChild(firstChild);
        }
        return frag;
    }

    // 编译代码片段
    compile(fragment) {
        // 1. 获取子节点
        const childNodes = fragment.childNodes;
        [...childNodes].map(node => {
            // console.log(node); // 含有文本节点
            if (this.isElementNode(node)) {
                // 元素节点
                this.compileElement(node); // 编译
            } else {
                // 除元素节点外的其他节点
                this.compileText(node); // 编译
            }
            // 向下递归处理每个元素
            if (node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })
    }

    compileElement(node) {
        // 编译元素
        // 根据不同的指令执行不同的操作
        const attributes = node.attributes; // 返回类数组格式的表
        [...attributes].forEach(attr => {
            // console.log(attr);
            const { name, value } = attr;
            // 判断是否为内部定义的指令
            if (this.isDirective(name)) {
                // 是内部指令(对指令进行分别操作)
                const [, dirctive] = name.split('-'); // model, text...
                const [dirName, eventName] = dirctive.split(':'); // 指令名, 事件名
                compileUtil[dirName](node, value, this.vm, eventName);
            }
        })
    }

    compileText(node) {
        // 编译文本
    }

    isDirective(attrName) {
        return attrName.startsWith('v-');
    }
}

class Mvue {
    constructor(options) {
        this.$el = options.el; // 选择器
        this.$data = options.data; // 数据
        this.$options = options; // 备份数据
        if (this.$el) {
            // 1. 实现一个数据的观察者 observer
            // 2. 实现一个指令的解析器 compile
            new Compile(this.$el, this);
        }
    }
}

// node, value, this.vm, eventName
// 元素, 数据(绑定的值的名称), 实例, 事件名
const compileUtil = {
    getVal(expr, vm) {
        return expr.split('.').reduce((data, curData) => {
            return data[curData];
        }, vm.$data)
    },
    text(node, expr, vm) {
        const value = this.getVal(expr, vm);
        this.updater.textUpdateTer(node, value);
    },
    html(node, expr, vm) {
        const value = this.getVal(expr, vm);
        this.updater.htmlUpdateTer(node, value);
    },
    model(node, expr, vm) {

    },
    on(node, expr, vm, eventName) {

    },
    updater: {
        textUpdateTer(node, value) {
            node.textContent = value;
        },
        htmlUpdateTer(node, value) {
            node.innerHTML = value;
        }
    }
}