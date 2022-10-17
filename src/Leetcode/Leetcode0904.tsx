import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import Apple from '../SvgIcons/Apple';
import Banana from '../SvgIcons/Banana';
import IFruitProps from '../SvgIcons/IFruitProps';
import Orange from '../SvgIcons/Orange';
import Pear from '../SvgIcons/Pear';
import Scissors from '../SvgIcons/Scissors';

type Frame = {
  left: number;
  right: number;
  f1: (props: IFruitProps) => JSX.Element;
  c1: number;
  f2?: (props: IFruitProps) => JSX.Element;
  c2?: number;
  f3?: (props: IFruitProps) => JSX.Element;
  c3?: number;
  best: number;
};

export default function Leetcode0053() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const frames: Frame[] = [
    { left: 0, right: 0, f1: Apple, c1: 1, best: 1 },
    { left: 0, right: 1, f1: Apple, c1: 2, best: 2 },
    { left: 0, right: 2, f1: Apple, c1: 2, f2: Banana, c2: 1, best: 3 },
    { left: 0, right: 3, f1: Apple, c1: 2, f2: Banana, c2: 1, f3: Pear, c3: 1, best: 3 },
    { left: 1, right: 3, f1: Apple, c1: 1, f2: Banana, c2: 1, f3: Pear, c3: 1, best: 3 },
    { left: 2, right: 3, f1: Banana, c1: 1, f2: Pear, c2: 1, best: 3 },
    { left: 2, right: 4, f1: Banana, c1: 2, f2: Pear, c2: 1, best: 3 },
    { left: 2, right: 5, f1: Banana, c1: 3, f2: Pear, c2: 1, best: 4 },
    { left: 2, right: 6, f1: Banana, c1: 3, f2: Pear, c2: 2, best: 5 },
    { left: 2, right: 7, f1: Banana, c1: 3, f2: Pear, c2: 2, f3: Apple, c3: 1, best: 5 },
    { left: 3, right: 7, f1: Banana, c1: 2, f2: Pear, c2: 2, f3: Apple, c3: 1, best: 5 },
    { left: 4, right: 7, f1: Banana, c1: 2, f2: Pear, c2: 1, f3: Apple, c3: 1, best: 5 },
    { left: 5, right: 7, f1: Banana, c1: 1, f2: Pear, c2: 1, f3: Apple, c3: 1, best: 5 },
    { left: 6, right: 7, f1: Pear, c1: 1, f2: Apple, c2: 1, best: 5 },
    { left: 6, right: 8, f1: Pear, c1: 1, f2: Apple, c2: 2, best: 5 },
    { left: 6, right: 9, f1: Pear, c1: 1, f2: Apple, c2: 3, best: 5 },
    { left: 6, right: 10, f1: Pear, c1: 1, f2: Apple, c2: 3, f3: Orange, c3: 1, best: 5 },
    { left: 7, right: 10, f1: Apple, c1: 3, f2: Orange, c2: 1, best: 5 },
  ];

  const frame = frames[frameIndex];

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < frames.length) {
      setFrameIndex(index);
    }
  }

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 80,
    fontFamily: 'Arial',
    fill: '#000000',
  };

  const scissorsOffset = 450;

  function pickFruits(basket: number, fruit?: (props: IFruitProps) => JSX.Element, count?: number) {
    const fruits = [];
    if (fruit != null && count != null) {
      for (let i = 0; i < count; i++) {
        const fruitProps = {
          scale: 0.3,
          x: 450 + fruitOffset * i,
          y: 700 + basket * 300,
        };
        fruits.push(fruit(fruitProps));
      }
    }
    return fruits;
  }

  const fruitOffset = 300;
  const firstFruits = pickFruits(0, frame.f1, frame.c1);
  const secondFruits = pickFruits(1, frame.f2, frame.c2);
  const thirdFruits = pickFruits(2, frame.f3, frame.c3);

  return (
    <>
      <svg
        id='svg'
        width={1100}
        height={650}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}>
        <Apple scale={0.3} x={0} y={0} />
        <Apple scale={0.3} x={300} y={0} />
        <Banana scale={0.3} x={600} y={0} />
        <Pear scale={0.3} x={900} y={0} />
        <Banana scale={0.3} x={1200} y={0} />
        <Banana scale={0.3} x={1500} y={0} />
        <Pear scale={0.3} x={1800} y={0} />
        <Apple scale={0.3} x={2100} y={0} />
        <Apple scale={0.3} x={2400} y={0} />
        <Apple scale={0.3} x={2700} y={0} />
        <Orange scale={0.3} x={3000} y={0} />
        <Scissors scale={0.2} x={200 + scissorsOffset * frame.left} y={700} />
        <Scissors scale={0.2} x={200 + scissorsOffset * frame.right} y={700} />

        {firstFruits}
        {secondFruits}
        {thirdFruits}

        <text x={200} y={615} style={textStyle}>
          Maximun Fruits: {frame.best}
        </text>
      </svg>
      <ButtonBar setIndex={setIndex} />
      <div
        style={{
          paddingTop: 100,
          paddingLeft: 50,
        }}>
        Thanks for the fruits pictures from{' '}
        <a href='vecteezy.com' target='_blank'>
          vecteezy.com
        </a>
        And other pictures from <a href='https://www.svgrepo.com/'>svgrepo.com/</a>
      </div>
    </>
  );
}
