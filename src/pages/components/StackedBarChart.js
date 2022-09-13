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

const getStrategies = (portfolio, filterBy) => {
  let ids = {}
  for(let key in portfolio.strategy) {
    if(!ids[portfolio.strategy[key]]) {
      ids[portfolio.strategy[key]] = []
    }
    if(filterBy.includes(key)) {
      ids[portfolio.strategy[key]].push(key)
    }
  }
  return ids
}

const getFilteredData = (portfolio, metric) => {
  let ids = []
  for(let key in portfolio.metric) {
    if(portfolio.metric[key] === metric) {
      ids.push(key)
    }
  }
  return ids
}

const DataFormater = (number) => {
  if(number > 1000000000){
    return (number/1000000000).toString() + 'B';
  }else if(number > 1000000){
    return (number/1000000).toString() + 'M';
  }else if(number > 1000){
    return (number/1000).toString() + 'K';
  }else{
    return number.toString();
  }
}

export default function StackedBarChart({portfolio, metric}) {

  let years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031]

  let newData = []

  let filtered = getFilteredData(portfolio, metric)
  let strategiesIdsCallsCum = getStrategies(portfolio, filtered)

  for(let year of years) {
    let strategyByYear = {}
    for(let key in strategiesIdsCallsCum) {
      strategyByYear[key] = strategiesIdsCallsCum[key].reduce((total, id) => total + portfolio[year][id], 0)
    }
    newData.push({
      name: year,
      strategies: Object.keys(strategyByYear),
      ...strategyByYear
    })  
  }
  return (
    <ResponsiveContainer width={'100%'} height={500} >
        <BarChart
          data={newData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={DataFormater} />
          <Tooltip />
          <Legend />
          {Object.keys(strategiesIdsCallsCum || {}).map(strategy => (
            <Bar dataKey={strategy} stackId={'a'} fill="#65A7C9" />
          ))}
          {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
        </BarChart>
    </ResponsiveContainer>
  );
}
