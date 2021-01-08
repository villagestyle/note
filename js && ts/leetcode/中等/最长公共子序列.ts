/**
 * 给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度。

    一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
    例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。

    若这两个字符串没有公共子序列，则返回 0。

    示例 1:

    输入：text1 = "abcde", text2 = "ace" 
    输出：3
    解释：最长公共子序列是 "ace"，它的长度为 3。
    示例 2:

    输入：text1 = "abc", text2 = "abc"
    输出：3
    解释：最长公共子序列是 "abc"，它的长度为 3。
    示例 3:

    输入：text1 = "abc", text2 = "def"
    输出：0
    解释：两个字符串没有公共子序列，返回 0。
     

    提示:

    1 <= text1.length <= 1000
    1 <= text2.length <= 1000
    输入的字符串只含有小写英文字符。

 */

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1: string, text2: string) {
  const [len1, len2] = [text1.length, text2.length];

  const arr = Array.from(new Array(len2 + 1), () =>
    new Array(len1 + 1).fill(0)
  );

  for (let i = 1; i <= len2; i++) {
    for (let j = 1; j <= len1; j++) {
      // 取最大长度
      const max = Math.max(arr[i - 1][j], arr[i][j - 1]);
      if (text2[i - 1] === text1[j - 1]) {
        arr[i][j] = arr[i - 1][j - 1] + 1;
      } else {
        arr[i][j] = max;
      }
    }
  }

  return arr[len2][len1];
};

longestCommonSubsequence("abcde", "ace");
longestCommonSubsequence("abc", "abc");
longestCommonSubsequence("abc", "def");
longestCommonSubsequence("bsbininm", "jmjkbkjkv");