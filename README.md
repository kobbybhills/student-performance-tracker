# Overview

As a software engineer, my goal with this project was to deepen my knowledge of full-stack web development by building a scalable, data-driven application using modern industry tools. I wanted to practice implementing a decoupled architecture—separating a React-based single-page application frontend from a Node.js and Express RESTful API backend—while managing real-time data persistence with an embedded database.

This web application is a **Student Performance & Curriculum Tracker** designed to help students organize, track, and manage their academic course load, credit hours, completion statuses, and letter grades in one centralized interface. 

### How to Run the Application Locally

1. **Start the Backend Server:**
   * Open a terminal, navigate to the `server` directory: `cd server`
   * Install backend dependencies (if not already installed): `npm install`
   * Run the development server: `npm run dev`
   * The server will run on `http://localhost:5000` and connect to the local SQLite database (`tracker.db`).

2. **Start the Frontend Client:**
   * Open a second terminal, navigate to the `client` directory: `cd client`
   * Install frontend dependencies (if not already installed): `npm install`
   * Run the Vite client server: `npm run dev`
   * The client application will automatically start and display the local URL (typically `http://localhost:5173`).

3. **View the Application:**
   * Open your web browser and navigate to `http://localhost:5173`.

### Purpose

I wrote this software to solve a common administrative problem for students—keeping track of completed, current, and planned coursework alongside credit totals and letter grades. Developing this app allowed me to gain hands-on experience structuring RESTful API endpoints, handling asynchronous HTTP requests with Axios, managing React state, and integrating an SQLite database.

[Software Demo Video](https://www.loom.com/share/97369709b5be4f589834f7e39c650b2f)

# Web Pages

* **Main Curriculum Tracker Dashboard (`/`):** 
  * The application operates as a dynamic React single-page application (SPA). 
  * **Dynamic Content & Interactions:** The page dynamically fetches all course entries from the SQLite backend upon load. When a user fills out the "Add New Course" form (specifying course name, code, grade, credits, and status) and submits, the page instantly updates the database via a `POST` request and re-renders the course list without requiring a full browser refresh. Users can also dynamically remove entries from the database using the "Delete" action button on any course item.

# Development Environment

* **Development Tools:** Visual Studio Code, Node Package Manager (`npm`), Git, GitHub, Windows PowerShell.
* **Programming Languages & Frameworks:** 
  * **Frontend:** React (TypeScript), Vite, HTML5, CSS3, Axios
  * **Backend:** Node.js, Express.js (TypeScript), `tsx` (TypeScript Execution)
  * **Database:** SQLite (`sqlite3` driver)

# Useful Websites

* [React Documentation](https://react.dev/)
* [Express.js API Reference](https://expressjs.com/)
* [TypeScript Official Documentation](https://www.typescriptlang.org/)
* [SQLite Documentation](https://www.sqlite.org/docs.html)
* [Vite Getting Started Guide](https://vitejs.dev/guide/)

# Future Work

* Add automatic GPA and cumulative credit calculation based on entered letter grades.
* Implement inline edit capabilities so users can update existing course grades or statuses directly.
* Add progress bars and visual charts to display degree completion percentage.