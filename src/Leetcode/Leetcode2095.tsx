import { SetStateAction, useState } from 'react';

import ButtonBar from '../controls/ButtonBar';
import NamedPointer from '../controls/NamedPointer';
import SvgCircles from '../controls/SvgCircles';
import SvgTexts from '../controls/SvgTexts';

type Frame = { connected?: boolean; fast: number; slow: number };

export default function Leetcode2095() {
  const [frameIndex, setFrameIndex] = useState<number>(0);

  const frames: Frame[] = [
    { fast: -1, slow: -1 },
    { fast: 1, slow: -1 },
    { fast: 1, slow: 0 },
    { fast: 3, slow: 0 },
    { fast: 3, slow: 1 },
    { fast: 5, slow: 1 },
    { connected: true, fast: 5, slow: 1 },
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

  const edgeStyle = {
    fill: 'none',
    stroke: 'blue',
    strokeWidth: 10,
    strokeLineCap: 'butt',
    strokeLineJoin: 'miter',
    markerEnd: 'url(#arrow-head)',
  };

  const pointerStyle = {
    paintOrder: 'fill markers stroke',
    fill: 'green',
  };

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 80,
    fontFamily: 'Arial',
    fill: '#FFFFFF',
  };

  const crossStyle = {
    fill: 'none',
    stroke: '#ab0000',
    strokeWidth: 10,
    strokeLineCap: 'butt',
    strokeLineJoin: 'bevel',
  };

  const offset = 200;
  const fastX = 85 + frame.fast * offset;
  const slowX = 85 + frame.slow * offset;

  return (
    <>
      <svg id='svg' width={1250} height={500}>
        <defs>
          <marker id='arrow-head' markerWidth='2.595' orient='auto' refX='0.3' refY='1.3'>
            <path transform='scale(.25) translate(-1,-1)' d='M2,2 L2,11 L10,6 L2,2' fill='blue' />
          </marker>
        </defs>

        <g fill='none' style={edgeStyle}>
          <g>
            <path d='m265, 250 L315, 250' />
            <path d='m465, 250 L515, 250' />
            <path d='m665, 250 L715 250' />
            <path d='m865, 250 L915 250' />
            <path
              display={frame.connected ?? false ? '' : 'none'}
              transform='translate(-200, 0)'
              id='edge35'
              d='m600 310.1c-1.0101 36.701-2.0202 73.402 68.708 94.161 70.728 20.759 213.18 25.579 284.15 6.9497 70.965-20 40-50 44-77'
            />
          </g>
        </g>
        <g fill='none' style={crossStyle} display={frame.connected ?? false ? '' : 'none'}>
          <g transform='translate(249.99 -249.99)' stroke='#ab0000'>
            <path d='m220, 470 L260, 530' strokeWidth='10' />
            <path d='m220, 530 L260, 470' strokeWidth='10' />
          </g>
        </g>
        <SvgCircles cx={200} cy={250} r={65} n={5} offsetX={offset} style={{ fill: 'blue' }}></SvgCircles>
        <SvgTexts x={180} y={275} style={textStyle} text={'12345'} offsetX={offset} />
        <NamedPointer x={slowX} y={75} letter='S' pathStyle={pointerStyle} />
        <NamedPointer x={fastX} y={75} letter='F' pathStyle={pointerStyle} />
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
