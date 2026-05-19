// AuthPages.js - Login and Signup pages in one file
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import "./AuthPages.css";

// ── Login ────────────────────────────────────────────────────────────────────
export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const { token, user } = await api.login(form);
      login(token, user);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Demo login — pre-fills credentials
  const demoLogin = () => {
    setForm({ email: "demo@streamflix.com", password: "demo1234" });
  };

  return (
    <div className="auth-page page">
      <div className="auth-card">
        <div className="auth-logo">▶ STREAMFLIX</div>
        <h2 className="auth-title">Sign In</h2>

        {error && <div className="error-box">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            Email
            <input
              type="email" name="email" required
              value={form.email} onChange={handleChange}
              placeholder="you@example.com"
              className="auth-input"
            />
          </label>
          <label className="auth-label">
            Password
            <input
              type="password" name="password" required
              value={form.password} onChange={handleChange}
              placeholder="••••••••"
              className="auth-input"
            />
          </label>
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <button className="demo-btn" onClick={demoLogin} type="button">
          Use demo credentials
        </button>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

// ── Signup ───────────────────────────────────────────────────────────────────
export function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false); return;
    }
    try {
      const { token, user } = await api.signup(form);
      login(token, user);
      navigate("/");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page page">
      <div className="auth-card">
        <div className="auth-logo">▶ STREAMFLIX</div>
        <h2 className="auth-title">Create Account</h2>

        {error && <div className="error-box">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            Full Name
            <input
              type="text" name="name" required
              value={form.name} onChange={handleChange}
              placeholder="John Doe"
              className="auth-input"
            />
          </label>
          <label className="auth-label">
            Email
            <input
              type="email" name="email" required
              value={form.email} onChange={handleChange}
              placeholder="you@example.com"
              className="auth-input"
            />
          </label>
          <label className="auth-label">
            Password
            <input
              type="password" name="password" required
              value={form.password} onChange={handleChange}
              placeholder="Min. 6 characters"
              className="auth-input"
            />
          </label>
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
