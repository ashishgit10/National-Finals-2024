import React, { startTransition, useState } from 'react';
import axios from 'axios';
import FlipNumbers from 'react-flip-numbers';
import WalletId from '../Components/WalletId';
import dashbg from '/Bg/dash.jpg';
import Monitor from '../Components/Monitor';

const sidebar = [
    { id: "1", name: "Home", href: "/home" },
    { id: "2", name: "Transaction", href: "/transact" },
    { id: "3", name: "Wallet", href: "/" }
]

const Dashboard = () => {
    const [name, setName] = useState('');
    const [energyData, setEnergyData] = useState({
        production: 0,
        consumption: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleConnect = async () => {
        if (!name) {
            alert('Please enter your name.');
            return;
        }

        setLoading(true);
        setError(null);

        try {

            const response = await axios.post('https://your-backend.com/api/connect', {
                name,
                address: 'user_wallet_address_here',
            });

            setEnergyData(response.data);
        } catch (err) {
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='bg-white h-[100vh]'
                style={{
                    backgroundImage: `url(${dashbg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    color: 'white'
                }}
            >
                <div className='w-52 border border-r-2 border-white bg-white/30 backdrop-blur-md h-screen absolute top-0 bottom-full'>
                    <div className='pt-20' >
                        <div className='my-4 px-6'><div className='text-black'>Pages</div></div>
                        <div className='px-10'>

                            {
                                sidebar.map(items => (
                                    <div key={items.id}>
                                        <a href={items.href}>

                                            <div className='text-black text-lg'>{items.name}</div>
                                        </a>
                                    </div>
                                ))}</div>
                    </div>

                </div>
                <WalletId />
                <Monitor />

            </div>

        </>
    );
};

export default Dashboard;
