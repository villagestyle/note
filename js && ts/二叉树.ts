
// 二叉树节点
function TreeNode (key: any, value: any) {
    this.parent = null;
    this.left = null;
    this.right = null;
    this.key = key;
    this.value = value;
};

// 根节点，root节点
function SearchTree () {
    this.root = null;
};


// 创建节点
const createNode = (key: any, value: any) => {
    return new TreeNode(key, value);
}

