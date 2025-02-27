import { useState } from "react";
import { Card, CardContent } from "./components/ui/cards";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Loader2, Calendar, User, Phone, Hotel, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { motion } from "framer-motion";
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
      image: "/api/placeholder/300/300"
    },
    {
      name: "Tendai Keith",
      position: "CFO",
      bio: "Tendai ensures Glammys maintains its financial success while continuing to invest in exceptional guest experiences.",
      image: "/api/placeholder/300/300"
    }
  ];

  const handleBooking = async () => {
    if (!room || !date || !customer || !clientPhone) {
      setMessage("Please fill all fields.");
      return;
    }
    setLoading(true);
    setMessage("");
    console.log(" Sending booking:", { room, date, customer });
    try {
      const response = await fetch("https://glammys-backend.onrender.com/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room, date, customer, clientPhone }),
      });
      const data = await response.json();
      console.log(" Response from backend:", data);
      setLoading(false);
      if (data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setMessage(data.message || "Booking failed.");
      }
    } catch (error) {
      console.error(" Error booking:", error);
      setMessage("Error connecting to server.");
      setLoading(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url("https://cdnjs.cloudflare.com/ajax/libs/pexels-photo-api/1.0.0/city-skyline-night.jpg")' }}>
      {/* Hero Section with Overlay */}
      <div className="min-h-screen bg-black bg-opacity-60">
        {/* Navigation Bar */}
        <nav className="bg-black bg-opacity-70 p-4 sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Hotel size={32} className="text-gold" />
              <span className="text-2xl font-bold text-white">Glammys Executive Suites</span>
            </div>
            <div className="flex gap-6">
              <button 
                onClick={() => setActiveSection("booking")} 
                className={`text-white hover:text-gold transition-colors ${activeSection === "booking" ? "border-b-2 border-gold" : ""}`}
              >
                Book Now
              </button>
              <button 
                onClick={() => setActiveSection("rooms")} 
                className={`text-white hover:text-gold transition-colors ${activeSection === "rooms" ? "border-b-2 border-gold" : ""}`}
              >
                Our Rooms
              </button>
              <button 
                onClick={() => setActiveSection("about")} 
                className={`text-white hover:text-gold transition-colors ${activeSection === "about" ? "border-b-2 border-gold" : ""}`}
              >
                About Us
              </button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-12">
          {/* Conditional rendering based on active section */}
          {activeSection === "booking" && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]"
            >
              <motion.h1 
                className="text-5xl font-bold text-white mb-6 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Experience Luxury Like Never Before
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-200 mb-12 text-center max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Indulge in the epitome of urban elegance at Glammys Executive Suites. Book your unforgettable stay today.
              </motion.p>

              <motion.div 
                className="w-full max-w-md"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Card className="backdrop-blur-md bg-white bg-opacity-10 shadow-2xl rounded-2xl border border-gray-200 border-opacity-20">
                  <CardContent className="space-y-6 p-8">
                    <h2 className="text-2xl font-bold text-white text-center">Book Your Stay</h2>
                    <div>
                      <label className="block text-lg font-medium text-white flex items-center gap-2 mb-2">
                        <Hotel size={18} /> Room Type:
                      </label>
                      <select
                        onChange={(e) => setRoom(e.target.value)}
                        className="w-full p-3 border border-gray-300 bg-white bg-opacity-90 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 ease-in-out"
                      >
                        <option value="">Select a Room</option>
                        <option value="Deluxe Suite">Deluxe Suite</option>
                        <option value="Executive Suite">Executive Suite</option>
                        <option value="Presidential Suite">Presidential Suite</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-white flex items-center gap-2 mb-2">
                        <Calendar size={18} /> Date:
                      </label>
                      <Input 
                        type="date" 
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-white bg-opacity-90" 
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-white flex items-center gap-2 mb-2">
                        <User size={18} /> Your Name:
                      </label>
                      <Input 
                        type="text" 
                        onChange={(e) => setCustomer(e.target.value)} 
                        className="bg-white bg-opacity-90"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-white flex items-center gap-2 mb-2">
                        <Phone size={18} /> Your Phone Number:
                      </label>
                      <Input 
                        type="text" 
                        placeholder="+1234567890" 
                        onChange={(e) => setClientPhone(e.target.value)} 
                        className="bg-white bg-opacity-90"
                      />
                    </div>

                    <Button
                      onClick={handleBooking}
                      className="w-full bg-gold hover:bg-gold-dark text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : "Book Now"}
                    </Button>
                    <p className="text-center text-red-400">{message}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {activeSection === "rooms" && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="py-16"
            >
              <h2 className="text-4xl font-bold text-white text-center mb-16">Our Luxurious Rooms</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {rooms.map((room, index) => (
                  <motion.div 
                    key={room.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="group"
                  >
                    <Card className="h-full backdrop-blur-md bg-white bg-opacity-10 hover:bg-opacity-20 border border-gray-200 border-opacity-20 transition-all duration-300 overflow-hidden">
                      <div className="h-48 bg-gray-300 relative overflow-hidden">
                        <img 
                          src={`/api/placeholder/600/400`} 
                          alt={room.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute top-0 right-0 bg-gold text-black font-bold py-1 px-3">
                          {room.price}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{room.name}</h3>
                        <p className="text-gray-300 mb-4">{room.description}</p>
                        <div className="space-y-2">
                          {room.features.map((feature, i) => (
                            <div key={i} className="flex items-center text-gray-200">
                              <span className="mr-2 text-gold">•</span> {feature}
                            </div>
                          ))}
                        </div>
                        <Button 
                          onClick={() => {
                            setRoom(room.name);
                            setActiveSection("booking");
                          }}
                          className="mt-6 w-full bg-gold hover:bg-gold-dark text-black font-bold"
                        >
                          Book This Room
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "about" && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="py-16"
            >
              <h2 className="text-4xl font-bold text-white text-center mb-16">About Glammys Executive Suites</h2>
              
              <div className="mb-16 max-w-3xl mx-auto">
                <p className="text-gray-200 text-lg text-center mb-8">
                  Nestled in the heart of the city, Glammys Executive Suites represents the pinnacle of luxury accommodation. 
                  Our vision is to provide an unparalleled hospitality experience that combines elegance, comfort, and personalized service.
                </p>
                <p className="text-gray-200 text-lg text-center">
                  Founded in 2020, we have rapidly established ourselves as the destination of choice for discerning travelers 
                  who demand nothing but the best in their accommodation.
                </p>
              </div>
              
              <h3 className="text-3xl font-bold text-white text-center mb-12">Our Leadership Team</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                {team.map((member, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.3, duration: 0.6 }}
                  >
                    <Card className="backdrop-blur-md bg-white bg-opacity-10 border border-gray-200 border-opacity-20 overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <h4 className="text-xl font-bold text-white">{member.name}</h4>
                          <p className="text-gold mb-3">{member.position}</p>
                          <p className="text-gray-300">{member.bio}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-16 text-center">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
                <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
                  <div className="flex items-center text-gray-200">
                    <Phone size={20} className="mr-2 text-gold" /> +1 (555) 123-4567
                  </div>
                  <div className="flex items-center text-gray-200">
                    <Mail size={20} className="mr-2 text-gold" /> info@glammyssuites.com
                  </div>
                </div>
                
                <div className="flex justify-center gap-6 mt-4">
                  <a href="#" className="text-white hover:text-gold transition-colors">
                    <Instagram size={24} />
                  </a>
                  <a href="#" className="text-white hover:text-gold transition-colors">
                    <Facebook size={24} />
                  </a>
                  <a href="#" className="text-white hover:text-gold transition-colors">
                    <Twitter size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-black bg-opacity-80 text-white py-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <Hotel size={24} className="text-gold" />
                <span className="text-xl font-bold">Glammys Executive Suites</span>
              </div>
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Glammys Executive Suites. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2 z-50"
        >
          Booking Successful!
        </motion.div>
      )}
    </div>
  );
}

export default App;