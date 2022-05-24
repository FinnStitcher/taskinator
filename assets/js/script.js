var formEl = document.querySelector("#task-form");

var toDoEl = document.querySelector("#to-do");

var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = `
        <h3 class="task-name">${taskDataObj.name}</h3>
        <span class="task-type">${taskDataObj.type}</span>
    `;
    
    listItemEl.appendChild(taskInfoEl);
    toDoEl.appendChild(listItemEl);    
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

    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObj);
};

formEl.addEventListener("submit", taskFormHandler);
// no parentheses after the createTaskHandler call because that would call it as the page loads
// also it doesn't respond to the button if i do that. unsure why THAT is

// event type submit means this event listener will watch for
    // 1. a button with the type "submit" being clicked
    // 2. the enter button being pressed
// the event listener is attached to the whole form so it can gather all the data from it
// more specifically when the submit button is pushed, the event listener is called, and the browser wraps up all the form data as an object so it can be used
// that object is then given to createTaskHandler as the value of the parameter "event"