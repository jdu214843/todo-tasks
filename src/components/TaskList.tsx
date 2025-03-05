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
  const [expandedTask, setExpandedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // ✅ Edit modal uchun state

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
      setEditingTask(null); // ✅ Modalni yopish
      fetchTasks();
    } catch (error) {
      console.error("Task yangilashda xato:", error);
    }
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Task o‘chirishda xato:", error);
    }
  };

  const handleEditClick = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ Modal holatini buzmaslik uchun
    setEditingTask(task);
  };

  const closeEditModal = () => {
    setEditingTask(null);
  };

  const renderTaskCards = (status: string, title: string) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    return (
      <div className={styles.taskColumn}>
        <h3 className={styles.columnTitle}>{title}</h3>
        {filteredTasks.map((task) => (
          <div key={task.id} className={styles.taskCard}>
            <>
              <h4 className={styles.taskName}>{task.name}</h4>
              <p
                className={styles.titleDescribe}
                onClick={() => setExpandedTask(task)} // ✅ Describe bosilganda modal ochiladi
              >
                Describe
              </p>
              <p className={styles.taskDescription}>
                {task.description.length > 100
                  ? task.description.substring(0, 100) + "..."
                  : task.description}
              </p>
              <p className={styles.taskDates}>
                Boshlanish: {task.due_date} | Tugash: {task.finish_date}
              </p>
              <div className={styles.buttonGroup}>
                <button
                  className={`${styles.button} ${styles.editButton}`}
                  onClick={(e) => handleEditClick(task, e)} // ✅ Edit tugmasi bosilganda modal ochiladi
                >
                  Tahrirlash
                </button>
                <button
                  className={`${styles.button} ${styles.deleteButton}`}
                  onClick={(e) => handleDelete(task.id, e)}
                >
                  O‘chirish
                </button>
              </div>
            </>
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

      {/* Describe Modal */}
      {expandedTask && (
        <div
          className={styles.modalOverlay}
          onClick={() => setExpandedTask(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{expandedTask.name}</h2>
            <p>{expandedTask.description}</p>
            <p>
              Boshlanish: {expandedTask.due_date} | Tugash:{" "}
              {expandedTask.finish_date}
            </p>
            <button
              className={styles.closeButton}
              onClick={() => setExpandedTask(null)}
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingTask && (
        <div className={styles.modalOverlay} onClick={closeEditModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Vazifani Tahrirlash</h2>
            <EditTaskForm
              task={editingTask}
              onSave={handleTaskUpdated}
              onCancel={closeEditModal} // ✅ Bekor qilish tugmasi modalni yopadi
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
