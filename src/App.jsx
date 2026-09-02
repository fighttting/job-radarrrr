import { createRoot } from "react-dom/client";
import ApplicationCard from "./ApplicationCard";

// const ApplicationCard = (props) => {
//   return React.createElement(
//     "div",
//     {},
//     React.createElement("h2", {}, props.company),
//     React.createElement("p", {}, props.role),
//     React.createElement("small", {}, props.status),
//   );
// };

const App = () => {
  return (
    // "div",
    // {},
    // React.createElement("h1", {}, "Job Radar"),
    // React.createElement(ApplicationCard, {
    //   company: "Zalando",
    //   role: "Frontend Intern",
    //   status: "applied",
    // }),
    // React.createElement(ApplicationCard, {
    //   company: "Google",
    //   role: "Software Engineer",
    //   status: "interviewing",
    // }),
    // React.createElement(ApplicationCard, {
    //   company: "Facebook",
    //   role: "Backend Developer",
    //   status: "offer received",
    // }),
    <div>
      <h1>Job Radar - Let's Get Started^^</h1>
      <ApplicationCard company="Zalando" role="Frontend Intern" status="applied" />
      <ApplicationCard company="Google" role="Software Engineer" status="interviewing" />
      <ApplicationCard company="Facebook" role="Backend Developer" status="offer received" />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
