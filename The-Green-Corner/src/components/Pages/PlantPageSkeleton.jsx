import React from "react";

const PlantPageSkeleton = () => {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center min-h-screen bg-gray-100 p-6 animate-pulse">
            {/* Left Section */}
            <div className="flex flex-col items-start w-full lg:w-1/2 space-y-6">
                <div className="h-10 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-8 w-1/2 bg-gray-300 rounded"></div>
                <div className="h-12 w-1/3 bg-green-300 rounded"></div>
            </div>

            {/* Center Images Section */}
            <div className="flex flex-row w-full lg:w-1/2 justify-center space-x-4 mt-8 lg:mt-0">
                <div className="h-64 w-48 bg-gray-300 rounded-lg"></div>
                <div className="h-64 w-48 bg-gray-300 rounded-lg"></div>
                <div className="h-64 w-48 bg-gray-300 rounded-lg"></div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 space-y-4">
                <div className="h-8 w-full bg-gray-300 rounded"></div>
                <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                <div className="flex space-x-4 mt-4">
                    <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
                    <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default PlantPageSkeleton;
