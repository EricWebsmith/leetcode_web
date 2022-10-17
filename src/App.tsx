import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import Header from './controls/Header';
import { default_id, idMetaDict, LeetcodeSelector, metaList } from './Leetcode/metadata';

function App(): JSX.Element {
  const [showNavbar, setShowNavbar] = React.useState<boolean>(true);

  function hide() {
    setShowNavbar(false);
  }

  function show() {
    setShowNavbar(true);
  }

  const lis = [];
  for (const meta of metaList) {
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

  const [searchParams] = useSearchParams();
  const paramId = searchParams.get('id');
  let id = paramId == null ? default_id : Number(paramId);
  if (!idMetaDict.has(id)) {
    id = default_id;
  }
  const meta = idMetaDict.get(id);

  return (
    <main>
      {navbar}
      <div className='ppt' style={{ width: 950 }}>
        <Header id={id} title={meta?.title ?? ''} />
        {LeetcodeSelector(id)}
      </div>
    </main>
  );
}

export default App;
