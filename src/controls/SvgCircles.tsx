import React from 'react';

interface Props {
  cx: number;
  cy: number;
  r: number;
  n: number;
  offsetX: number;
  style: object;
}

const Rects = React.forwardRef((props: Props, ref: React.ForwardedRef<SVGGElement>) => {
  if (props.n === 0 || props.n == null) {
    return <></>;
  }

  const rects = [];
  for (let i = 0; i < props.n; i++) {
    const rect = <circle key={i} cx={props.cx + props.offsetX * i} cy={props.cy} r={props.r} />;
    rects.push(rect);
  }
  return (
    <g ref={ref} style={props.style}>
      {rects}
    </g>
  );
});

export default Rects;
