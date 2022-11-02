import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';

const rt3 = 1.732;
function getHexPoints(x: number, y: number, length: number): string {
  return `${x}, ${y} ${x + length}, ${y} ${x + length * 1.5}, ${y + (length / 2) * rt3} ${x + length}, ${
    y + length * rt3
  } ${x}, ${y + length * rt3} ${x - length / 2}, ${y + (length / 2) * rt3}`;
}

interface IDnaProps {
  dna: string;
  x: number;
  y: number;
  distance?: number | null;
  current?: boolean | null;
}

function Dna(props: IDnaProps) {
  const textStyle = {
    fontSize: 50,
    fontWeight: 'bold',
    fill: 'white',
  };

  const superStyle = {
    fontSize: 30,
    fontWeight: 'bold',
    fill: 'white',
  };

  const fill = props.current ? 'red' : 'purple';
  const { x, y } = props;
  const points = [
    [x, y],
    [x + 60, y + 20 * rt3],
    [x + 40 * 3, y],
  ];
  const points1 = getHexPoints(points[0][0], points[0][1], 40);
  const points2 = getHexPoints(points[1][0], points[1][1], 40);
  const points3 = getHexPoints(points[2][0], points[2][1], 40);
  return (
    <>
      <rect x={props.x + 150} y={props.y - 30} height={30} width={25} fill='green'></rect>
      <text x={props.x + 155} y={props.y - 5} style={superStyle}>
        {props.distance}
      </text>
      <polygon points={points1} fill={fill} stroke='black' />
      <polygon points={points2} fill={fill} stroke='black' />
      <polygon points={points3} fill={fill} stroke='black' />
      <text x={points[0][0] + 3} y={points[0][1] + 50} style={textStyle}>
        {props.dna[0]}
      </text>
      <text x={points[1][0] + 3} y={points[1][1] + 50} style={textStyle}>
        {props.dna[1]}
      </text>
      <text x={points[2][0] + 3} y={points[2][1] + 50} style={textStyle}>
        {props.dna[2]}
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
        height={375}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}
        transform='translate(50, 0)'>
        {/* ACT -> ACC */}
        <line x1={190} y1={175} x2={270} y2={75} stroke='blue' strokeWidth={8} display={visible[1]} />
        {/* ACT -> ACG */}
        <line x1={190} y1={175} x2={520} y2={275} stroke='blue' strokeWidth={8} display={visible[1]} />
        {/* ACC -> CCC */}
        <line x1={270} y1={75} x2={270} y2={275} stroke='blue' strokeWidth={8} display={visible[2]} />
        {/* ACC -> AAC */}
        <line x1={410} y1={85} x2={520} y2={85} stroke='blue' strokeWidth={8} display={visible[2]} />
        {/* AAC -> AAA */}
        <line x1={640} y1={75} x2={725} y2={180} stroke='blue' strokeWidth={8} display={visible[3]} />
        <Dna x={50} y={150} dna='ACT' distance={distances[0]} current={current_arr[0]} />
        <Dna x={250} y={50} dna='ACC' distance={distances[1]} current={current_arr[1]} />
        <Dna x={500} y={50} dna='AAC' distance={distances[2]} current={current_arr[2]} />
        <Dna x={700} y={150} dna='AAA' distance={distances[3]} current={current_arr[3]} />
        <Dna x={500} y={250} dna='ACG' distance={distances[4]} current={current_arr[4]} />
        <Dna x={250} y={250} dna='CCC' distance={distances[5]} current={current_arr[5]} />
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
