import React, { useState } from 'react'
import dashbg from '/Bg/dash.jpg';

const Transaction = () => {
    const [data, setdata] = useState({
        energy: '',
        amount: '',
        duration: ''
    }
    )
    const [buy, setbuy] = useState(true)

    const formdata = (e) => {
        e.preventDefault()
        console.log(data)
    }
    const handledata = (e) => {

        const { name, value } = e.target
        setdata(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    return (
        <div className='bg-white h-[100vh]'
            style={{
                backgroundImage: `url(${dashbg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                color: 'white'
            }}
        >
            <div>

                <form onSubmit={formdata} >
                    <div className="w-[300px] p-4  flex flex-col justify-start rounded-xl  bg-white/30 border-white border-2 backdrop-blur-md">
                        <div className='pb-3 border-b-[1px] flex justify-between items-center'>
                            <div>
                                <h1 className="text-lg font-bold  border-gray-700 text-black">
                                    Exchange
                                </h1>
                            </div>
                            <div className='flex border items-center py-1 px-2 rounded-lg gap-2'>
                                <div onClick={() => setbuy(!buy)} className={`text-black border px-2 rounded-lg cursor-pointer ${buy ? "bg-white" : ""} `}>Buy</div>
                                <div onClick={() => setbuy(!buy)} className={`text-black border px-2 rounded-lg cursor-pointer ${buy ? "" : "bg-white"} `}>Sell</div>

                            </div>
                        </div>
                        <div>
                            <div className='mt-4'>
                                <div className="flex rounded-lg shadow-sm ">
                                    <label htmlFor='energy' />
                                    <input type="number" name='energy' value={data.energy} onChange={handledata} className="py-2 px-3 pe-11 bg-transparent border-2 outline-none block w-full border-white shadow-sm rounded-s-md text-sm focus:z-10 focus:border-bltext-black focus:ring-bltext-black disabled:opacity-50 disabled:pointer-events-none   dark:text-black dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                                    <span className="px-4 inline-flex items-center min-w-fit rounded-r-md border-2 border-l-0 border-white bg-transparent font-bold text-sm text-black ">Energy</span>
                                </div>
                                <div className="flex rounded-lg shadow-sm mt-2">
                                    <label htmlFor='amount' />
                                    <input type="number" name='amount' value={data.amount} onChange={handledata} className="py-2 px-3 pe-11 bg-transparent border-2 outline-none block w-full border-white shadow-sm rounded-s-md text-sm focus:z-10 focus:border-bltext-black focus:ring-bltext-black disabled:opacity-50 disabled:pointer-events-none  dark:text-black dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                                    <span className="px-2 inline-flex items-center min-w-fit rounded-r-md border-2 border-l-0 border-white bg-transparent font-bold text-sm text-black  ">Address</span>
                                </div>
                                <div className="flex rounded-lg shadow-sm mt-2">
                                    <label htmlFor='duration' />
                                    <input type="number" name='duration' value={data.duration} onChange={handledata} className="py-2 px-3 pe-11 bg-transparent border-2 outline-none block w-full border-white shadow-sm rounded-s-md text-sm focus:z-10 focus:border-bltext-black focus:ring-bltext-black disabled:opacity-50 disabled:pointer-events-none  dark:text-black dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                                    <span className="px-2 inline-flex items-center min-w-fit rounded-r-md border-2 border-l-0 border-white bg-transparent font-bold text-sm text-black  ">Duration</span>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <div className='text-black text-sm'>1 ETH = <span className='text-sky-500'>218,791</span>&nbsp;INR</div>
                                <div className='text-black text-sm'>Total fees: <span className='text-sky-500'>290</span>&nbsp;INR </div>

                            </div>
                            <div>
                                <button className='text-black text-[13px] bg-gradient-to-r from-orange-500 to-orange-300 rounded-sm w-full py-1 mt-4' type='submit'>BUY</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Transaction