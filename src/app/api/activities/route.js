import db from "@/app/lib/database";

export async function GET() {
    try {
        const activities = db.prepare("SELECT * FROM activities").all();
        return Response.json(activities, { status: 200 });
    } catch (error) {
        console.error("Error fetching activities:", error.message);
        return Response.json({ error: "Error fetching activities" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { name, description, address, price, date } = await req.json();
        const stmt = db.prepare(
            "INSERT INTO activities (name, description, address, price, date) VALUES (?, ?, ?, ?, ?)"
        );
        const result = stmt.run(name, description, address, price, date);

        return Response.json(
            {
                message: "Activity added successfully",
                activity: {
                    activities_id: result.lastInsertRowid,
                    name,
                    description,
                    address,
                    price,
                    date,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding activity:", error.message);
        return Response.json({ error: "Failed to add activity" }, { status: 500 });
    }
}
