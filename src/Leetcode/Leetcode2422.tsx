import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';

type Frame = {
  left: number;
  right: number;
};

export default function Leetcode2422() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const leftPointer = React.useRef<SVGPathElement>(null);
  const rightPointer = React.useRef<SVGPathElement>(null);
  const sumContainer = React.useRef<SVGGElement>(null);

  const frames: Frame[] = [
    { left: 0, right: 6 },
    { left: 0, right: 5 },
    { left: 1, right: 4 },
    { left: 1, right: 3 },
    { left: 2, right: 2 },
  ];

  const frame = frames[frameIndex];

  React.useEffect(() => {
    if (sumContainer.current == null || leftPointer.current == null || rightPointer.current == null) {
      return;
    }

    rightPointer.current.setAttribute('transform', `translate(${frame.right * 100 - 45}, -5)`);
    leftPointer.current.setAttribute('transform', `translate(${frame.left * 100 - 45}, -5)`);

    const rects: Element[] = [];
    for (const child of sumContainer.current.children) {
      rects.push(child);
      child.setAttribute('fill', 'black');
    }

    for (let i = frame.left + 1; i < frame.right; i++) {
      rects[i].setAttribute('fill', 'none');
    }
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
      <svg id='svg' width={950} height={400}>
        <defs>
          <marker id='arrow-head' markerWidth='2.595' orient='auto' refX='0.3' refY='1.3'>
            <path transform='scale(.25) translate(-1,-1)' d='M2,2 L2,11 L10,6 L2,2' fill='#000' />
          </marker>
        </defs>
        <g
          style={{
            border: '3px solid red',
            borderColor: 'red',
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 6,
            height: 100,
          }}>
          <rect x={70} y={100} height='90' width='90'></rect>
          <rect x={170} y={100} height='90' width='90'></rect>
          <rect x={270} y={100} height='90' width='90'></rect>
          <rect x={370} y={100} height='90' width='90'></rect>
          <rect x={470} y={100} height='90' width='90'></rect>
          <rect x={570} y={100} height='90' width='90'></rect>
          <rect x={670} y={100} height='90' width='90'></rect>
        </g>
        <g
          id='chars'
          style={{
            fontSize: '72px',
            fill: 'black',
            fontFamily: 'Arial Black',
          }}>
          <text x='90' y='170'>
            4
          </text>
          <text x='190' y='170'>
            3
          </text>
          <text x='290' y='170'>
            2
          </text>
          <text x='390' y='170'>
            1
          </text>
          <text x='490' y='170'>
            2
          </text>
          <text x='590' y='170'>
            3
          </text>
          <text x='690' y='170'>
            1
          </text>
        </g>
        <g
          ref={sumContainer}
          transform='translate(15, 0)'
          style={{
            fontSize: '36px',
            fill: 'black',
            fontFamily: 'Arial Black',
          }}>
          <text x='90' y='230'>
            4
          </text>
          <text x='190' y='230'>
            7
          </text>
          <text x='290' y='230'>
            9
          </text>
          <text x='390' y='230'>
            7
          </text>
          <text x='490' y='230'>
            6
          </text>
          <text x='590' y='230'>
            4
          </text>
          <text x='690' y='230'>
            1
          </text>
        </g>
        <path
          ref={leftPointer}
          id='left-pointer'
          transform='translate(-45, -5)'
          d='M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z'
        />
        <path
          ref={rightPointer}
          id='right-pointer'
          transform='translate(555, -5)'
          d='M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z'
        />
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
