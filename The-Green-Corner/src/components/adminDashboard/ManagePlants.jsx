import React, { useContext } from 'react';
import { Context } from '../AppContext/Context';

const ManagePlants = () => {
    const { plants } = useContext(Context);

    return (
        <div>
            <section>
                <h1 className="text-3xl font-semibold mb-6">Manage Plants</h1>
                <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-gradient-to-r from-green-500/70 to-green-700/70 text-black">

                        <tr>
                            <th className="p-3 text-left">Sr.No</th>
                            <th className="p-3 text-left">Plant Image</th>
                            <th className="p-3 text-left">Plant Name</th>
                            <th className="p-3 text-left">Stock</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plants
                            .slice() // To avoid mutating original array
                            .sort((a, b) => a.quantityAvailable - b.quantityAvailable) // Sorting by stock
                            .map((plant, index) => (
                                <tr key={plant.id} className="border-t hover:bg-gray-100 font-semibold">
                                    <td className="p-3 text-left">{index + 1}</td>
                                    <td className="p-3">
                                        <img src={plant.primaryImage} alt={plant.name} className="h-20 w-20" />
                                    </td>
                                    <td className="p-3">{plant.name}</td>
                                    <td className="p-3">{plant.quantityAvailable}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleDelete(plant.id, "plant")}
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default ManagePlants;
