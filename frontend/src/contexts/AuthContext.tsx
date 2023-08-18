"use client"

import { createContext, ReactNode, useState } from "react"
import { destroyCookie, setCookie } from "nookies"
import { useRouter } from "next/navigation"
import { api } from "../services/apiClient"

type AuthContextData = {
  user: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
  signUp: (credentials: SignUpProps) => Promise<void>
}
type UserProps = {
  id: string
  name: string
  email: string
}

type SignInProps = {
  email: string
  password: string
}

type SignUpProps = {
  name: string
  email: string
  password: string
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user
  const router = useRouter()

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/login", {
        email,
        password,
      })

      const { id, name, token } = response.data

      setCookie(undefined, "@blogauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/", // Quais caminhos terao acesso ao cookie
      })

      setUser({
        id,
        name,
        email,
      })

      //Passar para proximas requisiçoes o nosso token
      api.defaults.headers["Authorization"] = `Bearer ${token}`

      alert(`Welcome ${name}`)

      //Redirecionar o user para home
      router.push("/")
    } catch (err) {
      console.log(err)
    }
  }

  function signOut() {
    try {
      destroyCookie(undefined, "@blogauth.token")
      router.push("/")
    } catch (err) {
      console.log(err)
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
      })

      router.push("/login")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  )
}
