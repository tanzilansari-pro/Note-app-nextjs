import { connectDB } from "@/lib/mongodb"
import Note from "@/models/Note";
import { NextResponse } from "next/server"

interface Project {
  title: string
  description: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    await connectDB()

    const body = await req.json()
    const { title, description } = body as Project

    if (!title || !description) {
      return new Response(JSON.stringify({ error: "Missing title or description" }), {
        status: 400,
      })
    }

    const note = await Note.create({ title, description })

    return new Response(JSON.stringify(note), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    })
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB()
    await Note.deleteMany()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

