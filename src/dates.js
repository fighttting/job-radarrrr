const DAY = 24 * 60 * 60 * 1000;

// Local calendar date as YYYY-MM-DD
export function today() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

// Whole days from one YYYY-MM-DD date to another
export function daysBetween(from, to) {
  return Math.round((new Date(to) - new Date(from)) / DAY);
}
