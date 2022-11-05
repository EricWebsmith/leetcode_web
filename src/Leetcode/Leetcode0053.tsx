import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';

export default function Leetcode0053() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const dp = '-2 1-2 4 3 5 6 1 5';

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < 10) {
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

  return (
    <>
      <svg id='svg' width={1100} height={300}>
        <SvgRects x={80} y={75} height={90} width={90} n={9} offsetX={offset} style={rectStyle}></SvgRects>
        <SvgTexts
          x={90}
          y={150}
          text={'-2 1-3 4-1 2 1-5 4'}
          offsetX={offset}
          style={textStyle}
          step={2}
          spaceOffset={10}></SvgTexts>
        <SvgTexts
          x={85}
          y={255}
          text={dp.substring(0, frameIndex * 2)}
          step={2}
          offsetX={offset}
          spaceOffset={20}
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
