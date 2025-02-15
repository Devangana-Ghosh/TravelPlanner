const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { handleFormSubmission } = require("./trip/trip_handler.js");
const { pool } = require("./activities/activities_handling.js");
const { handleSignUp, handleLogin } = require("./signup/signup_handler.js");
const { submitActivity, fetchActivities, deleteActivity } = require("./activities/activities_handling.js");
const tripHandler = require("./trip/trip_handler.js");

const app = express();
const port = 3000;

// ✅ Improved CORS Configuration
const corsOptions = {
    origin: ["http://localhost:5500", "http://your-frontend-domain.com"], // Update with your frontend URL
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html for "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Routes
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

// ✅ Handle Preflight Requests
app.options("*", cors(corsOptions));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
