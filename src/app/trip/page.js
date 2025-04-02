"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./page.module.css"; // Use CSS Modules

export default function PlanTrip() {
  const [formData, setFormData] = useState({
    start_date: null,
    end_date: null,
    description: "",
    user_id: "11", // Hardcoded User ID
  });

  const handleDateChange = (field, date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.start_date || !formData.end_date || !formData.description) {
      alert("Please fill in all fields.");
      return;
    }

    const formattedData = {
      ...formData,
      start_date: formData.start_date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      end_date: formData.end_date.toISOString().split("T")[0],
    };

    const response = await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
    });

    if (response.ok) {
      alert("Trip planned successfully!");
      setFormData({ start_date: null, end_date: null, description: "", user_id: "11" });
    } else {
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <html>
    <body className={styles.container}>
      <div className={styles.card}>
        <h2>Plan a New Trip</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="user_id" value={formData.user_id} />

          <label>Start Date:</label>
          <DatePicker
            selected={formData.start_date}
            onChange={(date) => handleDateChange("start_date", date)}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            required
            className={styles.input}
          />

          <label>End Date:</label>
          <DatePicker
            selected={formData.end_date}
            onChange={(date) => handleDateChange("end_date", date)}
            dateFormat="yyyy-MM-dd"
            minDate={formData.start_date || new Date()}
            required
            className={styles.input}
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleTextChange}
            required
            className={styles.textarea}
            placeholder="Enter trip details..."
          />

          <button type="submit" className={styles.button}>Start Planning</button>
        </form>
      </div>
    </body>
    </html>
  );
}
