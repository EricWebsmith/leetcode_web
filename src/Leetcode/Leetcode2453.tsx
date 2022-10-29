import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';

export default function Leetcode0000() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const dp = '1001010';

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < 8) {
      setFrameIndex(index);
    }
  }

  const rectStyle = {
    fill: 'blue',
  };

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 80,
    fontFamily: 'Arial',
    fill: '#FFFFFF',
  };

  const dpStyle = {
    fontWeight: 'bold',
    fontSize: 80,
    fontFamily: 'Arial',
    fill: '#000000',
  };

  const offset = 100;
  let numsString = '2135246';
  if (frameIndex > 0) {
    numsString = '1223456';
  }

  let dpString = '';
  if (frameIndex > 0) {
    dpString = dp.substring(7 - frameIndex);
    dpString = dpString.padStart(7, ' ');
  }

  const current = [null, 6, 5, 4, 3, 2, 2, 2];

  return (
    <>
      <svg
        id='svg'
        width={1100}
        height={400}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}>
        <SvgRects x={80} y={75} height={90} width={90} n={7} offsetX={offset} style={rectStyle}></SvgRects>
        <SvgTexts x={102} y={150} text={numsString} offsetX={offset} style={textStyle}></SvgTexts>
        <SvgTexts x={102} y={255} text={dpString} offsetX={offset} style={dpStyle}></SvgTexts>
        <rect
          x={-25 + (8 - frameIndex) * offset}
          y={70}
          stroke='green'
          strokeWidth={10}
          strokeDasharray='10'
          fill='none'
          width={100}
          height={100}></rect>
        <text x={50} y={350} style={dpStyle}>
          Space: 2&nbsp;&nbsp;&nbsp;&nbsp;Current: {current[frameIndex]}
        </text>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
