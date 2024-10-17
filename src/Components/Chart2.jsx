import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Chart2({ production, consumption }) {
  const [loading, setLoading] = useState(true);

  // Simulate a 3-second loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

 /*  if (loading) {
    return (
      <div style={{ width: '900px', height: '300px' }}>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <Skeleton height="300px" />
        </SkeletonTheme>
      </div>
    );
  } */

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
