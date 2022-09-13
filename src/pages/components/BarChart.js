// import "./styles.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function Chart({port_data, metric}) {

  console.log('raw data : ', port_data, metric)

  let calculatedTVPi = {}

  for(let key in port_data['Fund name'])  {
    let distribution =  port_data['Total distributed '][key]
    let nav = port_data['NAV'][key]
    let called = port_data['Total called'][key]
    let tvpi = ((distribution + nav)/called).toFixed(2)
    if(!calculatedTVPi[tvpi]) {
      calculatedTVPi[tvpi] = 0
    }
    calculatedTVPi[tvpi]++
  }
  console.log('calculatedTVPi : ', calculatedTVPi)
  const data = []
  for(let key in calculatedTVPi) {
    data.push({
      name: 'TVPI',
      count: calculatedTVPi[key],
      tvpi: key
    })
  }
  return (
    <ResponsiveContainer width={'100%'} height={500} >
        <BarChart
        // width={500}
        // height={300}
        data={data}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="tvpi"   />
        <YAxis />
        <Tooltip />
        <Legend by={'tvpi'} />
        <Bar dataKey="count" fill="#65A7C9" minPointSize={20} />
        {/* <Bar dataKey="uv" fill="#D8DBA7" /> */}
        </BarChart>
    </ResponsiveContainer>
  );
}
