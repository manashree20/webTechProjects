import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLeaf } from "react-icons/fa";

const AddNewPlant = () => {
    const [formData, setFormData] = useState({
        name: "",
        id: "",
        description: "",
        price: "",
        rating: "",
        reviews: [],
        totalSalesLastMonth: "",
        sellerName: "",
        sellerAddress: {
            street: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
        },
        availability: "",
        quantityAvailable: "",
        categories: [],
        sunlightRequirement: "",
        moistureRequirement: "",
        soilType: "",
        season: "",
        growthRate: "",
        potSizeRequired: "",
        genus: "",
        localName: "",
        regionalName: "",
        biologicalName: "",
        botanicalName: "",
        tags: [],
        shippingStates: [],
        primaryImage: "",
        secondaryImages: [],
        shoppingPolicy: "",
        refundPolicy: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://116.75.62.44:8000/adduser", formData)
            .then(response => {
                console.log("Data posted successfully:", response.data);
            })
            .catch(error => {
                console.error("Error posting data:", error);
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4"><FaLeaf /> Add a New Plant</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="p-2 border rounded" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Plant Name" />
                <input className="p-2 border rounded" type="number" name="id" value={formData.id} onChange={handleChange} placeholder="Plant ID" />
                <textarea className="p-2 border rounded md:col-span-2" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                <input className="p-2 border rounded" type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
                <input className="p-2 border rounded" type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" step="0.1" />
                <input className="p-2 border rounded" type="text" name="sellerName" value={formData.sellerName} onChange={handleChange} placeholder="Seller Name" />
                <input className="p-2 border rounded" type="text" name="sellerAddress.street" value={formData.sellerAddress.street} onChange={handleChange} placeholder="Street" />
                <input className="p-2 border rounded" type="text" name="sellerAddress.city" value={formData.sellerAddress.city} onChange={handleChange} placeholder="City" />
                <input className="p-2 border rounded" type="text" name="sellerAddress.state" value={formData.sellerAddress.state} onChange={handleChange} placeholder="State" />
                <input className="p-2 border rounded" type="text" name="sellerAddress.country" value={formData.sellerAddress.country} onChange={handleChange} placeholder="Country" />
                <input className="p-2 border rounded" type="text" name="availability" value={formData.availability} onChange={handleChange} placeholder="Availability" />
                <input className="p-2 border rounded" type="number" name="quantityAvailable" value={formData.quantityAvailable} onChange={handleChange} placeholder="Quantity Available" />
                <input className="p-2 border rounded" type="text" name="sunlightRequirement" value={formData.sunlightRequirement} onChange={handleChange} placeholder="Sunlight Requirement" />
                <input className="p-2 border rounded" type="text" name="moistureRequirement" value={formData.moistureRequirement} onChange={handleChange} placeholder="Moisture Requirement" />
                <input className="p-2 border rounded" type="text" name="soilType" value={formData.soilType} onChange={handleChange} placeholder="Soil Type" />
                <input className="p-2 border rounded" type="text" name="season" value={formData.season} onChange={handleChange} placeholder="Season" />
                <input className="p-2 border rounded" type="text" name="growthRate" value={formData.growthRate} onChange={handleChange} placeholder="Growth Rate" />
                <input className="p-2 border rounded" type="text" name="primaryImage" value={formData.primaryImage} onChange={handleChange} placeholder="Primary Image URL" />
                <textarea className="p-2 border rounded md:col-span-2" name="shoppingPolicy" value={formData.shoppingPolicy} onChange={handleChange} placeholder="Shopping Policy" />
                <textarea className="p-2 border rounded md:col-span-2" name="refundPolicy" value={formData.refundPolicy} onChange={handleChange} placeholder="Refund Policy" />
                <button type="submit" className="col-span-2 bg-green-600 text-white p-2 rounded hover:bg-green-700">Submit</button>
            </form>
        </div>
    );
};

export default AddNewPlant;
