import React from 'react'
import FlipNumbers from 'react-flip-numbers'

import WeatherCard from './WeatherCard'
import Chart from './Chart'
import Chart2 from './Chart2'
import cardbg from "/card/card.webp"
import particle from "/card/particle.webp"

const Monitor = () => {
    return (
        <div className='flex justify-center lg:justify-normal flex-col lg:pl-72 z-8  lg:pt-20 rounded-lg'>

            <div className='flex items-center  justify-center lg:justify-normal lg:items-center flex-wrap '>
                <div className='flex max-h-max overflow-hidden z-99 relative  backdrop-blur-md rounded-3xl shadow-lg  flex-col'>
                    <img srcSet={particle} className='absolute' />
                    <div className='relative z-[2] px-3'>
                        <div className='my-4'><h1 className='text-white text-2xl font-bold z-[2]'>Dashboard</h1></div>
                        <div className='flex mb-4 justify-between '>

                            <div><div className='text-white z-20'>House number :&nbsp;<span className='text-white'>13/94</span></div></div>
                            <div><div className='text-white z-20'>Microgrid number :&nbsp;<span className='text-white'>F343</span></div></div>
                        </div>

                    </div>
                    <div className='flex gap-4 justify-center flex-wrap px-3 pb-12'>

                        <div className="w-[240px] p-4  flex flex-col justify-start rounded-xl  bg-black/15 border-orange-500 border-2 backdrop-blur-md">
                            <h1 className="mt-2 text-white font-bold text-left ">
                                Total Production
                            </h1>
                            <h3 className="text-lg font-bold  text-white">
                                <div className='flex text-4xl justify-start'>+
                                    <FlipNumbers numberStyle={{
                                        fontSize: 26, justifyContent: "center"
                                    }} height={42} width={29} color="white" background="dark:text-white" play perspective={200} numbers="20" />
                                    <div className='text-white'>KWH</div>
                                </div>
                            </h3>
                            <div>
                                <p className='w-full border-b-[2px] border-b-orange-500 pb-3'></p>
                            </div>

                            <div> <h3 className='text-white'>Produce</h3></div>
                            <div>          <Chart />
                            </div>
                        </div>

                        <div className="w-[240px] p-4   flex flex-col justify-start rounded-xl bg-black/15 border-blue-500 border-2 backdrop-blur-md">
                            <h1 className="mt-2 text-white font-bold text-left ">
                                Total Consumption
                            </h1>
                            <h3 className="text-lg font-bold  text-white">
                                <div className='flex text-4xl justify-start'>-
                                    <FlipNumbers numberStyle={{
                                        fontSize: 26, justifyContent: "center"
                                    }} height={42} width={29} color="white" background="dark:text-white" play perspective={200} numbers="14" />
                                    <div className='text-white'>KWH</div>
                                </div>
                            </h3>
                            <div>
                                <p className='w-full border-b-[2px] border-b-blue-500 pb-3'></p>
                            </div>
                            <div> <h3 className='text-white'>Consume</h3></div>
                            <div>          <Chart />
                            </div>

                        </div>
                        <div className="w-[240px] p-4   flex flex-col justify-start rounded-xl bg-black/15 border-yellow-500 border-2 backdrop-blur-md">
                            <h1 className="mt-2 text-white font-bold text-left ">
                                Surplus Energy
                            </h1>
                            <h3 className="text-lg font-bold  text-white">
                                <div className='flex text-4xl justify-start'>+
                                    <FlipNumbers numberStyle={{
                                        fontSize: 26, justifyContent: "center"
                                    }} height={42} width={29} color="white" background="dark:text-white" play perspective={200} numbers="6" />
                                    <div className='text-white'>KWH</div>
                                </div>
                            </h3>
                            <div>
                                <p className='w-full border-b-[2px] border-b-yellow-500 pb-3'></p>
                            </div>
                            <div> <h3 className='text-white'>Surplus Energy</h3></div>
                            <div>

                                <Chart />
                            </div>
                        </div>
                        <div className="w-[240px] p-4   flex flex-col justify-start rounded-xl bg-black/15 border-blue-500 border-2 backdrop-blur-md">
                            <h1 className="mt-2 text-white font-bold text-left ">
                                Tokens
                            </h1>
                            <h3 className="text-lg font-bold  text-white">
                                <div className='flex text-4xl justify-start'>
                                    <FlipNumbers numberStyle={{
                                        fontSize: 26, justifyContent: "center"
                                    }} height={42} width={29} color="white" background="dark:text-white" play perspective={200} numbers="1" />
                                    <div className='text-white'>Token</div>
                                </div>
                                <div>
                                    <h3 className='text-white'>1 Token = 0.01ETH</h3></div>


                            </h3>
                            <div>
                                <p className='w-full border-b-[2px] border-b-blue-500 pb-3'></p>
                            </div>
                            <div> <h3 className='text-white'>Tokens</h3></div>

                        </div>


                    </div>
                </div>
             
                        <WeatherCard />
              
            </div>
            <div className='flex items-center justify-center lg:justify-normal lg:items-start flex-wrap '>

                <div className='max-w-7xl max-h-[440px] flex shadow-lg bg-white/10 backdrop-blur-md mt-4 rounded-3xl  justify-center items-center '>
                    <Chart2 />
                </div>

                <div className=" relative bg-white/10 overflow-hidden backdrop-blur-md mt-4 ml-4 p-8 rounded-3xl ">

                    <div className=' justify-start items-center flex flex-col'>

                        <h1 className='font-bold  text-white text-xl'>Load On MicroGrid</h1>
                        <div className='text-4xl text-white  font-bold'><span>60</span>%</div>
                    </div>
                    <img className='w-44 object-cover relative z-[-1] bottom-[-2px] scale-150' srcSet={cardbg} />
                </div>
            </div>
        </div>
    )
}

export default Monitor