import { createTask } from "../api/tasks";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState, FormEvent } from "react";

interface TaskFormProps {
  onTaskCreated: (task: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [finishDate, setFinishDate] = useState<Date | null>(null);
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
      due_date: dueDate?.toISOString().split("T")[0],
      finish_date: finishDate?.toISOString().split("T")[0],
      status,
    };
    try {
      const created = await createTask(newTask);
      onTaskCreated(created);
      setName("");
      setDescription("");
      setDueDate(null);
      setFinishDate(null);
      setStatus("New task");
    } catch (error) {
      console.error("Task qo‘shishda xatolik:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <TextField
            label="Vazifa nomi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Tavsif"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Boshlanish muddati"
              value={dueDate}
              onChange={(date) => setDueDate(date)}
              slotProps={{ textField: { fullWidth: true } }}
            />
            <DatePicker
              label="Tugash muddati"
              value={finishDate}
              onChange={(date) => setFinishDate(date)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="New task">New task</MenuItem>
              <MenuItem value="process">Process</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Vazifa qo‘shish
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
