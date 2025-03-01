// src/components/CreateTaskPage.tsx
import React from "react";
import TaskForm from "./TaskForm";

interface CreateTaskPageProps {
  // Agar kerak bo‘lsa, qo‘shimcha prop’lar qo‘shing.
}

const CreateTaskPage: React.FC<CreateTaskPageProps> = () => {
  const handleTaskCreated = (task: any) => {
    // Yangi vazifa qo‘shilganda qilinadigan ishlar, masalan, xabar ko‘rsatish
    alert("Yangi vazifa qo‘shildi:");
  };

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <h2>Create Task</h2>
      <TaskForm onTaskCreated={handleTaskCreated} />
    </div>
  );
};

export default CreateTaskPage;
