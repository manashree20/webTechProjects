// src/components/Testimonials.jsx

import React, { useState, useEffect } from 'react';

// Example testimonials data
const testimonials = [
  {
    name: 'Jane Doe',
    quote: 'This plant shop is amazing! The plants arrived healthy and the customer service was top-notch.',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    name: 'John Smith',
    quote: 'I love my new plant! It looks great in my living room and adds so much life to the space.',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    name: 'Emily Johnson',
    quote: 'I’ve never seen such a wide variety of plants. The website is easy to navigate and delivery was fast!',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    name: 'Michael Brown',
    quote: 'My plants arrived safely and in perfect condition. I highly recommend this store!',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    name: 'Sarah Lee',
    quote: 'The customer service is outstanding, and my plant is thriving beautifully in my home.',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
];

const Testimonials = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl font-semibold mb-8">Testimonials</h1>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 transform "
            >
              {/* Customer Image */}
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-26 h-26 rounded-sm object-cover border-4  mb-4"
              />
              <p className="font-semibold text-green-700">{testimonial.name}</p>

              {/* Customer Testimonial */}
              <p className="text-xl font-medium text-gray-800 mb-4">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
