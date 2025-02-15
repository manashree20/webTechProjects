import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../AppContext/Context";
import { FaCreditCard, FaMoneyBillWave, FaShoppingCart, FaMapMarkerAlt, FaUser, FaBox } from "react-icons/fa";
import { BsBank } from "react-icons/bs"; // For UPI methods
import { SiPhonepe, SiGooglepay, SiPaytm } from "react-icons/si"; // For PhonePe, Google Pay, and Paytm
import toast, { Toaster } from "react-hot-toast";

const Checkout = () => {
    const { cart, totalPrice } = useContext(Context);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("credit_card");
    const [upiOption, setUpiOption] = useState("");
    const [upiId, setUpiId] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        district: "",
        state: "",
        zipcode: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        if (Object.values(formData).some((field) => field === "")) {
            toast.error("⚠️ Please fill out all billing details!");
            return;
        }
        setStep(2);
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleUpiOptionChange = (e) => {
        setUpiOption(e.target.value);
    };

    const handleOrderSubmit = (e) => {
        e.preventDefault();
        if (paymentMethod === "upi" && (!upiOption || !upiId)) {
            toast.error("⚠️ Please select a UPI option and enter your UPI ID!");
            return;
        }
        toast.success("🎉 Your order has been placed successfully!");
        navigate("/order-confirmation");
        setTimeout(() => {
            setStep(3);
        }, 2000);
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl relative">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="p-3 text-gray-800 font-normal">
                <span className={step === 1 ? "font-bold" : ""}>Address</span> &gt;&nbsp;
                <span className={step === 2 ? "font-bold" : ""}>Payment</span> &gt;&nbsp;
                <span>Order Successful</span>
            </div>
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">Secure Checkout</h2>

            {/* Address Step */}
            {step === 1 && (
                <div className="bg-white p-6 rounded-xl shadow-lg border space-y-4">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                        <FaBox className="mr-2 text-gray-700" /> Product Information
                    </h3>
                    {cart.map((item, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-3 mb-3">
                            <img src={item.primaryImage} alt={item.name} className="w-16 h-16 object-contain " />
                            <span className="text-lg font-semibold">{item.name}</span>
                            <span className="text-gray-700">₹{item.price}</span>
                        </div>
                    ))}

                    <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                        <FaUser className="mr-2 text-gray-700" /> User Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            className="border p-3 rounded-lg w-full"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className="border p-3 rounded-lg w-full"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="border p-3 rounded-lg w-full"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        className="border p-3 rounded-lg w-full"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <h3 className="text-2xl font-semibold mt-6 flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-gray-700" /> Shipping Address
                    </h3>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        className="border p-3 rounded-lg w-full"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="district"
                            placeholder="District"
                            className="border p-3 rounded-lg w-full"
                            value={formData.district}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            className="border p-3 rounded-lg w-full"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="zipcode"
                            placeholder="Zip Code"
                            className="border p-3 rounded-lg w-full"
                            value={formData.zipcode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={handleAddressSubmit}
                        className="bg-green-600 text-white w-full py-3 rounded-lg"
                    >
                        Continue to Payment
                    </button>
                </div>
            )}

            {/* Payment Step */}
            {step === 2 && (
                <div className="bg-white p-6 rounded-xl shadow-lg border space-y-6">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Choose Payment Method</h3>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name="paymentMethod"
                                id="creditCard"
                                value="credit_card"
                                checked={paymentMethod === "credit_card"}
                                onChange={handlePaymentMethodChange}
                                className="text-green-600"
                            />
                            <label htmlFor="creditCard" className="text-lg font-medium text-gray-700 flex items-center">
                                <FaCreditCard className="mr-2" /> Credit/Debit Card
                            </label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name="paymentMethod"
                                id="upi"
                                value="upi"
                                checked={paymentMethod === "upi"}
                                onChange={handlePaymentMethodChange}
                                className="text-green-600"
                            />
                            <label htmlFor="upi" className="text-lg font-medium text-gray-700 flex items-center">
                                <BsBank className="mr-2" /> UPI
                            </label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name="paymentMethod"
                                id="cod"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={handlePaymentMethodChange}
                                className="text-green-600"
                            />
                            <label htmlFor="cod" className="text-lg font-medium text-gray-700 flex items-center">
                                <FaMoneyBillWave className="mr-2" /> Cash on Delivery (COD)
                            </label>
                        </div>

                        {/* UPI Options */}
                        {paymentMethod === "upi" && (
                            <div className="space-y-3 pl-6">
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="upiOption"
                                        value="phonepe"
                                        checked={upiOption === "phonepe"}
                                        onChange={handleUpiOptionChange}
                                        className="text-green-600"
                                    />
                                    <label htmlFor="phonepe" className="text-lg font-medium text-gray-700 flex items-center">
                                        <SiPhonepe className="text-2xl mr-2 text-green-600" /> PhonePe
                                    </label>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="upiOption"
                                        value="googlePay"
                                        checked={upiOption === "googlePay"}
                                        onChange={handleUpiOptionChange}
                                        className="text-green-600"
                                    />
                                    <label htmlFor="googlePay" className="text-lg font-medium text-gray-700 flex items-center">
                                        <SiGooglepay className="text-2xl mr-2 text-green-600" /> Google Pay
                                    </label>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="upiOption"
                                        value="paytm"
                                        checked={upiOption === "paytm"}
                                        onChange={handleUpiOptionChange}
                                        className="text-green-600"
                                    />
                                    <label htmlFor="paytm" className="text-lg font-medium text-gray-700 flex items-center">
                                        <SiPaytm className="text-2xl mr-2 text-green-600" /> Paytm
                                    </label>
                                </div>
                                <div>
                                    <label htmlFor="upiId" className="block text-lg font-medium text-gray-700">
                                        Enter UPI ID
                                    </label>
                                    <input
                                        type="text"
                                        id="upiId"
                                        name="upiId"
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        placeholder="example@upi"
                                        value={upiId}
                                        onChange={(e) => setUpiId(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border-t pt-4 space-y-3">
                        <div className="flex justify-between text-lg">
                            <span className="text-gray-700">Total:</span>
                            <span className="text-gray-800 font-semibold">₹{totalPrice}</span>
                        </div>
                        <div className="flex justify-between text-lg">
                            <span className="text-gray-700">Shipping:</span>
                            <span className="text-gray-800 font-semibold">₹10.00</span>
                        </div>
                    </div>

                    <button
                        onClick={handleOrderSubmit}
                        className="bg-green-600 text-white w-full py-3 rounded-lg flex items-center justify-center hover:bg-green-700 transition duration-300"
                    >
                        <FaShoppingCart className="mr-2" /> Place Order
                    </button>
                </div>
            )}
        </div>
    );
};

export default Checkout;
