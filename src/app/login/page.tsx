"use client"; 

import React, { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react';
import Link from "next/link";
import Image from 'next/image'
import background from '../../../public/img/background1.jpeg'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // handle login logic here
    };

    // return (
    //     <div>
    //         <h1>Login</h1>
    //         <form onSubmit={handleSubmit}>
    //             <label>
    //                 Email:
    //                 <input type="email" value={email} onChange={handleEmailChange} />
    //             </label>
    //             <br />
    //             <label>
    //                 Password:
    //                 <input type="password" value={password} onChange={handlePasswordChange} />
    //             </label>
    //             <br />
    //             <button type="submit">Login</button>
    //         </form>
            
    //     </div>
    // );
}

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // handle registration logic here
    };

    return (
        <div>
            {/* <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <label>
                    Confirm Password:
                    <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </label>
                <br />
                <button type="submit">Register</button>
            </form> */}

            <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                    <h1 className="text-3xl font-bold text-center text-gray-700">Login</h1>
                    <form className="mt-6">
                        <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                        Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        </div>
                        <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        </div>
                        <Link
                        href="/forget"
                        className="text-xs text-blue-600 hover:underline"
                        >
                        Forget Password?
                        </Link>
                        <div className="mt-2">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                            Login
                        </button>
                        </div>
                    </form>

                    <p className="mt-4 text-sm text-center text-gray-700">
                        Dont have an account?{" "}
                        <Link
                        href="/signup"
                        className="font-medium text-blue-600 hover:underline"
                        >
                        Sign up
                        </Link>
                    </p>
                </div>
            </div>   
        </div>
    );
}

export default function Account() {
    return (
        <div>
            <Image
            alt="background"
            src={background}
            placeholder="blur"
            quality={100}
            fill
            sizes="100vw"
            style={{
            objectFit: 'cover',
            }}
            />
            <Login />
            <hr />
            <Register />
        </div>
    );
}
