import * as d3 from 'd3';
import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgCircles from '../controls/SvgCircles';
import SvgLines from '../controls/SvgLines';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';

type Node = {
  child: string;
  parent: string;
};

type Frame = {
  node: number;
  qPop: number;
  qLen: number;
  arrIndex: number;
  nodes: number;
};
const frames: Frame[] = [
  { arrIndex: -1, node: -1, qPop: 0, qLen: 0, nodes: 0 },
  { arrIndex: 0, node: -1, qPop: 0, qLen: 0, nodes: 0 },
  { arrIndex: 0, node: -1, qPop: 0, qLen: 0, nodes: 1 },
  { arrIndex: 0, node: -1, qPop: 0, qLen: 1, nodes: 1 },
  { arrIndex: 0, node: 0, qPop: 1, qLen: 1, nodes: 1 },
  { arrIndex: 1, node: 0, qPop: 1, qLen: 2, nodes: 2 },
  { arrIndex: 2, node: 0, qPop: 1, qLen: 3, nodes: 3 },
  { arrIndex: 2, node: 1, qPop: 2, qLen: 3, nodes: 3 },
  { arrIndex: 3, node: 1, qPop: 2, qLen: 3, nodes: 3 },
  { arrIndex: 4, node: 1, qPop: 2, qLen: 3, nodes: 3 },
  { arrIndex: 4, node: 2, qPop: 3, qLen: 3, nodes: 3 },
  { arrIndex: 5, node: 2, qPop: 3, qLen: 4, nodes: 4 },
  { arrIndex: 6, node: 2, qPop: 3, qLen: 5, nodes: 5 },
];

export default function Leetcode0297Deserialize() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const frame = frames[frameIndex];
  // Tree 1
  const tree1Data: Node[] = [
    { child: '1', parent: '' },
    { child: '2', parent: '1' },
    { child: '3', parent: '1' },
    { child: '4', parent: '3' },
    { child: '5', parent: '3' },
  ];

  const tree1ds = d3
    .stratify<Node>()
    .id((d) => d.child)
    .parentId((d) => d.parent)(tree1Data);

  const tree1Struct = d3.tree().size([800, 200]);
  const tree1Info = tree1Struct(tree1ds);
  const tree1Nodes = tree1Info.descendants();
  const tree1Links = tree1Info.links();

  const tree1Circles = [];
  const tree1Texts = [];
  for (let i = 0; i < frame.nodes; i++) {
    const node = tree1Nodes[i];
    const key = `tree1_node${i}`;
    tree1Circles.push(<circle key={key} cx={node.x} cy={node.y} r={50}></circle>);
    const textKey = `tree1_text${i}`;
    tree1Texts.push(
      <text key={textKey} x={node.x} y={node.y}>
        {node.id}
      </text>
    );
  }

  const tree1Lines = [];
  for (let i = 0; i < frame.nodes - 1; i++) {
    const l = tree1Links[i];
    const key = `tree1_link${i}`;
    tree1Lines.push(<line key={key} x1={l.source.x} y1={l.source.y} x2={l.target.x} y2={l.target.y} />);
  }

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 60,
    fontFamily: 'Arial',
    fill: '#FFFFFF',
  };

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: 55,
    fontFamily: 'Arial',
    fill: '#000',
  };

  const qFont = {
    fontSize: 45,
    fontWeight: 'bold',
    fill: 'blue',
  };

  const arrFont = {
    fontSize: 45,
    fontWeight: 'bold',
    fill: 'white',
  };

  React.useEffect(() => {
    d3.select('#tree1').selectAll('text').style('dominant-baseline', 'middle').style('text-anchor', 'middle');
    d3.select('#calc').selectAll('text').style('dominant-baseline', 'middle').style('text-anchor', 'middle');
    d3.select('#cross').selectAll('text').style('dominant-baseline', 'middle').style('text-anchor', 'middle');
  }, [frameIndex]);

  let currentX = -100;
  let currentY = -100;
  if (frame.node >= 0) {
    currentX = tree1Nodes[frame.node].x;
    currentY = tree1Nodes[frame.node].y;
  }

  let currentArrX = -100;
  if (frame.arrIndex >= 0) {
    currentArrX = 120 + frame.arrIndex * 100;
  }
  const currentStyle = { fill: 'none', stroke: 'red', strokeWidth: 10, strokeDasharray: '10' };
  const qString = '12345'.substring(0, frame.qLen);

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
    <>
      <svg id='svg' width={1000} height={540} transform='translate(75, 0)'>
        <g id='tree1' transform='translate(0, 260)'>
          <g style={{ fill: 'blue' }}>{tree1Circles}</g>
          <g style={{ stroke: 'blue', strokeWidth: 10 }}>{tree1Lines}</g>
          <g style={textStyle}>{tree1Texts}</g>
          <circle cx={currentX} cy={currentY} r={50} style={currentStyle}></circle>
        </g>
        <text x={50} y={60} style={titleStyle}>
          A:
        </text>
        <text x={50} y={160} style={titleStyle}>
          Q:
        </text>
        <SvgCircles
          cx={155}
          cy={145}
          n={frame.qLen}
          style={{ stroke: 'blue', strokeWidth: 10, fill: 'none' }}
          r={35}
          offsetX={100}
        />
        <SvgLines
          x1={155 + 28}
          y1={145 - 28}
          x2={155 - 28}
          y2={145 + 28}
          n={frame.qPop}
          style={{ stroke: 'blue', strokeWidth: 10 }}
          offsetX={100}
        />

        <SvgRects x={120} y={10} n={7} style={{ fill: 'green' }} width={70} offsetX={100} />
        <rect
          x={currentArrX}
          y={10}
          style={{ fill: 'none', stroke: 'red', strokeDasharray: '7', strokeWidth: 7 }}
          width={70}
          height={70}></rect>
        <g id='calc'>
          <SvgTexts x={155} y={150} text={qString} style={qFont} offsetX={100} />
          <SvgTexts x={155} y={45} text='123  45' style={arrFont} offsetX={100} />
        </g>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
