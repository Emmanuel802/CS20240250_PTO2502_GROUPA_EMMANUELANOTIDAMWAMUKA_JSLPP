import { initialData } from "./initialData.js";
import { saveTasks, loadTasks } from "./localStorage.js";
import { openEditModal, openNewTaskModal } from "./modal.js";

/**
 * @type {Array<Object>} tasks
 * This holds the current list of tasks in memory.
 * It first tries to load from localStorage;
 * if none exist, it falls back to the initialData array.
 */
let tasks = loadTasks() || initialData;

/**
 * Initialize the app after the DOM is fully loaded:
 * - Show all tasks on the board
 * - Set up the "Add Task" button click event
 */
document.addEventListener("DOMContentLoaded", () => {
  showAllTasks(); // Render all tasks in their columns

  const addTaskBtn = document.getElementById("add-task-btn");
  if (addTaskBtn) {
    addTaskBtn.addEventListener("click", () => {
      openNewTaskModal((newTask) => {
        tasks.push(newTask); // Add the new task to the tasks array
        showAllTasks(); // Re-render to include the new task
      });
    });
  }
});
