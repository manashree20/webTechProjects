import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";
import { Context } from "../../AppContext/Context";
import { RxCross2 } from "react-icons/rx";

const Cart = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity ,} = useContext(Context);
    const cartCount = cart.length;
    const navigate = useNavigate();

    const handleRemoveFromCart = (plantId) => removeFromCart(plantId);

    const handleIncreaseQuantity = (plantId) => increaseQuantity(plantId);

    const handleDecreaseQuantity = (plantId, quantity) => {
        if (quantity === 1) {
            removeFromCart(plantId); // Remove item if quantity is 1
        } else {
            decreaseQuantity(plantId);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, plant) => total + (plant.price * (plant.quantity || 1)), 0).toFixed(2);
    };
    const handleCheckout =()=>{  
        navigate('/checkout')
        
    }

    return (
        <div className="container w-10/12 mx-auto p-6">
            {/* Cart Heading */}
            <h2 className="text-4xl font-semibold text-center text-gray-800">Your Cart</h2>
            <div className="flex items-center mt-4">
                <h2 className="text-2xl font-semibold">Cart</h2>
                <h2 className="text-2xl font-semibold ml-1 text-gray-600">({cartCount})</h2>
            </div>

            {/* If Cart is Empty */}
            {cart.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-xl text-gray-600 mb-4">Your cart is currently empty.</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition duration-300 flex items-center justify-center mx-auto"
                    >
                        <FaArrowLeft className="mr-2" /> Browse Plants
                    </button>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row mt-6">
                    {/* Cart Items */}
                    <section className="md:w-2/3 space-y-6">
                        {cart.map((plant) => (
                            <section
                                key={plant.id}
                                className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md border border-gray-200"
                            >
                                {/* Plant Image */}
                                <img
                                    src={plant.primaryImage}
                                    alt={plant.name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex-1 ml-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{plant.name}</h3>
                                    <p className="text-sm text-gray-500">{plant.sellerName}</p>
                                    <p className="text-sm text-gray-600">{plant.categories.join(', ')}</p>

                                    {/* Discounted Price */}
                                    <div className="flex items-center space-x-2 mt-2">
                                        <span className="text-gray-400 line-through text-lg">₹{plant.price + 10}</span>
                                        <span className="text-green-600 font-bold text-lg">₹{plant.price}</span>
                                    </div>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex justify-center items-center border-2 border-gray-400 px-3 py-1 rounded-lg">
                                    <button
                                        onClick={() => handleDecreaseQuantity(plant.id, plant.quantity)}
                                        className="text-gray-600 hover:text-gray-800 p-2 rounded-full transition duration-300"
                                    >
                                        <FaMinus className="text-sm" />
                                    </button>
                                    <span className="text-lg text-gray-900 mx-2">{plant.quantity || 1}</span>
                                    <button
                                        onClick={() => handleIncreaseQuantity(plant.id)}
                                        className="text-gray-600 hover:text-gray-800 p-2 rounded-full transition duration-300"
                                    >
                                        <FaPlus className="text-sm" />
                                    </button>
                                </div>

                                {/* Remove from Cart Button */}
                                <button
                                    onClick={() => handleRemoveFromCart(plant.id)}
                                    className="text-red-600 hover:text-red-500 p-2 rounded-full transition duration-300"
                                >
                                    <RxCross2 className="text-xl" />
                                </button>
                            </section>
                        ))}
                    </section>

                    {/* Order Summary */}
                    <section className="md:w-1/3 bg-gray-100 p-6 rounded-xl shadow-md ml-0 md:ml-6 mt-6 md:mt-0 border border-gray-200">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h3>
                        <div className="flex justify-between mb-2 text-gray-700">
                            <span>Subtotal</span>
                            <span className="font-semibold">₹{calculateTotal()}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-gray-700">
                            <span>Discount</span>
                            <span className="font-semibold">₹0.00</span>
                        </div>
                        <div className="flex justify-between mb-2 text-gray-700">
                            <span>Shipping</span>
                            <span className="text-green-600 font-semibold">Free</span>
                        </div>
                        <div className="flex justify-between mb-4 text-gray-900 font-bold">
                            <span>Total</span>
                            <span>₹{calculateTotal()}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-500 transition duration-300"
                        >
                            Proceed to Checkout
                        </button>
                    </section>
                </div>
            )}
        </div>
    );
};

export default Cart;
