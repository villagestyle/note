//  解析vue响应式原理

/***
 * vue  采用数据劫持结合发布者-订阅者模式的方式，通过 object.defineProperty() 来
 * 劫持各个属性的getter、setter，在数据变动时发布消息给订阅者， 触发相对的监听回调
 * 
 * 1. 实现一个数据监听器Observer，能够对数据对象的所有属性进行监听, 如有变动可拿到
 * 最新值并通知订阅者
 * 2. 实现一个解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换
 * 数据，以及绑定相应的更新函数
 * 3. 实现一个Watcher，作为链接Observer和Compile的桥梁，能够订阅并收到每个属性变
 * 动的通知，执行指令绑定的相应回调函数，从而更新视图
 * 4. mvvm入口函数，整合以上三者
 */

/**
 * 附加到每个观察对象的观察者类,
 * 附加后，观察者将目标对象的属性键转换为getter/setter，
 * 后者收集依赖项并分派更新
 */
//  class Observer {
//     private value: any;

//     constructor(value: any) {

//     }
//  }

/**
 * 自定义vue
 */
export default class MVue {
    private $options: any;
    private $data: any;

    constructor(options: any) {
        this.$options = options;
        this.$data = options.data;
        this.observe(this.$data); // 绑定为响应式数据
    }

    observe(value: any) {
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
                console.log(key + '属性更新,' + val + '更新了');
            }
        })
    }
}

/**
 * vue是采用数据劫持配合发布者-订阅者模式的方式， 通过
 * Object.defineProperty()来劫持各个属性的setter和getter，
 * 在数据发生变化的时候发送通知给依赖收集器，去通知观察者做出
 * 对应的回调函数，去更新视图
 * 
 * mvvm作为绑定的入口，整合了Observer类，Compile类和
 * Watchers三者， 通过observer来监听数据变化，通过compile
 * 来解析模板指令，最终利用watcher作为中间通信的桥梁，达到
 * 数据变化影响视图更新，视图交互影响数据更新的双向绑定的效果
 * 
 */

// var str = 'jjj_rr-ee-qq_das';

// var arr = str.split('-').map(d => d.split('_')).flat(2);

// arr.map(d => d[0].toUpperCase() + d.slice(1).toLowerCase()).join('');