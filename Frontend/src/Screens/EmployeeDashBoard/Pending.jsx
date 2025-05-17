import React from 'react';
import '../../css/EmployeeDash/PendingTask.css'; // Import the external CSS

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
  ];
  

const Pending = () => {
  return (
    <div className="pending-container-employee-dash">
      <h2 className="pending-title">Pending Tasks</h2>
      <div className="pending-task-list">
        {tasks.map((task, index) => (
          <div key={index} className="pending-task-card">
            <div className="pending-task-header">
              <h3 className="pending-task-title">{task.title}</h3>
              <span className="pending-task-deadline">{task.deadline}</span>
            </div>
            <p className="pending-task-description">{task.description}</p>
            <div className="pending-task-footer">
              <span className="pending-assigned-employees">
                {task.assignedEmployees} Employee(s) Assigned
              </span>
              <div className="TaskUpdation">
                  <button>Complete</button>
                  {/* <button>Reject</button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pending;
