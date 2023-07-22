import { forwardRef } from "react";

interface Props {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  n: number;
  offsetX: number;
  style: object;
}

const Rects = forwardRef((props: Props, ref: React.ForwardedRef<SVGGElement>) => {
  if (props.n === 0 || props.n == null) {
    return <></>;
  }
  const lines = [];
  for (let i = 0; i < props.n; i++) {
    lines.push(
      <line
        key={i}
        x1={props.x1 + props.offsetX * i}
        y1={props.y1}
        x2={props.x2 + props.offsetX * i}
        y2={props.y2}
      />
    );
  }
  return (
    <g ref={ref} style={props.style}>
      {lines}
    </g>
  );
});

export default Rects;
