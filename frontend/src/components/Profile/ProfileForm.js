import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

function ProfileForm() {
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [skills, setSkills] = useState([]);
  const [preferences, setPreferences] = useState("");
  const [availability, setAvailability] = useState([]);

  const stateOptions = [ "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY" ];
  const skillOptions = ["Test1","Test2","Test3","Test4","Test5"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit triggered");

    if (zip.length < 5) {
      alert("Zip code must be at least 5 characters.");
      return;
    }

    const payload = {
      user: JSON.parse(localStorage.getItem("user"))?._id,
      fullName,
      address1,
      address2,
      city,
      state,
      zipCode: zip,
      skills,
      preferences,
      availability,
    };

    try {
      const response = await axios.post("http://localhost:4000/api/profile", payload);
      console.log("Axios response:", response);
      alert(response.data.msg);
    } catch (err) {
      console.error("Axios error:", err.response || err);
      alert(err.response?.data?.msg || "Server error");
    }
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <Link to="/" className="home-button">Home</Link>
      </header>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" maxLength={50} required value={fullName} onChange={e => setFullName(e.target.value)} />

        <label>Address 1</label>
        <input type="text" maxLength={100} required value={address1} onChange={e => setAddress1(e.target.value)} />

        <label>Address 2</label>
        <input type="text" maxLength={100} value={address2} onChange={e => setAddress2(e.target.value)} />

        <label>City</label>
        <input type="text" maxLength={100} required value={city} onChange={e => setCity(e.target.value)} />

        <label>State</label>
        <select required value={state} onChange={e => setState(e.target.value)}>
          <option value="">Select State</option>
          {stateOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <label>Zip Code</label>
        <input type="text" maxLength={9} required value={zip} onChange={e => setZip(e.target.value)} />

        <label>Skills</label>
        <select multiple required value={skills} onChange={e => setSkills(Array.from(e.target.selectedOptions, o => o.value))}>
          {skillOptions.map(skill => <option key={skill} value={skill}>{skill}</option>)}
        </select>

        <label>Preferences</label>
        <textarea value={preferences} onChange={e => setPreferences(e.target.value)} />

        <label>Availability</label>
        <input type="date" onChange={e => setAvailability([...availability, e.target.value])} />
        {availability.length > 0 && <p>Selected Dates: {availability.join(", ")}</p>}

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default ProfileForm;
