import { SetStateAction, useState } from 'react';
import ButtonBar from '../controls/ButtonBar';

type Frame = {
  edgeRemoved?: boolean;
  _35connected?: boolean;
  fastPointer: number;
  slowPointer: number;
};

export default function Leetcode0019() {
  const [frameIndex, setFrameIndex] = useState<number>(0);

  const frames: Frame[] = [
    { fastPointer: 0, slowPointer: -1 },
    { fastPointer: 1, slowPointer: -1 },
    { fastPointer: 2, slowPointer: -1 },
    { fastPointer: 3, slowPointer: -1 },
    { fastPointer: 3, slowPointer: 0 },
    { fastPointer: 4, slowPointer: 0 },
    { fastPointer: 4, slowPointer: 1 },
    { fastPointer: 5, slowPointer: 1 },
    { fastPointer: 5, slowPointer: 2 },
    { _35connected: true, fastPointer: 5, slowPointer: 2 },
    { edgeRemoved: true, _35connected: true, fastPointer: 5, slowPointer: 2 },
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
    stroke: '#000000',
    strokeWidth: 10,
    strokeLineCap: 'butt',
    strokeLineJoin: 'miter',
    markerEnd: 'url(#arrow-head)',
  };

  const pointerStyle = {
    paintOrder: 'fill markers stroke',
    markerEnd: 'url(#arrow-head)',
    stroke: '#000',
    strokeWidth: '15',
  };

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 50,
    fontFamily: 'Arial',
    fill: '#000000',
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
      <svg id="svg" width={1280} height={500}>
        <defs>
          <marker id="arrow-head" markerWidth="2.595" orient="auto" refX="0.3" refY="1.3">
            <path transform="scale(.25) translate(-1,-1)" d="M2,2 L2,11 L10,6 L2,2" fill="#000" />
          </marker>
        </defs>
        <g fill="none" stroke="#000">
          <g strokeWidth="12">
            <circle cx="200" cy="250" r="60" />
            <circle cx="400" cy="250" r="60" />
            <circle cx="600" cy="250" r="60" />
            <circle cx="800" cy="250" r="60" />
            <circle cx="1000" cy="250" r="60" />
          </g>
          <g style={edgeStyle}>
            <path d="m265, 250 L315, 250" />
            <path d="m465, 250 L515, 250" />
            <path id="edge34" d="m665, 250 L715 250" />
            <path id="edge45" d="m865, 250 L915 250" />
            <path
              opacity={frame._35connected ? 1 : 0}
              id="edge35"
              d="m600 310.1c-1.0101 36.701-2.0202 73.402 68.708 94.161 70.728 20.759 213.18 25.579 284.15 6.9497 70.965-20 40-50 44-77"
            />
          </g>
        </g>
        <g fill="none" style={crossStyle} opacity={frame.edgeRemoved ? 1 : 0}>
          <g transform="translate(249.99 -249.99)" stroke="#ab0000">
            <path d="m420, 470 L460, 530" strokeWidth="10" />
            <path d="m420, 530 L460, 470" strokeWidth="10" />
          </g>
          <g transform="translate(249.99 -249.99)" stroke="#ab0000">
            <path d="m620, 470 L660, 530" strokeWidth="10" />
            <path d="m620, 530 L660, 470" strokeWidth="10" />
          </g>
        </g>
        {/* prettier-ignore */}
        <g id="vals" style={textStyle}>
          <text x="190" y="268">1</text>
          <text x="390" y="268">b</text>
          <text x="590" y="268">3</text>
          <text x="790" y="268">4</text>
          <text x="990" y="268">5</text>
        </g>
        <path
          id="fast-pointer"
          d="M205, 95 L205, 160"
          style={pointerStyle}
          transform={`translate(${frame.fastPointer * 200}, 0)`}
        />
        <path
          id="slow-pointer"
          d="M205, 95 L205, 160"
          style={pointerStyle}
          transform={`translate(${frame.slowPointer * 200}, 0)`}
        />
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
