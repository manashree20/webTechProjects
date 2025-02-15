import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("⚠️ Please fill out all fields!");
      return;
    }
    toast.success("📩 Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">Contact Us</h2>

      <div className="bg-white p-8 rounded-xl shadow-lg border space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <FaPhoneAlt className="text-green-600 text-3xl" />
            <span className="text-gray-700 font-semibold">+91 98765 43210</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <FaEnvelope className="text-blue-600 text-3xl" />
            <span className="text-gray-700 font-semibold">support@plantshop.com</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <FaMapMarkerAlt className="text-red-600 text-3xl" />
            <span className="text-gray-700 font-semibold">Pune, Maharashtra, India</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <FaClock className="text-gray-600 text-3xl" />
            <span className="text-gray-700 font-semibold">Mon - Sat: 9 AM - 6 PM</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="name" placeholder="Your Name" className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-green-400" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400" value={formData.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" className="border p-3 rounded-lg w-full h-32 focus:ring-2 focus:ring-gray-400" value={formData.message} onChange={handleChange} required />
          <button type="submit" className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 transition">Send Message</button>
        </form>

        {/* Google Map */}
        <div className="mt-6 rounded-lg overflow-hidden shadow-lg border">
          <iframe
            title="Google Map"
            className="w-full h-64"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.769978921849!2d73.85534611537455!3d18.52043038739324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c088d6e808df%3A0xe6e8a2f44c689b1a!2sPune%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1632823112869!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;