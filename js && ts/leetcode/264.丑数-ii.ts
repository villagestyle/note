/*
 * @lc app=leetcode.cn id=264 lang=typescript
 *
 * [264] 丑数 II
 */

// @lc code=start
function nthUglyNumber(n: number): number {
    const arr = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        // arr[i] = arr[i - 1]
    }

    return arr[n - 1];
};
// @lc code=end

