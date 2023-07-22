import { SetStateAction, useEffect, useRef, useState } from 'react';

import { getChildrenFromRef, getElementById } from '../Utils/html';
import ButtonBar from '../controls/ButtonBar';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';

type Frame = {
  left: number;
  right: number;
  ans: number;
  key?: boolean;
  repeat?: number;
};

export default function Leetcode0003() {
  const [frameIndex, setFrameIndex] = useState<number>(0);

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

  const rectContainer = useRef<SVGGElement>(null);

  useEffect(() => {
    const previousFrame = frameIndex > 0 ? frames[frameIndex - 1] : null;

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
    <div className='ppt' style={{ width: 950 }}>
      <svg id='svg' width={950} height={350}>
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
        <SvgTexts
          x={50}
          y={145}
          text={'ILOVELEETCODE!'}
          offsetX={65}
          style={{
            fontSize: '48px',
            fill: 'white',
            fontFamily: 'Fixedsys',
            fontWeight: 'bold',
          }}
        />
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
          transform={`translate(${leftPointerBase + frame.left * step}, 0)`}
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
          transform={`translate(${rightPointerBase + frame.right * step}, 0)`}
          d='M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z'
        />
      </svg>
      <ButtonBar setIndex={setIndex} />
    </div>
  );
}
