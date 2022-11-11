import * as d3 from 'd3';
import React, { SetStateAction, useEffect } from 'react';
import ButtonBar from '../controls/ButtonBar';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';
import html from '../Utils/html';

type Node = {
  child: string;
  parent: string;
};

export default function Leetcode0105() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < 17) {
      setFrameIndex(index);
    }
  }

  const data: Node[] = [
    { child: '3', parent: '' },
    { child: '9', parent: '3' },
    { child: '20', parent: '3' },
    { child: '15', parent: '20' },
    { child: '7', parent: '20' },
  ];

  const ds = d3
    .stratify<Node>()
    .id((d) => d.child)
    .parentId((d) => d.parent)(data);

  const treeStructure = d3.tree().size([1000, 300]);
  const treeInfo = treeStructure(ds);
  const hierNodes = treeInfo.descendants();
  const links = treeInfo.links();

  const pre1Ref = React.useRef<SVGGElement>(null);
  const in1Ref = React.useRef<SVGGElement>(null);
  const pre2Ref = React.useRef<SVGGElement>(null);
  const in2Ref = React.useRef<SVGGElement>(null);

  useEffect(() => {
    d3.select('#node0').attr('display', 'none');
    d3.select('#node1').attr('display', 'none');
    d3.select('#node2').attr('display', 'none');
    d3.select('#node3').attr('display', 'none');
    d3.select('#node4').attr('display', 'none');

    d3.select('#link0').attr('display', 'none');
    d3.select('#link1').attr('display', 'none');
    d3.select('#link2').attr('display', 'none');
    d3.select('#link3').attr('display', 'none');

    d3.select('#node2order').attr('display', 'none');

    d3.selectAll('text').style('dominant-baseline', 'middle').style('text-anchor', 'middle');

    const pre1Rects = html.getChildrenFromRef(pre1Ref);
    const in1Rects = html.getChildrenFromRef(in1Ref);
    const pre2Rects = html.getChildrenFromRef(pre2Ref);
    const in2Rects = html.getChildrenFromRef(in2Ref);
    for (const rect of pre1Rects) {
      rect.setAttribute('fill', '');
    }

    for (const rect of in1Rects) {
      rect.setAttribute('fill', '');
    }

    for (const rect of pre2Rects) {
      rect.setAttribute('fill', '');
    }

    for (const rect of in2Rects) {
      rect.setAttribute('fill', '');
    }

    let index = 1;
    if (frameIndex >= 1) {
      pre1Rects[0].setAttribute('fill', 'red');
    }
    index++;

    if (frameIndex >= index) {
      d3.select('#node0').attr('display', null);
    }
    index++;

    if (frameIndex >= index) {
      in1Rects[1].setAttribute('fill', 'red');
    }
    index++;

    if (frameIndex >= index) {
      in1Rects[0].setAttribute('fill', 'green');
    }
    index++;

    if (frameIndex >= index) {
      pre1Rects[1].setAttribute('fill', 'green');
    }
    index++;

    if (frameIndex >= index) {
      d3.select('#link0').attr('display', null);
      d3.select('#node1').attr('display', null);
    }
    index++;

    if (frameIndex >= index) {
      for (let i = 2; i < 5; i++) {
        pre1Rects[i].setAttribute('fill', 'purple');
        in1Rects[i].setAttribute('fill', 'purple');
      }
    }
    index++;

    if (frameIndex >= index) {
      d3.select('#link1').attr('display', '');
      d3.select('#node2order').attr('display', '');
    }
    index++;

    if (frameIndex >= index) {
      pre2Rects[0].setAttribute('fill', 'red');
    }
    index++;

    if (frameIndex >= index) {
      d3.select('#node2').attr('display', '');
    }
    index++;

    if (frameIndex >= index) {
      in2Rects[1].setAttribute('fill', 'red');
    }
    index++;

    if (frameIndex >= index) {
      in2Rects[0].setAttribute('fill', 'green');
    }
    index++;

    if (frameIndex >= index) {
      pre2Rects[1].setAttribute('fill', 'green');
    }
    index++;

    if (frameIndex >= index) {
      d3.select('#link2').attr('display', '');
      d3.select('#node3').attr('display', '');
    }
    index++;

    if (frameIndex >= index) {
      in2Rects[2].setAttribute('fill', 'purple');
      pre2Rects[2].setAttribute('fill', 'purple');
    }
    index++;

    if (frameIndex >= index) {
      d3.select('#link3').attr('display', '');
      d3.select('#node4').attr('display', '');
    }
    index++;
  }, [frameIndex]);

  const rectStyle = {
    fill: 'blue',
  };

  const nodeTextStyle = {
    fill: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  };

  const orderTextStyle = {
    fill: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  };

  const h2 = {
    fill: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  };

  const translate = 'translate(0, 75)';

  return (
    <>
      <svg id='svg' width={950} height={430}>
        <text x={190} y={35} style={h2}>
          Preorder
        </text>
        <text x={530} y={35} style={h2}>
          Inorder
        </text>
        <SvgRects ref={pre1Ref} x={130} y={55} n={5} offsetX={50} width={40} style={rectStyle}></SvgRects>
        <SvgTexts x={150} y={75} offsetX={50} text={' 3 92015 7'} step={2} style={orderTextStyle}></SvgTexts>
        <SvgRects ref={in1Ref} x={480} y={55} n={5} offsetX={50} width={40} style={rectStyle}></SvgRects>
        <SvgTexts x={500} y={75} offsetX={50} text={' 9 31520 7'} step={2} style={orderTextStyle}></SvgTexts>
        {/* pre2Ref */}
        <g id='node2order'>
          <SvgRects ref={pre2Ref} x={380} y={200} n={3} offsetX={50} width={40} style={rectStyle}></SvgRects>
          <SvgTexts x={400} y={225} offsetX={50} text={'2015 7'} step={2} style={orderTextStyle}></SvgTexts>
          {/* in2Ref */}
          <SvgRects ref={in2Ref} x={620} y={200} n={3} offsetX={50} width={40} style={rectStyle}></SvgRects>
          <SvgTexts x={640} y={225} offsetX={50} text={'1520 7'} step={2} style={orderTextStyle}></SvgTexts>
        </g>
        <g id='canvas' transform={translate}></g>
        <g id='links' transform={translate} style={{ stroke: 'blue', strokeWidth: 10 }}>
          <line
            id='link0'
            x1={links[0].source.x}
            y1={links[0].source.y}
            x2={links[0].target.x}
            y2={links[0].target.y}
            stroke='green'></line>
          <line
            id='link1'
            x1={links[1].source.x}
            y1={links[1].source.y}
            x2={links[1].target.x}
            y2={links[1].target.y}
            stroke='purple'></line>
          <line
            id='link2'
            x1={links[2].source.x}
            y1={links[2].source.y}
            x2={links[2].target.x}
            y2={links[2].target.y}
            stroke='green'></line>
          <line
            id='link3'
            x1={links[3].source.x}
            y1={links[3].source.y}
            x2={links[3].target.x}
            y2={links[3].target.y}
            stroke='purple'></line>
        </g>
        <g id='node0' transform={translate}>
          <circle cx={hierNodes[0].x} cy={hierNodes[0].y} r={40} fill='red'></circle>
          <text x={hierNodes[0].x} y={hierNodes[0].y} className='svg-text' style={nodeTextStyle}>
            {hierNodes[0].id}
          </text>
        </g>
        <g id='node1' transform={translate}>
          <circle cx={hierNodes[1].x} cy={hierNodes[1].y} r={40} fill='green'></circle>
          <text x={hierNodes[1].x} y={hierNodes[1].y} className='svg-text' style={nodeTextStyle}>
            {hierNodes[1].id}
          </text>
        </g>
        <g id='node2' transform={translate}>
          <circle cx={hierNodes[2].x} cy={hierNodes[2].y} r={40} fill='red'></circle>
          <text x={hierNodes[2].x} y={hierNodes[2].y} className='svg-text' style={nodeTextStyle}>
            {hierNodes[2].id}
          </text>
        </g>
        <g id='node3' transform={translate}>
          <circle cx={hierNodes[3].x} cy={hierNodes[3].y} r={40} fill='green'></circle>
          <text x={hierNodes[3].x} y={hierNodes[3].y} className='svg-text' style={nodeTextStyle}>
            {hierNodes[3].id}
          </text>
        </g>
        <g id='node4' transform={translate}>
          <circle cx={hierNodes[4].x} cy={hierNodes[4].y} r={40} fill='purple'></circle>
          <text x={hierNodes[4].x} y={hierNodes[4].y} className='svg-text' style={nodeTextStyle}>
            {hierNodes[4].id}
          </text>
        </g>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
