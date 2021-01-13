/*
 * @lc app=leetcode.cn id=121 lang=typescript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
function maxProfit(prices: number[]): number {
  // 使用变量记录
  // let max = 0;
  // let min = 0;
  // for (let i = 0; i < prices.length; i++) {
  //     if (i === 0) {
  //         max = 0;
  //         min = prices[i];
  //     } else {
  //         min = Math.min(prices[i], min);
  //         max = Math.max(prices[i] - min, max);
  //     }
  // }

  // return max;

  // 使用数组记录

  const len = prices.length;
  const arr = new Array(len).fill(0);

  for (let i = 1; i < len; i++) {
    const cur = arr[i - 1] + (prices[i] - prices[i - 1]);
    arr[i] = cur < 0 ? 0 : cur;
  }

  return Math.max(...arr);
}
// @lc code=end
