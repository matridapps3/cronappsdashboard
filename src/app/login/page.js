"use client"

import { useState } from "react"

export default function Login(){
    const[name, setName] = useState("");
    const[password, setPassword] = useState("");

    return(
        <div className="bg-[#F8FAFC] w-full min-h-full flex justify-center items-center pt-20">
            <div className="h-110 w-80 border-2 border-gray-400 rounded-xl bg-[#F8FAFC] flex flex-col justify-center gap-8 px-10">
                <h1 className="font-semibold self-start text-xl">Login</h1>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" className="border h-8 border-gray-400 mt-[-20] rounded-md" onChange={(e) => setName(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="border h-8 border-gray-400 mt-[-20] rounded-md" onChange={(e) => setPassword(e.target.value)}></input>
                <button className="bg-gray-700 text-white h-10 rounded-md">Login</button>
            </div>
        </div>
    )
}