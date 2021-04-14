import { random, range } from "lodash";
import React from "react";
import { ChartData, Line } from "react-chartjs-2";
import "./App.css";

function getPrices(depth: number, startPrice: number): number[] {
  if (depth === 0) {
    return [startPrice];
  }
  const prices = getPrices(depth - 1, startPrice);
  const prevPrice = prices[depth - 1];
  const sign = Math.pow(-1, random(0, 1));
  const nextPrice = prevPrice + (sign * random(0, Math.ceil(prevPrice))) / 100;
  return [...prices, nextPrice];
}

const teaGreen = "#77B41B";

const DAYS = 365;

function App() {
  const labels = range(1, DAYS + 1);
  const startPrice = random(1, 100);

  const prices = getPrices(labels.length, startPrice);

  const data: ChartData<Chart.ChartData> = {
    labels,
    datasets: [
      {
        label: "BVB",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: teaGreen,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter", // TODO say why typescript failed
        pointBorderColor: teaGreen,
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: teaGreen,
        pointHoverBorderColor: teaGreen,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: prices,
      },
    ],
  };

  return (
    <div className="App">
      <header className="App-header">
        <Line data={data} />
      </header>
    </div>
  );
}

export default App;
