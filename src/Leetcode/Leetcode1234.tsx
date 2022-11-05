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
  left: number;
  right: number;
  counter: string;
  best: string;
  valid: boolean;
};

export default function Leetcode1234() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);

  const frames: Frame[] = [
    { left: -1, right: -1, counter: '4211', valid: false, best: '8' },
    { left: 0, right: 0, counter: '3211', valid: false, best: '8' },
    { left: 0, right: 1, counter: '3111', valid: false, best: '8' },
    { left: 0, right: 2, counter: '3101', valid: false, best: '8' },
    { left: 0, right: 3, counter: '2101', valid: true, best: '4' },
    { left: 1, right: 3, counter: '3101', valid: false, best: '4' },
    { left: 1, right: 4, counter: '3001', valid: false, best: '4' },
    { left: 1, right: 5, counter: '2001', valid: true, best: '4' },
    { left: 2, right: 5, counter: '2101', valid: true, best: '4' },
    { left: 3, right: 5, counter: '2111', valid: true, best: '3' },
    { left: 4, right: 5, counter: '3111', valid: false, best: '3' },
    { left: 4, right: 6, counter: '3110', valid: false, best: '3' },
    { left: 4, right: 7, counter: '2110', valid: true, best: '3' },
    { left: 5, right: 7, counter: '2210', valid: true, best: '3' },
    { left: 6, right: 7, counter: '3210', valid: false, best: '3' },
    { left: 7, right: 7, counter: '3211', valid: false, best: '3' },
  ];

  const frame = frames[frameIndex];
  const offset = 120;

  const leftPointer = Pointer({ letter: 'L', x: offset * frame.left - 35, y: 0 });
  const rightPointer = Pointer({ letter: 'R', x: offset * frame.right + 35, y: 0 });

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

  const rectStyle = {
    border: '3px solid red',
    borderColor: 'red',
    fill: 'blue',
    height: 100,
  };
  const counterRectStyle = {
    ...rectStyle,
    fill: frame.valid ? 'green' : 'red',
  };

  return (
    <>
      <svg id='svg' width={1100} height={550}>
        <SvgRects x={70} y={120} n={8} height={100} width={100} offsetX={offset} style={rectStyle} />
        <SvgTexts
          x={95}
          y={200}
          text='ABCABADA'
          offsetX={offset}
          style={{
            fill: 'white',
            fontSize: 80,
            fontWeight: 'bold',
          }}
        />
        <SvgTexts
          x={495}
          y={280}
          text='ABCD'
          offsetX={offset}
          style={{
            fontSize: 60,
            fontWeight: 'bold',
          }}
        />
        <text
          x={95}
          y={370}
          style={{
            fontSize: 80,
            fontWeight: 'bold',
          }}>
          Counter:
        </text>
        <SvgRects x={470} y={290} n={4} height={100} width={100} offsetX={offset} style={counterRectStyle} />
        <SvgTexts
          x={495}
          y={370}
          text={frame.counter}
          offsetX={offset}
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            fill: 'white',
          }}
        />
        <text
          x={235}
          y={500}
          style={{
            fontSize: 80,
            fontWeight: 'bold',
          }}>
          Best:
        </text>
        <text
          x={450}
          y={500}
          style={{
            fontSize: 96,
            fontWeight: 'bold',
          }}>
          {frame.best}
        </text>
        {leftPointer}
        {rightPointer}
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
