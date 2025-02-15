import React from "react";
import { FaSun, FaWater, FaTemperatureHigh, FaSeedling, FaLeaf } from "react-icons/fa"; // Replaced FaRegLeaf with FaLeaf
import { useLocation } from "react-router-dom";

const PlantCareInfo = () => {
    const location = useLocation();

    const { plant } = location.state; // Get plant data from location state

    // Hardcoded care tips for the plant
    const careTips = {
        takeCareOf: [
            "Ensure the plant gets adequate sunlight, preferably 4-6 hours daily.",
            "Keep the soil moist but not waterlogged. Water the plant when the top inch of soil feels dry.",
            "Fertilize the plant every 2-3 months during the growing season (spring and summer).",
            "Regularly check for pests, especially under the leaves and near the base of the plant.",
        ],
        careInstructions: [
            {
                title: "1. Sunlight",
                description:
                    "Place your plant in a spot that gets bright, indirect sunlight. Avoid direct sunlight as it can scorch the leaves.",
                icon: <FaSun className="text-yellow-500" />,
            },
            {
                title: "2. Watering",
                description:
                    "Water the plant when the top layer of the soil feels dry. Avoid letting the plant sit in water as this may lead to root rot.",
                icon: <FaWater className="text-blue-500" />,
            },
            {
                title: "3. Temperature & Humidity",
                description:
                    "Keep the plant in a warm environment, preferably between 65-75°F. The plant thrives in a humid atmosphere, so consider misting it or placing it near a humidity tray.",
                icon: <FaTemperatureHigh className="text-red-500" />,
            },
            {
                title: "4. Pruning",
                description:
                    "Remove any yellow or dead leaves to keep the plant healthy. Pruning also helps encourage new growth.",
                icon: <FaSeedling className="text-green-600" />,
            },
            {
                title: "5. Repotting",
                description:
                    "Consider repotting the plant every 1-2 years to ensure it has enough space to grow. Use a well-draining potting mix.",
                icon: <FaLeaf className="text-green-400" />, // Replaced FaRegLeaf with FaLeaf
            },
        ],
    };

    // Display plant information dynamically if the plant data exists
    if (!plant) return <div>Loading...</div>; // In case no plant is selected

    return (
        <div className="flex flex-col lg:flex-row p-6 mx-auto max-w-screen-xl bg-gray-100 rounded-lg shadow-lg">
            {/* Left Section: Plant Care Info */}
            <div className="lg:w-2/3 space-y-4">
                <h3 className="text-2xl font-semibold text-green-700">What You Should Take Care Of:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-800">
                    {careTips.takeCareOf.map((tip, index) => (
                        <li key={index} className="text-gray-800">
                            {tip}
                        </li>
                    ))}
                </ul>

                {/* Care Instructions */}
                <h3 className="text-2xl font-semibold text-green-700 mt-4">How to Take Care of {plant.name}:</h3>
                <div className="space-y-3 mt-4">
                    {careTips.careInstructions.map((instruction, index) => (
                        <div
                            key={index}
                            className="flex items-start space-x-3 p-3 rounded-lg bg-white shadow-md mb-3"
                        >
                            <div className="text-3xl">{instruction.icon}</div>
                            <div>
                                <h4 className="text-lg font-semibold text-green-600">{instruction.title}</h4>
                                <p className="text-gray-700">{instruction.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Section: Plant Specific Information */}
            <div className="lg:w-1/3 mt-6 lg:mt-0 lg:pl-8">
                <h3 className="text-2xl font-semibold text-green-900 mb-6">Plant Specific Information:</h3>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <ul className="space-y-4">
                        <li>
                            <h4 className="text-xl font-semibold text-green-700">Sunlight Requirement</h4>
                            <p className="text-gray-800">{plant.sunlightRequirement}</p>
                        </li>
                        <li>
                            <h4 className="text-xl font-semibold text-green-700">Moisture Requirement</h4>
                            <p className="text-gray-800">{plant.moistureRequirement}</p>
                        </li>
                        <li>
                            <h4 className="text-xl font-semibold text-green-700">Soil Type</h4>
                            <p className="text-gray-800">{plant.soilType}</p>
                        </li>
                        <li>
                            <h4 className="text-xl font-semibold text-green-700">Season</h4>
                            <p className="text-gray-800">{plant.season}</p>
                        </li>
                        <li>
                            <h4 className="text-xl font-semibold text-green-700">Growth Rate</h4>
                            <p className="text-gray-800">{plant.growthRate}</p>
                        </li>
                        <li>
                            <h4 className="text-xl font-semibold text-green-700">Pot Size Required</h4>
                            <p className="text-gray-800">{plant.potSizeRequired}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PlantCareInfo;
