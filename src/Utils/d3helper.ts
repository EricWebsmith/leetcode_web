import { TreeNode } from './binaryTree';

export type D3Node = {
  child: string;
  parent: string;
};

export function getTreeData(root: TreeNode): D3Node[] {
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
