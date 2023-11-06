// import "./registration.css";
// import React, { useState } from "react";
// import QRCode from "qrcode.react";
// import Axios from "axios";
// import { useNavigate } from "react-router-dom";
// const qrCodeImage = null;

// function Registration() {
//   const [showQRCode, setShowQRCode] = useState(false);
//   // const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [id2, setId2] = useState("");
//   const [course, setCourse] = useState("");

//   const submit = () => {
//     setShowQRCode(true);

//     const qrCodeData = `Name: ${name}\nCourse: ${course}\nID Number: ${id2}`;
//     const qrCodeImage = QRCode.toDataURL(qrCodeData);

//     Axios.post("http://localhost:3001/api/insertreg", {
//       name: name,
//       id2: id2,
//       course: course,
//     })
//       .then(() => {
//         console.log("Form submitted successfully");
//       })
//       .catch((error) => {
//         console.error("Error submitting the form:", error);
//       });
//     setName("");
//     setId2("");
//     setCourse("");
//   };
//   return (
//     <div className="reg">
//       {showQRCode ? (
//         <div className="qr-code">
//           <img src={qrCodeImage} alt="QR Code" />
//         </div>
//       ) : null}
//       <form className="form">
//         <p className="title">Register</p>
//         <p className="message">Signup now and get your personal QR Code.</p>
//         <div className="flex">
//           <label>
//             <input
//               className="input"
//               type="text"
//               placeholder=""
//               value={name}
//               onChange={(e) => {
//                 setName(e.target.value);
//               }}
//               required
//             />
//             <span>Name:</span>
//           </label>
//           {/* <label>
//             <input className="input" type="text" placeholder="" required />
//             <span>Lastname</span>
//           </label> */}
//         </div>
//         <label>
//           <input
//             className="input"
//             type="text"
//             placeholder=""
//             value={course}
//             onChange={(e) => {
//               setCourse(e.target.value);
//             }}
//             required
//           />
//           <span>Course:</span>
//         </label>
//         <label>
//           <input
//             className="input"
//             type="number"
//             placeholder=""
//             value={id2}
//             onChange={(e) => {
//               setId2(e.target.value);
//             }}
//             required
//           />
//           <span>ID Number:</span>
//         </label>

//         <button className="submit" onClick={submit}>
//           Submit
//         </button>
//         <p className="signin">
//           Already have an account ? <a href="#">Sign in</a>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Registration;
import "./registration.css";
import React, { useState } from "react";
import QRCode from "qrcode.react"; // Make sure this import is correct
import Axios from "axios";
// import { useNavigate } from "react-router-dom";

function Registration() {
  const [showQRCode, setShowQRCode] = useState(false);
  const [name, setName] = useState("");
  const [id2, setId2] = useState("");
  const [course, setCourse] = useState("");
  const [qrCodeData, setQRCodeData] = useState("");

  // const navigate = useNavigate();

  const submit = () => {
    const data = `Name: ${name}\nCourse: ${course}\nID Number: ${id2}`;
    setQRCodeData(data);
    // setShowQRCode(true);
    if (id2.trim() === "" || course.trim() === "" || name.trim() === "") {
      alert("Please fill in all required fields.");
      return; // Do not proceed with the submission
    }

    Axios.post("http://localhost:3001/api/insertreg", {
      name: name,
      id2: id2,
      course: course,
    })
      .then(() => {
        console.log("Form submitted successfully");
        setShowQRCode(true);
        // navigate("/qrcode");
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
        setShowQRCode(false);
      });

    setName("");
    setId2("");
    setCourse("");
  };

  //   const lastRegistrationDate = database.get_last_registration_date(idNumber);
  // if (lastRegistrationDate === today) {
  //   // Prevent the user from registering again.
  //   return "You have already registered today.";
  // }

  return (
    <div className="reg">
      <form className="form">
        <p className="title">Register</p>
        <p className="message">Signup now and get your personal QR Code.</p>
        <div className="flex">
          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <span>Name:</span>
          </label>
        </div>
        <label>
          <input
            className="input"
            type="text"
            placeholder=""
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
            }}
            required
          />
          <span>Course:</span>
        </label>
        <label>
          <input
            className="input"
            type="number"
            placeholder=""
            value={id2}
            onChange={(e) => {
              setId2(e.target.value);
            }}
            required
          />
          <span>ID Number:</span>
        </label>

        <button className="submit" onClick={submit}>
          Submit
        </button>
        {/* <p className="signin">
          Already have an account ? <a href="#">Sign in</a>
        </p> */}
      </form>

      {/* <div className="qr-wrap">
        <img src={qrCodeData} alt="QR Code" />
      </div> */}
      <div className="qr">
        {showQRCode && (
          <div>
            <QRCode value={qrCodeData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Registration;
