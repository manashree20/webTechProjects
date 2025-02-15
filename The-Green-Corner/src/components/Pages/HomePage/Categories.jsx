import React from "react";
import indoor from "../../../assets/indoor plant.png";
import outdoor from "../../../assets/Outdor Plant 1.png";
import cactus from "../../../assets/Cactus.png";
import bonsai from "../../../assets/Bonsai.png";
import Surfinia from "../../../assets/Surfinia Violet 1.png";
import showcase from "../../../assets/tree 1.png";

const Categories = () => {

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-8">
        <h1 className="text-5xl font-bold text-center mb-10">Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* First category div: Indoor (50% width) */}
          <div className="p-6 rounded-xl bg-gray-100 text-gray-800 flex flex-row items-center lg:items-start lg:col-span-2">
            {/* Content on the left side */}
            <div className="flex flex-col items-start lg:w-1/2 lg:mr-6 lg:ml-4">
              <p className="text-md uppercase font-semibold mb-2">Home & Living</p>
              <h3 className="text-5xl font-bold mb-4 text-center lg:text-left text-[#B79E9EA6]">Indoor</h3>
              <button  className="bg-gray-700 text-white py-2 px-6 rounded-full hover:bg-gray-800 transition-all">
                Shop Now
              </button>
            </div>

            {/* Image on the right side */}
            <img
              src={indoor}
              alt="Indoor"
              className="w-24 object-contain mt-2 lg:mt-0 lg:w-64 lg:h-56"
            />
          </div>



          {/* Second category div: Outdoor (25% width) */}
          <div className="p-6 rounded-xl shadow-sm bg-blue-100 text-blue-800 flex flex-col items-center lg:col-span-1">
            <p className="text-sm uppercase font-semi mb-2">Garden & Land</p>
            <h3 className="text-3xl font-bold mb-4 text-center text-[#B79E9EA6]">Outdoor</h3>
            <img
              src={outdoor}
              alt="Outdoor"
              className="w-24 h-36 object-contain"
            />

          </div>

          {/* Third category div: Cactus (25% width) */}
          <div className="p-6 rounded-xl shadow-sm bg-yellow-100 text-yellow-800 flex flex-col items-center lg:col-span-1">

            <p className="text-sm uppercase font-semi mb-2">Showcase & Home</p>
            <h3 className="text-3xl font-bold text-center text-[#B79E9EA6]">Cactus</h3>
            <img
              src={cactus}
              alt="Cactus"
              className="w-32 h-26 object-contain "
            />
          </div>

          {/* Fourth category div: Bonsai (25% width) */}
          <div className="p-6 rounded-xl shadow-md bg-pink-100 text-pink-800 flex flex-col items-center lg:col-span-1">

            <p className="text-sm uppercase font-semi mb-2">Garden & Land</p>
            <h3 className="text-3xl font-bold mb-4 text-center text-[#B79E9EA6]">Bonsai</h3>

            <img
              src={bonsai}
              alt="Bonsai"
              className="w-36 h-36 object-contain "
            />
          </div>

          {/* Fifth category div: Surfinia (25% width) */}
          <div className="p-6 rounded-xl shadow-md bg-green-100 text-green-800 flex flex-col items-center lg:col-span-1">

            <p className="text-sm uppercase font-semi mb-2">Toys & Entertainment</p>
            <h3 className="text-3xl font-bold mb-4 text-center text-[#B79E9EA6]">Surfinia</h3>
              <img
                src={Surfinia}
                alt="Surfinia"
                className="w-36 h-36 object-contain "
              />
            
          </div>

          {/* Sixth category div: Showcase (50% width) */}
          <div className="p-6 rounded-xl shadow-md bg-red-100 text-red-800 flex flex-col lg:flex-row items-start justify-between lg:col-span-2 relative">
            {/* Text content on the left side */}
            <div className="flex flex-col items-start lg:w-2/3">
              <p className="text-md uppercase font-semibold mb-2">Jewelry & Accessories</p>
              <h3 className="text-5xl font-bold mb-4 text-left text-[#B79E9EA6]">Showcase</h3>
              <button className="bg-black text-white py-2 px-8 rounded-full hover:bg-gray-800 transition-all">
                Shop Now
              </button>
            </div>

            {/* Image on the right side with padding */}
            <div className="lg:absolute right-2 ">
              <img
                src={showcase}
                alt="Showcase"
                className="w-36 object-contain lg:w-64 lg:h-56 p-2"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Categories;
