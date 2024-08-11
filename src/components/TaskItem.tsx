
import React from 'react';
import { Task } from '../types'; // Import Task type

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const handleEdit = () => onEdit(task);
  const handleDelete = () => {
    if (task.id !== undefined) onDelete(task.id);
  };

  return (
    <li className="task-item">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <button className="edit-button" onClick={handleEdit}>Edit</button>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>
      <div className="task-details">
        <p className="task-description">{task.description}</p>
        <p className="task-due-date">Due: {task.dueDate}</p>
        <p className="task-assigned-to">Assigned To: {task.assignedTo}</p>
        <p className="task-status">Status: {task.status}</p>
      </div>
    </li>
  );
};

export default TaskItem;
