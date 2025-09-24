'use client'
import { useParams, useRouter } from 'next/navigation'
import { FormEventHandler, useEffect, useState } from 'react'

interface Note {
    _id: string
    title: string
    description: string
}

const Page = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [note, setNote] = useState<Note | null>(null)

    const params = useParams()
    const router = useRouter()

    useEffect(() => {
        const fetchNote = async () => {
            const res = await fetch(`/api/notes/${params.id}`)
            const data = await res.json()
            setNote(data.SingleNote)
            console.log(data)
            setTitle(data.SingleNote.title)
            setDescription(data.SingleNote.description)
        }
        fetchNote()
    }, [params.id])

    const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        await fetch(`/api/updateNote/${params.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        })

        setTitle("")
        setDescription("")

        router.back()
    }

    if (!note) return <div>Loading...</div>

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="shadow-xl p-6 rounded-md w-full max-w-md relative">
                <button
                    onClick={() => router.back()}
                    className="absolute top-2 right-2 font-bold text-xl"
                >
                    ×
                </button>

                <h3 className="text-lg font-bold text-zinc-800 mb-4">Edit Project</h3>

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
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page
