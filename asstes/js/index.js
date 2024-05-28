let tasks = [
  {
    name: "first note ",
    date: "27/5/2024",
    state: false,
  },
  {
    name: "second note",
    date: "28/5/2024",
    state: true,
  },
  {
    name: "third note",
    date: "29/5/2024",
    state: false,
  },
  {
    name: "final note",
    date: "30/5/2024",
    state: true,
  },
];
function callTasksList() {
  document.querySelector(".table-body").innerHTML = "";
  let index = 0;
  for (const task of tasks) {
    let content = `
      <tr class="${task.state ? "done" : ""}">
      <td>
          <div class="note-data">
              <h4>${task.name}</h4>
              <div class="note-date">
                  <span class="material-symbols-outlined">
                      event_note
                  </span>
                  <span>${task.date}</span>
              </div>
          </div>
      </td>
      <td>
          <div class="note-action">
              <button class="btn btn-icon btn-icon-primary" onclick="editTask(${index})">
                  <span class="material-symbols-outlined">
                      edit_square
                  </span>
              </button>

              <button class="btn btn-icon btn-icon-danger" onclick="deleteTask(${index})">
                  <span class="material-symbols-outlined">
                      delete
                  </span>
              </button>

              <button class="btn btn-icon btn-icon-danger ${
                task.state ? "flex" : "none"
              }" onclick="checkTask(${index})">
                  <span class="material-symbols-outlined">
                      disabled_by_default
                  </span>
              </button>

              <button class="btn btn-icon btn-icon-success ${
                task.state ? "none" : "flex"
              }"   onclick="checkTask(${index})">
                  <span class="material-symbols-outlined">
                      select_check_box
                  </span>
              </button>
          </div>
      </td>
    </tr>
        `;
    document.querySelector(".table-body").innerHTML += content;
    index++;
  }
}
callTasksList();
// add task
document.querySelector("#addNote").addEventListener("click", function () {
  let noteName = prompt();
  let date = new Date();
  let today = `${date.getDay()} / ${
    date.getMonth() + 1
  } /${date.getFullYear()}   | ${date.getHours()} : ${date.getSeconds()}`;
  let addNewTask = {
    name: noteName,
    date: today,
    state: false,
  };
  tasks.push(addNewTask);
  callTasksList();
});
// delete task
function deleteTask(index) {
  let confirmDelete = confirm(
    `are you sure to delete this note : ${tasks[index].name}`
  );
  if (confirmDelete) {
    tasks.splice(index, 1);
    callTasksList();
  }
}
// edit task
function editTask(index) {
  let editNote = prompt(
    `are you sure you want to edit this task: ${tasks[index].name} `
  );
  if (editNote != null) {
    tasks[index].name = editNote;
    callTasksList();
  }
}
// check task
function checkTask(index) {
  tasks[index].state = !tasks[index].state;
  callTasksList();
}
