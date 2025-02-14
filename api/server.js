const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { handleFormSubmission } = require("./trip/trip_handler.js");
const { pool } = require("./activities/activities_handling.js");
const { handleSignUp } = require("./signup/signup_handler.js");
const { handleLogin } = require("./signup/signup_handler.js");
const { submitActivity } = require("./activities/activities_handling.js");
const {
    fetchActivities,
    deleteActivity,
} = require("./activities/activities_handling.js");
const tripHandler = require("./trip/trip_handler.js");

const app = express();
app.use(express.static("activities"));
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html for "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/submit", handleFormSubmission);
app.post("/login", handleLogin);
app.get("/trips", tripHandler.fetchTrips);

app.post("/signup", handleSignUp);
app.post("/submitActivity", submitActivity);
app.delete("/activities/:id", deleteActivity);

app.get("/activities", async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM activities");

        res.json(result.rows);

        client.release();
    } catch (err) {
        console.error("Error fetching activities:", err);
        res.status(500).json({ error: "Error fetching activities" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
