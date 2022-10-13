import React from 'react';

interface Props {
  text?: string;
  x: number;
  y: number;
  offsetX: number;
  style: object;
}

const Texts = React.forwardRef((props: Props, ref: React.ForwardedRef<SVGGElement>) => {
  if (props.text == null) {
    return <></>;
  }
  const texts = [];
  for (let i = 0; i < props.text.length; i++) {
    const text = (
      <text key={i} x={props.x + props.offsetX * i} y={props.y}>
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
