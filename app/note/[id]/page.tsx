'use client'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Note {
  _id: string
  title: string
  description: string
}

const Page = () => {
  const params = useParams()
  const [note, setNote] = useState<Note>()

  const router = useRouter()

  console.log(params.id)

  const getSingleNote = async () => {
    const res = await fetch(`/api/notes/${params.id}`)
    const data = await res.json()
    console.log(data.SingleNote)
    setNote(data.SingleNote)
  }

  const DeleteNote = async () => {
    await fetch(`/api/notes/${params.id}`, {
      method: "DELETE"
    })
    router.back()
  }

  useEffect(() => {
    getSingleNote()
  }, [])

  return (
    <div className='flex justify-center items-center h-[90vh]'>
      {note && (
        <div className="flex flex-col items-center justify-between text-center border border-zinc-300 h-60 w-80 rounded bg-white shadow-xl px-4 py-10">
          <div>
            <h1 className='text-2xl font-bold text-zinc-800'>{note.title}</h1>
            <h3 className='text font-bold text-zinc-600'>{note.description}</h3>
          </div>
          <div className='flex gap-5 justify-start items-center mt-3'>
            <button onClick={DeleteNote} className='bg-red-500 text-white px-1 py-1 rounded cursor-pointer'>Delete</button>
            <Link className='bg-blue-500 text-white px-3 py-1 rounded cursor-pointer' href={`/edit/${note._id}`}>Edit</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
