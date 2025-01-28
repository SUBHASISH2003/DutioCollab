import React, { useState } from 'react';
import '../../css/ManagerDash/CreateTask.css';

const CreateTask = () => {
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    deadline: '',
    taskType: '',
    employee: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task Details Submitted:', taskDetails);
    // Add API call or logic to handle the submission
  };

  return (
    <div className="create-task-main">
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter task title"
            value={taskDetails.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Task Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter task description"
            value={taskDetails.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={taskDetails.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="taskType">Task Type</label>
          <select
            id="taskType"
            name="taskType"
            value={taskDetails.taskType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select task type
            </option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="Design">Design</option>
            <option value="Research">Research</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="employee">Assign to Employee</label>
          <input
            type="text"
            id="employee"
            name="employee"
            placeholder="Enter employee name or ID"
            value={taskDetails.employee}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
