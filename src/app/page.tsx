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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-6">
            <div className="w-full max-w-md rounded-2xl text-black bg-white shadow-2xl p-8">

                {/* App Title */}
                <h1 className="text-3xl font-bold text-center text-gray-900">
                    Book Mark App
                </h1>

                {/* Subtitle */}
                <p className="text-center text-gray-600 mt-2">
                    Save, organize, and access your bookmarks anywhere.
                </p>

                {/* Divider */}
                <div className="my-6 h-px bg-gray-200" />

                {/* Sign in Button */}
                <button
                    onClick={login}
                    className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 text-sm font-medium hover:bg-gray-50 transition"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="h-5 w-5"
                    />
                    Sign in with Google
                </button>

                {/* Footer text */}
                <p className="mt-6 text-xs text-center text-gray-500">
                    By signing in, you agree to our terms and privacy policy.
                </p>
            </div>
        </div>
    )

    return redirect("/view")

    // return <div>Welcome {user.email}</div>

}

// 'use client'
//
// import { supabase } from '@/lib/supabaseClient'
//
// export default function Home() {
//     const signInWithGoogle = async () => {
//         await supabase.auth.signInWithOAuth({
//             provider: 'google',
//         })
//     }
//
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-6">
//             <div className="w-full max-w-md rounded-2xl text-black bg-white shadow-2xl p-8">
//
//                 {/* App Title */}
//                 <h1 className="text-3xl font-bold text-center text-gray-900">
//                     Book Mark App
//                 </h1>
//
//                 {/* Subtitle */}
//                 <p className="text-center text-gray-600 mt-2">
//                     Save, organize, and access your bookmarks anywhere.
//                 </p>
//
//                 {/* Divider */}
//                 <div className="my-6 h-px bg-gray-200" />
//
//                 {/* Sign in Button */}
//                 <button
//                     onClick={signInWithGoogle}
//                     className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 text-sm font-medium hover:bg-gray-50 transition"
//                 >
//                     <img
//                         src="https://www.svgrepo.com/show/475656/google-color.svg"
//                         alt="Google"
//                         className="h-5 w-5"
//                     />
//                     Sign in with Google
//                 </button>
//
//                 {/* Footer text */}
//                 <p className="mt-6 text-xs text-center text-gray-500">
//                     By signing in, you agree to our terms and privacy policy.
//                 </p>
//             </div>
//         </div>
//     )
// }

