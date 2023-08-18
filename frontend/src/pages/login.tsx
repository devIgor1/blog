"use client"

import Header from "@/components/Header/page"
import { VscAccount } from "react-icons/vsc"
import { AuthContext } from "@/contexts/AuthContext"
import { FormEvent, useContext, useState } from "react"
import { FaSpinner } from "react-icons/fa"

export default function Login() {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  async function handleLogin(e: FormEvent) {
    e.preventDefault()

    if (!email || !password) {
      alert("Fill in all fields")
      return
    }

    setLoading(true)

    let data = {
      email,
      password,
    }

    await signIn(data)

    setLoading(false)
  }

  return (
    <main className="h-screen w-full bg-lightM dark:bg-darkM dark:text-lightM">
      <Header />
      <div className="flex h-4/6 flex-col items-center justify-center">
        <h1 className="my-4 text-3xl">Login</h1>
        <form className="flex flex-col" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            className="mb-4 rounded bg-gray-300 p-1 text-black outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            className="mb-4 rounded bg-gray-300 p-1 text-black outline-none"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center">
            <button className="flex items-center rounded border-2 border-black p-1 dark:border-white">
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <span className="ml-2 flex  items-center">
                  <p className="mr-2">Login</p>
                  <VscAccount />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
