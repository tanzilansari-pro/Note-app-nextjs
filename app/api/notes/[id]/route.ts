import { connectDB } from "@/lib/mongodb"
import { NextResponse } from "next/server"
import Note from "@/models/Note"

export async function GET(req: Request) {
    try {
        await connectDB()

        const url = new URL(req.url)
        const id = url.pathname.split('/').pop() 

        if (!id) {
            return NextResponse.json({ success: false, error: "Missing project ID" }, { status: 400 })
        }

        const SingleNote = await Note.findById(id) 

        if (!SingleNote) {
            return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true, SingleNote })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        await connectDB()

        const url = new URL(req.url)
        const id = url.pathname.split('/').pop()

        if (!id) {
            return NextResponse.json({ success: false, error: "Missing project ID" }, { status: 400 })
        }

        await Note.findByIdAndDelete(id)

        return NextResponse.json({ success: true, message: "Project deleted" })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
    }
}
