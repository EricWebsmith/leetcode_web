import IIconProps from './IIconProps';

//this is from svgrepo.com
export default function Pear(props: IIconProps) {
  const transform = `scale(${props.scale}) translate(${props.x}, ${props.y})`;
  return (
    <g transform={transform}>
      <rect x='0' y='0' width='24' height='24' fill='red'></rect>
      <g
        style={{
          fill: 'none',
          stroke: '#000000',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeMiterlimit: 10,
        }}>
        <rect x='0' y='0' width='24' height='24' />
        <rect x='0' y='0' width='12' height='8' />
        <rect x='6' y='8' width='12' height='8' />
        <rect x='0' y='16' width='12' height='8' />
        <rect x='12' y='0' width='12' height='8' />
        <rect x='12' y='16' width='12' height='8' />
      </g>
    </g>
  );
}

/*
svgrepo.com
*/
