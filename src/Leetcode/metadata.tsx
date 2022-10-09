import Leetcode0003 from './Leetcode0003';
import Leetcode0016 from './Leetcode0016';
import Leetcode0019 from './Leetcode0019';
import Leetcode0076 from './Leetcode0076';
import Leetcode0091 from './Leetcode0091';
import Leetcode0322 from './Leetcode0322';
import Leetcode0377 from './Leetcode0377';
import Leetcode0658 from './Leetcode0658';
import Leetcode0659 from './Leetcode0659';
import Leetcode0732 from './Leetcode0732';
import Leetcode0862 from './Leetcode0862';
import Leetcode2421 from './Leetcode2421';
import Leetcode2422 from './Leetcode2422';
import Leetcode2434 from './Leetcode2434';
import Leetcode2435 from './Leetcode2435';

const typeList = [
  Leetcode0003,
  Leetcode0016,
  Leetcode0019,
  Leetcode0091,
  Leetcode0076,
  Leetcode0322,
  Leetcode0377,
  Leetcode0658,
  Leetcode0659,
  Leetcode0732,
  Leetcode0862,
  Leetcode2421,
  Leetcode2422,
  Leetcode2434,
  Leetcode2435,
];

type ProblemMetadata = {
  id: number;
  title: string;
};

interface ILeetcodeProps {
  meta?: ProblemMetadata;
}

const metaList: ProblemMetadata[] = [
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
  },
  {
    id: 16,
    title: '3Sum Closest',
  },
  {
    id: 19,
    title: 'Remove Nth Node From End of List',
  },
  {
    id: 76,
    title: 'Minimum Window Substring',
  },
  {
    id: 91,
    title: 'Decode Ways',
  },
  {
    id: 332,
    title: 'Coin Change',
  },
  {
    id: 377,
    title: 'Combination Sum IV',
  },
  {
    id: 658,
    title: 'Find K Closest Elements',
  },
  {
    id: 659,
    title: 'Split Array into Consecutive Subsequences',
  },
  {
    id: 732,
    title: 'My Calendar III',
  },
  {
    id: 862,
    title: 'Shortest Subarray with Sum at Least K',
  },
  {
    id: 2421,
    title: 'Number of Good Paths',
  },
  {
    id: 2422,
    title: 'Merge Operations to Turn Array Into a Palindrome',
  },
  {
    id: 2434,
    title: 'Using a Robot to Print the Lexicographically Smallest String',
  },
  {
    id: 2435,
    title: 'Paths in Matrix Whose Sum Is Divisible by K',
  },
];

const idMetaDict = new Map<number, ProblemMetadata>();
const nameMetaDict = new Map<string, ProblemMetadata>();

for (const meta of metaList) {
  idMetaDict.set(meta.id, meta);
  const name = 'Leetcode' + `${meta.id}`.padStart(4, '0');
  nameMetaDict.set(name, meta);
}

export { typeList, idMetaDict, nameMetaDict };
export type { ProblemMetadata, ILeetcodeProps };