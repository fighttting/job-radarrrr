export const STATUSES = ["applied", "interviewing", "offer", "rejected"];
export const CLOSED_STATUSES = ["offer", "rejected"];

export const appliedDate = (app) => app.events[0].date;
export const currentStatus = (app) => app.events.at(-1).status;
export const lastUpdate = (app) => app.events.at(-1).date;
