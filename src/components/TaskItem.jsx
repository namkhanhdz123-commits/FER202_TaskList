import React from "react";

export default function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className="task-item">
      <label className={task.completed ? "completed" : ""}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
        />
        <span>{task.title}</span>
      </label>
      <button onClick={() => onDeleteTask(task.id)}>Xóa</button>
    </li>
  );
}
