import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Chart2({ production, consumption }) {
  return (
    <LineChart
      sx={{
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
        },
        "& .MuiChartsLegend-root .MuiTypography-root": { // Target legend label text specifically
          color: "#ffffff"
        }

      }}
      xAxis={[{ data: Array.from({ length: production.length }, (_, i) => i + 1) }]} // Dynamic x-axis labels
      series={[
        { curve: "natural", data: production, label: "Production (kWh)" },
        { curve: "natural", data: consumption, label: "Consumption (kWh)" },
      ]}


      width={900}
      height={300}
    />
  );
}
