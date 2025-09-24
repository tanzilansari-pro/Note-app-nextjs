import { connectDB } from "@/lib/mongodb"
import { NextResponse } from "next/server"
import Note from "@/models/Note"

export async function PUT(req: Request): Promise<Response> {
  try {
    await connectDB()

    const body = await req.json()
    const { title, description } = body

    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() 

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing note ID" }, { status: 400 })
    }

    const note = await Note.findByIdAndUpdate(
      id, 
      { title, description },
      { new: true }
    )

    if (!note) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Project updated", note })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}
