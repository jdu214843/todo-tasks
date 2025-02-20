// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import TaskList from "./components/TaskList";
import CreateTaskPage from "./components/CreateTaskPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive ? "navlink active" : "navlink"
            }
          >
            Create Task
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive ? "navlink active" : "navlink"
            }
          >
            Vazifalar
          </NavLink>
        </nav>

        <Routes>
          <Route path="/create" element={<CreateTaskPage />} />
          <Route path="/tasks" element={<TaskList />} />
          {/* Standart holatda yo'naltirish */}
          <Route path="*" element={<CreateTaskPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
