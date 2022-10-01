import React from 'react';
import logo from '../logo.png';
import { getChildren, getChildrenFromRef, getElementById } from '../Utils/html';

type Frame = {
    current: number,
    dp: (number | null)[],
}

export default function Leetcode322() {
    const [frameIndex, setFrameIndex] = React.useState<number>(0)

    const frames: Frame[] = [
        {
            current: 0,
            dp: [0, null, null, null, null, null, null, null, null, null, null, null]
        },
        {
            current: 1,
            dp: [0, 1, 1, null, null, 1, null, null, null, null, null, null]
        },
        {
            current: 2,
            dp: [0, 1, 1, 2, null, 1, 2, null, null, null, null, null]
        },
        {
            current: 2,
            dp: [0, 1, 1, 2, 2, 1, 2, 2, null, null, null, null]
        },
        {
            current: 3,
            dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, null, null, null]
        },
        {
            current: 3,
            dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, null, null]
        },
        {
            current: 2,
            dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, null]
        },
        {
            current: 3,
            dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3]
        },
        {
            current: 3,
            dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3, null]
        },
        {
            current: 4,
            dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3, null, null]
        },
        {
            current: 4,
            dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3, null, null, null]
        },
        {
            current: 3,
            dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3, null, null, null, null]
        }
    ]

    const step = 65;
    const leftPointerBase = -110;
    const rightPointerBase = -80;
    const frame = frames[frameIndex];

    const rectContainer = React.useRef<SVGGElement>(null);

    React.useEffect(() => {
        const previousFrame = frameIndex > 0 ? frames[frameIndex - 1] : null;

        const coins = getElementById('coins')
        if (frameIndex>0) {
            coins.removeAttribute('display');
            coins.setAttribute('transform', `translate(${65 * frameIndex - 65}, 0)`);
        } else {
            coins.setAttribute('display', 'none');
        }
        

        const dpControl = getElementById('dp');
        const dpNumbers = getChildren(dpControl);
        const dp = frames[frameIndex].dp;
        //if (dp == null) {return;}
        for (let i=0;i<dpNumbers.length;i++) {
            if(dp[i] != null) {
                dpNumbers[i].innerHTML = `${dp[i]}`;
            } else {
                dpNumbers[i].innerHTML = '';
            }
        }

        // current
        const currentControl = getElementById('current');
        const currentNumbers = getChildren(currentControl);
        for (const currentNumberConol of currentNumbers) {
            currentNumberConol.innerHTML = `${frame.current}`;
        }


        const rects: Element[] = getChildrenFromRef(rectContainer)
        for (const rect of rects) {
            rect.setAttribute('fill', 'blue');
        }

        if (frameIndex>0) {
            rects[frameIndex-1].setAttribute('fill', 'red');
        }
    }, [frameIndex]);


    function handlePreviousClick() {
        if (frameIndex > 0) {
            setFrameIndex(frameIndex - 1);
        }
    }

    function handleNextClick() {
        if (frameIndex + 1 < frames.length) {
            setFrameIndex(frameIndex + 1);
        }
    }
    
    function handleResetClick() {
        setFrameIndex(0);
    }

    return (
        <div className='ppt' style={{ width: 950 }}>
            <header>
                <img className='logo' src={logo} alt='logo' />
                <h1>322 Coin Change</h1>
            </header>
            <svg id='svg' width={950} height={350} style={{
                backgroundColor: 'white',
                cursor: 'url(Laser_Pointer.png), pointer!important'
            }}>
                <g id='coins' style={{
                    fontSize: '48px',
                    fill: '#111',
                    fontFamily: 'Arial Black'

                }} >
                    <circle cx={130} cy={40} r='30' fill='gold'></circle>
                    <circle cx={195} cy={40} r='30' fill='gold'></circle>
                    <circle cx={390} cy={40} r='30' fill='gold'></circle>
                    <text x='115' y='55'>1</text>
                    <text x='180' y='55'>2</text>
                    <text x='375' y='55'>5</text>
                    <path transform='translate(20, 45) scale(0.6)' d="M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z" />
                    <path transform='translate(85, 45) scale(0.6)' d="M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z" />
                    <path transform='translate(280, 45) scale(0.6)' d="M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z" />
                    <g id="current"
                    style={{
                        fontSize: '40px',
                        fill: '#111',
                        fontFamily: 'Arial Black'

                    }}>
                        <text x='130' y='105'>1</text>
                        <text x='195' y='105'>1</text>
                        <text x='390' y='105'>1</text>
                    </g>

                </g>
                <g id='dpRects'
                    ref={rectContainer}
                    style={{
                        border: '3px solid red',
                        borderColor: 'red',
                        fill: 'blue'
                    }}
                    transform="translate(0, 10)"
                >
                    <rect x={35} y={100} height='60' width='60'>
                    </rect>
                    <rect x={100} y={100} height='60' width='60'>
                    </rect>
                    <rect x={165} y={100} height='60' width='60'>
                    </rect>
                    <rect x={230} y={100} height='60' width='60'>
                    </rect>
                    <rect x={295} y={100} height='60' width='60'>
                    </rect>
                    <rect x={360} y={100} height='60' width='60'>
                    </rect>
                    <rect x={425} y={100} height='60' width='60'>
                    </rect>
                    <rect x={490} y={100} height='60' width='60'>
                    </rect>
                    <rect x={555} y={100} height='60' width='60'>
                    </rect>
                    <rect x={620} y={100} height='60' width='60'>
                    </rect>
                    <rect x={685} y={100} height='60' width='60'>
                    </rect>
                    <rect x={750} y={100} height='60' width='60'>
                    </rect>
                </g>
                <g id='dp'
                    transform="translate(0, 10)"
                    style={{
                        fontSize: '48px',
                        fill: 'white',
                        fontFamily: 'Arial Black'
                    }}>
                    <text x='50' y='145'>0</text>
                    <text x='115' y='145'>0</text>
                    <text x='180' y='145'>0</text>
                    <text x='245' y='145'>0</text>
                    <text x='310' y='145'>0</text>
                    <text x='375' y='145'>0</text>
                    <text x='440' y='145'>0</text>
                    <text x='505' y='145'>0</text>
                    <text x='570' y='145'>0</text>
                    <text x='635' y='145'>0</text>
                    <text x='700' y='145'>0</text>
                    <text x='765' y='145'>0</text>
                </g>
                <g id='index' transform='translate(0, 55)' style={{
                    fontSize: '32px',
                    fontFamily: 'Arial Black'
                }}>
                    <text x='57' y='145'>0</text>
                    <text x='115' y='145'>1</text>
                    <text x='178' y='145'>2</text>
                    <text x='240' y='145'>3</text>
                    <text x='312' y='145'>4</text>
                    <text x='375' y='145'>5</text>
                    <text x='438' y='145'>6</text>
                    <text x='505' y='145'>7</text>
                    <text x='575' y='145'>8</text>
                    <text x='635' y='145'>9</text>
                    <text x='692' y='145'>10</text>
                    <text x='760' y='145'>11</text>
                </g>
            </svg>
            <div className='btnbar'>
                <button className='btn' onClick={handleResetClick}>Reset</button>
                <button className='btn' onClick={handlePreviousClick}>Previous Step</button>
                <button className='btn' onClick={handleNextClick}>Next Step</button>
            </div>
        </div>
    );
}