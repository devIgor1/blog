"use client"

import { useState, useEffect, useContext } from "react"
import { BsSunFill, BsMoonFill } from "react-icons/bs"
import { AuthContext } from "@/contexts/AuthContext"
import Link from "next/link"

export default function Header() {
  const [theme, setTheme] = useState("light")
  const { user, signOut } = useContext(AuthContext)

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="flex items-center p-6 font-rem ">
      <header className="flex w-full items-center justify-between dark:text-lightM">
        <div className="flex items-center">
          <a href="/" className=" text-3xl font-extrabold">
            Blog
          </a>
        </div>
        <div className="flex items-center text-base font-medium">
          {theme === "dark" ? (
            <button onClick={handleThemeSwitch}>
              <BsSunFill size={"20px"} />
            </button>
          ) : (
            <button onClick={handleThemeSwitch}>
              <BsMoonFill size={"20px"} />
            </button>
          )}

          {user ? (
            <>
              <p className="mx-4">Welcome, {user.name}!</p>
              <button
                onClick={signOut}
                className="rounded border-2 border-black p-2 dark:border-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-5 underline">
                Login
              </Link>

              <Link
                href="/register"
                className="rounded border-2 border-black p-2 dark:border-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  )
}
