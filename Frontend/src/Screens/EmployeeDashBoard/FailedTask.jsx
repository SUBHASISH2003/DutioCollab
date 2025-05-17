import React from 'react';
import '../../css/EmployeeDash/FailedTask.css'; // Importing the external CSS

const tasks = [
  {
    title: 'Design New UI',
    description: 'Create a modern user interface for the new website.',
    deadline: '2025-02-10',
    assignedEmployees: 5,
  },
  {
    title: 'Fix Bug in App',
    description: 'Resolve the crash occurring on login.',
    deadline: '2025-02-12',
    assignedEmployees: 3,
  },
  
];

const FailedTask = () => {
  return (
    <div className="failed-container-employee-dash">
      <h2 className="failed-title">Failed Tasks</h2>
      <div className="failed-task-list">
        {tasks.map((task, index) => (
          <div key={index} className="failed-task-card">
            <div className="failed-task-header">
              <h3 className="failed-task-title">{task.title}</h3>
              <span className="failed-task-deadline">{task.deadline}</span>
            </div>
            <p className="failed-task-description">{task.description}</p>
            <div className="failed-task-footer">
              <span className="failed-assigned-employees">
                {task.assignedEmployees} Employee(s) Assigned
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FailedTask;
