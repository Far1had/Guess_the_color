document.addEventListener("DOMContentLoaded", function () {
    // Funktion zum Generieren einer zufälligen Farbe im RGB-Format
    function generateRandomColor() {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    }

    // Funktion zum Setzen der Ziel-Farbe und der Farben der Buttons
    function setColors() {
        const targetColor = generateRandomColor();

        document.getElementById("outputColorCode").textContent = `🤔Guess what color is: ${targetColor} 🤔⁉️`;

        const buttonColors = [];
        const correctButtonIndex = Math.floor(Math.random() * 5);

        for (let i = 0; i < 5; i++) {
            const color = (i === correctButtonIndex) ? targetColor : generateRandomColor();
            buttonColors.push(color);
        }

        const buttonsContainer = document.getElementById("buttons-container");
        buttonsContainer.innerHTML = "";

        buttonColors.forEach(color => {
            const button = document.createElement("button");
            button.classList.add("star-button");
            button.innerHTML = '<div class="star"></div>';
            button.addEventListener("click", function () {
                checkAnswer(color, targetColor);
            });
            button.style.backgroundColor = color;
            buttonsContainer.appendChild(button);
        });
    }

    // Funktion zur Überprüfung der Antwort
    function checkAnswer(selectedColor, targetColor) {
        const resultMessage = document.getElementById("richtigOderFalschMessageAusgabe");
        if (selectedColor === targetColor) {
            resultMessage.textContent = "🥳🥳🥳Yeaaah Ja, die Farbe ist richtig!🥳🥳🥳";
            incrementCounter("correctCounter");
        } else {
            resultMessage.textContent = "🤪🤪🤪OOOH Nein, das ist nicht die richtige Farbe.🤪🤪🤪";
            incrementCounter("wrongCounter");
        }

        setColors();
    }

    // Funktion zum Inkrementieren des Zählers
    function incrementCounter(counterName) {
        let counter = localStorage.getItem(counterName) || 0;
        counter++;
        localStorage.setItem(counterName, counter);
        updateCounterDisplay();
    }

    // Funktion zur Anzeige des Zählers
    function updateCounterDisplay() {
        const correctCounter = localStorage.getItem("correctCounter") || 0;
        const wrongCounter = localStorage.getItem("wrongCounter") || 0;
        document.getElementById("correctCounter").textContent = `Richtig: ${correctCounter} ⭐️`;
        document.getElementById("wrongCounter").textContent = `Falsch: ${wrongCounter} ❌`;
    }

    // Funktion zum Starten des Spiels
    function startGame() {
        setColors();
        updateCounterDisplay();
    }

    // Funktion zum Zurücksetzen des Spiels
    function reset() {
        document.getElementById("richtigOderFalschMessageAusgabe").textContent = "";
        startGame();
    }

    startGame();

    document.getElementById("resetButton").addEventListener("click", reset);
});
