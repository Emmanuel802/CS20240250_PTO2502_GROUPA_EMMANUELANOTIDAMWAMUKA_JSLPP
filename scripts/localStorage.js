// A constant to store the key used in localStorage
const STORAGE_KEY = "tasks";

/**
 * Loads tasks from localStorage.
 *
 * @returns {Array<Object>|null} Returns an array of task objects if found, otherwise null.
 *
 */
export function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

/**
 * Saves the provided list of tasks to localStorage.
 *
 * @param {Array<Object>} taskList - Array of task objects to be saved.
 */
export function saveTasks(taskList) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(taskList));
}
