import React from 'react';
import SvgRects from '../controls/SvgRects';
import logo from '../logo.png';
import { NEXT_STEP, PREVIOUS_STEP, RESET } from '../Utils/constants';
import { getChildrenFromRef, getElementById } from '../Utils/html';

type Frame = {
  left: number;
  right: number;
  ans: number;
  key?: boolean;
  repeat?: number;
};

export default function Leetcode0003() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);

  const frames: Frame[] = [
    { left: 0, right: 0, ans: 1 },
    { left: 0, right: 1, ans: 1 },
    { left: 0, right: 2, ans: 1 },
    { left: 0, right: 3, ans: 1 },
    { left: 0, right: 4, ans: 1 },
    { left: 0, right: 5, ans: 5, key: true, repeat: 1 },
    { left: 2, right: 5, ans: 5, key: true, repeat: 1 },
    { left: 2, right: 6, ans: 5, key: true, repeat: 4 },
    { left: 5, right: 6, ans: 5, key: true, repeat: 4 },
    { left: 5, right: 7, ans: 5, key: true, repeat: 6 },
    { left: 7, right: 7, ans: 5, key: true, repeat: 6 },
    { left: 7, right: 8, ans: 5 },
    { left: 7, right: 9, ans: 5 },
    { left: 7, right: 10, ans: 5 },
    { left: 7, right: 11, ans: 5 },
    { left: 7, right: 12, ans: 5, key: true, repeat: 7 },
    { left: 8, right: 12, ans: 5 },
    { left: 8, right: 13, ans: 6 },
  ];

  const step = 65;
  const leftPointerBase = -110;
  const rightPointerBase = -80;
  const frame = frames[frameIndex];

  const rectContainer = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    const previousFrame = frameIndex > 0 ? frames[frameIndex - 1] : null;
    const leftPointer = getElementById('leftPointer');
    leftPointer.setAttribute('transform', `translate(${leftPointerBase + frame.left * step}, 0)`);

    const rightPointer = getElementById('rightPointer');
    rightPointer.setAttribute(
      'transform',
      `translate(${rightPointerBase + frame.right * step}, 0)`
    );

    const leftPointerShadow = getElementById('leftPointerShadow');
    leftPointerShadow.setAttribute('display', 'none');
    if (previousFrame) {
      leftPointerShadow.setAttribute(
        'transform',
        `translate(${leftPointerBase + previousFrame.left * step}, 0)`
      );
      if (previousFrame.left !== frame.left) {
        leftPointerShadow.setAttribute('display', 'block');
      }
    }

    const rects: SVGRectElement[] = getChildrenFromRef<SVGRectElement>(rectContainer);

    for (const rect of rects) {
      rect.setAttribute('fill', 'blue');
    }

    if (frame.key) {
      if (frame.repeat != undefined) {
        rects[frame.repeat].setAttribute('fill', 'red');
      }
      rects[frame.right].setAttribute('fill', 'red');
    }
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
      <header>
        <img className='logo' src={logo} alt='logo' />
        <h1>3. Longest Substring Without Repeating Characters</h1>
      </header>
      <svg
        id='svg'
        width={950}
        height={350}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}>
        <SvgRects
          x={35}
          y={100}
          n={14}
          offsetX={65}
          height={60}
          width={60}
          style={{ fill: 'blue' }}
          ref={rectContainer}
        />
        <g
          id='chars'
          style={{
            fontSize: '48px',
            fill: 'white',
            fontFamily: 'Arial Black',
          }}>
          <text x='57' y='145'>
            I
          </text>
          <text x='115' y='145'>
            L
          </text>
          <text x='175' y='145'>
            O
          </text>
          <text x='240' y='145'>
            V
          </text>
          <text x='305' y='145'>
            E
          </text>
          <text x='375' y='145'>
            L
          </text>
          <text x='435' y='145'>
            E
          </text>
          <text x='500' y='145'>
            E
          </text>
          <text x='570' y='145'>
            T
          </text>
          <text x='630' y='145'>
            C
          </text>
          <text x='695' y='145'>
            O
          </text>
          <text x='760' y='145'>
            D
          </text>
          <text x='825' y='145'>
            E
          </text>
          <text x='900' y='145'>
            !
          </text>
        </g>
        <g
          id='index'
          transform='translate(0, 50)'
          style={{
            fontSize: '32px',
            fontFamily: 'Arial Black',
          }}>
          <text x='57' y='145'>
            0
          </text>
          <text x='115' y='145'>
            1
          </text>
          <text x='178' y='145'>
            2
          </text>
          <text x='240' y='145'>
            3
          </text>
          <text x='312' y='145'>
            4
          </text>
          <text x='375' y='145'>
            5
          </text>
          <text x='438' y='145'>
            6
          </text>
          <text x='505' y='145'>
            7
          </text>
          <text x='575' y='145'>
            8
          </text>
          <text x='635' y='145'>
            9
          </text>
          <text x='692' y='145'>
            10
          </text>
          <text x='760' y='145'>
            11
          </text>
          <text x='825' y='145'>
            12
          </text>
          <text x='885' y='145'>
            13
          </text>
        </g>

        <text
          x='50'
          y='270'
          style={{
            fontSize: '32px',
            fontFamily: 'Arial Black',
          }}>
          Current Answer:
        </text>
        <text
          id='ans'
          x='360'
          y='270'
          style={{
            fontSize: '48px',
            fontFamily: 'Arial Black',
          }}>
          {frame.ans}
        </text>

        <path
          id='leftPointer'
          transform='translate(-110, 0)'
          d='M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z'
        />
        <path
          id='leftPointerShadow'
          fill='transparent'
          strokeDasharray='3,3'
          stroke='black'
          strokeWidth='3'
          transform='translate(-110, 0)'
          d='M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z'
        />
        <path
          id='rightPointer'
          transform='translate(-80, 0)'
          d='M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z'
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
