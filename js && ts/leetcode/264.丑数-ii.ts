/*
 * @lc app=leetcode.cn id=264 lang=typescript
 *
 * [264] 丑数 II
 */

// @lc code=start
function nthUglyNumber(n: number): number {
  // 三指针法
  // 丑数 = 丑数 * 2 || 3 || 5
  const arr = [1];
  let num1 = 1;
  let num2 = 1;
  let num3 = 1;
  for (let i = 1; i < n; i++) {
    const res1 = arr[num1 - 1] * 2;
    const res2 = arr[num2 - 1] * 3;
    const res3 = arr[num3 - 1] * 5;
    const min = Math.min(res1, res2, res3);
    arr.push(min);
    if (min === res3) {
      num3++;
    }
    if (min === res2) {
      num2++;
    }
    if (min === res1) {
      num1++;
    }
  }

  return arr[n - 1];
}
// @lc code=end
