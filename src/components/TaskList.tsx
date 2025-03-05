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
                内容
              </p>
              <p className={styles.taskDescription}>
                {task.description.length > 100
                  ? task.description.substring(0, 100) + "..."
                  : task.description}
              </p>
              <p className={styles.taskDates}>
                <p className={styles.taskDatesWhite}>始まる: {task.due_date}</p>{" "}
                <p className={styles.taskDatesRed}>
                  締め切り: {task.finish_date}
                </p>
              </p>
              <div className={styles.buttonGroup}>
                <button
                  className={`${styles.button} ${styles.editButton}`}
                  onClick={(e) => handleEditClick(task, e)} // ✅ Edit tugmasi bosilganda modal ochiladi
                >
                  編集
                </button>
                <button
                  className={`${styles.button} ${styles.deleteButton}`}
                  onClick={(e) => handleDelete(task.id, e)}
                >
                  消去
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
      {renderTaskCards("New task", "やることリスト")}
      {renderTaskCards("process", "進行中")}
      {renderTaskCards("completed", "終わり")}

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
              始まる: {expandedTask.due_date} | 締め切り:{" "}
              {expandedTask.finish_date}
            </p>
            <button
              className={styles.closeButton}
              onClick={() => setExpandedTask(null)}
            >
              キャンセル
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
