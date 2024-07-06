import React, { useEffect } from "react";
import { Alert, Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toDoDeleteAction, toDoListAction } from "../redux/actions/todoActions";
import Loader from "./Loader";
import Swal from "sweetalert2";
import Message from "./Message";
import "../App.css";
import { Link } from "react-router-dom";
import { TODO_DELETE_RESET } from "../redux/constants/todoConstants";
import ShowTimer from "../timer/ShowTimer";

const ToDoList = () => {
  const dispatch = useDispatch();
  const { error, toDos, loading, total } = useSelector(
    (state) => state.toDoList
  );
  const { success } = useSelector((state) => state.toDoDelete);

  useEffect(() => {
    if (success) {
      dispatch(toDoListAction());
      dispatch({ type: TODO_DELETE_RESET });
      Swal.fire("Deleted!", "ToDo Deleted Successfully.", "success");
    }
    dispatch(toDoListAction());
  }, [success, dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(toDoDeleteAction(id));
      }
    });
  };
  return (
    <>
      {total > 0 ? (
        <Row className="mt-3">
          <Col md={8}>
            <Alert variant="info">
              Total <span style={{ fontWeight: "bolder" }}>{total}</span>
            </Alert>
          </Col>
          <Col md={4}>
            <Link to={`/form`}>
              <Button variant="success">
                Create ToDo <i class="fa-solid fa-plus fa-beat-fade fa-lg"></i>
              </Button>
            </Link>
          </Col>
        </Row>
      ) : (
        <Alert variant="danger" style={{ maxWidth: "50%" }}>
          <span style={{ fontWeight: "bolder" }}>
            List is empty click here to add some todo
          </span>
        </Alert>
      )}
      {error ? (
        <Message variant={"danger"} message={error} />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>STATUS</th>
              <th>DUE</th>
              <th>DATE CREATED</th>
              <th>TIME LEFT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Loader />
            ) : (
              toDos &&
              toDos.map((toDo) => (
                <tr key={toDo._id} className="fixHeight">
                  <td>{toDo._id}</td>
                  <td>{toDo.title}</td>
                  <td>
                    {toDo.status ? (
                      <i
                        className="fa-regular fa-circle-check fa-beat-fade fa-lg"
                        style={{ color: "#048b38" }}
                      ></i>
                    ) : (
                      <i
                        className="fa-regular fa-hourglass-half fa-lg"
                        style={{ color: "#fc9403" }}
                      ></i>
                    )}
                  </td>
                  <td>{toDo.dueDate}</td>
                  <td>{toDo.updatedAt.substring(0, 10)}</td>
                  <td>
                    <ShowTimer time={new Date(toDo.dueDate)} />
                  </td>
                  <td>
                    <div className="d-flex justify-content-between h-100 align-items-center">
                      <span onClick={() => handleDelete(toDo._id)}>
                        {" "}
                        <i
                          className="fa-solid fa-trash fa-lg"
                          style={{ color: "#d90238" }}
                        ></i>
                      </span>
                      <Link to={`/form/${toDo._id}`}>
                        <span>
                          {" "}
                          <i
                            className="fa-solid fa-pen-to-square fa-lg"
                            style={{ color: "#d89503" }}
                          ></i>
                        </span>
                      </Link>
                      <Link to={`/form/${toDo._id}`}>
                        <span>
                          {" "}
                          <i
                            className="fa-solid fa-circle-info fa-lg"
                            style={{ color: "#1500b3" }}
                          ></i>
                        </span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ToDoList;
