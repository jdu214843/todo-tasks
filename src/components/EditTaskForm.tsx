// src/components/EditTaskForm.tsx
import React, { useState, FormEvent } from "react";
import styles from "./EditTaskForm.module.css";

interface EditTaskFormProps {
  task: {
    id: number;
    name: string;
    description: string;
    due_date: string;
    finish_date: string;
    status: string;
  };
  onSave: (updatedTask: any) => void;
  onCancel: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  task,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.due_date);
  const [finishDate, setFinishDate] = useState(task.finish_date);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      name,
      description,
      due_date: dueDate,
      finish_date: finishDate,
      status,
    };
    onSave(updatedTask);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Vazifa nomi:</label>
        <input
          type="text"
          value={name}
          className={styles.input}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Tavsif:</label>
        <textarea
          value={description}
          className={styles.textarea}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Boshlanish muddati:</label>
        <input
          type="date"
          value={dueDate}
          className={styles.input}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Tugash muddati:</label>
        <input
          type="date"
          value={finishDate}
          className={styles.input}
          onChange={(e) => setFinishDate(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Status:</label>
        <select
          value={status}
          className={styles.select}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="New task">New task</option>
          <option value="process">Process</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className={styles.buttonGroup}>
        <button
          type="submit"
          className={`${styles.button} ${styles.saveButton}`}
        >
          Saqlash
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`${styles.button} ${styles.cancelButton}`}
        >
          Bekor qilish
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
