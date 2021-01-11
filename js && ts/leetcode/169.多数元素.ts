/*
 * @lc app=leetcode.cn id=169 lang=typescript
 *
 * [169] 多数元素
 */

// @lc code=start
function majorityElement(nums: number[]): number {
//   let max = 0;
//   let cur = 0;

//   for (const num of new Set(nums)) {
//     const len = nums.length;
//     nums = nums.filter(d => d !== num);
//     const curLen = len - nums.length;
//     if (curLen > max) {
//       max = curLen;
//       cur = num;
//     }
//   }

//   return cur;

    let max = 0;
    let cur = 0;

    for (const num of nums) {
        if (max === 0) {
            cur = num;
        }
        if (cur === num) {
            max ++
        } else {
            max --
        }
    }

    return cur;
}
// @lc code=end
