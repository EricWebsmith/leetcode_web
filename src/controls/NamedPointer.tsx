import { forwardRef } from "react";


interface Props {
  letter: string;
  id?: string;
  x: number;
  y: number;
  pathStyle?: object;
  scale?: number;
}

const NamedPointer = forwardRef((props: Props, ref: React.ForwardedRef<SVGGElement>) => {
  const scale = props.scale ?? 1;
  const transform = `translate(${-40 + props.x}, ${10 + props.y}) scale(${scale})`;
  const offset = -5;
  return (
    <g ref={ref} transform={transform}>
      <path style={props.pathStyle} d='M140 10 L140 60 L120 60 L160 100 L200 60 L180 60 L180 10 Z' />
      <text
        x={153 + offset}
        y={55}
        fill='white'
        style={{
          fontSize: 40,
          fontWeight: 'bold',
        }}>
        {props.letter}
      </text>
    </g>
  );
});

export default NamedPointer;
