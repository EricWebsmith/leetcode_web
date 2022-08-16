import { useState } from 'react';
import './Leetcode76.css';
import logo from '../logo.png';

export default function Leetcode76() {
  const [step, setStep] = useState(0)
  const s = "ADOBECODEBANC";
  const sArray = s.split('');

  const states = [
    {
      key: 0,
      left: 1000,
      right: -1,
      movingBag: [0, 0, 0],
      ans: '""'
    },
    {
      key: 1,
      left: 0,
      right: 0,
      movingBag: [1, 0, 0],
      ans: '""'
    },
    {
      key: 2,
      left: 0,
      right: 1,
      movingBag: [1, 0, 0],
      ans: '""'
    },
    {
      key: 3,
      left: 0,
      right: 2,
      movingBag: [1, 0, 0],
      ans: '""'
    },
    {
      key: 4,
      left: 0,
      right: 3,
      movingBag: [1, 1, 0],
      ans: '""'
    },
    {
      key: 5,
      left: 0,
      right: 4,
      movingBag: [1, 1, 0],
      ans: '""'
    },
    {
      key: 6,
      left: 0,
      right: 5,
      movingBag: [1, 1, 1],
      isSubset: true,
      ans: 'ADOBEC'
    },
    {
      key: 7,
      left: 1,
      right: 5,
      movingBag: [0, 1, 1],
      ans: 'ADOBEC'
    },
    {
      key: 8,
      left: 1,
      right: 6,
      movingBag: [0, 1, 1],
      ans: 'ADOBEC'
    },
    {
      key: 9,
      left: 1,
      right: 7,
      movingBag: [0, 1, 1],
      ans: 'ADOBEC'
    },
    {
      key: 10,
      left: 1,
      right: 8,
      movingBag: [0, 1, 1],
      ans: 'ADOBEC'
    },
    {
      key: 11,
      left: 1,
      right: 9,
      movingBag: [0, 2, 1],
      ans: 'ADOBEC'
    },
    {
      key: 12,
      left: 1,
      right: 10,
      movingBag: [1, 2, 1],
      isSubset: true,
      ans: 'ADOBEC'
    },
    {
      key: 13,
      left: 2,
      right: 10,
      movingBag: [1, 2, 1],
      isSubset: true,
      ans: 'ADOBEC'
    },
    {
      key: 14,
      left: 3,
      right: 10,
      movingBag: [1, 2, 1],
      isSubset: true,
      ans: 'ADOBEC'
    },
    {
      key: 15,
      left: 4,
      right: 10,
      movingBag: [1, 1, 1],
      isSubset: true,
      ans: 'ADOBEC'
    },
    {
      key: 16,
      left: 5,
      right: 10,
      movingBag: [1, 1, 1],
      isSubset: true,
      ans: 'ADOBEC'
    },
    {
      key: 17,
      left: 6,
      right: 10,
      movingBag: [1, 1, 0],
      ans: 'ADOBEC'
    },
    {
      key: 18,
      left: 6,
      right: 11,
      movingBag: [1, 1, 0],
      ans: 'ADOBEC'
    },
    {
      key: 19,
      left: 6,
      right: 12,
      movingBag: [1, 1, 1],
      isSubset: true,
      ans: 'ADOBEC'
    },
    {
      key: 20,
      left: 7,
      right: 12,
      movingBag: [1, 1, 1],
      isSubset: true,
      ans: 'ADOBEC'
    },
    {
      key: 21,
      left: 8,
      right: 12,
      movingBag: [1, 1, 1],
      isSubset: true,
      ans: 'EBANC'
    },
    {
      key: 22,
      left: 9,
      right: 12,
      movingBag: [1, 1, 1],
      isSubset: true,
      ans: 'BANC'
    },
    {
      key: 23,
      left: 10,
      right: 12,
      movingBag: [1, 0, 1],
      ans: 'BANC'
    },
    {
      key: 24,
      left: 11,
      right: 12,
      movingBag: [0, 0, 1],
      ans: 'BANC'
    },
    {
      key: 25,
      left: 12,
      right: 12,
      movingBag: [0, 0, 1],
      ans: 'BANC'
    },
  ]

  const state = states[step];
  const previousState = step>0?states[step-1]:null;
  state.isSubset = state.isSubset??false;

  const arrows = sArray.map((c, i) => {
    if (state.left === i && state.right === i) {
      return (<td><i className='fas fa-arrow-down'></i><i className='fas fa-arrow-down'></i></td>);
    }

    if (state.left === i) {
      return (<td><i className='fas fa-arrow-down'></i></td>);
    }

    if (state.right === i) {
      return (<td><i className='fas fa-arrow-down'></i></td>);
    }

    return (<td>&nbsp;</td>);
  });

  const sTds = s.split('').map((c, i) => {
    let className = '';
    if ((i >= state.left) && (i <= state.right)) {
      className = state.isSubset?'lc76current-green':'lc76current-red';
    }
    return (<td className={className}>{c}</td>);
  });

  const movingBagTds = state.movingBag.map((c, i) =>{
    if (previousState) {
      if(previousState.movingBag[i] !== c) {
        return (<td className='new'>{c}</td>)    
      }
    }
    return (<td>{c}</td>)
  });

  const subsetDiv = state.isSubset?(
    <div className='subset'>⊆</div>
  ):(
    <div className='notsubset'>⊄</div>
  );

  const handlePreviousClick = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  const handleNextClick = () => {
    if (step < states.length - 1) {
      setStep(step + 1);
    }
  }

  return (
    <>
      <header>
        <img className='logo' src={logo} alt='logo' />
        <h1>76. Minimum Window Substring</h1>
      </header>
      
      <h2>&nbsp;&nbsp;&nbsp;&nbsp;Example 1</h2>
      <div className='problem'>

        <table className='mainTable'>
          <tbody>
            <tr>
              {arrows}
            </tr>
            <tr className='lc76array'>
              {sTds}
            </tr>
            <tr>
              <td>0</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
            </tr>
            <tr >
              <td colSpan={12}>

              </td>

            </tr>
          </tbody>
        </table>
        <div className='lc76bag-wrap'>
          <div className='lc76bag'>
            <h3>T-Bag</h3>
            <table>
              <tbody>
                <tr>
                  <td>A</td>
                  <td>B</td>
                  <td>C</td>
                  <td>...</td>
                </tr>
                <tr className='lc76array'>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='subset-wrap'>
            <h3>Is Subset of?</h3>
            {subsetDiv}
          </div>
          <div className='lc76bag'>
            <h3>Moving-Bag</h3>
            <table>
              <tbody>
                <tr>
                  <td>A</td>
                  <td>B</td>
                  <td>C</td>
                  <td>...</td>
                </tr>
                <tr className='lc76array'>
                  {movingBagTds}
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='lc76ans'>
          Current Best Answer: <h2 className='green'>{state.ans}</h2>
        </div>
        <div className='btnbar'>
          <button className='btn' onClick={handlePreviousClick}>Previous Step</button>
          <button className='btn' onClick={handleNextClick}>Next Step</button>
        </div>
        <div>
          <b className='green'>⊆</b> = is a subset of / equal to, <b className='red'>⊄</b> = is not subset of
        </div>
      </div>
    </>
  )
}