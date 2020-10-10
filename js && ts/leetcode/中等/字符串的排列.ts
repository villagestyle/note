// 字符串的排列
// https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/

/**
 *  输入一个字符串，打印出该字符串中字符的所有排列。

    你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

     

    示例:

    输入：s = "abc"
    输出：["abc","acb","bac","bca","cab","cba"]
     

    限制：

    1 <= s 的长度 <= 8
 */

/**
 * @param {string} s
 * @return {string[]}
 */

// 普通递归
// var permutation = function (s) {
//     const result = [];
//     s.split('').map((item, index) =>{
//         const child = permutation(s.slice(0, index) + s.slice(index+1));
//         if (s.length === 1) {
//             result.push(s);
//         }
//         child.map(d => {
//             result.push(item + d);
//         });
//     });
//     return Array.from(new Set(result));
// };


// 回溯法
var permutation = function(s) {
    var result = [];
    var path = '';
    var visit = [];

    const dfs = (path: string) => {
        if (path.length === s.length) return result.push(path);
        for(var i = 0; i < s.length; i++) {
            if (visit[i]) continue;
            visit[i] = true;
            dfs(path + s[i]);
            visit[i] = false;
        }
    }

    dfs(path);

    return [...new Set(result)];
};