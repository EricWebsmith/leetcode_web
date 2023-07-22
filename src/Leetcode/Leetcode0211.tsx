import { useState } from 'react';
import Leetcode0211PrefixLte from './Leetcode0211PrefixLte';
import Leetcode0211PrefixPostfix from './Leetcode0211PrefixPostfix';

const PREFIX = 'Prefix Tree(LTE)';
const PREFIX_POSTFIX = 'Prefix and postfix';

export default function Leetcode0297() {
  const [child, setChild] = useState(PREFIX_POSTFIX);
  function handleSerializeClick() {
    setChild(PREFIX);
  }

  function handleDeserializeClick() {
    setChild(PREFIX_POSTFIX);
  }

  let childElement = <></>;
  switch (child) {
    case PREFIX:
      childElement = <Leetcode0211PrefixLte />;
      break;
    case PREFIX_POSTFIX:
      childElement = <Leetcode0211PrefixPostfix />;
      break;
    default:
      childElement = <Leetcode0211PrefixPostfix />;
      break;
  }

  return (
    <>
      {childElement}
      <div>
        <button className='btn' onClick={handleSerializeClick}>
          {PREFIX}
        </button>
        <button className='btn' onClick={handleDeserializeClick}>
          {PREFIX_POSTFIX}
        </button>
      </div>
    </>
  );
}
