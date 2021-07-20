import React from "react";
import { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

let symbol = ["BTC"];

// Get time-series data
let dataUrl =
  "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" +
  symbol +
  "&tsym=USD&limit=400";

// Get current price
let priceUrl =
  "https://min-api.cryptocompare.com/data/price?fsym=" + symbol + "&tsyms=USD";

function App() {
  const [appState, setAppState] = useState({
    loading: false,
    data: null,
    price: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    let arr = [];
    let arr1 = [];
    // Get price
    fetch(priceUrl)
      .then((response) => response.json())
      .then((data1) => {
        let price = data1.USD;
        arr1.push(price);
        // Get time-series
        fetch(dataUrl)
          .then((res) => res.json())
          .then((data) => {
            for (const key of data.Data.Data) {
              let data = [key.time * 1000, key.close];
              arr.push(data);
            }
            setAppState({ loading: false, data: arr, price: arr1 });
          });
      });
  }, [setAppState]);

  let data = appState.data;
  let price = appState.price;
  

  const options = {
    chart: {
      backgroundColor: "white",
      type: "area",
      height: "500px",
    },
    title: {
      text: `<h1 id="chart-title">${symbol} $${price}</h1>`,
      align: "left",
    },
    plotOptions: {
      series: {
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
      },
    },
    series: [
      {
        name: symbol,
        data: data,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  };

  return (
    <div id="container">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
}

export default App;
