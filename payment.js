const form = document.querySelector("#signup-form");
const errorMessage = document.querySelector("#error-message");
const successMessage = document.querySelector("#success-message");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

  // Get form fields values
  const username = form.elements.username.value.trim();
  const email = form.elements.email.value.trim();
  const password = form.elements.password.value.trim();
  const confirmPassword = form.elements["confirm-password"].value.trim();
  const birthdate = form.elements.birthdate.value.trim();

  // Validate form fields
  if (
    username === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === "" ||
    birthdate === ""
  ) {
    errorMessage.textContent = "Please fill in all required fields.";
    successMessage.textContent = "";
    return;
  }

  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match.";
    successMessage.textContent = "";
    return;
  }

  // Validate email format
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    errorMessage.textContent = "Invalid email format.";
    successMessage.textContent = "";
    return;
  }

  // Validate birthdate format
  const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!birthdateRegex.test(birthdate)) {
    errorMessage.textContent =
      "Invalid birthdate format. Please use YYYY-MM-DD.";
    successMessage.textContent = "";
    return;
  }

  // Submit form data
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("birthdate", birthdate);

  fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        errorMessage.textContent = data.error;
        successMessage.textContent = "";
      } else {
        successMessage.textContent = "Signup successful!";
        errorMessage.textContent = "";
        form.reset();
        window.location.replace("payment.html");
      }
    })
    .catch((error) => {
      errorMessage.textContent = "Something went wrong.";
      successMessage.textContent = "";
    });
});