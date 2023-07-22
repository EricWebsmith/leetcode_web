import * as d3 from 'd3';
import cloneDeep from 'lodash/cloneDeep';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { D3Node, getTrieData } from '../Utils/d3helper';
import { TrieNode } from '../Utils/trie';
import ButtonBar from '../controls/ButtonBar';

const BLACK = 'black';
const WHITE = 'white';
const BLUE = 'blue';
const GREEN = 'green';
const RED = 'red';

const NODE_VOID = 0;
const NODE_CHAR = 1;
const NODE_WORD_END = 2;
const stateColors = [WHITE, BLUE, GREEN];
const ADD_WORD = 'addWord';

const defaultData = 'addWord bad, addWord dad, addWord mad, search pad, search bad, search .ad, search b..';
type Frame = {
  nodeIndices: number[];
  nodeStates: number[];
  operation: string;
  word: string;
  result: string;
};

function getFrames(data: string) {
  const operationsWithData = data.split(',');
  const operations: string[][] = [];
  const words: string[] = [];
  for (let od of operationsWithData) {
    od = od.trim();
    let [operation, word] = od.split(' ');
    operation = operation.trim();
    word = word.trim().toUpperCase();
    if (operation === ADD_WORD) {
      words.push(word);
    }
    operations.push([operation, word]);
  }

  const root = new TrieNode();
  for (const word of words) {
    TrieNode.insert(root, word);
  }

  const originalNodes = TrieNode.generateIds(root);

  const trieData: D3Node[] = getTrieData(root);

  const ds = d3
    .stratify<D3Node>()
    .id((d) => d.child)
    .parentId((d) => d.parent)(trieData);

  const treeStruct = d3.tree<D3Node>().size([400, 800]);
  const dsInfo = treeStruct(ds);
  const d3nodes = dsInfo.descendants();
  const d3links = dsInfo.links();

  const frameOriginal: Frame = {
    nodeIndices: [],
    nodeStates: Array(d3nodes.length).fill(NODE_VOID),
    operation: '',
    word: '',
    result: '',
  };
  frameOriginal.nodeStates[0] = NODE_CHAR;
  const frame0 = cloneDeep(frameOriginal);
  const frames = [frame0];

  function insert(word: string) {
    let current = originalNodes[0];
    for (let i = 0; i < word.length; i++) {
      const code = word.charCodeAt(i) - 'A'.charCodeAt(0);
      current = current.children[code] ?? new TrieNode();
      frameOriginal.nodeIndices = [current.id];
      frameOriginal.nodeStates[current.id] = Math.max(frameOriginal.nodeStates[current.id], NODE_CHAR);
      if (i === word.length - 1) {
        frameOriginal.nodeStates[current.id] = Math.max(frameOriginal.nodeStates[current.id], NODE_WORD_END);
      }

      const newFrame = cloneDeep(frameOriginal);
      frames.push(newFrame);
    }
  }

  function search(word: string) {
    let layer = [originalNodes[0]];
    for (let i = 0; i < word.length; i++) {
      if (layer.length == 0) {
        break;
      }

      const newLayer: TrieNode[] = [];
      frameOriginal.nodeIndices.length = 0;
      for (const node of layer) {
        if (word[i] === '.') {
          for (const subNode of node.children) {
            if (subNode !== null) {
              newLayer.push(subNode);
              frameOriginal.nodeIndices.push(subNode.id);
            }
          }
        } else {
          const code = word.charCodeAt(i) - 'A'.charCodeAt(0);
          const subNode = node?.children[code];
          if (subNode !== null) {
            newLayer.push(subNode);
            frameOriginal.nodeIndices.push(subNode.id);
          }
        }
      }
      layer = newLayer;

      if (layer.length === 0) {
        frameOriginal.result = 'NOT FOUND';
      }

      if (i === word.length - 1 && layer.find((node) => node.isWord)) {
        frameOriginal.result = 'FOUND';
      }
      const newFrame = cloneDeep(frameOriginal);
      frames.push(newFrame);
      frameOriginal.result = '';

      if (layer.length === 0) {
        break;
      }
    }
  }

  for (const [operation, word] of operations) {
    frameOriginal.operation = operation;
    frameOriginal.word = word;
    frameOriginal.nodeIndices = [0];
    const newFrame = cloneDeep(frameOriginal);
    frames.push(newFrame);
    switch (operation) {
      case ADD_WORD:
        insert(word);
        break;
      case 'search':
        search(word);
        break;
      default:
        break;
    }
  }

  return { originalNodes, frames, d3nodes, d3links };
}

const result = getFrames(defaultData);
let originalNodes = result.originalNodes;
let frames = result.frames;
let d3nodes = result.d3nodes;
let d3links = result.d3links;

export default function Leetcode0211() {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [data, setData] = useState<string>(defaultData);
  const frame = frames[frameIndex];

  const trieCircles = [];
  const focusCircles = [];
  const trieTexts = [];
  const r = 50;
  const currentStyle = { fill: 'none', stroke: 'red', strokeWidth: 10, strokeDasharray: '10' };
  for (let i = 0; i < d3nodes.length; i++) {
    const node = d3nodes[i];
    if (node.id?.startsWith('-')) {
      continue;
    }
    const key = `tree1_node${i}`;
    trieCircles.push(
      <circle key={key} cx={node.y} cy={node.x} r={r} fill={stateColors[frame.nodeStates[i]]}></circle>
    );
    if (frame.nodeIndices.includes(i)) {
      const focusKey = `tree1_node_focus_${i}`;
      focusCircles.push(<circle key={focusKey} cx={node.y} cy={node.x} r={r} style={currentStyle}></circle>);
    }

    const textKey = `tree1_text${i}`;
    trieTexts.push(
      <text key={textKey} x={node.y} y={node.x + 5}>
        {originalNodes[i].c}
      </text>
    );
  }

  const svgLines = [];
  for (let i = 0; i < d3links.length; i++) {
    const l = d3links[i];

    if (d3nodes[i + 1].id?.startsWith('-')) {
      continue;
    }
    const key = `tree1_link${i}`;
    svgLines.push(
      <line
        key={key}
        x1={l.source.y}
        y1={l.source.x}
        x2={l.target.y}
        y2={l.target.x}
        stroke={stateColors[frame.nodeStates[i + 1]]}
      />
    );
  }

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

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 80,
    fontFamily: 'Arial',
    fill: '#FFFFFF',
  };

  useEffect(() => {
    d3.select('#tree1').selectAll('text').style('dominant-baseline', 'middle').style('text-anchor', 'middle');
  }, [frameIndex]);

  const inputRef = useRef<HTMLInputElement>(null);
  function dataChangeClickHandler() {
    if (inputRef.current == null) {
      return;
    }

    const value = inputRef.current.value ?? '';
    const result = getFrames(value);
    originalNodes = result.originalNodes;
    frames = result.frames;
    d3nodes = result.d3nodes;
    d3links = result.d3links;
    setData(value);
    setFrameIndex(0);
  }

  let resultColor = BLACK;
  if (frame.result === 'FOUND') {
    resultColor = GREEN;
  } else if (frame.result === 'NOT FOUND') {
    resultColor = RED;
  }

  return (
    <>
      <svg id='svg' width={1100} height={650}>
        <g id='tree1' transform='translate(100, 50)'>
          <g style={{ stroke: 'blue', strokeWidth: 10 }}>{svgLines}</g>
          <g style={{ fill: 'blue' }}>{trieCircles}</g>

          <g style={textStyle}>{trieTexts}</g>
          <g>{focusCircles}</g>
        </g>
        <text x={100} y={630} style={{ fontSize: 60 }} fill={resultColor}>
          {frame.operation} {frame.word} {frame.result}
        </text>
      </svg>
      <ButtonBar setIndex={setIndex} />
      <div className='message'>
        <input ref={inputRef} defaultValue={data.toString()} style={{ width: 800 }}></input>
        <button className='btn' onClick={dataChangeClickHandler}>
          Change
        </button>
      </div>
    </>
  );
}
