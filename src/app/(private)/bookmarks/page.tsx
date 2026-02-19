'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import {redirect} from "next/navigation";

export default function Bookmarks() {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [user, setUser] = useState<any>(null)


    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user)
        })
    }, [])


    const addBookmark = async () => {
        if (!title || !url) return

        await supabase.from('bookmarks').insert({
            title,
            url,
            user_id: user.id,
        })

        setTitle('')
        setUrl('')
    }

    // if (!user) return redirect("/")

    return (
        <section className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
            <div className="w-full max-w-xl rounded-2xl bg-white text-black shadow-xl p-8">
                <h1 className="text-3xl font-semibold text-center mb-8 ">
                    Add Bookmark
                </h1>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Title
                        </label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter bookmark title"
                            className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            URL
                        </label>
                        <input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <button
                        onClick={addBookmark}
                        className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium text-lg hover:bg-blue-700 transition"
                    >
                        Add Bookmark
                    </button>
                </div>
            </div>
        </section>
    )
}
