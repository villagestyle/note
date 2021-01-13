/*
 * @lc app=leetcode.cn id=122 lang=typescript
 *
 * [122] 买卖股票的最佳时机 II
 */

// @lc code=start
function maxProfit(prices: number[]): number {
  const len = prices.length;
  const arr = new Array(len).fill(0);

  for (let i = 1; i < len; i++) {
    if (prices[i] > prices[i - 1]) {
      arr[i] = arr[i - 1] + prices[i] - prices[i - 1];
    } else {
      arr[i] = arr[i - 1];
    }
  }

  return arr[len - 1];
}
// @lc code=end
