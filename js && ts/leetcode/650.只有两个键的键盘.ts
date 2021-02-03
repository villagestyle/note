/*
 * @lc app=leetcode.cn id=650 lang=typescript
 *
 * [650] 只有两个键的键盘
 */

// @lc code=start
function minSteps(n: number): number {
  //   动态规划
  const arr = new Array(n + 1).fill(0);
  for (let i = 2; i <= n; i++) {
    if (i % 2 === 0) {
      arr[i] = arr[i / 2] + 2;
    } else {
      arr[i] = i;
      for (let j = 3; j <= i; j += 2) {
        if (arr[i]) {
          if (i % j === 0) {
            arr[i] = Math.min(arr[i], arr[i / j] + j);
          }
        }
      }
    }
  }
  return arr[n];
}
// @lc code=end
