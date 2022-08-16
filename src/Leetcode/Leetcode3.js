import { useEffect, useState } from 'react';
import logo from '../logo.png';

export default function Leetcode3() {
    //const dispatch = useDispatch();
    const [frameIndex, setFrameIndex] = useState(0)

    const frameLength = 14;
    const frames = {
        0: { left: 0, right: 0, ans: 1 },
        1: { left: 0, right: 1, ans: 1 },
        2: { left: 0, right: 2, ans: 1 },
        3: { left: 0, right: 3, ans: 1 },
        4: { left: 0, right: 4, ans: 1 },
        5: { left: 2, right: 5, ans: 4 },
        6: { left: 5, right: 6, ans: 4 },
        7: { left: 7, right: 7, ans: 4 },
        8: { left: 7, right: 8, ans: 4 },
        9: { left: 7, right: 9, ans: 4 },
        10: { left: 7, right: 10, ans: 4 },
        11: { left: 7, right: 11, ans: 4 },
        12: { left: 8, right: 12, ans: 5 },
        13: { left: 8, right: 13, ans: 6 },
    }

    const step = 65;
    const leftPointerBase = -110;
    const rightPointerBase = -80;

    const frame = frames[frameIndex];
    useEffect(() => {
        console.log('useEffect');

        const previousFrame = frameIndex > 0 ? frames[frameIndex - 1] : null;
        console.log(frame);
        

        const leftPointer = document.getElementById('leftPointer');
        leftPointer.setAttribute('transform', `translate(${leftPointerBase + frame.left * step}, 0)`)

        const rightPointer = document.getElementById('rightPointer');
        rightPointer.setAttribute('transform', `translate(${rightPointerBase + frame.right * step}, 0)`)

        const leftPointerShadow = document.getElementById('leftPointerShadow'); 
        leftPointerShadow.setAttribute('display', 'none');
        if (previousFrame) {
            if (previousFrame.left !== frame.left) {
                leftPointerShadow.setAttribute('display', 'block');
                leftPointerShadow.setAttribute('transform', `translate(${leftPointerBase + previousFrame.left * step}, 0)`)
            }
        }

        const rectContainer = document.getElementById('rectContainer');
        const rects = rectContainer.children;
        for (const rect of rects) {
            rect.setAttribute('fill', 'blue');
        }
        if (previousFrame) {

            if (previousFrame.left !== frame.left) {
                const repeatCharIndex = frame.left - 1;
                rects[repeatCharIndex].setAttribute('fill', 'red');
            }

            if (previousFrame.ans<frame.ans) {
                document.getElementById('ans').setAttribute('fill', 'red');
            } else {
                document.getElementById('ans').setAttribute('fill', 'black');
            }
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
        if (frameIndex + 1 < frameLength) {
            setFrameIndex(frameIndex + 1);
        }
    }

    return (
        <>

            <div className='ppt' style={{ width: 950, cursor:'url(Laser_Pointer.png), pointer!important' }}>
                <header>
                    <img className='logo' src={logo} alt='logo' />
                    <h1>3. Longest Substring Without Repeating Characters</h1>
                </header>
                <svg id='svg' width={950} height={350} style={{
                    backgroundColor: 'white',
                    cursor:'url(Laser_Pointer.png), pointer!important'
                }}>
                    <g id='rectContainer' style={{
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
                        <rect x={555} y={100} height='60' width='60'>
                        </rect>
                        <rect x={620} y={100} height='60' width='60'>
                        </rect>
                        <rect x={685} y={100} height='60' width='60'>
                        </rect>
                        <rect x={750} y={100} height='60' width='60'>
                        </rect>
                        <rect x={815} y={100} height='60' width='60'>
                        </rect>
                        <rect x={880} y={100} height='60' width='60'>
                        </rect>
                    </g>
                    <g id='chars' style={{
                        fontSize: '48px',
                        fill: 'white',
                        fontFamily: 'Arial Black'
                    }}>
                        <text x='57' y='145'>I</text>
                        <text x='115' y='145'>L</text>
                        <text x='175' y='145'>O</text>
                        <text x='240' y='145'>V</text>
                        <text x='305' y='145'>E</text>
                        <text x='375' y='145'>L</text>
                        <text x='435' y='145'>E</text>
                        <text x='500' y='145'>E</text>
                        <text x='570' y='145'>T</text>
                        <text x='630' y='145'>C</text>
                        <text x='695' y='145'>O</text>
                        <text x='760' y='145'>D</text>
                        <text x='825' y='145'>E</text>
                        <text x='900' y='145'>!</text>
                    </g>
                    <g id='index' transform='translate(0, 50)' style={{
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
                        <text x='825' y='145'>12</text>
                        <text x='885' y='145'>13</text>
                    </g>

                    <text x='50' y='270' style={{
                        fontSize: '32px',
                        fontFamily: 'Arial Black'
                    }}>Current Answer:</text>
                    <text id='ans' x='360' y='270' style={{
                        fontSize: '48px',
                        fontFamily: 'Arial Black'
                    }}>{frame.ans}</text>

                    <path id='leftPointer' transform='translate(-110, 0)' d="M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z" />
                    <path id='leftPointerShadow' fill='transparent'
                        stroke-dasharray="3,3"
                     stroke='black' stroke-width="3" transform='translate(-110, 0)' d="M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z" />
                    <path id='rightPointer' transform='translate(-80, 0)' d="M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z" />
                </svg>
                <div className='btnbar'>
                    <button className='btn' onClick={handlePreviousClick}>Previous Step</button>
                    <button className='btn' onClick={handleNextClick}>Next Step</button>
                </div>
            </div>

        </>

    );
}