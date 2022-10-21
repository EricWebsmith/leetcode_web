import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import Coin from '../SvgIcons/Coin';
import Robber from '../SvgIcons/Robber';

interface IHouseProps {
  x: number;
  color: string;
}

function House(props: IHouseProps) {
  const transform = `translate(${props.x}, 0)`;
  return (
    <path
      transform={transform}
      d='M100, 100 L100, 200 L200 200 L200 100 L230 100 L200 70 L200 30 L180 30 L180 50 L150 20 L70 100 z'
      style={{
        stroke: props.color,
        strokeWidth: '10',
        fill: 'none',
      }}></path>
  );
}

export default function Leetcode0198() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < 5) {
      setFrameIndex(index);
    }
  }

  const opacities = [0, 0, 0, 0, 0];
  for (let i = 0; i <= frameIndex; i++) {
    opacities[i] = 1;
  }

  const offset = 200;
  const robberTransform = `translate(${offset * frameIndex - 800}, 0)`;

  return (
    <>
      <svg
        id='svg'
        width={1100}
        height={520}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}>
        <g id='neigborhood' transform='translate(0, 150)'>
          <House color='green' x={0} />
          <House color='blue' x={200} />
          <House color='red' x={400} />
          <House color='purple' x={600} />
          <House color='cyan' x={800} />
          {/*  house 0 */}
          <Coin x={840} y={900} scale={0.15} />

          {/* house 1 */}
          <Coin x={2040} y={900} scale={0.15} />
          <Coin x={2340} y={900} scale={0.15} />
          {/* house 2 */}
          <Coin x={3370} y={900} scale={0.15} />
          <Coin x={3670} y={900} scale={0.15} />
          <Coin x={3520} y={600} scale={0.15} />
          {/* house 3 */}
          <Coin x={4700} y={900} scale={0.15} />
          <Coin x={5000} y={900} scale={0.15} />
          {/* house 4 */}
          <Coin x={6200} y={900} scale={0.15} />
          {/* Income */}
          {/*  house 0 */}
          <g opacity={opacities[0]}>
            <Coin x={840} y={1500} scale={0.15} />
          </g>

          {/*  house 1 */}
          <g opacity={opacities[1]}>
            <Coin x={2040} y={1500} scale={0.15} />
            <Coin x={2340} y={1500} scale={0.15} />
          </g>

          {/*  house 2 */}
          <g opacity={opacities[2]}>
            <Coin x={3370} y={1500} scale={0.15} />
            <Coin x={3670} y={1500} scale={0.15} />
            <Coin x={3370} y={1800} scale={0.15} />
            <Coin x={3670} y={1800} scale={0.15} />
          </g>

          {/*  house 3 */}
          <g opacity={opacities[3]}>
            <Coin x={4700} y={1500} scale={0.15} />
            <Coin x={5000} y={1500} scale={0.15} />
            <Coin x={4700} y={1800} scale={0.15} />
            <Coin x={5000} y={1800} scale={0.15} />
          </g>

          {/*  house 4 */}
          <g opacity={opacities[4]}>
            <Coin x={6030} y={1500} scale={0.15} />
            <Coin x={6330} y={1500} scale={0.15} />
            <Coin x={6030} y={1800} scale={0.15} />
            <Coin x={6330} y={1800} scale={0.15} />
            <Coin x={6200} y={2100} scale={0.15} />
          </g>
        </g>
        <g transform={robberTransform}>
          <Robber x={900} y={0} scale={0.15} />
          <Robber x={500} y={0} scale={0.15} opacity={0.5} />
          <Robber x={300} y={0} scale={0.15} opacity={0.5} />
        </g>
      </svg>
      <ButtonBar setIndex={setIndex} />
      <div className='copyright'>
        Thanks to <a href='onlinewebfonts.com'>onlinewebfonts.com</a> for the robber image, and{' '}
        <a href='svgrepo.com'>svgrepo.com</a> for the coin image.
      </div>
    </>
  );
}
