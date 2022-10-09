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

  const lis = [];
  for (const T of typeList) {
    const meta = nameMetaDict.get(T.name);
    if (meta) {
      const url = `/leetcode_web/?id=${meta.id}`;
      const title = `${meta.id}. ${meta.title}`;
      const key = meta.id;
      lis.push(
        <li key={key}>
          <NavLink to={url}>{title}</NavLink>
        </li>
      );
    }
  }

  const navbar = showNavbar ? (
    <nav className='navbar'>
      <ul>
        <li>
          <button onClick={hide}>&lt;&lt;</button>
          <NavLink to='/leetcode_web/'>Home</NavLink>
        </li>
        {lis}
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
  for (const T of typeList) {
    const meta = nameMetaDict.get(T.name);
    if (meta && meta.id === definedId) {
      return <T meta={meta} />;
    }
  }
  return <Leetcode0659 />;
}

export default App;
