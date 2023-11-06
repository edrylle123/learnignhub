const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "elcdb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM elc_system";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const { idNumber, pcNumber, currentDate, currentTime, purpose } = req.body;

  const sqlInsert =
    "INSERT INTO elc_system (idNumber, pcNumber, currentDate, currentTime, purpose) VALUES (?,?,?,?,?)";
  db.query(
    sqlInsert,
    [idNumber, pcNumber, currentDate, currentTime, purpose],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }
      res.status(200).json({ message: "Registration successful" });
    }
  );
});

app.post("/api/insertreg", (req, res) => {
  const { name, course, id2 } = req.body;
  const currentDate = new Date().toISOString().split("T")[0];

  const checkRegistrationQuery =
    "SELECT * FROM qr WHERE id2 = ? AND registration_date = ?";
  db.query(
    checkRegistrationQuery,
    [id2, currentDate],
    (checkErr, checkResults) => {
      if (checkErr) {
        console.error(checkErr);
        return res.status(500).json({ error: "Server error" });
      }

      if (checkResults.length > 0) {
        return res
          .status(400)
          .json({ error: "You have already registered today" });
      }

      if (!name || !course || !id2) {
        return res
          .status(400)
          .json({ error: "Please fill in all required fields." });
      } else {
        const insertQuery =
          "INSERT INTO qr (name, course, id2, registration_date) VALUES (?,?,?,?)";
        db.query(
          insertQuery,
          [name, course, id2, currentDate],
          (insertErr, insertResults) => {
            if (insertErr) {
              console.error(insertErr);
              return res.status(500).json({ error: "Server error" });
            }
            console.log("Registration inserted successfully");
            res.status(200).json({ message: "Registration successful" });
          }
        );
      }
    }
  );
});

app.delete("/api/delete/:idNumber", (req, res) => {
  const idNumber = req.params.idNumber;
  const sqlDelete = "DELETE FROM elc_system WHERE idNumber = ?";

  db.query(sqlDelete, idNumber, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
    res.status(200).json({ message: "Record deleted successfully" });
  });
});

app.put("/api/update", (req, res) => {
  const { idNumber, pcNumber } = req.body;

  const sqlUpdate = "UPDATE elc_system SET pcNumber = ? WHERE idNumber = ?";

  db.query(sqlUpdate, [pcNumber, idNumber], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
    res.status(200).json({ message: "Record updated successfully" });
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
