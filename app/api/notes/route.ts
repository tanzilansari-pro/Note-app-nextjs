import { connectDB } from "@/lib/mongodb"
import Note from "@/models/Note"

export async function GET(req: Request): Promise<Response> {
    try {
        await connectDB()

        const notes = await Note.find()

        return new Response(JSON.stringify(notes))
    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        })
    }
}
