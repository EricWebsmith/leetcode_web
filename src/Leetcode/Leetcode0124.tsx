import * as d3 from 'd3';
import cloneDeep from 'lodash/cloneDeep';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { TreeNode, array2TreeNode } from '../Utils/binaryTree';
import { D3Node, getTreeData } from '../Utils/d3helper';
import ButtonBar from '../controls/ButtonBar';

const BLUE = 'blue';
const GREEN = 'green';

type Frame = {
  node: number;
  nodeColors: string[];
  linkColors: string[];
  dp: (number | null)[];
  pathSumMax: number;
};

const defaultData = [-3, 9, 20, null, null, 15, 7, -5];
function getFrames(arr: (number | null)[]) {
  const frameOriginal: Frame = {
    node: -1,
    nodeColors: Array(arr.length).fill(BLUE),
    linkColors: Array(arr.length - 1).fill(BLUE),
    dp: Array(arr.length).fill(null),
    pathSumMax: -10000,
  };

  const frame0 = cloneDeep(frameOriginal);
  const frames = [frame0];

  const root = array2TreeNode(arr) ?? new TreeNode(1);
  const treeData: D3Node[] = getTreeData(root);

  const ds = d3
    .stratify<D3Node>()
    .id((d) => d.child)
    .parentId((d) => d.parent)(treeData);

  const treeStruct = d3.tree<D3Node>().size([800, 400]);
  const dsInfo = treeStruct(ds);
  const nodes = dsInfo.descendants();
  const links = dsInfo.links();

  let pathSumMax = -100000;
  function dfs(node: TreeNode | null): number {
    if (node == null || node.id === -1) {
      return 0;
    }
    const nodeIndex = nodes.findIndex((data) => data.id === node.id.toString());
    frameOriginal.node = nodeIndex;
    const entryFrame = cloneDeep(frameOriginal);
    frames.push(entryFrame);

    const leftMax = Math.max(dfs(node.left), 0);
    if (node.left) {
      frameOriginal.node = nodeIndex;
      const reentryFrame = cloneDeep(frameOriginal);
      frames.push(reentryFrame);
    }

    const rightMax = Math.max(dfs(node.right), 0);
    const pathSum = leftMax + node.val + rightMax;
    pathSumMax = Math.max(pathSumMax, pathSum);
    const mathHalfPath = node.val + Math.max(leftMax, rightMax);

    frameOriginal.node = nodeIndex;
    frameOriginal.dp[nodeIndex] = mathHalfPath;

    frameOriginal.pathSumMax = pathSumMax;
    frameOriginal.nodeColors[nodeIndex] = GREEN;
    const leaveFrame = cloneDeep(frameOriginal);
    frames.push(leaveFrame);
    if (nodeIndex > 0) {
      frameOriginal.linkColors[nodeIndex - 1] = GREEN;
    }
    return mathHalfPath;
  }

  dfs(root);

  return { frames, nodes, links };
}

const result = getFrames(defaultData);
let frames = result.frames;
let nodes = result.nodes;
let links = result.links;

export default function Leetcode0124() {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [data, setData] = useState<(number | null)[]>(defaultData);

  const frame = frames[frameIndex];

  const tree1Circles = [];
  const tree1Texts = [];
  const dpRects = [];
  const dpTexts = [];
  const r = 50;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === '-1') {
      continue;
    }
    const node = nodes[i];
    const key = `tree1_node${i}`;
    tree1Circles.push(<circle key={key} cx={node.x} cy={node.y} r={r} fill={frame.nodeColors[i]}></circle>);
    const textKey = `tree1_text${i}`;
    tree1Texts.push(
      <text key={textKey} x={node.x} y={node.y}>
        {data[Number(node.id ?? '0')]}
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
  for (let i = 0; i < links.length; i++) {
    if (nodes[i + 1].id === '-1') {
      continue;
    }
    const l = links[i];
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

  const answerFont = {
    fontWeight: 'bold',
    fontSize: 60,
    fontFamily: 'Arial',
    fill: '#000',
  };

  useEffect(() => {
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

  const inputRef = useRef<HTMLInputElement>(null);
  function dataChangeClickHandler() {
    if (inputRef.current == null) {
      return;
    }

    let value = inputRef.current.value ?? '';
    value = value.replace(/\[/, '');
    value = value.replace(/\]/, '');
    const arr = value.split(',');
    const newData = [];
    for (const s of arr) {
      if (s.match(/^-?\d+$/)) {
        newData.push(Number(s));
      } else if (s == '') {
        newData.push(null);
      }
    }
    const result = getFrames(newData);
    frames = result.frames;
    nodes = result.nodes;
    links = result.links;
    setData(newData);
    setFrameIndex(0);
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
        <text x={450} y={100} style={answerFont}>
          Max Path: {frame.pathSumMax}
        </text>
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
