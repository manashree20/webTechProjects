import { useContext, useState } from 'react';
import { FaRupeeSign, FaHeart } from 'react-icons/fa'; // Importing the FaHeart icon
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Importing wishlist icons
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../AppContext/Context';

const ProductsDesc = () => {
  const { addToCart, addToWishlist, removeFromWishlist, plants, wishlistData } = useContext(Context);
  const location = useLocation();
  const { plant } = location.state; // Get plant data from the location state

  const [currentImage, setCurrentImage] = useState(plant.primaryImage);
  const navigate = useNavigate();

  const handleToProdPage = () => {
    navigate("/products");
  };

  const handleCart = () => {
    addToCart(plant);
  };

  const handleWishlist = () => {
    if (wishlistData.some((item) => item.id === plant.id)) {
      removeFromWishlist(plant.id); // Remove from wishlist
    } else {
      addToWishlist(plant); // Add to wishlist
    }
  };

  const handleWishlistSimilar = (similarPlant) => {
    if (wishlistData.some((item) => item.id === similarPlant.id)) {
      removeFromWishlist(similarPlant.id); // Remove from wishlist
    } else {
      addToWishlist(similarPlant); // Add to wishlist
    }
  };

  const handleSimilarPlantClick = (similarPlant) => {
    // Navigate to the similar plant's description page
    navigate("/plantDesc", { state: { plant: similarPlant } });

    // Update the current image to the primary image of the selected similar plant
    setCurrentImage(similarPlant.primaryImage);
  };

  const similarPlants = plants.filter((p) => p.id !== plant.id && p.categories.some((cat) => plant.categories.includes(cat))).slice(0, 4);

  return (
    <div className="p-6 mx-10">
      {/* Primary Image, Secondary Images, and Description */}
      <div className="flex flex-col md:flex-row mb-8">
        {/* Secondary Images */}
        <div className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 mt-6 md:ml-14 mr-2 overflow-x-auto md:overflow-visible">
          {plant.secondaryImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Secondary image ${index + 1}`}
              className="w-20 h-20 object-cover cursor-pointer hover:opacity-75 m-3 transition-all duration-300 transform hover:scale-105"
              onClick={() => setCurrentImage(image)} // Update primary image on click
            />
          ))}
        </div>

        {/* Plant Image */}
        <div className="md:w-1/2 p-4">
          <img
            src={currentImage}
            alt={plant.name}
            className="w-full h-96 object-contain rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Plant Details */}
        <div className="md:w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-4">{plant.name}</h2>

          {/* Price */}
          <div className="flex items-center mb-4">
            <FaRupeeSign className="h-5 text-green-700" />
            <div className="text-2xl text-green-700 font-bold ml-2">{plant.price}</div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {plant.tags && plant.tags.length > 0 ? (
              plant.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-green-200 text-green-800 text-base py-1 px-3 rounded-full"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span>No tags available</span>
            )}
          </div>

          {/* Wishlist Icon */}
          <div
            onClick={handleWishlist}
            className="absolute top-4 right-4 text-2xl cursor-pointer"
          >
            {wishlistData.some((item) => item.id === plant.id) ? (
              <AiFillHeart className="text-red-500" />
            ) : (
              <AiOutlineHeart className="text-gray-500 hover:text-red-500" />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-3 mt-7">
            <button onClick={handleCart} className="bg-green-700 text-white py-3 px-6 rounded-3xl hover:bg-green-600 w-full md:w-auto transition-all duration-300 transform hover:scale-105">
              Add to Cart
            </button>
            <button onClick={handleWishlist} className="bg-green-700 text-white py-3 px-6 rounded-3xl hover:bg-green-600 w-full md:w-auto transition-all duration-300 transform hover:scale-105">
              Add to Wishlist
            </button>
          </div>

          {/* Plant Description */}
          <div className="mt-8 space-y-4">
            <h3 className="text-2xl font-semibold">Know more about Plant :</h3>
            <div className="flex flex-col space-y-2">
              <p><strong>Genus:</strong> {plant.genus}</p>
              <p><strong>Local Name:</strong> {plant.localName}</p>
              <p><strong>Regional Name:</strong> {plant.regionalName}</p>
              <p><strong>Biological Name:</strong> {plant.biologicalName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Plants */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Similar Plants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {similarPlants.map((similarPlant, index) => (
            <div key={index} className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeIn cursor-pointer">
              <div className="relative" onClick={() => handleSimilarPlantClick(similarPlant)}>
                {/* Wishlist Icon for Similar Plant */}
                <div
                  onClick={() => handleWishlistSimilar(similarPlant)}
                  className="absolute top-2 right-2 text-2xl cursor-pointer"
                >
                  {wishlistData.some((item) => item.id === similarPlant.id) ? (
                    <AiFillHeart className="text-red-500" />
                  ) : (
                    <AiOutlineHeart className="text-gray-500 hover:text-red-500" />
                  )}
                </div>

                <img
                  src={similarPlant.primaryImage}
                  alt={similarPlant.name}
                  className="w-full h-32 object-contain rounded-lg"
                />
              </div>
              <div className="p-1">
                <h3 className="text-lg font-semibold mb-1">{similarPlant.name}</h3>
                <p className="text-gray-600 mb-1">{similarPlant.categories.join(', ')}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-700 font-bold text-sm">{similarPlant.price}</span>
                  <span className="text-gray-500 text-xs">{similarPlant.rating} ★</span>
                </div>
              </div>
              <div className="flex justify-between items-center m-2">
                <button onClick={() => handleCart(similarPlant)} className="bg-green-800 text-white py-1 px-2 rounded text-xs hover:bg-green-600">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsDesc;
