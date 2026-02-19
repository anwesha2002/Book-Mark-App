'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Dashboard() {
    const [bookmarks, setBookmarks] = useState<any[]>([])

    // const fetchBookmarks = async () => {
    //     const { data } = await supabase
    //         .from('bookmarks')
    //         .select('*')
    //         .order('created_at', { ascending: false })
    //
    //     setBookmarks(data || [])
    // }

    const [user, setUser] = useState<any>(null)

    console.log('✅ Bookmarks page rendered')

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            console.log('👤 User:', data.user)
            setUser(data.user)
        })
    }, [])

    const deleteBookmark = async (bookmarkId: string) => {
        const { error } = await supabase
            .from('bookmarks')
            .delete()
            .eq('id', bookmarkId)

        if (error) {
            console.error('❌ Delete failed:', error.message)
        }
        setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId))
    }




    useEffect(() => {
        if (!user?.id) {
            console.log('⏳ Waiting for user...')
            return
        }

        console.log('🚀 Setting up realtime for user:', user.id)

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
                    console.log('🔥 REALTIME PAYLOAD:', payload)
                    fetchBookmarks()
                }
            )
            .subscribe((status) => {
                console.log('📡 Channel status:', status)
            })

        return () => {
            supabase.removeChannel(channel)
        }
    }, [user])

    // useEffect(() => {
    //
    //     const fetchBookmarks = async () => {
    //         const { data } = await supabase
    //             .from('bookmarks')
    //             .select('*')
    //             .order('created_at', { ascending: false })
    //
    //         setBookmarks(data || [])
    //     }
    //
    //     fetchBookmarks()
    //
    //     // const channel = supabase
    //     //     .channel('realtime-bookmarks')
    //     //     .on(
    //     //         'postgres_changes',
    //     //         { event: '*', schema: 'public', table: 'bookmarks' },
    //     //         fetchBookmarks
    //     //     )
    //     //     .subscribe()
    //     //
    //     // return () => {
    //     //     supabase.removeChannel(channel)
    //     // }
    //
    //     // const channel = supabase
    //     //     .channel('realtime-bookmarks')
    //     //     .on(
    //     //         'postgres_changes',
    //     //         {
    //     //             event: '*',
    //     //             schema: 'public',
    //     //             table: 'bookmarks',
    //     //             filter: `user_id=eq.${user.id}`
    //     //         },
    //     //         (payload) => {
    //     //             console.log('🔥 REALTIME EVENT:', payload)
    //     //             fetchBookmarks()
    //     //         }
    //     //     )
    //     //     .subscribe((status) => {
    //     //         console.log('📡 Channel status:', status)
    //     //     })
    //
    //     console.log(user?.id)
    //
    //     const channel = supabase
    //         .channel(`realtime-bookmarks-${user?.id}`)
    //         .on(
    //             'postgres_changes',
    //             {
    //                 event: '*',
    //                 schema: 'public',
    //                 table: 'bookmarks',
    //                 filter: `user_id=eq.${user?.id}`,
    //             },
    //             (payload) => {
    //                 console.log('🔥 REALTIME EVENT:', payload)
    //                 fetchBookmarks()
    //             }
    //         )
    //         .subscribe(()=>{
    //             console.log('🚀 Setting up realtime for user:', user?.id)
    //         }
    // )
    //
    // }, [])
    //     .eq('id', bookmarkId)




    // }

    return (
        <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-6">My Bookmarks</h1>

            {bookmarks.length === 0 && (
                <p className="text-muted-foreground text-sm">
                    No bookmarks yet.
                </p>
            )}

            <div className="space-y-4">
                {bookmarks.map((bm) => (
                    <div
                        key={bm.id}
                        className="flex items-center justify-between rounded-lg border p-4
                       hover:bg-muted/40 transition"
                    >
                        <div className="flex flex-col">
                            <a
                                href={bm.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                {bm.title}
                            </a>
                            <span className="text-xs text-muted-foreground truncate max-w-xs">
                {bm.url}
              </span>
                        </div>

                        <button
                            onClick={() => deleteBookmark(bm.id)}
                            className="text-sm text-red-600 hover:text-red-700
                         hover:bg-red-50 px-3 py-1.5 rounded-md transition"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
