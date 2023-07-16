import * as d3 from 'd3';
import cloneDeep from 'lodash/cloneDeep';
import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import { str2Array } from '../Utils/arrayHelper';
import { array2TreeNode, TreeNode } from '../Utils/binaryTree';
import { D3Node, getTreeData } from '../Utils/d3helper';

const BLUE = 'blue';
const GREEN = 'green';
const LIGHTGREEN = 'cyan';

type Frame = {
  node: number;
  nodeColors: string[];
  linkColors: string[];
  dp: (number | null)[];
  dpLeft: (number | null)[];
  dpRight: (number | null)[];
};

const defaultData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function getFrames(arr: (number | null)[]) {
  const frameOriginal: Frame = {
    node: -1,
    nodeColors: Array(arr.length).fill(BLUE),
    linkColors: Array(arr.length - 1).fill(BLUE),
    dp: Array(arr.length).fill(null),
    dpLeft: Array(arr.length).fill(null),
    dpRight: Array(arr.length).fill(null),
  };

  const frame0 = cloneDeep(frameOriginal);
  const frames = [frame0];

  const root = array2TreeNode(arr) ?? new TreeNode(1);
  const treeData: D3Node[] = getTreeData(root);

  const ds = d3
    .stratify<D3Node>()
    .id((d) => d.child)
    .parentId((d) => d.parent)(treeData);

  const treeStruct = d3.tree<D3Node>().size([1000, 450]);
  const dsInfo = treeStruct(ds);
  const nodes = dsInfo.descendants();
  const links = dsInfo.links();

  function getLeftHeight(node: TreeNode | null): number {
    if (node === null || node.id < 0) {
      return 0;
    }
    const nodeIndex = nodes.findIndex((data) => data.id === node.id.toString());
    frameOriginal.nodeColors[nodeIndex] = LIGHTGREEN;
    return getLeftHeight(node.left) + 1;
  }

  function getRightHeight(node: TreeNode | null): number {
    if (node === null || node.id < 0) {
      return 0;
    }
    const nodeIndex = nodes.findIndex((data) => data.id === node.id.toString());
    frameOriginal.nodeColors[nodeIndex] = LIGHTGREEN;
    return getRightHeight(node.right) + 1;
  }

  function dfs(node: TreeNode | null): number {
    if (node == null || node.id < 0) {
      return 0;
    }
    const nodeIndex = nodes.findIndex((data) => data.id === node.id.toString());
    frameOriginal.node = nodeIndex;

    const leftHeight = getLeftHeight(node);
    const rightHeight = getRightHeight(node);
    frameOriginal.dpLeft[nodeIndex] = leftHeight;
    frameOriginal.dpRight[nodeIndex] = rightHeight;
    const frameCountLeftAndRight = cloneDeep(frameOriginal);
    frames.push(frameCountLeftAndRight);
    let count = 0;
    if (leftHeight === rightHeight) {
      count = 2 ** leftHeight - 1;
    } else {
      count = dfs(node.left) + dfs(node.right) + 1;
    }
    frameOriginal.node = nodeIndex;
    frameOriginal.nodeColors[nodeIndex] = GREEN;
    frameOriginal.dp[nodeIndex] = count;

    const leaveFrame = cloneDeep(frameOriginal);
    frames.push(leaveFrame);
    if (nodeIndex > 0) {
      frameOriginal.linkColors[nodeIndex - 1] = GREEN;
    }
    return count;
  }

  dfs(root);

  return { frames, nodes, links };
}

const result = getFrames(defaultData);
let frames = result.frames;
let nodes = result.nodes;
let links = result.links;

export default function Leetcode0222() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const [data, setData] = React.useState<(number | null)[]>(defaultData);
  const frame = frames[frameIndex];
  const tree1Circles = [];
  const tree1Texts = [];
  const dpRects = [];
  const dpTexts = [];
  const r = 50;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.id?.startsWith('-')) {
      continue;
    }
    const key = `tree1_node${i}`;
    tree1Circles.push(<circle key={key} cx={node.x} cy={node.y} r={r} fill={frame.nodeColors[i]}></circle>);
    const textKey = `tree1_text${i}`;
    tree1Texts.push(
      <text key={textKey} x={node.x} y={node.y}>
        {data[Number(node.id ?? '0')]}
      </text>
    );

    //dp left
    if (frame.dpLeft[i] !== null) {
      const dpLeftRectKey = `dp_left_rect_${i}`;
      dpRects.push(
        <rect key={dpLeftRectKey} x={node.x - r - 20} y={node.y + r - 20} height={40} width={40}></rect>
      );
      const dpLeftKey = `dp_left_${i}`;
      dpTexts.push(
        <text key={dpLeftKey} x={node.x - r} y={node.y + r}>
          {frame.dpLeft[i]}
        </text>
      );
    }

    //dp right
    if (frame.dpRight[i] !== null) {
      const dpRightRectKey = `dp_right_rect_${i}`;
      dpRects.push(
        <rect key={dpRightRectKey} x={node.x + r - 20} y={node.y + r - 20} height={40} width={40}></rect>
      );
      const dpRightKey = `dp_right_${i}`;
      dpTexts.push(
        <text key={dpRightKey} x={node.x + r} y={node.y + r}>
          {frame.dpRight[i]}
        </text>
      );
    }

    //dp
    if (frame.dp[i] !== null) {
      const dpRectKey = `dp_rect_${i}`;
      dpRects.push(<rect key={dpRectKey} x={node.x - 20} y={node.y - r - 40} height={40} width={40}></rect>);
      const dpKey = `dp_${i}`;
      dpTexts.push(
        <text key={dpKey} x={node.x} y={node.y - r - 20}>
          {frame.dp[i]}
        </text>
      );
    }
  }

  const tree1Lines = [];
  for (let i = 0; i < links.length; i++) {
    const l = links[i];

    if (nodes[i + 1].id?.startsWith('-')) {
      continue;
    }
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
  }, [data, frameIndex]);

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

  const inputRef = React.useRef<HTMLInputElement>(null);
  function dataChangeClickHandler() {
    if (inputRef.current == null) {
      return;
    }

    const value = inputRef.current.value ?? '';
    const newData = str2Array(value);
    const result = getFrames(newData);
    frames = result.frames;
    nodes = result.nodes;
    links = result.links;
    setData(newData);
    setFrameIndex(0);
  }

  return (
    <>
      <svg id='svg' width={1000} height={620}>
        <g id='tree1' transform='translate(0, 100)'>
          <g style={{ stroke: 'blue', strokeWidth: 10 }}>{tree1Lines}</g>
          <g style={{ fill: 'blue' }}>{tree1Circles}</g>

          <g style={textStyle}>{tree1Texts}</g>
          <g style={{ fill: 'green' }}>{dpRects}</g>
          <g style={dpFont}>{dpTexts}</g>
          <circle cx={currentX} cy={currentY} r={50} style={currentStyle}></circle>
        </g>
      </svg>
      <ButtonBar setIndex={setIndex} />
      <div className='message'>
        <input ref={inputRef} defaultValue={data.toString()} style={{ width: 500 }}></input>
        <button className='btn' onClick={dataChangeClickHandler}>
          Change
        </button>
      </div>
    </>
  );
}
