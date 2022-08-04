import { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Leetcode_322 from './Leetcode/Leetcode_322';
import Leetcode_76 from './Leetcode/Leetcode_76';

function App() {
  const [showNavbar, setShowNavbar] = useState(true);

  function hide() {
    setShowNavbar(false);
  }

  function show() {
    setShowNavbar(true);
  }

  const navbar = showNavbar? (
    <nav className='navbar'>
        
    <ul>
      <li><button onClick={hide}>&lt;&lt;</button><NavLink to="/leetcode_web/">Home</NavLink></li>
      <li><NavLink to="/leetcode_web/76" >76. Minimum Window Substring</NavLink></li>
      <li><NavLink to="/leetcode_web/322" >322. Coin Change</NavLink></li>
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
          <Route path="/leetcode_web/" element={<Leetcode_322></Leetcode_322>}></Route>
          <Route path="/leetcode_web/76" element={<Leetcode_76></Leetcode_76>}></Route>
          <Route path="/leetcode_web/322" element={<Leetcode_322></Leetcode_322>}></Route>
        </Routes>
      </div>

    </main>
  );
}

export default App;
