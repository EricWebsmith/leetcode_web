import { forwardRef } from "react";

interface Props {
  x: number;
  y: number;
  n: number;
  offsetX: number;
  height?: number;
  width: number;
  style: object;
}

const Rects = forwardRef((props: Props, ref: React.ForwardedRef<SVGGElement>) => {
  if (props.n === 0 || props.n == null) {
    return <></>;
  }
  const height = props.height ?? props.width;
  const rects = [];
  for (let i = 0; i < props.n; i++) {
    const rect = (
      <rect key={i} x={props.x + props.offsetX * i} y={props.y} height={height} width={props.width}></rect>
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
