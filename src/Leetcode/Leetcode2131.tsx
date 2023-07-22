import { SetStateAction, useState } from 'react';

import ButtonBar from '../controls/ButtonBar';
import SvgMatrix from '../controls/SvgMatrix';
import SvgTexts from '../controls/SvgTexts';

export default function Leetcode2131() {
  const [frameIndex, setFrameIndex] = useState<number>(0);

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < 11) {
      setFrameIndex(index);
    }
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

  const alphaStyle = {
    fontSize: 60,
    fontWeight: 'bold',
  };

  const gray = 'gray';
  const red = 'red';

  const colorMatrix = [
    [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
    ],
    [
      [red, '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
    ],
    [
      [gray, '', '', ''],
      ['', red, '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
    ],
    [
      [gray, '', '', ''],
      ['', gray, '', ''],
      ['', '', red, ''],
      ['', '', '', ''],
    ],
    [
      [gray, '', '', ''],
      ['', gray, '', ''],
      ['', '', gray, ''],
      ['', '', '', red],
    ],
    [
      [gray, red, '', ''],
      [red, gray, '', ''],
      ['', '', gray, ''],
      ['', '', '', gray],
    ],
    [
      [gray, gray, red, ''],
      [gray, gray, '', ''],
      [red, '', gray, ''],
      ['', '', '', gray],
    ],
    [
      [gray, gray, gray, red],
      [gray, gray, '', ''],
      [gray, '', gray, ''],
      [red, '', '', gray],
    ],
    [
      [gray, gray, gray, gray],
      [gray, gray, red, ''],
      [gray, red, gray, ''],
      [gray, '', '', gray],
    ],
    [
      [gray, gray, gray, gray],
      [gray, gray, gray, red],
      [gray, gray, gray, ''],
      [gray, red, '', gray],
    ],
    [
      [gray, gray, gray, gray],
      [gray, gray, gray, gray],
      [gray, gray, gray, red],
      [gray, gray, red, gray],
    ],
  ];

  const has_center = [false, false, false, true, true, true, true, true, true, true, true];
  const answer = [0, 0, 4, 6, 6, 6, 10, 10, 10, 10, 10];
  return (
    <>
      <svg id='svg' width={1000} height={500}>
        <SvgMatrix
          x={175}
          y={75}
          m={4}
          n={4}
          height={100}
          width={100}
          rectStyle={rectStyle}
          textStyle={textStyle}
          textArr={['  21', ' 2  ', '1 1 ', '   1']}
          colorMatrix={colorMatrix[frameIndex]}
        />
        <SvgTexts x={200} y={50} text='ABCD' offsetX={100} style={alphaStyle} />
        <SvgTexts x={100} y={150} text='ABCD' offsetY={100} style={alphaStyle} />
        <text x={650} y={150} style={alphaStyle}>
          Has Center:
        </text>
        <text x={750} y={250} style={alphaStyle}>
          {has_center[frameIndex] ? 'True' : 'False'}
        </text>
        <text x={650} y={350} style={alphaStyle}>
          Answer: {answer[frameIndex]}
        </text>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
