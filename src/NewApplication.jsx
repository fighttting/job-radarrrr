import { useState } from "react";
import ApplicationCard from "./ApplicationCard";
import { STATUSES } from "./application";
import { today } from "./dates";
import { useAddApplication } from "./useApplicationMutations";

const WORK_MODES = { onsite: "On-site", hybrid: "Hybrid", remote: "Remote" };

// Backfilling a later status records "applied" first, then that status
function buildEvents(status, appliedOn, statusOn) {
  const events = [{ status: "applied", date: appliedOn }];
  if (status !== "applied") {
    events.push({ status, date: statusOn });
  }
  return events;
}

function validate({ company, role, status, appliedOn, statusOn }) {
  const errors = [];
  const now = today();
  if (!company.trim()) errors.push("Company is required.");
  if (!role.trim()) errors.push("Role is required.");
  if (!appliedOn) errors.push("Applied date is required.");
  else if (appliedOn > now) errors.push("Applied date can't be in the future.");
  if (status !== "applied") {
    if (!statusOn) errors.push("Status date is required.");
    else if (statusOn > now) errors.push("Status date can't be in the future.");
    else if (appliedOn && statusOn < appliedOn)
      errors.push("Status date can't be before the applied date.");
  }
  return errors;
}

export default function NewApplication() {
  const addApplication = useAddApplication();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("applied");
  const [workMode, setWorkMode] = useState("onsite");
  const [appliedOn, setAppliedOn] = useState(today);
  const [statusOn, setStatusOn] = useState(today);

  const errors = validate({ company, role, status, appliedOn, statusOn });
  const draft = {
    company: company || "Company name",
    role: role || "Role",
    workMode,
    events: buildEvents(status, appliedOn || today(), statusOn || today()),
  };

  return (
    <div className="new-application-form">
      <h2>New Application</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (errors.length > 0) return;
          addApplication.mutate({
            id: crypto.randomUUID(),
            company: company.trim(),
            role: role.trim(),
            workMode,
            events: buildEvents(status, appliedOn, statusOn),
          });
          setCompany("");
          setRole("");
          setStatus("applied");
          setWorkMode("onsite");
          setAppliedOn(today());
          setStatusOn(today());
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
          <label htmlFor="applied-on">Applied on:</label>
          <input
            type="date"
            name="applied-on"
            id="applied-on"
            max={today()}
            value={appliedOn}
            onChange={(e) => setAppliedOn(e.target.value)}
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
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {status !== "applied" && (
            <div>
              <label htmlFor="status-on">Status since:</label>
              <input
                type="date"
                name="status-on"
                id="status-on"
                min={appliedOn}
                max={today()}
                value={statusOn}
                onChange={(e) => setStatusOn(e.target.value)}
              />
            </div>
          )}

          <label>Work Mode</label>
          <div>
            {Object.entries(WORK_MODES).map(([mode, label]) => (
              <span key={mode}>
                <input
                  checked={workMode === mode}
                  onChange={(e) => setWorkMode(e.target.value)}
                  type="radio"
                  name="work-mode"
                  value={mode}
                  id={`mode-${mode}`}
                />
                <label htmlFor={`mode-${mode}`}>{label}</label>
              </span>
            ))}
          </div>
        </div>

        <div className="new-application-preview">
          <ApplicationCard application={draft} preview />
        </div>

        {(company || role) && errors.length > 0 && (
          <ul className="form-errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <button type="submit" disabled={errors.length > 0}>
          Add Application
        </button>
      </form>
    </div>
  );
}
