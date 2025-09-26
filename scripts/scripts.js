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

  // Try to load tasks from localStorage first
  const storedTasks = loadTasks();
  if (storedTasks && Array.isArray(storedTasks) && storedTasks.length > 0) {
    tasks = storedTasks;
    sortTasksByPriority();
  } else {
    try {
      tasks = await fetchTasksFromAPI();
      sortTasksByPriority();
      saveTasks(tasks); // Save fetched tasks to localStorage
    } catch (err) {
      showErrorMessage("Failed to fetch tasks. Please try again.");
      console.error(err);
      return;
    }
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
    // Create title span
    const titleSpan = document.createElement("span");
    titleSpan.className = "task-title";
    titleSpan.textContent = task.title;
    // Create emoji span
    const emojiSpan = document.createElement("span");
    emojiSpan.className = "task-priority-emoji";
    emojiSpan.textContent = getPrioritySymbol(task.priority);
    // Add both spans to the div
    div.appendChild(titleSpan);
    div.appendChild(emojiSpan);
    div.onclick = () => openEditModal(task, handleSave, handleDelete);
    columns[task.status]?.appendChild(div);
  });

  updateColumnCounts();
  saveTasks(tasks);
}

/**
 * Get a symbol that represents task priority
 * @param {"high"|"medium"|"low"} priority - Priority level of the task
 * @returns {string} Emoji symbol for the priority
 */
function getPrioritySymbol(priority) {
  if (priority === "high") return "🔴";
  if (priority === "medium") return "🟡";
  if (priority === "low") return "🟢";
  return "";
}

/**
 * Update a task in the tasks list and refresh the UI
 * @param {Object} updatedTask - Task object with updated fields
 */
function handleSave(updatedTask) {
  const index = tasks.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    sortTasksByPriority();
    showAllTasks();
  }
}

/**
 * Remove a task by ID and refresh the UI
 * @param {number} taskId - ID of the task to remove
 */
function handleDelete(taskId) {
  tasks = tasks.filter((t) => t.id !== taskId);
  showAllTasks();
}

/**
 * Update task counts in each status column header
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

/**
 * Sort the tasks array in-place by priority: High → Medium → Low
 */
function sortTasksByPriority() {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}
