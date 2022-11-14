import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';

export default function Leetcode0295() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const dp = '-2 1-2 4 3 5 6 1 5';

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < 10) {
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

  return (
    <>
      <svg id='svg' width={1100} height={300}>
        <text x={100} y={100}>
          to be done
        </text>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
