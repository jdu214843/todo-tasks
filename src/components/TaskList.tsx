import React, { useEffect, useState, useRef } from "react";
import { getTasks, updateTask, deleteTask } from "../api/tasks";
import EditTaskForm from "./EditTaskForm";
import styles from "./TaskList.module.css";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

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
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sliderRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      setEditingTask(null);
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
    e.stopPropagation();
    setEditingTask(task);
  };

  const closeEditModal = () => {
    setEditingTask(null);
  };

  const renderTaskCards = (status: string, title: string) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    const statusClass =
      status === "New task"
        ? styles.newTask
        : status === "process"
        ? styles.inProgress
        : styles.completed;
    return (
      <div className={styles.taskColumn}>
        <h3 className={`${styles.columnTitle} ${statusClass}`}>{title}</h3>
        {filteredTasks.map((task) => (
          <div key={task.id} className={styles.taskCard}>
            <h4 className={styles.taskName}>{task.name}</h4>
            <p
              className={styles.titleDescribe}
              onClick={() => setExpandedTask(task)}
            >
              内容を見る
            </p>
            <p className={styles.taskDescription}>
              {task.description.length > 100
                ? task.description.substring(0, 100) + "..."
                : task.description}
            </p>
            {!expandedTask && (
              <div className={styles.taskDates}>
                <p className={styles.taskDatesWhite}>始まる: {task.due_date}</p>
                <p className={styles.taskDatesRed}>
                  締め切り: {task.finish_date}
                </p>
              </div>
            )}
            <div className={styles.buttonGroup}>
              <IconButton
                sx={{ color: "blue" }}
                onClick={(e) => handleEditClick(task, e)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{ color: "red" }}
                onClick={(e) => handleDelete(task.id, e)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const statusLabels: { [key: string]: string } = {
    "New task": "やることリスト",
    process: "進行中",
    completed: "終わり",
  };

  return (
    <div className={styles.taskBoard}>
      {isMobile ? (
        <div className={styles.carouselContainer}>
          <Carousel
            autoplay
            dots={true}
            ref={sliderRef}
            autoplaySpeed={5000}
            arrows={false}
            effect="scrollx"
          >
            {["New task", "process", "completed"].map((status, index) => (
              <div key={index}>
                {renderTaskCards(status, statusLabels[status])}
              </div>
            ))}
          </Carousel>
          <button
            className={styles.arrowButton}
            style={{ left: "10px" }}
            onClick={() => sliderRef.current?.prev()}
          >
            <LeftOutlined />
          </button>
          <button
            className={styles.arrowButton}
            style={{ right: "10px" }}
            onClick={() => sliderRef.current?.next()}
          >
            <RightOutlined />
          </button>
        </div>
      ) : (
        <>
          {renderTaskCards("New task", statusLabels["New task"])}
          {renderTaskCards("process", statusLabels["process"])}
          {renderTaskCards("completed", statusLabels["completed"])}
        </>
      )}
      {expandedTask && (
        <div
          className={styles.modalOverlay}
          onClick={() => setExpandedTask(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTaskName}>{expandedTask.name}</h2>
            <p className={styles.modalTaskDescription}>
              {expandedTask.description}
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

      {editingTask && (
        <div className={styles.modalOverlay} onClick={closeEditModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <EditTaskForm
              task={editingTask}
              onSave={handleTaskUpdated}
              onCancel={closeEditModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
