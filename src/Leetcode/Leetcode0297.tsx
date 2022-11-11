import React from 'react';
import Leetcode0297Deserialize from './Leetcode0297Deserialize';
import Leetcode0297Serialize from './Leetcode0297Serialize';

const SERIALIZE = 'SERIALIZE';
const DESERIALIZE = 'DESERIALIZE';

export default function Leetcode0297() {
  const [child, setChild] = React.useState(SERIALIZE);
  function handleSerializeClick() {
    setChild(SERIALIZE);
  }

  function handleDeserializeClick() {
    setChild(DESERIALIZE);
  }

  let childElement = <></>;
  switch (child) {
    case SERIALIZE:
      childElement = <Leetcode0297Serialize />;
      break;
    case DESERIALIZE:
      childElement = <Leetcode0297Deserialize />;
      break;
    default:
      childElement = <Leetcode0297Serialize />;
      break;
  }

  return (
    <>
      {childElement}
      <div>
        <button className='btn' onClick={handleSerializeClick}>
          {'SERIALIZE'}
        </button>
        <button className='btn' onClick={handleDeserializeClick}>
          {'DESERIALIZE'}
        </button>
      </div>
    </>
  );
}
