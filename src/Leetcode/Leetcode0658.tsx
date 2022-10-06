import React from 'react';
import logo from '../logo.png';
import { NEXT_STEP, PREVIOUS_STEP, RESET } from '../Utils/constants';

type Frame = {
  left: number;
  right: number;
};

export default function Leetcode0658() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const leftPointer = React.useRef<SVGPathElement>(null);
  const rightPointer = React.useRef<SVGPathElement>(null);
  const rectContainer = React.useRef<SVGGElement>(null);

  const frames: Frame[] = [
    {
      left: 1,
      right: 2,
    },
    {
      left: 1,
      right: 3,
    },
    {
      left: 0,
      right: 3,
    },
    {
      left: 0,
      right: 4,
    },
    {
      left: -1,
      right: 4,
    },
  ];

  const frame = frames[frameIndex];

  React.useEffect(() => {
    if (
      rectContainer.current == null ||
      leftPointer.current == null ||
      rightPointer.current == null
    ) {
      return;
    }

    rightPointer.current.setAttribute('transform', `translate(${frame.right * 200}, 0)`);

    if (frame.left < 0) {
      leftPointer.current.setAttribute('transform', 'translate(-150, 0)');
    } else {
      leftPointer.current.setAttribute('transform', `translate(${frame.left * 200}, 0)`);
    }

    const rects: Element[] = [];
    for (const child of rectContainer.current.children) {
      rects.push(child);
      child.setAttribute('fill', 'none');
    }

    for (let i = frame.left + 1; i < frame.right; i++) {
      rects[i].setAttribute('fill', 'lightgreen');
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

  const pointerStyle = {
    paintOrder: 'fill markers stroke',
    markerEnd: 'url(#arrow-head)',
    stroke: '#000',
    strokeWidth: '15',
  };

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 80,
    fontFamily: 'Arial',
    fill: '#000000',
    strokeWidth: 0.5,
  };

  const diffStyle = {
    fontWeight: 'bold',
    fontSize: 45,
    fontFamily: 'Arial',
    fill: '#000000',
    strokeWidth: 0.5,
  };

  return (
    <div className='ppt' style={{ width: 950 }}>
      <header>
        <img className='logo' src={logo} alt='logo' />
        <h1>658. Find K Closest Elements</h1>
      </header>
      <svg
        id='svg'
        width={1100}
        height={450}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}>
        <defs>
          <marker id='arrow-head' markerWidth='2.595' orient='auto' refX='0.3' refY='1.3'>
            <path transform='scale(.25) translate(-1,-1)' d='M2,2 L2,11 L10,6 L2,2' fill='#000' />
          </marker>
        </defs>
        <g ref={rectContainer} fill='none' stroke='#000' strokeWidth='12'>
          <rect x={140} y={190} height='120' width='120' stroke='black'></rect>
          <rect x={340} y={190} height='120' width='120' stroke='black'></rect>
          <rect x={540} y={190} height='120' width='120' stroke='black'></rect>
          <rect x={740} y={190} height='120' width='120' stroke='black'></rect>
          <rect x={940} y={190} height='120' width='120' stroke='black'></rect>
        </g>
        <g style={textStyle}>
          <text x='180' y='275'>
            1
          </text>
          <text x='380' y='275'>
            2
          </text>
          <text x='580' y='275'>
            3
          </text>
          <text x='780' y='275'>
            4
          </text>
          <text x='980' y='275'>
            5
          </text>
        </g>
        <g style={diffStyle}>
          <text x='190' y='360'>
            2
          </text>
          <text x='390' y='360'>
            1
          </text>
          <text x='590' y='360'>
            0
          </text>
          <text x='790' y='360'>
            1
          </text>
          <text x='990' y='360'>
            2
          </text>
        </g>
        <path ref={leftPointer} id='fast-pointer' d='M205, 95 L205, 160' style={pointerStyle} />
        <path
          ref={rightPointer}
          id='slow-pointer'
          d='M205, 95 L205, 160'
          style={pointerStyle}
          transform='translate(-150, 0)'
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
