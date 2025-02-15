import React, { useContext, useState } from 'react';
import { Context } from '../../AppContext/Context';
import { FaRupeeSign } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineHeart } from 'react-icons/ai';  // Wishlist Empty Icon
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const { wishlistData, addToCart, removeFromWishlist } = useContext(Context);
    const navigate = useNavigate();
    
    const [buttonBounce, setButtonBounce] = useState(null); // State to control button bounce effect

    const handleRemoveFromWishlist = (plantId) => {
        removeFromWishlist(plantId);
    };

    const handleAddToCart = (plant) => {
        addToCart(plant);
    };

    return (
        <div className="container mx-auto p-10">

            <h2 className="text-4xl font-semibold mb-4 text-center text-gray-800">Your Wishlist</h2>
            <p className="text-lg text-center text-gray-600 mb-10">
                Discover and manage your favorite plants. Add them to your cart whenever you're ready.
            </p>

            {wishlistData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                    <AiOutlineHeart className="text-gray-400 text-7xl mb-4" /> {/* Empty Wishlist Icon */}
                    <p className="text-xl text-gray-600 mb-4">Your wishlist is currently empty.</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
                    >
                        Browse Plants
                    </button>
                </div>
            ) : (
                <div className="space-y-6 relative">
                    {wishlistData.map((plant) => (
                        <div
                            key={plant.id}
                            className="wishlist-item flex items-center justify-between bg-white p-3 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 hover:bg-gray-50"
                        >
                            <img
                                src={plant.primaryImage}
                                alt={plant.name}
                                className="w-24 h-24 object-cover rounded-xl mr-6 transition-transform duration-200 transform hover:scale-105"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{plant.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{plant.categories.join(', ')}</p>
                                <div className="flex justify-items-start items-center">
                                    <FaRupeeSign />
                                    <span className="font-bold text-lg">{plant.price}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleAddToCart(plant)}
                                className={`bg-green-700 text-white m-6 py-1 px-4 rounded-full hover:bg-green-600 transition duration-300 transform ${buttonBounce === plant.id ? 'animate-bounce' : ''}`}
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => handleRemoveFromWishlist(plant.id)}
                                className="text-red-700 hover:text-red-500 p-2 mr-2 rounded-full transition duration-300 transform hover:scale-110"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
