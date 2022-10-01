import React from 'react';
import logo from '../logo.png';

type Frame = {
    edgeRemoved?: boolean
    _35connected?: boolean
    fastPointer: number
    slowPointer: number
}

export default function Leetcode19() {
    const [frameIndex, setFrameIndex] = React.useState<number>(0)

    const crosses = React.useRef<SVGGElement>(null)
    const fastPointer = React.useRef<SVGPathElement>(null);
    const slowPointer = React.useRef<SVGPathElement>(null);
    const edge35 = React.useRef<SVGPathElement>(null);

    const frames: Frame[] = [
        {
            fastPointer: 0,
            slowPointer: -1
        },
        {
            fastPointer: 1,
            slowPointer: -1
        },
        {
            fastPointer: 2,
            slowPointer: -1
        },
        {
            fastPointer: 3,
            slowPointer: -1
        },
        {
            fastPointer: 3,
            slowPointer: 0
        },
        {
            fastPointer: 4,
            slowPointer: 0
        },
        {
            fastPointer: 4,
            slowPointer: 1
        },
        {
            fastPointer: 5,
            slowPointer: 1
        },
        {
            fastPointer: 5,
            slowPointer: 2
        },
        {
            _35connected: true,
            fastPointer: 5,
            slowPointer: 2
        },
        {
            edgeRemoved: true,
            _35connected: true,
            fastPointer: 5,
            slowPointer: 2
        }
    ]

    const frame = frames[frameIndex];


    React.useEffect(() => {
        if (crosses.current == null || edge35.current == null || fastPointer.current == null || slowPointer.current == null) {
            return;
        }

        if (frame.edgeRemoved) {
            crosses.current.setAttribute('opacity', '1');
        } else {
            crosses.current.setAttribute('opacity', '0');
        }

        if (frame._35connected) {
            edge35.current.setAttribute('opacity', '1');
        } else {
            edge35.current.setAttribute('opacity', '0');
        }

        fastPointer.current.setAttribute('transform', `translate(${frame.fastPointer * 200}, 0)`)

        if (frame.slowPointer<0) {
            slowPointer.current.setAttribute('transform', 'translate(-150, 0)')
        } else {
            slowPointer.current.setAttribute('transform', `translate(${frame.slowPointer * 200}, 0)`)
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



    const edgeStyle = {
        fill: 'none',
        stroke: '#000000',
        strokeWidth: 10,
        strokeLineCap: 'butt',
        strokeLineJoin: 'miter',
        markerEnd: 'url(#arrow-head)'
    }

    const pointerStyle = {
        paintOrder: 'fill markers stroke',
        markerEnd: "url(#arrow-head)",
        stroke: "#000",
        strokeWidth: "15"
    };

    const textStyle = {
        fontWeight: 'bold',
        fontSize: 50,
        fontFamily: 'Arial',
        fill: '#000000',
        strokeWidth: 0.5
    };

    const crossStyle = {
        fill: 'none',
        stroke: '#ab0000',
        strokeWidth: 10,
        strokeLineCap: 'butt',
        strokeLineJoin: 'bevel'
    };

    return (
        <div className='ppt' style={{ width: 950 }}>
            <header>
                <img className='logo' src={logo} alt='logo' />
                <h1>19. Remove Nth Node From End of List</h1>
            </header>
            <svg id='svg'
                width={1280} height={500} style={{
                    backgroundColor: 'white',
                    cursor: 'url(Laser_Pointer.png), pointer!important'
                }}>
                <defs>
                    <marker id="arrow-head" markerWidth="2.595" orient="auto" refX="0.3" refY="1.3"  >
                        <path transform="scale(.25) translate(-1,-1)" d="M2,2 L2,11 L10,6 L2,2" fill="#000" />
                    </marker>
                </defs>
                <g fill="none" stroke="#000">

                    <g strokeWidth="12">
                        <circle cx="200" cy="250" r="60" />
                        <circle cx="400" cy="250" r="60" />
                        <circle cx="600" cy="250" r="60" />
                        <circle cx="800" cy="250" r="60" />
                        <circle cx="1000" cy="250" r="60" />
                    </g>
                    <g style={edgeStyle}>
                        <path d="m265, 250 L315, 250" />
                        <path d="m465, 250 L515, 250" />
                        <path id='edge34' d="m665, 250 L715 250" />
                        <path id='edge45' d="m865, 250 L915 250" />
                        <path ref={edge35} id='edge35' d="m600 310.1c-1.0101 36.701-2.0202 73.402 68.708 94.161 70.728 20.759 213.18 25.579 284.15 6.9497 70.965-20 40-50 44-77" />
                    </g>
                </g>
                <g ref={crosses} fill="none" style={crossStyle}>
                    <g transform="translate(249.99 -249.99)" stroke="#ab0000">
                        <path d="m420, 470 L460, 530" stroke-width="10" />
                        <path d="m420, 530 L460, 470" stroke-width="10" />
                    </g>
                    <g transform="translate(249.99 -249.99)" stroke="#ab0000">
                        <path d="m620, 470 L660, 530" stroke-width="10" />
                        <path d="m620, 530 L660, 470" stroke-width="10" />
                    </g>
                </g>
                <g style={textStyle}>
                    <text x="190" y="268" >1</text>
                    <text x="390" y="268" ><tspan>2</tspan></text>
                    <text x="590" y="268" ><tspan>3</tspan></text>
                    <text x="790" y="268" ><tspan>4</tspan></text>
                    <text x="990" y="268" ><tspan>5</tspan></text>
                </g>
                <path ref={fastPointer} id="fast-pointer" d="M205, 95 L205, 160" style={pointerStyle} />
                <path ref={slowPointer} id="slow-pointer" d="M205, 95 L205, 160" style={pointerStyle} transform='translate(-150, 0)' />
            </svg>
            <div className='btnbar'>
                <button className='btn' onClick={handleResetClick}>Reset</button>
                <button className='btn' onClick={handlePreviousClick}>Previous Step</button>
                <button className='btn' onClick={handleNextClick}>Next Step</button>
            </div>
        </div>
    );
}