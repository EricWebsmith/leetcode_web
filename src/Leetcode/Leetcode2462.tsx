import React, { SetStateAction, useEffect } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';
import html from '../Utils/html';

const UNSEEN = 0;
const SEEN = 1;
const HIRED = 2;

const frames = [
  [SEEN, SEEN, UNSEEN, UNSEEN, UNSEEN, UNSEEN, UNSEEN, SEEN, SEEN],
  [SEEN, HIRED, SEEN, UNSEEN, UNSEEN, UNSEEN, UNSEEN, SEEN, SEEN],
  [SEEN, HIRED, SEEN, UNSEEN, UNSEEN, UNSEEN, SEEN, SEEN, HIRED],
  [SEEN, HIRED, SEEN, UNSEEN, UNSEEN, SEEN, HIRED, SEEN, HIRED],
];

const colorDict = new Map();
colorDict.set(UNSEEN, 'black');
colorDict.set(SEEN, 'blue');
colorDict.set(HIRED, 'green');
const textColorDict = new Map();
textColorDict.set(UNSEEN, 'black');
textColorDict.set(SEEN, 'white');
textColorDict.set(HIRED, 'white');

export default function Leetcode2462() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const frame = frames[frameIndex];

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

  const rectStyle = {
    fill: 'blue',
  };

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 80,
    fontFamily: 'Arial',
    fill: '#FFFFFF',
  };

  const offset = 100;
  const rectsRef = React.useRef<SVGGElement>(null);
  const textsRef = React.useRef<SVGGElement>(null);

  useEffect(() => {
    const rects = html.getChildrenFromRef<SVGRectElement>(rectsRef);
    const texts = html.getChildrenFromRef<SVGRectElement>(textsRef);
    for (let i = 0; i < rects.length; i++) {
      rects[i].setAttribute('fill', colorDict.get(frame[i]) ?? 'blue');
      texts[i].setAttribute('fill', textColorDict.get(frame[i]) ?? 'blue');
    }
  }, [frameIndex]);

  return (
    <>
      <svg id='svg' width={1100} height={300}>
        <SvgRects
          ref={rectsRef}
          x={80}
          y={75}
          height={90}
          width={90}
          n={9}
          offsetX={offset}
          style={rectStyle}></SvgRects>
        <SvgTexts
          ref={textsRef}
          x={105}
          y={150}
          text={'729202192'}
          offsetX={offset}
          style={textStyle}></SvgTexts>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
