import React, { useEffect, useState } from 'react';
import FlipNumbers from 'react-flip-numbers';
import WeatherCard from './WeatherCard';
import Chart from './Chart';
import Chart2 from './Chart2';
import cardbg from "/card/card.webp";
import particle from "/card/particle.webp";
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Monitor = () => {
    const [loading, setLoading] = useState(true);
    const [production, setProduction] = useState([20]);
    const [consumption, setConsumption] = useState([14]);
    const [surplus, setSurplus] = useState(production[production.length - 1] - consumption[consumption.length - 1]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newProduction = production[production.length - 1] + Math.floor(Math.random() * 10);
            const newConsumption = consumption[consumption.length - 1] + Math.floor(Math.random() * 8);

            setProduction((prev) => [...prev, newProduction]);
            setConsumption((prev) => [...prev, newConsumption]);
            setSurplus(newProduction - newConsumption);
        }, 5000);

        return () => clearInterval(interval);
    }, [production, consumption]);

    useEffect(() => {
        // Set loading to false after 3 seconds
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='flex justify-center lg:justify-normal flex-col lg:pl-72 z-8 lg:pt-20 rounded-lg'>
            <div className='flex items-center justify-center lg:justify-normal lg:items-center flex-wrap'>
                <div className='flex max-h-max overflow-hidden z-99 relative backdrop-blur-md rounded-3xl shadow-lg flex-col'>
                    <img srcSet={particle} className='absolute' />
                    <div className='relative z-[2] px-3'>
                        <div className='my-4'><h1 className='text-white text-2xl font-bold z-[2]'>Dashboard</h1></div>
                        <div className='flex mb-4 justify-between'>
                            <div className='text-white z-20'>House number: <span className='text-white'>13/94</span></div>
                            <div className='text-white z-20'>Microgrid number: <span className='text-white'>F343</span></div>
                        </div>
                    </div>

                    <div className='flex gap-4 justify-center flex-wrap px-3 pb-12'>
                        {/* Total Production */}
                        <div className="w-[240px] p-4 flex flex-col justify-start rounded-xl bg-black/15 border-orange-500 border-2 backdrop-blur-md">
                            <h1 className="mt-2 text-white font-bold text-left">Total Production</h1>
                            {loading ? (
                                <>
                                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                    <Skeleton height={40} width={120} />
                                    <Skeleton height={20} />
                                    <Skeleton height={100} />
                                
                                    </SkeletonTheme>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-lg font-bold text-white">
                                        <div className='flex text-4xl justify-start'>+
                                            <FlipNumbers numberStyle={{
                                                fontSize: 26, justifyContent: "center"
                                            }} height={42} width={29} color="white" background="dark:text-white" play perspective={200} numbers={production[production.length - 1].toString()} />
                                            <div className='text-white'>KWH</div>
                                        </div>
                                    </h3>
                                    <div className='w-full border-b-[2px] border-b-orange-500 pb-3'></div>
                                    <div><h3 className='text-white'>Produce</h3></div>
                                    <Chart data={production} />
                                </>
                            )}
                        </div>

                        {/* Total Consumption */}
                        <div className="w-[240px] p-4 flex flex-col justify-start rounded-xl bg-black/15 border-blue-500 border-2 backdrop-blur-md">
                            <h1 className="mt-2 text-white font-bold text-left">Total Consumption</h1>
                            {loading ? (
                                <>  <SkeletonTheme baseColor="#202020" highlightColor="#444">

                                    <Skeleton height={40} width={120} />
                                    <Skeleton height={20} />
                                    <Skeleton height={100} />
                                </SkeletonTheme>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-lg font-bold text-white">
                                        <div className='flex text-4xl justify-start'>-
                                            <FlipNumbers numberStyle={{
                                                fontSize: 26, justifyContent: "center"
                                            }} height={42} width={29} color="white" background="dark:text-white" play perspective={200} numbers={consumption[consumption.length - 1].toString()} />
                                            <div className='text-white'>KWH</div>
                                        </div>
                                    </h3>
                                    <div className='w-full border-b-[2px] border-b-blue-500 pb-3'></div>
                                    <div><h3 className='text-white'>Consume</h3></div>
                                    <Chart data={consumption} />
                                </>
                            )}
                        </div>

                        {/* Surplus Energy */}
                        <div className="w-[240px] p-4 flex flex-col justify-start rounded-xl bg-black/15 border-yellow-500 border-2 backdrop-blur-md">
                            <h1 className="mt-2 text-white font-bold text-left">Surplus Energy</h1>
                            {loading ? (
                                <>
                                <SkeletonTheme baseColor="#202020" highlightColor="#444">

                                    <Skeleton height={40} width={120} />
                                    <Skeleton height={20} />
                                    <Skeleton height={100} />
                                </SkeletonTheme>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-lg font-bold text-white">
                                        <div className='flex text-4xl justify-start'>+
                                            <FlipNumbers numberStyle={{
                                                fontSize: 26, justifyContent: "center"
                                            }} height={42} width={29} color="white" background="dark:text-white" play perspective={200} numbers={surplus.toString()} />
                                            <div className='text-white'>KWH</div>
                                        </div>
                                    </h3>
                                    <div className='w-full border-b-[2px] border-b-yellow-500 pb-3'></div>
                                    <div><h3 className='text-white'>Surplus Energy</h3></div>
                                    <Chart data={[...production.map((p, i) => p - consumption[i])]} />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <WeatherCard />
                <div className='flex items-center justify-center lg:justify-normal lg:items-start flex-wrap'>
                    <div className='max-w-7xl max-h-[440px] flex shadow-lg bg-white/10 backdrop-blur-md mt-4 rounded-3xl justify-center items-center'>
                        <Chart2 production={production} consumption={consumption} />
                    </div>
                    <div className="relative bg-white/10 overflow-hidden backdrop-blur-md mt-4 ml-4 p-8 rounded-3xl">
                        <div className='justify-start items-center flex flex-col'>
                            <h1 className='font-bold text-white text-xl'>Load On MicroGrid</h1>
                            <div className='text-4xl text-white font-bold'><span>60</span>%</div>
                        </div>
                        <img className='w-44 object-cover relative z-[-1] bottom-[-2px] scale-150' srcSet={cardbg} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Monitor;
