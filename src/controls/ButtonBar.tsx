import { SetStateAction } from 'react';
import { NEXT_STEP, PREVIOUS_STEP, RESET } from '../Utils/constants';

interface IProps {
  setIndex: (index: SetStateAction<number>) => void;
}

export default function ButtonBar(props: IProps) {
  const { setIndex } = props;

  function handlePreviousClick() {
    setIndex((prev) => prev - 1);
  }

  function handleNextClick() {
    setIndex((prev) => prev + 1);
  }

  function handleResetClick() {
    setIndex(0);
  }

  return (
    <div className='btnbar'>
      <button className='btn' onClick={handleResetClick}>
        {RESET}
      </button>
      <button className='btn' onClick={handlePreviousClick}>
        {PREVIOUS_STEP}
      </button>
      <button className='btn' onClick={handleNextClick}>
        {NEXT_STEP}
      </button>
    </div>
  );
}
