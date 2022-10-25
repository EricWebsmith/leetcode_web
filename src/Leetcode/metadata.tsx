import Leetcode0003 from './Leetcode0003';
import Leetcode0016 from './Leetcode0016';
import Leetcode0019 from './Leetcode0019';
import Leetcode0053 from './Leetcode0053';
import Leetcode0076 from './Leetcode0076';
import Leetcode0091 from './Leetcode0091';
import Leetcode0121 from './Leetcode0121';
import Leetcode0152 from './Leetcode0152';
import Leetcode0198 from './Leetcode0198';
import Leetcode0205 from './Leetcode0205';
import Leetcode0237 from './Leetcode0237';
import Leetcode0322 from './Leetcode0322';
import Leetcode0377 from './Leetcode0377';
import Leetcode0658 from './Leetcode0658';
import Leetcode0659 from './Leetcode0659';
import Leetcode0732 from './Leetcode0732';
import Leetcode0779 from './Leetcode0779';
import Leetcode0862 from './Leetcode0862';
import Leetcode0901 from './Leetcode0901';
import Leetcode0904 from './Leetcode0904';
import Leetcode0934 from './Leetcode0934';
import Leetcode0940 from './Leetcode0940';
import Leetcode1234 from './Leetcode1234';
import Leetcode1662 from './Leetcode1662';
import Leetcode2095 from './Leetcode2095';
import Leetcode2421 from './Leetcode2421';
import Leetcode2422 from './Leetcode2422';
import Leetcode2434 from './Leetcode2434';
import Leetcode2435 from './Leetcode2435';
import Leetcode2439 from './Leetcode2439';
import Leetcode2448 from './Leetcode2448';
import Leetcode2449 from './Leetcode2449';
//import { default as Leetcode2439, default as Leetcode2449 } from './Leetcode2439';
import { ProblemMetadata } from './ProblemMetadata';

const typeList = [
  Leetcode0003,
  Leetcode0016,
  Leetcode0019,
  Leetcode0091,
  Leetcode0053,
  Leetcode0076,
  Leetcode0121,
  Leetcode0152,
  Leetcode0198,
  Leetcode0237,
  Leetcode0205,
  Leetcode0322,
  Leetcode0377,
  Leetcode0658,
  Leetcode0659,
  Leetcode0732,
  Leetcode0779,
  Leetcode0862,
  Leetcode0901,
  Leetcode0904,
  Leetcode0934,
  Leetcode0940,
  Leetcode1234,
  Leetcode1662,
  Leetcode2095,
  Leetcode2421,
  Leetcode2422,
  Leetcode2434,
  Leetcode2435,
  Leetcode2439,
  Leetcode2448,
  Leetcode2449,
];

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
    id: 53,
    title: 'Maximum Subarray',
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
    id: 121,
    title: 'Best Time to Buy and Sell Stock',
  },
  {
    id: 152,
    title: 'Maximum Product Subarray',
  },
  {
    id: 198,
    title: 'House Robber',
  },
  {
    id: 205,
    title: 'Isomorphic Strings',
  },
  {
    id: 237,
    title: 'Delete Node in a Linked List',
  },
  {
    id: 322,
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
    id: 779,
    title: 'K-th Symbol in Grammar',
  },
  {
    id: 862,
    title: 'Shortest Subarray with Sum at Least K',
  },
  {
    id: 901,
    title: 'Online Stock Span',
  },
  {
    id: 904,
    title: 'Fruit Into Baskets',
  },
  {
    id: 934,
    title: 'Shortest Bridge',
  },
  {
    id: 940,
    title: 'Distinct Subsequences II',
  },
  {
    id: 1234,
    title: 'Replace the Substring for Balanced String',
  },
  {
    id: 1662,
    title: 'Check If Two String Arrays are Equivalent',
  },
  {
    id: 2095,
    title: 'Delete the Middle Node of a Linked List',
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
  {
    id: 2439,
    title: 'Minimize Maximum of Array',
  },
  {
    id: 2448,
    title: 'Minimum Cost to Make Array Equal',
  },
  {
    id: 2449,
    title: 'Minimum Number of Operations to Make Arrays Similar',
  },
];

const idMetaDict = new Map<number, ProblemMetadata>();
const nameMetaDict = new Map<string, ProblemMetadata>();

for (const meta of metaList) {
  idMetaDict.set(meta.id, meta);
  const name = 'Leetcode' + `${meta.id}`.padStart(4, '0');
  nameMetaDict.set(name, meta);
}

const default_id = 904;

function LeetcodeSelector(id: number) {
  const definedId = id == null ? default_id : Number(id);
  switch (definedId) {
    case 3:
      return <Leetcode0003 />;
    case 16:
      return <Leetcode0016 />;
    case 19:
      return <Leetcode0019 />;
    case 53:
      return <Leetcode0053 />;
    case 76:
      return <Leetcode0076 />;
    case 91:
      return <Leetcode0091 />;
    case 121:
      return <Leetcode0121 />;
    case 152:
      return <Leetcode0152 />;
    case 198:
      return <Leetcode0198 />;
    case 205:
      return <Leetcode0205 />;
    case 237:
      return <Leetcode0237 />;
    case 322:
      return <Leetcode0322 />;
    case 377:
      return <Leetcode0377 />;
    case 658:
      return <Leetcode0658 />;
    case 659:
      return <Leetcode0659 />;
    case 732:
      return <Leetcode0732 />;
    case 779:
      return <Leetcode0779 />;
    case 901:
      return <Leetcode0901 />;
    case 904:
      return <Leetcode0904 />;
    case 934:
      return <Leetcode0934 />;
    case 940:
      return <Leetcode0940 />;
    case 862:
      return <Leetcode0862 />;
    case 1234:
      return <Leetcode1234 />;
    case 1662:
      return <Leetcode1662 />;
    case 2095:
      return <Leetcode2095 />;
    case 2421:
      return <Leetcode2421 />;
    case 2422:
      return <Leetcode2422 />;
    case 2434:
      return <Leetcode2434 />;
    case 2435:
      return <Leetcode2435 />;
    case 2439:
      return <Leetcode2439 />;
    case 2448:
      return <Leetcode2448 />;
    case 2449:
      return <Leetcode2449 />;
    default:
      return <Leetcode0198 />;
  }
}

export { metaList, typeList, idMetaDict, nameMetaDict, LeetcodeSelector, default_id };
