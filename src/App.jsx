import { useState } from "react";

function App() {
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [clientPhone, setClientPhone] = useState(""); 
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    if (!room || !date || !customer || !clientPhone) {
      setMessage("Please fill all fields.");
      return;
    }

     // Log data being sent
  console.log("📤 Sending booking:", { room, date, customer});

  try {
    const response = await fetch("https://glammys-backend.onrender.com/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room, date, customer, clientPhone}),
    });

    const data = await response.json();
    console.log("📥 Response from backend:", data);
    setMessage(data.message || "Booking failed.");
  } catch (error) {
    console.error("❌ Error booking:", error);
    setMessage("Error connecting to server.");
  }
    

    
  };

  return (
    <div>
      <h1>Glammys Executive Suites</h1>
      <label>Room Type:</label>
      <select onChange={(e) => setRoom(e.target.value)}>
        <option value="">Select a Room</option>
        <option value="Deluxe Suite">Deluxe Suite</option>
        <option value="Executive Suite">Executive Suite</option>
        <option value="Presidential Suite">Presidential Suite</option>
      </select>
      
      <label>Date:</label>
      <input type="date" onChange={(e) => setDate(e.target.value)} />

      <label>Your Name:</label>
      <input type="text" onChange={(e) => setCustomer(e.target.value)} />

      <label>Your Phone Number:</label>
      <input type="text" placeholder="+1234567890" onChange={(e) => setClientPhone(e.target.value)} /> 

      <button onClick={handleBooking}>Book Now</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
