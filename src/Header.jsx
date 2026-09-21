import { useContext } from "react";
import { ApplicationsContext } from "./contexts";

export default function Header() {
  const [applications] = useContext(ApplicationsContext);

  return (
    <nav>
      <h1 className="logo">Job Radar --lets goooo^^</h1>
      <div className="nav-count">{applications.length} applications</div>
    </nav>
  );
}
