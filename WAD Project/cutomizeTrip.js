const phoneRegex = /^[0-9]{10,15}$/;  
const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;  

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");
    const inputs = document.querySelectorAll("input");

    const fields = {
        destination: inputs[0],
        tripDays: inputs[1],
        groupSize: inputs[2],
        tripType: inputs[3],
        fullName: inputs[4],
        cnic: inputs[5],
        totalPersons: inputs[6],
        totalBudget: inputs[7],
        meals: inputs[8],
        guide: inputs[9],
        paymentMethod: inputs[10],
        phone: inputs[11],
        screenshot: inputs[12]
    };

    const error = {};
    Object.keys(fields).forEach(key => {
        const p = document.createElement("p");
        p.style.color = "red";
        p.style.marginTop = "3px";
        p.style.fontSize = "13px";
        fields[key].after(p);
        error[key] = p;
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;
        Object.values(error).forEach(e => e.textContent = "");

        for (let key in fields) {
            if (fields[key].type !== "file" && fields[key].value.trim() === "") {
                error[key].textContent = "This field is required.";
                isValid = false;
            }
        }

        const numericFields = ["tripDays", "groupSize", "totalPersons", "totalBudget"];
        numericFields.forEach(f => {
            if (fields[f].value && isNaN(fields[f].value)) {
                error[f].textContent = "Enter a valid number.";
                isValid = false;
            }
            if (fields[f].value <= 0) {
                error[f].textContent = "Value must be greater than 0.";
                isValid = false;
            }
        });

        if (fields.cnic.value.trim() !== "" && !cnicRegex.test(fields.cnic.value)) {
            error.cnic.textContent = "Format must be 12345-1234567-1.";
            isValid = false;
        }

        if (!phoneRegex.test(fields.phone.value)) {
            error.phone.textContent = "Enter a valid phone number (10–15 digits).";
            isValid = false;
        }

        if (fields.screenshot.files.length === 0) {
            error.screenshot.textContent = "Please upload payment screenshot.";
            isValid = false;
        }

        if (isValid) {
            alert("Booking Confirmed!");
            window.location.href = "WadProject.html";
        }
    });

});

