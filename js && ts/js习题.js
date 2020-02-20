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

/****
 * 4. 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 */
// var l1 = {
//     val: 5,
//     next: null
// }
// var l2 = {
//     val: 5,
//     next: null
// }
// var l1 = {
//     val: 2,
//     next: {
//         val: 4,
//         next: {
//             val: 3,
//             next: null
//         }
//     }
// }
// var l2 = {
//     val: 5,
//     next: {
//         val: 6,
//         next: {
//             val: 4,
//             next: null
//         }
//     }
// }
// var l1 = {
//     val: 1,
//     next: null
// }
// var l2 = {
//     val: 9,
//     next: {
//         val: 9,
//         next: null
//     }
// }

// 执行用时 :156 ms, 在所有 JavaScript 提交中击败了16.61%的用户
// 内存消耗 :41.9 MB, 在所有 JavaScript 提交中击败了6.14%的用户
var addTwoNumbers = function (l1, l2) {
    function Node(data) {
        this.val = data;
        this.next = null;
    }
    let fir = 0;
    let link = null;
    let head = null;
    let carry = 0;
    let cur = null;
    while (l1.val !== null || l2.val !== null) {
        let sum = l1.val + l2.val + (carry === 1 ? carry : 0);
        if (sum > 9) {
            sum = sum % 10;
            carry = 2;
        }
        cur = new Node(sum);
        if (fir === 0) {
            link = cur;
            head = link;
            fir++;
        } else {
            link.next = cur;
            link = link.next;
        }

        if (carry === 2 && (!l1.next) && (!l2.next)) {
            l1 = new Node(0);
            l2 = new Node(0);
        } else {
            l1 = l1.next ? l1.next : new Node(null);
            l2 = l2.next ? l2.next : new Node(null);
        }
        carry--;
    }
    return head;
};
addTwoNumbers(l1, l2);

// 使用递归法
var l1 = {
    val: 5,
    next: null
}
var l2 = {
    val: 5,
    next: null
}
var addTwoNumbers = function (l1, l2) {
    
}
addTwoNumbers(l1, l2);

/***
 * 1. 是新建递归函数还是将整个进行递归
 * 2. 递归返回的值是什么
 * 3. 怎么链接链表
 */