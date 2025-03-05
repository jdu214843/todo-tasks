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
    <form onSubmit={handleSubmit}>
      {[
        {
          label: "タスク名前",
          type: "text",
          name: "name",
          value: formData.name,
        },
        {
          label: "締め切りの時間",
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
        <label className={styles.label}>内容:</label>
        <textarea
          name="description"
          value={formData.description}
          className={styles.textarea}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>状態:</label>
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
          保存する
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`${styles.button} ${styles.cancelButton}`}
        >
          キャンセル
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
