import React, { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTask(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Nhập tên công việc........"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Thêm</button>
    </form>
  );
}
