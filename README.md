# Dutio Web App

## Overview
Dutio is a task management web application designed for employees and managers to efficiently assign, track, and manage tasks. It provides an intuitive interface to enhance productivity and streamline workflow.

## Features
- **User Authentication:** Secure login and registration for employees and managers.
- **Task Assignment:** Assign tasks to individuals or groups.
- **Real-Time Updates:** Track progress and receive real-time notifications.
- **Task Categorization:** Organize tasks by priority, status, and due date.
- **Collaborative Features:** Enable team discussions and file sharing.
- **Performance Insights:** Monitor employee performance and productivity trends.
- **Responsive Design:** Accessible across devices with an optimized UI.

## Tech Stack
- **Frontend:** React.js, Axios, CSS (with color scheme: #3B1E54, #9B7EBD, #D4BEE4, #EEEEEE, #495057)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **State Management:** Context API / Redux (if used)
- **Animations:** GSAP (for interactive UI elements)

## Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/Saikat1707/DutioCollab.git
   cd dutio
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the development server:**
   ```sh
   npm run dev
   ```
4. **Start the backend server:**
   ```sh
   cd server
   npm install
   npm start
   ```



## Usage
- **Managers:** Can create and assign tasks, monitor team progress, and review reports.
- **Employees:** Can view assigned tasks, update their progress, and collaborate with team members.

## Deployment
To deploy the app, use:
```sh
npm run build
```

For production, host the backend on **Heroku/Vercel** and the frontend on **Netlify/Vercel**.

## Contributing
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to the branch and create a pull request.
