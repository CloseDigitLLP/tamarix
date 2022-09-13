import React, { useCallback, useState } from "react";
import { 
  PieChart,
  Pie,
  Sector,
  // Cell,
  ResponsiveContainer,
  Legend
} from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    id,
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 20}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      > Strategy:  {`${payload.name}`}</text> */}
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 20}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      > {id} {id !== 'No Data' && `: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 20}
        y={ey}
        dy={20}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};
// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// export default class Chart extends React.Component { 
//     state = {
//         activeIndex: 0
//     }
//     render() { 

//         const onPieEnter = useCallback(
//             (_, index) => {
//             setActiveIndex(index);
//             },
//             [setActiveIndex]
//         );
//         const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
//         const [metrics, setMetrics] = useState([
//             {label: 'Commitment ', checked: true},
//             {label: 'Total called', checked: false},
//             {label: 'Total distributed ', checked: false},
//             {label: 'NAV', checked: false},
//         ])

//         const getData = () => {
//             console.log(metrics, data[metrics.find(metric => metric.checked).label])
//             return Object.keys(data[metrics.find(metric => metric.checked).label]).map(key => ({ name: key, value: data[metrics.find(metric => metric.checked).label][key] }))
//         }

//         const getSum = () => {
//             return Object.keys(data[metrics.find(metric => metric.checked).label]).reduce((total, key) => (total + data[metrics.find(metric => metric.checked).label][key]), 0)
//         }


//         return (
//             <PieChart width={1200} height={600}>
//                 <Pie
//                     activeIndex={activeIndex}
//                     activeShape={renderActiveShape}
//                     data={data}
//                     cx={400}
//                     cy={200}
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     onMouseEnter={onPieEnter}
//                     paddingAngle={5}
//                 />

//                 {/* {getSum() === 0 &&
//                 <Pie
//                 data={[{name: 'No Data', value: 1}]}
//                 fill="#aaa" 
//                 cx={400}
//                 cy={200}
//                 innerRadius={60}
//                 outerRadius={80}
//                 dataKey="value"
//                 onMouseEnter={onPieEnter}
//                 activeIndex={activeIndex}
//                 activeShape={renderActiveShape}
//                 />
//                 } */}
//             </PieChart>
//         )
//     }
// }

const getCommitmentStats = (port_data, strategies) => {
  let stats = []
  for(let strategy in strategies) {
    stats.push({
      name: strategy,
      value: strategies[strategy].reduce((total, index) => total + port_data['Commitment '][parseInt(index)], 0)
    })
  }
  return stats
}

const getCalledStats = (port_data, strategies) => {
  let stats = []
  for(let strategy in strategies) {
    stats.push({
      name: strategy,
      value: strategies[strategy].reduce((total, index) => total + port_data['Total called'][parseInt(index)], 0)
    })
  }
  return stats
}

const getUnfundedStats = (port_data, strategies) => {
  let stats = []
  for(let strategy in strategies) {
    stats.push({
      name: strategy,
      value: strategies[strategy].reduce((total, index) => total + (port_data['Commitment '][parseInt(index)] - port_data['Total called'][parseInt(index)]), 0)
    })
  }
  return stats
}

const getNAVStats = (port_data, strategies) => {
  let stats = []
  for(let strategy in strategies) {
    stats.push({
      name: strategy,
      value: strategies[strategy].reduce((total, index) => total + port_data['NAV'][parseInt(index)], 0)
    })
  }
  return stats
}

const getChartData = (port_data, metric) => {
  let strategies = {}
  for(let key in port_data.Strategy) {
    if(!strategies[port_data.Strategy[key]]) {
      strategies[port_data.Strategy[key]] = []
    }
    strategies[port_data.Strategy[key]].push(key)
  }

  switch(metric) {
    case 'Commitment ': return getCommitmentStats(port_data, strategies);
    case 'Total called': return getCalledStats(port_data, strategies);
    case 'Total unfunded': return getUnfundedStats(port_data, strategies);
    case 'NAV': return getNAVStats(port_data, strategies);
    default: return getCommitmentStats(port_data, strategies);
  }
}

function Chart(props) {
  const { port_data, metric } = props
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const data = getChartData(port_data, metric)

  // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  // const [metrics, setMetrics] = useState([
  //   {label: 'Commitment ', checked: true},
  //   {label: 'Total called', checked: false},
  //   {label: 'Total distributed ', checked: false},
  //   {label: 'NAV', checked: false},
  // ])

  // const getData = () => {
  //   console.log(metrics, data[metrics.find(metric => metric.checked).label])
  //   return Object.keys(data[metrics.find(metric => metric.checked).label]).map(key => ({ name: key, value: data[metrics.find(metric => metric.checked).label][key] }))
  // }

  const getSum = () => {
    return data.reduce((total, key) => (total + key.value), 0)
  }
  return (
    <>
    <ResponsiveContainer width={'100%'} height={350} >
        <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Pie
                id={metric}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                // cx={400}
                // cy={200}
                innerRadius={80}
                outerRadius={110}
                fill="#65A7C9"
                dataKey="value"
                onMouseEnter={onPieEnter}
                paddingAngle={5}
            >
            </Pie>
            <Legend align="right"  />
            {getSum() === 0 &&
            <Pie
            id="No Data"
            data={[{name: 'No Data', value: 1}]}
            fill="#aaa" 
            // cx={400}
            // cy={200}
            innerRadius={80}
            outerRadius={110}
            dataKey="value"
            onMouseEnter={onPieEnter}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            />
            }
        </PieChart>
    </ResponsiveContainer>
    </>
  );
}

export default Chart