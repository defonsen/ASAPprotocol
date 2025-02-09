import React, { useState } from "react";

const Chatbot = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    agentId: "",
    attestations: "",
    portfolio: "",
    recipient: "",
  });
  const [status, setStatus] = useState("");

  const questions = [
    "What is the Agent ID?",
    "How many attestations?",
    "What is the portfolio holding?",
    "What is the recipient address?",
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStatus("Submitting...");
      try {
        const response = await fetch("http://localhost:5000/create-attestation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agentId: formData.agentId,
            attestations: parseInt(formData.attestations, 10),
            portfolio: parseInt(formData.portfolio, 10),
            recipient: formData.recipient,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus(`Success! Attestation UID: ${data.attestationUID}`);
        } else {
          setStatus(`Error: ${data.error}`);
        }
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatCard}>
        <h1 style={styles.header}>AI Chatbot</h1>
        <div style={styles.question}>
          {step < questions.length ? questions[step] : "All done! Submitting your data..."}
        </div>
        {step < questions.length && (
          <input
            type={step === 1 || step === 2 ? "number" : "text"}
            name={Object.keys(formData)[step]}
            value={formData[Object.keys(formData)[step]]}
            onChange={handleInputChange}
            placeholder={questions[step]}
            style={styles.input}
          />
        )}
        <button onClick={handleNext} style={styles.button}>
          {step < questions.length - 1 ? "Next" : "Submit"}
        </button>
        {status && <div style={styles.status}>{status}</div>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
  },
  chatCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center",
  },
  header: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  question: {
    marginBottom: "10px",
    fontSize: "1rem",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  status: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#333",
  },
};

{/* Connect Wallet Button */}
<div className="p-4 border-t">
<button className="w-full py-2 text-center text-gray-600 hover:text-gray-900">
  Connect wallet to vote
</button>
</div>

export default Chatbot;
