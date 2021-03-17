import { random, range } from "lodash";
import React from "react";
import { ChartData, Line } from "react-chartjs-2";
import "./App.css";

const teaGreen = "#77B41B";

const DAYS = 365;

function App() {
  const labels = range(1, DAYS + 1);
  const startPrice = random(1, 100);

  const prices = Array(labels.length + 1)
    .fill(startPrice)
    .reduce((accumulator, _, index) => {
      if (index === 0) {
        return [startPrice];
      }
      const prevPrice = accumulator[index - 1];
      const sign = Math.pow(-1, random(0, 1));
      const nextPrice =
        prevPrice + (sign * random(0, Math.ceil(prevPrice))) / 100;
      return [...accumulator, nextPrice];
    }, []);

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
        borderJoinStyle: "miter",
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
