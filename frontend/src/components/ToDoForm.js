import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  FloatingLabel,
  Form,
  ListGroup,
  Row,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  toDoCreateAction,
  toDoSingleAction,
  toDoUpdateAction,
} from "../redux/actions/todoActions";
import Loader from "./Loader";
import Message from "./Message";
import Swal from "sweetalert2";
import {
  TODO_CREATE_RESET,
  TODO_SINGLE_TODO_RESET,
  TODO_UPDATE_RESET,
} from "../redux/constants/todoConstants";
import ShowTimer from "../timer/ShowTimer";

const ToDoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleToDo, loading, error } = useSelector(
    (state) => state.toDoSingle
  );
  const { success } = useSelector((state) => state.toDoUpdate);
  const { success: creationSuccess } = useSelector((state) => state.toDoCreate);
  const ID = useParams().id;
  const [data, setData] = useState();

  useEffect(() => {
    if (ID) {
      dispatch(toDoSingleAction(ID));
    } else {
      dispatch({ type: TODO_SINGLE_TODO_RESET });
      setData({ title: "", description: "", dueDate: "" });
    }
  }, [dispatch, ID]);
  useEffect(() => {
    if (singleToDo) {
      setData(singleToDo);
    }
    if (success || creationSuccess) {
      Swal.fire({
        title: success ? "Updated!" : creationSuccess && "Created!",
        text: success
          ? "ToDo Updated Successfully!"
          : creationSuccess && "ToDo Created Successfully!",
        icon: "success",
      });
      success
        ? dispatch({ type: TODO_UPDATE_RESET })
        : creationSuccess && dispatch({ type: TODO_CREATE_RESET });
      navigate("/");
    }
  }, [singleToDo, success, navigate, creationSuccess, dispatch]);

  const handleUpdate = () => {
    if (data) {
      dispatch(toDoUpdateAction(ID, data));
    }
    console.log(data);
  };

  const handleCreate = () => {
    if (data.title && data.description && data.dueDate) {
      dispatch(toDoCreateAction(data));
    }
  };
  return (
    <>
      {loading ? (
        <Loader className="mt-3" />
      ) : error ? (
        <Message className="mt-3" message={error} variant={"danger"} />
      ) : (
        singleToDo && (
          <Row className="mt-3">
            {ID && (
              <Col md={4} lg={5}>
                <Card>
                  <Card.Header>
                    <span style={{ fontWeight: "bolder" }}>
                      {singleToDo._id}
                    </span>
                  </Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <span style={{ fontWeight: "bolder" }}>Title :</span>
                      <> {singleToDo.title}</>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span style={{ fontWeight: "bolder" }}>
                        Description :
                      </span>
                      <> {singleToDo.description}</>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span style={{ fontWeight: "bolder" }}>Status :</span>
                      {singleToDo.status ? (
                        <>
                          {" "}
                          <i
                            className="fa-regular fa-circle-check fa-beat-fade fa-lg"
                            style={{ color: "#048b38" }}
                          ></i>
                        </>
                      ) : (
                        <i
                          className="fa-regular fa-hourglass-half fa-lg"
                          style={{ color: "#fc9403" }}
                        ></i>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span style={{ fontWeight: "bolder" }}>DueDate :</span>
                      <> {singleToDo.dueDate}</>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span style={{ fontWeight: "bolder" }}>
                        Date Created :
                      </span>
                      <> {singleToDo.updatedAt?.substring(0, 10)}</>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span style={{ fontWeight: "bolder" }}>Time Left :</span>

                      <ShowTimer time={new Date(singleToDo?.dueDate)} />
                    </ListGroup.Item>
                    <ListGroup.Item onClick={() => navigate("/")}>
                      <i
                        className="fa-solid fa-arrow-left fa-flip-vertical fa-lg"
                        style={{ color: "#140542" }}
                      ></i>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            )}

            <Col md={8} lg={7}>
              <FloatingLabel
                controlId="floatingTitle"
                label="Title"
                className=" mb-3"
              >
                <Form.Control
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  type="text"
                  value={data?.title}
                  placeholder="Make Presentation..."
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingDescription"
                label="Description"
                className="mb-3"
              >
                <Form.Control
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  value={data?.description}
                  type="text"
                  placeholder="Description..."
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingDueDate"
                label="Due Date (YYYY-MM-DD)"
                className="mb-3"
                aria-placeholder="YYYY-MM-DD"
              >
                <Form.Control
                  onChange={(e) =>
                    setData({ ...data, dueDate: e.target.value })
                  }
                  value={data?.dueDate}
                  type="text"
                  placeholder="YYYY-MM-DD"
                />
              </FloatingLabel>
              {ID && (
                <FloatingLabel controlId="floatingStatus" className="mb-3">
                  <Form.Check
                    label="Status"
                    name="status"
                    type="checkbox"
                    value={singleToDo.status ? true : false}
                    checked={data?.status ? true : false}
                    onChange={(e) =>
                      setData({
                        ...data,
                        status: data.status === true ? false : true,
                      })
                    }
                  />
                </FloatingLabel>
              )}

              {ID ? (
                <Button variant="warning" onClick={handleUpdate}>
                  Update
                </Button>
              ) : (
                <Button variant="success" onClick={handleCreate}>
                  Create
                </Button>
              )}
            </Col>
          </Row>
        )
      )}
    </>
  );
};

export default ToDoForm;
