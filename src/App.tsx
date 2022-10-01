import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

import Leetcode19 from './Leetcode/Leetcode19';
import Leetcode2421 from './Leetcode/Leetcode2421';
import Leetcode2422 from './Leetcode/Leetcode2422';
import Leetcode3 from './Leetcode/Leetcode3';
import Leetcode322 from './Leetcode/Leetcode322';
import Leetcode377 from './Leetcode/Leetcode377';
import Leetcode658 from './Leetcode/Leetcode658';
import Leetcode659 from './Leetcode/Leetcode659';
import Leetcode76 from './Leetcode/Leetcode76';
import Leetcode862 from './Leetcode/Leetcode862';
import Leetcode91 from './Leetcode/Leetcode91';


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
        <li><button onClick={hide}>&lt;&lt;</button><NavLink to="/leetcode_web/">Home</NavLink></li>
        <li><NavLink to="/leetcode_web/?id=3" >3. Longest Substring Without Repeating Characters</NavLink></li>
        <li><NavLink to="/leetcode_web/?id=19" >19. Remove Nth Node From End of List</NavLink></li>
        <li><NavLink to="/leetcode_web/?id=76" >76. Minimum Window Substring</NavLink></li>
        <li><NavLink to="/leetcode_web/?id=91" >91. Decode Ways</NavLink></li>
        <li><NavLink to="/leetcode_web/?id=322" >322. Coin Change</NavLink></li>
        <li><NavLink to="/leetcode_web/?id=377" >377. Combination Sum IV</NavLink></li>
        <li><NavLink to="/leetcode_web/?id=658" >658. Find K Closest Elements</NavLink></li>
        <li><NavLink to="/leetcode_web/?id=659" >659. Split Array into Consecutive Subsequences</NavLink></li>
        <li><NavLink to="/leetcode_web/?id=862" >862. Shortest Subarray with Sum at Least K</NavLink></li>
        <li><NavLink to="/leetcode_web/?id=2421" >2421. Number of Good Paths</NavLink></li>
        <li><NavLink to="/leetcode_web/?id=2422" >2422. Merge Operations to Turn Array Into a Palindrome</NavLink></li>
      </ul>

    </nav>
  ) : (
    <button onClick={show}>&gt;&gt;</button>
  );
  return (
    <main>
      {navbar}
      <div className="article">
        <LeetcodeSelector />
      </div>
    </main>
  );
}

function LeetcodeSelector() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id')
  const definedId = id == null ? 659 : Number(id);
  switch (definedId) {
    case 3:
      return (<Leetcode3 />);
    case 19:
      return (<Leetcode19 />);
    case 76:
      return (<Leetcode76 />);
    case 91:
      return (<Leetcode91 />);
    case 322:
      return (<Leetcode322 />);
    case 377:
      return (<Leetcode377 />);
    case 658:
      return (<Leetcode658 />);
    case 659:
      return (<Leetcode659 />);
    case 862:
      return (<Leetcode862 />);
    case 2421:
      return (<Leetcode2421 />);
    case 2422:
      return (<Leetcode2422 />);
    default:
      return (<Leetcode659 />);
  }
}

export default App;
