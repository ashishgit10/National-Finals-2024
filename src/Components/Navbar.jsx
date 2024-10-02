import React, { useState } from 'react'

import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useWallet } from '../context/WalletContext'
import { useNavigate } from 'react-router-dom'
const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Developers', href: '#' },
    { name: 'Marketplace', href: '#' },

]
export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { disconnectWallet, walletAddress } = useWallet();
    const navigate = useNavigate()
    if (walletAddress == '') {
        navigate('/');
    }
    console.log(walletAddress)
    const handleDisconnect = async () => {
        try {
            await disconnectWallet();
            console.log("Wallet disconnected successfully");
            navigate('/');
        } catch (error) {
            console.error("Error disconnecting wallet", error);
        }
    };


    function dashboard() {
        navigate("/dashboard")
    }
    return (
        <div> <header className="">
            <nav aria-label="Global" className="flex fixed z-[99] w-full rounded-3xl items-center  justify-end lg:justify-center bg-black p-4">
               
                <div className="flex z-[99] lg:hidden ">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-300">
                            {item.name}
                        </a>
                    ))}
                </div>
             {/*    <div className="hidden lg:flex lg:flex-1 lg:justify-end">

                    <button
                        onClick={handleDisconnect}
                        className=" px-4 py-2 bg-gray-600 text-white rounded">
                        Disconnect Wallet
                    </button>

                </div> */}
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-white"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                         {/*    <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div> */}
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header></div>
    )
}
