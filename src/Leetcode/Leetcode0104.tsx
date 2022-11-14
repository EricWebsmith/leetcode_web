import React from 'react';
import Leetcode0104Bfs from './Leetcode0104Bfs';
import Leetcode0104Dfs from './Leetcode0104Dfs';
import Leetcode0104DfsIterative from './Leetcode0104DfsIterative';

const BFS = 'BFS';
const DFS = 'DFS (Recursive)';
const DFSIterative = 'Iterative DFS';

export default function Leetcode0104() {
  const [child, setChild] = React.useState(DFS);
  function handleDfsClick() {
    setChild(DFS);
  }

  function handleDfsIterativeClick() {
    setChild(DFSIterative);
  }

  function handleBfsClick() {
    setChild(BFS);
  }

  let childElement = <></>;
  switch (child) {
    case BFS:
      childElement = <Leetcode0104Bfs />;
      break;
    case DFS:
      childElement = <Leetcode0104Dfs />;
      break;
    default:
      childElement = <Leetcode0104DfsIterative />;
      break;
  }

  return (
    <>
      {childElement}
      <div style={{ paddingLeft: 50 }}>
        <button className='btn' onClick={handleBfsClick}>
          {BFS}
        </button>
        <button className='btn' onClick={handleDfsClick}>
          {DFS}
        </button>
        <button className='btn' onClick={handleDfsIterativeClick}>
          {DFSIterative}
        </button>
      </div>
    </>
  );
}
