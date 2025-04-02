import db from "@/app/lib/database";

export async function GET() {
    try {
        const trips = db.prepare("SELECT * FROM trip").all();
        return Response.json(trips);
    } catch (error) {
        console.error("Error fetching trips:", error);
        return Response.json({ error: "Error fetching trips" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { user_id, start_date, end_date, description } = await req.json();

        if (!user_id || !start_date || !end_date || !description) {
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const stmt = db.prepare(
            "INSERT INTO trip (user_id, start_date, end_date, description) VALUES (?, ?, ?, ?)"
        );
        stmt.run(user_id, start_date, end_date, description);

        return Response.json({ message: "Trip created successfully" });
    } catch (error) {
        console.error("Error inserting trip:", error);
        return Response.json({ error: "Error inserting trip" }, { status: 500 });
    }
}
