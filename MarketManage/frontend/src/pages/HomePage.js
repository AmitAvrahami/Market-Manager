import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-offWhite ">
      <h1 className="text-4xl font-bold text-lightGreen mb-4 ">
        Market Mangager
      </h1>
      <p className="text-lg text-black mb-8">ניהול מוצרים בקלות ובנוחות</p>
      <div className="flex space-x-4">
        <Link to="/products">
          <button className="bg-lightGreen text-offWhite px-6 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl animate-bounce">
            ניהול מוצרים
          </button>
        </Link>
      </div>
      <div className="mt-16 animate-fade-in bg-lightGreen rounded-full">
        <img
          src={logo}
          alt="תמונה של ניהול מוצרים"
          className="rounded-lg transition-opacity duration-500 opacity-80 hover:opacity-100"
        />
      </div>
    </div>
  );
};

export default HomePage;
