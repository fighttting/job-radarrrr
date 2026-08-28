const ApplicationCard = (props) => {
  return React.createElement(
    "div",
    {},
    React.createElement("h2", {}, props.company),
    React.createElement("p", {}, props.role),
    React.createElement("small", {}, props.status),
  );
};

const App = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "applied"),
    React.createElement(ApplicationCard, {
      company: "Zalando",
      role: "Frontend Intern",
      status: "applied",
    }),
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
