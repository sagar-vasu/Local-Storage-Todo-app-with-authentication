function validation(name, email, password) {
  if (!name) {
    alert("Enter Name");
    return false;
  } else if (!email) {
    alert("Enter Email");
    return false;
  } else if (!password) {
    alert("Enter Password");
    return false;
  } else {
    return true;
  }
}

function registerNow() {
  var name = document.getElementById("exampleInputUser1").value;
  var email = document.getElementById("exampleInputEmail1").value;
  var password = document.getElementById("exampleInputPassword1").value;
  var validate = validation(name, email, password);

  var obj = {
    name,
    email,
    password,
  };
  if (validate) {
    var getUsers = JSON.parse(localStorage.getItem("users"));
    if (getUsers === null) {
      var allUsers = [];
      allUsers.push(obj);
      localStorage.setItem("users", JSON.stringify(allUsers));
      document.getElementById("exampleInputUser1").value = "";
      document.getElementById("exampleInputEmail1").value = "";
      document.getElementById("exampleInputPassword1").value = "";
      window.location.href = "../Login.html";
    } else {
      allUsers = getUsers;
      var flag = true;
      for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email === obj.email) {
          alert("Email Already used");
          flag = false;
        }
      }

      if (flag === true) {
        allUsers.push(obj);
        localStorage.setItem("users", JSON.stringify(allUsers));
        document.getElementById("exampleInputUser1").value = "";
        document.getElementById("exampleInputEmail1").value = "";
        document.getElementById("exampleInputPassword1").value = "";
        window.location.href = "../Login.html";
      }
    }
  }
}
