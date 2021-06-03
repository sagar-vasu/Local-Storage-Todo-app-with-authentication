function validateUser() {
  var activeUser = JSON.parse(localStorage.getItem("user"));
  if (activeUser === null) {
    alert("Please Login With Your Account To Add Data");
    window.location.href = "../Login.html";
  }
}

validateUser();

function getFromLocalStorage() {
  var allUsers = JSON.parse(localStorage.getItem("users"));
  var activeUser = JSON.parse(localStorage.getItem("user"));
  for (var i = 0; i < allUsers.length; i++) {
    if (activeUser.email === allUsers[i].email) {
      if (allUsers[i].items) {
        var data = allUsers[i].items;
        data.forEach((element) => {
          renderItems(element.name);
        });
      }
    }
  }
}

getFromLocalStorage();

var todos = [];

function addItem() {
  var item = document.getElementById("new-task").value;
  var allUsers = JSON.parse(localStorage.getItem("users"));
  var activeUser = JSON.parse(localStorage.getItem("user"));

  if (!item) {
    alert("Please Enter Something");
  } else {
    var itemObj = {
      name: item,
    };

    for (var i = 0; i < allUsers.length; i++) {
      if (activeUser.email === allUsers[i].email) {
        if (allUsers[i].items) {
          todos = allUsers[i].items;
          todos.push(itemObj);
          localStorage.setItem("users", JSON.stringify(allUsers));
          renderItems(item);
          document.getElementById("new-task").value = "";
        } else {
          todos.push(itemObj);
          allUsers[i].items = todos;
          localStorage.setItem("users", JSON.stringify(allUsers));
          renderItems(item);

          document.getElementById("new-task").value = "";
        }
      }
    }
  }
}

function renderItems(name) {
  var mainBox = document.getElementById("tasks");
  var li = document.createElement("li");
  li.setAttribute("id", name);
  var label = document.createElement("label");
  var labelText = document.createTextNode(name);
  var editBtn = document.createElement("button");
  var editText = document.createTextNode("Edit");
  editBtn.setAttribute("class", "edit");
  var deleteBtn = document.createElement("button");
  var deleteBtnText = document.createTextNode("Delete");
  deleteBtn.setAttribute("class", "delete");

  label.appendChild(labelText);
  editBtn.appendChild(editText);
  deleteBtn.appendChild(deleteBtnText);

  li.appendChild(label);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  mainBox.appendChild(li);

  editBtn.addEventListener("click", function () {
    var allUsers = JSON.parse(localStorage.getItem("users"));
    var activeUser = JSON.parse(localStorage.getItem("user"));
    for (var i = 0; i < allUsers.length; i++) {
      if (activeUser.email === allUsers[i].email) {
        var items = allUsers[i].items;
        if (items) {
          for (var j = 0; j < items.length; j++) {
            if (items[j].name === name) {
              var ask = prompt("update", name);
              items[j].name = ask;
              localStorage.setItem("users", JSON.stringify(allUsers));
              window.location.reload();
            }
          }
        }
      }
    }
  });
  deleteBtn.addEventListener("click", function () {
    var allUsers = JSON.parse(localStorage.getItem("users"));
    var activeUser = JSON.parse(localStorage.getItem("user"));
    for (var i = 0; i < allUsers.length; i++) {
      if (activeUser.email === allUsers[i].email) {
        var items = allUsers[i].items;
        if (items) {
          for (var j = 0; j < items.length; j++) {
            if (items[j].name === name) {
              document.getElementById(name).remove();
              items.splice(j, 1);
              localStorage.setItem("users", JSON.stringify(allUsers));
              window.location.reload();
            }
          }
        }
      }
    }
  });
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "../Login.html";
}
