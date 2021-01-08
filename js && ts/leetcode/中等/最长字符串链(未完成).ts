// 最长字符串链

/**
 *  给出一个单词列表，其中每个单词都由小写英文字母组成。

    如果我们可以在 word1 的任何地方添加一个字母使其变成 word2，那么我们认为 word1 是 word2 的前身。例如，"abc" 是 "abac" 的前身。

    词链是单词 [word_1, word_2, ..., word_k] 组成的序列，k >= 1，其中 word_1 是 word_2 的前身，word_2 是 word_3 的前身，依此类推。

    从给定单词列表 words 中选择单词组成词链，返回词链的最长可能长度。

    示例：

    输入：["a","b","ba","bca","bda","bdca"]
    输出：4

    解释：最长单词链之一为 "a","ba","bda","bdca"。

    提示：

    1 <= words.length <= 1000
    1 <= words[i].length <= 16
    words[i] 仅由小写英文字母组成。
 */

const isExistStr = (str: string, str2: string) => {
  const arr1 = str.split("");
  const arr2 = str2.split("");
  let result = false;

  arr1.forEach(item => {
    if (!arr2.includes(item)) {
      result = false;
    }
  });

  return result;
};

/**
 * @param {string[]} words
 * @return {number}
 */
var longestStrChain = function (words: string[]) {
  // 按长度排序
  const sortArr = words.sort((a, b) => a.length - b.length);
  const len = sortArr.length + 1;
  const arr = Array.from(new Array(len), () => new Array(len).fill(0));

  for (let i = 1; i < len; i++) {
    for (let j = 1; j < len; j++) {
      let cur = sortArr[i - 1];
      if (cur === sortArr[j - 1]) {
        arr[i][j] = 1;
      } else {
        // 判断是否为单词链
        if (
          cur.length === sortArr[j - 1].length - 1 &&
          isExistStr(cur, sortArr[j - 1])
        ) {
          arr[i][j] = arr[i - 1][j] + 1;
          cur = sortArr[j - 1];
        } else {
         arr[i][j] = arr[i - 1][j];
        }
      }
    }
  }

  return Math.max(...arr[len - 1]);
};

longestStrChain(["ca", "a"]);
