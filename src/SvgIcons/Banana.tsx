import IFruitProps from './IFruitProps';

export default function Pear(props: IFruitProps) {
  const transform = `scale(${props.scale}) translate(${props.x - 880}, ${props.y - 330})`;
  return (
    <g key={props.key} transform={transform}>
      <g id='XMLID_109_'>
        <path
          id='XMLID_23_'
          fill='#F2B91B'
          d='M1012.5,740.8c0,0,76-5.1,119.4-52.2c43.4-47.1,58.6-102.5,53.8-121
			c-4.8-18.5-12.3-28.5-12.3-28.5l20.2-9.6c0,0,2.6,26.9,13.1,37.4c10.5,10.5,62.1,48.4-9.4,143.6s-131.5,74.3-153.9,63.7
			s-41.8-16-39.6-22.9C1006,744.6,1007.3,741.4,1012.5,740.8z'
        />
      </g>
      <g id='XMLID_121_'>
        <path
          id='XMLID_295_'
          fill='#EFDF1A'
          d='M1055.3,754.5c110.3-5.6,159.4-92.4,178.6-141.7c-3.8-26.4-21.4-40.1-27.1-45.8
			c-10.5-10.5-13.1-37.4-13.1-37.4l-20.2,9.6c0,0,7.5,10,12.3,28.5c4.8,18.5-10.4,73.9-53.8,121c-43.4,47.1-119.4,52.2-119.4,52.2
			c-5.2,0.5-6.5,3.7-8.7,10.6c-0.1,0.2-0.1,0.5-0.1,0.7C1017.5,754.6,1034.5,755.5,1055.3,754.5z'
        />
      </g>
      <g id='XMLID_110_'>
        <path
          id='XMLID_24_'
          fill='#561114'
          d='M1084.4,789c-14.4,0-28.8-3.3-43.1-10.1c-5.9-2.8-11.7-5.3-16.8-7.4
			c-17.2-7.3-28.6-12.2-25.6-21.6c2.1-6.5,4.2-13.2,13.1-14.1c0.1,0,0.1,0,0.2,0c0.7-0.1,74.5-5.6,116-50.6
			c42.4-46.1,56.8-100.1,52.6-116.2c-4.5-17.1-11.4-26.6-11.4-26.7c-0.9-1.2-1.2-2.8-0.9-4.3c0.4-1.5,1.4-2.7,2.8-3.4l20.2-9.6
			c1.5-0.7,3.3-0.7,4.7,0.2c1.5,0.8,2.4,2.3,2.6,4c0.7,7,4.1,26.7,11.7,34.3c0.6,0.6,1.3,1.3,2.2,2.1
			c14.6,13.6,58.9,55.1-11.1,148.2C1164,763.6,1124.1,789,1084.4,789z M1009,752.2c2.2,2.4,11.8,6.5,19.5,9.8
			c5.2,2.2,11.1,4.7,17.2,7.6c48.7,23,99.8,1.5,147.6-62.2c64.4-85.7,26.6-121.2,12.3-134.5c-0.9-0.9-1.8-1.7-2.4-2.3
			c-8.2-8.2-12-24-13.6-33.4l-8.7,4.1c2.8,5,6.8,13.4,9.8,25c5.5,21-10.9,77.9-55,125.7c-43.9,47.7-118.5,53.6-122.8,53.9
			C1011.4,746.1,1010.9,746.3,1009,752.2z'
        />
      </g>
    </g>
  );
}

/*
This icon is from vecteezy.com
*/
