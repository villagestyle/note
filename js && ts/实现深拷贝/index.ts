let nextObj = {
    code: 1,
    msg: '错误'
}

let innerObj = {
    a: 1,
    b: 2,
    c: 3,
    d: null,
    e: function () {
        console.log(this.a);
    },
    f: new Date(),
    g: /^1122$/,
    nextObj
}

const obj = {
    innerObj,
    深: '深',
    拷: '拷',
    贝: '贝',
    一: function () {
        console.log(this.深);
    },
    二: '二',
    三: null
}

function deepClone(data) {
    if (data === null) return null;
    if (typeof data !== 'object') return data;
    if (data instanceof RegExp) return new RegExp(data);
    if (data instanceof Date) return new Date(data);
    let newData = new data.constructor; // 复制源数据的类型(如果是实例对象)
    for (const key in data) {
        // if (data.hasOwnProperty(key)) {
        newData[key] = deepClone(data[key]);
        // }
    }
    return newData;
}

nextObj = {
    code: 2,
    msg: '网络链接失败'
}
console.log(deepClone(obj));
console.log(obj.innerObj.nextObj.msg);