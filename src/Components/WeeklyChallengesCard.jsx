import React, { useState, useEffect } from 'react';
import Nft from './Nft';
import Progress from './Progress';
import n1 from '/nft/n1.webp'
import toast, { Toaster } from 'react-hot-toast';
import { ToastToggle } from 'flowbite-react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const WeeklyChallengesCard = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "List 100 KWH Energy", completed: false },
        { id: 2, title: "Reduce 5 kg of CO₂ emissions", completed: false },
    ]);
    const [loading, setLoading] = useState(true);
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
            ToastToggle("Please complete all tasks to claim your reward.");
        }
    };

    useEffect(() => {
        // Simulate loading for 3 seconds
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer); // Clean up timer on unmount
    }, []);
    return (
        <>
            <Toaster
                position="bottom-left" />

            <div className="border-[#0e9f6e] border-2 inline-block bg-neutral-900 p-4 rounded-xl shadow-lg text-white">
                <h2 className="text-2xl font-bold mb-4">Weekly Eco Challenges</h2>

                <div className='flex gap-3 items-center'>
                    <div className='felx flex-col'>


                        <Progress percentage={36} />
                        <div className='mt-4'>
                            <h1 className="text-lg mb-2">Task</h1>
                            <div className="border border-[#0e9f6e] my-2"></div>
                            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                <ul className="list-disc list-inside ml-4 space-y-2">
                                    {loading ? (

                                        <>
                                            <Skeleton height={30} width={200} />
                                            <Skeleton height={30} width={250} />
                                        </>
                                    ) : (

                                        tasks.map(task => (
                                            <li key={task.id} className="flex text-xl items-center">
                                                <div className='bg-neutral-900'>
                                                    <span className={task.completed ? "line-through" : ""}>
                                                        <span className='bg-neutral-700 p-1'>{task.title}</span>
                                                    </span>
                                                </div>
                                                {/*   <button onClick={() => handleTaskCompletion(task.id)} className="ml-2">
                                                    {task.completed ? "Undo" : "Complete"}
                                                </button> */}
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </SkeletonTheme>
                        </div>
                    </div>

                    <div>
                        <Nft img={n1} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeeklyChallengesCard;
