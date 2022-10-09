import React from 'react';

interface Props {
  x: number;
  y: number;
  m: number;
  n: number;
  height: number;
  width: number;
  textArr?: string[];
  rectStyle: object;
  textStyle: object;
  colorMatrix?: string[][];
}

const SvgMatrix = React.forwardRef((props: Props, ref: React.ForwardedRef<SVGGElement>) => {
  const { m, n, height, width, x, y, textArr, rectStyle, textStyle, colorMatrix } = props;
  if (m === 0 || n === 0) {
    return <></>;
  }

  const rects = [];
  for (let r = 0; r < m; r++) {
    const y_r = y + width * r;
    for (let c = 0; c < n; c++) {
      const key = `rect_${r * m + c}`;
      if (colorMatrix && colorMatrix[r][c]) {
        const rect = (
          <rect
            key={key}
            x={x + width * c}
            y={y_r}
            height={height}
            width={width}
            fill={colorMatrix[r][c]}></rect>
        );
        rects.push(rect);
      } else {
        const rect = (
          <rect key={key} x={x + width * c} y={y_r} height={height} width={width} fill={''}></rect>
        );
        rects.push(rect);
      }
    }
  }

  const texts = [];
  if (textArr) {
    const textOffsetX = 30;
    const textOffsetY = 80;
    for (let r = 0; r < m; r++) {
      const yr = y + width * r + textOffsetY;
      const charCount = Math.max(n, textArr[r].length);
      for (let c = 0; c < charCount; c++) {
        const key = `text_${r * m + c}`;
        const text = (
          <text key={key} x={x + width * c + textOffsetX} y={yr} height={height} width={width}>
            {textArr[r][c]}
          </text>
        );
        texts.push(text);
      }
    }
  }
  return (
    <g ref={ref}>
      <g style={rectStyle}>{rects}</g>
      <g style={textStyle}>{texts}</g>
    </g>
  );
});

export default SvgMatrix;
