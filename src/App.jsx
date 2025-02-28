import { useState } from "react";
import { Card, CardContent } from "./components/ui/cards";  // Changed from "cards" to "card"
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Loader2, Calendar, User, Phone, Mail, Instagram, Facebook, Twitter, MapPin, Star, Check } from "lucide-react";
// Removed framer-motion import since we'll use normal React transitions
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
  
  const rooms = [
    {
      id: 1,
      name: "Deluxe Suite",
      price: "$150/night",
      description: "Spacious suite with city view, king-size bed, and premium amenities.",
      features: ["King-size bed", "City view", "Free Wi-Fi", "Mini bar"]
    },
    {
      id: 2,
      name: "Executive Suite",
      price: "$250/night",
      description: "Luxury suite with separate living area, workspace and panoramic views.",
      features: ["King-size bed", "Separate living area", "Work desk", "Premium toiletries"]
    },
    {
      id: 3,
      name: "Presidential Suite",
      price: "$500/night",
      description: "Our most luxurious accommodation with butler service and private terrace.",
      features: ["Master bedroom", "Private terrace", "Butler service", "Jacuzzi"]
    }
  ];
  
  const team = [
    {
      name: "Svodai Pamela",
      position: "CEO",
      bio: "With over 15 years in luxury hospitality, Svodai leads Glammys with a vision of unparalleled service excellence.",
      image: "/images/ceo-2.jpeg",
    },
    {
      name: "Tendai Keith",
      position: "CFO",
      bio: "Tendai ensures Glammys maintains its financial success while continuing to invest in exceptional guest experiences.",
      image: "/images/team-2.jpeg",
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
    "Rooftop Infinity Pool",
    "24/7 Concierge Service",
    "Fine Dining Restaurant",
    "Premium Spa & Wellness Center",
    "Exclusive Fitness Club",
    "Business Center"
  ];
  
  const handleBooking = async () => {
    if (!room || !date || !customer || !clientPhone) {
      setMessage("Please fill all fields.");
      return;
    }
    setLoading(true);
    setMessage("");
    console.log("Sending booking:", { room, date, customer });
    try {
      // For demonstration purposes, simulate a successful API call
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }, 1500);
      // Uncomment this for real API integration
       const response = await fetch("https://glammys-backend.onrender.com/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room, date, customer, clientPhone }),
      });
      const data = await response.json();
      console.log("Response from backend:", data);
      setLoading(false);
      if (data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setMessage(data.message || "Booking failed.");
      } 
    } catch (error) {
      console.error("Error booking:", error);
      setMessage("Error connecting to server.");
      setLoading(false);
    }
  };
  
  // Simple fade-in animation styles for CSS transitions instead of framer-motion
  const fadeClasses = "transition-all duration-500 ease-in-out";
  
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Fixed Header/Navigation with Gradient */}
      <nav className="fixed top-0 w-full bg-gradient-to-r from-black/90 to-black/80 backdrop-blur-md p-4 z-50 border-b border-amber-500/30">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            {/* Updated Logo Design */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-xl relative overflow-hidden shadow-lg">
              <span className="absolute top-1 left-3">G</span>
              <span className="absolute bottom-1 right-3">S</span>
              <div className="w-px h-full bg-black rotate-45 absolute"></div>
            </div>
            <span className="text-3xl md:text-5xl font-bold text-white tracking-wider">
              GLAMMYS
              <span className="block text-sm md:text-base font-light tracking-widest text-amber-400 mt-0 opacity-90">EXECUTIVE SUITES</span>
            </span>
          </div>
          <div className="flex gap-8">
            <button
              onClick={() => setActiveSection("booking")}
              className={`text-white hover:text-amber-400 transition-colors ${activeSection === "booking" ? "border-b-2 border-amber-400" : ""}`}
            >
              Book Now
            </button>
            <button
              onClick={() => setActiveSection("rooms")}
              className={`text-white hover:text-amber-400 transition-colors ${activeSection === "rooms" ? "border-b-2 border-amber-400" : ""}`}
            >
              Our Rooms
            </button>
            <button
              onClick={() => setActiveSection("about")}
              className={`text-white hover:text-amber-400 transition-colors ${activeSection === "about" ? "border-b-2 border-amber-400" : ""}`}
            >
              About Us
            </button>
          </div>
        </div>
      </nav>
      
      {/* Main Content Area with Padding for Fixed Header */}
      <div className="pt-24">
        {/* Hero Section with Full-Width Slider */}
        {activeSection === "booking" && (
          <section>
            {/* Hero Banner with Overlay */}
            <div className="relative h-screen max-h-[600px] w-full overflow-hidden mb-12">
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10"></div>
              <img
                src="\images\garden-view.jpeg"
                alt="Luxury Hotel Ambiance"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 flex items-center z-20">
                <div className="container mx-auto px-6">
                  <div className={`max-w-2xl ${fadeClasses}`}>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                      Experience Luxury <span className="text-amber-400">Redefined</span>
                    </h1>
                    <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                      Indulge in the epitome of urban elegance at Glammys Executive Suites.
                      Where every moment becomes a cherished memory.
                    </p>
                    <Button
                      onClick={() => {
                        const bookingForm = document.getElementById('booking-form');
                        bookingForm?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-md text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Book Your Stay
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Featured Amenities Section */}
            <div className="container mx-auto px-6 mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3 text-amber-900">Experience Our Exclusive Amenities</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Glammys offers a range of world-class amenities designed to make your stay unforgettable
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-4 rounded-lg bg-amber-100 shadow-sm ${fadeClasses}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <Check className="text-amber-500" size={20} />
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Booking Form with Beautiful Card Design */}
            <div id="booking-form" className="container mx-auto px-6 bg-amber-100 py-16 rounded-lg">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden">
                  {/* Left: Form */}
                  <div className="md:w-1/2 bg-white p-8">
                    <h2 className="text-3xl font-bold mb-6 text-amber-800">Book Your Stay</h2>
                    <p className="text-gray-700 mb-8">Select your preferences and we'll ensure your stay is perfect</p>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                          Room Type:
                        </label>
                        <select
                          onChange={(e) => setRoom(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                        >
                          <option value="">Select a Room</option>
                          <option value="Deluxe Suite">Deluxe Suite</option>
                          <option value="Executive Suite">Executive Suite</option>
                          <option value="Presidential Suite">Presidential Suite</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                          <Calendar size={18} /> Check-in Date:
                        </label>
                        <Input
                          type="date"
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                          <User size={18} /> Your Name:
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          onChange={(e) => setCustomer(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                          <Phone size={18} /> Your Phone Number:
                        </label>
                        <Input
                          type="text"
                          placeholder="+1 (234) 567-8900"
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <Button
                        onClick={handleBooking}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
                      >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Confirm Booking"}
                      </Button>
                      {message && <p className="text-center text-red-500">{message}</p>}
                    </div>
                  </div>
                  
                  {/* Right: Image and Sales Copy */}
                  <div className="md:w-1/2 bg-gray-900 p-8 flex flex-col justify-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 z-10"></div>
                    <img
                      src="\images\city-view.jpeg"
                      alt="Luxury Suite Interior"
                      className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-80"
                    />
                    <div className="relative z-20">
                      <h3 className="text-2xl font-bold mb-4">Why Book Direct?</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <Check className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                          <p>Best rate guarantee - we match any lower price</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                          <p>Complimentary room upgrade when available</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                          <p>Early check-in and late check-out privileges</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                          <p>Exclusive access to our luxury spa facilities</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonials Section */}
            <div className="container mx-auto px-6 py-16">
              <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">What Our Guests Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={`${i < testimonial.rating ? "text-amber-400" : "text-gray-300"}`}
                            fill={i < testimonial.rating ? "#f59e0b" : "#d1d5db"}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{testimonial.name}</p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin size={14} className="mr-1" />
                          {testimonial.location}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Rooms Section - Enhanced */}
        {activeSection === "rooms" && (
          <div className={`py-16 container mx-auto px-6 bg-amber-50 ${fadeClasses}`}>
            <h2 className="text-4xl font-bold text-center mb-16 text-amber-900">Experience Luxurious Accommodations</h2>
            <div className="grid grid-cols-1 gap-16">
              {rooms.map((room, index) => (
                <div
                  key={room.id}
                  className={`flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-xl ${fadeClasses}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Room Image - Left on odd, right on even */}
                  <div className={`md:w-1/2 h-64 md:h-auto relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <img
                      src={"/images/bedroom-2-view.jpeg"}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-amber-500 text-black font-bold py-2 px-4 rounded-md shadow-lg">
                      {room.price}
                    </div>
                  </div>
                  
                  {/* Room Details */}
                  <div className={`md:w-1/2 p-8 bg-white flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <h3 className="text-3xl font-bold mb-4 text-amber-800">{room.name}</h3>
                    <p className="text-gray-700 mb-6 text-lg">{room.description}</p>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {room.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-gray-700">
                          <Check size={18} className="mr-2 text-amber-500" /> {feature}
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => {
                        setRoom(room.name);
                        setActiveSection("booking");
                        // Scroll to booking form
                        setTimeout(() => {
                          const bookingForm = document.getElementById('booking-form');
                          bookingForm?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="mt-4 self-start bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-md transition-all shadow-md hover:shadow-lg"
                    >
                      Book This Room
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* About Section - Enhanced */}
        {activeSection === "about" && (
          <div className={`py-16 container mx-auto px-6 ${fadeClasses}`}>
            <h2 className="text-4xl font-bold text-center mb-16 text-amber-900">About Glammys Executive Suites</h2>
            
            {/* Story Section with Image */}
            <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
              <div className="md:w-1/2">
                <img
                  src="\images\background.jpeg"
                  alt="Glammys Exterior"
                  className="rounded-lg shadow-xl w-full"
                  //style={{ width: '2000px', height: '200px', objectFit: 'cover' }}
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-bold mb-6 text-amber-800">Our Story</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Nestled in the heart of the city, Glammys Executive Suites represents the pinnacle of luxury accommodation.
                  Our vision is to provide an unparalleled hospitality experience that combines elegance, comfort, and personalized service.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Founded in 2020, we have rapidly established ourselves as the destination of choice for discerning travelers in Sandton, Johannesburg
                  who demand nothing but the best in their accommodation. Our commitment to excellence is evident in every detail,
                  from our meticulously designed suites to our attentive and discreet service.
                </p>
              </div>
            </div>
            
            {/* Leadership Team */}
            <h3 className="text-3xl font-bold text-center mb-12 text-amber-800">Meet Our Leadership Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={index}
                  className={`${fadeClasses}`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                >
                  <Card className="shadow-lg overflow-hidden h-full max-w-sm mx-auto bg-amber-50">
                    <div className="flex flex-col h-full">
                      <div className="h-64 relative overflow-hidden flex-shrink-0">
                        <img
                          src={member.image}
                          alt={member.name}
                          //className="w-full h-full object-cover object-center"
                          style={{ width: '300px', height: '400px', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="p-6 flex-grow bg-amber-50">
                        <h4 className="text-2xl font-bold mb-1 text-amber-900">{member.name}</h4>
                        <p className="text-amber-600 font-medium mb-4">{member.position}</p>
                        <p className="text-gray-700">{member.bio}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            
            {/* Contact Section */}
            <div className="bg-amber-100 rounded-2xl p-12 max-w-4xl mx-auto mt-16">
              <h3 className="text-2xl font-bold mb-8 text-center text-amber-800">Get In Touch</h3>
              <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-200 p-3 rounded-full">
                    <Phone size={24} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call Us</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-amber-200 p-3 rounded-full">
                    <Mail size={24} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Us</p>
                    <p className="font-medium">info@glammyssuites.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-amber-200 p-3 rounded-full">
                    <MapPin size={24} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Our Location</p>
                    <p className="font-medium">123 Luxury Ave, Metropolis</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-8">
                <a href="#" className="bg-amber-200 p-3 rounded-full hover:bg-amber-500 transition-colors">
                  <Instagram size={24} className="text-gray-700 hover:text-white transition-colors" />
                </a>
                <a href="#" className="bg-amber-200 p-3 rounded-full hover:bg-amber-500 transition-colors">
                  <Facebook size={24} className="text-gray-700 hover:text-white transition-colors" />
                </a>
                <a href="#" className="bg-amber-200 p-3 rounded-full hover:bg-amber-500 transition-colors">
                  <Twitter size={24} className="text-gray-700 hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer - Enhanced */}
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
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">Subscribe to receive special offers and updates</p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="your email address"
                  className="rounded-l-lg rounded-r-none border-r-0"
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
        <div
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-xl flex items-center gap-3 z-50 px-6 ${fadeClasses}`}
        >
          <Check size={24} />
          <span className="font-medium">Booking Successful! We look forward to hosting you.</span>
        </div>
      )}
    </div>
  );
}

export default App;