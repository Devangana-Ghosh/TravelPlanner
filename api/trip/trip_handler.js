const sqlite3 = require("sqlite3").verbose();

// Open SQLite database (creates file if not exists)
const db = new sqlite3.Database("../mydata.db", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
        db.run(
            `
            CREATE TABLE IF NOT EXISTS trip (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                start_date TEXT NOT NULL,
                end_date TEXT NOT NULL,
                description TEXT NOT NULL
            )
        `,
            (err) => {
                if (err)
                    console.error("Error creating trip table:", err.message);
            },
        );
    }
});

// Handle form submission (create a trip)
function handleFormSubmission(req, res) {
    const { user_id, start_date, end_date, description } = req.body;
    console.log("Received form data:", req.body);

    if (!user_id || !start_date || !end_date || !description) {
        return res
            .status(400)
            .send("Bad request: Required form fields are missing.");
    }

    db.run(
        `INSERT INTO trip (user_id, start_date, end_date, description) VALUES (?, ?, ?, ?)`,
        [user_id, start_date, end_date, description],
        function (err) {
            if (err) {
                console.error("Error inserting trip:", err.message);
                return res
                    .status(500)
                    .send("Error inserting trip into database");
            }

            console.log("Trip inserted successfully!");
            res.status(200).send("Trip created successfully!");
        },
    );
}

// Fetch all trips
async function fetchTrips(req, res) {
    db.all(`SELECT * FROM trip`, [], (err, rows) => {
        if (err) {
            console.error("Error fetching trips:", err.message);
            return res.status(500).send("Error fetching trips");
        }
        res.json(rows);
    });
}

module.exports = { handleFormSubmission, fetchTrips };
