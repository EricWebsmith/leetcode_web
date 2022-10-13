import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';

type Frame = {
  start: number;
  end: number;
  layer: number;
  displays?: string[];
  textDict?: Map<string, string>;
};

export default function Leetcode0732() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);

  const frames: Frame[] = [
    { start: -1, end: -1, layer: 1, displays: ['node_0_60'] },
    { start: 10, end: 20, layer: 1 },
    { start: 10, end: 20, layer: 1, displays: ['node_0_10', 'node_10_60'] },
    { start: 10, end: 20, layer: 2 },
    { start: 10, end: 20, layer: 2, displays: ['node_10_20', 'node_20_60'] },
    { start: 10, end: 20, layer: 3, displays: ['node_10_20', 'node_20_60'] },
    { start: 10, end: 20, layer: 4, textDict: new Map([['text_10_20', '1']]) },
    { start: 50, end: 60, layer: 1 },
    { start: 50, end: 60, layer: 2 },
    { start: 50, end: 60, layer: 3 },
    { start: 50, end: 60, layer: 3, displays: ['node_20_50', 'node_50_60'] },
    { start: 50, end: 60, layer: 4 },
    { start: 50, end: 60, layer: 5, textDict: new Map([['text_50_60', '1']]) },
    { start: 10, end: 40, layer: 1 },
    { start: 10, end: 40, layer: 2 },
    { start: 10, end: 40, layer: 3 },
    { start: 10, end: 40, layer: 4, textDict: new Map([['text_10_20', '2']]) },
    { start: 10, end: 40, layer: 4, displays: ['node_20_40', 'node_40_50'] },
    { start: 10, end: 40, layer: 5 },
    { start: 10, end: 40, layer: 6, textDict: new Map([['text_20_40', '1']]) },
    { start: 5, end: 15, layer: 1 },
    { start: 5, end: 15, layer: 2 },
    { start: 5, end: 15, layer: 2, displays: ['node_0_5', 'node_5_10'] },
    { start: 5, end: 15, layer: 3 },
    { start: 5, end: 15, layer: 3, displays: ['node_10_15', 'node_15_20'] },
    { start: 5, end: 15, layer: 4, textDict: new Map([['text_5_10', '1']]) },
    { start: 5, end: 15, layer: 5, textDict: new Map([['text_10_15', '3']]) },
    { start: 5, end: 10, layer: 1 },
    { start: 5, end: 10, layer: 2 },
    { start: 5, end: 10, layer: 3 },
    { start: 5, end: 10, layer: 4, textDict: new Map([['text_5_10', '2']]) },
    { start: 25, end: 55, layer: 1 },
    { start: 25, end: 55, layer: 2 },
    { start: 25, end: 55, layer: 3 },
    { start: 25, end: 55, layer: 4 },
    { start: 25, end: 55, layer: 4, displays: ['node_50_55', 'node_55_60'] },
    { start: 25, end: 55, layer: 5 },
    { start: 25, end: 55, layer: 5, displays: ['node_20_25', 'node_25_40'] },
    {
      start: 25,
      end: 55,
      layer: 6,
      textDict: new Map([
        ['text_40_50', '1'],
        ['text_50_55', '2'],
      ]),
    },
    { start: -1, end: 55, layer: 5, textDict: new Map([['text_25_40', '2']]) },
  ];

  const svg = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    // reset
    if (svg.current == null) {
      return;
    }

    for (const child of svg.current.children) {
      child.setAttribute('display', 'none');
      if (child.tagName == 'text') {
        (child as SVGTextElement).innerHTML = '';
      }
    }

    const displays = [];
    const textDict: Map<string, string> = new Map<string, string>();
    for (let i = 0; i <= frameIndex; i++) {
      displays.push(...(frames[i].displays ?? []));
      if (frames[i].textDict) {
        const dict = frames[i].textDict ?? new Map<string, string>();
        for (const [k, v] of dict) {
          textDict.set(k, v);
        }
      }
    }

    // display
    for (const id of displays) {
      const e = document.getElementById(id);
      if (e == null) {
        continue;
      }
      e.setAttribute('display', 'block');
    }

    // text values
    for (const [k, v] of textDict) {
      const e = document.getElementById(k);
      if (e != null) {
        e.setAttribute('display', 'block');
        e.innerHTML = v;
      }
    }

    // mask
    const mask = document.getElementById('mask');
    if (mask == null) {
      return;
    }

    const frame = frames[frameIndex];
    mask.setAttribute('display', '0');
    mask.setAttribute('x', '0');
    mask.setAttribute('y', '0');
    mask.setAttribute('width', '0');
    if (frame.start >= 0) {
      const x = 100 - 2 + frame.start * 10;
      const y = frame.layer * 50 - 2;
      const width = (frame.end - frame.start) * 10 + 5;
      mask.setAttribute('display', 'bloack');
      mask.setAttribute('x', x.toString());
      mask.setAttribute('y', y.toString());
      mask.setAttribute('width', width.toString());
    }
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

  const rectStyleMask = { fill: '#888888', opacity: 0.5, stroke: 'black' };
  const rectStyleRed = { fill: '#ff0000' };
  const rectStyleGreen = { fill: '#30e027' };
  const rectStyleBlue = { fill: '#0000ff' };
  const rectStyleYellow = { fill: '#ffff00' };
  const rectStyleCyan = { fill: '#00ffff' };
  const rectStyleMegenta = { fill: '#ff00ff' };

  const textStyle = {
    fontStyle: 'normal',
    fontSize: 42,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: '#ffffff',
  };

  return (
    <>
      <svg
        id='svg'
        ref={svg}
        width={950}
        height={500}
        viewBox='50 0 650 400'
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}>
        {/* Layer 1 */}
        <rect style={rectStyleRed} id='node_0_60' width='600' height='50' x='100' y='50' />

        {/* Layer 2 */}
        <rect style={rectStyleYellow} id='node_0_10' width='100' height='50' x='100' y='100' />
        <rect style={rectStyleBlue} id='node_10_60' width='500' height='50' x='200' y='100' />
        {/* Layer 3 */}
        <rect style={rectStyleCyan} id='node_0_5' width='50' height='50' x='100' y='150' />
        <rect style={rectStyleRed} id='node_5_10' width='50' height='50' x='150' y='150' />
        <rect style={rectStyleGreen} id='node_10_20' width='100' height='50' x='200' y='150' />
        <rect style={rectStyleCyan} id='node_20_60' width='400' height='50' x='300' y='150' />

        <text style={textStyle} x='165' y='190' id='text_5_10'>
          1
        </text>
        <text style={textStyle} x='240' y='190' id='text_10_20'>
          2
        </text>

        {/* Layer 4 */}

        <rect style={rectStyleYellow} id='node_0_5' width='50' height='50' x='100' y='200' />
        <rect style={rectStyleGreen} id='node_5_10' width='50' height='50' x='150' y='200' />
        <rect style={rectStyleBlue} id='node_10_15' width='50' height='50' x='200' y='200' />
        <rect style={rectStyleCyan} id='node_15_20' width='50' height='50' x='250' y='200' />
        <rect style={rectStyleMegenta} id='node_20_50' width='300' height='50' x='300' y='200' />
        <rect style={rectStyleBlue} id='node_50_60' width='100' height='50' x='600' y='200' />
        <text style={textStyle} x='215' y='240' id='text_10_15'>
          2
        </text>
        <text style={textStyle} x='635' y='240' id='text_50_60'>
          1
        </text>

        {/* Layer 5 */}
        <rect style={rectStyleGreen} id='node_20_40' width='200' height='50' x='300' y='250' />
        <rect style={rectStyleRed} id='node_40_50' width='100' height='50' x='500' y='250' />
        <rect style={rectStyleCyan} id='node_50_55' width='50' height='50' x='600' y='250' />
        <rect style={rectStyleMegenta} id='node_55_60' width='50' height='50' x='650' y='250' />

        <text style={textStyle} x='390' y='290' id='text_20_40'>
          1
        </text>

        <text style={textStyle} x='535' y='290' id='text_40_50'>
          1
        </text>
        <text style={textStyle} x='615' y='290' id='text_50_55'>
          1
        </text>
        {/* Layer 6 */}
        <rect style={rectStyleCyan} id='node_25_40' width='50' height='50' x='300' y='300' />
        <rect style={rectStyleMegenta} id='node_20_25' width='150' height='50' x='350' y='300' />
        <text style={textStyle} x='415' y='340' id='text_25_40'>
          2
        </text>

        <rect style={rectStyleMask} id='mask' width='105' height='55' x='198' y='48' />
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
