/**
 * 给你一个整数数组 nums ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

    示例 1:

    输入: [2,3,-2,4]
    输出: 6
    解释: 子数组 [2,3] 有最大乘积 6。
    示例 2:

    输入: [-2,0,-1]
    输出: 0
    解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。

    [-2,3,-4]

    [-5, 5, 5]
    [-5, 5, 5, -5]
    [-5, 5, 5, 0, -5]
    [-5, 5, 5, -5, -8]
    [-5, 5, 5, -5, -1]
    [-1, 5, 5, -5, -8]
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums: number[]) {
  const len = nums.length;
  const arr = new Array(len).fill([1, 1]);
  arr[0] = [nums[0], nums[0]];

  for (var i = 1; i < len; i++) {
    // 是否中断
    const num1 = arr[i - 1][0];
    const num2 = arr[i - 1][1];
    const max = Math.max(num1 * nums[i], nums[i], num2 * nums[i]);
    const min = Math.min(num2 * nums[i], nums[i], num1 * nums[i]);
    arr[i] = [Math.max(min, max), Math.min(min, max)];
  }

  return Math.max(...arr.map((d: number[]) => d[0]));
};
