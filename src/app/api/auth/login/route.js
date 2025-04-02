import db from "@/app/lib/database";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response("Email and password are required", { status: 400 });
        }

        // Fetch user by email
        const stmt = db.prepare("SELECT * FROM user_detail WHERE email = ?");
        const user = stmt.get(email);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return new Response("Invalid password", { status: 401 });
        }

        return new Response("Login successful!", { status: 200 });
    } catch (error) {
        console.error("Login Error:", error);
        return new Response("Error logging in", { status: 500 });
    }
}
