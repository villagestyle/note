// // 若用户未手动配置适配器， 则使用默认的适配器
// // var adapter = config.adapter || defaultStatus.adapter;

// // dispatchRequest方法的末尾调用的是适配器方法
// return adapter(config).then(function OnAdapterResolution(responce) {
//     // 请求成功的回调
//     throwOfCancellationRequested(cofig);

//     // 转换响应体
//     responce.data = transformData(
//         responce.data,
//         responce.headers,
//         config.transformResponce
//     );

//     return responce;
// }, function onAdapterRejection(reason) {
//     // 请求失败的回调
//     if (!isCalcel(reason)) {
//         throwIfCancellationRequested(config);

//         // 转换响应体
//         if (reason && reason.response) {
//             reason.responce.data = transformData(
//                 reason.responce.data,
//                 reason.responce.headers,
//                 config.transformResponce
//             )
//         }
//     }

//     return Promise.reject(reason);
// });


// 获取默认适配器
// function getDefaultAdapter() {
//     var adapter;
//     // 判断当前是否是node环境
//     if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
//       // 如果是node环境，调用node专属的http适配器
//       adapter = require('./adapters/http');
//     } else if (typeof XMLHttpRequest !== 'undefined') {
//       // 如果是浏览器环境，调用基于xhr的适配器
//       adapter = require('./adapters/xhr');
//     }
//     return adapter;
//   }