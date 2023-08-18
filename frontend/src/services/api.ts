import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import axios from "axios"
import { parseCookies } from "nookies"
import { AuthTokenError } from "./errors/AuthTokenError"

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: "http://localhost:1111",
    headers: {
      Authorization: `Bearer${cookies["@blogauth.token"]}`,
    },
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        //qualquer erro 401(nao autorizado) deve deslogar o usuario

        if (typeof window !== undefined) {
          //chama a funcao para deslogar o usuario
          const { signOut } = useContext(AuthContext)
          signOut()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }
      return Promise.reject(error)
    }
  )
  return api
}
