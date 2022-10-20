import React from 'react';

interface Props {
  cx: number;
  cy: number;
  r: number;
  n: number;
  offsetX: number;
  style: object;
}

const Circles = React.forwardRef((props: Props, ref: React.ForwardedRef<SVGGElement>) => {
  if (props.n === 0 || props.n == null) {
    return <></>;
  }

  const circles = [];
  for (let i = 0; i < props.n; i++) {
    const circle = <circle key={i} cx={props.cx + props.offsetX * i} cy={props.cy} r={props.r} />;
    circles.push(circle);
  }
  return (
    <g ref={ref} style={props.style}>
      {circles}
    </g>
  );
});

export default Circles;
