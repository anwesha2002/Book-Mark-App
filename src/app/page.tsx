'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import {redirect} from "next/navigation";

export default function Home() {

    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user)
        })
    }, [])

    const login = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }

    if (!user)

    return (
        <button onClick={login}>
            Sign in with Google
        </button>
    )

    return redirect("/bookmarks")

    // return <div>Welcome {user.email}</div>

}
