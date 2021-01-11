/*
 * @lc app=leetcode.cn id=867 lang=typescript
 *
 * [867] 转置矩阵
 */

// @lc code=start
function transpose(A: number[][]): number[][] {

    const row = A.length;
    const col = A[0].length;

    const newArr = Array.from(new Array(col), () => new Array(row));

    for (let i = 0; i < col; i ++) {
        for (let j = 0; j < row; j ++) {
            newArr[i][j] = A[j][i]
        }
    }

    return newArr;

};
// @lc code=end

