import React from 'react';

export function Card({ 
  children, 
  className = "", 
  variant = "default", 
  hover = true,
  ...props 
}) {
  // Base styles that apply to all cards
  const baseStyles = "rounded-xl overflow-hidden transition-all duration-300";
  
  // Variant styles
  const variantStyles = {
    default: "bg-gray-800 border border-gray-700",
    luxury: "bg-gradient-to-br from-gray-800 to-gray-900 border border-amber-500/30",
    glass: "bg-gray-800/60 backdrop-blur-sm border border-gray-700/50",
    dark: "bg-black border border-gray-800",
    white: "bg-white border border-gray-100 text-gray-800", // Maintains your original white style
    gold: "bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/50"
  };
  
  // Hover effects
  const hoverStyles = hover ? 
    variant === "white" 
      ? "hover:shadow-xl hover:border-[#d4af37]" // Original hover for white cards
      : "hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-500/50 hover:transform hover:-translate-y-1" 
    : "";
  
  // Combine all styles
  const cardStyles = `${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`;
  
  return (
    <div 
      className={cardStyles}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ 
  children, 
  className = "", 
  ...props 
}) {
  return (
    <div 
      className={`p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ 
  children, 
  className = "", 
  ...props 
}) {
  return (
    <h3 
      className={`text-2xl font-bold text-amber-400 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ 
  children, 
  className = "", 
  ...props 
}) {
  return (
    <div 
      className={`p-6 pt-0 space-y-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ 
  children, 
  className = "", 
  ...props 
}) {
  return (
    <div 
      className={`p-6 pt-0 border-t border-gray-700 mt-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// Testimonial Card with Quote styling
export function TestimonialCard({ 
  quote, 
  author, 
  location, 
  rating = 5, 
  className = "", 
  ...props 
}) {
  return (
    <Card className={`shadow-lg ${className}`} {...props}>
      <CardContent className="p-6 relative">
        {/* Quote mark styling */}
        <div className="absolute top-4 right-4 text-5xl text-amber-400/20 font-serif">"</div>
        
        {/* Rating stars */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i}
              xmlns="http://www.w3.org/2000/svg" 
              className={`w-5 h-5 ${i < rating ? "text-amber-400" : "text-gray-500"}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        
        {/* Quote text */}
        <p className="text-gray-300 mb-6 italic relative z-10">"{quote}"</p>
        
        {/* Author info */}
        <div className="flex items-center justify-between">
          <p className="font-medium text-white">{author}</p>
          <div className="flex items-center text-gray-400 text-sm">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Additional specialized card components...