'use client'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const Navbar = () => {
    return (
        <header className=" w-full bg-slate-800 py-4">
            <div className="mx-auto flex items-center justify-between px-10">
                <h1 className="text-xl text-white font-bold">BroNotes</h1>

                <ul className="flex gap-6 items-center">
                    <li>
                        <Link href="/" className="text-zinc-300 font-semibold hover:text-white">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-zinc-300 font-semibold hover:text-white">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-zinc-300 font-semibold hover:text-white">
                            more
                        </Link>
                    </li>
                </ul>

                <div className="flex gap-3 items-center">
                    <SignedOut>
                        <button className="px-3 py-1 bg-zinc-300 text-zinc-700 rounded hover:bg-zinc-400">
                            <Link
                                href="/sign-up"
                            >
                                Sign up
                            </Link>
                        </button>
                        <button className="px-3 py-1 bg-pink-700 text-zinc-300 rounded hover:bg-zinc-400">
                            <Link
                                href="/sign-in"
                            >
                                Sign in
                            </Link>
                        </button>
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    )
}

export default Navbar
