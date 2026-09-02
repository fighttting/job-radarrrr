const ApplicationCard = (props) => {
    return (
        <div className="application-card">
            <h2>{props.company}</h2>
            <p>{props.role}</p>
            <small>{props.status}</small>
        </div>
    );
}
export default ApplicationCard;
