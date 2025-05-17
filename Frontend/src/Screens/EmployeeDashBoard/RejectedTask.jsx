import React from 'react';
import '../../css/EmployeeDash/RejectedTask.css'; // Importing the external CSS

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
  {
    title: 'Develop API for User Authentication',
    description: 'Develop a secure API for user login and authentication using JWT.',
    deadline: '2025-02-15',
    assignedEmployees: 4,
  },
  {
    title: 'Write Unit Tests for Payment Module',
    description: 'Write comprehensive unit tests for the payment processing module to ensure reliability.',
    deadline: '2025-02-20',
    assignedEmployees: 2,
  }
];

const RejectedTask = () => {
  return (
    <div className="rejected-container-employee-dash">
      <h2 className="rejected-title">Rejected Tasks</h2>
      <div className="rejected-task-list">
        {tasks.map((task, index) => (
          <div key={index} className="rejected-task-card">
            <div className="rejected-task-header">
              <h3 className="rejected-task-title">{task.title}</h3>
              <span className="rejected-task-deadline">{task.deadline}</span>
            </div>
            <p className="rejected-task-description">{task.description}</p>
            <div className="rejected-task-footer">
              <span className="rejected-assigned-employees">
                {task.assignedEmployees} Employee(s) Assigned
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RejectedTask;
