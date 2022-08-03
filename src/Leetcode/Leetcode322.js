import { useState } from 'react';
import './Leetcode322.css'

export default function Leetcode322() {
  const [step, setStep] = useState(2)

  const states = [
    {
      key: -1,
      coins: [null, null, null, null, null, null, null, null, null, null, null],
      newCount: 0,
      dp: [0, null, null, null, null, null, null, null, null, null, null, null]
    },
    {
      key: 0,
      coins: [null, 1, 2, null, null, 5, null, null, null, null, null],
      newCount: 1,
      dp: [0, 1, 1, null, null, 1, null, null, null, null, null, null]
    },
    {
      key: 1,
      coins: [null, null, 1, 2, null, null, 5, null, null, null, null, null, null],
      newCount: 2,
      dp: [0, 1, 1, 2, null, 1, 2, null, null, null, null, null]
    },
    {
      key: 2,
      coins: [null, null, null, 1, 2, null, null, 5, null, null, null, null, null],
      newCount: 2,
      dp: [0, 1, 1, 2, 2, 1, 2, 2, null, null, null, null]
    },
    {
      key: 3,
      coins: [null, null, null, null, 1, 2, null, null, 5, null, null, null, null],
      newCount: 3,
      dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, null, null, null]
    },
    {
      key: 4,
      coins: [null, null, null, null, null, 1, 2, null, null, 5, null, null, null],
      newCount: 3,
      dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, null, null]
    },
    {
      key: 5,
      coins: [null, null, null, null, null, null, 1, 2, null, null, 5, null, null],
      newCount: 2,
      dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, null]
    },
    {
      key: 6,
      coins: [null, null, null, null, null, null, null, 1, 2, null, null, 5, null],
      newCount: 3,
      dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3]
    },
    {
      key: 7,
      coins: [null, null, null, null, null, null, null, null, 1, 2, null, null, 5],
      newCount: 3,
      dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3, null]
    },
    {
      key: 8,
      coins: [null, null, null, null, null, null, null, null, null, 1, 2, null, null, 5],
      newCount: 4,
      dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3, null, null]
    },
    {
      key: 9,
      coins: [null, null, null, null, null, null, null, null, null, null, 1, 2, null, null, 5],
      newCount: 4,
      dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3, null, null, null]
    },
    {
      key: 10,
      coins: [null, null, null, null, null, null, null, null, null, null, null, 1, 2, null, null, 5],
      newCount: 3,
      dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3, null, null, null, null]
    }
  ]

  const coins = states[step].coins.map((coin, i) => {
    if (coin == null) {
      return (<td key={i}>&nbsp;</td>);
    }

    return (<td key={i}><div className="coin">{coin}</div></td>)
  });

  const arrows = states[step].coins.map((coin) => {
    if (coin == null) {
      return (<td>&nbsp;</td>);
    }

    return (<td><i className='fas fa-arrow-down'></i>{states[step].newCount}</td>)
  });

  const dp = states[step].dp.map((c, i) => {
    const className = (i === step - 1) ? "current" : null;

    if (i > 11) {
      return (<td className="no-border">&nbsp;</td>);
    }

    if (c == null) {
      return (<td className={className}>&nbsp;</td>);
    }

    if (step > 0) {
      const previousC = states[step - 1].dp[i];
      if (previousC != null && previousC !== c) {
        return (<td><span className='old'>1</span><span className='new'>{c}</span></td>);
      }

      if (previousC == null) {
        return (<td><span className='new'>{c}</span></td>);
      }
    }
    return (<td className={className}>{c}</td>);
  })

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
      <h1>322 Coin Change</h1>
      <h2>&nbsp;&nbsp;&nbsp;&nbsp;Example 1</h2>
      <div className="problem">
        
        <table className='mainTable'>
          <tbody>
            <tr className='coinRow' key={'coinRow'}>
              {coins}
            </tr>
            <tr>
              {arrows}
            </tr>
            <tr className='array'>
              {dp}
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
            </tr>
            <tr >
              <td colSpan={12}>
                <div className='btnbar'>
                  <button className='btn' onClick={handlePreviousClick}>Previous Step</button>
                  <button className='btn' onClick={handleNextClick}>Next Step</button>
                </div>
              </td>

            </tr>
          </tbody>
        </table>

      </div>
    </>
  )

  // return (
  //   <div className="problem">
  //     <table>
  //       <tr>
  //         <td></td>
  //         <td><div className='coin'>1</div></td>
  //         <td><div className='coin'>2</div></td>
  //         <td></td>
  //         <td></td>
  //         <td><div className='coin'>5</div></td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //       </tr>
  //       <tr>
  //         <td></td>
  //         <td><i className='fas fa-arrow-down'></i>1</td>
  //         <td><i className='fas fa-arrow-down'></i>1</td>
  //         <td></td>
  //         <td></td>
  //         <td><i className='fas fa-arrow-down'></i>1</td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //       </tr>
  //       <tr className='array'>
  //         <td className='current'>0</td>
  //         <td><span className='old'>1</span><span className='new'>1</span></td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //       </tr>
  //       <tr>
  //         <td>0</td>
  //         <td>1</td>
  //         <td>2</td>
  //         <td>3</td>
  //         <td>4</td>
  //         <td>5</td>
  //         <td>6</td>
  //         <td>7</td>
  //         <td>8</td>
  //         <td>9</td>
  //         <td>10</td>
  //         <td>11</td>
  //       </tr>
  //     </table>
  //     <div className='btnbar'>
  //       <button className='btn'>Previous Step</button>
  //       <button className='btn'>Next Step</button>
  //     </div>

  //   </div>
  // );
}