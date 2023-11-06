import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Password() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Get the navigate function

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    // Check if the entered password is correct (you can replace 'yourPassword' with the actual password)
    if (password === "12345") {
      // Password is correct, navigate to the admin page
      navigate("/login");
    } else {
      // Password is incorrect, display an error message or handle it as needed
      alert("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div>
      <form onSubmit={handlePasswordSubmit}>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Password;
