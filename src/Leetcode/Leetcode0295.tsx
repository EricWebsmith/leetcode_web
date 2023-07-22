import { SetStateAction, useState } from 'react';

import ButtonBar from '../controls/ButtonBar';

export default function Leetcode0295() {
  const [frameIndex, setFrameIndex] = useState<number>(0);


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
