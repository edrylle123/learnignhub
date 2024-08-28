import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./Landing";
// import Admin from "./Signup";
import Password from "./Password";
import Signup from "./Signup";
import Registration from "./Registration";
import Qrc from "./Qrc";
import Admin from "./Admin"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />

          {/* <Route path="/admin" element={<Password />} />
          <Route path="/login" element={<Signup />} /> */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/qrcode" element={<Qrc />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
