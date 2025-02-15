import React, { useState, useContext } from 'react';
import { Context } from '../../AppContext/Context';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SimilarPlants = () => {
    const { plants, wishlistData, addToWishlist, removeFromWishlist, addToCart } = useContext(Context);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const navigate = useNavigate(); // Initialize navigate

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = plants.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(plants.length / productsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    const handleWishlist = (plant) => {
        wishlistData.some((item) => item.id === plant.id)
            ? removeFromWishlist(plant.id)
            : addToWishlist(plant);
    };

    const handleCart = (plant) => addToCart(plant);

    return (
        <div className="w-full">
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold mb-6 text-center">All Plants</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 transition-all duration-300">
                    {currentProducts.map((plant, index) => (
                        <div
                            key={plant.id}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeIn cursor-pointer flex flex-col relative"
                            onClick={() => navigate('/plantDesc', { state: { plant } })}
                        // Navigate to prodDesc page
                        >
                            <img
                                src={plant.primaryImage}
                                alt={plant.name}
                                className="w-full h-32 object-contain rounded-lg mb-4"
                            />

                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleWishlist(plant);
                                }}
                                className="absolute top-2 right-2 text-xl cursor-pointer"
                            >
                                {wishlistData.some((item) => item.id === plant.id) ? (
                                    <AiFillHeart className="text-red-500" />
                                ) : (
                                    <AiOutlineHeart className="text-gray-500 hover:text-red-500" />
                                )}
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-1">{plant.name}</h3>
                                <p className="text-gray-600 mb-1">{plant.categories.join(', ')}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-green-700 font-bold text-sm">{plant.price}</span>
                                    <span className="text-gray-500 text-xs">{plant.rating} ★</span>
                                </div>
                            </div>

                            <div className="flex justify-center mt-4 mb-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCart(plant);
                                    }}
                                    className="bg-green-800 text-white py-1 px-2 rounded text-xs hover:bg-green-600"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-6 items-center">
                    <button
                        onClick={handlePrevPage}
                        className="mx-2 p-2 rounded-full text-gray-700 hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
                        disabled={currentPage === 1}
                    >
                        <FaArrowLeft size={20} />
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`mx-1 px-4 py-2 rounded-full text-sm transition-all duration-300 
                                ${currentPage === index + 1
                                    ? 'bg-green-800 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={handleNextPage}
                        className="mx-2 p-2 rounded-full text-gray-700 hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
                        disabled={currentPage === totalPages}
                    >
                        <FaArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SimilarPlants;
