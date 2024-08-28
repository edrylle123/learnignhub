import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const [idNumber, setIdNumber] = useState("");
  const [pcNumber, setPcNumber] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const currentDate = new Date().toISOString().split("T")[0];
  const [idNumberList, setIdNumberList] = useState([]);
  const [usedPCs, setUsedPCs] = useState([]);
  const [error, setError] = useState(null);

  const formattedCurrentDate = new Date(currentDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleLogout = (pcNumber) => {
    Axios.put("http://localhost:3001/api/logoutPC", { pcNumber })
      .then(() => {
        // Refresh the list of available PCs
        refreshUsedPCs();
      })
      .catch((error) => {
        console.error("Error logging out PC:", error);
        setError("Error logging out PC");
      });
  };
  const refreshUsedPCs = () => {
    Axios.get("http://localhost:3001/api/getUsedPCs")
      .then((response) => {
        setUsedPCs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching used PCs:", error);
      });
  };
  useEffect(() => {
    // Fetch used PCs from server
    Axios.get("http://localhost:3001/api/getAvailablePCs")
      .then((response) => {
        setUsedPCs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching available PCs:", error);
      });
  }, []); // Empty dependency array ensures it runs only on mount
  


  
  // useEffect(() => {
  //   // Fetch used PCs from server
  //   const fetchData = async () => {
  //     try {
  //       const response = await Axios.get("http://localhost:3001/api/get");
  //       setIdNumberList(response.data);

  //       // Extract used PCs from response
  //       const pcs = response.data.map(item => item.pcNumber).filter(pc => pc.startsWith('pc'));
  //       setUsedPCs([...new Set(pcs)]); // Remove duplicates
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setError("Error fetching data");
  //     }
  //   };

  //   fetchData();

  //   const intervalId = setInterval(() => {
  //     setCurrentTime(new Date().toLocaleTimeString());
  //   }, 1000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // const submitReview = async () => {
  //   if (idNumber.trim() === "" || !pcNumber) {
  //     alert("Please fill in all required fields.");
  //     return;
  //   }

  //   try {
  //     await Axios.post("http://localhost:3001/api/insert", {
  //       idNumber,
  //       pcNumber,
  //       currentDate,
  //       currentTime,
  //     });
  //     console.log("Post request successful");
  //     // Refresh used PCs after successful submission
  //     setUsedPCs(prevUsedPCs => [...prevUsedPCs, pcNumber]);
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error submitting review:", error);
  //     setError("Error submitting review");
  //   }

  //   setIdNumber("");
  //   setPcNumber("");
  // };

  const submitReview = () => {
    if (idNumber.trim() === "" || !pcNumber) {
      alert("Please fill in all required fields.");
      return;
    }
  
    Axios.post("http://localhost:3001/api/insert", {
      idNumber: idNumber,
      pcNumber: pcNumber,
      currentDate: currentDate,
      currentTime: currentTime,
    })
      .then(() => {
        console.log("Post request successful");
        // Refresh the list of used PCs after successful submission
        refreshUsedPCs();
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  
    setIdNumber("");
    setPcNumber("");
  };
  

  const isButtonDisabled = !pcNumber;

  return (
    <div className="App">
      <div className="date">
        {currentTime} | {formattedCurrentDate}
      </div>

      <div className="column">
        <div className="input-with-asterisk">
          <select
            name="pcNumber"
            className="input"
            value={pcNumber}
            onChange={(e) => setPcNumber(e.target.value)}
          >
            <option value="">Select Device</option>
            <option value="others">Others (Cp, etc........)</option>
            <option value="personal">Personal Device</option>
            {Array.from({ length: 23 }, (_, i) => `pc${i + 1}`).map(pc => (
              <option
                key={pc}
                value={pc}
                disabled={usedPCs.includes(pc)}
              >
                {pc.toUpperCase()}
              </option>
            ))}
          </select>
          <span className="red-asterisk">*</span>
        </div>
        <div className="input-with-asterisk">
          <input
            onChange={(e) => setIdNumber(e.target.value)}
            value={idNumber}
            type="text"
            placeholder="ID Number"
            name="text"
            className="input"
            required
          />
          <span className="red-asterisk">*</span>
        </div>

        <div className="invisible-div">
          <input
            type="date"
            id="dateInput"
            name="dateInput"
            className="transparent-link"
            defaultValue={currentDate}
            readOnly
          />
          <span className="red-asterisk">*</span>
        </div>
        <div className="transparent-link">
          <div className="transparent-link">{currentTime}</div>
        </div>
      </div>

      <button
        onClick={submitReview}
        disabled={isButtonDisabled}
        className={isButtonDisabled ? "button-disabled" : "button-enabled"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            fill="currentColor"
            d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
          ></path>
        </svg>
        <span>Submit</span>
      </button>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Landing;
