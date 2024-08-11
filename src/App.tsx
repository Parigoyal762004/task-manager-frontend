import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';
import CategorySlider from './components/CategorySlider';
import Navbar from './components/Navbar';
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCards';
import { Task } from './types'; // Import Task type
import './App.css'; // Import CSS for App styling

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentCategory, setCurrentCategory] = useState('To Do');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
        filterTasks(data, searchQuery, currentCategory);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, [searchQuery, currentCategory]);

  const filterTasks = (tasks: Task[], query: string, category: string) => {
    const now = new Date();
    
    // Mark tasks as expired based on due date
    const updatedTasks = tasks.map(task => {
      if (new Date(task.dueDate) < now && task.status !== 'Done') {
        return { ...task, status: 'Timeout' };
      }
      return task;
    });

    const filtered = updatedTasks.filter(task =>
      task.title.toLowerCase().includes(query.toLowerCase()) &&
      (category === 'All' || task.status === category)
    );

    setFilteredTasks(filtered);
  };

  const handleAddOrUpdateTask = async (task: Task) => {
    if (task.id) {
      try {
        const updatedTask = await updateTask(task.id, task);
        setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
        filterTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)), searchQuery, currentCategory);
        setSuccessMessage('Task updated successfully!');
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    } else {
      try {
        const createdTask = await createTask(task);
        setTasks([...tasks, createdTask]);
        filterTasks([...tasks, createdTask], searchQuery, currentCategory);
        setSuccessMessage('New task has been created successfully!');
      } catch (error) {
        console.error('Failed to create task:', error);
      }
    }
    setEditingTask(null);
    setShowTaskForm(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      filterTasks(updatedTasks, searchQuery, currentCategory);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterTasks(tasks, query, currentCategory);
  };

  const handleFilterChange = (status: string) => {
    setCurrentCategory(status);
    filterTasks(tasks, searchQuery, status);
  };

  // Calculate task counts
  const expiredTasks = tasks.filter(task => task.status === 'Timeout').length;
  const activeTasks = tasks.filter(task => ['To Do', 'In Progress'].includes(task.status)).length;
  const completedTasks = tasks.filter(task => task.status === 'Done').length;

  return (
    <div className="app-container">
      <Navbar onSearch={handleSearch} onFilterChange={handleFilterChange} />

      <div className="main-content">
        <div className="sidebar">
          <TaskCard
            title="Expired Tasks"
            count={expiredTasks}
            backgroundColor="#f8d7da"
          />
          <TaskCard
            title="Active Tasks"
            count={activeTasks}
            backgroundColor="#d1ecf1"
          />
          <TaskCard
            title="Completed Tasks"
            count={completedTasks}
            backgroundColor="#d4edda"
          />
          <button
            className="add-task-button"
            onClick={() => {
              setEditingTask(null);
              setShowTaskForm(true);
            }}
          >
            Add Task
          </button>
        </div>

        <div className="task-area">
          {showTaskForm && (
            <TaskForm
              onSubmit={handleAddOrUpdateTask}
              taskToEdit={editingTask}
              onClose={() => setShowTaskForm(false)}
            />
          )}
          <CategorySlider
            currentCategory={currentCategory}
            onChange={handleFilterChange}
            tasks={tasks}
          />
          <ul className="task-list">
            {filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </ul>
          {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default App;
