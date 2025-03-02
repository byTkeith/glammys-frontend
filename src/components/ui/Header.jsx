import React from "react";

export const Header = ({ activeSection, setActiveSection }) => {
  return (
    <header style={{ backgroundColor: "#000" }} className="flex justify-between items-center p-2 bg-black shadow-md fixed top-0 w-full z-50 border-b border-amber-500/30">
      {/* Logo on the left */}
      <div className="flex items-center gap-3">
        <img
          src="/images/logo.png" // Path to your logo image
          alt="Glammys Logo"
          style={{  height: '100px' }}
          //className="h-8" // Adjust the height as needed
        />
        <span className="text-2xl md:text-4xl font-bold text-white tracking-wider">
          GLAMMYS
          <span className="block text-sm md:text-base font-light tracking-widest text-amber-400 mt-0 opacity-90">
            EXECUTIVE SUITES
          </span>
        </span>
      </div>

      {/* Navigation buttons on the right */}
      <div className="flex gap-8">
        <button
          onClick={() => setActiveSection("booking")}
          className={`text-base text-white hover:text-amber-400 transition-colors ${
            activeSection === "booking" ? "border-b-2 border-amber-400" : ""
          }`}
        >
          Book Now
        </button>
        <button
          onClick={() => setActiveSection("rooms")}
          className={`text-base text-white hover:text-amber-400 transition-colors ${
            activeSection === "rooms" ? "border-b-2 border-amber-400" : ""
          }`}
        >
          Our Rooms
        </button>
        <button
          onClick={() => setActiveSection("about")}
          className={`text-base text-white hover:text-amber-400 transition-colors ${
            activeSection === "about" ? "border-b-2 border-amber-400" : ""
          }`}
        >
          About Us
        </button>
      </div>
    </header>
  );
};

export default Header;