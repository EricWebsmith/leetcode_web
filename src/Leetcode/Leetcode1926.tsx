import { SetStateAction, useState } from 'react';

import Girl from '../SvgIcons/Girl';
import Wall from '../SvgIcons/Wall';
import ButtonBar from '../controls/ButtonBar';
import SvgMatrix from '../controls/SvgMatrix';

export default function Leetcode0934() {
  const maze = [
    ['+', '+', '.', '+'],
    ['.', '.', '.', '+'],
    ['+', '+', '+', '.'],
  ];
  const entrance = [1, 2];
  const [frameIndex, setFrameIndex] = useState<number>(0);

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < 3) {
      setFrameIndex(index);
    }
  }

  const rectStyle = {
    stroke: 'black',
    strokeWidth: 6,
    fill: 'transparent',
  };

  const textStyle = {
    fontSize: 100,
    fontWeight: 'bold',
    fill: 'blue',
    stroke: 'blue',
  };

  const offset = 150;

  const walls = [];
  const maganitude = offset / 24;
  for (let r = 0; r < maze.length; r++) {
    for (let c = 0; c < maze[0].length; c++) {
      if (maze[r][c] === '+') {
        const key = `wall_${r}_${c}`;
        walls.push(
          <Wall
            key={key}
            x={100 / maganitude + (c * offset) / maganitude}
            y={50 / maganitude + (r * offset) / maganitude}
            scale={maganitude}></Wall>
        );
      }
    }
  }

  const girlMag = (464 / offset) * 1.2;

  const distances = [];
  if (frameIndex >= 1) {
    distances.push(
      <text key='dis1' x={140 + 2 * offset} y={160}>
        1
      </text>
    );
    distances.push(
      <text key='dis2' x={140 + 1 * offset} y={160 + offset}>
        1
      </text>
    );
  }
  if (frameIndex >= 2) {
    distances.push(
      <text key='dis3' x={140} y={160 + offset}>
        2
      </text>
    );
  }

  return (
    <>
      <svg id='svg' width={900} height={500}>
        <SvgMatrix
          x={100}
          y={50}
          m={3}
          n={4}
          height={offset}
          width={offset}
          rectStyle={rectStyle}
          textStyle={textStyle}
        />
        {walls}
        <Girl
          x={girlMag * (100 + offset * entrance[1] + 0.07 * offset)}
          y={girlMag * (50 + offset * entrance[0] + 0.08 * offset)}
          scale={1 / girlMag}></Girl>
        <g style={textStyle}>{distances}</g>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
