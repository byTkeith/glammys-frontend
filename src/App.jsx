import { useState, useEffect } from "react";
import { Header } from "./components/ui/Header";
//import { Card, CardContent } from "./components/ui/cards";
import { Card, CardContent, CardHeader, CardTitle, TestimonialCard } from "./components/ui/cards";
import { Button, LuxuryButton, AnimatedButton, IconButton } from "./components/ui/Button";
import { Input } from "./components/ui/input";
import { Loader2, Calendar, User, Phone, Mail, Instagram, Facebook, Twitter, MapPin, Star, Check } from "lucide-react";
//import { Calendar, User, Phone, Mail, Instagram, Facebook, Twitter, MapPin, Star, Check, Linkedin } from "lucide-react";
import { TeamMemberCard } from "./components/ui/TeamMemberCard";
import "./index.css";

function App() {
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState("booking");

  // State for hero slideshow
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const heroImages = [
    "/images/garden-view.jpeg",
    "/images/city-view.jpeg",
    "/images/pool-view.jpeg"
  ];

  // Define rooms array
  const rooms = [
    {
      id: 1,
      name: "Deluxe Suite",
      price: "ZAR1500 p/night",
      description: "Spacious suite with city view, king-size bed, and premium amenities.",
      features: ["King-size bed", "City view", "Free Wi-Fi", "Full Fridge"],
      images: [
        "/images/bedroom-1.jpeg",
        "/images/dining-pov.jpeg",
        "/images/kicthenet.jpeg"
      ]
    },
    {
      id: 2,
      name: "Executive Suite",
      price: "ZAR1350 p/night",
      description: "Luxury suite with separate living area, workspace, and panoramic views.",
      features: ["King-size bed", "Separate living area", "Work desk", "Premium toiletries"],
      images: [
        "/images/bedroom-2.jpeg",
        "/images/lounge-view.jpeg",
      ]
    },
    {
      id: 3,
      name: "Family Suite",
      price: "ZAR1350 p/night",
      description: "Our most luxurious accommodation with butler service and private terrace.",
      features: ["Master bedroom", "Private terrace", "Queen Sized Bed", "pool"],
      images: [
        "/images/bedroom-1.jpeg",
        "/images/dining-pov.jpeg",
        "/images/lounge-view.jpeg"
      ]
    }
  ];

  // Initialize room image indices with default values (0 for each room)
  const [roomImageIndices, setRoomImageIndices] = useState(() => {
    const indices = {};
    rooms.forEach(room => {
      indices[room.name] = 0;
    });
    return indices;
  });
  
  // State to track if images are currently transitioning
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Only log when necessary, not on every change
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("Room Image Indices:", roomImageIndices);
    }
  }, [roomImageIndices]);

  const team = [
    {
      name: "Ms S. Nyevedzanał",
      position: "Founder & Director",
      bio: "With over 15 years in luxury hospitality, Svodai leads Glammys with a vision of unparalleled service excellence.",
      image: "/images/ceo-2.jpeg"
    }
  ];

  const testimonials = [
    {
      name: "Amanda J.",
      location: "New York",
      comment: "The Presidential Suite exceeded all my expectations. The views were breathtaking and the service impeccable.",
      rating: 5
    },
    {
      name: "Michael T.",
      location: "London",
      comment: "Staying at Glammys was the highlight of our trip. The attention to detail and luxury amenities make it stand out.",
      rating: 5
    },
    {
      name: "Elena R.",
      location: "Paris",
      comment: "The Executive Suite offered the perfect blend of comfort and sophistication. We'll definitely return.",
      rating: 4
    }
  ];

  const amenities = [
    "Daily House Cleaning",
    "24/7 Concierge Service",
    "CCTV Security",
    "A Walk From Nelson Mandela Square",
    "Exclusive Fitness Centre",
    "Heated Pool"
  ];

  // Improved Hero slideshow effect with smoother transitions
  useEffect(() => {
    // Use a longer interval for hero images
    const interval = setInterval(() => {
      setHeroImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 8000); // Change image less frequently (every 8 seconds)

    return () => clearInterval(interval);
  }, []); // Empty dependency array to ensure this only runs once

  // Modified Room slideshow effect to prevent glitching
  useEffect(() => {
    // Only set up intervals once, not on every render
    const intervals = {};
    
    // Use a consistent key for each room (id is better than name)
    rooms.forEach((room) => {
      if (room.images && room.images.length > 1) { // Only set interval if there are multiple images
        intervals[room.id] = setInterval(() => {
          setRoomImageIndices((prevIndices) => {
            const currentIndex = prevIndices[room.name] || 0;
            return {
              ...prevIndices,
              [room.name]: (currentIndex + 1) % room.images.length
            };
          });
        }, 7000); // Increase to 7 seconds to reduce frequency of changes
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => {
        clearInterval(interval);
      });
    };
  }, []); // Empty dependency array to ensure this only runs once

  const handleBooking = async () => {
    if (!room || !date || !customer || !clientPhone) {
      setMessage("Please fill all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Simulate a successful API call
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }, 1500);
    } catch (error) {
      console.error("Error booking:", error);
      setMessage("Error connecting to server");
      setLoading(false);
    }
  };

  const fadeClasses = "transition-all duration-500 ease-in-out";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Render the Header component with props */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content Area */}
      <div className="pt-24">
        {/* Hero Section */}
        {activeSection === "booking" && (
          <section>
            {/* Hero Banner */}
            <div className="relative h-screen max-h-[600px] w-full overflow-hidden mb-12">
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10"></div>
              <img
                src={heroImages[heroImageIndex]}
                alt="Luxury Hotel Ambiance"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  console.error(`Failed to load hero image: ${e.target.src}`);
                  e.target.src = "/images/fallback-image.jpeg"; // Fallback image
                }}
              />
              <div className="absolute inset-0 flex items-center z-20">
                <div className="container mx-auto px-6">
                  <div className={`max-w-2xl ${fadeClasses}`}>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                      Experience Luxury <span className="text-amber-400">Redefined</span>
                    </h1>
                    <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                      Indulge in the epitome of urban elegance at Glammys Executive Suites. Where every moment becomes a cherished memory.
                    </p>
                    <LuxuryButton
                      onClick={() => {
                        const bookingForm = document.getElementById('booking-form');
                        bookingForm?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Book Your Stay
                    </LuxuryButton>
                   
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Amenities Section */}
            <div className="container mx-auto px-6 mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3 text-amber-400">Experience Our Exclusive Amenities</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Glammys offers a range of world-class amenities designed to make your stay unforgettable.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-4 rounded-lg bg-gray-800 shadow-sm ${fadeClasses}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <Check className="text-amber-500" size={20} />
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <div id="booking-form" className="container mx-auto px-6 bg-gray-900 py-16 rounded-lg">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden">
                  {/* Left: Form */}
                  <div className="md:w-1/2 bg-gray-800 p-8">
                    <h2 className="text-3xl font-bold mb-6 text-amber-400">Book Your Stay</h2>
                    <p className="text-gray-400 mb-8">Select your preferences and we'll ensure your stay is perfect.</p>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-400 font-medium mb-2 flex items-center gap-2">
                          Room Type:
                        </label>
                        <select
                          onChange={(e) => setRoom(e.target.value)}
                          className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-gray-900 text-white"
                        >
                          <option value="">Select a Room</option>
                          <option value="Deluxe Suite">Deluxe Suite</option>
                          <option value="Executive Suite">Executive Suite</option>
                          <option value="Presidential Suite">Presidential Suite</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2 flex items-center gap-2">
                          <Calendar size={18} /> Check-in Date:
                        </label>
                        <Input
                          type="date"
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2 flex items-center gap-2">
                          <User size={18} /> Your Name:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          onChange={(e) => setCustomer(e.target.value)}
                          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-medium mb-2 flex items-center gap-2">
                          <Phone size={18} /> Your Phone Number:
                        </label>
                        <input
                          type="text"
                          placeholder="+1 (234) 567-8900"
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
                        />
                      </div>
                      <LuxuryButton
                        onClick={handleBooking}
                        variant="primary"
                        isLoading={loading}
                        className="w-full"
                      >
                        Confirm Booking
                      </LuxuryButton>
                      
                      {message && <p className="text-center text-red-500">{message}</p>}
                    </div>
                  </div>

                  {/* Right: Image and Sales Copy */}
                  <div className="md:w-1/2 bg-gray-900 p-8 flex flex-col justify-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 z-10"></div>
                    <img
                      src="/images/city-view.jpeg"
                      alt="Luxury Suite Interior"
                      className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-80"
                      onError={(e) => {
                        console.error(`Failed to load image: ${e.target.src}`);
                        e.target.src = "/images/fallback-image.jpeg";
                      }}
                    />
                    <div className="relative z-20">
                      <h3 className="text-2xl font-bold mb-4">Why Book Direct?</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <Check className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                          <p>Best rate guarantee - we match any lower price.</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                          <p>Complimentary room upgrade when available.</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                          <p>Early check-in and late check-out privileges.</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                          <p>Exclusive access to our luxury spa facilities.</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {activeSection === "testimonials" && (
          <div className="container mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-amber-400">What Our Guests Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.comment}
                  author={testimonial.name}
                  location={testimonial.location}
                  rating={testimonial.rating}
                  variant="luxury"
                />
              ))}
            </div>
          </div>
        )}

        {/* Rooms Section - Updated with better image handling */}
        {activeSection === "rooms" && (
          <div className={`py-16 container mx-auto px-6 bg-black ${fadeClasses}`}>
            <h2 className="text-4xl font-bold text-center mb-16 text-amber-400">Experience Luxurious Accommodations</h2>
            <div className="grid grid-cols-1 gap-16">
              {rooms.map((room, index) => {
                // Make sure room has images and get the current image index
                const hasImages = room.images && room.images.length > 0;
                const currentImageIndex = roomImageIndices[room.name] || 0;
                const currentImage = hasImages ? room.images[currentImageIndex] : "/images/fallback-image.jpeg";
                
                // Only log in development mode and limit frequency
                if (process.env.NODE_ENV === 'development' && Math.random() < 0.1) {
                  console.log(`Room: ${room.name}, Current Image Index: ${currentImageIndex}, Current Image: ${currentImage}`);
                }
                
                return (
                  <div
                    key={room.id}
                    className={`flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-xl ${fadeClasses}`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    {/* Room Image with improved rendering to prevent glitching */}
                    <div className={`md:w-1/2 h-64 md:h-auto relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <div className="h-full w-full relative overflow-hidden">
                        <img
                          key={`${room.name}-${currentImageIndex}`} // Add key to force proper re-rendering
                          src={currentImage}
                          alt={`${room.name} - Image ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover transition-opacity duration-1000"
                          style={{ opacity: 1 }} // Ensure consistent opacity
                          onError={(e) => {
                            console.error(`Failed to load room image: ${e.target.src}`);
                            e.target.src = "/images/fallback-image.jpeg"; // Fallback image
                          }}
                        />
                      </div>
                      <div className="absolute top-4 right-4 bg-[#d4af37] text-black font-bold py-2 px-4 rounded-md shadow-lg">
                        {room.price}
                      </div>
                    </div>
                    {/* Room Details */}
                    <div className={`md:w-1/2 p-8 bg-gray-800 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                      <h3 className="text-3xl font-bold mb-4 text-[#d4af37]">{room.name}</h3>
                      <p className="text-gray-400 mb-6 text-lg">{room.description}</p>
                      <div className="grid grid-cols-2 gap-3 mb-8">
                        {room.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-gray-400">
                            <Check size={18} className="mr-2 text-[#d4af37]" /> {feature}
                          </div>
                        ))}
                      </div>
                      
                      <LuxuryButton
                        onClick={() => {
                          setRoom(room.name);
                          setActiveSection("booking");
                          setTimeout(() => {
                            const bookingForm = document.getElementById('booking-form');
                            bookingForm?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                      >
                        Book Now
                      </LuxuryButton>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* About Section */}
        {activeSection === "about" && (
          <div className={`py-16 container mx-auto px-6 bg-black ${fadeClasses}`}>
            <h2 className="text-4xl font-bold text-center mb-16 text-amber-400">About Glammys Executive Suites</h2>
            {/* Story Section */}
            <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
              <div className="md:w-1/2">
                <img
                  src="/images/background.jpeg"
                  alt="Glammys Exterior"
                  className="rounded-lg shadow-xl w-full"
                  onError={(e) => {
                    console.error(`Failed to load image: ${e.target.src}`);
                    e.target.src = "/images/fallback-image.jpeg";
                  }}
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-bold mb-6 text-amber-400">Our Story</h3>
                <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                  Nestled in the heart Sandton, Glammys Executive Suites represents the pinnacle of luxury accommodation.
                  Our vision is to provide an unparalleled hospitality experience that combines affordability, comfort, and personalized service.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Founded in 2020, we have rapidly established ourselves as the destination of choice for discerning travelers in Sandton, Johannesburg
                  who demand nothing but the best in their accommodation. Our commitment to excellence is evident in every detail,
                  from our meticulously designed suites to our attentive and discreet service.
                </p>
              </div>
            </div>

            {/* Leadership Team */}
            {/* Leadership Team */}
<h3 className="text-3xl font-bold text-center mb-12 text-amber-400">Meet Our Leadership Team</h3>
<div className="max-w-md mx-auto"> {/* Single card centered */}
  {team.map((member, index) => (
    <TeamMemberCard
      key={index}
      member={member}
      className={`transform transition-all duration-700 hover:scale-105 ${fadeClasses}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    />
  ))}
</div>
           
            {/* <h3 className="text-3xl font-bold text-center mb-12 text-amber-400">Meet Our Leadership Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={index}
                  className={`${fadeClasses}`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                >
                  <Card className="shadow-lg overflow-hidden h-full max-w-sm mx-auto bg-gray-800">
                    <div className="flex flex-col h-full">
                      <div className="h-64 relative overflow-hidden flex-shrink-0">
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{ width: '300px', height: '400px', objectFit: 'cover' }}
                          onError={(e) => {
                            console.error(`Failed to load team image: ${e.target.src}`);
                            e.target.src = "/images/fallback-image.jpeg";
                          }}
                        />
                      </div>
                      <div className="p-6 flex-grow bg-gray-800">
                        <h4 className="text-2xl font-bold mb-1 text-amber-400">{member.name}</h4>
                        <p className="text-amber-500 font-medium mb-4">{member.position}</p>
                        <p className="text-gray-400">{member.bio}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div> */}

            {/* Contact Section */}
            <div className="bg-gray-900 rounded-2xl p-12 max-w-4xl mx-auto mt-16">
              <h3 className="text-2xl font-bold mb-8 text-center text-amber-400">Get In Touch</h3>
              <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-500 p-3 rounded-full">
                    <Phone size={24} className="text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Call Us</p>
                    <p className="font-medium">+27 (789) 727-4452</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-amber-500 p-3 rounded-full">
                    <Mail size={24} className="text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email Us</p>
                    <p className="font-medium">sandton.exclusive@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-amber-500 p-3 rounded-full">
                    <MapPin size={24} className="text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Our Location</p>
                    <p className="font-medium">86 Grayston Drive Sandton</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-8">
                <IconButton icon={<Instagram size={24} />} onClick={() => window.open('#', '_blank')} />
                <IconButton icon={<Facebook size={24} />} onClick={() => window.open('#', '_blank')} />
                <IconButton icon={<Twitter size={24} />} onClick={() => window.open('#', '_blank')} />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-sm relative overflow-hidden">
                    <span className="absolute top-1 left-2.5">G</span>
                    <span className="absolute bottom-1 right-2.5">S</span>
                    <div className="w-px h-full bg-black rotate-45 absolute"></div>
                  </div>
                  <span className="text-xl font-bold">GLAMMYS</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Elevating luxury hospitality to new heights with unparalleled service and sophisticated accommodations.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Home</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Rooms</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Amenities</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">About Us</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Policies</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Cancellation Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Newsletters</h4>
                <p className="text-gray-400 text-sm mb-4">Subscribe to receive special offers and updates.</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="rounded-l-lg rounded-r-none border-r-0 bg-gray-800 text-white p-3 focus:outline-none"
                  />
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-l-none">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Glammys Executive Suites. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Success Notification */}
        {success && (
          <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-xl flex items-center gap-3 z-50 px-6 ${fadeClasses}`}>
            <Check size={24} />
            <span className="font-medium">Booking Successful! We look forward to hosting you.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;