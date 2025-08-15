/**
 * Opens a modal to edit an existing task.
 * The modal HTML is created dynamically and appended to the document body.
 * When saved or deleted, the corresponding callback functions are called.
 *
 * @param {Object} task - The task object to edit.
 * @param {number} task.id - Unique identifier of the task.
 * @param {string} task.title - Title of the task.
 * @param {string} task.description - Description of the task.
 * @param {string} task.status - Status of the task ("todo", "doing", or "done").
 * @param {function(Object): void} onSave - Callback called when saving, with updated task object.
 * @param {function(number): void} onDelete - Callback called when deleting, with task id.
 */
export function openEditModal(task, onSave, onDelete) {
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";

  backdrop.innerHTML = `
    <div class="modal">
      <button class="close-button">&times;</button>
      <div class="modal-content">
        <label>Title</label>
        <input type="text" id="modal-title" value="${task.title}" />
        <label>Description</label>
        <textarea id="modal-description">${task.description}</textarea>
        <label>Status</label>
        <select id="modal-status">
          <option value="todo" ${
            task.status === "todo" ? "selected" : ""
          }>To Do</option>
          <option value="doing" ${
            task.status === "doing" ? "selected" : ""
          }>Doing</option>
          <option value="done" ${
            task.status === "done" ? "selected" : ""
          }>Done</option>
        </select>
        <div style="margin-top: 15px;">
          <button id="save-button">Save</button>
          <button id="delete-button" style="background-color: red; margin-left: 10px;">Delete</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  backdrop.querySelector(".close-button").onclick = () => backdrop.remove();

  backdrop.querySelector("#save-button").onclick = () => {
    const updated = {
      ...task,
      title: document.getElementById("modal-title").value.trim(),
      description: document.getElementById("modal-description").value.trim(),
      status: document.getElementById("modal-status").value,
    };
    onSave(updated);
    backdrop.remove();
  };

  backdrop.querySelector("#delete-button").onclick = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
      backdrop.remove();
    }
  };
}

export function openNewTaskModal(onCreate) {
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";

  backdrop.innerHTML = `
    <div class="modal">
      <button class="close-button">&times;</button>
      <div class="modal-content">
        <label>Title</label>
        <input type="text" id="new-title" placeholder="Enter task title" />
        <label>Description</label>
        <textarea id="new-description" placeholder="Enter task description"></textarea>
        <label>Status</label>
        <select id="new-status">
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <div style="margin-top: 15px;">
          <button id="create-button">Create Task</button>
          <button id="cancel-button" style="margin-left: 10px;">Cancel</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);
}
