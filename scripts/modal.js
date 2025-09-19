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
      <button id="close-button">&times;</button>
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
        <div class:"button-container" style="margin-top: 15px; display: flex; justify-content: space-evenly;">
          <button id="save-button">Save Changes</button>
          <button id="delete-button" style="margin-left: 10px;">Delete Task</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  backdrop.querySelector("#close-button").onclick = () => backdrop.remove();

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
}
