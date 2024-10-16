import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function QuestCard({ totalConsumption, renewableUsage }) {
  const [carbonSavings, setCarbonSavings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
    const baselineEmissionsPerKWh = 0.91;


    const savings = renewableUsage * baselineEmissionsPerKWh;

    setCarbonSavings(savings.toFixed(2)); 

  
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); 
  }, [renewableUsage]);

  return (
    <div className="w-[300px] p-4 flex flex-col justify-center items-center rounded-xl border-[#0e9f6e] border-2 bg-neutral-900">
      <h1 className="mt-2 text-white font-bold text-left">
        Carbon Footprint Savings
      </h1>

      {loading ? (
       
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <Skeleton height={60} width={120} className="my-6" />
        </SkeletonTheme>
      ) : (
        <h3 className="text-lg text-white">
          <div className="flex text-5xl text-[#23f7dd] font-semibold my-6 justify-start">
            <span>910</span> <span className="ml-2">kg CO₂</span>
          </div>
        </h3>
      )}

      <div className="mt-2 text-white text-center">
        <p>You have saved CO₂ Emisson</p>
      </div>
    </div>
  );
}

export default QuestCard;
