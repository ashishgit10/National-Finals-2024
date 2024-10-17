// Dynamic.js
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../Components/Sidebar';
import WalletId from '../Components/WalletId';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Dynamic = () => {
  const [toggle, setToggle] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);

  // Section 1: Daily Line Chart Data
  const dailyChartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Surplus Energy',
        data: [10, 12, 15, 18, 20, 25, 30],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Normal Energy',
        data: [8, 10, 12, 10, 11, 13, 12],
        borderColor: 'yellow',
        backgroundColor: 'rgba(255, 255, 0, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Deficit Energy',
        data: [5, 6, 7, 5, 4, 6, 8],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const dailyChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Daily Energy Production vs Usage' },
    },
  };

  // Section 2: Hourly Bar Chart Data
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`); // Labels for each hour
  const surplusEnergy = [5, 7, 3, 10, 12, 0, 0, 15, 18, 10, 5, 2, 0, 20, 22, 5, 7, 0, 10, 15, 12, 5, 8, 3]; // Example hourly data

  const hourlyChartData = {
    labels: hours,
    datasets: [
      {
        label: 'Surplus Energy (kWh)',
        data: surplusEnergy,
        backgroundColor: surplusEnergy.map((value) =>
          value > 0 ? 'rgba(0, 255, 0, 0.7)' : 'rgba(0, 0, 0, 0.2)'
        ),
        borderColor: 'green',
        borderWidth: 1,
      },
    ],
  };

  const hourlyChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Hourly Surplus Energy (Available for Sale)' },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return value > 0
              ? `Surplus Energy: ${value} kWh (Available for Sale)`
              : `Surplus Energy: ${value} kWh`;
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedHour(hours[index]);
        toast(`You selected ${hours[index]} with surplus energy: ${surplusEnergy[index]} kWh`);
      }
    },
  };

  return (
    <>
         <Toaster position="top-center" />
      <div className="">
        <Sidebar />
        <WalletId />
        <div className="lg:pt-24 bg-black lg:pl-64">
          <div style={{ padding: '20px', color: 'white' }}>
            <h1 className='text-3xl '>Dynamic Dashboard</h1>
            <button
              onClick={() => setToggle(!toggle)}
              style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}
              className='border bg-[#23f7dd] mt-5 rounded-xl text-black'
            >
              {toggle ? 'Disable' : 'Enable'} Sections
            </button>

            {toggle && (
              <div>
              <h2 className='text-3xl'><span className='text-cyan-500 font-semibold'>Daily </span>Energy Chart</h2>
                {/* Section 1: Daily Line Chart */}
                <div style={{ margin: '20px 0' }}
                className='bg-neutral-900 p-4 rounded-lg w-full'
                >
               
                  <Line data={dailyChartData} options={dailyChartOptions} />
                </div>

                {/* Section 2: Hourly Bar Chart */}
                <div style={{ }}>
                  <h2 className='text-3xl mt-4 '><span className='text-cyan-500  font-semibold'>Hourly-Surplus</span> Energy Chart</h2>
                  <div className='bg-neutral-900 p-4 rounded-lg mt-3 w-full'>

                                    <Bar data={hourlyChartData} options={hourlyChartOptions} />
                  </div>
                </div>

                {/* Display Selected Hour Info */}
                {selectedHour && (
                  <div style={{ marginTop: '20px', fontSize: '18px' }}>
                    <strong>{`Selected Hour: ${selectedHour}`}</strong>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dynamic;
