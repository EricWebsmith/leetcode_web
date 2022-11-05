import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';

interface PointerProps {
  letter: string;
  id?: string;
  x: number;
  y: number;
}

function Pointer(props: PointerProps) {
  const transform = `translate(${-40 + props.x}, ${10 + props.y})`;
  let offset = 0;
  if (props.letter >= 'A' && props.letter <= 'Z') {
    offset = -5;
  }
  return (
    <g transform={transform}>
      <path d='M140 10 L140 60 L120 60 L160 100 L200 60 L180 60 L180 10 Z' />
      <text
        x={153 + offset}
        y={55}
        fill='white'
        style={{
          fontSize: 40,
          fontWeight: 'bold',
        }}>
        {props.letter}
      </text>
    </g>
  );
}

type Frame = {
  i: number;
  left: number;
  right: number;
  current?: string;
  best?: string;
};

export default function Leetcode0016() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);

  const frames: Frame[] = [
    { i: 0, left: 1, right: 4 },
    { i: 0, left: 1, right: 4, current: '13', best: '13' },
    { i: 0, left: 1, right: 3, current: '11', best: '11' },
    { i: 0, left: 2, right: 3, current: '13', best: '11' },
    { i: 1, left: 2, right: 4, current: '17', best: '11' },
    { i: 1, left: 2, right: 3, current: '15', best: '11' },
    { i: 2, left: 3, right: 4, current: '21', best: '11' },
  ];

  const frame = frames[frameIndex];
  const offset = 130;
  const iPointer = Pointer({ letter: 'i', x: offset * frame.i, y: 0 });
  const leftPointer = Pointer({ letter: 'L', x: offset * frame.left, y: 0 });
  const rightPointer = Pointer({ letter: 'R', x: offset * frame.right, y: 0 });
  let text = '37591';
  if (frameIndex > 0) {
    text = '13579';
  } else {
    text = '37591';
  }

  React.useEffect(() => {
    return;
  }, [frameIndex]);

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

  return (
    <>
      <svg id='svg' width={950} height={250}>
        <SvgRects
          x={70}
          y={120}
          n={5}
          height={100}
          width={100}
          offsetX={offset}
          style={{
            border: '3px solid red',
            borderColor: 'red',
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 6,
            height: 100,
          }}
        />
        <SvgTexts
          x={95}
          y={200}
          text={text}
          offsetX={130}
          style={{
            fontSize: 80,
            fontWeight: 'bold',
          }}
        />
        {iPointer}
        {leftPointer}
        {rightPointer}
      </svg>
      <div
        style={{
          paddingLeft: 50,
          paddingRight: 50,
          paddingBottom: 40,
          display: 'grid',
          gridAutoColumns: 'minmax(0, 1fr)',
          gridAutoFlow: 'column',
          fontSize: 40,
          fontWeight: 'bold',
        }}>
        <div>Target: {12}</div>
        <div>Current: {frame.current}</div>
        <div>Closest: {frame.best}</div>
      </div>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
