import IIconProps from './IIconProps';

//this is from svgrepo.com
export default function Pear(props: IIconProps) {
  const transform = `scale(${props.scale}) translate(${props.x}, ${props.y})`;
  return (
    <g transform={transform}>
      <circle cx='129.375' cy='60' r='60' />
      <path d='M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z' />
    </g>
  );
}

/*
svgrepo.com
*/
