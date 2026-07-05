"use client"

import Link from "next/link"

export default function Navbar() {

return (

<nav className="md:hidden fixed top-0 left-0 w-full z-50 flex justify-center py-5 backdrop-blur-md bg-black/40 border-b border-zinc-900">

<Link
href="/"
className="text-lg font-semibold tracking-widest text-white"
>
AICO
</Link>

</nav>

)

}