import * as d3 from 'd3';
import * as _ from 'lodash';
import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import { D3Node, getTrieData } from '../Utils/d3helper';
import { TrieNode } from '../Utils/trie';

const BLACK = 'black';
const WHITE = 'white';
const BLUE = 'blue';
const GREEN = 'green';
const RED = 'red';

const NODE_VOID = 0;
const NODE_CHAR = 1;
const NODE_WORD_END = 2;
const stateColors = [WHITE, BLUE, GREEN];

const defaultData =
  'insert eric, search eric, insert websmith, startsWith web, search web, insert web, search web';
type Frame = {
  charIndex: number;
  nodeIndex: number;
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
    console.log(`{${operation} ${word}}`);
    if (operation === 'insert') {
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

  const treeStruct = d3.tree<D3Node>().size([350, 900]);
  const dsInfo = treeStruct(ds);
  const d3nodes = dsInfo.descendants();
  const d3links = dsInfo.links();

  const frameOriginal: Frame = {
    nodeIndex: -1,
    charIndex: -1,
    nodeStates: Array(d3nodes.length).fill(NODE_VOID),
    operation: '',
    word: '',
    result: '',
  };
  frameOriginal.nodeStates[0] = NODE_CHAR;
  const frame0 = _.cloneDeep(frameOriginal);
  const frames = [frame0];

  function insert(word: string) {
    let current = originalNodes[0];
    for (let i = 0; i < word.length; i++) {
      const code = word.charCodeAt(i) - 'A'.charCodeAt(0);
      current = current.children[code] ?? new TrieNode();
      frameOriginal.nodeIndex = current.id;
      frameOriginal.nodeStates[current.id] = Math.max(frameOriginal.nodeStates[current.id], NODE_CHAR);
      if (i === word.length - 1) {
        frameOriginal.nodeStates[current.id] = Math.max(frameOriginal.nodeStates[current.id], NODE_WORD_END);
      }

      const newFrame = _.cloneDeep(frameOriginal);
      frames.push(newFrame);
    }
  }

  function search(word: string) {
    let current: TrieNode | null = originalNodes[0];
    for (let i = 0; i < word.length; i++) {
      if (current === null) {
        break;
      }

      const code = word.charCodeAt(i) - 'A'.charCodeAt(0);
      current = current?.children[code];
      if (current !== null && frameOriginal.nodeStates[current.id] !== NODE_VOID) {
        frameOriginal.nodeIndex = current.id;
      }
      let state = NODE_VOID;
      if (current !== null) {
        state = frameOriginal.nodeStates[current.id];
      }

      const notFound = state === NODE_VOID || (i === word.length - 1 && state !== NODE_WORD_END);
      if (notFound) {
        frameOriginal.result = 'NOT FOUND';
        const newFrame = _.cloneDeep(frameOriginal);
        frames.push(newFrame);
        frameOriginal.result = '';
        return;
      }

      if (current !== null && i === word.length - 1 && state === NODE_WORD_END)
        frameOriginal.nodeIndex = current.id;
      if (i === word.length - 1) {
        frameOriginal.result = 'FOUND';
      }
      const newFrame = _.cloneDeep(frameOriginal);
      frames.push(newFrame);
      frameOriginal.result = '';
    }
  }

  function startsWith(word: string) {
    let current: TrieNode | null = originalNodes[0];
    for (let i = 0; i < word.length; i++) {
      if (current === null) {
        break;
      }

      const code = word.charCodeAt(i) - 'A'.charCodeAt(0);
      current = current?.children[code];
      if (current !== null && frameOriginal.nodeStates[current.id] !== NODE_VOID) {
        frameOriginal.nodeIndex = current.id;
      }
      let state = NODE_VOID;
      if (current !== null) {
        state = frameOriginal.nodeStates[current.id];
      }

      const notFound = state === NODE_VOID;
      if (notFound) {
        frameOriginal.result = 'NOT FOUND';
        const newFrame = _.cloneDeep(frameOriginal);
        frames.push(newFrame);
        frameOriginal.result = '';
        return;
      }

      if (current !== null && i === word.length - 1) frameOriginal.nodeIndex = current.id;
      if (i === word.length - 1) {
        frameOriginal.result = 'FOUND';
      }
      const newFrame = _.cloneDeep(frameOriginal);
      frames.push(newFrame);
      frameOriginal.result = '';
    }
  }

  for (const [operation, word] of operations) {
    frameOriginal.operation = operation;
    frameOriginal.word = word;
    frameOriginal.nodeIndex = 0;
    const newFrame = _.cloneDeep(frameOriginal);
    frames.push(newFrame);
    switch (operation) {
      case 'insert':
        insert(word);
        break;
      case 'search':
        search(word);
        break;
      case 'startsWith':
        startsWith(word);
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

export default function Leetcode0208() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const [data, setData] = React.useState<string>(defaultData);
  const frame = frames[frameIndex];

  const trieCircles = [];
  const trieTexts = [];
  const r = 50;
  for (let i = 0; i < d3nodes.length; i++) {
    const node = d3nodes[i];
    if (node.id?.startsWith('-')) {
      continue;
    }
    const key = `tree1_node${i}`;
    trieCircles.push(
      <circle key={key} cx={node.y} cy={node.x} r={r} fill={stateColors[frame.nodeStates[i]]}></circle>
    );
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

  React.useEffect(() => {
    d3.select('#tree1').selectAll('text').style('dominant-baseline', 'middle').style('text-anchor', 'middle');
  }, [frameIndex]);

  const inputRef = React.useRef<HTMLInputElement>(null);
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

  let currentX = -200;
  let currentY = -200;
  if (frame.nodeIndex >= 0) {
    currentX = d3nodes[frame.nodeIndex].y;
    currentY = d3nodes[frame.nodeIndex].x;
  }
  const currentStyle = { fill: 'none', stroke: 'red', strokeWidth: 10, strokeDasharray: '10' };
  let resultColor = BLACK;
  if (frame.result === 'FOUND') {
    resultColor = GREEN;
  } else if (frame.result === 'NOT FOUND') {
    resultColor = RED;
  }

  return (
    <>
      <svg id='svg' width={1100} height={500}>
        <g id='tree1' transform='translate(100, 50)'>
          <g style={{ stroke: 'blue', strokeWidth: 10 }}>{svgLines}</g>
          <g style={{ fill: 'blue' }}>{trieCircles}</g>

          <g style={textStyle}>{trieTexts}</g>
          <circle cx={currentX} cy={currentY} r={50} style={currentStyle}></circle>
        </g>
        <text x={100} y={480} style={{ fontSize: 60 }} fill={resultColor}>
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
