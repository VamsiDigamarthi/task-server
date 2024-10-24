import { connection } from "../Database/datbase.js";

export const onAddData = async (req, res) => {
  const data = req.body;

  if (!Array.isArray(data) || data.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid input. Expected an array of users." });
  }

  const values = data.map((eachData) => [
    eachData.gender,
    eachData.age,
    eachData.workingProfessional,
    eachData.annualIncome,
    eachData.modeOfInvestment,
    eachData.investmentPerMonth,
    eachData.motivationCause,
    eachData.resourcesUsed,
    eachData.goalForInvestment,
    eachData.durationToSaveInYears,
  ]);

  const query =
    "INSERT INTO data (gender, age, workingProfessional, annualIncome, modeOfInvestment,investmentPerMonth,motivationCause,resourcesUsed,goalForInvestment,durationToSaveInYears) VALUES ?";
  try {
    connection.query(query, [values], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({
        message: "Users added successfully",
        insertedRows: result.affectedRows,
      });
    });
  } catch (error) {
    console.log({ error: error.message, message: "add data error" });
    res.status(500).json({ message: "An error occurred while adding data." });
  }
};

export const onFetchData = async (req, res) => {
  try {
    const query = "SELECT * FROM data";

    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.log({ error: error.message, message: "data fetch error" });
    res.status(500).json({ message: "An error occurred while fetching data." });
  }
};
