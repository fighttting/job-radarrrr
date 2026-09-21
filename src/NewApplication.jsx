import { useState } from "react";
import ApplicationCard from "./ApplicationCard";

export default function NewApplication({ onAdd }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("applied");
  const [workMode, setWorkMode] = useState("onsite");

  return (
    <div className="new-application-form">
      <h2>New Application</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAdd({
            id: Date.now(),
            company,
            role,
            status,
            workMode,
            appliedDate: new Date().toISOString().slice(0, 10),
          });
          setCompany("");
          setRole("");
          setStatus("applied");
          setWorkMode("onsite");
        }}
      >
        <div>
          <label htmlFor="company">Company:</label>
          <input
            name="company"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <input
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <label>Work Mode</label>
          <div>
            <span>
              <input
                checked={workMode === "onsite"}
                onChange={(e) => setWorkMode(e.target.value)}
                type="radio"
                name="work-mode"
                value="onsite"
                id="mode-onsite"
              />
              <label htmlFor="mode-onsite">On-site</label>
            </span>
            <span>
              <input
                checked={workMode === "hybrid"}
                onChange={(e) => setWorkMode(e.target.value)}
                type="radio"
                name="work-mode"
                value="hybrid"
                id="mode-hybrid"
              />
              <label htmlFor="mode-hybrid">Hybrid</label>
            </span>
            <span>
              <input
                checked={workMode === "remote"}
                onChange={(e) => setWorkMode(e.target.value)}
                type="radio"
                name="work-mode"
                value="remote"
                id="mode-remote"
              />
              <label htmlFor="mode-remote">Remote</label>
            </span>
          </div>
        </div>

        <div className="new-application-preview">
          <ApplicationCard
            company={company || "Company name"}
            role={role || "Role"}
            status={`${status} · ${workMode}`}
          />
        </div>

        <button type="submit">Add Application</button>
      </form>
    </div>
  );
}
