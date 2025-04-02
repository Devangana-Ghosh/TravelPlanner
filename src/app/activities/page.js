"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import "./activities.css"

export default function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch("/api/activities");
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error("Error fetching activities:", error);
      alert("Error fetching activities. Please try again.");
    }
  };

  const deleteActivity = async (activityId) => {
    try {
      const response = await fetch(`/api/activities/${activityId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchActivities();
      } else {
        throw new Error("Failed to delete activity");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      alert("Error deleting activity. Please try again.");
    }
  };

  return (
    <html lang="en">
      <Head>
        <title>Activities</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/activities.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </Head>
      <body>
        <h1>Activities</h1>
        <div className="activity-container">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.activities_id} className="activity-card">
                <h2>{activity.name}</h2>
                <p>{activity.description}</p>
                <p>Address: {activity.address}</p>
                <p>Price: ${activity.price}</p>
                <p>Date: {activity.date}</p>
                <i
                  className="fas fa-trash-alt delete-icon"
                  onClick={() => deleteActivity(activity.activities_id)}
                ></i>
              </div>
            ))
          ) : (
            <p>No activities available.</p>
          )}
        </div>
      </body>
    </html>
  );
}
