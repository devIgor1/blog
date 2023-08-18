"use client"

import Header from "@/components/Header/page"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { useState, FormEvent, useContext } from "react"
import { FaSpinner } from "react-icons/fa"
import { AuthContext } from "@/contexts/AuthContext"

export default function Register() {
  const { signUp } = useContext(AuthContext)
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: FormEvent) {
    e.preventDefault()

    if (!name || !email || !password) {
      alert("Fill in all fields")
      return
    }

    setLoading(true)

    let data = { name, email, password }

    await signUp(data)
  }

  return (
    <main className="h-screen w-full bg-lightM dark:bg-darkM dark:text-white ">
      <Header />
      <form
        className="flex h-4/6 items-center justify-center"
        onSubmit={handleRegister}
      >
        <h1 className="mr-14 text-2xl">Create your account</h1>
        <div className="flex flex-col items-center ">
          <label>Name</label>
          <input
            className="mb-4 rounded bg-gray-300 p-1 text-black outline-none"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email</label>
          <input
            className="mb-4 rounded bg-gray-300 p-1 text-black outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            className="rounded bg-gray-300 p-1 text-black outline-none"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {loading ? (
            <FaSpinner className="animate-spin mt-2" />
          ) : (
            <button
              className="mt-3 flex items-center rounded border-2 border-black p-1 dark:border-white"
              type="submit"
            >
              Sign In
              <span className="ml-2">
                <AiOutlineCheckCircle />
              </span>
            </button>
          )}
        </div>
      </form>
    </main>
  )
}
