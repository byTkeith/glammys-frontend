import React from 'react';

export function Button({ 
  children, 
  className = "", 
  variant = "primary", 
  size = "medium",
  isLoading = false,
  icon,
  ...props 
}) {
  // Base styles that apply to all buttons
  const baseStyles = "font-bold rounded-md transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400";
  
  // Size variations
  const sizeStyles = {
    small: "py-2 px-4 text-sm",
    medium: "py-3 px-6 text-base",
    large: "py-4 px-8 text-lg"
  };
  
  // Variant styles that match your luxury gold/amber theme
  const variantStyles = {
    primary: "bg-gradient-to-r from-amber-500 to-[#d4af37] hover:from-[#d4af37] hover:to-amber-600 text-black shadow-md hover:shadow-lg transform hover:-translate-y-1",
    secondary: "bg-gray-800 text-amber-400 border border-amber-400 hover:bg-gray-700 shadow-sm hover:shadow-md transform hover:-translate-y-1",
    outline: "bg-transparent text-amber-400 border-2 border-amber-400 hover:bg-gray-800/50 shadow-sm hover:shadow-md transform hover:-translate-y-1",
    text: "bg-transparent text-amber-400 hover:text-amber-300 hover:bg-gray-800/30",
    white: "bg-white text-black hover:bg-gray-100 shadow-md hover:shadow-lg transform hover:-translate-y-1"
  };
  
  // Combine all styles
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  
  return (
    <button 
      className={buttonStyles}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {icon && <span className="mr-1">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}

// Special Luxury Button with shimmer effect
export function LuxuryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`relative overflow-hidden bg-gradient-to-r from-[#d4af37] to-amber-600 text-black font-bold py-3 px-8 rounded-md shadow-md hover:shadow-xl transition-all duration-300 ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-white/40 to-amber-300/0 opacity-0 hover:opacity-100 transition-opacity duration-1000 transform -translate-x-full hover:translate-x-full"></span>
    </button>
  );
}

// Button with golden border animation
export function AnimatedButton({ children, className = "", ...props }) {
  return (
    <button
      className={`relative py-3 px-8 font-bold text-[#d4af37] bg-transparent border-2 border-[#d4af37] rounded-md transition-all duration-300 overflow-hidden group hover:text-black ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 w-full h-0 bg-[#d4af37] transition-all duration-300 group-hover:h-full -z-0"></span>
    </button>
  );
}

// Icon button for social media links
export function IconButton({ icon, className = "", ...props }) {
  return (
    <button
      className={`p-3 rounded-full bg-[#d4af37] text-black hover:bg-amber-600 hover:text-white transition-all duration-300 transform hover:scale-110 ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
}