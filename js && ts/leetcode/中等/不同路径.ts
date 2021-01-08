/**
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

    机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

    问总共有多少条不同的路径？

    输入：m = 3, n = 7
    输出：28
    示例 2：

    输入：m = 3, n = 2
    输出：3
    解释：
    从左上角开始，总共有 3 条路径可以到达右下角。
    1. 向右 -> 向右 -> 向下
    2. 向右 -> 向下 -> 向右
    3. 向下 -> 向右 -> 向右
    示例 3：

    输入：m = 7, n = 3
    输出：28
    示例 4：

    输入：m = 3, n = 3
    输出：6
     

    提示：

    1 <= m, n <= 100
    题目数据保证答案小于等于 2 * 109

 */

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m: number, n: number) {
  const arr = Array.from(new Array(m), () => new Array(n).fill(1));
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      arr[i][j] = arr[i][j - 1] + arr[i - 1][j];
    }
  }

  return arr[m-1][n-1];
};
