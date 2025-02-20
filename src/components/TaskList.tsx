// src/components/TaskList.tsx
import React, { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../api/tasks";
import EditTaskForm from "./EditTaskForm";
import styles from "./TaskList.module.css";

interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string;
  finish_date: string;
  status: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Tasklarni olishda xato:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskUpdated = async (updatedTask: Task) => {
    try {
      await updateTask(updatedTask.id, updatedTask);
      setEditingTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error("Task yangilashda xato:", error);
    }
  };

  // const handleToggleStatus = async (id: number) => {
  //   const task = tasks.find((t) => t.id === id);
  //   if (!task) return;
  //   const updatedTask = {
  //     ...task,
  //     status: task.status === "incomplete" ? "completed" : "incomplete",
  //   };
  //   try {
  //     await updateTask(id, updatedTask);
  //     fetchTasks();
  //   } catch (error) {
  //     console.error("Status yangilashda xato:", error);
  //   }
  // };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Task o‘chirishda xato:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Vazifalar ro‘yxati</h2>
      <table className={styles.taskTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vazifa nomi</th>
            <th>Boshlanish</th>
            <th>Tugash</th>
            <th>Status</th>
            <th>Tavsif</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className={styles.tableRow}>
              {editingTaskId === task.id ? (
                <td colSpan={7}>
                  <EditTaskForm
                    task={task}
                    onSave={handleTaskUpdated}
                    onCancel={() => setEditingTaskId(null)}
                  />
                </td>
              ) : (
                <>
                  <td>{task.id}</td>
                  <td className={styles.taskName}>{task.name}</td>
                  <td className={styles.taskDates}>{task.due_date}</td>
                  <td className={styles.taskDates}>{task.finish_date}</td>
                  <td
                    className={`taskStatus ${
                      task.status === "new task"
                        ? "new task"
                        : task.status === "proceed"
                        ? "proceed"
                        : task.status === "completed"
                        ? "completed"
                        : ""
                    }`}
                  >
                    {task.status}
                  </td>
                  <td className={styles.taskDescription}>{task.description}</td>
                  <td className={styles.buttonGroup}>
                    <button
                      className={`${styles.button} ${styles.editButton}`}
                      onClick={() => setEditingTaskId(task.id)}
                    >
                      Tahrirlash
                    </button>
                    {/* <button
                      className={`${styles.button} ${styles.toggleButton}`}
                      onClick={() => handleToggleStatus(task.id)}
                    >
                      {task.status === "incomplete"
                        ? "Bajarilgan deb belgilash"
                        : "Qayta bajarilmagan"}
                    </button> */}
                    <button
                      className={`${styles.button} ${styles.deleteButton}`}
                      onClick={() => handleDelete(task.id)}
                    >
                      O‘chirish
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
