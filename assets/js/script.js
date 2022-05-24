var buttonEl = document.querySelector("#add-task");

var toDoEl = document.querySelector("#to-do");

var createTaskHandler = function() {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "New task";
    toDoEl.appendChild(listItemEl);    
};

buttonEl.addEventListener("click", createTaskHandler);
// no parentheses after the createTaskHandler call because that would call it as the page loads
// also it doesn't respond to the button if i do that. unsure why THAT is