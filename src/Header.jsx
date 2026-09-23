import { Link } from "@tanstack/react-router";
import { useApplications } from "./useApplications";

export default function Header() {
  const { data: applications } = useApplications();

  return (
    <nav>
      <Link to="/">
        <h1 className="logo">Job Radar</h1>
      </Link>
      <div className="nav-links">
        <Link to="/">Board</Link> <Link to="/stats">Stats</Link>
      </div>
      <div className="nav-count">{applications?.length ?? 0} applications</div>
    </nav>
  );
}
