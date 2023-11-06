import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };

  const [idNumber, setIdNumber] = useState("");
  // const [studentName, setStudentName] = useState("");
  const [pcNumber, setPcNumber] = useState("");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const currentDate = new Date().toISOString().split("T")[0];
  // const [purpose, setPurpose] = useState("");
  // const [timeIn, setTimeIn] = useState(0);
  // const [timeOut, setTimeOut] = useState(0);
  const [idNUmberList, setIdNumberList] = useState([]);
  // const [newId, setNewId] = useState("");
  const formattedCurrentDate = new Date(currentDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setIdNumberList(response.data);
    });

    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      // Clear the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, []);

  // const sanitizeInput = (input) => {
  //   // Define a regular expression to allow only letters, numbers, and spaces
  //   const regex = /^[a-zA-Z0-9\s]*$/;
  //   return input.replace(regex, "");
  // };

  // const handleChange = (e) => {
  //   const value = e.target.value;

  //   // Sanitize the input to remove special characters
  //   const sanitizedValue = sanitizeInput(value);

  //   // Update the state with the sanitized value
  //   setIdNumber(sanitizedValue);
  // };
  // const sanitizeInput = (input) => {
  //   // Define a regular expression to allow letters, numbers, and spaces
  //   const regex = /^[a-zA-Z0-9\s]*$/;
  //   return input.replace(regex, "");
  // };

  // const handleChange = (e) => {
  //   const value = e.target.value;

  //   // Sanitize the input to remove special characters
  //   const sanitizedValue = sanitizeInput(value);

  //   // Update the state with the sanitized value
  //   setIdNumber(sanitizedValue);
  // };

  const submitReview = () => {
    // Check if the required fields have values
    if (idNumber.trim() === "") {
      alert("Please fill in all required fields.");
      return; // Do not proceed with the submission
    }

    Axios.post("http://localhost:3001/api/insert", {
      idNumber: idNumber,
      pcNumber: pcNumber,
      currentDate: currentDate,
      currentTime: currentTime,
      // purpose: purpose,
    })
      .then(() => {
        console.log("Post request successful");
        navigate("/");
      })
      .catch((error) => {
        // Handle errors, if any
        console.error("Error:", error);
      });

    setIdNumber("");
    setPcNumber("");
    // setPurpose("");

    // setIdNumberList([
    //   ...idNUmberList,
    //   { idNumber: idNumber, pcNumber: pcNumber },
    // ]);
  };

  // const deleteId = (number) => {
  //   Axios.delete(`http://localhost:3001/api/delete/${number}`);
  // };

  // const updateId = (number) => {
  //   Axios.put("http://localhost:3001/api/update", {
  //     idNumber: number,
  //     pcNumber: newId,
  //   });
  //   setNewId("");
  // };
  return (
    <div>
      <div className="App">
        {/* <Link to="/Admin" className="transparent-link">
          ADMIN
        </Link> */}
        <div className="date">
          {currentTime}|{formattedCurrentDate}
        </div>

        <div className="column">
          <div className="input-with-asterisk">
            <select
              name="pcNumber"
              className="input"
              value={pcNumber}
              onChange={(e) => {
                setPcNumber(e.target.value);
              }}
            >
              <option value="">Select Device</option>
              <option value="others">Others (Cp, etc........)</option>
              <option value="pc1">PC 1</option>
              <option value="pc2">PC 2</option>
              <option value="pc3">PC 3</option>
              <option value="pc4">PC 4</option>
              <option value="pc5">PC 5</option>
              <option value="pc6">PC 6</option>
              <option value="pc7">PC 7</option>
              <option value="pc8">PC 8</option>
              <option value="pc9">PC 9</option>
              <option value="pc10">PC 10</option>
              <option value="pc11">PC 11</option>
              <option value="pc12">PC 12</option>
              <option value="pc13">PC 13</option>
              <option value="pc14">PC 14</option>
              <option value="pc15">PC 15</option>
              <option value="pc16">PC 16</option>
              <option value="pc17">PC 17</option>
              <option value="pc18">PC 18</option>
              <option value="pc19">PC 19</option>
              <option value="pc20">PC 20</option>
              <option value="pc21">PC 21</option>
              <option value="pc22">PC 22</option>
              <option value="pc23">PC 23</option>
            </select>
            <span className="red-asterisk">*</span>
          </div>
          <div className="input-with-asterisk">
            <input
              onChange={(e) => {
                setIdNumber(e.target.value);
              }}
              // onChange={handleChange}
              value={idNumber}
              type="text"
              placeholder="ID Number"
              name="text"
              className="input"
              required
            />
            <span className="red-asterisk">*</span>
          </div>

          {/* <div className="input-with-asterisk">
            <input
              onChange={(e) => {
                setPurpose(e.target.value);
              }}
              // onChange={handleChange}

              value={purpose}
              type="text"
              placeholder="Purpose "
              name="text"
              className="input"
              required
            />
            <span className="red-asterisk">*</span>
          </div> */}
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

        <button onClick={submitReview}>
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
        <button onClick={handleGoBack}>GO BACK</button>

        {/* {idNUmberList.map((val) => {
        return (
          <div className="card">
            <h1>{val.idNumber}</h1>
            <p>{val.pcNumber}</p>

            <button
              onClick={() => {
                deleteId(val.idNumber);
              }}
              id="updateInput"
            >
              Delete
            </button>
            <input
              type="text"
              id="updateInput"
              onChange={() => {
                deleteId(val.idNumber);
              }}
            />
            <button
              onClick={(e) => {
                updateId(e.target.value);
              }}
              id="updateInput"
            >
              Update
            </button>
          </div>
        );
      })} */}
      </div>
    </div>
  );
}

export default Landing;
