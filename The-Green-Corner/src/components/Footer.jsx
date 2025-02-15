import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaCopyright, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Importing social media and other icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">The Green Corner</h2>
          <p className="text-sm">
            Green Corner is a plant-based online store, bringing nature to your home with a wide variety of plants and gardening essentials.
          </p>
          <p className="text-sm mt-4">
            <FaCopyright className="inline mr-2" />The Green Corner
          </p>
        </div>

        {/* Service Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Services</h3>
          <ul className="space-y-2">
            <li>Plant Delivery</li>
            <li>Plant Care Tips</li>
            <li>Garden Design</li>
            <li>Indoor Plants</li>
            <li>Outdoor Plants</li>
            <li>Eco-Friendly Products</li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Company</h3>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Our Team</li>
            <li>Blog</li>
            <li>Contact</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-6 text-2xl text-white mb-4">
            <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" className="text-pink-600 hover:text-pink-800">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" className="text-blue-700 hover:text-blue-900">
              <FaLinkedin />
            </a>
          </div>

          {/* Newsletter Section placed below Social Media */}
          <h3 className="text-lg font-bold text-white mb-4">Join Our Newsletter</h3>
          <form className="flex flex-col space-y-4 md:w-full mx-auto">
            <input
              type="email"
              placeholder="Your Email"
              className="p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-3/4"
            />
            <button className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded w-full md:w-3/4">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between text-sm">
          <div className="flex items-center">
            <FaCopyright className="mr-2 text-gray-500" />
            <span>The Green Corner</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-500" />
            <span>Pune, Maharashtra</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2 text-gray-500" />
            <span>contact@greencorner.com</span>
          </div>
          <div className="flex items-center">
            <FaPhoneAlt className="mr-2 text-gray-500" />
            <span>+91 12345-67890</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
