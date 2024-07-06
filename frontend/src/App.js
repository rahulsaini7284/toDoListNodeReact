import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";
import Header from "./components/Header";
function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route Component={ToDoList} path="/" />
          <Route Component={ToDoForm} path="/form/:id" exact />
          <Route Component={ToDoForm} path="/form" exact />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
