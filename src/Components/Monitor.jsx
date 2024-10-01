import React from 'react'
import FlipNumbers from 'react-flip-numbers'

const Monitor = () => {
    return (
        <div className='max-w-screen-lg m-auto'>
            <div className='flex justify-center flex-col'>
                <div className='my-4'><h1 className='text-white text-2xl'>Monitor Dashboard</h1></div>
                <div className='flex gap-10'>

                    <div className="w-[250px] p-4  flex flex-col justify-start rounded-xl  bg-neutral-900">
                        <h1 className="mt-2 text-gray-400 font-bold text-left ">
                            Total Production
                        </h1>
                        <h3 className="text-lg font-bold  text-white">
                            <div className='flex text-4xl justify-start'>
                                <FlipNumbers numberStyle={{
                                    fontSize: 36, justifyContent: "start"
                                }} height={42} width={35} color="white" background="dark:text-neutral-400" play perspective={200} numbers="1" />
                                <div>KWH</div>
                            </div>
                        </h3>
                        <div>
                            <p className='w-full border-b-[2px] border-b-orange-500 pb-3'></p>
                        </div>
                        <div> <h3 className='text-white'>Production</h3></div>

                    </div>

                    <div className="w-[250px] p-4   flex flex-col justify-start rounded-xl bg-neutral-900">
                        <h1 className="mt-2 text-gray-400 font-bold text-left ">
                            Total Consumption
                        </h1>
                        <h3 className="text-lg font-bold  text-white">
                            <div className='flex text-4xl justify-start'>
                                <FlipNumbers numberStyle={{
                                    fontSize: 36, justifyContent: "start"
                                }} height={42} width={35} color="white" background="dark:text-neutral-400" play perspective={200} numbers="1" />
                                <div>KWH</div>
                            </div>
                        </h3>
                        <div>
                            <p className='w-full border-b-[2px] border-b-blue-500 pb-3'></p>
                        </div>
                        <div> <h3 className='text-white'>Ethereum</h3></div>

                    </div>

                    <div className="w-[250px] p-4   flex flex-col justify-start rounded-xl bg-neutral-900">
                        <h1 className="mt-2 text-gray-400 font-bold text-left ">
                            Tokens
                        </h1>
                        <h3 className="text-lg font-bold  text-white">
                            <div className='flex text-4xl justify-start'>
                                <FlipNumbers numberStyle={{
                                    fontSize: 36, justifyContent: "start"
                                }} height={42} width={35} color="white" background="dark:text-neutral-400" play perspective={200} numbers="1" />
                                <div>Token</div>
                            </div>
                            <div>
                                <h3 className='text-white'>1 Token = 0.01ETH</h3></div>


                        </h3>
                        <div>
                            <p className='w-full border-b-[2px] border-b-yellow-500 pb-3'></p>
                        </div>
                        <div> <h3 className='text-white'>Tokens</h3></div>

                    </div>
                </div>
            </div>
            {/*==========-----------2nd Section---------=============*/}
            <div className='mt-10'>
                <div className="w-[300px] p-4  flex flex-col justify-start rounded-xl  bg-neutral-900">
                    <div className='pb-3 border-b-[1px] flex justify-between items-center'>
                        <div>
                            <h1 className="text-lg font-bold  border-gray-700 text-white">
                                Exchange
                            </h1>
                        </div>
                        <div>
                            <div className='text-white'>Buy</div>
                        </div>
                    </div>
                    <div>
                        <div className='mt-4'>
                            <div class="flex rounded-lg shadow-sm ">
                                <input type="text" class="py-2 px-3 pe-11 border outline-none block w-full border-gray-200 shadow-sm rounded-s-md text-sm focus:z-10 focus:border-white focus:ring-white disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                                <span class="px-4 inline-flex items-center min-w-fit rounded-r-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-white dark:bg-neutral-700 dark:border-neutral-700 ">ETH</span>
                            </div>
                            <div class="flex rounded-lg shadow-sm mt-2">
                                <input type="text" class="py-2 px-3 pe-11 border outline-none block w-full border-gray-200 shadow-sm rounded-s-md text-sm focus:z-10 focus:border-white focus:ring-white disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                                <span class="px-2 inline-flex items-center min-w-fit rounded-r-md border border-e-0 border-gray-200 bg-gray-50 text-xs text-white dark:bg-neutral-700 dark:border-neutral-700 ">Address</span>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className='text-white text-sm'>1 ETH = <span className='text-sky-500'>218,791</span>&nbsp;INR</div>
                            <div className='text-white text-sm'>Total fees: <span className='text-sky-500'>290</span>&nbsp;INR </div>

                        </div>
                        <div>
                            <button className='text-white text-[13px] bg-gradient-to-r from-orange-500 to-orange-300 rounded-sm w-full py-1 mt-4'>BUY</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Monitor