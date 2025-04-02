"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./page.css";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Login failed. Check your credentials.");

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <html>
        <body className="container">
            <div className="form-box">
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <div className="input-field">
                    <i className="fas fa-envelope"></i>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="input-field">
                    <i className="fas fa-lock"></i>
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
                </form>
                <p>Don&apos;t have an account? <a href="/auth/signup">Sign Up</a></p>
            </div>
        </body>
    </html>
  );
}
