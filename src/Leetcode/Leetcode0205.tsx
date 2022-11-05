import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';

type Frame = {
  sCode: string;
  tCode: string;
};

export default function Leetcode0205() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  ('But we must subtract the same ending. So 8 * 2 - 1 = 15');
  const frames: Frame[] = [
    { sCode: '', tCode: '' },
    { sCode: '0', tCode: '0' },
    { sCode: '01', tCode: '01' },
    { sCode: '011', tCode: '011' },
    { sCode: '0112', tCode: '0112' },
    { sCode: '01123', tCode: '01123' },
    { sCode: '011234', tCode: '011234' },
    { sCode: '0112345', tCode: '0112345' },
    { sCode: '01123451', tCode: '01123452' },
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

  const offset = 100;
  const display = frameIndex === 0 ? 'none' : '';

  return (
    <>
      <svg id='svg' width={900} height={500}>
        <SvgRects x={80} y={75} height={90} width={90} n={8} offsetX={offset} style={rectStyle}></SvgRects>
        <SvgTexts x={100} y={150} text={'LEETCODE'} offsetX={offset} style={textStyle}></SvgTexts>
        <SvgTexts x={200 - offset} y={255} text={frame.sCode} offsetX={offset} style={dpStyle}></SvgTexts>
        <rect
          display={display}
          x={75 + frameIndex * offset - offset}
          y={70}
          stroke='green'
          strokeWidth={8}
          strokeDasharray='10'
          fill='none'
          width={100}
          height={100}></rect>

        <SvgRects x={80} y={275} height={90} width={90} n={8} offsetX={offset} style={rectStyle}></SvgRects>
        <SvgTexts x={100} y={350} text={'BOOKMARK'} offsetX={offset} style={textStyle}></SvgTexts>
        <SvgTexts x={200 - offset} y={455} text={frame.tCode} offsetX={offset} style={dpStyle}></SvgTexts>

        <rect
          display={display}
          x={75 + frameIndex * offset - offset}
          y={270}
          stroke='red'
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
