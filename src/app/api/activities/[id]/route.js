import db from "@/app/lib/database";

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        const stmt = db.prepare("DELETE FROM activities WHERE activities_id = ?");
        const result = stmt.run(id);

        if (result.changes > 0) {
            return new Response(null, { status: 204 }); // No Content
        } else {
            return Response.json({ error: "Activity not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error deleting activity:", error.message);
        return Response.json({ error: "Error deleting activity" }, { status: 500 });
    }
}
