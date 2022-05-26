var formEl = document.querySelector("#task-form");
var pageContentEl = document.querySelector("#page-content");

var toDoEl = document.querySelector("#to-do");
var inProgressEl = document.querySelector("#in-progress");
var completedEl = document.querySelector("#completed");

var taskIdCounter = 0;
var tasks = [];


// taskFormHandler
//    createTaskEl
//        createTaskActions
//    completeEditTask
// taskButtonHandler
//    editTask
//    deleteTask


var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    // create <li> element, give it a class and an id using a custom attribute

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = `
        <h3 class="task-name">${taskDataObj.name}</h3>
        <span class="task-type">${taskDataObj.type}</span>
    `;
    // create a <div>, give it a class and some innerHTML

    var taskActionsEl = createTaskActions(taskIdCounter);
    // declare the variable taskActionsEl, and assign it the return value of createTaskActions()
    // we give createTaskActions() the current counter number as its parameter of taskId
    
    listItemEl.appendChild(taskInfoEl);
    // append the <div> with the information about the task to the <li>
    listItemEl.appendChild(taskActionsEl);
    // append the <div> with the task controls to the <li>
    toDoEl.appendChild(listItemEl);
    // append the <li> to the <ul>

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // create container for buttons and stuff

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    // make edit button

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    // make delete button

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    // make dropdown that will allow status selection (e.g. to-do/in-progress/complete)

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    };
    // loop through the list of possible task statuses (statusChoices)
    // for each one, create an <option> element, fill it with the value of the current statusChoice, and set its value to the same
    // then append the new <option> element to the <select> (dropdown) element we made outside the loop

    actionContainerEl.appendChild(editButtonEl);
    actionContainerEl.appendChild(deleteButtonEl);
    actionContainerEl.appendChild(statusSelectEl);
    // append the edit button, delete button, and dropdown to the container, in that order

    return actionContainerEl;
};

var completeEditTask = function(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
    // get the indicated task

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task updated!");

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };
    // loop through the tasks array checking the id property of each object in it
    // if the id of that one matches the one we're editing, update the name and type

    formEl.removeAttribute("data-task-id");
    document.querySelector("#add-task").textContent = "Add Task";
};

var taskFormHandler = function(event) {
    event.preventDefault();
    // this prevents the page from refreshing when we click the submit button
    // that refresh is part of the default behavior of a submit event

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // selecting the first DOM object with the tag <input> and the name "task-name"
    // more generally the square brackets are used to select an element based on one of its attributes
    // its kind of equivalent to pulling specific items from an array
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out both fields.");
        return;
    };
    formEl.reset();
    // blanks out the form

    var isEdit = formEl.hasAttribute("data-task-id");

    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
        // if the form has the data-task-id attribute, it's being used to edit an existing task
        // get the id of the relevant task from the form
        // send the info currently in the form AND the task id to completeEditTask
    }
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        createTaskEl(taskDataObj);
        // the form doesnt have the data-task-id attribute, so we're making a new task
        // get the data currently in the form and wrap it up as an object
        // send it to createTaskEl
    };
};
formEl.addEventListener("submit", taskFormHandler);
// no parentheses after the createTaskHandler call because that would call it as the page loads, rather than giving it to the event listener as a parameter
// event type submit means this event listener will watch for
    // 1. a button with the type "submit" being clicked
    // 2. the enter button being pressed
// the event listener is attached to the whole form so it can gather all the data from it
// more specifically when the submit button is pushed, the event listener is called, and the browser wraps up all the form data as an object so it can be used
// that object is then given to createTaskHandler as the value of the parameter "event"


var editTask = function(taskId) {
    var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    // gather data from the task and save it as variables

    formEl.setAttribute("data-task-id", taskId);
    // store the id of the task we're editing on the form, so it can be used again
    // this doesn't seem correct? i'll stick with it and see if this needs to be changed

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    // grab the form inputs and fill them with the data of the task you're trying to edit
    document.querySelector("#add-task").textContent = "Save Task";
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
    // find the first element with the class task-item that also has the data-task-id value of the provided id
    taskSelected.remove();

    var updatedTaskArr = [];

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        };
    };
    // check each item in the tasks array
    // if it's NOT the one we just deleted, push it into updatedTaskArr

    tasks = updatedTaskArr;
};

var taskButtonHandler = function(event) {
    var targetEl = event.target;
    var taskId = targetEl.getAttribute("data-task-id");

    if (targetEl.matches(".edit-btn")) {
        editTask(taskId);
    };
    if (event.target.matches(".delete-btn")) {
        deleteTask(taskId);
    };
};
var taskStatusChangeHandler = function(event) {
    var targetEl = event.target;

    var taskId = targetEl.getAttribute("data-task-id");
    var statusValue = targetEl.value.toLowerCase();
    var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);

    if (statusValue === "to do") {
        toDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        inProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        completedEl.appendChild(taskSelected);
    };
    // we don't need to remove the task from its original location because appendChild does that for us
    // we aren't making a clone of it - we selected the original and stored it in taskSelected
    // by appending taskSelected somewhere else, we're actually moving the thing

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        };
    };
};
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// note: need to look into how the change event works