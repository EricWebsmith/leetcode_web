import React from 'react';

interface Props {
  x: number;
  y: number;
  m: number;
  n: number;
  height: number;
  width: number;
  rectStyle: object;
  textStyle: object;
  colorMatrix?: string[][];
  textArr?: string[] | string[][];
  textColorMatrix?: string[][];
  textOffsetX?: number;
}

const SvgMatrix = React.forwardRef((props: Props, ref: React.ForwardedRef<SVGGElement>) => {
  const { m, n, height, width, x, y, textArr, rectStyle, textStyle, colorMatrix, textColorMatrix } = props;
  if (m === 0 || n === 0) {
    return <></>;
  }

  const rects = [];
  for (let r = 0; r < m; r++) {
    const y_r = y + width * r;
    for (let c = 0; c < n; c++) {
      const key = `rect_${r}_${c}`;
      let fill = '';
      if (colorMatrix && colorMatrix[r][c]) {
        fill = colorMatrix[r][c];
      }

      rects.push(<rect key={key} x={x + width * c} y={y_r} height={height} width={width} fill={fill}></rect>);
    }
  }

  const texts = [];
  if (textArr) {
    const textOffsetX = props.textOffsetX ?? 25;
    const textOffsetY = 80;
    for (let r = 0; r < m; r++) {
      const yr = y + width * r + textOffsetY;
      const charCount = Math.max(n, textArr[r].length);
      for (let c = 0; c < charCount; c++) {
        const key = `text_${r}_${c}`;
        let fill = '';
        if (textColorMatrix && textColorMatrix[r][c]) {
          fill = textColorMatrix[r][c];
        }
        texts.push(
          <text key={key} x={x + width * c + textOffsetX} y={yr} height={height} width={width} fill={fill}>
            {textArr[r][c]}
          </text>
        );
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
