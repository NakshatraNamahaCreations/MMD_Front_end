import { useState } from "react";
import axios from "axios";

export default function PaytmPayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiatePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // ✅ Call backend API to initiate Paytm payment
      const response = await axios.post("http://localhost:9000/initiatePayment", {
        customerId: "CUST123",       
        amount: 100.00,              
        orderId: "ORDER12345",       
        industryTypeId: "Retail109",
        channelId: "WEB",           
        service: "Car Insurance"     
      });
      
      console.log("Payment Response:", response.data);

      if (response.data.includes("<html")) {
        // ✅ Open new tab and inject HTML form to submit
        const newWindow = window.open("", "_blank");
        newWindow.document.open();
        newWindow.document.write(response.data);
        newWindow.document.close();
      } else {
        setError("Payment initiation failed.");
      }
    } catch (err) {
      setError("Error initiating payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Paytm Payment Integration</h1>

      <button
        onClick={initiatePayment}
        style={loading ? styles.buttonDisabled : styles.button}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay with Paytm"}
      </button>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
    Width:'60rem',
    padding: "20px",
    marginLeft:'20rem'
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  buttonDisabled: {
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#ccc",
    color: "#666",
    border: "none",
    borderRadius: "5px",
    cursor: "not-allowed",
  },
  error: {
    marginTop: "10px",
    color: "red",
    fontSize: "14px",
  },
};
