import { SetStateAction, useEffect, useRef, useState } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgTexts from '../controls/SvgTexts';

type Frame = {
  edgeRemoved?: boolean;
  _35connected?: boolean;
  text: string;
};

export default function Leetcode0237() {
  const [frameIndex, setFrameIndex] = useState<number>(0);

  const crosses = useRef<SVGGElement>(null);
  const edge59 = useRef<SVGPathElement>(null);

  const frames: Frame[] = [
    { text: '4519' },
    { text: '4119' },
    { edgeRemoved: true, _35connected: true, text: '4119' },
  ];

  const frame = frames[frameIndex];

  useEffect(() => {
    if (crosses.current == null || edge59.current == null) {
      return;
    }

    if (frame.edgeRemoved) {
      crosses.current.setAttribute('opacity', '1');
    } else {
      crosses.current.setAttribute('opacity', '0');
    }

    if (frame._35connected) {
      edge59.current.setAttribute('opacity', '1');
    } else {
      edge59.current.setAttribute('opacity', '0');
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

  const edgeStyle = {
    fill: 'none',
    stroke: 'blue',
    strokeWidth: 10,
    strokeLineCap: 'butt',
    strokeLineJoin: 'miter',
    markerEnd: 'url(#arrow-head)',
  };

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 80,
    fontFamily: 'Arial',
    fill: '#FFFFFF',
    strokeWidth: 0.5,
  };

  const crossStyle = {
    fill: 'none',
    stroke: '#ab0000',
    strokeWidth: 10,
    strokeLineCap: 'butt',
    strokeLineJoin: 'bevel',
  };

  return (
    <>
      <svg id='svg' width={900} height={400}>
        <defs>
          <marker id='arrow-head' markerWidth='2.595' orient='auto' refX='0.3' refY='1.3'>
            <path transform='scale(.25) translate(-1,-1)' d='M2,2 L2,11 L10,6 L2,2' fill='blue' />
          </marker>
        </defs>
        <g fill='blue' transform='translate(0, -100)'>
          <g>
            <circle cx='200' cy='250' r='65' />
            <circle cx='400' cy='250' r='65' fill='purple' />
            <circle cx='600' cy='250' r='65' />
            <circle cx='800' cy='250' r='65' />
          </g>
          <g style={edgeStyle}>
            <path d='m265, 250 L315, 250' />
            <path d='m465, 250 L515, 250' />
            <path id='edge34' d='m665, 250 L715 250' />
            <path
              ref={edge59}
              transform='translate(-200, 0)'
              d='m600 310.1c-1.0101 36.701-2.0202 73.402 68.708 94.161 70.728 20.759 213.18 25.579 284.15 6.9497 70.965-20 40-50 44-77'
            />
          </g>
        </g>
        <g ref={crosses} fill='none' transform='translate(0, -100)' style={crossStyle}>
          <g transform='translate(49.99 -249.99)' stroke='#ab0000'>
            <path d='m420, 470 L460, 530' strokeWidth='10' />
            <path d='m420, 530 L460, 470' strokeWidth='10' />
          </g>
        </g>
        <SvgTexts x={180} y={175} text={frame.text} offsetX={200} style={textStyle}></SvgTexts>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
