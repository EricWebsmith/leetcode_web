import React, { RefObject, useRef } from 'react';
import logo from '../logo.png';

type Frame = {
    display: RefObject<SVGGElement>[],
}

export default function Leetcode3() {
    const [frameIndex, setFrameIndex] = React.useState<number>(0)

    const step1 = useRef<SVGGElement>(null);
    const step2 = useRef<SVGGElement>(null);
    const step3 = useRef<SVGGElement>(null);

    const frames: Frame[] = [
        { display: [] },
        { display: [step1] },
        { display: [step1, step2] },
        { display: [step1, step2, step3] }
    ]

    const frame = frames[frameIndex];

    React.useEffect(() => {

        if (step1.current == null || step2.current == null || step3.current == null) {
            return
        }

        if (frame.display.includes(step1)) {
            step1.current.setAttribute('opacity', '1')
        } else {
            step1.current.setAttribute('opacity', '0.5')
        }

        if (frame.display.includes(step2)) {
            step2.current.setAttribute('opacity', '1')
        } else {
            step2.current.setAttribute('opacity', '0.5')
        }

        if (frame.display.includes(step3)) {
            step3.current.setAttribute('opacity', '1')
        } else {
            step3.current.setAttribute('opacity', '0.5')
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

    const circleStyle = {
        fill: 'none',
        stroke: '#000000',
        strokeWidth: 6,
        strokeDasharray: 'none'
    }

    const pathStyle = {
        fill: 'none',
        stroke: '#000000',
        strokeWidth: 6
    }

    const textStyle = {
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Microsoft YaHei',
        fill: '#000000',
        strokeWidth: 0.5
    }

    return (
        <div className='ppt' style={{ width: 950 }}>
            <header>
                <img className='logo' src={logo} alt='logo' />
                <h1>2421. Number of Good Paths</h1>
            </header>
            <svg id='svg'
                width={950} height={500} style={{
                    backgroundColor: 'white',
                    cursor: 'url(Laser_Pointer.png), pointer!important'
                }}>
                <g transform='translate(250, -75) scale(2)'>
                    <g id='step1'
                        ref={step1} >
                        <text
                            style={textStyle}
                            x="82.725006"
                            y="68.805"
                            id="node0index">0</text>
                        <text
                            style={textStyle}
                            x="81.120125"
                            y="240.11368"
                            id="node4index">4</text>
                        <circle
                            style={circleStyle}
                            id="node4"
                            cx="87.595482"
                            cy="233.86316"
                            r="12.67428" />
                        <circle
                            style={circleStyle}
                            id="node0"
                            cx="88.499985"
                            cy="62.009201"
                            r="12.67428" />
                    </g>
                    <g id='step2' ref={step2}>
                        <path
                            style={pathStyle}
                            d="M 134.67468,158.76246 92.072494,222.13241"
                            id="edge24" />
                        <circle
                            style={circleStyle}
                            id="node2"
                            cx="145.12216"
                            cy="142.14825"
                            r="20.156982" />
                        <path
                            style={pathStyle}
                            d="M 93.869805,73.728717 133.78183,125.36272"
                            id="edge02" />

                        <text
                            style={textStyle}
                            x="140.504"
                            y="148.04691"
                            id="node2index">2</text>
                    </g>
                    <g id='step3' ref={step3} >
                        <circle
                            style={circleStyle}
                            id="node5"
                            cx="210.60674"
                            cy="230.24521"
                            r="28.105545" />
                        <circle
                            style={circleStyle}
                            id="node1"
                            r="28.105545"
                            cy="132.55977"
                            cx="4.3819609" />
                        <circle
                            style={circleStyle}
                            id="node3"
                            r="28.105545"
                            cy="227.03865"
                            cx="-44.249352" />
                        <path
                            style={pathStyle}
                            d="M 25.916016,114.49896 78.789144,70.153781"
                            id="edge01" />


                        <path
                            style={pathStyle}
                            d="M -8.0646292,157.54651 -29.317187,204.91874"
                            id="edge13" />
                        <path
                            style={pathStyle}
                            d="m 161.51217,157.15902 33.132,49.8147"
                            id="edge25" />
                        <text

                            style={textStyle}
                            x="-0.57100153"
                            y="138.64189"
                            id="node1index">1</text>

                        <text
                            style={textStyle}
                            x="205.84399"
                            y="235.6619"
                            id="node5index">5</text>
                        <text
                            style={textStyle}
                            x="-49.081001"
                            y="233.6819"
                            id="node3index">3</text>
                    </g>
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