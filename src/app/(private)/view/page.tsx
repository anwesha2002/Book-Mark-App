'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import {Trash} from "lucide-react";

export default function Dashboard() {
    const [bookmarks, setBookmarks] = useState<any[]>([])


    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            console.log('User:', data.user)
            setUser(data.user)
        })
    }, [])

    const deleteBookmark = async (bookmarkId: string) => {
        const { error } = await supabase
            .from('bookmarks')
            .delete()
            .eq('id', bookmarkId)

        if (error) {
            console.error('Delete failed:', error.message)
        }
        setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId))
    }




    useEffect(() => {
        if (!user?.id) {
            console.log('user...')
            return
        }

        console.log('etting up realtime for user:', user.id)

        const fetchBookmarks = async () => {
            const { data } = await supabase
                .from('bookmarks')
                .select('*')
                .order('created_at', { ascending: false })

            setBookmarks(data || [])
        }

        fetchBookmarks()

        const channel = supabase
            .channel(`realtime-bookmarks-${user.id}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    console.log('REALTIME PAYLOAD:', payload)
                    fetchBookmarks()
                }
            )
            .subscribe((status) => {
                console.log('Channel status:', status)
            })

        return () => {
            supabase.removeChannel(channel)
        }
    }, [user])


    // }

    return (
        <div className="max-w-3xl mx-auto px-4 m-4">
            <h1 className="text-2xl font-semibold mb-6 text-center">My Bookmarks</h1>

            {bookmarks.length === 0 && (
                <p className="text-muted-foreground text-sm">
                    No bookmarks yet.
                </p>
            )}

            <div className="space-y-4">
                {bookmarks.map((bm) => (
                    <div
                        key={bm.id}
                        className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/40 transition bg-gray-300 text-black">
                        <div className="flex flex-col">
                            <a
                                href={bm.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                {bm.title}
                            </a>
                            <span className="text-xs text-muted-foreground truncate max-w-xs">{bm.url}</span>
                        </div>

                        <button
                            onClick={() => deleteBookmark(bm.id)}
                            className="text-sm text-red-600 hover:text-red-700
                         hover:bg-red-50 px-3 py-1.5 rounded-md transition"
                        >
                            <Trash size={18}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
