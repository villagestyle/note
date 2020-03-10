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
            if (this.isDirective(name)) { // v-bind :xxx
                // 是内部指令(对指令进行分别操作)
                const [, dirctive] = name.split('-'); // model, text, bind:xxx, :xxx...
                const [dirName, eventName] = dirctive.split(':'); // 指令名, 事件名
                // 更新视图, 数据驱动视图
                compileUtil[dirName](node, value, this.vm, eventName);
                // 删除有指令的标签上的属性
                node.removeAttribute('v-' + dirctive);
            } else if (this.isEventName(name)) {
                const [, eventName] = name.split('@');
                compileUtil['on'](node, value, this.vm, eventName);
                node.removeAttribute('@' + eventName);
            } else if (this.isBind(name)) {
                const [, attrName] = name.split(':'); // 指令名, 事件名
                compileUtil['bind'](node, value, this.vm, attrName);
                node.removeAttribute(name);
            }
        })
    }

    compileText(node) {
        // 编译文本
        const content = node.textContent;
        // 筛选出模板语句{{}}
        if (/\{\{(.+?)\}\}/.test(content)) {
            compileUtil['text'](node, content, this.vm);
        }
    }

    isDirective(attrName) {
        return attrName.startsWith('v-');
    }

    isEventName(attrName) {
        return attrName.startsWith('@');
    }

    isBind(attrName) {
        return attrName.startsWith(':');
    }
}

class Mvue {
    constructor(options) {
        this.$el = options.el; // 选择器
        this.$data = options.data; // 数据
        this.$options = options; // 备份数据
        if (this.$el) {
            // 1. 实现一个数据的观察者 observer
            new Observer(this.$data);
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
        let value;
        if (expr.indexOf('{{') !== -1) {
            // 模板语句
            // str.replace(regexp|substr, newSubStr|function)
            // function: 一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。
            // 参数 1. 匹配到的子串 2. 被匹配(过滤)后的值 3. 匹配到子串的位置 4. 源字符串
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                return this.getVal(args[1].trim(), vm)
            })
        } else {
            value = this.getVal(expr, vm);
        }
        this.updater.textUpdater(node, value);
    },
    html(node, expr, vm) {
        const value = this.getVal(expr, vm);
        this.updater.htmlUpdater(node, value);
        new Watcher(vm, expr, (newVal) => {
            this.updater.htmlUpdater(node, newVal);
        });
    },
    model(node, expr, vm) {
        const value = this.getVal(expr, vm);
        this.updater.modelUpdater(node, value);
    },
    on(node, expr, vm, eventName) {
        let fn = vm.$options.methods && vm.$options.methods[expr];
        if (typeof fn !== 'function') {
            throw new Error('当前绑定的不是函数');
        }
        node.addEventListener(eventName, fn, false);
    },
    bind(node, expr, vm, attrName) {
        const value = this.getVal(expr, vm);
        node.setAttribute(attrName, value);
    },
    updater: {
        textUpdater(node, value) {
            node.textContent = value;
        },
        htmlUpdater(node, value) {
            node.innerHTML = value;
        },
        modelUpdater(node, value) {
            node.value = value;
        }
    }
}