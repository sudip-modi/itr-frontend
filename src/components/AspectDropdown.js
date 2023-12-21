// components/AspectDropdown.js
import React, { useState } from 'react';

const AspectDropdown = () => {
  const [selectedAspect, setSelectedAspect] = useState('');

  const handleAspectChange = (event) => {
    setSelectedAspect(event.target.value);
  };

  const handleAspectSubmit = async () => {
    try {
      const response = await fetch('http://your-backend-api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedAspect }),
      });

      if (response.ok) {
        console.log('Data sent successfully!');
      } else {
        console.error('Failed to send data.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <form style={{ marginBottom: '20px' }} onSubmit={(e) => e.preventDefault()}>
      <div>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Select Aspect:</label>
        <select
          value={selectedAspect}
          onChange={handleAspectChange}
          style={{ width: '100%', padding: '12px', marginBottom: '15px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
        >
          <option value="">Select an Aspect</option>
          <option value="Content">Content</option>
          <option value="Instructor">Instructor</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button onClick={handleAspectSubmit} style={{ background: '#007bff', color: 'white', padding: '15px', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background 0.3s ease-in-out' }}>
        Submit
      </button>
    </form>
  );
};

export default AspectDropdown;
