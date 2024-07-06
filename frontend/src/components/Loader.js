import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <Spinner animation="border" role="status" style={{ margin: "auto" }}>
      <span style={{ margin: "auto" }} className="visually-hidden">
        Loading...
      </span>
    </Spinner>
  );
}

export default Loader;
