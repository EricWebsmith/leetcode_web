import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import NamedPointer from '../controls/NamedPointer';

export default function Leetcode0042() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
  const w = 60;
  const n = height.length;

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < n) {
      setFrameIndex(index);
    }
  }
  const pillars = [];

  for (let i = 0; i < height.length; i++) {
    if (height[i] === 0) {
      continue;
    }
    const x = w + w * i;
    const h = w * height[i];
    const y = 4 * w - h;
    pillars.push(<rect key={i} x={x} y={y} height={h} width={w}></rect>);
  }

  const pointerStyle = {
    paintOrder: 'fill markers stroke',
    fill: 'green',
  };

  const water = [];
  let left = 0;
  let right = n - 1;
  let step = 0;
  let left_max = height[0];
  let right_max = height[n - 1];
  let ans = 0;
  while (left < right && step < frameIndex) {
    const top = Math.min(left_max, right_max);
    if (left_max <= right_max) {
      left++;
      if (height[left] < left_max && height[left] < right_max) {
        const h = top - height[left];
        ans += h;
        const key = `water-${left}`;
        water.push(<rect key={key} x={w + left * w} y={(4 - top) * w} height={h * w} width={w}></rect>);
      }
      left_max = Math.max(left_max, height[left]);
    } else {
      right--;
      if (height[right] < left_max && height[right] < right_max) {
        const h = top - height[right];
        ans += h;
        const key = `water-${right}`;
        water.push(<rect key={key} x={w + right * w} y={(4 - top) * w} height={h * w} width={w}></rect>);
      }
      right_max = Math.max(right_max, height[right]);
    }
    step++;
  }

  const top = Math.min(left_max, right_max);
  const leftX = w * left + 20;
  const leftY = (4 - Math.max(height[left], top)) * w - 80;
  const rightX = w * right + 20;
  const rightY = (4 - Math.max(height[right], top)) * w - 80;

  return (
    <>
      <svg
        id='svg'
        width={1100}
        height={310}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}>
        <g style={{ fill: 'black' }}>{pillars}</g>
        <g style={{ fill: 'blue' }}>{water}</g>
        <NamedPointer scale={0.7} x={leftX} y={leftY} letter={String(left_max)} pathStyle={pointerStyle} />
        <NamedPointer scale={0.7} x={rightX} y={rightY} letter={String(right_max)} pathStyle={pointerStyle} />
        <text
          x={300}
          y={300}
          style={{
            fontSize: 70,
            fontWeight: 'bold',
            fill: 'blue',
          }}>
          Water: {ans}
        </text>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
