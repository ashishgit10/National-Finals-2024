import React from 'react';

const CarbonSavingsCard = ({ energySaved = 763.5 }) => {
    // Constants for calculation
    const COAL_EMISSIONS_FACTOR = 0.91; // kg CO₂ per kWh for coal
    const NATURAL_GAS_EMISSIONS_FACTOR = 0.45; // kg CO₂ per kWh for natural gas
    const MILES_PER_KG_CO2 = 2.75; // average miles driven per kg CO₂ avoided
    const TREES_PER_KG_CO2 = 0.015; // estimated number of trees to offset 1 kg CO₂ per year

    // Calculations
    const co2SavedCoal = (energySaved * COAL_EMISSIONS_FACTOR).toFixed(2);
    const co2SavedNaturalGas = (energySaved * NATURAL_GAS_EMISSIONS_FACTOR).toFixed(2);
    const milesEquivalent = (co2SavedCoal * MILES_PER_KG_CO2).toFixed(1);
    const treesEquivalent = (co2SavedCoal * TREES_PER_KG_CO2).toFixed(1);

    return (
        <div className=" bg-neutral-900 border-2 border-[#0e9f6e] p-6 rounded-xl shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Energy & Carbon Savings</h2>
            <p className="text-lg mb-2">
                <div className='fle flex-col'>
                    <div className='text-5xl'>{energySaved}&nbsp;kWh</div>
                    <span className="font-bold">Energy Saved</span> 
                </div>
            </p>
            <div className="border-t border-[#23f7dd]  my-2"></div>
            <p className="text-lg mb-2">
                <span className="font-bold">Equivalent to:</span>
            </p>
            <ul className="list-disc list-inside ml-4">
                <li>{milesEquivalent} miles of driving avoided</li>
                <li>{treesEquivalent} trees planted</li>
            </ul>
        </div>
    );
};

export default CarbonSavingsCard;
