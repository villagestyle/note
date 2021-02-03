/*
 * @lc app=leetcode.cn id=279 lang=typescript
 *
 * [279] 完全平方数
 */

// @lc code=start
function numSquares(n: number): number {
  // 动态规划
  const arr = new Array(n + 1).fill(0);
  arr[1] = 1;

  for (let i = 2; i <= n; i++) {
    const base = Math.floor(Math.sqrt(i));

    if (Math.pow(base, 2) === i) {
      arr[i] = 1;
    } else {
      for (let j = 1; j <= base; j++) {
        if (arr[i] === 0) {
          arr[i] = arr[Math.pow(j, 2)] + arr[i - Math.pow(j, 2)];
        } else {
          arr[i] = Math.min(
            arr[i],
            arr[Math.pow(j, 2)] + arr[i - Math.pow(j, 2)]
          );
        }
      }
    }
  }

  return arr[n];
}
// @lc code=end
