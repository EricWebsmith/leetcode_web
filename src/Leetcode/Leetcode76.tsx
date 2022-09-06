import React from 'react';
import logo from '../logo.png';
import { getChildren, getChildrenFromRef, getElementById } from '../Utils/html'

type Frame = {
    left: number,
    right: number,
    ans: string,
    movingBag: number[],
    isSubset?: boolean
}

export default function Leetcode3() {
    const [frameIndex, setFrameIndex] = React.useState<number>(0)

    const frames: Frame[] = [
        {
            left: 1000,
            right: -1,
            movingBag: [0, 0, 0],
            ans: '""'
        },
        {
            left: 0,
            right: 0,
            movingBag: [1, 0, 0],
            ans: '""'
        },
        {
            left: 0,
            right: 1,
            movingBag: [1, 0, 0],
            ans: '""'
        },
        {
            left: 0,
            right: 2,
            movingBag: [1, 0, 0],
            ans: '""'
        },
        {
            left: 0,
            right: 3,
            movingBag: [1, 1, 0],
            ans: '""'
        },
        {
            left: 0,
            right: 4,
            movingBag: [1, 1, 0],
            ans: '""'
        },
        {
            left: 0,
            right: 5,
            movingBag: [1, 1, 1],
            isSubset: true,
            ans: 'ADOBEC'
        },
        {
            left: 1,
            right: 5,
            movingBag: [0, 1, 1],
            ans: 'ADOBEC'
        },
        {
            left: 1,
            right: 6,
            movingBag: [0, 1, 1],
            ans: 'ADOBEC'
        },
        {
            left: 1,
            right: 7,
            movingBag: [0, 1, 1],
            ans: 'ADOBEC'
        },
        {
            left: 1,
            right: 8,
            movingBag: [0, 1, 1],
            ans: 'ADOBEC'
        },
        {
            left: 1,
            right: 9,
            movingBag: [0, 2, 1],
            ans: 'ADOBEC'
        },
        {
            left: 1,
            right: 10,
            movingBag: [1, 2, 1],
            isSubset: true,
            ans: 'ADOBEC'
        },
        {
            left: 2,
            right: 10,
            movingBag: [1, 2, 1],
            isSubset: true,
            ans: 'ADOBEC'
        },
        {
            left: 3,
            right: 10,
            movingBag: [1, 2, 1],
            isSubset: true,
            ans: 'ADOBEC'
        },
        {
            left: 4,
            right: 10,
            movingBag: [1, 1, 1],
            isSubset: true,
            ans: 'ADOBEC'
        },
        {
            left: 5,
            right: 10,
            movingBag: [1, 1, 1],
            isSubset: true,
            ans: 'ADOBEC'
        },
        {
            left: 6,
            right: 10,
            movingBag: [1, 1, 0],
            ans: 'ADOBEC'
        },
        {
            left: 6,
            right: 11,
            movingBag: [1, 1, 0],
            ans: 'ADOBEC'
        },
        {
            left: 6,
            right: 12,
            movingBag: [1, 1, 1],
            isSubset: true,
            ans: 'ADOBEC'
        },
        {
            left: 7,
            right: 12,
            movingBag: [1, 1, 1],
            isSubset: true,
            ans: 'ADOBEC'
        },
        {
            left: 8,
            right: 12,
            movingBag: [1, 1, 1],
            isSubset: true,
            ans: 'EBANC'
        },
        {
            left: 9,
            right: 12,
            movingBag: [1, 1, 1],
            isSubset: true,
            ans: 'BANC'
        },
        {
            left: 10,
            right: 12,
            movingBag: [1, 0, 1],
            ans: 'BANC'
        },
        {
            left: 11,
            right: 12,
            movingBag: [0, 0, 1],
            ans: 'BANC'
        },
        {
            left: 12,
            right: 12,
            movingBag: [0, 0, 1],
            ans: 'BANC'
        },
    ]

    const step = 65;
    const leftPointerBase = -110;
    const rightPointerBase = -80;
    const frame = frames[frameIndex];

    const rectContainer = React.useRef<SVGGElement>(null);

    React.useEffect(() => {
        const previousFrame = frameIndex > 0 ? frames[frameIndex - 1] : null;
        // moving pointers
        const leftPointer = getElementById('leftPointer');
        leftPointer.setAttribute('transform', `translate(${leftPointerBase + frame.left * step}, 0)`)

        const rightPointer = getElementById('rightPointer');
        rightPointer.setAttribute('transform', `translate(${rightPointerBase + frame.right * step}, 0)`)

        const leftPointerShadow = getElementById('leftPointerShadow');
        leftPointerShadow.setAttribute('display', 'none');
        if (previousFrame) {
            if (previousFrame.left !== frame.left) {
                leftPointerShadow.setAttribute('display', 'block');
                leftPointerShadow.setAttribute('transform', `translate(${leftPointerBase + previousFrame.left * step}, 0)`)
            }
        }

        // color rectangles
        const rects: Element[] = getChildrenFromRef(rectContainer)

        for (const rect of rects) {
            rect.setAttribute('fill', 'blue');
        }

        if (frame.isSubset == true) {
            for (let i = frame.left; i <= frame.right; i++) {
                rects[i].setAttribute('fill', 'green');
            }
        }

        //superset sign
        const supersetControl = getElementById('superset');
        if (frame.isSubset == true) {
            supersetControl.innerHTML = '⊇';
            supersetControl.setAttribute('fill', 'green');
        } else {
            supersetControl.innerHTML = '⊅';
            supersetControl.setAttribute('fill', 'red');
        }

        // moving bag numbers
        const movingBagControl = getElementById('moving-bag-numbers');
        const movingBagNumbers = getChildren(movingBagControl);
        for (let i = 0; i < 3; i++) {
            //movingBagNumbers[i].setAttribute('fill', 'blue');
            movingBagNumbers[i].innerHTML = `${frame.movingBag[i]}`;

        }

        // moving-bag-rects
        if (previousFrame != null) {
            const movingBagRectControl = getElementById('moving-bag-rects');
            const movingBagRects = getChildren(movingBagRectControl);

            for (let i = 0; i < 3; i++) {
                movingBagRects[i].setAttribute('fill', 'blue');
                if (frame.movingBag[i] != previousFrame.movingBag[i]) {
                    movingBagRects[i].setAttribute('fill', 'red');
                }


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
        if (frameIndex + 1 < frames.length) {
            setFrameIndex(frameIndex + 1);
        }
    }

    function handleResetClick() {
        setFrameIndex(0);
    }

    const titleStyle = {
        fontSize: '40px',
        fontFamily: 'Arial Black'
    }

    return (
        <div className='ppt' style={{ width: 950 }}>
            <header>
                <img className='logo' src={logo} alt='logo' />
                <h1>76. Minimum Window Substring</h1>
            </header>
            <svg id='svg' width={950} height={550} style={{
                backgroundColor: 'white',
                cursor: 'url(Laser_Pointer.png), pointer!important'
            }}>
                <path id='leftPointer' transform='translate(-110, 0)' d="M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z" />
                <path id='leftPointerShadow' fill='transparent'
                    stroke-dasharray="3,3"
                    stroke='black' stroke-width="3" transform='translate(-110, 0)' d="M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z" />
                <path id='rightPointer' transform='translate(-80, 0)' d="M150 50 L150 80 L140 80 L160 100 L180 80 L170 80 L170 50 Z" />
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
                </g>
                <g id='chars' style={{
                    fontSize: '48px',
                    fill: 'white',
                    fontFamily: 'Arial Black'
                }}>
                    <text x='45' y='145'>A</text>
                    <text x='115' y='145'>D</text>
                    <text x='175' y='145'>O</text>
                    <text x='240' y='145'>B</text>
                    <text x='305' y='145'>E</text>
                    <text x='375' y='145'>C</text>
                    <text x='435' y='145'>O</text>
                    <text x='500' y='145'>D</text>
                    <text x='570' y='145'>E</text>
                    <text x='630' y='145'>B</text>
                    <text x='695' y='145'>A</text>
                    <text x='760' y='145'>N</text>
                    <text x='825' y='145'>C</text>
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
                </g>
                <g id='tbag'>
                    <text x='60' y='260' fill='black' style={titleStyle}>Moving-BAG</text>
                    <g id='tbagIndex'
                        style={{
                            fontSize: '32px',
                            fontFamily: 'Arial Black'
                        }}>
                        <text x='65' y='300'>A</text>
                        <text x='145' y='300'>B</text>
                        <text x='225' y='300'>C</text>
                    </g>
                    <g id='moving-bag-rects'
                        style={{
                            fill: 'blue',
                        }}>
                        <rect x={40} y={310} height='70' width='70'>
                        </rect>
                        <rect x={120} y={310} height='70' width='70'>
                        </rect>
                        <rect x={200} y={310} height='70' width='70'>
                        </rect>
                        <rect x={280} y={310} height='70' width='70'>
                        </rect>
                    </g>
                    <g id='moving-bag-numbers' style={{
                        fontSize: '60px',
                        fill: 'white',
                        fontFamily: 'Arial Black'
                    }}>
                        <text x='55' y='365'>0</text>
                        <text x='135' y='365'>0</text>
                        <text x='215' y='365'>0</text>
                        <text x='285' y='365'>...</text>
                    </g>
                </g>
                <text x='400' y='260' fill='black' style={titleStyle}>Has?</text>
                <text id='superset' x='400' y='380' fill='black' style={{
                    fontSize: 120,
                }}>⊇⊅</text>
                <g id='moving-bag' transform='translate(510,0)'>
                    <text x='60' y='260' fill='black' style={titleStyle}>Target-BAG</text>
                    <g id='tbagIndex'
                        style={{
                            fontSize: '32px',
                            fontFamily: 'Arial Black'
                        }}>
                        <text x='65' y='300'>A</text>
                        <text x='145' y='300'>B</text>
                        <text x='225' y='300'>C</text>
                    </g>
                    <g id='tbagRects'
                        style={{
                            fill: 'blue',
                        }}>
                        <rect x={40} y={310} height='70' width='70'>
                        </rect>
                        <rect x={120} y={310} height='70' width='70'>
                        </rect>
                        <rect x={200} y={310} height='70' width='70'>
                        </rect>
                        <rect x={280} y={310} height='70' width='70'>
                        </rect>
                    </g>
                    <g id='tbag' style={{
                        fontSize: '60px',
                        fill: 'white',
                        fontFamily: 'Arial Black'
                    }}>
                        <text x='55' y='365'>1</text>
                        <text x='135' y='365'>1</text>
                        <text x='215' y='365'>1</text>
                        <text x='285' y='365'>...</text>
                    </g>
                </g>
                <text x='50' y='470' style={{
                    fontSize: '32px',
                    fontFamily: 'Arial Black'
                }}>Current Answer:</text>
                <text id='ans' x='360' y='470' style={{
                    fontSize: '48px',
                    fontFamily: 'Arial Black'
                }}>{frame.ans}</text>


            </svg>
            <div className='btnbar'>
                <button className='btn' onClick={handleResetClick}>Reset</button>
                <button className='btn' onClick={handlePreviousClick}>Previous Step</button>
                <button className='btn' onClick={handleNextClick}>Next Step</button>
            </div>
        </div>
    );
}