import React from 'react';

interface Props {
  text: string;
  x: number;
  y: number;
  offsetX: number;
  height: number;
  width: number;
  style: object;
}

const Texts = React.forwardRef((props: Props, ref: React.ForwardedRef<SVGGElement>) => {
  const texts = [];
  for (let i = 0; i < props.text.length; i++) {
    const text = (
      <text key={i} x={props.x + props.offsetX * i} y={props.y} height={props.height} width={props.width}>
        {props.text[i]}
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
