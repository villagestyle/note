/*
 * @lc app=leetcode.cn id=63 lang=typescript
 *
 * [63] 不同路径 II
 */

// @lc code=start
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length + 1;
  const n = obstacleGrid[0].length + 1;

  const arr = Array.from(new Array(m), () => new Array(n).fill(0));
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      const cur = obstacleGrid[i - 1][j - 1];
      if (i === 1 && j === 1 && cur !== 1) {
        arr[i][j] = 1;
      } else {
        if (cur === 1) {
          arr[i][j] = 0;
        } else {
          arr[i][j] = arr[i][j - 1] + arr[i - 1][j];
        }
      }
    }
  }

  return arr[m - 1][n - 1];
}
// @lc code=end
