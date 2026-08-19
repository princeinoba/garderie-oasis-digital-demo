import { ChevronLeft, ChevronRight } from "lucide-react";

import styles from "@/components/director/director-board.module.css";

const days = [
  { key: "mon", label: "Mon", date: "19", capacity: "2 / 3", tone: "available" },
  { key: "tue", label: "Tue", date: "20", capacity: "2 / 3", tone: "available" },
  { key: "wed", label: "Wed", date: "21", capacity: "1 / 3", tone: "limited" },
  { key: "thu", label: "Thu", date: "22", capacity: "1 / 3", tone: "limited" },
  { key: "fri", label: "Fri", date: "23", capacity: "1 / 3", tone: "limited" },
  { key: "sat", label: "Sat", date: "24", capacity: "0 / 1", tone: "closed" },
  { key: "sun", label: "Sun", date: "25", capacity: "0 / 1", tone: "closed" },
] as const;

const hours = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"];

const events: Record<string, { time: string; name: string; note: string; tone: "sage" | "gold" }> =
  {
    "mon-9 AM": { time: "9:30 AM", name: "S. Martin", note: "Dry 2yr", tone: "sage" },
    "tue-10 AM": { time: "10:00 AM", name: "A. Dupont", note: "Infant", tone: "gold" },
    "wed-10 AM": { time: "10:00 AM", name: "N. Bernard", note: "Toddler", tone: "sage" },
    "fri-1 PM": { time: "1:30 PM", name: "F. Alami", note: "Infant", tone: "sage" },
  };

export const metadata = { title: "Tour Calendar" };

export default function CalendarPage() {
  return (
    <>
      <header className="director-page-heading">
        <div>
          <h1>Tour Calendar</h1>
          <p>May 19 – May 25, 2025</p>
        </div>
        <div className={styles.calendarHeaderControls}>
          <div className="calendar-controls">
            <button className="icon-button" type="button" aria-label="Previous week">
              <ChevronLeft aria-hidden="true" />
            </button>
            <button className="button button-secondary" type="button">
              Today
            </button>
            <button className="icon-button" type="button" aria-label="Next week">
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
          <div className={styles.segmentedControl} aria-label="Calendar view">
            <button className={styles.segmentActive} type="button" aria-pressed="true">
              Week
            </button>
            <button type="button" aria-pressed="false">
              Month
            </button>
          </div>
        </div>
      </header>

      <section className={`dashboard-panel ${styles.calendarBoard}`}>
        <div className={styles.calendarScroller}>
          <table className={styles.calendarTable}>
            <thead>
              <tr>
                <th>Time</th>
                {days.map((day) => (
                  <th key={day.key}>
                    <span>{day.label}</span>
                    <strong>{day.date}</strong>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour) => (
                <tr key={hour}>
                  <th scope="row">{hour}</th>
                  {days.map((day) => {
                    const event = events[`${day.key}-${hour}`];
                    return (
                      <td
                        className={day.tone === "closed" ? styles.closedDay : undefined}
                        key={day.key}
                      >
                        {event ? (
                          <article
                            className={
                              event.tone === "gold"
                                ? styles.calendarEventGold
                                : styles.calendarEventSage
                            }
                          >
                            <time>{event.time}</time>
                            <strong>{event.name}</strong>
                            <span>{event.note}</span>
                          </article>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className={styles.capacityPanel}>
          <h2>Daily Tour Capacity</h2>
          <div>
            {days.map((day) => (
              <span className={styles[`capacity_${day.tone}`]} key={day.key}>
                <small>
                  {day.label} {day.date}
                </small>
                <strong>{day.capacity}</strong>
              </span>
            ))}
          </div>
        </footer>
      </section>
    </>
  );
}
