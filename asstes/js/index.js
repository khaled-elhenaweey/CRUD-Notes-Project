let tasks = [];
getLocal();
function callTasksList() {
  document.querySelector(".table-body").innerHTML = "";
  if (tasks.length == 0) {
    let content = `
    <tr class="no-notes">
    <td colspan ="2">
    Hi please use the add button to add your first note 
    </td>
    </tr>
    `;
    document.querySelector(".table-body").innerHTML += content;
  } else {
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
  setInLocal();
  callTasksList();
});
// delete task
function deleteTask(index) {
  let confirmDelete = confirm(
    `are you sure to delete this note : ${tasks[index].name}`
  );
  if (confirmDelete) {
    tasks.splice(index, 1);
    setInLocal();
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
    setInLocal();
    callTasksList();
  }
}
// check task
function checkTask(index) {
  tasks[index].state = !tasks[index].state;
  setInLocal();
  callTasksList();
}
function setInLocal() {
  let myTasks = JSON.stringify(tasks);
  localStorage.setItem("myTasks", myTasks);
}
function getLocal() {
  let retrievedTask = JSON.parse(localStorage.getItem("myTasks"));
  if (retrievedTask == null) {
    tasks = [];
  } else {
    tasks = retrievedTask;
  }
}
