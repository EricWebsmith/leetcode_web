import { SetStateAction, useEffect, useRef, useState } from 'react';

import { getChildren, getChildrenFromRef, getElementById } from '../Utils/html';
import ButtonBar from '../controls/ButtonBar';

type Frame = {
  current: number;
  dp: (number | null)[];
};

export default function Leetcode0377() {
  const [frameIndex, setFrameIndex] = useState<number>(0);

  const frames: Frame[] = [
    { current: 0, dp: [0, null, null, null, null, null, null, null, null, null, null, null, null, null] },
    { current: 1, dp: [0, 1, 1, 1, null, null, null, null, null, null] },
    { current: 1, dp: [0, 1, 2, 2, 1, null, null, null, null, null] },
    { current: 2, dp: [0, 1, 2, 4, 3, null, null, null] },
    { current: 4, dp: [0, 1, 2, 4, 7, null, null, null] },
    { current: 6, dp: [0, 1, 2, 4, 7, null, null] },
  ];

  const frame = frames[frameIndex];
  const rectContainer = useRef<SVGGElement>(null);

  useEffect(() => {
    const coins = getElementById('coins');
    coins.setAttribute('transform', `translate(${130 * frameIndex - 130}, 0)`);
    if (frameIndex > 0) {
      coins.removeAttribute('display');
    } else {
      coins.setAttribute('display', 'none');
    }

    const dpControl = getElementById('dp');
    const dpNumbers = getChildren(dpControl);
    const dp = frames[frameIndex].dp;
    for (let i = 0; i < dpNumbers.length; i++) {
      if (dp[i] != null) {
        dpNumbers[i].innerHTML = `${dp[i]}`;
      } else {
        dpNumbers[i].innerHTML = '';
      }
    }

    // current
    const currentControl = getElementById('current');
    const currentNumbers = getChildren(currentControl);
    for (const currentNumberConol of currentNumbers) {
      currentNumberConol.innerHTML = `${frame.current}`;
    }

    const rects: Element[] = getChildrenFromRef(rectContainer);
    for (const rect of rects) {
      rect.setAttribute('fill', 'blue');
    }

    if (frameIndex > 0) {
      rects[frameIndex - 1].setAttribute('fill', 'red');
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

  return (
    <>
      <svg id='svg' width={850} height={380}>
        <g id='coins'>
          <circle cx={230} cy={70} r='60' fill='gold'></circle>
          <circle cx={360} cy={70} r='60' fill='gold'></circle>
          <circle cx={490} cy={70} r='60' fill='gold'></circle>
          <g
            style={{
              fontSize: '90px',
              fill: '#111',
              fontFamily: 'Arial Black',
            }}>
            <text x='200' y='100'>
              1
            </text>
            <text x='330' y='100'>
              2
            </text>
            <text x='460' y='100'>
              3
            </text>
          </g>

          <path
            transform='translate(40, 90) scale(1)'
            d='M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z'
          />
          <path
            transform='translate(170, 90) scale(1)'
            d='M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z'
          />
          <path
            transform='translate(300, 90) scale(1)'
            d='M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z'
          />
          <g
            id='current'
            style={{
              fontSize: '60px',
              fill: '#111',
              fontFamily: 'Arial Black',
            }}>
            <text x='240' y='185'>
              1
            </text>
            <text x='370' y='185'>
              1
            </text>
            <text x='500' y='185'>
              1
            </text>
          </g>
        </g>
        <g
          id='dpRects'
          ref={rectContainer}
          style={{
            border: '3px solid red',
            borderColor: 'red',
            fill: 'blue',
          }}
          transform='translate(0, 100)'>
          <rect x={35} y={100} height='120' width='120'></rect>
          <rect x={165} y={100} height='120' width='120'></rect>
          <rect x={295} y={100} height='120' width='120'></rect>
          <rect x={425} y={100} height='120' width='120'></rect>
          <rect x={555} y={100} height='120' width='120'></rect>
        </g>
        <g
          id='dp'
          transform='translate(10, 140)'
          style={{
            fontSize: '90px',
            fill: 'white',
            fontFamily: 'Arial Black',
          }}>
          <text x='50' y='145'>
            0
          </text>
          <text x='180' y='145'>
            0
          </text>
          <text x='310' y='145'>
            0
          </text>
          <text x='440' y='145'>
            0
          </text>
          <text x='570' y='145'>
            0
          </text>
        </g>
        <g
          id='index'
          transform='translate(20, 220)'
          style={{
            fontSize: '50px',
            fontFamily: 'Arial Black',
          }}>
          <text x='57' y='145'>
            0
          </text>
          <text x='185' y='145'>
            1
          </text>
          <text x='312' y='145'>
            2
          </text>
          <text x='438' y='145'>
            3
          </text>
          <text x='575' y='145'>
            4
          </text>
        </g>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
