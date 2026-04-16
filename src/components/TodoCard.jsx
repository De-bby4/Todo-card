import React, { useEffect, useState } from "react";

export default function TodoCard() {
  const dueDate = new Date("2026-03-01T18:00:00");
  const [completed, setCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    const calcTime = () => {
      const diff = dueDate - new Date();
      if (diff <= 0) {
        setIsOverdue(true);
        const h = Math.floor(Math.abs(diff) / (1000 * 60 * 60));
        if (h === 0) return "Due now!";
        return `Overdue by ${h} hour${h > 1 ? "s" : ""}`;
      }
      setIsOverdue(false);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      if (days === 0) return "Due today";
      if (days === 1) return "Due tomorrow";
      return `Due in ${days} days`;
    };
    setTimeRemaining(calcTime());
    const id = setInterval(() => setTimeRemaining(calcTime()), 60000);
    return () => clearInterval(id);
  }, []);

  const handleToggle = () => setCompleted((prev) => !prev);

  return (
    <article
      data-testid="test-todo-card"
      className="w-full max-w-[420px] mx-auto bg-white border border-gray-100 rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 pt-5">
        <div className="flex justify-between items-start gap-3 mb-3">
          <h3
            data-testid="test-todo-title"
            className={`text-[15px] font-medium leading-snug transition-all ${
              completed ? "line-through text-gray-400" : "text-gray-900"
            }`}
          >
            Finish React Project
          </h3>
          <span
            data-testid="test-todo-priority"
            aria-label="High priority"
            className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-700 whitespace-nowrap flex-shrink-0"
          >
            High
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-4" aria-hidden="true">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: completed ? "100%" : "0%" }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="px-5">
        <p
          data-testid="test-todo-description"
          className="text-[13px] text-gray-500 leading-relaxed mb-4"
        >
          Complete the UI and submit before the deadline. Make sure all
          data-testid attributes are correct.
        </p>

        {/* Meta */}
        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M5 2v2M11 2v2M2 7h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <time
              data-testid="test-todo-due-date"
              dateTime={dueDate.toISOString()}
              className="text-[12px] text-gray-500"
            >
              Due Mar 1, 2026
            </time>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <div aria-live="polite">
              <time
                data-testid="test-todo-time-remaining"
                className={`text-[12px] font-medium ${
                  isOverdue ? "text-red-700" : "text-gray-600"
                }`}
              >
                {timeRemaining}
              </time>
            </div>
          </div>
        </div>

        {/* Status + Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                completed ? "bg-green-500" : "bg-amber-500"
              }`}
            />
            <span
              data-testid="test-todo-status"
              aria-label={`Status: ${completed ? "Done" : "Pending"}`}
              className={`text-[12px] font-medium ${
                completed ? "text-green-700" : "text-amber-700"
              }`}
            >
              {completed ? "Done" : "Pending"}
            </span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              id="complete-task"
              data-testid="test-todo-complete-toggle"
              checked={completed}
              onChange={handleToggle}
              aria-label="Mark task as done"
              className="w-[15px] h-[15px] cursor-pointer accent-green-500"
            />
            <span className="text-[12px] text-gray-500 cursor-pointer">
              Mark as done
            </span>
          </label>
        </div>

        {/* Tags */}
        <ul
          data-testid="test-todo-tags"
          role="list"
          className="flex flex-wrap gap-1.5 mb-4"
        >
          <li
            data-testid="test-todo-tag-work"
            className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200"
          >
            work
          </li>
          <li
            data-testid="test-todo-tag-urgent"
            className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200"
          >
            urgent
          </li>
          <li className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
            design
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-2">
          <button
            data-testid="test-todo-edit-button"
            aria-label="Edit task"
            onClick={() => console.log("edit clicked")}
            className="py-2 text-[13px] font-medium rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            Edit
          </button>
          <button
            data-testid="test-todo-delete-button"
            aria-label="Delete task"
            onClick={() => alert("Delete clicked")}
            className="py-2 text-[13px] font-medium rounded-xl bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 transition focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}