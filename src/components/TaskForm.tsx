import React, { useState, useEffect } from 'react';
import { Task } from '../types'; // Import Task type


interface TaskFormProps {
  onSubmit: (task: Task) => void;
  taskToEdit: Task | null;
  onClose: () => void; // Function to close the form
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, taskToEdit, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('To Do');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
      setAssignedTo(taskToEdit.assignedTo);
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Debugging: Log the task details before submitting
    console.log('Submitting Task:', {
      title,
      description,
      dueDate,
      assignedTo,
      status,
    });

    onSubmit({
      id: taskToEdit?.id, // Optional
      title,
      description,
      dueDate,
      assignedTo,
      status,
    });

    // Close form after submission
    onClose();
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-container">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Task Name:
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Due Date:
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              required
            />
          </label>
          <label>
            Assigned To:
            <input
              type="text"
              value={assignedTo}
              onChange={e => setAssignedTo(e.target.value)}
              required
            />
          </label>
          <label>
            Status:
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
              <option value="Timeout">Timeout</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
