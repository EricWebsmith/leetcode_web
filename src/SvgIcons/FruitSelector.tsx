import Apple from './Apple';

interface IProps {
  fruitName: string;
  x: number;
  y: number;
  scale: number;
}

export default function FruitSelector(props: IProps) {
  switch (props.fruitName) {
    case 'Apple':
      return Apple(props);
  }
}
