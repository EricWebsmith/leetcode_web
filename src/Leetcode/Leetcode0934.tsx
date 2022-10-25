import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgMatrix from '../controls/SvgMatrix';

export default function Leetcode0934() {
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

  const rectStyle = {
    stroke: 'black',
    strokeWidth: 6,
    fill: 'transparent',
  };

  const textStyle = {
    fontSize: 80,
    fontWeight: 'bold',
  };

  const [c1, c2, c3, c4] = ['#F66', '#6F6', '#55F', '#F5F', 'F55'];
  const colorMatrix = [
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    [
      ['', '', c1, c1],
      ['', '', '', c1],
      ['', '', '', c1],
      ['', '', '', ''],
    ],
    [
      ['', c2, c1, c1, c2],
      ['', '', c2, c1, c2],
      ['', '', c2, c1, c2],
      ['', '', '', c2],
    ],
    [
      [c3, c2, c1, c1, c2, c3],
      ['', c3, c2, c1, c2, c3],
      ['', c3, c2, c1, c2, c3],
      ['', '', c3, c2, c3],
    ],
    [
      [c3, c2, c1, c1, c2, c3, c4],
      [c4, c3, c2, c1, c2, c3, c4],
      [c4, c3, c2, c1, c2, c3, c4],
      ['', c4, c3, c2, c3, c4],
    ],
  ];
  return (
    <>
      <svg
        id='svg'
        width={900}
        height={500}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}>
        <SvgMatrix
          x={100}
          y={50}
          m={4}
          n={8}
          height={100}
          width={100}
          rectStyle={rectStyle}
          textStyle={textStyle}
          textArr={['  11    ', '   1    ', '   1  1 ', '      1 ']}
          colorMatrix={colorMatrix[frameIndex]}
        />
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
