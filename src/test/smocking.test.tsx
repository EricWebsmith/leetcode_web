import { fireEvent, render, screen } from '@testing-library/react';
import Leetcode0659 from '../Leetcode/Leetcode0659';
import { typeList } from '../Leetcode/metadata';
import { NEXT_STEP, PREVIOUS_STEP, RESET, SHOW_LESS, SHOW_MORE } from '../Utils/constants';

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
      if (svg.innerHTML !== outputs[i]) {
        console.log(i, outputs.length);
      }
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
