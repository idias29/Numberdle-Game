const secretNumber = Math.floor(1000000 + Math.random() * 9000000).toString(); // Generate a 7-digit number
let attemptsLeft = 15;
const digitInputs = document.querySelectorAll(".digit-box");
const submitButton = document.getElementById("submit-btn");

// Focus management for digit inputs
digitInputs.forEach((input, index) => {
    input.addEventListener("input", (event) => {
        if (event.target.value.length === 1) {
            if (index < 6) digitInputs[index + 1].focus(); // Change index < 3 to index < 6
        }
    });
    input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && input.value === "") {
            if (index > 0) digitInputs[index - 1].focus();
        }
    });
});

submitButton.addEventListener("click", checkGuess);

function checkGuess() {
    const guess = Array.from(digitInputs).map(input => input.value).join('');
    if (guess.length !== 7 || isNaN(guess)) { // Change 4 to 7
        document.getElementById("feedback").innerText = "\nPlease enter a valid 7-digit number.";
        return;
    }

    // Create a row to display the guess
    let guessRow = document.createElement("div");
    guessRow.classList.add("guess-row");

    // Check each digit in the guess
    for (let i = 0; i < 7; i++) { // Change 4 to 7
        let guessBox = document.createElement("div");
        guessBox.classList.add("guess-box");
        guessBox.innerText = guess[i];

        if (guess[i] === secretNumber[i]) {
            // Correct digit in the correct position
            guessBox.classList.add("correct");
        } else if (secretNumber.includes(guess[i])) {
            // Correct digit but in the wrong position
            guessBox.classList.add("wrong-position");
        } else {
            // Incorrect digit
            guessBox.classList.add("incorrect");
        }

        guessRow.appendChild(guessBox);
    }

    // Add the guess row to the previous guesses section
    let previousGuesses = document.getElementById("previous-guesses");
    previousGuesses.prepend(guessRow);

    // Check if the guess is correct
    if (guess === secretNumber) {
        document.getElementById("feedback").innerText = "Congratulations! You guessed the number!";
        submitButton.disabled = true; // Disable the submit button after winning
        return;
    }

    // Decrement attempts and update the UI
    attemptsLeft--;
    document.getElementById("tries").innerText = "Tries left : " + attemptsLeft;

    // Check if the player has run out of attempts
    if (attemptsLeft === 0) {
        document.getElementById("feedback").innerText = "\nGame over! The number was " + secretNumber;
        submitButton.disabled = true; // Disable the submit button after losing
    }

    // Clear the input fields and refocus on the first digit box
    digitInputs.forEach(input => input.value = "");
    digitInputs[0].focus();
}
