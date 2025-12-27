const BASE_URL = "https://wadtravelproject-production.up.railway.app";

document.addEventListener("DOMContentLoaded", function() {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const emailError = document.createElement("p");
    const passError = document.createElement("p");

    emailError.style.color = "red";
    passError.style.color = "red";

    emailInput.after(emailError);
    passwordInput.after(passError);

    form.addEventListener("submit", async function(event){
        event.preventDefault();
        let isValid = true;

        emailError.textContent = "";
        passError.textContent = "";

        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if (!passwordRegex.test(passwordInput.value.trim())) {
            passError.textContent = "Password must be 6+ chars, include uppercase, lowercase, number, and special character.";
            isValid = false;
        }

        if (isValid) {
            const data = {
                email: emailInput.value.trim(),
                password: passwordInput.value.trim()
            };

            try {
                const response = await fetch(`${BASE_URL}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                alert(result.message);

                if (result.message === "Login successful") {
                    window.location.href = "WadProject.html";
                }

            } catch (error) {
                alert("Server error. Please try again later.");
            }
        }
    });
});
