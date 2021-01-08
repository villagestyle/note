/**
 * 给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。

返回 s 所有可能的分割方案。

示例:

输入: "aab"
输出:
[
  ["aa","b"],
  ["a","a","b"]
]
 */

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s: string) {

  let cur = '';
  const result = [];
  // for (let i = 0; i < s.length; i++) {

  // }
};

var isPalindrome = function (s: string) {
  const str = s.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase();
  return str === str.split("").reverse().join("");
};
