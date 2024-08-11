import React from 'react';
import { Task } from '../types'; // Import Task type

interface CategorySliderProps {
  currentCategory: string;
  onChange: (status: string) => void;
  tasks: Task[];
}

const CategorySlider: React.FC<CategorySliderProps> = ({ currentCategory, onChange, tasks }) => {
  const categories = ['To Do', 'In Progress', 'Done'];

  // Debugging: Check the tasks being filtered
  const taskCounts = categories.reduce((counts, category) => {
    counts[category] = tasks.filter(task => task.status === category).length;
    return counts;
  }, {} as Record<string, number>);

  console.log('Task Counts:', taskCounts);

  return (
    <div className="category-slider">
      {categories.map(category => (
        <button
          key={category}
          className={`category-button ${currentCategory === category ? 'active' : ''}`}
          onClick={() => onChange(category)}
        >
          {category} ({taskCounts[category]})
        </button>
      ))}
    </div>
  );
};

export default CategorySlider;
