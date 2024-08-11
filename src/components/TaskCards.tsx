import React from 'react';

interface TaskCardProps {
  title: string;
  count: number;
  backgroundColor: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, count, backgroundColor }) => {
  return (
    <div style={{ backgroundColor, padding: '10px', borderRadius: '8px', margin: '10px', textAlign: 'center' }}>
      <h2>{title}</h2>
      <p>{count} Tasks</p>
    </div>
  );
};

export default TaskCard;
