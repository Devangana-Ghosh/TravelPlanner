import db from "@/app/lib/database";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { username, email, password, phone } = await req.json();

        if (!username || !email || !password || !phone) {
            return new Response("All fields are required", { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const stmt = db.prepare(`
            INSERT INTO user_detail (username, email, password, phone_numbers)
            VALUES (?, ?, ?, ?)
        `);
        stmt.run(username, email, hashedPassword, phone);

        return new Response("User signed up successfully!", { status: 200 });
    } catch (error) {
        console.error("Signup Error:", error);
        return new Response("Error signing up", { status: 500 });
    }
}
