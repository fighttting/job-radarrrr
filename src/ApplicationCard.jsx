import { STATUSES, currentStatus, lastUpdate } from "./application";
import { daysBetween, today } from "./dates";
import {
  useChangeStatus,
  useDeleteApplication,
} from "./useApplicationMutations";

const ApplicationCard = ({ application, preview = false }) => {
  const changeStatus = useChangeStatus();
  const deleteApplication = useDeleteApplication();
  const status = currentStatus(application);
  const days = daysBetween(lastUpdate(application), today());

  return (
    <div className="application-card">
      <h2>{application.company}</h2>
      <p>{application.role}</p>
      {preview ? (
        <small>
          {status} · {application.workMode}
        </small>
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
          </small>{" "}
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
