import React from "react";
import { useContext } from "react";
import { Context } from "../../AppContext/Context";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderConfirmation = () => {
    const { cart, totalPrice, clearCart  } = useContext(Context);
    const navigate = useNavigate();

    const handleReturnHome = () => {
        clearCart();
        navigate("/");
        
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-50">
            {/* Success Icon */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
                <FaCheckCircle size={80} className="text-green-500 mb-4" />
                <h1 className="text-2xl font-bold text-gray-800">Order Confirmed!</h1>
                <p className="text-gray-600 mt-2 mb-6">
                    Thank you for your purchase. Your order has been successfully placed.
                </p>

                {/* Order Summary */}
                <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 border border-gray-200">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">Order Summary</h2>
                    <ul className="text-left text-gray-700 mb-4">
                        {cart.map((item, index) => (
                            <li key={item.id} className="flex justify-between py-2 border-b border-gray-300">
                                <span>{index + 1}. {item.name} x {item.quantity}</span>
                                <span className="font-bold">₹{item.price * item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between font-bold text-lg text-gray-800">
                        <span>Total:</span>
                        <span>₹{totalPrice}</span>
                    </div>
                </div>

                
                {/* Return to Home Button */}
                <button
                    className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                    onClick={handleReturnHome}
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmation;
