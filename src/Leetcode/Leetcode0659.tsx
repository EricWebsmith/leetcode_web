import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import { SHOW_LESS, SHOW_MORE } from '../Utils/constants';
import * as html from '../Utils/html';

type Group = {
  indices: number[];
  color: string;
};

type Frame = {
  pointer: number;
  message: string;
  message2?: string;
  groups: Group[];
  counter: number[];
  ends: (number | null)[];
};

export default function Leetcode0659() {
  const [frameIndex, setFrameIndex] = React.useState(0);
  const [advanced, setAdvanced] = React.useState(false);
  const groupColors = ['lightblue', 'yellow'];
  const frames: Frame[] = [
    {
      pointer: -2,
      message: 'Click the next button to get started.',
      message2: '',
      groups: [],
      counter: [1, 1, 2, 2, 2],
      ends: [null, null, null],
    },
    {
      pointer: 0,
      message: 'The first element 1 has no sequence to follow. So it starts one.',
      groups: [{ indices: [0, 1, 3], color: groupColors[0] }],
      counter: [0, 0, 1, 2, 2],
      ends: [1, null, null],
    },
    {
      pointer: 1,
      message: 'This one is already taken.',
      groups: [{ indices: [0, 1, 3], color: groupColors[0] }],
      counter: [0, 0, 1, 2, 2],
      ends: [1, null, null],
    },
    {
      pointer: 2,
      message: 'This one has no sequence to follow. So she starts a sequence.',
      groups: [
        { indices: [0, 1, 3], color: groupColors[0] },
        { indices: [2, 5, 7], color: groupColors[1] },
      ],
      counter: [0, 0, 0, 1, 1],
      ends: [1, null, 1],
    },
    {
      pointer: 3,
      message: 'This one is already taken.',
      groups: [
        { indices: [0, 1, 3], color: groupColors[0] },
        { indices: [2, 5, 7], color: groupColors[1] },
      ],
      counter: [0, 0, 0, 1, 1],
      ends: [1, null, 1],
    },
    {
      pointer: 4,
      message: 'He joins green.',
      groups: [
        { indices: [0, 1, 3, 4], color: groupColors[0] },
        { indices: [2, 5, 7], color: groupColors[1] },
      ],
      counter: [0, 0, 0, 0, 1],
      ends: [null, 1, 1],
    },
    {
      pointer: 5,
      message: 'This one is already taken.',
      groups: [
        { indices: [0, 1, 3, 4], color: groupColors[0] },
        { indices: [2, 5, 7], color: groupColors[1] },
      ],
      counter: [0, 0, 0, 0, 1],
      ends: [null, 1, 1],
    },
    {
      pointer: 6,
      message: 'This one joins the green sequence.',
      groups: [
        { indices: [0, 1, 3, 4, 6], color: groupColors[0] },
        { indices: [2, 5, 7], color: groupColors[1] },
      ],
      counter: [0, 0, 0, 0, 0],
      ends: [null, null, 2],
    },
    {
      pointer: 7,
      message: 'This one is already taken.',
      groups: [
        { indices: [0, 1, 3, 4, 6], color: groupColors[0] },
        { indices: [2, 5, 7], color: groupColors[1] },
      ],
      counter: [0, 0, 0, 0, 0],
      ends: [null, null, 2],
    },
  ];

  const pointerBase = [-45, -5];

  const frame = frames[frameIndex];
  React.useEffect(() => {
    const pointer = html.getElementById('pointer');
    pointer.setAttribute(
      'transform',
      `translate(${pointerBase[0] + 100 * frame.pointer}, ${pointerBase[1]})`
    );

    const rectContainer = html.getElementById('rectContainer');
    const rects = html.getChildren<SVGRectElement>(rectContainer);
    for (const rect of rects) {
      rect.setAttribute('fill', 'transparent');
    }

    for (const group of frame.groups) {
      for (const i of group.indices) {
        rects[i].setAttribute('fill', group.color);
      }
    }
  }, [frameIndex, advanced]);

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

  function handleAdvancedClick() {
    const svg = html.getElementById('svg');
    const btn = html.getElementById('showAdvancedBtn');
    if (!advanced) {
      svg.setAttribute('height', '440');
      btn.innerText = SHOW_LESS;
    } else {
      svg.setAttribute('height', '250');
      btn.innerText = SHOW_MORE;
    }

    setAdvanced(!advanced);
  }

  return (
    <>
      <svg
        id='svg'
        width={950}
        height={250}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}>
        <path
          id='pointer'
          transform='translate(-45, -5)'
          d='M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z'
        />
        <g
          id='rectContainer'
          style={{
            border: '3px solid red',
            borderColor: 'red',
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 6,
            height: 100,
          }}>
          <rect x={70} y={100} height='90' width='90'></rect>
          <rect x={170} y={100} height='90' width='90'></rect>
          <rect x={270} y={100} height='90' width='90'></rect>
          <rect x={370} y={100} height='90' width='90'></rect>
          <rect x={470} y={100} height='90' width='90'></rect>
          <rect x={570} y={100} height='90' width='90'></rect>
          <rect x={670} y={100} height='90' width='90'></rect>
          <rect x={770} y={100} height='90' width='90'></rect>
        </g>
        <g
          id='chars'
          style={{
            fontSize: '72px',
            fill: 'black',
            fontFamily: 'Arial Black',
          }}>
          <text x='90' y='170'>
            1
          </text>
          <text x='190' y='170'>
            2
          </text>
          <text x='290' y='170'>
            3
          </text>
          <text x='390' y='170'>
            3
          </text>
          <text x='490' y='170'>
            4
          </text>
          <text x='590' y='170'>
            4
          </text>
          <text x='690' y='170'>
            5
          </text>
          <text x='790' y='170'>
            5
          </text>
        </g>
        <g
          id='index'
          transform='translate(35, 80)'
          style={{
            fontSize: '32px',
            fontFamily: 'Arial Black',
          }}>
          <text x='70' y='145'>
            0
          </text>
          <text x='170' y='145'>
            1
          </text>
          <text x='270' y='145'>
            2
          </text>
          <text x='370' y='145'>
            3
          </text>
          <text x='470' y='145'>
            4
          </text>
          <text x='570' y='145'>
            5
          </text>
          <text x='670' y='145'>
            6
          </text>
          <text x='770' y='145'>
            7
          </text>
        </g>
        <g
          id='counter'
          transform='translate(0, 170)'
          style={{
            fontSize: '32px',
            fontFamily: 'Arial Black',
          }}>
          <text x='70' y='110'>
            Counter
          </text>
          <g id='counterIndices'>
            <text x='100' y='145'>
              1
            </text>
            <text x='190' y='145'>
              2
            </text>
            <text x='280' y='145'>
              3
            </text>
            <text x='370' y='145'>
              4
            </text>
            <text x='460' y='145'>
              5
            </text>
          </g>
          <g
            id='counterValues'
            style={{
              fontSize: 60,
            }}>
            <text x='90' y='217'>
              {frame.counter[0]}
            </text>
            <text x='180' y='217'>
              {frame.counter[1]}
            </text>
            <text x='270' y='217'>
              {frame.counter[2]}
            </text>
            <text x='360' y='217'>
              {frame.counter[3]}
            </text>
            <text x='450' y='217'>
              {frame.counter[4]}
            </text>
          </g>
          <g
            id='counterRects'
            style={{
              fill: 'transparent',
              stroke: 'black',
              strokeWidth: 5,
            }}>
            <rect x={70} y={155} height='80' width='80' />
            <rect x={160} y={155} height='80' width='80' />
            <rect x={250} y={155} height='80' width='80' />
            <rect x={340} y={155} height='80' width='80' />
            <rect x={430} y={155} height='80' width='80' />
          </g>
        </g>

        <g
          id='ends'
          transform='translate(520, 170)'
          style={{
            fontSize: '32px',
            fontFamily: 'Arial Black',
          }}>
          <text x='70' y='115'>
            Ends
          </text>
          <text x='100' y='145'>
            3
          </text>
          <text x='190' y='145'>
            4
          </text>
          <text x='280' y='145'>
            5
          </text>
          <g
            id='counterRects'
            style={{
              fill: 'transparent',
              stroke: 'black',
              strokeWidth: 5,
            }}>
            <rect x={70} y={155} height='80' width='80' />
            <rect x={160} y={155} height='80' width='80' />
            <rect x={250} y={155} height='80' width='80' />
          </g>
          <g
            id='counterValues'
            style={{
              fontSize: 60,
            }}>
            <text x='90' y='217'>
              {frame.ends[0]}
            </text>
            <text x='180' y='217'>
              {frame.ends[1]}
            </text>
            <text x='270' y='217'>
              {frame.ends[2]}
            </text>
          </g>
        </g>
      </svg>
      <div style={{ textAlign: 'center' }}>
        <div className='more-button' onClick={handleAdvancedClick} id='showAdvancedBtn'>
          {SHOW_MORE}
        </div>
      </div>

      <div
        id='message'
        style={{
          marginLeft: 50,
          fontSize: 48,
          height: 100,
        }}>
        {frame.message}
      </div>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
