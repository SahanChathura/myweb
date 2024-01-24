//  DEWAGE SAHAN CHATHURA PERERA M22W7351 
document.addEventListener("DOMContentLoaded", function () {
  startTimer();
});

function startTimer() {
  const timerElement = document.getElementById("timer");

  function updateTimer() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    timerElement.innerText = `Current Time: ${hours}:${minutes}:${seconds}`;
  }

  setInterval(updateTimer, 1000);
}

function submitForm() {
  try {
    const form = document.getElementById("surveyForm");
    const errorMessage = document.getElementById("errorMessage");
    const jsonOutput = document.getElementById("jsonOutput");

    const isValid = validateForm();

    if (isValid) {
      const formData = serializeForm(form);
      jsonOutput.value = JSON.stringify(formData, null, 2);
      errorMessage.innerText = "";
    } else {
      errorMessage.innerText = "Please fill in all the required fields with valid values.";
      jsonOutput.value = "";
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function validateForm() {
  const emailInput = document.getElementById("email");
  const nameInput = document.getElementById("name");
  const playAgeInput = document.getElementById("playAge");
  const gamingHoursInput = document.getElementById("gamingHours");
  const preferredGenreInput = document.querySelectorAll('input[name="preferredGenre[]"]:checked');

  // Check if required fields are not empty
  if (!emailInput.value || !nameInput.value || !playAgeInput.value || !gamingHoursInput.value || (preferredGenreInput && preferredGenreInput.length === 0)) {
    return false; 
  }

  // Check if the email is in a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    return false; 
  }

  // Check if age is a valid number and within a reasonable range
  if (isNaN(playAgeInput.value) || playAgeInput.value < 0 || playAgeInput.value > 120) {
    return false; 
  }

  // Check if gaming hours is a valid number and not negative
  if (isNaN(gamingHoursInput.value) || gamingHoursInput.value < 0) {
    return false; 
  }



  return true; 
}

function serializeForm(form) {
  const formData = {};
  const elements = form.elements;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (element.type !== "button") {
      if (element.type === "select-multiple" || element.type === "checkbox") {
        // For multi-select elements and checkboxes, collect selected options
        const selectedOptions = [];
        if (element.options) {
          for (let j = 0; j < element.options.length; j++) {
            if (element.options[j].selected || (element.type === "checkbox" && element.checked)) {
              selectedOptions.push(element.options[j].value);
            }
          }
        }
        formData[element.name] = selectedOptions;
      } else {
        formData[element.name] = element.value;
      }
    }
  }

  return formData;
}
