
import { useState } from 'react';
import jsLogo from '../js-180.png';
import logo from '../logo.svg';
import amazonLogo from '../logos/amazon.svg';
import googleLogo from '../logos/google.svg';
import microsoftLogo from '../logos/microsoft.svg';

interface Props {
  id: number;
  title: string;
}

export default function Header(props: Props) {
  const [logoId, setLogoId] = useState(0);
  const logos = [logo, amazonLogo, googleLogo, microsoftLogo, jsLogo];
  const currentLogo = logos[logoId];

  function imageClickHandler() {
    const newLogoId = (logoId + 1) % logos.length;
    setLogoId(newLogoId);
  }

  return (
    <header>
      <img onClick={imageClickHandler} className='logo' src={currentLogo} alt='logo' />
      <h1>{props.title}</h1>
    </header>
  );
}
