import { NavLink, Route, Routes } from 'react-router-dom';
import Leetcode322 from './Leetcode/Leetcode322';

function App() {
  return (
    <main>
      <nav className='navbar'>
        
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/322" >322 Coin Change</NavLink></li>
          <li><NavLink to="/378" >378 kth Smallest Element</NavLink></li>
        </ul>

      </nav>
      <div className="article">
        
        <Routes>
          <Route path="/" element={<Leetcode322></Leetcode322>}></Route>
          <Route path="/322" element={<Leetcode322></Leetcode322>}></Route>
          <Route path="/1" element={<h1>1</h1>}></Route>
        </Routes>
      </div>

    </main>
  );
}

export default App;
