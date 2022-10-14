import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';

type Frame = {
  dp: string;
  last?: number;
  message?: string;
};

export default function Leetcode0940() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  ('But we must subtract the same ending. So 8 * 2 - 1 = 15');
  const frames: Frame[] = [
    { dp: ' 1', message: 'At the first, we have an empty sting. hence dp[0]=1' },
    { dp: ' 1 2', message: 'Now we have "" and "a" dp[1]=2' },
    { dp: ' 1 2 4', message: 'When a new character is added, dp is doubled. We can add or not.' },
    { dp: ' 1 2 4 8', message: '4 * 2 = 8' },
    { dp: ' 1 2 4 815', last: 1, message: 'But we must subtract the same ending. So 8 * 2 - 1 = 15' },
    { dp: ' 1 2 4 81528', last: 2, message: '15 * 2 - 2 = 28' },
    { dp: ' 1 2 4 8152856' },
  ];

  const frame = frames[frameIndex];

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < frames.length) {
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

  const offset = 120;

  return (
    <>
      <svg
        id='svg'
        width={900}
        height={300}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}>
        <SvgRects x={180} y={75} height={100} width={100} n={6} offsetX={offset} style={rectStyle}></SvgRects>
        <SvgTexts x={205} y={155} text={'abcabd'} offsetX={offset} style={textStyle}></SvgTexts>
        <SvgTexts
          x={185 - offset}
          y={255}
          text={frame.dp}
          step={2}
          offsetX={offset}
          spaceOffset={20}
          style={dpStyle}></SvgTexts>
        <rect
          x={55 + frameIndex * offset}
          y={70}
          stroke='green'
          strokeWidth={10}
          strokeDasharray='10'
          fill='none'
          width={110}
          height={110}></rect>
        <rect
          x={55 + (frame.last ?? -100) * offset}
          y={70}
          stroke='red'
          strokeWidth={10}
          strokeDasharray='10'
          fill='none'
          width={110}
          height={110}></rect>
      </svg>
      <div id='message'>{frame.message}</div>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
