import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Chart({ data }) {
  return (
    <LineChart
      sx={{
        // Style customizations
        "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
          strokeWidth: "0.9",
          fill: "#ffff"
        },
        "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
          fontFamily: "Roboto",
        },
        "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
          strokeWidth: "0.9",
          fill: "#ffff"
        },
        "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
          stroke: "#ffff",
          strokeWidth: 0.9
        },
        "& .MuiChartsAxis-left .MuiChartsAxis-line": {
          stroke: "#ffff",
          strokeWidth: 0.9
        }
      }}
      xAxis={[{ data: Array.from({ length: data.length }, (_, i) => i + 1) }]} // Dynamically generate x-axis
      series={[
        {
          data: data,
          showMark: ({ index }) => index % 2 === 0,
        },
      ]}
      width={250}
      height={200}
    />
  );
}
