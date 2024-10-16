import React, { useState, useEffect } from 'react';

function QuestCard({ totalConsumption, renewableUsage }) {
  const [carbonSavings, setCarbonSavings] = useState(0);

  useEffect(() => {
    // Baseline carbon emissions for non-renewable energy sources (0.91 kg CO2 per kWh)
    const baselineEmissionsPerKWh = 0.91;

    // Calculate savings based on the user's renewable energy consumption
    const savings = renewableUsage * baselineEmissionsPerKWh;

    setCarbonSavings(savings.toFixed(2)); // Limit to 2 decimal places for readability
  }, [renewableUsage]);

  return (
    <div className="w-[285px] p-4 flex flex-col justify-center items-center rounded-xl border-[#0e9f6e] border-2 bg-neutral-900">
      <h1 className="mt-2 text-white font-bold text-left">
        Carbon Footprint Savings
      </h1>
      <h3 className="text-lg text-white">
        <div className="flex text-5xl my-6 justify-start">
          <span>910</span> <span className="ml-2">kg CO₂</span>
        </div>
      </h3>
      <div className="mt-2 text-white text-center">
        <p>You have saved CO₂</p>
      </div>
    </div>
  );
}

export default QuestCard;
