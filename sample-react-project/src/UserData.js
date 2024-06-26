// src/UserData.js
import React, { useState } from 'react';
import axios from 'axios';
import './UserData.css';

const UserData = () => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://leet-summarizer-server-zznx.vercel.app/showbyid', { userId });
      setData(response.data);
    } catch (err) {
      setError('Invalid User Id');
    }
    setLoading(false);
  };

  return (
    <div className="user-data-container">
      <h1>Leet Summarizer</h1>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
        className="user-id-input"
      />
      <button onClick={fetchData} disabled={!userId} className="fetch-button">
        Get Summary of Solved Problem
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="data-list">
        {data.map((item, index) => (
          <div key={index} className={`data-item data-item-${index % 3}`}>
            <div className="question-box">
              <strong>Question:</strong> <br /> {item.question}
            </div>
            <div className="code-box">
              <strong>Code:</strong> <br /> <pre>{item.code}</pre>
            </div>
            <div className="summary-box">
              <strong>Summary:</strong> <br /> {item.summary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserData;
