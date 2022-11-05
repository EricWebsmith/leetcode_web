import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';

export default function Leetcode2449() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const diff = '   0 2 0 2-2-2';
  const answer = [0, 0, 0, 1, 1, 2, 2, 2];

  const numsStr = frameIndex == 0 ? ' 812 6 1 2 5' : ' 1 5 2 6 812';
  const targetStr = frameIndex == 0 ? ' 21410 4 1 3' : ' 1 3 2 41014';

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

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: 80,
    fontFamily: 'Arial',
    fill: '#000000',
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
      <svg id='svg' width={1100} height={600}>
        <rect
          x={175 + frameIndex * offset}
          y={45}
          stroke='green'
          strokeWidth={10}
          strokeDasharray='10'
          fill='none'
          width={100}
          height={225}></rect>
        <text x={50} y={125} style={titleStyle}>
          Nums:
        </text>
        <SvgRects x={380} y={50} height={90} width={90} n={6} offsetX={offset} style={rectStyle}></SvgRects>
        <SvgTexts
          x={380}
          y={125}
          text={numsStr}
          offsetX={offset}
          style={textStyle}
          step={2}
          spaceOffset={20}></SvgTexts>
        <text x={50} y={250} style={titleStyle}>
          Target:
        </text>
        <SvgRects x={380} y={175} height={90} width={90} n={6} offsetX={offset} style={rectStyle}></SvgRects>
        <SvgTexts
          x={380}
          y={250}
          text={targetStr}
          offsetX={offset}
          style={textStyle}
          step={2}
          spaceOffset={20}></SvgTexts>

        <text x={50} y={375} style={titleStyle}>
          Diff:
        </text>
        <SvgTexts
          x={380 - offset}
          y={375}
          text={diff.substring(0, frameIndex * 2)}
          step={2}
          offsetX={offset}
          spaceOffset={20}
          style={dpStyle}></SvgTexts>
        <text x={50} y={500} style={titleStyle}>
          Answer: {answer[frameIndex]}
        </text>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
