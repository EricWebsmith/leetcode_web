import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';

interface IDnaProps {
  dna: string;
  x: number;
  y: number;
  distance?: number | null;
  current?: boolean | null;
}

function Dna(props: IDnaProps) {
  const textStyle = {
    fontSize: 40,
    fontWeight: 'bold',
    fill: 'white',
  };

  const superStyle = {
    fontSize: 30,
    fontWeight: 'bold',
    fill: 'white',
  };

  const fill = props.current ? 'red' : 'blue';
  return (
    <>
      <rect x={props.x} y={props.y} height={50} width={120} fill={fill}></rect>
      <text x={props.x + 20} y={props.y + 38} style={textStyle}>
        {props.dna}
      </text>
      <rect x={props.x + 110} y={props.y - 30} height={30} width={25} fill='green'></rect>
      <text x={props.x + 113} y={props.y - 3} style={superStyle}>
        {props.distance}
      </text>
    </>
  );
}

export default function Leetcode0433() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const n = 6;

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

  const distances = [0, null, null, null, null, null];
  const final_distances = [0, 1, 2, 3, 1, 2];

  for (let i = 0; i < n; i++) {
    if (final_distances[i] <= frameIndex) {
      distances[i] = final_distances[i];
    }
  }

  const visible = ['none', 'none', 'none', 'none', 'none', 'none'];
  for (let i = 0; i <= frameIndex; i++) {
    distances[i] = final_distances[i];
    visible[i] = '';
  }

  const current = [[0], [1, 4], [2, 5], [3]];
  const current_arr = [false, false, false, false, false, false];
  for (const c of current[frameIndex]) {
    current_arr[c] = true;
  }

  return (
    <>
      <svg
        id='svg'
        width={1100}
        height={320}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}
        transform='translate(50, 0)'>
        {/* ACT -> ACC */}
        <line x1={110} y1={175} x2={310} y2={75} stroke='blue' strokeWidth={8} display={visible[1]} />
        {/* ACT -> ACA */}
        <line x1={110} y1={175} x2={510} y2={275} stroke='blue' strokeWidth={8} display={visible[1]} />
        {/* ACC -> CCC */}
        <line x1={310} y1={75} x2={310} y2={275} stroke='blue' strokeWidth={8} display={visible[2]} />
        {/* ACC -> AAC */}
        <line x1={310} y1={75} x2={510} y2={75} stroke='blue' strokeWidth={8} display={visible[2]} />
        {/* AAC -> AAA */}
        <line x1={510} y1={75} x2={710} y2={175} stroke='blue' strokeWidth={8} display={visible[3]} />
        <Dna x={50} y={150} dna='ACT' distance={distances[0]} current={current_arr[0]} />
        <Dna x={250} y={50} dna='ACC' distance={distances[1]} current={current_arr[1]} />
        <Dna x={450} y={50} dna='AAC' distance={distances[2]} current={current_arr[2]} />
        <Dna x={650} y={150} dna='AAA' distance={distances[3]} current={current_arr[3]} />
        <Dna x={450} y={250} dna='ACA' distance={distances[4]} current={current_arr[4]} />
        <Dna x={250} y={250} dna='CCC' distance={distances[5]} current={current_arr[5]} />
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
