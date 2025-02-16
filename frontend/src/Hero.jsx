import React, { useEffect, useState } from "react";
import axios from "axios";

const Hero = () => {
  const [datas, setData] = useState([]); // Store as an array

  let getData = async () => {
    try {
      let response = await axios.get("https://javascript-recap.vercel.app/api/get");
      const data = response.data.users; // Assuming 'users' is an array
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <h1>Rest API</h1>
      <div className="inputs">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input type="number" id="age" name="age" />
        </div>
        <div>
          <label htmlFor="college">College</label>
          <input type="text" id="college" name="college" />
        </div>
        <button>Proceed</button>
      </div>

      {/* Display API data */}
      <div className="contents">
        <h2>Fetched Users</h2>
        {datas.length > 0 ? (
          datas.map((user, index) => (
            <div key={index} className="user-card">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>College:</strong> {user.college}</p>
            </div>
          ))
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default Hero;
