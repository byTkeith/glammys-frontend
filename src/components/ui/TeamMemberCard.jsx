import React from 'react';
import { Card, CardContent } from './cards';
import { Mail, Linkedin, Instagram } from 'lucide-react';

export function TeamMemberCard({ member, className = "", ...props }) {
  return (
    <Card 
      variant="luxury" 
      className={`overflow-visible shadow-lg rounded-2xl ${className}`}
      hover={true}
      {...props}
    >
      <div className="relative">
        {/* Image container with centered image */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl flex justify-center items-center bg-gray-900">
          {/* Gold gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-amber-900/20 z-10"></div>
          
          {/* Image - centered with fixed width */}
          <img
            src={member.image}
            alt={member.name}
            className="w-24 h-24 object-cover object-center rounded-full border-2 border-amber-500 z-20"
            onError={(e) => {
              console.error(`Failed to load team image: ${e.target.src}`);
              e.target.src = "/images/fallback-image.jpeg";
            }}
          />
          
          {/* Smoother corner accents - using rounded borders */}
          <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-amber-400/70 rounded-tl-xl z-20"></div>
          <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-amber-400/70 rounded-br-xl z-20"></div>
        </div>
        
        {/* Position badge - smaller and more refined */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-30">
          <div className="bg-amber-500 text-black font-bold text-xs tracking-wider uppercase py-1 px-4 rounded-full shadow-lg">
            {member.position}
          </div>
        </div>
      </div>
      
      <CardContent className="pt-6 px-5 pb-5">
        {/* Name */}
        <div className="text-center mb-3">
          <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
          <div className="flex items-center justify-center">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
        </div>
        
        {/* Bio with quote styling - more compact */}
        <div className="relative mb-3">
          <div className="absolute -top-2 -left-1 text-2xl text-amber-400/30 font-serif">"</div>
          <div className="absolute -bottom-2 -right-1 text-2xl text-amber-400/30 font-serif transform rotate-180">"</div>
          <p className="text-gray-300 leading-relaxed text-center text-xs px-1">{member.bio}</p>
        </div>
        
       
      </CardContent>
    </Card>
  );
}