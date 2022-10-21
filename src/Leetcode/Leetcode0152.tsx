import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';

export default function Leetcode0152() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const minDp = '  2  6 -2  4 48  0  0  1';
  const maxDp = '  2  3 -6-24 -8  0 -1 -1';

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < 9) {
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
    fontSize: 60,
    fontFamily: 'Arial',
    fill: '#000000',
  };

  const offset = 100;

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
        <SvgRects x={80} y={75} height={90} width={90} n={8} offsetX={offset} style={rectStyle}></SvgRects>
        <SvgTexts
          x={90}
          y={150}
          text={' 2 3-2 4-2 0-1 1'}
          offsetX={offset}
          style={textStyle}
          step={2}
          spaceOffset={10}></SvgTexts>
        <SvgTexts
          x={85}
          y={255}
          text={minDp.substring(0, frameIndex * 3)}
          step={3}
          offsetX={offset}
          spaceOffset={10}
          style={dpStyle}></SvgTexts>
        <SvgTexts
          x={85}
          y={355}
          text={maxDp.substring(0, frameIndex * 3)}
          step={3}
          offsetX={offset}
          spaceOffset={10}
          style={dpStyle}></SvgTexts>
        <rect
          x={-25 + frameIndex * offset}
          y={70}
          stroke='green'
          strokeWidth={10}
          strokeDasharray='10'
          fill='none'
          width={100}
          height={100}></rect>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
