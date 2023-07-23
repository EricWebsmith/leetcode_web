import { SetStateAction, useState } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgMatrix from '../controls/SvgMatrix';

type Frame = {
  path: number[][];
  r: number;
  c: number;
  cx?: number | null;
  cy?: number | null;
};

export default function Leetcode0212() {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const frames: Frame[] = [
    { path: [[0, 0]], r: 0, c: 0 },
    { path: [[0, 1]], r: 0, c: 1 },
    { path: [[0, 2]], r: 0, c: 2 },
    { path: [[0, 3]], r: 0, c: 3 },
    { path: [[1, 0]], r: 1, c: 0 },
    { path: [[1, 1]], r: 1, c: 1 },
    { path: [[1, 2]], r: 1, c: 2 },
    { path: [[1, 3]], r: 1, c: 3, cx: 850, cy: 175 },
    { path: [[1, 3]], r: 0, c: 3 },
    { path: [[1, 3]], r: 2, c: 3 },
    {
      path: [
        [1, 3],
        [1, 2],
      ],
      r: 1,
      c: 2,
      cx: 850,
      cy: 275,
    },
    {
      path: [
        [1, 3],
        [1, 2],
      ],
      r: 0,
      c: 2,
    },
    {
      path: [
        [1, 3],
        [1, 2],
        [2, 2],
      ],
      r: 2,
      c: 2,
      cx: 950,
      cy: 375,
    },
    {
      path: [
        [1, 3],
        [1, 2],
        [2, 2],
        [3, 2],
      ],
      r: 3,
      c: 2,
      cx: 950,
      cy: 475,
    },
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
    stroke: 'black',
  };

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 80,
    fontFamily: 'Arial',
    fill: '#FFFFFF',
  };

  const trieTextStyle = {
    fontWeight: 'bold',
    fontSize: 60,
    fontFamily: 'Arial',
    fill: '#FFFFFF',
  };

  const offset = 100;
  const colorMatrix = [
    ['blue', 'blue', 'blue', 'blue'],
    ['blue', 'blue', 'blue', 'blue'],
    ['blue', 'blue', 'blue', 'blue'],
    ['blue', 'blue', 'blue', 'blue'],
  ];
  for (const [r, c] of frame.path) {
    colorMatrix[r][c] = 'red';
  }

  const cx = frame.cx ?? -100;
  const cy = frame.cy ?? -100;

  return (
    <>
      <svg id="svg" width={1100} height={550}>
        <SvgMatrix
          x={50}
          y={50}
          textArr={['BEAT', 'EDOC', 'VGOV', 'IFKE']}
          height={100}
          width={100}
          m={4}
          n={4}
          rectStyle={rectStyle}
          textStyle={textStyle}
          colorMatrix={colorMatrix}
        />
        <g
          style={{
            stroke: 'blue',
            strokeWidth: 10,
          }}
        >
          <line x1={700} y1={75} x2={550} y2={175}></line>
          <line x1={700} y1={75} x2={850} y2={175}></line>
          <line x1={550} y1={175} x2={550} y2={275}></line>
          <line x1={850} y1={175} x2={850} y2={275}></line>
          <line x1={550} y1={275} x2={550} y2={375}></line>
          <line x1={850} y1={275} x2={750} y2={375}></line>
          <line x1={850} y1={275} x2={850} y2={375}></line>
          <line x1={850} y1={275} x2={950} y2={375}></line>
          <line x1={550} y1={375} x2={550} y2={475}></line>
          <line x1={750} y1={375} x2={750} y2={475}></line>
          <line x1={850} y1={375} x2={850} y2={475}></line>
          <line x1={950} y1={375} x2={950} y2={475}></line>
        </g>
        <g style={rectStyle}>
          <circle cx={700} cy={75} r={45}></circle>
          <circle cx={550} cy={175} r={45}></circle>
          <circle cx={850} cy={175} r={45}></circle>
          <circle cx={550} cy={275} r={45}></circle>
          <circle cx={850} cy={275} r={45}></circle>
          <circle cx={550} cy={375} r={45}></circle>
          <circle cx={750} cy={375} r={45}></circle>
          <circle cx={850} cy={375} r={45}></circle>
          <circle cx={950} cy={375} r={45}></circle>
          <circle cx={550} cy={475} r={45}></circle>
          <circle cx={750} cy={475} r={45}></circle>
          <circle cx={850} cy={475} r={45}></circle>
          <circle cx={950} cy={475} r={45}></circle>
        </g>
        <circle cx={cx} cy={cy} r={45} fill="red"></circle>
        {/*prettier-ignore*/}
        <g style={trieTextStyle}>
          <text x={685} y={95}>''</text>
          <text x={530} y={195}>G</text>
          <text x={830} y={195}>C</text>
          <text x={530} y={295}>O</text>
          <text x={830} y={295}>O</text>
          <text x={530} y={395}>A</text>
          <text x={730} y={395}>A</text>
          <text x={830} y={395}>D</text>
          <text x={930} y={395}>O</text>
          <text x={530} y={495}>T</text>
          <text x={730} y={495}>T</text>
          <text x={830} y={495}>E</text>
          <text x={930} y={495}>K</text>
        </g>
        <rect
          x={50 + frame.c * offset}
          y={50 + frame.r * offset}
          stroke="green"
          strokeWidth={10}
          strokeDasharray="10"
          fill="none"
          width={100}
          height={100}
        ></rect>
        <circle cx={cx} cy={cy} r={45} stroke="green" strokeWidth={10} strokeDasharray="10" fill="none"></circle>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
