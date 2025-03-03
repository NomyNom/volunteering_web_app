// frontend/src/components/Admin/VolunteerMatching.jsx
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './VolunteerMatching.css';

const VolunteerMatching = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Assumes token is stored after login
//         const response = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/volunteers/matching`,
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`,
//             },
//           }
//         );
//         const data = await response.json();
//         if (response.ok) {
//           setMatches(data.matches);
//         } else {
//           setError(data.msg || 'Failed to fetch matching data');
//         }
//       } catch (err) {
//         console.error('Error fetching matching data:', err);
//         setError('An error occurred while fetching matching data');
//       }
//     };

//     fetchMatches();
//   }, []);


    useEffect(() => {
        // Instead of fetching from the backend, use dummy data
        const dummyMatches = [
            { volunteerName: 'Alice Johnson', matchedEvent: 'Community Clean-Up' },
            { volunteerName: 'Bob Smith', matchedEvent: 'Food Drive' },
            { volunteerName: 'Carol Davis', matchedEvent: 'Charity Marathon' },
        ];
        setMatches(dummyMatches);
    }, []);

    return (
      <div className="volunteer-matching-page">
        <div className="volunteer-matching-container">
          <div className="back-button-container">
            <Link to="/" className="back-button">Back to Home</Link>
          </div>
          <h2>Volunteer Matching</h2>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          {matches.length === 0 ? (
            <p>No matching data available.</p>
          ) : (
            <table className="volunteer-matching-table">
              <thead>
                <tr>
                  <th>Volunteer Name</th>
                  <th>Matched Event</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match, index) => (
                  <tr key={index}>
                    <td>{match.volunteerName}</td>
                    <td>{match.matchedEvent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };
    
    
  export default VolunteerMatching;