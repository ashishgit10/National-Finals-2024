import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CarbonSavingsCard = ({ energySaved = 763.5 }) => {
    const COAL_EMISSIONS_FACTOR = 0.91;
    const NATURAL_GAS_EMISSIONS_FACTOR = 0.45;
    const MILES_PER_KG_CO2 = 2.75;
    const TREES_PER_KG_CO2 = 0.015;

    const co2SavedCoal = (energySaved * COAL_EMISSIONS_FACTOR).toFixed(2);
    const co2SavedNaturalGas = (energySaved * NATURAL_GAS_EMISSIONS_FACTOR).toFixed(2);
    const milesEquivalent = (co2SavedCoal * MILES_PER_KG_CO2).toFixed(1);
    const treesEquivalent = (co2SavedCoal * TREES_PER_KG_CO2).toFixed(1);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call with a 3-second loading time
        const timer = setTimeout(() => {
            setLoading(false); // Stop loading after 3 seconds
        }, 3000);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    // Conditional rendering based on loading state
    if (loading) {
        return (
            <div className="bg-neutral-900 border-2 border-[#0e9f6e] p-6 rounded-xl shadow-lg text-white">
                <h2 className="text-2xl font-bold mb-4">
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton width={150} />
                    </SkeletonTheme>
                </h2>
                <div className="text-lg mb-2">
                    <div className='flex flex-col'>
                        <SkeletonTheme baseColor="#202020" highlightColor="#444">

                            <Skeleton height={50} width={100} />
                        </SkeletonTheme>
                        <span className="font-bold">
                            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                <Skeleton width={100} />
                            </SkeletonTheme>
                        </span>
                    </div>
                </div>
                <div className="border-t border-[#23f7dd] my-2"></div>
                <p className="text-lg mb-2">
                    <span className="font-bold">
                        <SkeletonTheme baseColor="#202020" highlightColor="#444">

                            <Skeleton width={100} />
                        </SkeletonTheme>
                    </span>
                </p>
                <ul className="list-disc list-inside ml-4">
                    <li>
                        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                            <Skeleton width={200} />

                        </SkeletonTheme>
                    </li>
                    <li>
                        <SkeletonTheme baseColor="#202020" highlightColor="#444">

                            <Skeleton width={200} />
                        </SkeletonTheme>
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <div className="bg-neutral-900 border-2 border-[#0e9f6e] p-6 rounded-xl shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Energy & Carbon Savings</h2>
            <p className="text-lg mb-2">
                <div className='flex flex-col'>
                    <div className='text-5xl text-[#23f7dd] font-semibold'>{energySaved}&nbsp;kWh</div>
                    <span className="font-bold">Energy Saved</span>
                </div>
            </p>
            <div className="border-t border-[#23f7dd] my-2"></div>
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
