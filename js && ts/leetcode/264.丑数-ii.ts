/*
 * @lc app=leetcode.cn id=264 lang=typescript
 *
 * [264] 丑数 II
 */

// @lc code=start
function nthUglyNumber(n: number): number {
  const arr = Array.from(new Array(n + 1), () => new Array(3).fill(0));
  arr[1] = [1, 1, 1];

  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < 3; j++) {
      if (arr[i][j - 1]) {
        arr[i][j] = arr[i][j - 1];
      } else {
        const remainder = i % [2, 3, 5][j];
        if (remainder !== 0) {
          arr[i][j] = 0;
        } else {
          arr[i][j] = arr[i / [2, 3, 5][j]][j];
        }
      }
      if (j === 2 && arr[i][2]) {
        arr[i][2] = i;
      }
    }
  }

  console.log(arr);
  return arr[n][2];
}
// @lc code=end
