import { fireEvent, render, screen } from '@testing-library/react';
import Leetcode0003 from '../Leetcode/Leetcode0003';
import Leetcode0019 from '../Leetcode/Leetcode0019';
import Leetcode0076 from '../Leetcode/Leetcode0076';
import Leetcode0091 from '../Leetcode/Leetcode0091';
import Leetcode0322 from '../Leetcode/Leetcode0322';
import Leetcode0377 from '../Leetcode/Leetcode0377';
import Leetcode0658 from '../Leetcode/Leetcode0658';
import Leetcode0659 from '../Leetcode/Leetcode0659';
import Leetcode0862 from '../Leetcode/Leetcode0862';
import Leetcode2421 from '../Leetcode/Leetcode2421';
import Leetcode2422 from '../Leetcode/Leetcode2422';
import { NEXT_STEP, PREVIOUS_STEP, RESET, SHOW_LESS, SHOW_MORE } from '../Utils/constants';

const typeList = [
  Leetcode0003,
  Leetcode0019,
  Leetcode0091,
  Leetcode0076,
  Leetcode0322,
  Leetcode0377,
  Leetcode0658,
  Leetcode0659,
  Leetcode0862,
  Leetcode2421,
  Leetcode2422,
];

for (const T of typeList) {
  test(`${T.name}`, () => {
    render(<T />);

    const svg = document.getElementById('svg');
    if (svg == null) {
      throw new Error('svg not found');
    }
    // part 1, Next Steps
    const outputs: string[] = [];
    let previousOutput = '';
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const currentOutput = svg.innerHTML;

      if (currentOutput === previousOutput) {
        break;
      }
      outputs.push(currentOutput);
      previousOutput = currentOutput;
      const btn: HTMLElement = screen.getByText(NEXT_STEP);
      expect(fireEvent.click(btn)).toBe(true);
    }

    // part 2, Previous Steps
    for (let i = outputs.length - 2; i >= 0; i--) {
      const btn: HTMLElement = screen.getByText(PREVIOUS_STEP);
      expect(fireEvent.click(btn)).toBe(true);
      expect(svg.innerHTML).toBe(outputs[i]);
    }

    // part 3, Reset
    for (let i = 0; i < 3; i++) {
      const btn: HTMLElement = screen.getByText(NEXT_STEP);
      expect(fireEvent.click(btn)).toBe(true);
    }
    const resetButton: HTMLElement = screen.getByText(RESET);
    expect(fireEvent.click(resetButton)).toBe(true);
    expect(svg.innerHTML).toBe(outputs[0]);
  });
}

test(`show more clicked ${Leetcode0659.name}`, () => {
  render(<Leetcode0659 />);
  const btn: HTMLElement = screen.getByText(SHOW_MORE);
  expect(fireEvent.click(btn)).toBe(true);
  expect(btn.innerText).toBe(SHOW_LESS);
  expect(fireEvent.click(btn)).toBe(true);
  expect(btn.innerText).toBe(SHOW_MORE);
  expect(fireEvent.click(btn)).toBe(true);
  expect(btn.innerText).toBe(SHOW_LESS);
});
