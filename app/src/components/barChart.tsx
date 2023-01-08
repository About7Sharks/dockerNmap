import { useEffect, useState } from "react";
import { BarChart } from "react-chartkick";
import "chartkick/chart.js";

export const DeviceCountChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const cleaned = data.filter((d) => d.mac && d.count).map((d) => [d.mac, d.count]);
    setChartData(cleaned);
  }, [data]);
  
  return (
    <div style={{ width: '860px'}}>
        <h1>Frequency Data</h1>
        <BarChart
        id="frequency"
        loading="Loading..."
        empty="No data"
        data={chartData}
        xtitle="Count"
        ytitle="Device MAC Address"
        library={{backgroundColor: "#ffffff"}}
        />
    </div>
  );
};
