import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const ReviewsSection = () => {
     const location = useLocation();
      const { plant } = location.state; // Get plant data from the location state
    
  return (
    <div>
          {/* New Div for Customer Reviews Section */}
          <div className=" mt-8 mx-12 space-y-4">
              <h3 className="text-2xl font-semibold">What Customer Says ...</h3>
              <div className="flex flex-wrap  gap-10">
                  {plant.reviews && plant.reviews.length > 0 ? (
                      plant.reviews.map((review, index) => (
                          <div key={index} className="flex flex-col border p-4 rounded-lg shadow-md w-full md:w-1/3 transition-all duration-300 hover:shadow-xl">
                              <div className="flex items-center mb-2">
                                  <span className="font-semibold">{review.username}</span>
                                  <span className="ml-2 text-yellow-400">
                                      {"★".repeat(review.rating)}
                                      {"☆".repeat(5 - review.rating)}
                                  </span>
                                  <span className="ml-2 text-gray-500 text-sm">{new Date(review.dateTime).toLocaleDateString()}</span>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                              <div className="flex mt-2 items-center">
                                  <FaThumbsUp className="text-green-400 mr-2" />
                                  <span className="text-gray-500 text-sm">{review.likes}</span>
                                  <FaThumbsDown className="text-red-400 ml-4 mr-2" />
                                  <span className="text-gray-500 text-sm">{review.dislikes}</span>
                              </div>
                          </div>
                      ))
                  ) : (
                      <p>No reviews yet.</p>
                  )}
              </div>
          </div>
    </div>
  )
}

export default ReviewsSection
