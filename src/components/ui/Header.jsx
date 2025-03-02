import React from "react";
import { Button } from "./components/Button"; // Adjust the path if necessary

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-black shadow-md">
      {/* Buttons on the left */}
      <div className="space-x-4">
        <Button className="bg-blue-500">Login</Button>
        <Button className="bg-gray-200 text-black">Sign Up</Button>
      </div>

      {/* Logo on the right */}
      <div>
        <img src="/logo.png" alt="Logo" className="h-10" />
      </div>
    </header>
  );
};

export default Header;
