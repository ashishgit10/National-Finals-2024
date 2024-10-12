import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Chart2(props) {
  return (
    <LineChart
    sx={{
        //change left yAxis label styles
       "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
        strokeWidth:"0.9",
        fill:"#ffff"
       },
       // change all labels fontFamily shown on both xAxis and yAxis
       "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
           fontFamily: "Roboto",
        },
        // change bottom label styles
        "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
            strokeWidth:"0.9",
            fill:"#ffff"
         },
          // bottomAxis Line Styles
         "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
          stroke:"#ffff",
          strokeWidth:0.9
         },
         // leftAxis Line Styles
         "& .MuiChartsAxis-left .MuiChartsAxis-line":{
          stroke:"#ffff",
          strokeWidth:0.9
         }
      }}
    xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
    series={[
      {
        data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
        showMark: ({ index }) => index % 2 === 0,
      },
    ]}
    width={900}
    height={300}
    
  />
  );
}
