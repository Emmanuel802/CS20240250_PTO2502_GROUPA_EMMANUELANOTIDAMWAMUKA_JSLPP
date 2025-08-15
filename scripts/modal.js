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
}
