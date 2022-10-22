import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgTexts from '../controls/SvgTexts';
import { getChildrenFromRef, getElementById } from '../Utils/html';

type Frame = {
  left: number;
  right: number;
  ans: string;
  need: string;
  isSubset?: boolean;
};

export default function Leetcode0076() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);

  const frames: Frame[] = [
    { left: 1000, right: -1, need: ' 1 1 1', ans: '""' },
    { left: 0, right: 0, need: ' 0 1 1', ans: '""' },
    { left: 0, right: 1, need: ' 0 1 1', ans: '""' },
    { left: 0, right: 2, need: ' 0 1 1', ans: '""' },
    { left: 0, right: 3, need: ' 0 0 1', ans: '""' },
    { left: 0, right: 4, need: ' 0 0 1', ans: '""' },
    { left: 0, right: 5, need: ' 0 0 0', isSubset: true, ans: 'ADOBEC' },
    { left: 1, right: 5, need: ' 1 0 0', ans: 'ADOBEC' },
    { left: 1, right: 6, need: ' 1 0 0', ans: 'ADOBEC' },
    { left: 1, right: 7, need: ' 1 0 0', ans: 'ADOBEC' },
    { left: 1, right: 8, need: ' 1 0 0', ans: 'ADOBEC' },
    { left: 1, right: 9, need: ' 1-1 0', ans: 'ADOBEC' },
    { left: 1, right: 10, need: ' 0-1 0', isSubset: true, ans: 'ADOBEC' },
    { left: 2, right: 10, need: ' 0-1 0', isSubset: true, ans: 'ADOBEC' },
    { left: 3, right: 10, need: ' 0-1 0', isSubset: true, ans: 'ADOBEC' },
    { left: 4, right: 10, need: ' 0 0 0', isSubset: true, ans: 'ADOBEC' },
    { left: 5, right: 10, need: ' 0 0 0', isSubset: true, ans: 'ADOBEC' },
    { left: 6, right: 10, need: ' 0 0 1', ans: 'ADOBEC' },
    { left: 6, right: 11, need: ' 0 0 1', ans: 'ADOBEC' },
    { left: 6, right: 12, need: ' 0 0 0', isSubset: true, ans: 'ADOBEC' },
    { left: 7, right: 12, need: ' 0 0 0', isSubset: true, ans: 'ADOBEC' },
    { left: 8, right: 12, need: ' 0 0 0', isSubset: true, ans: 'EBANC' },
    { left: 9, right: 12, need: ' 0 0 0', isSubset: true, ans: 'BANC' },
    { left: 10, right: 12, need: ' 0 1 0', ans: 'BANC' },
    { left: 11, right: 12, need: ' 1 0 0', ans: 'BANC' },
    { left: 12, right: 12, need: ' 0 0 0', ans: 'BANC' },
  ];

  const step = 65;
  const leftPointerBase = -110;
  const rightPointerBase = -80;
  const frame = frames[frameIndex];

  const rectContainer = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    const previousFrame = frameIndex > 0 ? frames[frameIndex - 1] : null;
    // moving pointers
    const leftPointer = getElementById('leftPointer');
    leftPointer.setAttribute('transform', `translate(${leftPointerBase + frame.left * step}, 0)`);

    const rightPointer = getElementById('rightPointer');
    rightPointer.setAttribute('transform', `translate(${rightPointerBase + frame.right * step}, 0)`);

    const leftPointerShadow = getElementById('leftPointerShadow');

    leftPointerShadow.setAttribute('display', 'none');
    leftPointerShadow.setAttribute('transform', 'translate(-110, 0)');
    if (previousFrame) {
      leftPointerShadow.setAttribute(
        'transform',
        `translate(${leftPointerBase + previousFrame.left * step}, 0)`
      );
      if (previousFrame.left !== frame.left) {
        leftPointerShadow.setAttribute('display', 'block');
      }
    }

    // color rectangles
    const rects: Element[] = getChildrenFromRef(rectContainer);

    for (const rect of rects) {
      rect.setAttribute('fill', 'blue');
    }

    if (frame.isSubset) {
      for (let i = frame.left; i <= frame.right; i++) {
        rects[i].setAttribute('fill', 'green');
      }
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

  const titleStyle = {
    fontSize: '40px',
    fontFamily: 'Arial Black',
  };

  const textStyle = {
    fontSize: '48px',
    fill: 'white',
    fontFamily: 'Arial Black',
  };

  return (
    <>
      <svg
        id='svg'
        width={950}
        height={400}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}>
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
        <g
          id='rectContainer'
          ref={rectContainer}
          style={{
            border: '3px solid red',
            borderColor: 'red',
            fill: 'blue',
          }}>
          <rect x={35} y={100} height='60' width='60'></rect>
          <rect x={100} y={100} height='60' width='60'></rect>
          <rect x={165} y={100} height='60' width='60'></rect>
          <rect x={230} y={100} height='60' width='60'></rect>
          <rect x={295} y={100} height='60' width='60'></rect>
          <rect x={360} y={100} height='60' width='60'></rect>
          <rect x={425} y={100} height='60' width='60'></rect>
          <rect x={490} y={100} height='60' width='60'></rect>
          <rect x={555} y={100} height='60' width='60'></rect>
          <rect x={620} y={100} height='60' width='60'></rect>
          <rect x={685} y={100} height='60' width='60'></rect>
          <rect x={750} y={100} height='60' width='60'></rect>
          <rect x={815} y={100} height='60' width='60'></rect>
        </g>
        <SvgTexts x={45} y={145} offsetX={65} text={'ADOBECODEBANC'} style={textStyle}></SvgTexts>
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
        </g>
        <g>
          <text x='120' y='260' fill='black' style={titleStyle}>
            NEED
          </text>
          <g
            id='tbagIndex'
            style={{
              fontSize: '32px',
              fontFamily: 'Arial Black',
            }}>
            <text x='65' y='300'>
              A
            </text>
            <text x='145' y='300'>
              B
            </text>
            <text x='225' y='300'>
              C
            </text>
          </g>
          <g
            id='moving-bag-rects'
            style={{
              fill: 'blue',
            }}>
            <rect x={40} y={310} height='70' width='70'></rect>
            <rect x={120} y={310} height='70' width='70'></rect>
            <rect x={200} y={310} height='70' width='70'></rect>
            <rect x={280} y={310} height='70' width='70'></rect>
          </g>
          <SvgTexts
            x={55}
            y={365}
            offsetX={80}
            text={frame.need}
            step={2}
            spaceOffset={0}
            style={{ fontSize: '60px', fill: 'white', fontFamily: 'Arial Black' }}></SvgTexts>
          <text x='285' y='365' style={{ fontSize: '60px', fill: 'white', fontFamily: 'Arial Black' }}>
            ...
          </text>
        </g>

        <g id='moving-bag' transform='translate(410,0)'>
          <text x='60' y='260' fill='black' style={titleStyle}>
            Current Answer
          </text>
          <g
            id='tbagIndex'
            style={{
              fontSize: '32px',
              fontFamily: 'Arial Black',
            }}>
            <text
              id='ans'
              x='65'
              y='350'
              style={{
                fontSize: '48px',
                fontFamily: 'Arial Black',
              }}>
              {frame.ans}
            </text>
          </g>
        </g>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
