interface IProps {
  x: number;
  y: number;
  scale: number;
  opacity?: number;
}

//this is from svgrepo.com
export default function Robber(props: IProps) {
  const transform = `translate(${props.x}, 100) scale(0.015) scale(-1, 1) rotate(180)`;
  const opacity: number = props.opacity ?? 1;
  return (
    <g transform={transform} opacity={opacity}>
      <path d='M5807.3,4996.1c-289.2-48.9-551.7-249.2-687.4-525c-71.2-144.6-82.3-191.3-91.2-360.4c-15.6-322.6,71.2-542.8,295.9-756.4c556.2-525,1470.5-209.1,1597.3,549.5c60.1,360.4-109,745.2-416,943.2C6294.4,4982.8,6043,5038.4,5807.3,4996.1z' />
      <path d='M3006.4,3474.5c-562.8-129-1141.2-453.8-1566.1-876.5c-387.1-387.1-571.7-751.9-594-1172.4C833,1152,879.7,951.8,1028.8,647C1280.1,139.8,1625-196.1,2061-358.5c200.2-73.4,571.7-93.4,783.1-40C3091-336.3,3302.3-216.2,3507-18.2c100.1,97.9,182.4,173.5,182.4,169.1c0-4.5-33.4-109-71.2-233.6c-62.3-191.3-73.4-258.1-73.4-447.2c0-367.1-84.5-284.7,1308.1-1245.8l1196.8-823.1l689.6-978.8c380.4-538.4,716.3-1005.5,749.7-1041.1c77.9-82.3,262.5-171.3,353.7-171.3c164.6,0,329.2,126.8,362.6,280.3c20,89-2.2,264.7-46.7,349.3c-129,249.2-1285.9,2244.6-1330.4,2291.4c-31.1,33.4-369.3,289.2-749.7,565.1l-694.1,502.8l33.4,75.6c15.5,42.3,151.3,458.3,295.9,925.4c146.8,467.2,271.4,863.2,278.1,878.7c6.7,15.6,229.1-206.9,525-527.2c542.8-585.1,591.8-625.1,774.2-625.1c126.8,0,1679.6,600.6,1764.1,683c73.4,71.2,115.7,206.9,95.6,309.2c-26.7,146.8-182.4,275.9-333.7,275.9c-42.3,0-360.4-71.2-705.2-155.7c-342.6-86.8-638.5-155.7-654-151.3c-35.6,8.9-983.3,1243.6-1094.5,1423.8c-106.8,178-224.7,264.7-453.8,340.4c-122.4,42.3-284.8,124.6-485,249.2c-491.6,309.2-816.4,449.4-1261.4,542.8C3876.3,3505.6,3213.3,3521.2,3006.4,3474.5z M3553.7,2602.4l44.5-62.3l-77.9-77.9l-75.6-80.1l44.5-86.8c60.1-115.7,60.1-295.9,0-413.8c-51.2-97.9-40-100.1-204.7,33.4l-77.9,64.5l33.4,86.8c55.6,140.1,6.7,137.9-157.9-11.1l-151.3-137.9l60.1-182.4c55.6-166.8,57.8-191.3,31.1-282.5c-86.8-313.7-442.7-462.7-745.2-313.7l-126.8,60.1l-71.2-69l-71.2-69l-48.9,51.2c-64.5,66.7-62.3,84.5,15.6,160.2l66.7,62.3l-48.9,91.2c-71.2,137.9-66.7,324.8,15.6,476.1c35.6,62.3,71.2,115.7,77.9,115.7c6.7,0,62.3-42.3,120.1-95.7l106.8-93.4l-35.6-86.8c-20-46.7-33.4-115.7-28.9-153.5l6.7-66.7l169.1,160.2l171.3,158l-44.5,140.1c-66.7,211.3-15.6,404.9,142.4,538.4c178,149.1,389.3,160.2,576.2,31.1c57.8-40,57.8-40,131.3,35.6c42.3,42.3,82.3,77.9,91.2,77.9S3527,2635.8,3553.7,2602.4z' />
      <path d='M2895.2,2302.1c-60.1-64.5-82.3-140.1-55.6-186.9c17.8-31.1,42.3-15.6,162.4,100.1l142.4,133.5L3042,2351C2964.2,2351,2930.8,2339.9,2895.2,2302.1z' />
      <path d='M2512.6,1527.9L2348,1378.9l77.9-26.7c64.5-22.2,95.6-20,157.9,6.7c91.2,37.8,126.8,93.4,126.8,195.8C2710.6,1688.1,2686.1,1685.9,2512.6,1527.9z' />
      <path d='M6570.3,2402.2c-24.5-6.7-53.4-20-64.5-28.9c-15.6-15.6,333.7-522.8,433.8-631.8c24.5-26.7,131.3,202.4,131.3,282.5c0,73.4-53.4,209.1-106.8,267C6875.1,2391.1,6712.7,2435.6,6570.3,2402.2z' />
      <path d='M3660.5-2018.1L3378-2471.9l-912.1,387.1c-502.8,211.3-954.4,391.5-1007.7,398.2c-267,40-525-178-527.2-442.7c0-113.5,71.2-260.3,169.1-344.8c42.3-37.8,569.5-315.9,1170.2-616.2c1225.8-614,1234.7-616.2,1454.9-522.8c62.3,26.7,149.1,86.7,191.3,131.2c189.1,200.2,1043.3,1276.9,1027.8,1294.7c-20,17.8-987.7,622.9-994.4,622.9C3947.5-1564.3,3818.4-1769,3660.5-2018.1z' />
    </g>
  );
}

/*
onlinewebfonts.com
*/