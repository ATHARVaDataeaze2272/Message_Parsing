import React, { useState } from "react";
import axios from "axios";
import "./MessageAnalyzer.css";

const MessageAnalyzer = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeMessage = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await axios.post("http://localhost:8000/analyze", { message });
      setResult(res.data);
    } catch (err) {
      setError("Failed to analyze message. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="analyzer-container">
      <h1 className="title">Message Analyzer Utility</h1>

      <div className="card">
        <label htmlFor="message">Paste your message below</label>
        <textarea
          id="message"
          rows={6}
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-box"
        />
        <button onClick={analyzeMessage} disabled={loading || !message}>
          {loading ? "Analyzing..." : "Analyze Message"}
        </button>
        {error && <p className="error-text">{error}</p>}
      </div>

      {result && (
        <div className="result-container">
          <div className="card">
            <h2>Message Type</h2>
            <div className="badge">{result.message_type}</div>
          </div>

          <div className="card">
            <h2>Important Points</h2>
            <ul className="point-list">
              {result.important_points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageAnalyzer;