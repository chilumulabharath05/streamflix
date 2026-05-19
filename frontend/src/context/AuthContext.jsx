import React, { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,  setUser]  = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = localStorage.getItem("ott_token")
    const u = localStorage.getItem("ott_user")
    if (t && u) { setToken(t); setUser(JSON.parse(u)) }
    setLoading(false)
  }, [])

  const login = (tokenVal, userData) => {
    setToken(tokenVal); setUser(userData)
    localStorage.setItem("ott_token", tokenVal)
    localStorage.setItem("ott_user", JSON.stringify(userData))
  }

  const logout = () => {
    setToken(null); setUser(null)
    localStorage.removeItem("ott_token")
    localStorage.removeItem("ott_user")
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
