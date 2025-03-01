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
      <div className="app-container">
        {/* 📌 Sidebar menu */}
        <nav className="sidebar">
          <h2 className="sidebar-title">Menu</h2>
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

          <h2 className="sidebar-title">Support</h2>
          <NavLink to="/help" className="navlink">
            Help
          </NavLink>
          <NavLink to="/logout" className="navlink">
            Log Out
          </NavLink>
        </nav>

        {/* 📌 Main content */}
        <div className="content">
          <Routes>
            <Route path="/create" element={<CreateTaskPage />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="*" element={<CreateTaskPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
