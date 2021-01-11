/*
 * @lc app=leetcode.cn id=518 lang=typescript
 *
 * [518] 零钱兑换 II
 */

// @lc code=start
function change(amount: number, coins: number[]): number {
  // 二维数组
  if (amount === 0) return 1;

  const len = coins.length;
  const arr = Array.from(new Array(amount + 1), () => new Array(len + 1).fill(0));

  for (let i = 1; i <= amount; i ++) {
      for (let j = 1; j <= len; j++) {
          const coin = coins[j - 1];
          const before = arr[i][j - 1];
          if (i - coin > 0) {
              arr[i][j] = arr[i - coin][j] + before;
          } else if (i === coin) {
              arr[i][j] = 1 + before;
          } else {
              arr[i][j] = before;
          }
      }
  }

  return arr[amount][len];

}
// @lc code=end
