import React from "react";

export const Header = ({ activeSection, setActiveSection }) => {
  return (
    <header style={{ backgroundColor: "#000" }} className="flex justify-between items-center p-4 bg-black shadow-md fixed top-0 w-full z-50 border-b border-amber-500/30">
      {/* Logo on the left */}
      <div className="flex items-center gap-3">
        <img
          src="/images/logo.png" // Path to your logo image
          alt="Glammys Logo"
          style={{ height: "100px" }} // Logo height set to 100px
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
          className={`text-xl font-semibold py-3 px-6 text-white hover:text-[#d4af37] transition-colors ${
            activeSection === "booking" ? "border-b-2 border-[#d4af37]" : ""
          }`}
        >
          Book Now
        </button>
        <button
          onClick={() => setActiveSection("rooms")}
          className={`text-lg font-semibold py-0 px-0 text-white hover:text-[#d4af37] transition-colors ${
            activeSection === "rooms" ? "border-b-2 border-[#d4af37]" : ""
          }`}
        >
          Our Rooms
        </button>
        <button
          onClick={() => setActiveSection("about")}
          className={`text-lg font-semibold py-0 px-0 text-white hover:text-[#d4af37] transition-colors ${
            activeSection === "about" ? "border-b-2 border-[#d4af37]" : ""
          }`}
        >
          About Us
        </button>
      </div>
    </header>
  );
};

export default Header;