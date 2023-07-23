import { SetStateAction, useEffect, useRef, useState } from 'react';

import { getChildren, getChildrenFromRef, getElementById } from '../Utils/html';
import ButtonBar from '../controls/ButtonBar';

type Frame = {
  current: number;
  dp: (number | null)[];
};

export default function Leetcode0322() {
  const [frameIndex, setFrameIndex] = useState<number>(0);

  const frames: Frame[] = [
    { current: 0, dp: [0, null, null, null, null, null, null, null, null, null, null, null] },
    { current: 1, dp: [0, 1, 1, null, null, 1, null, null, null, null, null, null] },
    { current: 2, dp: [0, 1, 1, 2, null, 1, 2, null, null, null, null, null] },
    { current: 2, dp: [0, 1, 1, 2, 2, 1, 2, 2, null, null, null, null] },
    { current: 3, dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, null, null, null] },
    { current: 3, dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, null, null] },
    { current: 2, dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, null] },
    { current: 3, dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3] },
    { current: 3, dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3, null] },
    { current: 4, dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3, null, null] },
    { current: 4, dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3, null, null, null] },
    { current: 3, dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3, null, null, null, null] },
  ];

  const frame = frames[frameIndex];

  const rectContainer = useRef<SVGGElement>(null);

  useEffect(() => {
    const coins = getElementById('coins');
    coins.setAttribute('transform', `translate(${65 * frameIndex - 65}, 0)`);
    if (frameIndex > 0) {
      coins.removeAttribute('display');
    } else {
      coins.setAttribute('display', 'none');
    }

    const dpControl = getElementById('dp');
    const dpNumbers = getChildren(dpControl);
    const dp = frames[frameIndex].dp;
    //if (dp == null) {return;}
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
      <svg id="svg" width={950} height={350}>
        <g
          id="coins"
          style={{
            fontSize: '48px',
            fill: '#111',
            fontFamily: 'Arial Black',
          }}
        >
          <circle cx={130} cy={40} r="30" fill="gold"></circle>
          <circle cx={195} cy={40} r="30" fill="gold"></circle>
          <circle cx={390} cy={40} r="30" fill="gold"></circle>
          <text x="115" y="55">1</text>
          <text x="180" y="55">2</text>
          <text x="375" y="55">5</text>
          <path transform="translate(20, 45) scale(0.6)" d="M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z" />
          <path transform="translate(85, 45) scale(0.6)" d="M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z" />
          <path transform="translate(280, 45) scale(0.6)" d="M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z" />
          {/* prettier-ignore */}
          <g
            id='current'
            style={{
              fontSize: '40px',
              fill: '#111',
              fontFamily: 'Arial Black',
            }}>
            <text x='130' y='105'>1</text>
            <text x='195' y='105'>1</text>
            <text x='390' y='105'>1</text>
          </g>
        </g>
        <g
          id="dpRects"
          ref={rectContainer}
          style={{
            border: '3px solid red',
            borderColor: 'red',
            fill: 'blue',
          }}
          transform="translate(0, 10)"
        >
          <rect x={35} y={100} height="60" width="60"></rect>
          <rect x={100} y={100} height="60" width="60"></rect>
          <rect x={165} y={100} height="60" width="60"></rect>
          <rect x={230} y={100} height="60" width="60"></rect>
          <rect x={295} y={100} height="60" width="60"></rect>
          <rect x={360} y={100} height="60" width="60"></rect>
          <rect x={425} y={100} height="60" width="60"></rect>
          <rect x={490} y={100} height="60" width="60"></rect>
          <rect x={555} y={100} height="60" width="60"></rect>
          <rect x={620} y={100} height="60" width="60"></rect>
          <rect x={685} y={100} height="60" width="60"></rect>
          <rect x={750} y={100} height="60" width="60"></rect>
        </g>
        <g
          id="dp"
          transform="translate(0, 10)"
          style={{
            fontSize: '48px',
            fill: 'white',
            fontFamily: 'Arial Black',
          }}
        >
          <text x="50" y="145">
            0
          </text>
        </g>
        {/* prettier-ignore */}
        <g
          id='index'
          transform='translate(0, 55)'
          style={{
            fontSize: '32px',
            fontFamily: 'Arial Black',
          }}>
          <text x='57' y='145'>0</text>
          <text x='115' y='145'>1</text>
          <text x='178' y='145'>2</text>
          <text x='240' y='145'>3</text>
          <text x='312' y='145'>4</text>
          <text x='375' y='145'>5</text>
        </g>
        {/* prettier-ignore */}
        <g>
          <text x='438' y='145'>6</text>
          <text x='505' y='145'>7</text>
          <text x='575' y='145'>8</text>
          <text x='635' y='145'>9</text>
          <text x='692' y='145'>10</text>
          <text x='760' y='145'>11</text>
        </g>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
