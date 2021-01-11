/*
 * @lc app=leetcode.cn id=322 lang=typescript
 *
 * [322] 零钱兑换
 */

// @lc code=start
function coinChange(coins: number[], amount: number): number {

    const arr = new Array(amount + 1).fill(0);

    for (let i = 1; i <= amount; i++) {

        let programme = [];
        for (let j = 0; j < coins.length; j ++) {
            programme.push((i - coins[j] < 0) ? Infinity : arr[i - coins[j]]);
        }
        arr[i] = Math.min(...programme) + 1;
    }

    return arr[amount] === Infinity ? -1 : arr[amount];

};
// @lc code=end

