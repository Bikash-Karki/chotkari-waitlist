"use client"

import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';

// Import the ToastNotification component
import ToastNotification from './Toast';

import './styles/joinwaitlist.css';
import './styles/giveaway-sec.css';

export default function JoinWaitlist() {
    const API = process.env.API_URL
    const [name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [isToastSuccess, setIsToastSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://api.dev.chotkari.com/api/v1/waitlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                }),
            });

            if (response.ok) {
                console.log('Successfully joined the waitlist!');
                setToastMessage('Successfully joined the waitlist!');
                setIsToastSuccess(true);

                // Clear the input fields
                setFullName('');
                setEmail('');
            } else {
                console.error('Failed to join the waitlist. Please try again.');
                setToastMessage('Failed to send message. Please try again.');
                setIsToastSuccess(false);
            }
        } catch (error) {
            console.error('An error occurred while joining the waitlist.', error);
            setToastMessage('An error occurred. Please try again later.');
            setIsToastSuccess(false);
        }
    };

    return (
        <>
            <section className="ck-join-waitlist-section-container" id='join-waitlist'>
                <div className="ck-join-waitlist-inner-container">
                    <div className="ck-join-waitlist-info">
                        <h1 className="font-bold tracking-tight text-justify sm:text-4xl ck-giveaway-h1">Join our Waitling List</h1>
                        <p className="mt-5 text-lg leading-8 text-justify ck-giveaway-p">
                            Indulge yourself into a world of greatness where you'll be a part of a community that values information, connection, and the joy of reading.
                            Don't miss out on the opportunity to experience the future of news/article delivery first-hand, as we are giving away merchandise to a selected few.
                        </p>
                    </div>
                    <div className="ck-joinwaitlsit-form-container">
                        <form className="max-w-sm w-full" onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <input
                                    type="text"
                                    id="full name"
                                    value={name}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="ck-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:white dark:border-gray-600 dark:placeholder-gray-400 d dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className="mb-5">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="ck-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:white dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ck-waitlist-btn"
                            >
                                Join Waitlist <span><FaArrowRight /></span>
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Display the toast notification only when response.ok is true */}
            {isToastSuccess && <ToastNotification message={toastMessage} success={true} />}
        </>
    );
}
