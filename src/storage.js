import { STATUSES } from "./application";

const KEY = "job-radar";
const VERSION = 1;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const empty = () => ({ version: VERSION, applications: [] });

function isValidApplication(app) {
  return (
    app &&
    (typeof app.id === "string" || typeof app.id === "number") &&
    typeof app.company === "string" &&
    typeof app.role === "string" &&
    Array.isArray(app.events) &&
    app.events.length > 0 &&
    app.events.every(
      (event) =>
        STATUSES.includes(event.status) &&
        typeof event.date === "string" &&
        DATE.test(event.date),
    )
  );
}

// Throws if data isn't a job-radar export this version understands
export function validate(data) {
  if (!data || data.version !== VERSION) {
    throw new Error(`Expected version ${VERSION}, got ${data?.version}`);
  }
  if (!Array.isArray(data.applications)) {
    throw new Error("Missing applications list");
  }
  const bad = data.applications.findIndex((app) => !isValidApplication(app));
  if (bad !== -1) {
    throw new Error(`Application #${bad + 1} is malformed`);
  }
  return data;
}

export function load() {
  const raw = localStorage.getItem(KEY);
  if (raw === null) {
    return empty();
  }
  return validate(JSON.parse(raw));
}

export function save(data) {
  localStorage.setItem(KEY, JSON.stringify(validate(data)));
}
