import React from "react";
// No import needed for this approach

export const Header = ({ activeSection, setActiveSection }) => {
  return (
    <header style={{ backgroundColor: "#000" }} className="flex justify-between items-center p-4 bg-black shadow-md fixed top-0 w-full z-50 border-b border-amber-500/30">
      {/* Logo on the left */}
      <div className="flex items-center gap-3">
        <img
          src="/images/logo.png"
          alt="Glammys Logo"
          style={{ height: "100px" }}
        />
        <span className="text-2xl md:text-4xl font-bold text-white tracking-wider">
          GLAMMYS
          <span className="block text-sm md:text-base font-light tracking-widest text-amber-400 mt-0 opacity-90">
            EXECUTIVE SUITES
          </span>
        </span>
      </div>

      {/* Navigation buttons on the right */}
      <div className="flex gap-5">
        <button
          onClick={() => setActiveSection("booking")}
          className={`relative overflow-hidden bg-gradient-to-r from-[#d4af37] to-amber-600 text-black font-bold py-3 !important px-8 !important text-lg !important rounded-md shadow-md hover:shadow-xl transition-all duration-300`}
        >
          <span className="relative z-10">Book Now</span>
          <span className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-white/40 to-amber-300/0 opacity-0 hover:opacity-100 transition-opacity duration-1000 transform -translate-x-full hover:translate-x-full"></span>
        </button>
        
        <button
          onClick={() => setActiveSection("rooms")}
          className={`relative overflow-hidden bg-gradient-to-r from-[#d4af37] to-amber-600 text-black font-bold py-3 px-8 text-lg rounded-md shadow-md hover:shadow-xl transition-all duration-300`}
        >
          <span className="relative z-10">Our Rooms</span>
          <span className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-white/40 to-amber-300/0 opacity-0 hover:opacity-100 transition-opacity duration-1000 transform -translate-x-full hover:translate-x-full"></span>
        </button>
        
        <button
          onClick={() => setActiveSection("about")}
          className={`relative overflow-hidden bg-gradient-to-r from-[#d4af37] to-amber-600 text-black font-bold py-3 px-8 text-lg rounded-md shadow-md hover:shadow-xl transition-all duration-300`}
        >
          <span className="relative z-10">About Us</span>
          <span className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-white/40 to-amber-300/0 opacity-0 hover:opacity-100 transition-opacity duration-1000 transform -translate-x-full hover:translate-x-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;