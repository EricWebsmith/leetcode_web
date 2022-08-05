import { useState } from "react";
import logo from '../logo.png';

export default function Leetcode377() {
  const nums = [1, 2, 3];
  const target = 4;

  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;

  const states = [{
    dp: [...dp]
  }];

  for (let i = 0; i < target; i++) {
    //impossible
    if (dp[i] === 0) {
      continue;
    }

    for (const num of nums) {
      if (i + num <= target) {
        dp[i + num] = dp[i + num] + dp[i];
      }
    }

    states.push({ dp: [...dp] });
  }

  // start of react
  const [step, setStep] = useState(0);
  const currentIndex = step - 1;

  const currentState = states[step];
  const previousState = step === 0 ? null : states[step - 1];
  let currentAddition = step === 0 ? null : currentState.dp[step - 1];
  if (currentAddition === 0) { currentAddition = 1; }

  const coinTr = dp.map((n, i) => {
    if (step === 0) {
      return (<td>&nbsp;</td>);
    }

    if (nums.includes(i - currentIndex)) {
      return <td><div className="coin">{i - currentIndex}</div></td>;
    }

    return (<td>&nbsp;</td>);
  })

  const arrowTr = currentState.dp.map((n, i) => {
    if (step === 0) {
      return (<td>&nbsp;</td>);
    }

    if (nums.includes(i - currentIndex)) {
      return <td><i className='fas fa-arrow-down'></i>{currentAddition}</td>;
    }

    return (<td>&nbsp;</td>);
  });

  const dpTr = currentState.dp.map((n, i) => {
    if (currentIndex === i) {
      return (<td className="current">{n}</td>);
    }

    if (previousState && n !== previousState.dp[i]) {
      return (<td><span className='old'>{previousState.dp[i]}</span>&nbsp;<span className='new'>{n}</span></td>);
    }

    return (<td>{n}</td>);
  });

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
        <h1>377. Combination Sum IV</h1>
      </header>

      <h2>&nbsp;&nbsp;&nbsp;&nbsp;Example 1</h2>
      <div className="problem">

        <table className='mainTable'>
          <tbody>
            <tr className='coinRow' key={'coinRow'}>
              {coinTr}
            </tr>
            <tr>
              {arrowTr}
            </tr>
            <tr className='dp'>
              {dpTr}
            </tr>
            <tr>
              <td>0</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
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
}