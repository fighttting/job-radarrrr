import { useState } from "react";
import {
  STATUSES,
  currentStatus,
  isValidUrl,
  lastUpdate,
  parseKeywords,
} from "./application";
import { daysBetween, today } from "./dates";
import {
  useChangeStatus,
  useDeleteApplication,
  useUpdateDetails,
} from "./useApplicationMutations";

const Details = ({ application }) => {
  const keywords = application.keywords ?? [];
  if (!application.jdUrl && keywords.length === 0) return null;

  return (
    <p className="application-details">
      {application.jdUrl && (
        <a href={application.jdUrl} target="_blank" rel="noopener noreferrer">
          JD ↗
        </a>
      )}
      {keywords.map((keyword) => (
        <span key={keyword} className="keyword">
          {" "}
          {keyword}
        </span>
      ))}
    </p>
  );
};

// Starts from the saved values; nothing is stored until Save
const DetailsForm = ({ application, onDone }) => {
  const updateDetails = useUpdateDetails();
  const [jdUrl, setJdUrl] = useState(application.jdUrl ?? "");
  const [keywordsText, setKeywordsText] = useState(
    (application.keywords ?? []).join(", "),
  );
  const urlError =
    jdUrl.trim() && !isValidUrl(jdUrl.trim())
      ? "JD link must start with http:// or https://."
      : null;

  return (
    <form
      className="details-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (urlError) return;
        updateDetails.mutate(
          {
            id: application.id,
            jdUrl: jdUrl.trim(),
            keywords: parseKeywords(keywordsText),
          },
          { onSuccess: onDone },
        );
      }}
    >
      <label htmlFor={`jd-url-${application.id}`}>JD link:</label>
      <input
        type="url"
        id={`jd-url-${application.id}`}
        placeholder="https://…"
        value={jdUrl}
        onChange={(e) => setJdUrl(e.target.value)}
      />
      <label htmlFor={`keywords-${application.id}`}>Keywords:</label>
      <input
        id={`keywords-${application.id}`}
        placeholder="React, AWS, visa"
        value={keywordsText}
        onChange={(e) => setKeywordsText(e.target.value)}
      />
      {urlError && <p className="form-errors">{urlError}</p>}
      <button type="submit" disabled={Boolean(urlError)}>
        Save
      </button>{" "}
      <button type="button" onClick={onDone}>
        Cancel
      </button>
    </form>
  );
};

const ApplicationCard = ({ application, preview = false }) => {
  const changeStatus = useChangeStatus();
  const deleteApplication = useDeleteApplication();
  const [editing, setEditing] = useState(false);
  const status = currentStatus(application);
  const days = daysBetween(lastUpdate(application), today());

  return (
    <div className="application-card">
      <h2>{application.company}</h2>
      <p>{application.role}</p>
      {preview ? (
        <>
          <small>
            {status} · {application.workMode}
          </small>
          <Details application={application} />
        </>
      ) : (
        <>
          <select
            aria-label="Status"
            value={status}
            onChange={(e) =>
              changeStatus.mutate({
                id: application.id,
                status: e.target.value,
              })
            }
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <small>
            {" "}
            {application.workMode} · {days} days since last update
          </small>
          {editing ? (
            <DetailsForm
              application={application}
              onDone={() => setEditing(false)}
            />
          ) : (
            <>
              <Details application={application} />
              <button onClick={() => setEditing(true)}>
                Edit details
              </button>{" "}
            </>
          )}
          <button
            onClick={() => {
              if (window.confirm(`Delete ${application.company}?`)) {
                deleteApplication.mutate(application.id);
              }
            }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};
export default ApplicationCard;
