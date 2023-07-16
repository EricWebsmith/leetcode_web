import * as d3 from 'd3';
import cloneDeep from 'lodash/cloneDeep';
import React, { SetStateAction } from 'react';
import { D3Node, getTrieData } from '../Utils/d3helper';
import * as strEx from '../Utils/stringUtil';
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
  preNodeIndices: number[];
  preNodeStates: number[];
  postNodeIndices: number[];
  postNodeStates: number[];
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

  const prefix = new TrieNode();
  const postfix = new TrieNode();
  for (const word of words) {
    TrieNode.insert(prefix, word);
    const chars = word.split('');
    chars.reverse();
    const reversedWord = chars.join('');
    TrieNode.insert(postfix, reversedWord);
  }

  const preNodes = TrieNode.generateIds(prefix);
  const postNodes = TrieNode.generateIds(postfix);

  const preTrieData: D3Node[] = getTrieData(prefix);
  const postTrieData: D3Node[] = getTrieData(postfix);

  const preDs = d3
    .stratify<D3Node>()
    .id((d) => d.child)
    .parentId((d) => d.parent)(preTrieData);

  const preStruct = d3.tree<D3Node>().size([400, 400]);
  const preInfo = preStruct(preDs);
  const preD3Nodes = preInfo.descendants();
  const preD3Links = preInfo.links();

  const postDs = d3
    .stratify<D3Node>()
    .id((d) => d.child)
    .parentId((d) => d.parent)(postTrieData);

  const postStruct = d3.tree<D3Node>().size([400, 400]);
  const postInfo = postStruct(postDs);
  const postD3Nodes = postInfo.descendants();
  const postD3Links = postInfo.links();

  const frameOriginal: Frame = {
    preNodeIndices: [],
    preNodeStates: Array(preD3Nodes.length).fill(NODE_VOID),
    postNodeIndices: [],
    postNodeStates: Array(preD3Nodes.length).fill(NODE_VOID),
    operation: '',
    word: '',
    result: '',
  };
  frameOriginal.preNodeStates[0] = NODE_CHAR;
  frameOriginal.postNodeStates[0] = NODE_CHAR;
  const frame0 = cloneDeep(frameOriginal);
  const frames = [frame0];

  function insert(word: string) {
    const n = word.length;
    let current = preNodes[0];
    for (let i = 0; i < n; i++) {
      const code = word.charCodeAt(i) - 'A'.charCodeAt(0);
      current = current.children[code] ?? new TrieNode();
      frameOriginal.preNodeIndices = [current.id];
      frameOriginal.preNodeStates[current.id] = Math.max(frameOriginal.preNodeStates[current.id], NODE_CHAR);
      if (i === n - 1) {
        frameOriginal.preNodeStates[current.id] = Math.max(
          frameOriginal.preNodeStates[current.id],
          NODE_WORD_END
        );
      }

      const newFrame = cloneDeep(frameOriginal);
      frames.push(newFrame);
    }

    current = postNodes[0];
    for (let i = 0; i < n; i++) {
      const code = word.charCodeAt(n - 1 - i) - 'A'.charCodeAt(0);
      current = current.children[code] ?? new TrieNode();
      frameOriginal.postNodeIndices = [current.id];
      frameOriginal.postNodeStates[current.id] = Math.max(
        frameOriginal.postNodeStates[current.id],
        NODE_CHAR
      );
      if (i === word.length - 1) {
        frameOriginal.postNodeStates[current.id] = Math.max(
          frameOriginal.postNodeStates[current.id],
          NODE_WORD_END
        );
      }

      const newFrame = cloneDeep(frameOriginal);
      frames.push(newFrame);
    }
  }

  function search(word: string) {
    const n = word.length;

    let index = 0;
    let usePrefix = true;
    while (index < n >> 1) {
      if (word[index] === '.' && word[n - 1 - index] !== '.') {
        usePrefix = false;
        break;
      }
      if (word[index] !== '.' && word[n - 1 - index] === '.') {
        usePrefix = true;
        break;
      }
      index++;
    }

    frameOriginal.preNodeIndices.length = 0;
    frameOriginal.postNodeIndices.length = 0;
    const indices = usePrefix ? frameOriginal.preNodeIndices : frameOriginal.postNodeIndices;
    let layer = [preNodes[0]];

    if (!usePrefix) {
      layer = [postNodes[0]];
      word = strEx.reverse(word);
    }

    for (let i = 0; i < n; i++) {
      if (layer.length == 0) {
        break;
      }
      indices.length = 0;
      const newLayer: TrieNode[] = [];
      for (const node of layer) {
        if (word[i] === '.') {
          for (const subNode of node.children) {
            if (subNode !== null) {
              newLayer.push(subNode);
              indices.push(subNode.id);
            }
          }
        } else {
          const code = word.charCodeAt(i) - 'A'.charCodeAt(0);
          const subNode = node?.children[code];
          if (subNode !== null) {
            newLayer.push(subNode);
            indices.push(subNode.id);
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
    frameOriginal.preNodeIndices = [0];
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

  return { frames, preNodes, preD3Nodes, preD3Links, postNodes, postD3Nodes, postD3Links };
}

const result = getFrames(defaultData);
let frames = result.frames;
let preNodes = result.preNodes;
let preD3Nodes = result.preD3Nodes;
let preD3Links = result.preD3Links;
let postNodes = result.postNodes;
let postD3Nodes = result.postD3Nodes;
let postD3Links = result.postD3Links;

export default function Leetcode0211() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const [data, setData] = React.useState<string>(defaultData);
  const frame = frames[frameIndex];

  const r = 50;
  const currentStyle = { fill: 'none', stroke: 'red', strokeWidth: 10, strokeDasharray: '10' };

  // prefix tree
  const preTrieCircles = [];
  const preFocusCircles = [];
  const preTrieTexts = [];

  for (let i = 0; i < preD3Nodes.length; i++) {
    const node = preD3Nodes[i];
    if (node.id?.startsWith('-')) {
      continue;
    }
    const key = `pre_node${i}`;
    preTrieCircles.push(
      <circle key={key} cx={node.y} cy={node.x} r={r} fill={stateColors[frame.preNodeStates[i]]}></circle>
    );
    if (frame.preNodeIndices.includes(i)) {
      const focusKey = `pre_node_focus_${i}`;
      preFocusCircles.push(
        <circle key={focusKey} cx={node.y} cy={node.x} r={r} style={currentStyle}></circle>
      );
    }

    const textKey = `pre_text${i}`;
    preTrieTexts.push(
      <text key={textKey} x={node.y} y={node.x + 5}>
        {preNodes[i].c}
      </text>
    );
  }

  const preLines = [];
  for (let i = 0; i < preD3Links.length; i++) {
    const l = preD3Links[i];

    if (preD3Nodes[i + 1].id?.startsWith('-')) {
      continue;
    }
    const key = `pre_link${i}`;
    preLines.push(
      <line
        key={key}
        x1={l.source.y}
        y1={l.source.x}
        x2={l.target.y}
        y2={l.target.x}
        stroke={stateColors[frame.preNodeStates[i + 1]]}
      />
    );
  }

  // postfix tree
  const postTrieCircles = [];
  const postFocusCircles = [];
  const postTrieTexts = [];

  for (let i = 0; i < postD3Nodes.length; i++) {
    const node = postD3Nodes[i];
    if (node.id?.startsWith('-')) {
      continue;
    }
    const key = `post_node${i}`;
    postTrieCircles.push(
      <circle key={key} cx={node.y} cy={node.x} r={r} fill={stateColors[frame.postNodeStates[i]]}></circle>
    );
    if (frame.postNodeIndices.includes(i)) {
      const focusKey = `post_node_focus_${i}`;
      postFocusCircles.push(
        <circle key={focusKey} cx={node.y} cy={node.x} r={r} style={currentStyle}></circle>
      );
    }

    const textKey = `post_text${i}`;
    postTrieTexts.push(
      <text key={textKey} x={node.y} y={node.x + 5}>
        {postNodes[i].c}
      </text>
    );
  }

  const postLines = [];
  for (let i = 0; i < postD3Links.length; i++) {
    const l = postD3Links[i];

    if (postD3Nodes[i + 1].id?.startsWith('-')) {
      continue;
    }
    const key = `post_link${i}`;
    postLines.push(
      <line
        key={key}
        x1={l.source.y}
        y1={l.source.x}
        x2={l.target.y}
        y2={l.target.x}
        stroke={stateColors[frame.postNodeStates[i + 1]]}
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
    d3.select('#pre').selectAll('text').style('dominant-baseline', 'middle').style('text-anchor', 'middle');
    d3.select('#post').selectAll('text').style('dominant-baseline', 'middle').style('text-anchor', 'middle');
  }, [frameIndex]);

  const inputRef = React.useRef<HTMLInputElement>(null);
  function dataChangeClickHandler() {
    if (inputRef.current == null) {
      return;
    }

    const value = inputRef.current.value ?? '';
    const result = getFrames(value);
    preNodes = result.preNodes;
    frames = result.frames;
    preD3Nodes = result.preD3Nodes;
    preD3Links = result.preD3Links;
    postNodes = result.postNodes;
    postD3Nodes = result.postD3Nodes;
    postD3Links = result.postD3Links;
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
        <g id='pre' transform='translate(100, 50)'>
          <g style={{ stroke: 'blue', strokeWidth: 10 }}>{preLines}</g>
          <g style={{ fill: 'blue' }}>{preTrieCircles}</g>

          <g style={textStyle}>{preTrieTexts}</g>
          <g>{preFocusCircles}</g>
        </g>
        <g id='post' transform='translate(650, 50)'>
          <g style={{ stroke: 'blue', strokeWidth: 10 }}>{postLines}</g>
          <g style={{ fill: 'blue' }}>{postTrieCircles}</g>

          <g style={textStyle}>{postTrieTexts}</g>
          <g>{postFocusCircles}</g>
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
