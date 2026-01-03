document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById(
      "confirmPasswordError"
    );

    let isValid = true;

    // Validate username
    if (!username) {
      usernameError.textContent = "Username is required.";
      isValid = false;
    } else if (username.length < 6) {
      usernameError.textContent = "Username must be at least 6 characters.";
      isValid = false;
    } else {
      usernameError.textContent = "";
    }

    // Validate password
    if (!password) {
      passwordError.textContent = "Password is required.";
      isValid = false;
    } else if (password.length < 8) {
      passwordError.textContent = "Password must be at least 8 characters.";
      isValid = false;
    } else {
      passwordError.textContent = "";
    }

    // Validate confirm password
    if (!confirmPassword) {
      confirmPasswordError.textContent = "Please confirm your password.";
      isValid = false;
    } else if (confirmPassword !== password) {
      confirmPasswordError.textContent = "Passwords do not match.";
      isValid = false;
    } else {
      confirmPasswordError.textContent = "";
    }

    // Redirect if all valid
    if (isValid) {
      window.location.href = "/";
    }
  });
