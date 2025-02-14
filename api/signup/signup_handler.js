const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");

// Connect to SQLite database
const db = new sqlite3.Database("../mydata.db", (err) => {
    if (err) {
        console.error("Error connecting to SQLite:", err.message);
    } else {
        console.log("Connected to SQLite database.");
        db.run(`CREATE TABLE IF NOT EXISTS user_detail (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            phone_numbers TEXT NOT NULL
        )`);
    }
});

function handleSignUp(req, res) {
    const { name, email, password } = req.body;
    const phone = req.body.phone.toString().replace(/\D/g, "");
    console.log("Received sign-up data:", req.body);

    if (!name || !email || !password || !phone) {
        return res
            .status(400)
            .send("Bad request: Required form fields are missing.");
    }

    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
            console.error("Error hashing password:", hashErr);
            return res.status(500).send("Error hashing password");
        }

        const query = `INSERT INTO user_detail (username, email, password, phone_numbers) VALUES (?, ?, ?, ?)`;
        db.run(
            query,
            [name, email, hashedPassword, phone],
            function (queryErr) {
                if (queryErr) {
                    console.error(
                        "Error inserting user into database:",
                        queryErr.message,
                    );
                    return res
                        .status(500)
                        .send("Error inserting user into database");
                }

                console.log("User inserted successfully!");
                res.status(200).send("User signed up successfully!");
            },
        );
    });
}

async function handleLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .send("Bad request: Email and password are required.");
    }

    try {
        const query = "SELECT * FROM user_detail WHERE email = ?";
        db.get(query, [email], async (err, user) => {
            if (err) {
                console.error("Error fetching user:", err.message);
                return res.status(500).send("Error fetching user");
            }

            if (!user) {
                return res
                    .status(404)
                    .send("User not found. Please check your credentials.");
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res
                    .status(401)
                    .send("Invalid password. Please try again.");
            }

            res.status(200).send("Login successful!");
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Error during login");
    }
}

module.exports = { handleSignUp, handleLogin };
