import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import logo from "../../images/AutoReachLogo.png"

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-8 px-6">
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left - Logo */}
        <div className="flex justify-start gap-3">
        <img 
          src={logo} 
          alt="AutoReach AI Logo" 
          className="w-48 object-contain"
        />
        </div>

        {/* Center - Links */}
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-800 transition">Privacy</a>
          <a href="#" className="hover:text-gray-800 transition">Terms</a>
          <a href="#" className="hover:text-gray-800 transition">Help Center</a>
        </div>

        {/* Right - Social Icons */}
        <div className="flex items-center gap-4 text-gray-500">
          <FaTwitter size={18} className="hover:text-gray-800 cursor-pointer transition" />
          <FaLinkedin size={18} className="hover:text-gray-800 cursor-pointer transition" />
          <FaGithub size={18} className="hover:text-gray-800 cursor-pointer transition" />
        </div>

      </div>

      {/* Bottom Text */}
      <div className="mt-6 text-center text-sm text-gray-400">
        © 2026 AutoReach AI. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;