/*
 * @lc app=leetcode.cn id=63 lang=typescript
 *
 * [63] 不同路径 II
 */

// @lc code=start
// TODO: 待完成
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {

    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;

    const arr = Array.from(new Array(m), () => new Array(n).fill(1));
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        if (obstacleGrid[i - 1][j - 1] === 1) {
            arr[i][j] = 0;
        } else {
            arr[i][j] = arr[i][j - 1] + arr[i - 1][j];
        }
      }
    }
  
    return arr[m-1][n-1];
};
// @lc code=end

