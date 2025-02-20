// src/components/TaskForm.tsx
import React, { useState, FormEvent } from "react";
import { createTask } from "../api/tasks";
import styles from "./TaskForm.module.css";

interface TaskFormProps {
  onTaskCreated: (task: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [status, setStatus] = useState("New task");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert("Vazifa nomi kiritilishi shart!");
      return;
    }
    const newTask = {
      name,
      description,
      due_date: dueDate,
      finish_date: finishDate,
      status,
    };

    console.log("Yuborilayotgan finish_date:", finishDate);

    try {
      const created = await createTask(newTask);
      onTaskCreated(created);
      setName("");
      setDescription("");
      setDueDate("");
      setFinishDate("");
      setStatus("New task");
    } catch (error) {
      console.error("Task qo‘shishda xatolik:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label className={styles.label}>Vazifa nomi:</label>
        <input
          type="text"
          value={name}
          className={styles.input}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className={styles.label}>Tavsif:</label>
        <textarea
          value={description}
          className={styles.input}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label className={styles.label}>Boshlanish muddati:</label>
        <input
          type="date"
          value={dueDate}
          className={styles.input}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div>
        <label className={styles.label}>Tugash muddati:</label>
        <input
          type="date"
          value={finishDate}
          className={styles.input}
          onChange={(e) => setFinishDate(e.target.value)}
        />
      </div>
      <div>
        <label className={styles.label}>Status:</label>
        <select
          value={status}
          className={styles.input}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="New task">New task</option>
          <option value="process">Process</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" className={styles.button}>
        Vazifa qo‘shish
      </button>
    </form>
  );
};

export default TaskForm;
