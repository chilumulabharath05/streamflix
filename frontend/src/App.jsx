import React, { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext.jsx"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import MovieDetailPage from "./pages/MovieDetailPage.jsx"
import { LoginPage, SignupPage } from "./pages/AuthPages.jsx"
import "./styles/global.css"

export default function App() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar onSearch={(q) => setSearchQuery(q)} />
        <Routes>
          <Route path="/"          element={<HomePage searchQuery={searchQuery} />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/login"     element={<LoginPage />} />
          <Route path="/signup"    element={<SignupPage />} />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
