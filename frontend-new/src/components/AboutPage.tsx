import React from 'react';

const AboutPage: React.FC = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <main className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          About AutoPartHub
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          Your Premier Destination for High-Quality Automotive Parts & Accessories
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden mb-16">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              className="h-full w-full object-cover" 
              src="/images/mechanic.png" 
              alt="Mechanic working on a car engine"
            />
          </div>
          <div className="p-8 md:p-12 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Founded by a team of passionate automotive enthusiasts, AutoPartHub was born from a desire to create a one-stop-shop for the highest quality car parts. We were tired of the endless search for reliable components and the frustration of dealing with subpar products. Our mission is to provide fellow car lovers, from professional mechanics to weekend DIYers, with a curated selection of parts they can trust.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We believe that every vehicle deserves the best. That&apos;s why we&apos;ve built our catalog by partnering with leading manufacturers and meticulously testing our products to ensure they meet the highest standards of performance and durability.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Expertly Curated</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our team of experts hand-picks every product, ensuring that you only get the best parts that meet or exceed OEM standards.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Unmatched Service</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We&apos;re dedicated to providing exceptional customer service. Our knowledgeable team is always ready to help you find the perfect part.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Fast & Reliable Shipping</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get the parts you need, when you need them. We offer fast and reliable shipping to get you back on the road sooner.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center bg-blue-600 text-white py-12 px-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          We&apos;re more than just a parts store; we&apos;re a community of car enthusiasts. Connect with us and share your passion for all things automotive.
        </p>
        <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
          Explore Products
        </button>
      </div>
    </main>
  </div>
);

export default AboutPage;