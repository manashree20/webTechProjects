import React from 'react';
import photo from '../../../assets/Cactus.png'
import { FaUsers, FaShoppingCart, FaUserFriends, FaDollarSign } from 'react-icons/fa';
import img from "../../../assets/close-up-water-drops-pink-gerbera-daisy-flower.jpg"
import vid from "../../../assets/1110132_Seashore_Deep_3840x2160.mp4"

const AboutPage = () => {
  return (
    <><div className="container mx-auto">
  
      <div className="text-left mb-6 mt-8">
        <div className="flex flex-col md:flex-row items-center mt-4">
          <div className="md:w-1/2 md:pr-4">
            <h1 className="text-4xl font-bold mb-7">Our Story</h1>
            <p className="text-lg">
              Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.
            </p>
            <p className="mt-4 text-lg">
              Exclusive has more than 1 Million products to offer, growing very fast. Exclusive offers a diverse assortment in categories ranging from consumer.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src={photo} alt="Shoppers" className="w-96 max-w-md rounded-xl shadow-lg" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
          <FaUsers className="text-3xl mx-auto mb-1" />
          <p className="text-xl font-bold">15k</p>
          <p className="mt-1">Active Sellers</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
          <FaShoppingCart className="text-3xl mx-auto mb-1" />
          <p className="text-xl font-bold">50k</p>
          <p className="mt-1">Monthly Product Sales</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
          <FaUserFriends className="text-3xl mx-auto mb-1" />
          <p className="text-xl font-bold">75k</p>
          <p className="mt-1">Active Customers</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
          <FaDollarSign className="text-3xl mx-auto mb-1" />
          <p className="text-xl font-bold">$1M</p>
          <p className="mt-1">Annual Gross Sales</p>
        </div>
      </div>
    </div></>
  );
}

export default AboutPage;
