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
 * Renders all tasks inside their respective columns (TODO, DOING, DONE),
 * clears previous content and adds click listeners to open edit modal.
 * Saves the updated task list to localStorage.
 */
function showAllTasks() {
  const columns = {
    todo: document.querySelector('[data-status="todo"] .tasks-container'),
    doing: document.querySelector('[data-status="doing"] .tasks-container'),
    done: document.querySelector('[data-status="done"] .tasks-container'),
  };

  // Clear existing tasks in all columns
  Object.values(columns).forEach((col) => (col.innerHTML = ""));

  // Render tasks
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
