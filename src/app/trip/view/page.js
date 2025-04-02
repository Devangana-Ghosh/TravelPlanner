"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function TripsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch("/api/trips", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const trips = await response.json();
        
        console.log(trips);

        const formattedEvents = trips.map((trip) => ({
          id: trip.id,
          title: trip.description,
          start: trip.start_date,
          end: trip.end_date,
          backgroundColor: "green",
          borderColor: "darkgreen",
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <html>
        <body style={{ maxWidth: "1000px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ textAlign: "center" }}>Trips Calendar</h1>
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={(info) => alert(`Trip ID: ${info.event.id}\nDescription: ${info.event.title}`)}
        />
        </body>
    </html>
  );
}
