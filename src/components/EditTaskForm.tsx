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
  const [formData, setFormData] = useState({
    name: task.name,
    description: task.description,
    due_date: task.due_date,
    finish_date: task.finish_date,
    status: task.status,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({ ...task, ...formData });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {[
        {
          label: "Vazifa nomi",
          type: "text",
          name: "name",
          value: formData.name,
        },
        {
          label: "Boshlanish muddati",
          type: "date",
          name: "due_date",
          value: formData.due_date,
        },
        {
          label: "Tugash muddati",
          type: "date",
          name: "finish_date",
          value: formData.finish_date,
        },
      ].map(({ label, type, name, value }) => (
        <div key={name} className={styles.field}>
          <label className={styles.label}>{label}:</label>
          <input
            type={type}
            name={name}
            value={value}
            className={styles.input}
            onChange={handleChange}
          />
        </div>
      ))}

      <div className={styles.field}>
        <label className={styles.label}>Tavsif:</label>
        <textarea
          name="description"
          value={formData.description}
          className={styles.textarea}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Status:</label>
        <select
          name="status"
          value={formData.status}
          className={styles.select}
          onChange={handleChange}
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
