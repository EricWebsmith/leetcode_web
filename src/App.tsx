import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

import Leetcode0659 from './Leetcode/Leetcode0659';
import { nameMetaDict, typeList } from './Leetcode/metadata';

function App(): JSX.Element {
  const [showNavbar, setShowNavbar] = React.useState<boolean>(true);

  function hide() {
    setShowNavbar(false);
  }

  function show() {
    setShowNavbar(true);
  }

  // const lis = [];
  // for (const T of typeList) {
  //   const meta = nameMetaDict.get(T.name);
  //   if (meta) {
  //     const url = `/leetcode_web/?id=${meta.id}`;
  //     const title = `${meta.id}. ${meta.title}`;
  //     const key = meta.id;
  //     lis.push(
  //       <li key={key}>
  //         <NavLink to={url}>{title}</NavLink>
  //       </li>
  //     );
  //   }
  // }

  const navbar = showNavbar ? (
    <nav className='navbar'>
      <ul>
        <li>
          <button onClick={hide}>&lt;&lt;</button>
          <NavLink to='/leetcode_web/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/leetcode_web/?id=3'>3. Longest Substring Without Repeating Characters</NavLink>
        </li>
        <li>
          <NavLink to='/leetcode_web/?id=16'>16. 3Sum Closest</NavLink>
        </li>
        <li>
          <NavLink to='/leetcode_web/?id=19'>19. Remove Nth Node From End of List</NavLink>
        </li>
        <li>
          <NavLink to='/leetcode_web/?id=76'>76. Minimum Window Substring</NavLink>
        </li>
        <li>
          <NavLink to='/leetcode_web/?id=91'>91. Decode Ways</NavLink>
        </li>
        <li>
          <NavLink to='/leetcode_web/?id=322'>322. Coin Change</NavLink>
        </li>
        <li>
          <NavLink to='/leetcode_web/?id=377'>377. Combination Sum IV</NavLink>
        </li>
        <li>
          <NavLink to='/leetcode_web/?id=658'>658. Find K Closest Elements</NavLink>
        </li>
        <li>
          <NavLink to='/leetcode_web/?id=659'>659. Split Array into Consecutive Subsequences</NavLink>
        </li>
        <li>
          <NavLink to='/leetcode_web/?id=732'>732. My Calendar III</NavLink>
        </li>
        <li>
          <NavLink to='/leetcode_web/?id=862'>862. Shortest Subarray with Sum at Least K</NavLink>
        </li>
        <li>
          <NavLink to='/leetcode_web/?id=2421'>2421. Number of Good Paths</NavLink>
        </li>
        <li>
          <NavLink to='/leetcode_web/?id=2422'>
            2422. Merge Operations to Turn Array Into a Palindrome
          </NavLink>
        </li>
        <li>
          <NavLink to='/leetcode_web/?id=2434'>
            2434. Using a Robot to Print the Lexicographically Smallest String
          </NavLink>
        </li>
      </ul>
    </nav>
  ) : (
    <button onClick={show}>&gt;&gt;</button>
  );
  return (
    <main>
      {navbar}
      <div className='article'>
        <LeetcodeSelector />
      </div>
    </main>
  );
}

function LeetcodeSelector() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const definedId = id == null ? 659 : Number(id);
  console.log(typeList.length);
  for (const T of typeList) {
    console.log(T.name);
    const meta = nameMetaDict.get(T.name);
    if (meta && meta.id === definedId) {
      return <T meta={meta} />;
    }
  }
  console.log('1130');
  return <Leetcode0659 />;
}

export default App;
