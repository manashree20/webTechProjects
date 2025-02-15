import React, { useContext } from 'react';
import { Context } from '../AppContext/Context';
import axios from 'axios';

const ManageUsers = () => {
    const { users, setUsers } = useContext(Context);

    // Function to delete a user
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/userData/${id}`);
            setUsers(prev => prev.filter(user => user.userId !== id)); // Remove user from state
            alert("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        }
    };

    return (
        <div>
            <section>
                <h1 className="text-3xl font-semibold mb-6">Manage Users</h1>
                <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-gradient-to-r from-green-500/70 to-green-700/70 text-black">
                        <tr>
                            <th className="p-3 text-left">Sr.No</th>
                            <th className="p-3 text-left">Username</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Contact</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter(user => !user.isAdmin) // Show only normal users
                            .map((user,index) => (
                                <tr key={user.userId } className="border-t hover:bg-gray-100 font-semibold">
                                    <td className="p-3">{index +1}</td>
                                    <td className="p-3">{user.username}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.contact}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleDelete(user.userId)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default ManageUsers;
