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
