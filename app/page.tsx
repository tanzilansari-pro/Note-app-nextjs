'use client'
import ModelAddP from '@/components/ModelAddP'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Note {
  _id: string
  title: string
  description: string
}

const Page = () => {
  const [openModel, setOpenModel] = useState(false)
  const [notes, setNotes] = useState<Note[]>([])

  const getNotes = async () => {
    const res = await fetch('/api/notes', { method: "GET" })
    const data = await res.json()
    console.log(data)
    setNotes(data)
  }

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <div className="flex flex-col w-full px-15 py-5">
      <div className="flex flex-wrap gap-4">
        {notes && notes.map((note, index) => (
          <Link href={`/note/${note._id}`} key={index} className="p-4 rounded shadow bg-white">
            <h1 className="text-2xl text-zinc-800 font-bold">{note.title}</h1>
            <h3 className="text-zinc-500">{note.description}</h3>
          </Link>
        ))}
      </div>

      <div className="mt-5">
        <button
          onClick={() => setOpenModel(true)}
          className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800"
        >
          New
        </button>
      </div>

      <ModelAddP openModel={openModel} setOpenModel={setOpenModel} />
    </div>
  )
}

export default Page
