import Leetcode0003 from './Leetcode0003';
import Leetcode0016 from './Leetcode0016';
import Leetcode0019 from './Leetcode0019';
import Leetcode0023 from './Leetcode0023';
import Leetcode0042 from './Leetcode0042';
import Leetcode0053 from './Leetcode0053';
import Leetcode0056 from './Leetcode0056';
import Leetcode0057 from './Leetcode0057';
import Leetcode0076 from './Leetcode0076';
import Leetcode0079 from './Leetcode0079';
import Leetcode0091 from './Leetcode0091';
import Leetcode0100 from './Leetcode0100';
import Leetcode0102 from './Leetcode0102';
import Leetcode0104 from './Leetcode0104';
import Leetcode0104Bfs from './Leetcode0104Bfs';
import Leetcode0104Dfs from './Leetcode0104Dfs';
import Leetcode0104DfsIterative from './Leetcode0104DfsIterative';
import Leetcode0105 from './Leetcode0105';
import Leetcode0121 from './Leetcode0121';
import Leetcode0124 from './Leetcode0124';
import Leetcode0152 from './Leetcode0152';
import Leetcode0198 from './Leetcode0198';
import Leetcode0205 from './Leetcode0205';
import Leetcode0208 from './Leetcode0208';
import Leetcode0211 from './Leetcode0211';
import Leetcode0211PrefixLte from './Leetcode0211PrefixLte';
import Leetcode0211PrefixPostfix from './Leetcode0211PrefixPostfix';
import Leetcode0212 from './Leetcode0212';
import Leetcode0222 from './Leetcode0222';
import Leetcode0230 from './Leetcode0230';
import Leetcode0237 from './Leetcode0237';
import Leetcode0252 from './Leetcode0252';
import Leetcode0295 from './Leetcode0295';
import Leetcode0297 from './Leetcode0297';
import Leetcode0297Deserialize from './Leetcode0297Deserialize';
import Leetcode0297Serialize from './Leetcode0297Serialize';
import Leetcode0322 from './Leetcode0322';
import Leetcode0345 from './Leetcode0345';
import Leetcode0377 from './Leetcode0377';
import Leetcode0424 from './Leetcode0424';
import Leetcode0433 from './Leetcode0433';
import Leetcode0435 from './Leetcode0435';
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
import Leetcode1339 from './Leetcode1339';
import Leetcode1662 from './Leetcode1662';
import Leetcode1926 from './Leetcode1926';
import Leetcode2095 from './Leetcode2095';
import Leetcode2131 from './Leetcode2131';
import Leetcode2402 from './Leetcode2402';
import Leetcode2421 from './Leetcode2421';
import Leetcode2422 from './Leetcode2422';
import Leetcode2434 from './Leetcode2434';
import Leetcode2435 from './Leetcode2435';
import Leetcode2439 from './Leetcode2439';
import Leetcode2448 from './Leetcode2448';
import Leetcode2449 from './Leetcode2449';
import Leetcode2453 from './Leetcode2453';
import Leetcode2462 from './Leetcode2462';
import { ProblemMetadata } from './ProblemMetadata';

const typeList = [
  Leetcode0003,
  Leetcode0016,
  Leetcode0019,
  Leetcode0023,
  Leetcode0042,
  Leetcode0053,
  Leetcode0056,
  Leetcode0057,
  Leetcode0076,
  Leetcode0079,
  Leetcode0091,
  Leetcode0100,
  Leetcode0102,
  Leetcode0104Bfs,
  Leetcode0104Dfs,
  Leetcode0104DfsIterative,
  Leetcode0105,
  Leetcode0121,
  Leetcode0124,
  Leetcode0152,
  Leetcode0198,
  Leetcode0208,
  Leetcode0205,
  Leetcode0211PrefixLte,
  Leetcode0211PrefixPostfix,
  Leetcode0212,
  Leetcode0222,
  Leetcode0230,
  Leetcode0237,
  Leetcode0252,
  Leetcode0295,
  Leetcode0297Serialize,
  Leetcode0297Deserialize,
  Leetcode0322,
  Leetcode0345,
  Leetcode0377,
  Leetcode0424,
  Leetcode0433,
  Leetcode0435,
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
  Leetcode1339,
  Leetcode1662,
  Leetcode1926,
  Leetcode2095,
  Leetcode2131,
  Leetcode2402,
  Leetcode2421,
  Leetcode2422,
  Leetcode2434,
  Leetcode2435,
  Leetcode2439,
  Leetcode2448,
  Leetcode2449,
  Leetcode2453,
  Leetcode2462,
];

const metaList: ProblemMetadata[] = [
  { id: 3, title: 'Longest Substring Without Repeating Characters' },
  { id: 16, title: '3Sum Closest' },
  { id: 19, title: 'Remove Nth Node From End of List' },
  { id: 23, title: 'Merge k Sorted Lists' },
  { id: 42, title: 'Trapping Rain Water' },
  { id: 53, title: 'Maximum Subarray' },
  { id: 56, title: 'Merge Intervals' },
  { id: 57, title: 'Insert Interval' },
  { id: 76, title: 'Minimum Window Substring' },
  { id: 79, title: 'Word Search' },
  { id: 91, title: 'Decode Ways' },
  { id: 100, title: 'Same Tree' },
  { id: 102, title: 'Binary Tree Level Order Traversal' },
  { id: 104, title: 'Maximum Depth of Binary Tree' },
  { id: 105, title: 'Construct Binary Tree from Preorder and Inorder Traversal' },
  { id: 121, title: 'Best Time to Buy and Sell Stock' },
  { id: 124, title: 'Binary Tree Maximum Path Sum' },
  { id: 152, title: 'Maximum Product Subarray' },
  { id: 198, title: 'House Robber' },
  { id: 205, title: 'Isomorphic Strings' },
  { id: 208, title: 'Implement Trie (Prefix Tree)' },
  { id: 211, title: 'Design Add and Search Words Data Structure' },
  { id: 212, title: 'Word Search II' },
  { id: 222, title: 'Count Complete Tree Nodes' },
  { id: 230, title: 'Kth Smallest Element in a BST' },
  { id: 237, title: 'Delete Node in a Linked List' },
  { id: 252, title: 'Meeting Rooms' },
  { id: 253, title: 'Meeting Rooms II' },
  { id: 295, title: 'Find Median from Data Stream' },
  { id: 297, title: 'Serialize and Deserialize Binary Tree' },
  { id: 322, title: 'Coin Change' },
  { id: 345, title: 'Reverse Vowels of a String' },
  { id: 377, title: 'Combination Sum IV' },
  { id: 424, title: 'Longest Repeating Character Replacement' },
  { id: 433, title: 'Minimum Genetic Mutation' },
  { id: 435, title: 'Non-overlapping Intervals' },
  { id: 658, title: 'Find K Closest Elements' },
  { id: 659, title: 'Split Array into Consecutive Subsequences' },
  { id: 732, title: 'My Calendar III' },
  { id: 779, title: 'K-th Symbol in Grammar' },
  { id: 862, title: 'Shortest Subarray with Sum at Least K' },
  { id: 901, title: 'Online Stock Span' },
  { id: 904, title: 'Fruit Into Baskets' },
  { id: 934, title: 'Shortest Bridge' },
  { id: 940, title: 'Distinct Subsequences II' },
  { id: 1234, title: 'Replace the Substring for Balanced String' },
  { id: 1339, title: 'Maximum Product of Splitted Binary Tree' },
  { id: 1662, title: 'Check If Two String Arrays are Equivalent' },
  { id: 1926, title: 'Nearest Exit from Entrance in Maze' },
  { id: 2095, title: 'Delete the Middle Node of a Linked List' },
  { id: 2131, title: 'Longest Palindrome by Concatenating Two Letter Words' },
  { id: 2402, title: 'Meeting Rooms III' },
  { id: 2421, title: 'Number of Good Paths' },
  { id: 2422, title: 'Merge Operations to Turn Array Into a Palindrome' },
  { id: 2434, title: 'Using a Robot to Print the Lexicographically Smallest String' },
  { id: 2435, title: 'Paths in Matrix Whose Sum Is Divisible by K' },
  { id: 2439, title: 'Minimize Maximum of Array' },
  { id: 2448, title: 'Minimum Cost to Make Array Equal' },
  { id: 2449, title: 'Minimum Number of Operations to Make Arrays Similar' },
  { id: 2453, title: 'Destroy Sequential Targets' },
  { id: 2462, title: 'Total Cost to Hire K Workers' },
];

const idMetaDict = new Map<number, ProblemMetadata>();
const nameMetaDict = new Map<string, ProblemMetadata>();
const default_id = 904;

for (const meta of metaList) {
  idMetaDict.set(meta.id, meta);
  const name = 'Leetcode' + `${meta.id}`.padStart(4, '0');
  nameMetaDict.set(name, meta);
}

function LeetcodeSelector(id: number) {
  const definedId = id == null ? default_id : Number(id);
  switch (definedId) {
    case 3:
      return <Leetcode0003 />;
    case 16:
      return <Leetcode0016 />;
    case 19:
      return <Leetcode0019 />;
    case 23:
      return <Leetcode0023 />;
    case 42:
      return <Leetcode0042 />;
    case 53:
      return <Leetcode0053 />;
    case 56:
      return <Leetcode0056 />;
    case 57:
      return <Leetcode0057 />;
    case 76:
      return <Leetcode0076 />;
    case 79:
      return <Leetcode0079 />;
    case 91:
      return <Leetcode0091 />;
    case 100:
      return <Leetcode0100 />;
    case 102:
      return <Leetcode0102 />;
    case 104:
      return <Leetcode0104 />;
    case 105:
      return <Leetcode0105 />;
    case 121:
      return <Leetcode0121 />;
    case 124:
      return <Leetcode0124 />;
    case 152:
      return <Leetcode0152 />;
    case 198:
      return <Leetcode0198 />;
    case 205:
      return <Leetcode0205 />;
    case 208:
      return <Leetcode0208 />;
    case 211:
      return <Leetcode0211 />;
    case 212:
      return <Leetcode0212 />;
    case 222:
      return <Leetcode0222 />;
    case 230:
      return <Leetcode0230 />;
    case 237:
      return <Leetcode0237 />;
    case 252:
      return <Leetcode0252 />;
    case 253:
      return <Leetcode0252 />;
    case 295:
      return <Leetcode0295 />;
    case 297:
      return <Leetcode0297 />;
    case 322:
      return <Leetcode0322 />;
    case 345:
      return <Leetcode0345 />;
    case 377:
      return <Leetcode0377 />;
    case 424:
      return <Leetcode0424 />;
    case 433:
      return <Leetcode0433 />;
    case 435:
      return <Leetcode0435 />;
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
    case 1339:
      return <Leetcode1339 />;
    case 1662:
      return <Leetcode1662 />;
    case 1926:
      return <Leetcode1926 />;
    case 2095:
      return <Leetcode2095 />;
    case 2131:
      return <Leetcode2131 />;
    case 2402:
      return <Leetcode2402 />;
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
    case 2453:
      return <Leetcode2453 />;
    case 2462:
      return <Leetcode2462 />;
    default:
      return <Leetcode0198 />;
  }
}

export { metaList, typeList, idMetaDict, nameMetaDict, LeetcodeSelector, default_id };
