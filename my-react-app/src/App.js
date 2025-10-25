import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal ambil data dari server");
        }
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Integrasi React dan Node.js</h1>
      <p>Pesan dari server: {message}</p>
    </div>
  );
}

export default App;
