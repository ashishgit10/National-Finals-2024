import React, { useState } from 'react';
import axios from 'axios';
import WalletId from '../Components/WalletId';
import dashbg from '/Bg/dash.jpg';
import Monitor from '../Components/Monitor';
import Sidebar from '../Components/Sidebar';

const sidebar = [
    { id: "1", name: "Home", href: "/home" },
    { id: "2", name: "Transaction", href: "/transact" },
    { id: "3", name: "Wallet", href: "/" }
];

const Dashboard = () => {
    const [name, setName] = useState('');
    const [energyData, setEnergyData] = useState({ production: 0, consumption: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

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

            {isSidebarOpen && <div className=''><Sidebar/></div>}


            <WalletId toggleSidebar={toggleSidebar} />
            <Monitor />
        </div>
    );
};

export default Dashboard;
