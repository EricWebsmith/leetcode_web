import React from 'react';
import Header from '../controls/Header';
import SvgMatrix from '../controls/SvgMatrix';
import { NEXT_STEP, PREVIOUS_STEP, RESET } from '../Utils/constants';
import { ILeetcodeProps } from './metadata';
type Frame = {
  r: number;
  c: number;
  dp: string[];
  newDp: string[];
};

export default function Leetcode2435(props: ILeetcodeProps) {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);

  const frames: Frame[] = [
    { r: 0, c: 0, dp: ['', '', ''], newDp: ['', '', ''] },
    { r: 0, c: 0, dp: ['0  ', '0  ', '1  '], newDp: ['', '', ''] },
    { r: 0, c: 1, dp: ['00', '01', '10'], newDp: ['', '', ''] },
    { r: 0, c: 2, dp: ['000', '010', '101'], newDp: ['', '', ''] },
    { r: 1, c: 0, dp: ['000', '010', '101'], newDp: ['0', '0', '1'] },
    { r: 1, c: 1, dp: ['000', '010', '101'], newDp: ['0', '0', '1'] },
    { r: 1, c: 1, dp: ['000', '010', '101'], newDp: ['00', '01', '11'] },
    { r: 1, c: 2, dp: ['000', '010', '101'], newDp: ['000', '011', '112'] },
    { r: 1, c: 2, dp: ['000', '010', '101'], newDp: ['001', '012', '110'] },
    { r: 2, c: 0, dp: ['001', '012', '110'], newDp: ['0', '0', '1'] },
    { r: 2, c: 1, dp: ['001', '012', '110'], newDp: ['00', '01', '12'] },
    { r: 2, c: 1, dp: ['001', '012', '110'], newDp: ['02', '00', '11'] },
    { r: 2, c: 2, dp: ['001', '012', '110'], newDp: ['023', '002', '111'] },
    { r: 2, c: 2, dp: ['001', '012', '110'], newDp: ['022', '001', '113'] },
  ];

  const frame = frames[frameIndex];
  const { r, c } = frame;

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

  const rectStyle = {
    stroke: 'black',
    strokeWidth: 6,
    fill: 'transparent',
  };

  const textStyle = {
    fontSize: 80,
    fontWeight: 'bold',
  };

  const colorMatrix = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const CURRENT_COLOR = '#88ff00';
  const PREVIOUS_ROW_COLOR = '#6666FF';
  const PREVIOUS_COLUMN_COLOR = '#FF6666';
  if (frameIndex > 0) {
    colorMatrix[r][c] = CURRENT_COLOR;
  }

  const dpColorMatrix = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const newDpColorMatrix = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  if (frameIndex > 0) {
    if (r === 0) {
      for (let i = 0; i < 3; i++) {
        dpColorMatrix[i][c] = CURRENT_COLOR;
      }
    } else if (c === 0) {
      for (let i = 0; i < 3; i++) {
        newDpColorMatrix[i][c] = CURRENT_COLOR;
      }
    } else {
      colorMatrix[r - 1][c] = PREVIOUS_ROW_COLOR;
      colorMatrix[r][c - 1] = PREVIOUS_COLUMN_COLOR;

      for (let i = 0; i < 3; i++) {
        dpColorMatrix[i][c] = PREVIOUS_ROW_COLOR;
        newDpColorMatrix[i][c - 1] = PREVIOUS_COLUMN_COLOR;
        newDpColorMatrix[i][c] = CURRENT_COLOR;
      }
    }
  }

  const title = `${props.meta?.id}. ${props.meta?.title}`;

  return (
    <div className='ppt' style={{ width: 950 }}>
      <Header title={title}></Header>
      <svg
        id='svg'
        width={1100}
        height={450}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}>
        <text x={100} y={90} style={textStyle}>
          Matrix
        </text>
        <SvgMatrix
          x={100}
          y={100}
          m={3}
          n={3}
          height={100}
          width={100}
          rectStyle={rectStyle}
          textStyle={textStyle}
          textArr={['524', '305', '072']}
          colorMatrix={colorMatrix}
        />

        <text x={430} y={90} style={textStyle}>
          Prev DP
        </text>
        <SvgMatrix
          x={430}
          y={100}
          m={3}
          n={3}
          height={100}
          width={100}
          rectStyle={rectStyle}
          textStyle={textStyle}
          textArr={frame.dp}
          colorMatrix={dpColorMatrix}
        />

        <text x={760} y={90} style={textStyle}>
          DP
        </text>
        <SvgMatrix
          x={760}
          y={100}
          m={3}
          n={3}
          height={100}
          width={100}
          rectStyle={rectStyle}
          textStyle={textStyle}
          textArr={frame.newDp}
          colorMatrix={newDpColorMatrix}
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
