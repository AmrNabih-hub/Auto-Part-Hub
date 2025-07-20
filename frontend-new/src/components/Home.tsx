import React from 'react';
import { motion } from 'framer-motion';
import { FaCar, FaTools, FaShippingFast, FaShieldAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      icon: <FaCar className="text-3xl" />,
      title: "Premium Auto Parts",
      description: "High-quality parts from trusted manufacturers worldwide"
    },
    {
      icon: <FaTools className="text-3xl" />,
      title: "Expert Support",
      description: "24/7 customer support from automotive experts"
    },
    {
      icon: <FaShippingFast className="text-3xl" />,
      title: "Fast Shipping",
      description: "Free shipping on orders over $500"
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Warranty Guaranteed",
      description: "All parts come with manufacturer warranty"
    }
  ];

  const testimonials = [
    {
      name: "Mike Johnson",
      role: "Professional Mechanic",
      rating: 5,
      comment: "Best auto parts store I've ever used. Quality parts and fast delivery!"
    },
    {
      name: "Sarah Williams",
      role: "Car Enthusiast",
      rating: 5,
      comment: "Amazing selection and competitive prices. Highly recommended!"
    },
    {
      name: "David Chen",
      role: "DIY Mechanic",
      rating: 5,
      comment: "Great customer service and easy returns. Perfect for my projects!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-automotive-orange/10 to-automotive-blue/10"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Premium
              <span className="text-automotive-orange"> Auto Parts</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Quality parts for your vehicle. Expert support. Fast delivery.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/products"
                className="bg-automotive-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Shop Now
              </Link>
              <button className="border-2 border-automotive-blue text-automotive-blue hover:bg-automotive-blue hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We provide the best automotive parts and service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-automotive-orange mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Trusted by thousands of satisfied customers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                  &quot;{testimonial.comment}&quot;
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-automotive-orange to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Browse our extensive collection of premium auto parts
            </p>
            <Link
              to="/products"
              className="bg-white text-automotive-orange hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
            >
              Explore Products
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 