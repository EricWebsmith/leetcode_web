import * as d3 from 'd3';
import { SetStateAction, useEffect, useState } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgCircles from '../controls/SvgCircles';
import SvgLines from '../controls/SvgLines';
import SvgTexts from '../controls/SvgTexts';

type Node = {
  child: string;
  parent: string;
};

type Frame = {
  qPop: number;
  qLen: number;
  level: number;
  answer: number;
};
const frames: Frame[] = [
  { qPop: 0, qLen: 0, level: 0, answer: 0 },
  { qPop: 0, qLen: 1, level: 0, answer: 0 },
  { qPop: 1, qLen: 1, level: 1, answer: 0 },
  { qPop: 1, qLen: 3, level: 1, answer: 0 },
  { qPop: 1, qLen: 3, level: 1, answer: 1 },
  { qPop: 3, qLen: 3, level: 2, answer: 1 },
  { qPop: 3, qLen: 5, level: 2, answer: 1 },
  { qPop: 3, qLen: 5, level: 2, answer: 2 },
  { qPop: 5, qLen: 5, level: 3, answer: 2 },
  { qPop: 5, qLen: 5, level: 3, answer: 3 },
];

const r = 50;

export default function Leetcode0104Bfs() {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const frame = frames[frameIndex];
  // Tree 1
  const tree1Data: Node[] = [
    { child: '3', parent: '' },
    { child: '9', parent: '3' },
    { child: '20', parent: '3' },
    { child: '15', parent: '20' },
    { child: '7', parent: '20' },
  ];

  const tree1ds = d3
    .stratify<Node>()
    .id((d) => d.child)
    .parentId((d) => d.parent)(tree1Data);

  const tree1Struct = d3.tree<Node>().size([800, 200]);
  const tree1Info = tree1Struct(tree1ds);
  const tree1Nodes = tree1Info.descendants();
  const tree1Links = tree1Info.links();
  const levelDistance = tree1Nodes[1].y - tree1Nodes[0].y;

  const tree1Circles = [];
  const tree1Texts = [];
  for (let i = 0; i < tree1Nodes.length; i++) {
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
  for (let i = 0; i < tree1Links.length; i++) {
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

  useEffect(() => {
    d3.select('#tree1').selectAll('text').style('dominant-baseline', 'middle').style('text-anchor', 'middle');
    d3.select('#calc').selectAll('text').style('dominant-baseline', 'middle').style('text-anchor', 'middle');
    d3.select('#cross').selectAll('text').style('dominant-baseline', 'middle').style('text-anchor', 'middle');
  }, [frameIndex]);

  const currentStyle = { fill: 'none', stroke: 'red', strokeWidth: 10, strokeDasharray: '10' };
  const qString = ' 3 920157'.substring(0, frame.qLen * 2);

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
      <svg id='svg' width={950} height={540}>
        <g id='tree1' transform='translate(0, 60)'>
          <g style={{ fill: 'blue' }}>{tree1Circles}</g>
          <g style={{ stroke: 'blue', strokeWidth: 10 }}>{tree1Lines}</g>
          <g style={textStyle}>{tree1Texts}</g>
          <rect
            x={100}
            y={tree1Nodes[0].y + levelDistance * (frame.level - 1) - r}
            height={r * 2}
            width={600}
            style={currentStyle}></rect>
        </g>
        <text x={50} y={400} style={titleStyle}>
          Queue:
        </text>
        <SvgCircles
          cx={300}
          cy={385}
          n={frame.qLen}
          style={{ stroke: 'blue', strokeWidth: 10, fill: 'none' }}
          r={35}
          offsetX={100}
        />
        <SvgLines
          x1={300 + 28}
          y1={385 - 28}
          x2={300 - 28}
          y2={385 + 28}
          n={frame.qPop}
          style={{ stroke: 'blue', strokeWidth: 10 }}
          offsetX={100}
        />
        <text x={50} y={510} style={titleStyle}>
          Answer: {frame.answer}
        </text>
        <g id='calc'>
          <SvgTexts x={300} y={385} text={qString} step={2} style={qFont} offsetX={100} />
        </g>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
