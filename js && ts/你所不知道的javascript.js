function foo() {
    var a = 1;
    var count = 5;
    for (var a = 0; a < 10; a++) {
        count++;
        if (count > 10) {
            a = a + count;
        }
    }
    return a;
}

for (var i = 0; i < 10; i++) {
    setTimeout((() => {
        console.log(i)
    })(), i * 100)
}

for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i)
    }, i * 100)
}

for (let i = 0; i < 10; i++) {
    (function done(j) {
        setTimeout(() => {
            console.log(j)
        }, j * 100)
    })(i)
}

// 模拟链表结构

function LinkList() {
    let Node = function (data) {
        this.node = data;
        this.next = null;
    }
    this.length = 0;
    this.head = null;
    this.tail = null;
    // 向后添加
    this.append = function (data) {
        const node = new Node(data);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
        return true;
    }
    // 打印
    this.print = function () {
        let arr = [];
        let node = this.head;
        while (node !== null) {
            arr.push(node.node);
            node = node.next;
        }
        console.log(arr);
    }
    // 插入新节点
    this.insert = function (data, index) {
        const newNode = new Node(data);
        if (this.length === 0 || (index - 1) === this.length) {
            this.append(data);
        } else if ((index - 1) > this.length || index < 0) {
            return false;
        } else {
            let fontNode = this.get(index - 1);
            let afterNode = this.get(index);
            if (fontNode.node) {
                // 插入位置不在第一个
                fontNode.next = newNode;
                newNode.next = afterNode;
            } else {
                // 插入位置为第一个
                newNode.next = this.head;
                this.head = newNode;
            }
            this.length++;
        }
    }
    // 获取第index个节点
    this.get = function (index) {
        if (index < 0 || index > (this.length - 1)) {
            return {
                code: 404,
                msg: '节点不存在'
            };
        }
        let count = 0;
        let curNode = this.head;
        while (count < index) {
            count++;
            curNode = curNode.next;
        }
        return curNode;
    }
    // 删除第index个节点
    this.remove = function (index) {
        if (index < 0 || index > (this.length - 1) || this.length === 0) {
            return false;
        }
        if (index === 0) {
            const secondNode = this.head.next;
            this.head = secondNode;
            if (this.length === 1) {
                this.tail = secondNode;
            }
            this.length--;
            console.log(this.print());
            return true;
        } else {
            let fontNode = this.get(index - 1);
            let afterNode = this.get(index + 1);
            if (afterNode.node) {
                fontNode.next = afterNode;
            } else {
                fontNode.next = null;
                this.tail = fontNode;
            }
            this.length--;
            console.log(this.print());
            return true;
        }
    }
    // 查找数据的位置
    this.indexOf = function (data) {
        let index = 0;
        let curNode = this.head;
        while (curNode.node) {
            if (curNode.node === data) {
                return index;
            } else {
                curNode = curNode.next;
            }
            index++;
        }
        return -1;
    }
}

var link = new LinkList();
link.append(1);
link.append(2);
link.append(3);
link.append(4);
link.append(5);

// 反转链表

var reverseList = function (head) {
    let curNode = head;
    if (!head) {
        return null;
    }
    let pre = null;
    while (curNode) {
        let next = curNode.next;
        curNode.next = pre;
        pre = curNode;
        curNode = next;
    }
    return pre;
};

reverseList(link.head);

var reverseList = function (head) {
    if (!head) {
        return null;
    }
    let pre = null;
    let cur = head; // 当前的元素
    while (cur) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
}

reverseList(link.head);
// 链表的区间反转


// 根据对象转类型的特性描述a使 a == 1 && a == 2

var a = {
    value: 0,
    valueOf: function () {
        this.value++;
        return this.value;
    }
}
console.log(a == 1 && a == 2);

// 描述一个闭包函数

function fx() {
    var a = 12;
    function fx2() {
        console.log(a);
        return a;
    }
    return fx2;
};

var outter = fx();
console.log(a);
outter();

// 如何解决下面的循环问题 (使用多种方案)

for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i)
    }, 0)
}

// 1. 使用块作用域

for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i)
    }, 0)
}

// 2. 使用立即执行函数

for (var i = 1; i <= 5; i++) {
    (function (j) {
        setTimeout(function timer() {
            console.log(j)
        }, 0)
    }(i))
}

// 使用reduce函数实现数组的累加

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.reduce((pre, cur, curIndex, arr) => {
    return pre + cur;
}, 0)

// map中return有效果吗? 如何中断map的循环? 

// 不能, 使用try catch配合throw来中断循环

try {
    var arr = [1, 2, 3, 4, 5];
    arr.map(d => {
        if (d === 3) {
            throw ('surprise');
        }
        console.log(d)
    })
} catch (e) {
    console.log(e);
}

// 数组扁平化(使用多种方案)
var arr = [1, 2, 3, [4, 5, [6, 7, 8, [9, 10, 11]], [12, 13, [14, 15], [16, 17]]], [18, 19, [20, 21]]];

// 1. 使用reduce函数
function flatten(ary) {
    return ary.reduce((pre, cur) => {
        if (cur instanceof Array) {
            return pre.concat(flatten(cur))
        } else {
            return [...pre, cur]
        }
    }, [])
}
flatten(arr);

// 2. 使用flat方法(es10)
console.log(arr.flat(Infinity));

// 3. 使用循环递归
var arr2 = [];
function flatten(ary) {
    ary.map(d => {
        if (d instanceof Array) {
            flatten(d);
        } else {
            arr2.push(d);
        }
    })
}
flatten(arr);

// 手写数组的map方法

Array.prototype.selfMap = function (callbackFn, thisArg) {
    // 处理数组类型异常
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'map' of null or undefined");
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackFn) !== '[object Function]') {
        throw new TypeError(callbackfn + ' is not a function');
    }
    // 草案中提到要先转换成对象
    let O = Object(this); // this指向数组
    let T = thisArg; // 传入的this

    // 保证len为数字且为整数
    let len = O.length >>> 0; // 传入的数组的长度
    let A = new Array(len); // 创建一个和原数组等长的空数组
    // 遍历数组
    for (let k = 0; k < len; k++) {
        // in 表示再原型链查找
        // 如果用 hasownProperty 是有问题的, 它只能查找私有属性
        if (k in O) {
            let kValue = O[k];
            // 依次传入this, 当前项, 当前索引, 整个数组
            let mappedValue = callbackFn.call(T, kValue, k, O);
            A[k] = mappedValue;
        }
    }
    return A;
}

// 改写数组的map方法
Array.prototype.selfMap2 = function (callbackFn, thisArg) {
    // this 指向该数组
    if (!(callbackFn instanceof Function)) {
        throw new TypeError(callbackfn + ' is not a function');
    }
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'map' of null or undefined");
    }
    const len = this.length;
    let arr = [];
    for (let i = 0; i < len; i++) {
        // function.call(thisArg, arg1, arg2, ...)
        arr.push(callbackFn.call(this, this[i], i, thisArg));
    }
    return arr;
}

// 手写数组的reduce方法

Array.prototype.selfReduce = function (callbackFn, initialVaule) {
    // 异常处理, 和map一样
    // 处理数组类型异常
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'reduce' of null or undefined");
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackFn) != "[object Function]") {
        throw new TypeError(callbackfn + ' is not a function')
    }
    let O = Object(this);
    const len = O.length >>> 0;
    let k = 0;
    let accumulator = initialVaule;
    // 如果没有手动设置初始值, 则获取该数组中第一个有效值来作为初始值
    find_initial: if (accumulator === undefined) {
        for (; k < len; k++) {
            if (k in O) {
                accumulator = O[k];
                k++;
                break find_initial; // 需要使用指定的中断
            }
        }
        // 循环结束还没退出, 就表示数组全为空
        throw new Error('Each element of the array is empty');
    }
    // 如果设置了初始值, 则从0开始循环
    // 如果没设置初始值, 则从自动获取的初始值后开始循环
    for (; k < len; k++) {
        if (k in O) {
            accumulator = callbackFn.call(undefined, accumulator, O[k], O);
        }
    }
    return accumulator;
}

// cumulator (acc) (累计器)
// Current Value (cur) (当前值)
// Current Index (idx) (当前索引)
// Source Array (src) (源数组)

// 改写数组的reduce方法
Array.prototype.selfReduce2 = function (callbackFn, initialVaule) {
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'reduce' of null or undefined");
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackFn) != "[object Function]") {
        throw new TypeError(callbackfn + ' is not a function')
    }
    const len = this.length;
    const thisArg = this;
    let k = 0; // 初始值的位置
    // 获取初始值
    // 命名该if以便中断
    find_initial: if (initialVaule === undefined) {
        for (var i = 0; i < len; i++) {
            if (thisArg[i]) {
                initialVaule = thisArg[i];
                k = i;
                break find_initial; // 中断该if语句中的执行
            }
        }
        // 如果for循环执行完毕却没找到有效的初始值, 则抛出错误中断执行
        throw new TypeError('Each element of the array is empty')
    }
    let accumulator = initialVaule; // 将初始值赋予累加器
    for (var i = k; i < len; i++) {
        accumulator = callbackFn.call(this, accumulator, thisArg[i], thisArg);
    }
    return accumulator;
}

// 改写数组的filter方法

Array.prototype.selfFilter = function (callbackFn, thisArg) {
    // 处理数组类型异常
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'filter' of null or undefined");
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackFn) != "[object Function]") {
        throw new TypeError(callbackFn + ' is not a function')
    }
    let O = this;
    const len = this.length;
    let arr = [];
    for (var i = 0; i < len; i++) {
        if (callbackFn.call(thisArg, O[i], i, O)) {
            arr.push(O[i]);
        }
    }
    return arr;
}