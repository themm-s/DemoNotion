import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-8 w-full fixed bottom-0 left-0">
      <p>
        &copy; {new Date().getFullYear()} Горда Елизавета. Все права защищены.
      </p>
    </footer>
  );
};

export default Footer;
