import React from 'react';
import { FaHome } from 'react-icons/fa';
import { BiGhost } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-600 text-white">
            <div className="flex items-center gap-4">
                <BiGhost className="text-9xl text-yellow-400 animate-bounce" />
                <h1 className="text-9xl font-bold">404</h1>
            </div>
            <h2 className="text-3xl font-semibold mt-4">Whoops! You seem lost.</h2>

            <Link
                to="/"
                className="mt-6 flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black text-lg rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300"
            >
                <FaHome className="text-xl" /> Back to Home
            </Link>

        </div>
    );
};

export default PageNotFound;
