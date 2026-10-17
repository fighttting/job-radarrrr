import { Link } from "@tanstack/react-router";
import { useApplications } from "./useApplications";

export default function Header() {
  const { isLoading, error, data: applications } = useApplications();

  let count;
  if (isLoading) {
    count = "…";
  } else if (error) {
    count = "Error";
  } else {
    count = applications.length;
  }

  return (
    <nav>
      <Link to="/">
        <h1 className="logo">Job Radar</h1>
      </Link>
      <div className="nav-links">
        <Link to="/" activeOptions={{ exact: true }}>
          Board
        </Link>{" "}
        <Link to="/stats">Stats</Link>
      </div>
      <div className="nav-count">{count} applications</div>
    </nav>
  );
}
