import React from 'react'
import FlipNumbers from 'react-flip-numbers'

const Monitor = () => {
    return (
        <div className='max-w-screen-lg m-auto'>

            <div className='flex justify-center flex-col'>
                <div className='my-4'><h1 className='text-black text-2xl'>Monitor Dashboard</h1></div>
                <div className='flex mb-4 justify-between'>
                    <div><div className='text-black'>House number : <span className='text-black'>13/94</span></div></div>
                    <div><div className='text-black'>Microgrid number :<span className='text-black'>F343</span></div></div>

                </div>
                <div className='flex justify-around flex-wrap'>

                    <div className="w-[250px] p-4  flex flex-col justify-start rounded-xl  bg-white/30 border-white border-2 backdrop-blur-md">
                        <h1 className="mt-2 text-black font-bold text-left ">
                            Total Production
                        </h1>
                        <h3 className="text-lg font-bold  text-black">
                            <div className='flex text-4xl justify-start'>+
                                <FlipNumbers numberStyle={{
                                    fontSize: 26, justifyContent: "center"
                                }} height={42} width={29} color="black" background="dark:text-black" play perspective={200} numbers="1" />
                                <div className='text-black'>KWH</div>
                            </div>
                        </h3>
                        <div>
                            <p className='w-full border-b-[2px] border-b-orange-500 pb-3'></p>
                        </div>
                        <div> <h3 className='text-black'>Produce</h3></div>

                    </div>

                    <div className="w-[250px] p-4   flex flex-col justify-start rounded-xl bg-white/30 border-white border-2 backdrop-blur-md">
                        <h1 className="mt-2 text-black font-bold text-left ">
                            Total Consumption
                        </h1>
                        <h3 className="text-lg font-bold  text-black">
                            <div className='flex text-4xl justify-start'>-
                                <FlipNumbers numberStyle={{
                                    fontSize: 26, justifyContent: "center"
                                }} height={42} width={29} color="black" background="dark:text-black" play perspective={200} numbers="14" />
                                <div className='text-black'>KWH</div>
                            </div>
                        </h3>
                        <div>
                            <p className='w-full border-b-[2px] border-b-blue-500 pb-3'></p>
                        </div>
                        <div> <h3 className='text-black'>Consume</h3></div>

                    </div>

                    <div className="w-[250px] p-4   flex flex-col justify-start rounded-xl bg-white/30 border-white border-2 backdrop-blur-md">
                        <h1 className="mt-2 text-black font-bold text-left ">
                            Tokens
                        </h1>
                        <h3 className="text-lg font-bold  text-black">
                            <div className='flex text-4xl justify-start'>
                                <FlipNumbers numberStyle={{
                                    fontSize: 26, justifyContent: "center"
                                }} height={42} width={29} color="black" background="dark:text-black" play perspective={200} numbers="1" />
                                <div className='text-black'>Token</div>
                            </div>
                            <div>
                                <h3 className='text-black'>1 Token = 0.01ETH</h3></div>


                        </h3>
                        <div>
                            <p className='w-full border-b-[2px] border-b-yellow-500 pb-3'></p>
                        </div>
                        <div> <h3 className='text-black'>Tokens</h3></div>

                    </div>

                    <div className="w-[250px] p-4   flex flex-col justify-start rounded-xl bg-white/30 border-white border-2 backdrop-blur-md">
                        <h1 className="mt-2 text-black font-bold text-left ">
                            Surplus Energy
                        </h1>
                        <h3 className="text-lg font-bold  text-black">
                            <div className='flex text-4xl justify-start'>-
                                <FlipNumbers numberStyle={{
                                    fontSize: 26, justifyContent: "center"
                                }} height={42} width={29} color="black" background="dark:text-black" play perspective={200} numbers="14" />
                                <div className='text-black'>KWH</div>
                            </div>
                        </h3>
                        <div>
                            <p className='w-full border-b-[2px] border-b-blue-500 pb-3'></p>
                        </div>
                        <div> <h3 className='text-black'>Surplus Energy</h3></div>

                    </div>
                </div>
            </div>
            {/*==========-----------2nd Section---------=============*/}
            <div className='mt-10'>
                <div className="w-[300px] p-4  flex flex-col justify-start rounded-xl  bg-white/30 border-white border-2 backdrop-blur-md">
                    <div className='pb-3 border-b-[1px] flex justify-between items-center'>
                        <div>
                            <h1 className="text-lg font-bold  border-gray-700 text-black">
                                Exchange
                            </h1>
                        </div>
                        <div>
                            <div className='text-black'>Buy</div>
                        </div>
                    </div>
                    <div>
                        <div className='mt-4'>
                            <div className="flex rounded-lg shadow-sm ">
                                <input type="text" className="py-2 px-3 pe-11 bg-transparent border-2 outline-none block w-full border-white shadow-sm rounded-s-md text-sm focus:z-10 focus:border-bltext-black focus:ring-bltext-black disabled:opacity-50 disabled:pointer-events-none   dark:text-black dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                                <span className="px-4 inline-flex items-center min-w-fit rounded-r-md border-2 border-l-0 border-white bg-transparent font-bold text-sm text-black ">ETH</span>
                            </div>
                            <div className="flex rounded-lg shadow-sm mt-2">
                                <input type="text" className="py-2 px-3 pe-11 bg-transparent border-2 outline-none block w-full border-white shadow-sm rounded-s-md text-sm focus:z-10 focus:border-bltext-black focus:ring-bltext-black disabled:opacity-50 disabled:pointer-events-none  dark:text-black dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                                <span className="px-2 inline-flex items-center min-w-fit rounded-r-md border-2 border-l-0 border-white bg-transparent font-bold text-xs text-black  ">Address</span>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className='text-black text-sm'>1 ETH = <span className='text-sky-500'>218,791</span>&nbsp;INR</div>
                            <div className='text-black text-sm'>Total fees: <span className='text-sky-500'>290</span>&nbsp;INR </div>

                        </div>
                        <div>
                            <button className='text-black text-[13px] bg-gradient-to-r from-orange-500 to-orange-300 rounded-sm w-full py-1 mt-4'>BUY</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Monitor