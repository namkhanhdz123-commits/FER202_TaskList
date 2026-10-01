import React, { useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { initialTasks } from "./tasks";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", initialTasks);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Thêm công việc
  const handleAddTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  // Đánh dấu hoàn thành / chưa hoàn thành
  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // Xóa công việc
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Lọc theo từ khóa tìm kiếm & bộ lọc lọc trạng thái
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (filter === "active") return matchesSearch && !task.completed;
    if (filter === "completed") return matchesSearch && task.completed;
    return matchesSearch;
  });

  // Thống kê
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="main-card">
      <Header />

      <TaskForm onAddTask={handleAddTask} />

      {/* Bộ lọc và Tìm kiếm */}
      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="active">Chưa làm</option>
          <option value="completed">Hoàn thành</option>
        </select>

        <input
          type="text"
          placeholder="Tìm kiếm........"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Thống kê */}
      <div className="stats">
        <span>Tổng: {totalTasks}</span> | <span>Chưa làm: {pendingTasks}</span>{" "}
        | <span>Hoàn thành: {completedTasks}</span>
      </div>

      {/* Danh sách */}
      <TaskList
        tasks={filteredTasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
