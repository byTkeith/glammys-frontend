import { useState } from "react";
import { Card, CardContent } from "./components/ui/cards";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Loader2, Calendar, User, Phone, Hotel } from "lucide-react";
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

  const handleBooking = async () => {
    if (!room || !date || !customer || !clientPhone) {
      setMessage("Please fill all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    console.log("📤 Sending booking:", { room, date, customer });

    try {
      const response = await fetch("https://glammys-backend.onrender.com/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room, date, customer, clientPhone }),
      });

      const data = await response.json();
      console.log("📥 Response from backend:", data);
      setLoading(false);
      if (data.success) {
        setSuccess(true);
      } else {
        setMessage(data.message || "Booking failed.");
      }
    } catch (error) {
      console.error("❌ Error booking:", error);
      setMessage("Error connecting to server.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-white">
          <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <Hotel size={32} /> Glammys Executive Suites
          </h1>
          <CardContent>
            <label className="block text-lg font-medium flex items-center gap-2">
              <Hotel size={18} /> Room Type:
            </label>
            <select 
              onChange={(e) => setRoom(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4 focus:ring focus:ring-blue-300">
              <option value="">Select a Room</option>
              <option value="Deluxe Suite">Deluxe Suite</option>
              <option value="Executive Suite">Executive Suite</option>
              <option value="Presidential Suite">Presidential Suite</option>
            </select>

            <label className="block text-lg font-medium flex items-center gap-2">
              <Calendar size={18} /> Date:
            </label>
            <Input type="date" onChange={(e) => setDate(e.target.value)} className="mb-4" />

            <label className="block text-lg font-medium flex items-center gap-2">
              <User size={18} /> Your Name:
            </label>
            <Input type="text" onChange={(e) => setCustomer(e.target.value)} className="mb-4" />

            <label className="block text-lg font-medium flex items-center gap-2">
              <Phone size={18} /> Your Phone Number:
            </label>
            <Input type="text" placeholder="+1234567890" onChange={(e) => setClientPhone(e.target.value)} className="mb-4" />

            <Button 
              onClick={handleBooking} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : "Book Now"}
            </Button>
            <p className="text-center text-red-500 mt-4">{message}</p>
          </CardContent>
        </Card>
      </motion.div>

      {success && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          ✅ Booking Successful!
        </motion.div>
      )}
    </div>
  );
}

export default App;
