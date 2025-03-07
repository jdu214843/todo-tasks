// server.js
const express = require("express");
const cors = require("cors");
const db = require("./database.js"); // avval yaratilgan database.js

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // JSON formatidagi ma'lumotlarni qabul qilish

// 1. Task qo'shish (Create)
app.post("/tasks", (req, res) => {
  const { name, description, due_date, finish_date, status } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Task name is required" });
  }
  const sql = `INSERT INTO tasks (name, description, due_date, finish_date, status)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [
    name,
    description || "",
    due_date || "",
    finish_date || "",
    status || "incomplete",
  ];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({
      id: this.lastID,
      name,
      description,
      due_date,
      finish_date,
      status: status || "incomplete",
    });
  });
});

// 2. Tasklarni ko'rish (Read)
app.get("/tasks", (req, res) => {
  const sql = "SELECT * FROM tasks";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 3. Taskni yangilash (Update)
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, due_date, finish_date, status } = req.body;
  if (!name || !status) {
    return res.status(400).json({ error: "Task name and status are required" });
  }
  const sql = `UPDATE tasks SET name = ?, description = ?, due_date = ?, finish_date = ?, status = ?
               WHERE id = ?`;
  const params = [
    name,
    description || "",
    due_date || "",
    finish_date || "",
    status,
    id,
  ];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Task updated successfully", changes: this.changes });
  });
});

// 4. Taskni o'chirish (Delete)
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM tasks WHERE id = ?`;
  db.run(sql, id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Task deleted successfully", changes: this.changes });
  });
});

// Serverni ishga tushurish
app.listen(PORT, () => {
  console.log(`Server port ${PORT} da ishga tushdi...`);
});
