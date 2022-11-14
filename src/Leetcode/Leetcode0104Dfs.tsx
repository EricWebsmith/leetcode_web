import * as d3 from 'd3';
import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';

const BLUE = 'blue';
const GREEN = 'green';

type Node = {
  child: string;
  parent: string;
};

type Frame = {
  node: number;
  nodeColors: string[];
  linkColors: string[];
  dp: (number | null)[];
};
const frames: Frame[] = [
  {
    node: -1,
    nodeColors: [BLUE, BLUE, BLUE, BLUE, BLUE],
    linkColors: [BLUE, BLUE, BLUE, BLUE, BLUE],
    dp: [null, null, null, null, null],
  },
  {
    node: 0,
    nodeColors: [BLUE, BLUE, BLUE, BLUE, BLUE],
    linkColors: [BLUE, BLUE, BLUE, BLUE, BLUE],
    dp: [null, null, null, null, null],
  },
  {
    node: 1,
    nodeColors: [BLUE, BLUE, BLUE, BLUE, BLUE],
    linkColors: [BLUE, BLUE, BLUE, BLUE, BLUE],
    dp: [null, null, null, null, null],
  },
  {
    node: 1,
    nodeColors: [BLUE, GREEN, BLUE, BLUE, BLUE],
    linkColors: [BLUE, BLUE, BLUE, BLUE, BLUE],
    dp: [null, 1, null, null, null],
  },
  {
    node: 0,
    nodeColors: [BLUE, GREEN, BLUE, BLUE, BLUE],
    linkColors: [GREEN, BLUE, BLUE, BLUE, BLUE],
    dp: [null, 1, null, null, null],
  },
  {
    node: 2,
    nodeColors: [BLUE, GREEN, BLUE, BLUE, BLUE],
    linkColors: [GREEN, BLUE, BLUE, BLUE, BLUE],
    dp: [null, 1, null, null, null],
  },
  {
    node: 3,
    nodeColors: [BLUE, GREEN, BLUE, BLUE, BLUE],
    linkColors: [GREEN, BLUE, BLUE, BLUE, BLUE],
    dp: [null, 1, null, null, null],
  },
  {
    node: 3,
    nodeColors: [BLUE, GREEN, BLUE, GREEN, BLUE],
    linkColors: [GREEN, BLUE, BLUE, BLUE, BLUE],
    dp: [null, 1, null, 1, null],
  },
  {
    node: 2,
    nodeColors: [BLUE, GREEN, BLUE, GREEN, BLUE],
    linkColors: [GREEN, BLUE, GREEN, BLUE],
    dp: [null, 1, null, 1, null],
  },
  {
    node: 4,
    nodeColors: [BLUE, GREEN, BLUE, GREEN, BLUE],
    linkColors: [GREEN, BLUE, GREEN, BLUE],
    dp: [null, 1, null, 1, null],
  },
  {
    node: 4,
    nodeColors: [BLUE, GREEN, BLUE, GREEN, GREEN],
    linkColors: [GREEN, BLUE, GREEN, BLUE],
    dp: [null, 1, null, 1, 1],
  },
  {
    node: 2,
    nodeColors: [BLUE, GREEN, GREEN, GREEN, GREEN],
    linkColors: [GREEN, BLUE, GREEN, GREEN],
    dp: [null, 1, 2, 1, 1],
  },
  {
    node: 0,
    nodeColors: [GREEN, GREEN, GREEN, GREEN, GREEN],
    linkColors: [GREEN, GREEN, GREEN, GREEN],
    dp: [3, 1, 2, 1, 1],
  },
];

export default function Leetcode0104Dfs() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const frame = frames[frameIndex];
  // Tree 1
  const tree1Data: Node[] = [
    { child: '3', parent: '' },
    { child: '9', parent: '3' },
    { child: '20', parent: '3' },
    { child: '15', parent: '20' },
    { child: '7', parent: '20' },
  ];

  const ds = d3
    .stratify<Node>()
    .id((d) => d.child)
    .parentId((d) => d.parent)(tree1Data);

  const treeStruct = d3.tree().size([900, 300]);
  const dsInfo = treeStruct(ds);
  const nodes = dsInfo.descendants();
  const tree1Links = dsInfo.links();

  const tree1Circles = [];
  const tree1Texts = [];
  const dpRects = [];
  const dpTexts = [];
  const r = 50;
  //const dp = [3, 1, 2, 1, 1];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const key = `tree1_node${i}`;
    tree1Circles.push(<circle key={key} cx={node.x} cy={node.y} r={r} fill={frame.nodeColors[i]}></circle>);
    const textKey = `tree1_text${i}`;
    tree1Texts.push(
      <text key={textKey} x={node.x} y={node.y}>
        {node.id}
      </text>
    );
    if (frame.dp[i] == null) {
      continue;
    }
    const dpRectKey = `dp_rect_${i}`;
    dpRects.push(<rect key={dpRectKey} x={node.x + r} y={node.y - r} height={40} width={40}></rect>);
    const dpKey = `dp_${i}`;
    dpTexts.push(
      <text key={dpKey} x={node.x + r + 20} y={node.y - r + 20 + 2}>
        {frame.dp[i]}
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
        stroke={frame.linkColors[i]}
      />
    );
  }

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 60,
    fontFamily: 'Arial',
    fill: '#FFFFFF',
  };

  const dpFont = {
    fontSize: 35,
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
    currentX = nodes[frame.node].x;
    currentY = nodes[frame.node].y;
  }
  const currentStyle = { fill: 'none', stroke: 'red', strokeWidth: 10, strokeDasharray: '10' };

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
          <g style={{ stroke: 'blue', strokeWidth: 10 }}>{tree1Lines}</g>
          <g style={{ fill: 'blue' }}>{tree1Circles}</g>

          <g style={textStyle}>{tree1Texts}</g>
          <g style={{ fill: 'green' }}>{dpRects}</g>
          <g style={dpFont}>{dpTexts}</g>
          <circle cx={currentX} cy={currentY} r={50} style={currentStyle}></circle>
        </g>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
