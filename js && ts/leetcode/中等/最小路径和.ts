/**
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

    说明：每次只能向下或者向右移动一步。

     

    示例 1：


    输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
    输出：7
    解释：因为路径 1→3→1→1→1 的总和最小。
    示例 2：

    输入：grid = [[1,2,3],[4,5,6]]
    输出：12
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid: number[][]) {
  const [len1, len2] = [grid.length + 1, grid[0].length + 1];
  const arr = Array.from(new Array(len1), () => new Array(len2).fill(Infinity));
  arr[0][1] = 0;
  arr[1][0] = 0;

  for (let i = 1; i < len1; i++) {
    for (let j = 1; j < len2; j++) {
      arr[i][j] = Math.min(arr[i][j - 1], arr[i - 1][j]) + grid[i - 1][j - 1];
    }
  }
  
  return arr[len1 - 1][len2 - 1];
};

minPathSum([
  [1, 2, 3],
  [4, 5, 6]
]);
minPathSum([
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
]);
minPathSum([
  [1, 2],
  [1, 1]
]);
