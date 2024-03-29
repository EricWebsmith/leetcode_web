import { SetStateAction, useState } from 'react';
import ButtonBar from '../controls/ButtonBar';

export default function Leetcode0000() {
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
  /*
  const dp = '-2 1-2 4 3 5 6 1 5';

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
  */

  return (
    <>
      <svg id='svg' width={1100} height={300}></svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
