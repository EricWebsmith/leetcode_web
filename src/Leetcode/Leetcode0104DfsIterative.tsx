import * as d3 from 'd3';
import { SetStateAction, useEffect, useState } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgCircles from '../controls/SvgCircles';
import SvgTexts from '../controls/SvgTexts';

type Node = {
  child: string;
  parent: string;
};

type Frame = {
  node: number;
  dp: (number | null)[];
  stack: string;
};
const frames: Frame[] = [
  {
    node: -1,
    dp: [null, null, null, null, null],
    stack: '',
  },
  {
    node: -1,
    dp: [1, null, null, null, null],
    stack: ' 3',
  },
  {
    node: 0,
    dp: [1, null, null, null, null],
    stack: '',
  },
  {
    node: 0,
    dp: [1, 2, null, null, null],
    stack: ' 9',
  },
  {
    node: 0,
    dp: [1, 2, 2, null, null],
    stack: ' 920',
  },
  {
    node: 2,
    dp: [1, 2, 2, null, null],
    stack: ' 9',
  },
  {
    node: 2,
    dp: [1, 2, 2, 3, null],
    stack: ' 915',
  },
  {
    node: 2,
    dp: [1, 2, 2, 3, 3],
    stack: ' 915 7',
  },
  {
    node: 4,
    dp: [1, 2, 2, 3, 3],
    stack: ' 915',
  },
  {
    node: 3,
    dp: [1, 2, 2, 3, 3],
    stack: ' 9',
  },
  {
    node: 1,
    dp: [1, 2, 2, 3, 3],
    stack: '',
  },
];

export default function Leetcode0104Dfs() {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const frame = frames[frameIndex];

  const data: Node[] = [
    { child: '3', parent: '' },
    { child: '9', parent: '3' },
    { child: '20', parent: '3' },
    { child: '15', parent: '20' },
    { child: '7', parent: '20' },
  ];

  const ds = d3
    .stratify<Node>()
    .id((d) => d.child)
    .parentId((d) => d.parent)(data);

  const treeStruct = d3.tree<Node>().size([900, 280]);
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
    tree1Circles.push(<circle key={key} cx={node.x} cy={node.y} r={r} fill='blue'></circle>);
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

  const dpFont = {
    fontSize: 35,
    fontWeight: 'bold',
    fill: 'white',
  };

  useEffect(() => {
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
        <g style={{ stroke: 'purple', strokeWidth: '10' }}>
          <line x1={240} y1={410} x2={780} y2={410}></line>
          <line x1={240} y1={410} x2={240} y2={530}></line>
          <line x1={240} y1={530} x2={780} y2={530}></line>
        </g>
        <text x={50} y={465} style={titleStyle}>
          Stack:
        </text>
        <SvgCircles
          cx={300}
          cy={470}
          n={frame.stack.length / 2}
          style={{ stroke: 'blue', strokeWidth: 10, fill: 'none' }}
          r={35}
          offsetX={100}
        />
        <g id='calc'>
          <SvgTexts x={300} y={470} text={frame.stack} step={2} style={qFont} offsetX={100} />
        </g>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
