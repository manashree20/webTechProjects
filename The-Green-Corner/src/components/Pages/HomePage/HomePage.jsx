import React from 'react';
import Hero from './Hero';
import AboutPage from '../AboutPage/AboutPage';
import Categories from './Categories';
import PopularProducts from './PopularProducts';

const HomePage = () => {
  return (
    <main className="section__container flex flex-col">
      <Hero />
      <PopularProducts />
      <Categories />
      <AboutPage />
      {/* <Testimonials /> */}
    </main>
  );
};

export default HomePage
