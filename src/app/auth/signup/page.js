"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./page.css";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
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
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Sign-up failed. Try again.");

      router.push("/auth/login");
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
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <div className="input-field">
                    <i className="fa-solid fa-user"></i>
                    <input type="text" name="username" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="input-field">
                    <i className="fa-solid fa-envelope"></i>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="input-field">
                    <i className="fa-solid fa-lock"></i>
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>

                    <div className="input-field">
                    <i className="fa-solid fa-phone"></i>
                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                    <p>Already have an account? <a href="/auth/login">Login</a></p>
                </div>
                </form>
            </div>
        </body>
    </html>
  );
}
