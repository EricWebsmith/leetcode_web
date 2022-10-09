import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

import Leetcode0003 from './Leetcode/Leetcode0003';
import Leetcode0016 from './Leetcode/Leetcode0016';
import Leetcode0019 from './Leetcode/Leetcode0019';
import Leetcode0076 from './Leetcode/Leetcode0076';
import Leetcode0091 from './Leetcode/Leetcode0091';
import Leetcode0322 from './Leetcode/Leetcode0322';
import Leetcode0377 from './Leetcode/Leetcode0377';
import Leetcode0658 from './Leetcode/Leetcode0658';
import Leetcode0659 from './Leetcode/Leetcode0659';
import Leetcode0732 from './Leetcode/Leetcode0732';
import Leetcode0862 from './Leetcode/Leetcode0862';
import Leetcode2421 from './Leetcode/Leetcode2421';
import Leetcode2422 from './Leetcode/Leetcode2422';
import Leetcode2434 from './Leetcode/Leetcode2434';

function App(): JSX.Element {
  const [showNavbar, setShowNavbar] = React.useState<boolean>(true);

  function hide() {
    setShowNavbar(false);
  }

  function show() {
    setShowNavbar(true);
  }

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
  switch (definedId) {
    case 3:
      return <Leetcode0003 />;
    case 16:
      return <Leetcode0016 />;
    case 19:
      return <Leetcode0019 />;
    case 76:
      return <Leetcode0076 />;
    case 91:
      return <Leetcode0091 />;
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
    case 862:
      return <Leetcode0862 />;
    case 2421:
      return <Leetcode2421 />;
    case 2422:
      return <Leetcode2422 />;
    case 2434:
      return <Leetcode2434 />;
    default:
      return <Leetcode0659 />;
  }
}

export default App;
