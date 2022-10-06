import React from 'react';

interface Props {
  x: number;
  y: number;
  n: number;
  offsetX: number;
  height: number;
  width: number;
  style: object;
}

const Rects = React.forwardRef((props: Props, ref: React.ForwardedRef<SVGGElement>) => {
  const rects = [];
  for (let i = 0; i < props.n; i++) {
    const rect = (
      <rect
        key={i}
        x={props.x + props.offsetX * i}
        y={props.y}
        height={props.height}
        width={props.width}></rect>
    );
    rects.push(rect);
  }
  return (
    <g ref={ref} style={props.style}>
      {rects}
    </g>
  );
});

export default Rects;
