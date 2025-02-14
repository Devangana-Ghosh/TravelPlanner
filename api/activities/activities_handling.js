const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Open SQLite database (located in the parent folder)
const dbPath = path.join(__dirname, "../mydata.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");

        // Create activities table if it doesn't exist
        db.run(
            `
            CREATE TABLE IF NOT EXISTS activities (
                activities_id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                address TEXT NOT NULL,
                price REAL NOT NULL,
                date TEXT NOT NULL
            )
        `,
            (err) => {
                if (err)
                    console.error(
                        "Error creating activities table:",
                        err.message,
                    );
            },
        );
    }
});

// Submit an activity (INSERT)
async function submitActivity(req, res) {
    const { name, description, address, price, date } = req.body;

    db.run(
        `INSERT INTO activities (name, description, address, price, date) VALUES (?, ?, ?, ?, ?)`,
        [name, description, address, price, date],
        function (err) {
            if (err) {
                console.error("Error adding activity:", err.message);
                return res
                    .status(500)
                    .json({ error: "Failed to add activity" });
            }

            res.status(201).json({
                message: "Activity added successfully",
                activity: {
                    activities_id: this.lastID,
                    name,
                    description,
                    address,
                    price,
                    date,
                },
            });
        },
    );
}

// Fetch all activities (SELECT)
async function fetchActivities(req, res) {
    db.all(`SELECT * FROM activities`, [], (err, rows) => {
        if (err) {
            console.error("Error fetching activities:", err.message);
            return res.status(500).json({ error: "Error fetching activities" });
        }

        res.json(rows);
    });
}

// Delete an activity (DELETE)
async function deleteActivity(req, res) {
    const id = req.params.id;
    console.log("Deleting activity with ID:", id);

    db.run(
        `DELETE FROM activities WHERE activities_id = ?`,
        [id],
        function (err) {
            if (err) {
                console.error("Error deleting activity:", err.message);
                return res
                    .status(500)
                    .json({ error: "Error deleting activity" });
            }

            if (this.changes > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "Activity not found" });
            }
        },
    );
}

module.exports = {
    submitActivity,
    fetchActivities,
    deleteActivity,
};
