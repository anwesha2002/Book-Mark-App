'use client'

import {ReactNode} from "react";
import Link from "next/link";


import {supabase} from "@/lib/supabaseClient";
import {useRouter} from "next/navigation";

export default function PrivateLayout({children} : {children: ReactNode}) {

    const router = useRouter()

    const logout = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    return (
        <>
            <header className="bg-blue-100 border-b border-blue-200">
                <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center">


                    <div className="font-bold text-lg text-blue-900">
                        Book Mark App
                        {/*Assist-demo*/}
                    </div>


                    <div className="mx-auto flex items-center gap-6 text-sm text-blue-900">
                        <Link
                            href="/bookmarks"
                            className="hover:text-blue-600 transition font-medium border p-2 rounded-lg"
                        >
                            Add Bookmark
                        </Link>
                        <Link
                            href="/view"
                            className="hover:text-blue-600 transition font-medium border p-2 rounded-lg"
                        >
                            Bookmarks
                        </Link>
                    </div>


                    <button
                        onClick={logout}
                        className="text-sm font-medium text-blue-700 border border-blue-300 rounded-md px-4 py-1.5 hover:bg-blue-200 transition"
                    >
                        Logout
                    </button>

                </nav>
            </header>

            <main className="w-full">
                {children}
            </main>
        </>
    );
}