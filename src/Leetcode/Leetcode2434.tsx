import { SetStateAction, useEffect, useState } from 'react';

import ButtonBar from '../controls/ButtonBar';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';

type Frame = {
  s: string;
  t: string;
  ans: string;
};

export default function Leetcode2434() {
  const [frameIndex, setFrameIndex] = useState<number>(0);

  const frames: Frame[] = [
    { s: 'adbecf', t: '', ans: '' },
    { s: 'dbecf', t: 'a', ans: '' },
    { s: 'dbecf', t: '', ans: 'a' },
    { s: 'becf', t: 'd', ans: 'a' },
    { s: 'ecf', t: 'db', ans: 'a' },
    { s: 'ecf', t: 'd', ans: 'ab' },
    { s: 'cf', t: 'de', ans: 'ab' },
    { s: 'f', t: 'dec', ans: 'ab' },
    { s: 'f', t: 'de', ans: 'abc' },
    { s: 'f', t: 'd', ans: 'abce' },
    { s: 'f', t: '', ans: 'abced' },
    { s: '', t: 'f', ans: 'abced' },
    { s: '', t: '', ans: 'abcedf' },
  ];

  const frame = frames[frameIndex];
  const s = frame.s || '';
  const ans = frame.ans || '';

  const offset = 130;
  const arrX = 270;

  useEffect(() => {
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

  return (
    <>
      <svg id='svg' width={1100} height={450}>
        {/* s */}
        <text
          x={175}
          y={100}
          style={{
            fontSize: 80,
            fontWeight: 'bold',
          }}>
          S:
        </text>
        <SvgRects
          x={arrX + (6 - frame.s.length) * offset}
          y={20}
          n={frame.s.length}
          height={100}
          width={100}
          offsetX={offset}
          style={{
            border: '3px solid red',
            borderColor: 'red',
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 6,
            height: 100,
          }}
        />

        <SvgTexts
          x={arrX + 30 + (6 - frame.s.length) * offset}
          y={100}
          text={s}
          offsetX={offset}
          style={{
            fontSize: 80,
            fontWeight: 'bold',
          }}
        />
        {/* t */}
        <text
          x={175}
          y={225}
          style={{
            fontSize: 80,
            fontWeight: 'bold',
          }}>
          T:
        </text>
        <SvgRects
          x={arrX}
          y={150}
          n={frame.t.length}
          height={100}
          width={100}
          offsetX={offset}
          style={{
            border: '3px solid red',
            borderColor: 'red',
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 6,
            height: 100,
          }}
        />

        <SvgTexts
          x={arrX + 30}
          y={225}
          text={frame.t}
          offsetX={offset}
          style={{
            fontSize: 80,
            fontWeight: 'bold',
          }}
        />
        {/* Ans */}
        <SvgRects
          x={arrX}
          y={275}
          n={frame.ans.length}
          height={100}
          width={100}
          offsetX={offset}
          style={{
            border: '3px solid red',
            borderColor: 'red',
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 6,
            height: 100,
          }}
        />
        <text
          x={75}
          y={350}
          style={{
            fontSize: 80,
            fontWeight: 'bold',
          }}>
          Ans:
        </text>
        <SvgTexts
          x={arrX + 30}
          y={350}
          text={ans}
          offsetX={offset}
          style={{
            fontSize: 80,
            fontWeight: 'bold',
          }}
        />
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
