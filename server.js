import express from "express";
import cors from "cors";
import fs from "fs";
import Papa from "papaparse";

const app = express();
app.use(cors());

app.get("/api/scholarships", (req, res) => {
  const filePath = "./public/scholarships.csv";
  const csvData = fs.readFileSync(filePath, "utf-8");

  Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      res.json(results.data);
    },
  });
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
