import React from "react";
import { Link } from "react-router-dom";
import svg from "../assets/pepper-vegetable-vegetables-svgrepo-com.svg";

const Navbar = () => {
  return (
    <nav className="bg-lightGreen p-4 flex justify-between items-center">
      <div className="flex-grow flex">
        <ul className="flex space-x-8 font-semibold">
          <li className="text-offWhite hover:text-mutedGreen cursor-pointer mx-8">
            <Link to="/products">ניהול מוצרים</Link>
          </li>
          <li className="text-offWhite hover:text-mutedGreen cursor-pointer">
            <Link to="/">בית</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center">
        <h3 className="text-softGray font-bold text-xl">Market Manager</h3>
        <img src={svg} className="h-10 mr-1" alt="Market Manager Logo" />
      </div>
    </nav>
  );
};

export default Navbar;
