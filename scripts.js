const todoId = [0];
const todoObjects = [];
const todoIdCopies = [];
const completedCountArray = [];
// const tempList = [];

class Todo {
  constructor() {
    this.id = todoId.slice(-1)[0] + 1;
    todoId.push(this.id);
    todoIdCopies.push(this.id);
    this.textInput = document.createElement("input");
    this.textInput.type = "text";
    this.textInput.style.backgroundColor = "#f5efff";
    this.textInput.style.outline = "none";
    this.textInput.style.border = "none";
    this.textInput.placeholder = "Enter your todo...";
    this.checkboxInput = document.createElement("input");
    this.checkboxInput.type = "checkbox";
    this.checkboxInput.className = "checkbox-button";
    this.checkboxInput.id = "unchecked";
    this.checkboxInput.style.display = "none";
    this.deleteButton = document.createElement("i");
    this.deleteButton.classList.add("fa-solid", "fa-trash-can");
    this.deleteButton.id = "trash-icon";
    this.completed = false;
  }

  addTitle(title) {
    this.title = title;
  }
}

function incompletedTodo() {
  document.querySelector(".empty-message").style.display = "none";
  const incompletedTodosList = document.querySelector(".todos-wrapper");
  const completedTodosList = document.querySelector(".completed-todos-wrapper");
  const todoItems = document.querySelectorAll(".todo-item");
  const formattedTodos = [];
  todoItems.forEach((item) => {
    formattedTodos.push(Number(item.id));
  });
  const completedTodoItems = document.querySelectorAll(".completed-todo-item");
  const formattedCompletedTodos = [];
  completedTodoItems.forEach((item) => {
    formattedCompletedTodos.push(Number(item.id));
  });
  const todoItem = new Todo();
  todoObjects.push(todoItem);
  const itemDiv = document.createElement("div");
  const todosMaxId = Math.max(...formattedTodos);
  console.log(`max: ${todosMaxId}`);
  const completedMaxId = Math.max(...formattedCompletedTodos);
  console.log(`max c: ${completedMaxId}`);
  const maxId = Math.max(todosMaxId, completedMaxId);
  if (maxId + 1 > todoItem.id) {
    todoId.pop();
    todoId.push(maxId + 1);
    todoItem.id = maxId + 1;
  }
  itemDiv.id = todoItem.id;
  itemDiv.className = "todo-item";
  itemDiv.appendChild(todoItem.textInput);
  itemDiv.appendChild(todoItem.checkboxInput);
  itemDiv.appendChild(todoItem.deleteButton);
  itemDiv.style.display = "flex";
  itemDiv.style.justifyContent = "space-between";
  itemDiv.style.alignItems = "center";
  itemDiv.style.margin = "5px 5px";
  itemDiv.style.padding = "0 15px";
  itemDiv.style.color = "#7371fc";
  // itemDiv.style.color = "#7371FC";
  itemDiv.style.boxShadow =
    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px";
  itemDiv.style.border = "1px solid lightgray";
  itemDiv.style.height = "60px";
  incompletedTodosList.appendChild(itemDiv);
  itemDiv.style.margin = "5px 5px";
  activateTrashListeners();
}

function completedTodo(obj) {
  document.querySelector(".todos-wrapper").style.display = "block";
  todoIdCopies.pop();
  completedCountArray.push(0);
  console.log("copies", todoIdCopies);
  if (
    todoIdCopies.length === 0 &&
    document.querySelector(".todos-wrapper").style.display !== "none"
  ) {
    document.querySelector(".empty-message").style.display = "block";
  } else {
    document.querySelector(".todos-wrapper").style.display = "block";
  }
  completedCountArray.push(0);
  const completedTodosList = document.querySelector(".completed-todos-wrapper");
  const todoItem = obj;
  const itemDiv = document.getElementById(String(todoItem.id));
  itemDiv.className = "completed-todo-item";
  completedTodosList.appendChild(itemDiv);
  itemDiv.style.margin = "5px 5px";
}

function undoCompletedTodo(obj) {
  document.querySelector(".completed-todos-wrapper").style.display = "block";
  completedCountArray.pop();
  todoIdCopies.push(0);
  console.log("count", completedCountArray);
  if (completedCountArray.length < 2) {
    document.querySelector(".empty-message").style.display = "block";
  } else {
    document.querySelector(".completed-todos-wrapper").style.display = "block";
  }
  completedCountArray.pop();
  const incompletedTodosList = document.querySelector(".todos-wrapper");
  const todoItem = obj;
  const itemDiv = document.getElementById(String(todoItem.id));
  itemDiv.className = "todo-item";
  incompletedTodosList.appendChild(itemDiv);
  itemDiv.style.margin = "5px 5px";
}

const theTrash = document.getElementById("trash-icon");
console.log(theTrash);

function activateTrashListeners() {
  const incompletedTodosList = document.querySelector(".todos-wrapper");
  const completedTodosList = document.querySelector(".completed-todos-wrapper");
  if (document.getElementById("trash-icon") !== null) {
    console.log("got id");
    document.querySelectorAll(".fa-trash-can").forEach((trashCan) => {
      trashCan.addEventListener("mouseup", (e) => {
        console.log("cool");
        const elementToDelete = e.target.parentElement;
        elementToDelete.style.display = "none";
        elementToDelete.classList.add("todo-item", "deleted");
        if (document.querySelector(".todos-wrapper").style.display !== "none") {
          todoIdCopies.pop();
        } else {
          completedCountArray.pop();
        }
        if (
          todoIdCopies.length === 0 &&
          document.querySelector(".todos-wrapper").style.display !== "none"
        ) {
          document.querySelector(".empty-message").style.display = "block";
        } else if (
          completedCountArray.length < 2 &&
          document.querySelector(".completed-todos-wrapper").style.display !==
            "none"
        ) {
          document.querySelector(".empty-message").style.display = "block";
          completedCountArray.pop();
        } else {
          document.querySelector(".empty-message").style.display = "none";
        }

        // const childArray = Array.from(incompletedTodosList.children);
        // let counter = 0;
        // for (let i of childArray) {
        //   if (!i.classList.contains("deleted")) {
        //     counter++;
        // if (counter === childArray.length - 1) {
        //   console.log("something");
        //   incompletedTodosList.firstChild.nextSibling.innerText = "Hola";
        // }
        //   }
        // }

        console.log(childArray);
      });
      trashCan.addEventListener("mouseover", (e) => {
        e.target.style.cursor = "pointer";
      });
    });
  }
}

document
  .querySelector(".todo-creater-button")
  .addEventListener("mouseup", (e) => {
    incompletedTodo();
    addListener();
  });

document
  .querySelector(".to-do-section-button")
  .addEventListener("mouseup", (e) => {
    document.querySelector(".completed-todos-wrapper").style.display = "none";
    document.querySelector(".todos-wrapper").style.display = "block";
    if (todoIdCopies.length === 0) {
      document.querySelector(".empty-message").style.display = "block";
    } else {
      document.querySelector(".empty-message").style.display = "none";
    }
    if (e.target.className === "to-do-section-button") {
      e.target.style.backgroundColor = "#CDC1FF";
    } else if (e.target.classList.contains("fa-inbox")) {
      e.target.parentElement.style.backgroundColor = "#CDC1FF";
    }
    document.querySelector(".completed-section-button").style.backgroundColor =
      "#F5EFFF";
  });

document
  .querySelector(".completed-section-button")
  .addEventListener("mouseup", (e) => {
    document.querySelector(".todos-wrapper").style.display = "none";
    document.querySelector(".completed-todos-wrapper").style.display = "block";
    if (completedCountArray.length === 0) {
      document.querySelector(".empty-message").style.display = "block";
    } else {
      document.querySelector(".empty-message").style.display = "none";
    }
    if (e.target.className === "completed-section-button") {
      e.target.style.backgroundColor = "#CDC1FF";
    } else if (e.target.classList.contains("fa-square-check")) {
      e.target.parentElement.style.backgroundColor = "#CDC1FF";
    }
    document.querySelector(".to-do-section-button").style.backgroundColor =
      "#F5EFFF";
  });

document.querySelector(".header").addEventListener("keypress", (e) => {
  const element = document.activeElement;
  const itemDiv = element.parentElement;
  if (e.key === "Enter") {
    const tempList = [];
    const newTitle = element.value;
    console.log(newTitle);
    const textNode = document.createTextNode(newTitle);
    const textNodeWrapper = document.createElement("div");
    itemDiv.appendChild(textNodeWrapper);
    itemDiv.style.alignItems = "center";
    textNodeWrapper.style.fontSize = "42px";
    textNodeWrapper.style.marginLeft = "15px";
    textNodeWrapper.style.marginTop = "max(0.45vw, 1px)";
    textNodeWrapper.appendChild(textNode);
    textNodeWrapper.style.fontSize = "max(1.75vw, 35px)";
    element.style.display = "none";
  }
});

// document.addEventListener("click", (e) => {
//   if (
//     document.querySelector(".completed-todos-wrapper").style.display !==
//       "none" &&
//     completedCountArray.length === 0
//   ) {
//     document.querySelector(".empty-message").style.display = "block";
//   }
// });

function addListener() {
  const todoInputs = document.querySelectorAll(".todo-item");
  console.log(todoInputs);

  todoInputs.forEach((child) => {
    child.children[0].addEventListener("keypress", (e) => {
      const element = document.activeElement;
      const itemDiv = element.parentElement;
      if (e.key === "Enter" && element.tagName === "INPUT") {
        const tempList = [];
        todoObjects.forEach((todo) => {
          console.log(todo.id);
          if (todo.id === Number(itemDiv.id)) {
            tempList.push(todo);
          }
        });
        let tempSlice = tempList.slice(-1);
        tempSlice[0].addTitle(element.value);
        const newTitle = tempSlice[0].title;
        console.log(newTitle);
        const textNode = document.createTextNode(newTitle);
        const textNodeWrapper = document.createElement("div");
        itemDiv.appendChild(textNodeWrapper);
        textNodeWrapper.appendChild(textNode);
        element.style.display = "none";
        const checkboxButton = element.nextSibling;
        const deleteButton = checkboxButton.nextSibling;
        deleteButton.style.order = "2";
        checkboxButton.style.display = "block";
        checkboxButton.style.width = "fit-content";
        checkboxButton.style.order = "1";
        itemDiv.style.margin = "5px 5px";
        itemDiv.style.padding = "0 15px";
        itemDiv.style.display = "grid";
        itemDiv.style.gridTemplateColumns = "1fr 30px 30px";
        itemDiv.style.justifyContent = "flex-end";
        itemDiv.style.alignItems = "center";
        itemDiv.style.boxShadow =
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px";
        itemDiv.style.border = "1px solid lightgray";
        itemDiv.style.height = "60px";
        textNodeWrapper.style.width = "fit-content";
        checkboxButton.style.transform = "scale(1.5)";
      }
    });
  });
}

// https://coolors.co/e5d9f2-f5efff-cdc1ff-a594f9-7371fc

document.addEventListener("mousedown", (e) => {
  if (e.target.className === "checkbox-button" && e.target.id !== "checked") {
    e.target.checked = true;
  } else if (
    e.target.className === "checkbox-button" &&
    e.target.id === "checked"
  ) {
    e.target.checked = false;
  }
});

document.addEventListener("mouseup", (e) => {
  const itemDiv = e.target.parentElement;
  if (e.target.className === "checkbox-button" && e.target.id !== "checked") {
    e.target.id = "checked";
    console.log(e.target);
    const tempList = [];
    todoObjects.forEach((todo) => {
      console.log(todo.id);
      if (Number(todo.id) === Number(itemDiv.id)) {
        if (tempList.length === 0) {
          tempList.push(todo);
          todo.completed = true;
        }
      }
    });
    let checkedOffTodo = tempList.slice(-1)[0];
    console.log(`checked: ${checkedOffTodo}`);
    completedTodo(checkedOffTodo);
    todoId.shift();
    reorderList(itemDiv.parentElement);
  } else if (e.target.className === "checkbox-button") {
    e.target.id = "unchecked";
    const tempList = [];
    todoObjects.forEach((todo) => {
      console.log(todo.id);
      if (todo.id === Number(itemDiv.id)) {
        if (tempList.length === 0) {
          tempList.push(todo);
          todo.completed = false;
        }
      }
    });
    let uncheckedOffTodo = tempList.slice(-1)[0];
    console.log(`unchecked: ${uncheckedOffTodo}`);
    undoCompletedTodo(uncheckedOffTodo);
    todoId.unshift(0);
    reorderList(itemDiv.parentElement);
  }
});

function reorderList(parent) {
  const childList = parent.children;
  console.log(`parent: ${parent.classList}`);
  const preSortingList = [];
  for (let child of childList) {
    preSortingList.push(Number(child.id));
  }

  const sortingList = preSortingList.sort();
  console.log(sortingList);
  if (parent.classList.contains("todos-wrapper")) {
    for (let item of sortingList) {
      todoObjects.forEach((obj) => {
        if (obj.completed === false) {
          const currentElement = document.getElementById(String(obj.id));
          parent.appendChild(currentElement);
        }
      });
    }
  } else if (parent.classList.contains("completed-todos-wrapper")) {
    for (let item of sortingList) {
      todoObjects.forEach((obj) => {
        if (obj.completed === true) {
          const currentElement = document.getElementById(String(obj.id));
          parent.appendChild(currentElement);
        }
      });
    }
  }
}

window.onload = () => {
  const listHeader = document.querySelector(".header");
  const listNameInput = document.createElement("input");
  listNameInput.type = "text";
  listHeader.appendChild(listNameInput);
  listNameInput.style.width = "25%";
  listNameInput.style.marginLeft = "10px";
  document.querySelector(".to-do-section-button").style.backgroundColor =
    "#CDC1FF";
  document.querySelector(".completed-todos-wrapper").style.display = "none";
};

// window.onbeforeunload = () => {
//   return "";
// };
