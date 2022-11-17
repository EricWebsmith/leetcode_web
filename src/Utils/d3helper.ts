import { Queue } from '@datastructures-js/queue';
import { TreeNode } from './binaryTree';
import { TrieNode } from './trie';

export type D3Node = {
  child: string;
  parent: string;
};

function addAnotherChild(root: TreeNode): void {
  let virtialNodes = 0;
  function dfs(root: TreeNode): void {
    if (root.left == null && root.right != null) {
      virtialNodes++;
      root.left = new TreeNode(-1);
      root.left.id = -virtialNodes;
    }

    if (root.right == null && root.left != null) {
      virtialNodes++;
      root.right = new TreeNode(-1);
      root.right.id = -virtialNodes;
    }

    if (root.right) {
      dfs(root.right);
    }

    if (root.left) {
      dfs(root.left);
    }
  }
  dfs(root);
}

export function getTreeData(root: TreeNode): D3Node[] {
  addAnotherChild(root);
  const treeData: D3Node[] = [];
  getTreeDataRecursive(root, null, treeData);
  return treeData;
}

function getTreeDataRecursive(node: TreeNode, parent: TreeNode | null, treeData: D3Node[]): void {
  if (parent == null) {
    treeData.push({ child: node.id.toString(), parent: '' });
  } else {
    treeData.push({ child: node.id.toString(), parent: parent.id.toString() });
  }

  if (node.left) {
    getTreeDataRecursive(node.left, node, treeData);
  }
  if (node.right) {
    getTreeDataRecursive(node.right, node, treeData);
  }
}

export function getTrieData(root: TrieNode): D3Node[] {
  const trieData: D3Node[] = [];
  trieData.push({ child: '0', parent: '' });
  const q = new Queue<TrieNode>();
  q.enqueue(root);
  while (q.size() > 0) {
    const p = q.dequeue();
    for (const c of p.children) {
      if (c) {
        q.enqueue(c);
        trieData.push({ child: c.id.toString(), parent: p.id.toString() });
      }
    }
  }
  return trieData;
}
