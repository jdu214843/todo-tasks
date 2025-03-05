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

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Task o‘chirishda xato:", error);
    }
  };

  const renderTaskCards = (status: string, title: string) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    return (
      <div className={styles.taskColumn}>
        <h3 className={styles.columnTitle}>{title}</h3>
        {filteredTasks.map((task) => (
          <div key={task.id} className={styles.taskCard}>
            {editingTaskId === task.id ? (
              <EditTaskForm
                task={task}
                onSave={handleTaskUpdated}
                onCancel={() => setEditingTaskId(null)}
              />
            ) : (
              <>
                <h4 className={styles.taskName}>{task.name}</h4>
                <p className={styles.titleDescribe}>Describe</p>
                <p className={styles.taskDescription}>{task.description}</p>
                <p className={styles.taskDates}>
                  Boshlanish: {task.due_date} | Tugash: {task.finish_date}
                </p>
                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.button} ${styles.editButton}`}
                    onClick={() => setEditingTaskId(task.id)}
                  >
                    Tahrirlash
                  </button>
                  <button
                    className={`${styles.button} ${styles.deleteButton}`}
                    onClick={() => handleDelete(task.id)}
                  >
                    O‘chirish
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.taskBoard}>
      {renderTaskCards("New task", "To Do")}
      {renderTaskCards("process", "In Progress")}
      {renderTaskCards("completed", "Done")}
    </div>
  );
};

export default TaskList;
