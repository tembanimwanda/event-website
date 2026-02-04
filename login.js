// Permanent admin password
const ADMIN_PASSWORD = "ADMIN@MARKET"; // change this as needed
const ADMIN_USERNAME = "Admin";      // optional: set a fixed admin name

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.style.color = "red";
  errorMsg.innerHTML = "";

  if (username === "") {
    errorMsg.innerHTML = "Please enter your username.";
    return;
  }

  if (password === "") {
    errorMsg.innerHTML = "Please enter your password.";
    return;
  }

  // Check credentials
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Save admin session
    sessionStorage.setItem("userRole", "Admin");
    sessionStorage.setItem("username", username);

    // Redirect to admin dashboard
    window.location.href = "admin.html";
  } else {
    errorMsg.innerHTML = "Incorrect username or password.";
  }
}

// Optional: logout function
function logout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}
