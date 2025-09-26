import { saveTasks, loadTasks } from "./localStorage.js";
import { openEditModal, openNewTaskModal } from "./modal.js";

/**
 * List of tasks stored in memory
 * @type {Array<Object>}
 */
let tasks = [];

/**
 * Initialize the app on DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", async () => {
  showLoadingMessage();

  try {
    tasks = await fetchTasksFromAPI();
    sortTasksByPriority();
  } catch (err) {
    showErrorMessage("Failed to fetch tasks. Please try again.");
    console.error(err);
    return;
  }

  showAllTasks();

  // Add Task button
  const addTaskBtn = document.getElementById("add-task-btn");
  addTaskBtn?.addEventListener("click", () => {
    openNewTaskModal((newTask) => {
      tasks.push(newTask);
      sortTasksByPriority();
      showAllTasks();
    });
  });
});

/**
 * Fetch tasks from remote API and transform them into local format
 * @async
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of task objects
 * @throws {Error} If the network request fails
 */
async function fetchTasksFromAPI() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    description: "No description from API",
    status: item.completed ? "done" : "todo",
    priority: "medium",
  }));
}

/**
 * Display a loading message in each task column
 */
function showLoadingMessage() {
  document.querySelectorAll(".tasks-container").forEach((col) => {
    col.innerHTML =
      "<p style='color: gray; text-align:center;'>Loading tasks...</p>";
  });
}

/**
 * Display an error message in each task column
 * @param {string} msg - Error message to display
 */
function showErrorMessage(msg) {
  document.querySelectorAll(".tasks-container").forEach((col) => {
    col.innerHTML = `<p style='color:red; text-align:center;'>${msg}</p>`;
  });
}

/**
 * Render all tasks into their respective columns
 */
function showAllTasks() {
  const columns = {
    todo: document.querySelector('[data-status="todo"] .tasks-container'),
    doing: document.querySelector('[data-status="doing"] .tasks-container'),
    done: document.querySelector('[data-status="done"] .tasks-container'),
  };

  // Clear all columns
  Object.values(columns).forEach((col) => (col.innerHTML = ""));

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task-div";
    div.textContent = task.title;
    div.onclick = () => {
      openEditModal(task, handleSave, handleDelete);
    };

    if (columns[task.status]) {
      columns[task.status].appendChild(div);
    }
  });

  updateColumnCounts();
  saveTasks(tasks);
}

/**
 * Handler called when a task is saved from the edit modal.
 * Updates the task in the tasks array and re-renders the task list.
 *
 * @param {Object} updatedTask - Task object with updated properties
 */
function handleSave(updatedTask) {
  const index = tasks.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    showAllTasks();
  }
}

/**
 * Handler called when a task is deleted from the edit modal.
 * Removes the task from the tasks array and re-renders the task list.
 *
 * @param {number} taskId - The id of the task to delete
 */
function handleDelete(taskId) {
  tasks = tasks.filter((t) => t.id !== taskId);
  showAllTasks();
}

/**
 * Updates the task count display for each column (TODO, DOING, DONE).
 */
function updateColumnCounts() {
  const countByStatus = (status) =>
    tasks.filter((t) => t.status === status).length;

  document.getElementById("toDoText").textContent = `TODO (${countByStatus(
    "todo"
  )})`;
  document.getElementById("doingText").textContent = `DOING (${countByStatus(
    "doing"
  )})`;
  document.getElementById("doneText").textContent = `DONE (${countByStatus(
    "done"
  )})`;
}
