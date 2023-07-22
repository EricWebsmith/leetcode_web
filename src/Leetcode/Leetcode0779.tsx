import { SetStateAction, useState } from 'react';

import ButtonBar from '../controls/ButtonBar';
import SvgCircles from '../controls/SvgCircles';
import SvgTexts from '../controls/SvgTexts';

export default function Leetcode0779() {
  const [frameIndex, setFrameIndex] = useState<number>(0);

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < 4) {
      setFrameIndex(index);
    }
  }

  const circleStyle = {
    fill: 'blue',
  };

  const pointerStyle = {
    fill: 'none',
    stroke: 'green',
    strokeWidth: '10',
    strokeDasharray: '10',
  };

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 75,
    fontFamily: 'Arial',
    fill: '#FFFFFF',
  };

  const dpStyle = {
    fontWeight: 'bold',
    fontSize: 60,
    fontFamily: 'Arial',
    fill: '#000000',
  };

  const offset = 100;
  const r = 40;
  const cx1 = 450;
  const cx2 = 250;
  const cx3 = 150;
  const cx4 = 100;
  const cy1 = 50;
  const cy2 = 150;
  const cy3 = 250;
  const cy4 = 350;

  const lineStyle = {
    stroke: 'blue',
    strokeWidth: '10',
  };

  const lines = [];
  let key = 0;
  let d = `M${cx1}, ${cy1} L${cx2}, ${cy2}`;
  lines.push(<path key={key++} d={d} style={lineStyle}></path>);
  d = `M${cx1}, ${cy1} L${cx2 + offset * 4}, ${cy2}`;
  lines.push(<path key={key++} d={d} style={lineStyle}></path>);
  for (let i = 0; i <= 1; i++) {
    d = `M${cx2 + i * offset * 4}, ${cy2} L${cx3 + i * offset * 4}, ${cy3}`;
    lines.push(<path key={key++} d={d} style={lineStyle}></path>);
    d = `M${cx2 + i * offset * 4}, ${cy2} L${cx3 + i * offset * 4 + offset * 2}, ${cy3}`;
    lines.push(<path key={key++} d={d} style={lineStyle}></path>);
  }

  for (let i = 0; i <= 3; i++) {
    d = `M${cx3 + i * offset * 2}, ${cy3} L${cx4 + i * offset * 2}, ${cy4}`;
    lines.push(<path key={key++} d={d} style={lineStyle}></path>);
    d = `M${cx3 + i * offset * 2}, ${cy3} L${cx4 + i * offset * 2 + offset}, ${cy4}`;
    lines.push(<path key={key++} d={d} style={lineStyle}></path>);
  }

  const displayArr = ['none', 'none', 'none', 'none'];
  for (let i = 0; i <= frameIndex; i++) {
    displayArr[i] = '';
  }

  return (
    <>
      <svg id='svg' width={1100} height={450}>
        {lines}
        <SvgCircles cx={450} cy={50} r={r} n={1} offsetX={offset} style={circleStyle}></SvgCircles>
        <SvgCircles cx={250} cy={150} r={r} n={2} offsetX={offset * 4} style={circleStyle}></SvgCircles>
        <SvgCircles cx={150} cy={250} r={r} n={4} offsetX={offset * 2} style={circleStyle}></SvgCircles>
        <SvgCircles cx={100} cy={350} r={r} n={8} offsetX={offset} style={circleStyle}></SvgCircles>
        <SvgTexts x={430} y={75} text={'0'} offsetX={offset * 4} style={textStyle}></SvgTexts>
        <SvgTexts x={230} y={175} text={'01'} offsetX={offset * 4} style={textStyle}></SvgTexts>
        <SvgTexts x={130} y={275} text={'0110'} offsetX={offset * 2} style={textStyle}></SvgTexts>
        <SvgTexts x={80} y={375} text={'01101001'} offsetX={offset} style={textStyle}></SvgTexts>
        <SvgTexts x={80} y={445} text={'01234567'} offsetX={offset} style={dpStyle}></SvgTexts>
        <circle display={displayArr[0]} cx={600} cy={350} r={r + 5} style={pointerStyle} />
        <circle display={displayArr[1]} cx={550} cy={250} r={r + 5} style={pointerStyle} />
        <circle display={displayArr[2]} cx={650} cy={150} r={r + 5} style={pointerStyle} />
        <circle display={displayArr[3]} cx={450} cy={50} r={r + 5} style={pointerStyle} />
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
