// 三步问题

/**
 *  三步问题。有个小孩正在上楼梯，楼梯有n阶台阶，小孩一次可以上1阶、2阶或3阶。实现一种方法，计算小孩有多少种上楼梯的方式。结果可能很大，你需要对结果模1000000007。
 * 
    示例1:

    输入：n = 3 
    输出：4
    说明: 有四种走法
    示例2:

    输入：n = 5
    输出：13
    提示:

    n范围在[1, 1000000]之间
*/

/**
 * @param {number} n
 * @return {number}
 */


//  递归(n太大时无法处理)
// var waysToStep = function (n: number) {

//     const obj = {};

//     const setp = (n: number) => {
//         if (n === 1) return 1;
//         if (n === 2) return 2;
//         if (n === 3) return 4;
//         if (obj[n]) return obj[n];
        
//         obj[n] = (setp(n-1) + setp(n-2) + setp(n-3)) % 1000000007;
//         return obj[n];
//     }

//     return setp(n)
// };


// 动态规划
/**
 * @param {number} n
 * @return {number}
 */

var waysToStep = function(n) {

    const DP = [0, 1, 2, 4];

    for (var i = 4; i <= n; i ++) {
        DP[i] = (DP[i-1] + DP[i-2] + DP[i-3]) % 1000000007;
    }

    return DP[n]
};