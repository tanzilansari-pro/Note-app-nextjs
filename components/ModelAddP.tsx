'use client'
import { FormEventHandler, useState } from 'react'

interface Model {
  openModel: boolean
  setOpenModel: (value: boolean) => void
}

const ModelAddP = ({ openModel, setOpenModel }: Model) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e: React.FormEvent) => {
    e.preventDefault()
    const projectObj = {
      title: title,
      description: description,
    }
    await fetch('/api/addNote', {
      method: 'POST',
      body: JSON.stringify(projectObj)
    })

    setTitle("")
    setDescription("")
    setOpenModel(false)

    location.reload()
  }

  if (!openModel) return null

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="shadow-xl p-6 rounded-md w-full max-w-md relative">
        <button
          onClick={() => setOpenModel(false)}
          className="absolute top-2 right-2 font-bold text-xl"
        >
          ×
        </button>

        <h3 className="text-lg font-bold text-zinc-800 mb-4">Add Note</h3>

        <form onSubmit={submitHandler}>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="flex-1 px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Project name"
            />
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="flex-1 px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Project Description"
            />
            <button className="px-4 py-2 rounded bg-blue-700 text-white font-semibold">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModelAddP
