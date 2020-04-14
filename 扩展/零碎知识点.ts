// 1. 如何去除标签<i>默认斜体？
// font-style: normal

// 2. 你有使用过css的writing-mode属性吗？说说它有哪些应用场景？
// writing-mode属性定义了文本在说平或垂直方向上如何排布
// 例： writing-mode: horizontal-tb; // 水平方向自上而下的书写方式， 即left-right-top-bottom

// 3. 日常开发中写JS循环时应该注意哪些情况？
/**
 * (1). 注意死循环(循环要有终止条件)
 * (2). 循环时改变被循环者可能会导致问题
 * (3). 循环异步时需要注意作用域问题(可以使用闭包或块级作用域解决)
 */

//  4. 怎样避免让用户看到长时间的白屏？
/**
 * (1). 使用懒加载/骨架屏
 * (2). 使用图片精灵减少网络请求数
 * (3). css压缩, js压缩
 */

// 5. 使用css实现对话气泡的效果
// 一个方向圆角框加上倒三角组成(倒三角效果： 利用boder, 三边透明, 增加border-width即可)
// 6. js循环的数据量很大（例如100W+）时会出现什么情况？如何进行性能优化？
// 出现卡顿, 堵塞主线程, 降低用户的体验
// 拆分成多份进行, 减少循环中的操作, 使用web worker, 用多线程来处理
// 如何使用html5进行图片压缩上传？
/**
 * 图片base64 =>
 * 使用canvas对图片进行压缩 =>
 * 转blob(new Blob('data', {type: xxx})) =>
 * 上传
 * 详见demo
 */

// 6. 请举例说明JSON.stringify()有哪些特性？
/**
 * (1). 会把值转化为string类型
 * (2). undefined function symbol作为对象属性值的时候将会忽略对他们的序列化
 * (3). undefined function symbol作为数组元素值是, 将会被序列化为null
 * (4). undefined function sysbol作为单独的值进行转化时, 会被序列化为undefined
 * (5). 如果转化的值含有toJSON函数的话，将会使用toJSON函数返回的结果
 * (6). NaN null infinity格式的数值将会被转化为null
 * (7). JSON.stringify()进行转化是只会转化可枚举到的数据
 *
 * 详见 https://github.com/haizlin/fe-interview/issues/2064
 */

// 7. 当img标签中的src图片加载失败时，怎么让它变得更美观呢？
/**
 * 使用占位图 onerror => "javascript:this.src='images/logoError.png'"
 */

//  8. 用js实现typeof的功能
/**
 * function getType(data) {
 *  return Object.prototype.toString.call(data).slice(8, -1);
 * }
 */

//  9. 如何禁止在移动端上的左右滑动动作
/**
 * (1). 使用js监听touch系列事件, 判断用户滑动方向, 如果是左右滑动则禁止默认事件(e.preventDefault())
 * (2). 使用css属性 touch-action: none; 将会禁止所有的滑动事件 touch-action:pan-y; 启用y轴滑动 
 */

//  10. css属性hover和dom事件mouseover的区别
/**
 * (1). hover为css伪类选择器, mouseover是js的dom事件
 * (2). hover只能改变css属性
 * (3). hover在鼠标移出之后, 样式就会恢复原样式, mouseover则不会主动恢复, 需要配合其他事件
 */

// 11. 著名的3像素bug, 怎么解决
/**
 * 如何产生: 在div中放置一个img元素, 由于img元素是inline元素, 默认与基线对齐(baseline), 所以图片下方会留有3像素的空白
 * 解决方案: 
 * (1). 父元素设置line-height: 0; font-size: 0;
 * (2). img元素设置vertical-align属性以其他方式对齐
 * (3). 将img设置为其他类型的标签
 */

//  12. 哪些标签是不支持伪元素的
/**
 * 单标签元素都不支持伪元素
 */

// 13. noscript标签的作用
// noscript标签中的文本会在浏览器无法执行脚本代码时显示(不支持js的环境中)

//  ts小技巧
// type Keys = 'a' | 'b';
// interface Key {
//     [key in Keys]: any
// }