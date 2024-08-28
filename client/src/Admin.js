import React, { useEffect, useState } from "react";
import Axios from "axios";

function Admin() {
  const [usedPCs, setUsedPCs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of used PCs when the component mounts
    fetchUsedPCs();
  }, []);

  const fetchUsedPCs = () => {
    setLoading(true); // Start loading
    Axios.get("http://localhost:3001/api/getAvailablePCs")
      .then((response) => {
        setUsedPCs(response.data);
        setLoading(false); // End loading
      })
      .catch((error) => {
        console.error("Error fetching available PCs:", error);
        setError("Error fetching available PCs");
        setLoading(false); // End loading
      });
  };

  const handleLogout = (pcNumber) => {
    Axios.put("http://localhost:3001/api/logoutPC", { pcNumber })
      .then(() => {
        // Refresh the list of available PCs
        fetchUsedPCs();
      })
      .catch((error) => {
        console.error("Error logging out PC:", error);
        setError("Error logging out PC");
      });
  };
  

  return (
    <div>
      <h1>Currently Used PCs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p>{error}</p>}
          <ul>
            {usedPCs.length > 0 ? (
              usedPCs.map((pc, index) => (
                <li key={index}>
                  {pc}
                  <button onClick={() => handleLogout(pc)}>Logout</button>
                </li>
              ))
            ) : (
              <li>No PCs currently in use</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default Admin;
