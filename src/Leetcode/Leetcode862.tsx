import React from 'react';
import logo from '../logo.png';
import { getChildrenFromRef, getElementById } from '../Utils/html'

type Frame = {
    colors: string[];
    ans: number,
    info?: string
}

const colors = {
    inactive: 'gray',
    current: 'red',
    previous: 'purple',
    default: 'blue',
}

export default function Leetcode3() {
    const [frameIndex, setFrameIndex] = React.useState<number>(0)

    const frames: Frame[] = [
        {
            colors: [colors.current, colors.default, colors.default, colors.default, colors.default, colors.default, colors.default, colors.default],
            ans: -1,
            info: 'We start at position 0. '
        },
        {
            colors: [colors.default, colors.current, colors.default, colors.default, colors.default, colors.default, colors.default, colors.default],
            ans: -1,
            info: 'Now position 1. '
        },
        {
            colors: [colors.default, colors.default, colors.current, colors.default, colors.default, colors.default, colors.default, colors.default],
            ans: -1,
            info: 'position 2. '
        },
        {
            colors: [colors.previous, colors.default, colors.default, colors.current, colors.default, colors.default, colors.default, colors.default],
            ans: 3,
            info: 'At Position 3, We find the first answer. Position 0 to 3. And we will consider Position 0 no more.'
        },
        {
            colors: [colors.inactive, colors.previous, colors.default, colors.default, colors.current, colors.default, colors.default, colors.default],
            ans: 3,
            info: 'Likewise, at Position 4, We find the second answer. Position 1 to 4. And we will consider Position 1 no more.'
        },
        {
            colors: [colors.inactive, colors.inactive, colors.inactive, colors.inactive, colors.inactive, colors.current, colors.default, colors.default],
            ans: 3,
            info: 'Any previous value >= current value is not consider. Now we have no previous values to consider. (-3 and three 1s cancel each other.)'
        },
        {
            colors: [colors.inactive, colors.inactive, colors.inactive, colors.inactive, colors.inactive, colors.default, colors.current, colors.default],
            ans: 3,
            info: 'Cannot find any value smaller than current value - k.'
        },
        {
            colors: [colors.inactive, colors.inactive, colors.inactive, colors.inactive, colors.inactive, colors.previous, colors.default, colors.current],
            ans: 2,
            info: '1 + 2 = 3'
        },
    ]

    const frame = frames[frameIndex];

    const preSumRectContainer = React.useRef<SVGGElement>(null);
    const rectContainer = React.useRef<SVGGElement>(null);

    React.useEffect(() => {

        const preRects: Element[] = getChildrenFromRef(preSumRectContainer)
        const rects: Element[] = getChildrenFromRef(rectContainer)
        for (let i = 0; i < frame.colors.length; i++) {
            preRects[i].setAttribute('fill', frame.colors[i]);
            rects[i].setAttribute('fill', frame.colors[i]);
        }
    }, [frameIndex]);


    function handlePreviousClick() {
        console.log(frameIndex);
        if (frameIndex > 0) {
            setFrameIndex(frameIndex - 1);
        }
    }

    function handleNextClick() {
        console.log(frameIndex);
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
                <h1>862. Shortest Subarray with Sum at Least K</h1>
            </header>
            <div id='svg-info' style={{
                display: 'flex'
            }}>
                <svg id='svg' width={650} height={450} style={{
                    backgroundColor: 'white',
                    cursor: 'url(Laser_Pointer.png), pointer!important'
                }}>
                    <g id='pre-sum' transform='translate(50, 0)'>
                        <text x='50' y='306'
                            transform='rotate(-90, 50, 306) translate(0, -30)'
                            style={{
                                fontSize: '48px',
                                fill: 'black',
                                fontFamily: 'Arial Black'

                            }}>Prefix Sum</text>
                        <g id='pre-sum-rect-container'

                            ref={preSumRectContainer}
                            style={{
                                border: '3px solid red',
                                borderColor: 'red',
                                fill: 'blue'
                            }}>
                            <rect x={35} y={260} height='60' width='60'>
                            </rect>
                            <rect x={100} y={195} height='60' width='60'>
                            </rect>
                            <rect x={165} y={130} height='60' width='60'>
                            </rect>
                            <rect x={230} y={65} height='60' width='60'>
                            </rect>
                            <rect x={295} y={0} height='60' width='60'>
                            </rect>
                            <rect x={360} y={195} height='60' width='60'>
                            </rect>
                            <rect x={425} y={130} height='60' width='60'>
                            </rect>
                            <rect x={490} y={0} height='60' width='60'>
                            </rect>

                        </g>
                        <g id='nums'

                            style={{
                                fontSize: '48px',
                                fill: 'white',
                                fontFamily: 'Arial Black'
                            }}>
                            <text x='50' y='306'>0</text>
                            <text x='115' y='240'>1</text>
                            <text x='175' y='175'>2</text>
                            <text x='240' y='110'>3</text>
                            <text x='305' y='45'>4</text>
                            <text x='375' y='240'>1</text>
                            <text x='435' y='175'>2</text>
                            <text x='500' y='45'>4</text>

                        </g>
                    </g>
                    <g id='nums-container' transform='translate(50, 260)'>
                        <g id='rectContainer'

                            ref={rectContainer}
                            style={{
                                border: '3px solid red',
                                borderColor: 'red',
                                fill: 'blue'
                            }}>
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

                        </g>
                        <g id='nums'

                            style={{
                                fontSize: '48px',
                                fill: 'white',
                                fontFamily: 'Arial Black'
                            }}>
                            <text x='57' y='145'></text>
                            <text x='115' y='145'>1</text>
                            <text x='175' y='145'>1</text>
                            <text x='240' y='145'>1</text>
                            <text x='305' y='145'>1</text>
                            <text x='365' y='145'>-3</text>
                            <text x='435' y='145'>1</text>
                            <text x='500' y='145'>2</text>

                        </g>
                    </g>

                    <g id='index' transform='translate(50, 210)' style={{
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
                    </g>
                </svg>
                <div style={{
                    width: '300px'
                }}>
                    <span style={{
                        fontSize: '48px',
                        fill: 'black',
                        fontFamily: 'Arial Black'

                    }}>k = 3</span>
                    <br />
                    <span style={{
                        fontSize: '48px',
                        fill: 'black',
                        fontFamily: 'Arial Black'

                    }}>Answer: {frame.ans}</span>
                    <br />
                    <span style={{
                        fontSize: '24px',
                        fill: 'black',
                        fontFamily: 'Arial Black'

                    }}>
                        {frame.info}
                    </span>
                </div>
            </div>

            <div className='btnbar'>
                <button className='btn' onClick={handleResetClick}>Reset</button>
                <button className='btn' onClick={handlePreviousClick}>Previous Step</button>
                <button className='btn' onClick={handleNextClick}>Next Step</button>
            </div>
        </div>
    );
}