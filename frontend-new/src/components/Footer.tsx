import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} AutoPartHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
