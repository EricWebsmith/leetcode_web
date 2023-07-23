import { SetStateAction, useEffect, useRef, useState } from 'react';
import { getChildrenFromRef } from '../Utils/html';
import ButtonBar from '../controls/ButtonBar';

const RED = 'red';
const GREEN = 'green';
const BLUE = 'blue';
const BLACK = 'black';

type Frame = {
  current: number;
  pointer1Color: typeof RED | typeof GREEN;
  pointer2Color: typeof RED | typeof GREEN;
};

export default function Leetcode0091() {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const pointer1 = useRef<SVGPathElement>(null);
  const pointer2 = useRef<SVGPathElement>(null);
  const head1 = useRef<SVGMarkerElement>(null);
  const head2 = useRef<SVGMarkerElement>(null);
  const rectContainer = useRef<SVGGElement>(null);
  const dpContainer = useRef<SVGGElement>(null);

  const frames: Frame[] = [
    { current: 0, pointer1Color: 'green', pointer2Color: 'red' },
    { current: 1, pointer1Color: 'green', pointer2Color: 'green' },
    { current: 2, pointer1Color: 'red', pointer2Color: 'green' },
    { current: 3, pointer1Color: 'green', pointer2Color: 'red' },
    { current: 4, pointer1Color: 'green', pointer2Color: 'green' },
  ];

  const frame = frames[frameIndex];

  useEffect(() => {
    if (pointer1.current == null || pointer2.current == null) {
      return;
    }

    pointer1.current.setAttribute('transform', `translate(${frame.current * 100}, 0)`);
    pointer2.current.setAttribute('transform', `translate(${frame.current * 100}, 0)`);
    pointer1.current.setAttribute('stroke', frame.pointer1Color);
    pointer2.current.setAttribute('stroke', frame.pointer2Color);

    if (head1.current == null || head2.current == null) {
      return;
    }

    head1.current.setAttribute('fill', frame.pointer1Color);
    head2.current.setAttribute('fill', frame.pointer2Color);

    // DP
    if (dpContainer.current == null) {
      return;
    }

    let index = 0;
    for (const t of dpContainer.current.children) {
      if (index < frame.current + 3) {
        t.setAttribute('opacity', '1');
      } else {
        t.setAttribute('opacity', '0');
      }
      index++;
    }

    const dpRects: Element[] = getChildrenFromRef(dpContainer);
    for (const dpRect of dpRects) {
      dpRect.setAttribute('fill', BLACK);
    }
    dpRects[frame.current + 1].setAttribute('fill', frame.pointer1Color);
    dpRects[frame.current].setAttribute('fill', frame.pointer2Color);
  }, [frameIndex]);

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

  function hanldePointer1MouseEnter() {
    const rects: Element[] = getChildrenFromRef(rectContainer);
    if (rects.length > frame.current + 1) {
      rects[frame.current + 1].setAttribute('fill', frame.pointer1Color);
    }
  }

  function hanldePointer2MouseEnter() {
    const rects: Element[] = getChildrenFromRef(rectContainer);
    if (rects.length > frame.current + 1) {
      rects[frame.current].setAttribute('fill', frame.pointer2Color);
      rects[frame.current + 1].setAttribute('fill', frame.pointer2Color);
    }
  }

  function hanldePointersMouseLeave() {
    const rects: Element[] = getChildrenFromRef(rectContainer);
    for (const rect of rects) {
      rect.setAttribute('fill', BLUE);
    }
  }

  const pointerStyle = {
    fill: 'none',
    paintOrder: 'fill markers stroke',
    strokeWidth: '15',
  };

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 60,
    fontFamily: 'Arial',
    fill: '#FFFFFF',
    strokeWidth: 0.5,
  };

  const dpStyle = {
    fontWeight: 'bold',
    fontSize: 45,
    fontFamily: 'Arial',
    fill: '#000000',
    strokeWidth: 0.5,
  };

  return (
    <>
      <svg id='svg' width={950} height={450} transform='translate(100, 0)'>
        <defs>
          <marker ref={head1} id='arrow-head-1' markerWidth='2.595' orient='auto' refX='0.3' refY='1.3'>
            <path transform='scale(.25) translate(-1,-1)' d='M2,2 L2,11 L10,6 L2,2' />
          </marker>
          <marker ref={head2} id='arrow-head-2' markerWidth='2.595' orient='auto' refX='0.3' refY='1.3'>
            <path transform='scale(.25) translate(-1,-1)' d='M2,2 L2,11 L10,6 L2,2' />
          </marker>
        </defs>
        <g transform='translate(0, 10)'>
          <path
            style={pointerStyle}
            d='m 56.435202,174.88134 c 17.207537,-34.6989 34.415072,-69.39779 68.095798,-87.310487 33.68072,-17.912695 83.82853,-19.0372 114.39395,-4.969825 30.56541,14.067376 41.54357,43.324292 52.52147,72.580522'
            id='pointer2'
            ref={pointer2}
            markerEnd='url(#arrow-head-2)'
            onMouseEnter={hanldePointer2MouseEnter}
            onMouseLeave={hanldePointersMouseLeave}
          />
          <path
            style={pointerStyle}
            d='m 156.3687,175.46944 c 7.63285,-20.93607 15.26571,-41.87214 29.87951,-52.81021 14.61381,-10.93807 36.20612,-11.87687 49.93667,-5.18708 13.73055,6.68979 19.59814,21.00672 25.46549,35.32305'
            id='pointer1'
            ref={pointer1}
            markerEnd='url(#arrow-head-1)'
            onMouseEnter={hanldePointer1MouseEnter}
            onMouseLeave={hanldePointersMouseLeave}
          />
        </g>

        <g ref={rectContainer} fill={BLUE}>
          <rect x={140} y={190} height='80' width='80'></rect>
          <rect x={240} y={190} height='80' width='80'></rect>
          <rect x={340} y={190} height='80' width='80'></rect>
          <rect x={440} y={190} height='80' width='80'></rect>
          <rect x={540} y={190} height='80' width='80'></rect>
          <rect x={640} y={190} height='80' width='80'></rect>
        </g>
        {/* prettier-ignore */}
        <g style={textStyle}>
          <text x='165' y='250'>3</text>
          <text x='265' y='250'>2</text>
          <text x='365' y='250'>1</text>
          <text x='465' y='250'>0</text>
          <text x='565' y='250'>1</text>
          <text x='665' y='250'>2</text>
        </g>
        {/* prettier-ignore */}
        <g ref={dpContainer} style={dpStyle}>
          <text x='65' y='320'>1</text>
          <text x='165' y='320'>1</text>
          <text x='265' y='320'>1</text>
          <text x='365' y='320'>2</text>
          <text x='465' y='320'>1</text>
          <text x='565' y='320'>1</text>
          <text x='665' y='320'>2</text>
        </g>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
