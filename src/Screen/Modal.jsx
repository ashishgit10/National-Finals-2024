import React from 'react';

const Modal = ({ message }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
                <h2>{message}</h2>
            </div>
        </div>
    );
};

export default Modal;
