import React, { useContext } from "react";
import { Context } from "../AppContext/Context";
import { Pie, Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from "chart.js";
import { FaUsers, FaSeedling } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const Dashboard = () => {
    const { users, plants } = useContext(Context);

    // Price Ranges in Indian Rupees (₹)
    const priceRanges = {
        "Below ₹500": 0,
        "₹500 - ₹1000": 0,
        "₹1000 - ₹2000": 0,
        "Above ₹2000": 0
    };

    plants.forEach(plant => { 
        if (plant.price < 500) priceRanges["Below ₹500"]++;
        else if (plant.price >= 500 && plant.price < 1000) priceRanges["₹500 - ₹1000"]++;
        else if (plant.price >= 1000 && plant.price < 2000) priceRanges["₹1000 - ₹2000"]++;
        else priceRanges["Above ₹2000"]++;
    });

    const priceRangeData = {
        labels: Object.keys(priceRanges),
        datasets: [{
            label: "Price Distribution",
            data: Object.values(priceRanges),
            backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#E91E63"],
        }]
    };

    // Best Selling Plants Data
    const bestSellingPlants = plants.sort((a, b) => b.totalSalesLastMonth - a.totalSalesLastMonth).slice(0, 5);
    const bestSellingData = {
        labels: bestSellingPlants.map(plant => plant.name),
        datasets: [{
            label: "Best Selling Plants",
            data: bestSellingPlants.map(plant => plant.totalSalesLastMonth),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        }]
    };

    // Most Rated Plants Data
    const mostRatedPlants = plants.sort((a, b) => b.rating - a.rating).slice(0, 5);
    const mostRatedData = {
        labels: mostRatedPlants.map(plant => plant.name),
        datasets: [{
            label: "Most Rated Plants",
            data: mostRatedPlants.map(plant => plant.rating),
            backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33EC"],
        }]
    };
    // Season-wise Plant Distribution (Filtered Seasons)
    const validSeasons = ["Summer", "All Year", "Winter", "Monsoon"];
    const seasonCounts = plants.reduce((acc, plant) => {
        const plantSeasons = Array.isArray(plant.season) ? plant.season : [plant.season];
        plantSeasons.forEach(seasons => {
            if (validSeasons.includes(seasons)) {
                acc[seasons] = (acc[seasons] || 0) + 1;
            }
        });
        return acc;
    }, {});

    const seasonWiseData = {
        labels: Object.keys(seasonCounts),
        datasets: [{
            label: "Plants by Season",
            data: Object.values(seasonCounts),
            backgroundColor: ["#FFD700", "#FF4500", "#00CED1", "#32CD32"],
        }]
    };

    // User Role Distribution
    // const userRoles = users.reduce((acc, user) => {
    //     const role = user.isAdmin ? "Admin" : "User";
    //     acc[role] = (acc[role] || 0) + 1;
    //     return acc;
    // }, {});

    // const userRoleData = {
    //     labels: Object.keys(userRoles),
    //     datasets: [{
    //         label: "User Role Distribution",
    //         data: Object.values(userRoles),
    //         backgroundColor: ["#FF5733", "#33FF57"],
    //     }]
    // };

    return (
        <div className=" p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-green-700 text-center">Admin Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 shadow-lg rounded-lg flex items-center gap-4">
                    <FaUsers className="text-gray-700 text-4xl" />
                    <div>
                        <h2 className="text-lg font-semibold">Total Users</h2>
                        <p className="text-3xl font-bold text-green-600">{users.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 shadow-lg rounded-lg flex items-center gap-4">
                    <FaSeedling className="text-gray-700 text-4xl" />
                    <div>
                        <h2 className="text-lg font-semibold">Total Plants</h2>
                        <p className="text-3xl font-bold text-green-600">{plants.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 shadow-lg rounded-lg flex items-center gap-4">
                    <AiOutlineStock className="text-gray-700 text-4xl" />
                    <div>
                        <h2 className="text-lg font-semibold">Total Stocks</h2>
                        <p className="text-3xl font-bold text-green-600">
                            {plants.reduce((total, plant) => total + (plant.quantityAvailable || 0), 0)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Charts Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                {/* Best Selling Plants Bar Chart */}
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-lg font-semibold mb-4 text-center">Best Selling Plants (Last Month)</h2>
                    <div className="w-full h-[300px]">
                        <Bar data={bestSellingData} options={{ maintainAspectRatio: false, responsive: true }} />
                    </div>
                </div>
                {/* Price Ranges Pie Chart */}
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-lg font-semibold mb-4 text-center">Plant Price Ranges (₹)</h2>
                    <div className="w-full h-[300px]">
                        <Pie data={priceRangeData} options={{ maintainAspectRatio: false, responsive: true }} />
                    </div>
                </div>

                {/* Most Rated Plants Bar Chart */}
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-lg font-semibold mb-4 text-center">Most Rated Plants</h2>
                    <div className="w-full h-[300px]">
                        <Doughnut data={mostRatedData} options={{ maintainAspectRatio: false, responsive: true }} />
                    </div>
                </div>

                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-lg font-semibold mb-4 text-center">Season-wise Plant Distribution</h2>
                    <div className="w-full h-[300px]">
                        <Bar data={seasonWiseData} options={{ maintainAspectRatio: false, responsive: true }} />
                    </div>
                </div>

                {/* User Role Distribution Pie Chart */}
              

            
            </div>
        </div>
    );
};

export default Dashboard;
