import { useState } from "react";
import { Link } from 'react-router-dom';
import "./Profile.css";

function Profile() {
    const [fullName, setFullName] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [skills, setSkills] = useState([]);
    const [preferences, setPreferences] = useState("");
    const [availability, setAvailability] = useState([]);

    const stateOptions = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];

    const skillOptions = ["Test1", "Test2", "Test3", "Test4", "Test5"];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (zip.length < 5) {
            alert("Zip code must be at least 5 characters.");
            return;
        }
        console.log("Profile submitted:", { fullName, address1, city, state, zip, skills, preferences, availability });
    };

    return (
        <div className="profile-container">

        {/* Header with Home button */}
            <header className="profile-header">
                <Link to="/" className="home-button">Home</Link>
            </header>


            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>

                <label>Full Name (Required, 50 characters max)</label>
                <input
                    type="text"
                    maxLength={50}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />

                <label>Address 1 (Required, 100 characters max)</label>
                <input
                    type="text"
                    maxLength={100}
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    required
                />

                <label>Address 2 (Optional, 100 characters max)</label>
                <input
                    type="text"
                    maxLength={100}
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                />

                <label>City (Required, 100 characters max)</label>
                <input
                    type="text"
                    maxLength={100}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />

                <label>State (Required)</label>
                <select value={state} onChange={(e) => setState(e.target.value)} required>
                    <option value="">Select State</option>
                    {stateOptions.map((st) => (
                        <option key={st} value={st}>{st}</option>
                    ))}
                </select>

                <label>Zip Code (Required, at least 5 characters, max 9)</label>
                <input
                    type="text"
                    maxLength={9}
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required
                />

                <label>Skills (Required, Multi-select)</label>
                <select
                    multiple
                    value={skills}
                    onChange={(e) =>
                        setSkills(Array.from(e.target.selectedOptions, (option) => option.value))
                    }
                    required
                >
                    {skillOptions.map((skill) => (
                        <option key={skill} value={skill}>{skill}</option>
                    ))}
                </select>

                <label>Preferences (Optional)</label>
                <textarea
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                />

                <label>Availability (Select Multiple Dates)</label>
                <input
                    type="date"
                    onChange={(e) =>
                        setAvailability([...availability, e.target.value])
                    }
                />
                <div>
                    {availability.length > 0 && (
                        <p>Selected Dates: {availability.join(", ")}</p>
                    )}
                </div>

                <button type="submit">Save Profile</button>
            </form>
        </div>
    );
}

export default Profile;
