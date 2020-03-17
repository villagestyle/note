// new Promise()

// new <unknown>(executor: (resolve: (value?: unknown) => void, reject: (reason?: any) => void) => void) => Promise<unknown>
// class SPromise {
//     constructor(
//         private executor: (resolve: (value?: unknown) => void, reject: (value?: unknown) => void) => SPromise
//     ) {
//     }
// }

// interface SPromise {

// }

// interface SPromiseLike<T, ResultType> {
//     then: (cb: (result?: ResultType) => void) => T;
// }

// interface SPromiseConstructor {
//     new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): SPromise;
// }

// const pro = new Promise((res, rej) => {
//     console.log(1);
//     res(2);
// })

// pro.then(
//     () => {

//     }
// )
