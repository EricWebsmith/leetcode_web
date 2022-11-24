import * as _ from 'lodash';
import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgMatrix from '../controls/SvgMatrix';

const GREEN = 'green';

type Frame = {
  row: number;
  col: number;
  wordIndex: number;
  colorMatrix: string[][];
};

export default function Leetcode0000() {
  const [board, setBoard] = React.useState<string[][]>([
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ]);
  let rows = board.length;
  let cols = board[0].length;
  const [word, setWord] = React.useState<string>('SEE');
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const frameCurrent: Frame = { row: -1, col: -1, wordIndex: -1, colorMatrix: [] };

  function resetCurrentFrame(): void {
    frameCurrent.colorMatrix.length = 0;
    for (let row = 0; row < board.length; row++) {
      frameCurrent.colorMatrix.push(Array(board[0].length).fill(''));
    }
  }
  //resetCurrentFrame();

  const frames: Frame[] = [];
  // frames.push(_.cloneDeep(frameCurrent));

  const visiting: boolean[][] = Array(rows);
  for (let row = 0; row < rows; row++) {
    visiting[row] = Array(cols).fill(false);
  }

  function dfs(row: number, col: number, wordIndex: number): boolean {
    frameCurrent.row = row;
    frameCurrent.col = col;
    frameCurrent.wordIndex = wordIndex;

    if (row === -1 || row === rows || col === -1 || col === cols) {
      frames.push(_.cloneDeep(frameCurrent));
      return false;
    }

    if (board[row][col] !== word[wordIndex] || visiting[row][col]) {
      frames.push(_.cloneDeep(frameCurrent));
      return false;
    }

    visiting[row][col] = true;
    frameCurrent.colorMatrix[row][col] = GREEN;
    frames.push(_.cloneDeep(frameCurrent));
    // we return true betwen visiting.add and visiting .remove
    // because true is the end,
    // no need to clean up

    if (wordIndex === word.length - 1) {
      return true;
    }

    for (const [dr, dc] of [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ]) {
      if (dfs(row + dr, col + dc, wordIndex + 1)) {
        return true;
      }
    }

    visiting[row][col] = false;
    frameCurrent.colorMatrix[row][col] = '';
    frames.push(_.cloneDeep(frameCurrent));
    return false;
  }

  function search(): void {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (dfs(row, col, 0)) {
          return;
        }
      }
    }
  }

  const rectStyle = {
    fill: 'white',
    stroke: 'black',
  };

  const dpStyle = {
    fontWeight: 'bold',
    fontSize: 80,
    fontFamily: 'Arial',
    fill: '#000000',
  };

  const offset = 100;

  function getFrames(): void {
    resetCurrentFrame();
    frames.length = 0;
    frames.push(_.cloneDeep(frameCurrent));
    search();
  }

  React.useEffect(() => {
    rows = board.length;
    cols = board[0].length;
    getFrames();
  }, [board, word]);

  if (frames.length === 0) {
    getFrames();
  }

  const boardInputRef = React.useRef<HTMLInputElement>(null);
  const wordInputRef = React.useRef<HTMLInputElement>(null);

  function dataChangeClickHandler() {
    if (boardInputRef.current == null || wordInputRef.current == null) {
      return;
    }
    setFrameIndex(0);
    const newBoard = JSON.parse(boardInputRef.current.value);
    setBoard(newBoard);
    const newWord = wordInputRef.current.value;
    setWord(newWord);
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

  return (
    <>
      <svg id='svg' width={1100} height={400}>
        <SvgMatrix
          x={100}
          y={50}
          m={3}
          n={4}
          height={offset}
          width={offset}
          rectStyle={rectStyle}
          textStyle={dpStyle}
          textArr={board}
          colorMatrix={frames[frameIndex].colorMatrix}
        />
        <rect
          x={100 + frames[frameIndex].col * offset}
          y={50 + frames[frameIndex].row * offset}
          height={offset}
          width={offset}
          style={{
            stroke: 'red',
            strokeDasharray: '10 10',
            strokeWidth: 10,
            fill: 'none',
          }}></rect>
      </svg>

      <ButtonBar setIndex={setIndex} />
      <div style={{ paddingLeft: 100 }}>
        <label>Board: </label>
        <input
          ref={boardInputRef}
          defaultValue={'[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]'}
          style={{ width: 480 }}></input>
        &nbsp;
        <label>Word: </label>
        <input ref={wordInputRef} defaultValue={'SEE'} style={{ width: 100 }}></input>
        <button className='btn' onClick={dataChangeClickHandler}>
          Change
        </button>
      </div>
    </>
  );
}
