import React, { useState } from 'react';
import Nft from './Nft';
import Progress from './Progress';
import n2 from '/nft/n2.jpg'
import toast, { Toaster } from 'react-hot-toast';


const MonthlyChallengesCard = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "List 500 KWH Energy", completed: false },
        { id: 2, title: "Reduce 500 kg of CO₂ emissions", completed: false },
    ]);

    const handleTaskCompletion = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const areAllTasksCompleted = tasks.every(task => task.completed);

    const claimNFT = () => {
        if (areAllTasksCompleted) {
            // Handle NFT reward claim logic here
            toast("Congratulations! You've completed all tasks and earned an NFT reward!");
        } else {
            toast("Please complete all tasks to claim your reward.");
        }
    };

    return (
        <>
                    <Toaster
            position="bottom-left" />
     
        <div className="border-[#0e9f6e] border-2 inline-block bg-neutral-900 p-6 rounded-xl shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Monthly Eco Challenges</h2>

            <div className='flex gap-3 items-center'>
                <div className='felx flex-col'>


                    <Progress percentage={36} />
                    <div className='mt-4'>
                        <h1 className="text-lg mb-2">Task</h1>
                        <div className="border border-[#0e9f6e] my-2"></div>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                            {tasks.map(task => (
                                <li key={task.id} className="flex text-xl items-center">
                                    <span className={task.completed ? "line-through" : ""}>{task.title}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={claimNFT}
                            className={`text-black bg-green-300 rounded-2xl text-[14px] w-full py-2 mt-4 ${areAllTasksCompleted ? "opacity-100" : "opacity-50"}`}
                            disabled={!areAllTasksCompleted}
                        >
                            {areAllTasksCompleted ? "Claim NFT Reward!" : "Completed All Tasks"}
                        </button>
                    </div>
                </div>

                <div>
                    <Nft img={n2} />
                </div>
            </div>
        </div>
        </>
    );
};

export default MonthlyChallengesCard;
