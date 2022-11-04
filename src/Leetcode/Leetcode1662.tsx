import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgTexts from '../controls/SvgTexts';

export default function Leetcode1662() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const rectContainer1 = React.useRef<SVGGElement>(null);
  const rectContainer2 = React.useRef<SVGGElement>(null);

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < 5) {
      setFrameIndex(index);
    }
  }

  const rectStyle = {
    stroke: 'black',
    strokeWidth: 6,
    fill: 'black',
    height: 100,
    width: 100,
  };

  const pointerStyle = {
    stroke: 'white',
    strokeWidth: 6,
    strokeDasharray: '10',
    fill: 'transparent',
    height: 100,
    width: 100,
  };

  const textStyle = {
    fontSize: 80,
    fontWeight: 'bold',
    fill: 'white',
  };

  const pointer1Positions = [0, 100, 200, 400, 600, 800, 900];
  const pointer2Positions = [0, 100, 300, 400, 600, 700, 900];
  for (let i = 0; i < 6; i++) {
    rectContainer1.current?.children.item(i)?.removeAttribute('fill');
    rectContainer2.current?.children.item(i)?.removeAttribute('fill');
  }

  for (let i = 0; i < frameIndex; i++) {
    if (i === 3) {
      rectContainer1.current?.children.item(i)?.setAttribute('fill', 'red');
      rectContainer2.current?.children.item(i)?.setAttribute('fill', 'red');
    } else {
      rectContainer1.current?.children.item(i)?.setAttribute('fill', 'green');
      rectContainer2.current?.children.item(i)?.setAttribute('fill', 'green');
    }
  }

  return (
    <>
      <svg
        id='svg'
        width={1100}
        height={325}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}>
        {/* Word 1 */}
        <g ref={rectContainer1} style={rectStyle}>
          <rect x={50} y={50} height={100} width={100}></rect>
          <rect x={150} y={50} height={100} width={100}></rect>
          <rect x={350} y={50} height={100} width={100}></rect>
          <rect x={550} y={50} height={100} width={100}></rect>
          <rect x={750} y={50} height={100} width={100}></rect>
          <rect x={850} y={50} height={100} width={100}></rect>
        </g>

        <g ref={rectContainer2} style={rectStyle}>
          <rect x={50} y={175} height={100} width={100}></rect>
          <rect x={250} y={175} height={100} width={100}></rect>
          <rect x={350} y={175} height={100} width={100}></rect>
          <rect x={550} y={175} height={100} width={100}></rect>
          <rect x={650} y={175} height={100} width={100}></rect>
          <rect x={850} y={175} height={100} width={100}></rect>
        </g>
        <SvgTexts x={75} y={130} text={'AB C C BA'} style={textStyle} offsetX={100}></SvgTexts>
        <SvgTexts x={75} y={255} text={'A BC AB C'} style={textStyle} offsetX={100}></SvgTexts>

        <rect x={pointer1Positions[frameIndex] - 50} y={50} style={pointerStyle}></rect>
        <rect x={pointer2Positions[frameIndex] - 50} y={175} style={pointerStyle}></rect>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
