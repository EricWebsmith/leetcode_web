import React from 'react';

interface Props {
  text?: string;
  x: number;
  y: number;
  offsetX?: number;
  offsetY?: number;
  style: object;
  step?: number;
  spaceOffset?: number;
}

const Texts = React.forwardRef((props: Props, ref: React.ForwardedRef<SVGGElement>) => {
  if (props.text == null) {
    return <></>;
  }
  const texts = [];
  const step = props.step ?? 1;
  const offsetX = props.offsetX ?? 0;
  const offsetY = props.offsetY ?? 0;
  const spaceOffset = props.spaceOffset ?? 1;
  for (let i = 0; i < props.text.length / step; i++) {
    const s = props.text.substring(i * step, i * step + step);
    let leadingSpaces = 0;
    for (const c of s) {
      if (c === ' ') {
        leadingSpaces++;
      } else {
        break;
      }
    }
    const x = props.x + offsetX * i + leadingSpaces * spaceOffset;
    const y = props.y + offsetY * i;
    const text = (
      <text key={i} x={x} y={y}>
        {props.text.substring(i * step, i * step + step)}
      </text>
    );
    texts.push(text);
  }
  return (
    <g ref={ref} style={props.style}>
      {texts}
    </g>
  );
});

export default Texts;
