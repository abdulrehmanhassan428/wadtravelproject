const BASE_URL = "https://wadtravelproject-production.up.railway.app";

const phoneRegex = /^[0-9]{10,15}$/;
const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("bookingForm");
    const fields = {
        package: document.querySelectorAll("input")[0],
        departureCity: document.querySelectorAll("input")[1],
        departureDate: document.querySelectorAll("input")[2],
        groupSize: document.querySelectorAll("input")[3],
        fullName: document.querySelectorAll("input")[4],
        phone: document.querySelectorAll("input")[5],
        cnic: document.querySelectorAll("input")[6],
        totalPersons: document.querySelectorAll("input")[7],
        totalPayment: document.querySelectorAll("input")[8],
        paymentMethod: document.querySelectorAll("input")[9],
        paymentPhone: document.querySelectorAll("input")[10],
        paymentScreenshot: document.querySelectorAll("input")[11]
    };

    const errorElements = {};
    Object.keys(fields).forEach(key => {
        const p = document.createElement("p");
        p.style.color = "red";
        p.style.marginTop = "3px";
        p.style.fontSize = "14px";
        fields[key].after(p);
        errorElements[key] = p;
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;
        Object.values(errorElements).forEach(e => e.textContent = "");

        for (let key in fields) {
            if (fields[key].type !== "file" && fields[key].value.trim() === "") {
                errorElements[key].textContent = "This field is required.";
                isValid = false;
            }
        }

        const today = new Date().setHours(0,0,0,0);
        const chosenDate = new Date(fields.departureDate.value).setHours(0,0,0,0);
        if (chosenDate < today) {
            errorElements.departureDate.textContent = "Departure date cannot be in the past.";
            isValid = false;
        }

        if (fields.groupSize.value <= 0) {
            errorElements.groupSize.textContent = "Enter a valid group size.";
            isValid = false;
        }
        if (fields.totalPersons.value <= 0) {
            errorElements.totalPersons.textContent = "Enter total persons.";
            isValid = false;
        }
        if (fields.totalPayment.value <= 0) {
            errorElements.totalPayment.textContent = "Enter a valid payment amount.";
            isValid = false;
        }

        if (!phoneRegex.test(fields.phone.value)) {
            errorElements.phone.textContent = "Enter a valid phone number (10–15 digits).";
            isValid = false;
        }
        if (!phoneRegex.test(fields.paymentPhone.value)) {
            errorElements.paymentPhone.textContent = "Enter a valid phone number for payment.";
            isValid = false;
        }
        if (!cnicRegex.test(fields.cnic.value)) {
            errorElements.cnic.textContent = "Format must be 12345-1234567-1.";
            isValid = false;
        }
        if (fields.paymentScreenshot.files.length === 0) {
            errorElements.paymentScreenshot.textContent = "Please upload payment screenshot.";
            isValid = false;
        }

        if (isValid) {
            const data = {
                packageName: fields.package.value,
                departureCity: fields.departureCity.value,
                departureDate: fields.departureDate.value,
                groupSize: fields.groupSize.value,
                fullName: fields.fullName.value,
                phone: fields.phone.value,
                cnic: fields.cnic.value,
                totalPersons: fields.totalPersons.value,
                totalPayment: fields.totalPayment.value,
                paymentMethod: fields.paymentMethod.value
            };

            fetch(`${BASE_URL}/book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(result => {
                alert(result.message);
                window.location.href = "WadProject.html";
            })
            .catch(() => {
                alert("Booking failed. Server error.");
            });
        }
    });
});
