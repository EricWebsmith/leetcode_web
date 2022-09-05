import { useState } from 'react';
import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom';

import Leetcode3 from './Leetcode/Leetcode3';
import Leetcode76 from './Leetcode/Leetcode76';
import Leetcode322 from './Leetcode/Leetcode322';
import Leetcode377 from './Leetcode/Leetcode377';
import Leetcode659 from './Leetcode/Leetcode659';

function App() {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  function hide() {
    setShowNavbar(false);
  }

  function show() {
    setShowNavbar(true);
  }

  console.log(showNavbar);

  const navbar = showNavbar? (
    <nav className='navbar'>
        
    <ul>
      <li><button onClick={hide}>&lt;&lt;</button><NavLink to="/leetcode_web/">Home</NavLink></li>
      <li><NavLink to="/leetcode_web/3" >3. Longest Substring Without Repeating Characters</NavLink></li>
      <li><NavLink to="/leetcode_web/76" >76. Minimum Window Substring</NavLink></li>
      <li><NavLink to="/leetcode_web/322" >322. Coin Change</NavLink></li>
      <li><NavLink to="/leetcode_web/377" >377. Combination Sum IV</NavLink></li>
      <li><NavLink to="/leetcode_web/659" >659. Split Array into Consecutive Subsequences</NavLink></li>
    </ul>

  </nav>
  ):(
    <button onClick={show}>&gt;&gt;</button>
  );
  return (
    <main>
      {navbar}
      <div className="article">
        
        <Routes>
          
          <Route path="/leetcode_web/" element={<Leetcode3></Leetcode3>}></Route>
          <Route path="/leetcode_web/3" element={<Leetcode3></Leetcode3>}></Route>
          <Route path="/leetcode_web/76" element={<Leetcode76></Leetcode76>}></Route>
          <Route path="/leetcode_web/322" element={<Leetcode322></Leetcode322>}></Route>
          <Route path="/leetcode_web/377" element={<Leetcode377></Leetcode377>}></Route>
          <Route path="/leetcode_web/659" element={<Leetcode659></Leetcode659>}></Route>
          <Route path="*" element={<Leetcode659></Leetcode659>}></Route>
        </Routes>
      </div>

    </main>
  );
}

export default App;
