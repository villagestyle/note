/***
 * 1. 如果每个数的出现次数都是独一无二的，就返回 true，否则返回 false
 */


var arr = [1, 2, 2, 1, 1, 1, 3];

var uniqueOccurrences = function (arr) {
    // 执行用时 :60 ms, 在所有 javascript 提交中击败了92.52%的用户
    // 内存消耗 :34.8 MB, 在所有 javascript 提交中击败了100.00%的用户
    var obj = {};
    arr.map(d => {
        obj[d] = obj[d] + 1 || 1;
    })
    var arr2 = Object.values(obj);
    return arr2.length == [...new Set([...arr2])].length
};

/**
 * 2. 给你一个按 YYYY-MM-DD 格式表示日期的字符串 date，请你计算并返回该日期是当年的第几天。
 */

// 执行用时 :60 ms, 在所有 javascript 提交中击败了91.94%的用户
// 内存消耗 :33.9 MB, 在所有 javascript 提交中击败了100.00%的用户
var dayOfYear = function (date) {
    let time = new Date(date) - new Date(date.split('-')[0] + '-01-01');
    return (time / 1000 / 3600 / 24) + 1;
}


/**
 * 3. 给定一个整数类型的数组 nums，请编写一个能够返回数组“中心索引”的方法。
 * 我们是这样定义数组中心索引的：数组中心索引的左侧所有元素相加的和等于右侧所有元素相加的和。
 * 如果数组不存在中心索引，那么我们应该返回 -1。如果数组有多个中心索引，那么我们应该返回最靠近左边的那一个。
 */
var nums = [1, 7, 3, 6, 5, 6]

var pivotIndex = function (nums) {
    let sum = nums.reduce((pre, current) => {
        return pre + current
    }, 0);
    let sum2 = 0;
    for (var i = 0; i < nums.length; i++) {
        let cur = nums[i];
        if ((sum - sum2 - cur) == sum2) {
            return i;
        }
        sum2 += cur;
    }
    return -1;
};

pivotIndex(nums)