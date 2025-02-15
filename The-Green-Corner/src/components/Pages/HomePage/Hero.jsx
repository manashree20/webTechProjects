import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import img1 from '../../../assets/beautiful-plant-illustration.jpg';
import img2 from '../../../assets/flower-pot-table.jpg';
import img3 from '../../../assets/front-close-view-beautiful-flower-brown-pot-white-background.jpg';
import img4 from '../../../assets/fresh-green-leaves-decorate-modern-wooden-plant-shelf-generated-by-artificial-intelligence.jpg';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Hero = () => {
  const navigate = useNavigate();

  const handleShowAllClick = () => {
    navigate('/products');
  };

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    cssEase: 'ease-in-out',
  };

  const slides = [
    { image: img1, text: 'Bringing Nature Home' },
    { image: img2, text: 'Greenery for Every Space' },
    { image: img3, text: 'Cherished by Botanists & Enthusiasts' },
    { image: img4, text: 'Refresh Your Room with Plants' },
  ];

  return (
    <div className="h-[50%] bg-white">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative w-full h-[400px] md:h-[570px] flex items-center justify-center"
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center p-4">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 drop-shadow-lg">
                {slide.text}
              </h1>
              {index >=0 && (
                <button
                  onClick={handleShowAllClick}
                  className="w-44 h-12 bg-green-900 hover:bg-green-700 text-white rounded-lg flex items-center justify-center transition-all duration-200"
                >
                  Show All <FaArrowRight className="ml-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-white text-4xl z-10 hover:text-gray-300 transition duration-200"
      onClick={onClick}
    >
      <FaChevronRight />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 left-6 transform -translate-y-1/2 cursor-pointer text-white text-4xl z-10 hover:text-gray-300 transition duration-200"
      onClick={onClick}
    >
      <FaChevronLeft />
    </div>
  );
};

export default Hero;
