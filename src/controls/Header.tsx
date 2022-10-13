import React from 'react';

import csLogo from '../cs-180.png';
import jsLogo from '../js-180.png';
import logo from '../logo.png';
import pyLogo from '../py-180.png';

interface Props {
  id: number;
  title: string;
}

export default function Header(props: Props) {
  const [logoId, setLogoId] = React.useState(0);
  const logos = [logo, csLogo, pyLogo, jsLogo];
  const currentLogo = logos[logoId];

  function imageClickHandler() {
    const newLogoId = (logoId + 1) % logos.length;
    setLogoId(newLogoId);
  }

  return (
    <header>
      <img onClick={imageClickHandler} className='logo' src={currentLogo} alt='logo' />
      <h1>
        {props.id}. {props.title}
      </h1>
    </header>
  );
}
