# 📝 Kanban Board Project

## 📌 Overview

This project is a **Kanban task management app** built with **HTML, CSS, and JavaScript (modular structure)**.  
It allows users to organize tasks into **To Do, Doing, and Done** columns with features like **localStorage persistence, modals for editing, sidebar toggle, and theme switching**.

The app ensures smooth functionality across both **desktop and mobile views**, following a clean and user-friendly design inspired by a Figma layout.

---

## 🚀 Features

### ✅ Task Management

- **Add New Tasks** via a modal form.
- **Edit Existing Tasks** (update title, description, status, priority).
- **Delete Tasks** from the board.
- **Live Counters** show how many tasks are in each column.

### 🌐 API Integration

- On the first load, the app **fetches initial tasks from an API**.
- After fetching, data is **stored in `localStorage`** so it persists across page reloads.
- If tasks already exist in localStorage, those are loaded instead of fetching again.

### 📱 Responsive Sidebar

- **Desktop View:** Sidebar is visible by default but can be toggled on/off.
- **Mobile View:** Sidebar is hidden by default and can be expanded when needed.
- **Toggle Buttons** allow smooth switching between hidden/visible states.

### 🌙 Theme Switching

- Users can **toggle between Dark Mode and Light Mode**.
- Theme preference is saved in **localStorage**, so the app remembers the setting across sessions.

---

## 🛠️ Technologies Used

- **HTML5** – structure
- **CSS3 (Flexbox & Grid)** – responsive styling
- **Vanilla JavaScript (Modules)** – functionality
- **localStorage** – data persistence
- **API Fetch** – load initial task data

---

## 📖 How to Use

1. **Clone or Download** the project.
2. Open `index.html` in your browser.
3. Interact with the app:
   - 📌 Add new tasks with the **"Add Task"** button.
   - ✏️ Click a task to **edit or delete** it.
   - 🎛️ Use the sidebar toggle to **show/hide navigation**.
   - 🌙 Switch between **dark and light mode**.
4. Tasks are automatically **saved in localStorage**, so you won’t lose them on reload.

---

## 🧩 Future Improvements

- Drag & drop tasks between columns.
- User accounts with authentication.
- Custom categories/boards.

## Deployed to Netlify

- [Kanban-board-app-management](https://68d65e9c00963ea947e77b15--kanban-board-app-management.netlify.app/)
