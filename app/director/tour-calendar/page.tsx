import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
const slots = [
  ["Mon", "9:30 AM", "S. Martin"],
  ["Tue", "10:00 AM", "A. Dupont"],
  ["Wed", "10:00 AM", "N. Bernard"],
  ["Fri", "1:30 PM", "L. Tremblay"],
];
export const metadata = { title: "Tour Calendar" };
export default function CalendarPage() {
  return (
    <>
      <header className="director-page-heading">
        <div>
          <p className="eyebrow">Synthetic availability</p>
          <h1>Tour Calendar</h1>
          <p>August 24–30, 2026</p>
        </div>
        <div className="calendar-controls">
          <button className="icon-button" aria-label="Previous week">
            <ChevronLeft />
          </button>
          <button className="button button-secondary">Today</button>
          <button className="icon-button" aria-label="Next week">
            <ChevronRight />
          </button>
        </div>
      </header>
      <section className="dashboard-panel calendar-panel">
        <div className="calendar-head">
          <span>Time</span>
          {["Mon 24", "Tue 25", "Wed 26", "Thu 27", "Fri 28"].map((day) => (
            <strong key={day}>{day}</strong>
          ))}
        </div>
        <div className="calendar-body">
          {["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"].map((time) => (
            <span className="calendar-time" key={time}>
              {time}
            </span>
          ))}
          {slots.map(([, time, name], index) => (
            <article className={`calendar-event event-${index + 1}`} key={name}>
              <CalendarDays aria-hidden="true" />
              <strong>{time}</strong>
              <span>{name}</span>
              <small>Demo</small>
            </article>
          ))}
        </div>
        <footer className="calendar-capacity">
          {["Mon 2/3", "Tue 2/3", "Wed 1/3", "Thu 0/3", "Fri 1/3"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </footer>
      </section>
    </>
  );
}
