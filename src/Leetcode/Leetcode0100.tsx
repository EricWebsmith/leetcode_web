import * as d3 from 'd3';
import { SetStateAction, useEffect, useState } from 'react';
import ButtonBar from '../controls/ButtonBar';

type Node = {
  child: string;
  parent: string;
};

export default function Leetcode0100() {
  const [frameIndex, setFrameIndex] = useState<number>(0);

  const tree1Colors = ['blue', 'blue', 'blue', 'blue', 'blue'];
  const tree2Colors = ['darkblue', 'darkblue', 'darkblue', 'darkblue', 'darkblue', 'darkblue'];
  const tree1LineColors = ['blue', 'blue', 'blue', 'blue'];
  const tree2LineColors = ['darkblue', 'darkblue', 'darkblue', 'darkblue', 'darkblue'];
  if (frameIndex >= 1) {
    tree1Colors[1] = 'green';
    tree2Colors[1] = 'green';
  }

  if (frameIndex >= 2) {
    tree1LineColors[0] = 'green';
    tree2LineColors[0] = 'green';
  }

  if (frameIndex >= 5) {
    tree2Colors[5] = 'red';
  }

  if (frameIndex >= 6) {
    tree1Colors[3] = 'red';
    tree2Colors[3] = 'red';
    tree2LineColors[4] = 'red';
  }

  if (frameIndex >= 7) {
    tree1Colors[2] = 'red';
    tree2Colors[2] = 'red';
    tree1LineColors[2] = 'red';
    tree2LineColors[2] = 'red';
  }

  if (frameIndex >= 8) {
    tree1Colors[0] = 'red';
    tree2Colors[0] = 'red';
    tree1LineColors[1] = 'red';
    tree2LineColors[1] = 'red';
  }
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

  const tree1Struct = d3.tree<Node>().size([500, 265]);
  const tree1Info = tree1Struct(tree1ds);
  const tree1Nodes = tree1Info.descendants();
  const tree1Links = tree1Info.links();

  const tree1Circles = [];
  const tree1Texts = [];
  for (let i = 0; i < tree1Nodes.length; i++) {
    const node = tree1Nodes[i];
    const key = `tree1_node${i}`;
    tree1Circles.push(<circle key={key} cx={node.x} cy={node.y} r={50} fill={tree1Colors[i]}></circle>);
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
    tree1Lines.push(
      <line
        key={key}
        x1={l.source.x}
        y1={l.source.y}
        x2={l.target.x}
        y2={l.target.y}
        stroke={tree1LineColors[i]}
      />
    );
  }

  // Tree 2
  const tree2Data: Node[] = [
    { child: '3', parent: '' },
    { child: '9', parent: '3' },
    { child: '20', parent: '3' },
    { child: '15', parent: '20' },
    { child: '8', parent: '15' },
    { child: '7', parent: '20' },
  ];

  const tree2ds = d3
    .stratify<Node>()
    .id((d) => d.child)
    .parentId((d) => d.parent)(tree2Data);

  const tree2Struct = d3.tree<Node>().size([500, 400]);
  const tree2Info = tree2Struct(tree2ds);
  const tree2Nodes = tree2Info.descendants();
  const tree2Links = tree2Info.links();

  const tree2Circles = [];
  const tree2Texts = [];
  for (let i = 0; i < tree2Nodes.length; i++) {
    const node = tree2Nodes[i];
    const key = `tree2_node${i}`;
    tree2Circles.push(<circle key={key} cx={node.x} cy={node.y} r={50} fill={tree2Colors[i]}></circle>);
    const textKey = `tree1_text${i}`;
    tree2Texts.push(
      <text key={textKey} x={node.x} y={node.y}>
        {node.id}
      </text>
    );
  }

  const tree2Lines = [];
  for (let i = 0; i < tree2Links.length; i++) {
    const line = tree2Links[i];
    const key = `tree2_link${i}`;
    tree2Lines.push(
      <line
        key={key}
        x1={line.source.x}
        y1={line.source.y}
        x2={line.target.x}
        y2={line.target.y}
        stroke={tree2LineColors[i]}
      />
    );
  }

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 60,
    fontFamily: 'Arial',
    fill: '#FFFFFF',
  };

  useEffect(() => {
    d3.selectAll('text').style('dominant-baseline', 'middle').style('text-anchor', 'middle');
  }, [frameIndex]);

  const dfsList = [0, 1, 0, 2, 3, 5, 3, 2, 0];
  const currentX = tree2Nodes[dfsList[frameIndex]].x;
  const currentY = tree2Nodes[dfsList[frameIndex]].y;
  const currentStyle = { fill: 'none', stroke: 'orange', strokeWidth: 10, strokeDasharray: '10' };

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < dfsList.length) {
      setFrameIndex(index);
    }
  }

  return (
    <>
      <svg id='svg' width={950} height={520}>
        <g id='tree1' transform='translate(0, 60)'>
          <g style={{ strokeWidth: 10 }}>{tree1Lines}</g>
          <g style={{ fill: 'blue' }}>{tree1Circles}</g>
          <g style={textStyle}>{tree1Texts}</g>
          <circle cx={currentX} cy={currentY} r={50} style={currentStyle}></circle>
        </g>
        <g id='tree2' transform='translate(400, 60)'>
          <g style={{ strokeWidth: 10 }}>{tree2Lines}</g>
          <g style={{ fill: 'darkblue' }}>{tree2Circles}</g>
          <g style={textStyle}>{tree2Texts}</g>
          <circle cx={currentX} cy={currentY} r={50} style={currentStyle}></circle>
        </g>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
