import React, { useState } from "react";
import { FaUser, FaSeedling, FaChartBar, FaSignOutAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddNewPlant from "./AddNewPlant";
import Dashboard from "./Dashboard";
import ManageUsers from "./ManageUsers";
import ManagePlants from "./ManagePlants";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const navigate = useNavigate();

    const handleLogout = () => navigate("/");

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900">
            {/* Sidebar Navigation */}
            <aside className="w-1/5 bg-green-900 text-white p-6 flex flex-col space-y-6 shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-4">Admin Panel</h2>
                {["dashboard", "users", "plants", "addPlant"].map(tab => (
                    <button key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-300  ${activeTab === tab ? "bg-green-700" : "hover:bg-green-700"}`}>
                        {tab === "dashboard" && <FaChartBar size={20} />}
                        {tab === "users" && <FaUser size={20} />}
                        {tab === "plants" && <FaSeedling size={20} />}
                        {tab === "addPlant" && <FaPlus size={20} />}
                        <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                    </button>
                ))}
                <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-700 transition duration-300">
                    <FaSignOutAlt size={20} /> <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="w-4/5 p-8 bg-white shadow-md rounded-lg overflow-auto">
                {activeTab === "dashboard" && <Dashboard />}

                {activeTab === "users" && <ManageUsers />}

                {activeTab === "plants" && <ManagePlants/>}

                {activeTab === "addPlant" && <AddNewPlant />}
            </main>
        </div>
    );
};

export default AdminDashboard;
