import { useState, useContext } from 'react';
import { Context } from '../../AppContext/Context'; // Access your main context where plants and wishlist are provided
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const AllPlant = () => {
    const { plants, wishlistData, addToWishlist, removeFromWishlist, addToCart } = useContext(Context); // Use context for plants and wishlist
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [visibleCount, setVisibleCount] = useState(8);

    // Filter plants based on search, filter category, and price range
    const filteredProducts = plants.filter((plant) => {
        const matchesCategory =
            filter === 'All' || plant.categories.some((data) => data === filter);
        const matchesSearchTerm = (plant.name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPriceRange = plant.price >= minPrice && plant.price <= maxPrice;

        return matchesCategory && matchesSearchTerm && matchesPriceRange;
    });

    // Only show a subset of products based on visibleCount
    const visibleProducts = filteredProducts.slice(0, visibleCount);

    // Handle navigation to plant description page
    const handleDesc = (plant) => {
        navigate('/plantDesc', { state: { plant } });
    };

    // Handle adding/removing from wishlist
    const handleWishlist = (plant) => {
        if (wishlistData.some((item) => item.id === plant.id)) {
            removeFromWishlist(plant.id); // Remove from wishlist
        } else {
            addToWishlist(plant); // Add to wishlist
        }
    };
    // Adding plant to cart
    const handleCart = (plant) => {
        addToCart(plant);
    }

    return (
        <div className="flex flex-col md:flex-row">
            {/* Filters Sidebar */}
            <div className="w-full md:w-1/4 p-4">
                <h2 className="text-2xl font-bold mb-4">Filters</h2>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search plants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-xl"
                />

                {/* Price Range Inputs */}
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Price Range:</h2>
                    <div className="flex items-center justify-between mb-2">
                        <span>{minPrice}</span>
                        <span>{maxPrice}</span>
                    </div>
                    <div className="relative">
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={minPrice}
                            onChange={(e) => {
                                if (Number(e.target.value) < maxPrice) setMinPrice(Number(e.target.value));
                            }}
                            className="absolute w-full h-2 bg-gray-300 rounded-lg"
                        />
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={maxPrice}
                            onChange={(e) => {
                                if (Number(e.target.value) > minPrice) setMaxPrice(Number(e.target.value));
                            }}
                            className="absolute w-full h-2 bg-green-700 rounded-lg"
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <h3 className="text-xl font-semibold mb-2">Search by Category</h3>
                <ul>
                    {['All', 'Outdoor Plants', 'Indoor Plants', 'Flowering Plants'].map((category) => (
                        <li key={category}>
                            <button
                                onClick={() => setFilter(category)}
                                className={`ml-5 block w-64 text-center p-2 mb-2 rounded ${filter === category
                                    ? 'bg-gray-400 text-black font-semibold'
                                    : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Plants Grid */}
            <div className="w-full md:w-3/4 p-4">
                <div className="container mx-auto p-6">
                    <h2 className="text-3xl font-bold mb-6 text-center">All Plants</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {visibleProducts.map((plant, index) => (
                            <div
                                key={plant.id}
                                style={{ animationDelay: `${index * 0.1}s` }}
                                className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeIn cursor-pointer relative"
                                onClick={() => handleDesc(plant)}
                            >
                                {/* Plant Image */}
                                <img
                                    src={plant.primaryImage}
                                    alt={plant.name}
                                    className="w-full h-32 object-contain rounded-lg"
                                />

                                {/* Wishlist Icon */}
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent card click when clicking the heart
                                        handleWishlist(plant); // Add/remove plant from wishlist
                                    }}
                                    className="absolute top-2 right-2 text-xl cursor-pointer"
                                >
                                    {wishlistData.some((item) => item.id === plant.id) ? (
                                        <AiFillHeart className="text-red-500" />
                                    ) : (
                                        <AiOutlineHeart className="text-gray-500 hover:text-red-500" />
                                    )}
                                </div>

                                {/* Plant Details */}
                                <div className="p-1">
                                    <h3 className="text-lg font-semibold mb-1">{plant.name}</h3>
                                    <p className="text-gray-600 mb-1">{plant.categories.join(', ')}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-green-700 font-bold text-sm">₹ {plant.price}</span>
                                        <span className="text-gray-500 text-xs">{plant.rating} ★</span>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <div className="flex justify-center m-2">
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        handleCart(plant)
                                    }}
                                        className="bg-green-800 text-white py-1 px-2 rounded text-xs hover:bg-green-600">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    {visibleProducts.length < filteredProducts.length && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setVisibleCount((prev) => prev + 8)}
                                className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-600"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllPlant;
