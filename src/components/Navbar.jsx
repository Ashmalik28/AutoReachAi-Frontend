import React from "react";
import logo from "../../images/AutoReachLogo.png"; 
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-8 py-3 flex items-center justify-between">
      
      <div className="flex items-center gap-3">
        <img 
          src={logo} 
          alt="AutoReach AI Logo" 
          className="w-48 object-contain"
        />
      </div>
      <div className="hidden md:flex gap-8 text-lg text-gray-600 font-medium">
        <a href="#" className="hover:text-black">Home</a>
        <a href="#" className="hover:text-black">Features</a>
        <a href="#" className="hover:text-black">How It Works</a>
        <a href="#" className="hover:text-black">Contact</a>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/login")} className="text-gray-600 text-lg hover:text-black font-medium">
          Log in
        </button>
        <button onClick={() => navigate("/signup")} className="bg-gray-900 text-lg text-white px-5 py-2 rounded-full font-medium hover:bg-black transition">
          Get Started
        </button>
      </div>
      
    </nav>
  );
};

export default Navbar;