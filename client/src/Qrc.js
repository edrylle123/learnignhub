// import QRCode from "qrcode.react";
// import React, { useState } from "react";

// function Qrc({ qrCodeData }) {
//   const [qrCodeData, setQRCodeData] = useState("");
//   const [showQRCode, setShowQRCode] = useState(false);
//   const [name, setName] = useState("");
//   const [id2, setId2] = useState("");
//   const [course, setCourse] = useState("");

//   const data = `Name: ${name}\nCourse: ${course}\nID Number: ${id2}`;
//   setQRCodeData(data);
//   setShowQRCode(true);
//   return (
//     <div className="qr">
//       {showQRCode && (
//         <div>
//           <QRCode value={qrCodeData} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Qrc;

import React from "react";
import QRCode from "qrcode.react";

function QRC({ qrCodeData }) {
  return (
    <div>
      <h2>Your QR Code</h2>
      <QRCode value={qrCodeData} />
    </div>
  );
}

export default QRC;
