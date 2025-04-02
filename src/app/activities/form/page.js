"use client";

import { useState } from "react";
import "./activities_form.css";

export default function AddActivity() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    price: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Activity added successfully!");
      setFormData({ name: "", description: "", address: "", price: "", date: "" });
    } else {
      alert("Failed to add activity.");
    }
  };

  return (
    <html>
        <body>
            <div className="container">
                <h1>Add New Activity</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor="name">Activity Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} required />
                    </div>

                    <div>
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                    </div>

                    <div>
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" step="0.01" min="0" value={formData.price} onChange={handleChange} required />
                    </div>

                    <div>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
                    </div>

                    <div>
                    <button type="submit">Add Activity</button>
                    </div>
                </form>
            </div>
        </body>
    </html>
  );
}
