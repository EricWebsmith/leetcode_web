export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  id: number;
  constructor(val?: number | null, left?: TreeNode | null, right?: TreeNode | null, index?: number) {
    this.val = val === null || val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.id = index ?? -1;
  }

  static create(arr: (number | null)[], index: number) {
    return new TreeNode(arr[index], null, null, index);
  }
}

export function treeNode2Array(root: TreeNode): (number | null)[] {
  if (root === null) {
    return [];
  }
  const q: (TreeNode | null)[] = [root];
  const ans: (number | null)[] = [];
  while (q.length > 0) {
    const node = q.shift();
    if (node) {
      ans.push(node.val);
      q.push(node.left);
      q.push(node.right);
    } else {
      ans.push(null);
    }
  }

  while (ans[ans.length - 1] === null) {
    ans.pop();
  }

  return ans;
}

export function array2TreeNode(array: (number | null)[]): TreeNode | null {
  if (!array || array.length === 0) {
    return null;
  }
  const n = array.length;
  const root = TreeNode.create(array, 0);
  const q: TreeNode[] = [root];
  for (let i = 1; i < n; i += 2) {
    const node = q.shift();
    if (node == null) {
      continue;
    }

    if (array[i] !== null) {
      const left = TreeNode.create(array, i);
      node.left = left;
      q.push(left);
    }

    if (i + 1 < n && array[i + 1] !== null) {
      const right = TreeNode.create(array, i + 1);
      node.right = right;
      q.push(right);
    }
  }

  return root;
}
