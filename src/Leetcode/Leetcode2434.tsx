import React from 'react';
import Header from '../controls/Header';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';
import { NEXT_STEP, PREVIOUS_STEP, RESET } from '../Utils/constants';

type Frame = {
  s: string;
  t: string;
  ans: string;
};

export default function Leetcode0016() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);

  const frames: Frame[] = [
    { s: 'adbecf', t: '', ans: '' },
    { s: 'dbecf', t: '', ans: 'a' },
    { s: 'becf', t: 'd', ans: 'a' },
    { s: 'ecf', t: 'd', ans: 'ab' },
    { s: 'cf', t: 'de', ans: 'ab' },
    { s: 'f', t: 'de', ans: 'abc' },
    { s: 'f', t: 'd', ans: 'abce' },
    { s: 'f', t: '', ans: 'abced' },
    { s: '', t: '', ans: 'abcedf' },
  ];

  const frame = frames[frameIndex];
  const s = frame.s || '';
  const ans = frame.ans || '';

  const offset = 130;
  const arrX = 270;

  React.useEffect(() => {
    return;
  }, [frameIndex]);

  function handlePreviousClick() {
    if (frameIndex > 0) {
      setFrameIndex(frameIndex - 1);
    }
  }

  function handleNextClick() {
    if (frameIndex + 1 < frames.length) {
      setFrameIndex(frameIndex + 1);
    }
  }

  function handleResetClick() {
    setFrameIndex(0);
  }

  return (
    <div className='ppt' style={{ width: 950 }}>
      <Header title='2434. Using a Robot to Print the Lexicographically Smallest String'></Header>
      <svg
        id='svg'
        width={1100}
        height={450}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}>
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
          height={100}
          width={100}
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
          height={100}
          width={100}
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
          height={100}
          width={100}
          offsetX={offset}
          style={{
            fontSize: 80,
            fontWeight: 'bold',
          }}
        />
      </svg>
      <div className='btnbar'>
        <button className='btn' onClick={handleResetClick}>
          {RESET}
        </button>
        <button className='btn' onClick={handlePreviousClick}>
          {PREVIOUS_STEP}
        </button>
        <button className='btn' onClick={handleNextClick}>
          {NEXT_STEP}
        </button>
      </div>
    </div>
  );
}
