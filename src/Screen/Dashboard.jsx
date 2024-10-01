import React, { startTransition, useState } from 'react';
import axios from 'axios';
import FlipNumbers from 'react-flip-numbers';
import WalletId from '../Components/WalletId';
import bg from '/Bg/dash.jpg';
import Monitor from '../Components/Monitor';

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
            <div className='bg-black h-[100vh]'>
                <WalletId />
                <Monitor/>
        
            </div>

        </>
    );
};

export default Dashboard;
