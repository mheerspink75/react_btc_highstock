import React from "react";
import { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

let symbol = "BTC";

let dataUrl =
  "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" +
  symbol +
  "&tsym=USD&limit=400";

function App() {
  const [appState, setAppState] = useState({
    loading: false,
    data: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    let arr = [];

    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        for (const key of data.Data.Data) {
          let data = [key.time * 1000, key.close];
          arr.push(data);
        }
        setAppState({ loading: false, data: arr });
      });
  }, [setAppState]);

  let data = appState.data;

  const options = {
    chart: {
      backgroundColor: "white",
      type: "line",
    },
    title: {
      text: symbol,
      align: "left",
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
      <div id="message">{appState.message}</div>
    </div>
  );
}

export default App;
