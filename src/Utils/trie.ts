import { Queue } from '@datastructures-js/queue';

export class TrieNode {
  isWord: boolean;
  children: (TrieNode | null)[];
  id: number;
  c: string;
  constructor(index?: number) {
    this.isWord = false;
    this.children = new Array(26).fill(null);
    this.id = index ?? -1;
    this.c = "''";
  }

  static insert(root: TrieNode, word: string) {
    if (root == null) {
      return;
    }
    let current: TrieNode = root;
    for (let i = 0; i < word.length; i++) {
      const code = word.charCodeAt(i) - 'A'.charCodeAt(0);

      if (current.children[code] == null) {
        current.children[code] = new TrieNode();
      }

      current = current.children[code] || new TrieNode();
      current.c = word[i];
    }
    current.isWord = true;
  }

  static flatten(root: TrieNode | null): TrieNode[] {
    if (root === null) {
      return [];
    }
    const nodes: TrieNode[] = [];
    const q = new Queue<TrieNode>();
    q.enqueue(root);
    while (q) {
      const node = q.dequeue();
      for (const subNode of node.children) {
        if (subNode !== null) {
          q.enqueue(subNode);
        }
      }
      nodes.push(node);
    }
    return nodes;
  }

  static generateIds(root: TrieNode | null): TrieNode[] {
    if (root === null) {
      return [];
    }
    const nodes: TrieNode[] = [];
    const q = new Queue<TrieNode>();
    q.enqueue(root);
    let id = 0;
    while (q.size() > 0) {
      const node = q.dequeue();
      nodes.push(node);
      node.id = id;
      id++;
      for (const subNode of node.children) {
        if (subNode !== null) {
          q.enqueue(subNode);
        }
      }
    }
    return nodes;
  }
}
