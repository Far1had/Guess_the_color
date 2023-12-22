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

        document.getElementById("outputColorCode").textContent = `👉🏼👉🏼👉🏼  ${targetColor} 🤔⁉️🤔⁉️🤔⁉️`;

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
            button.style.borderRadius = "50px"; // Setze den Radius auf 50px
            buttonsContainer.appendChild(button);
        });
    }

    // Funktion zur Überprüfung der Antwort
    function checkAnswer(selectedColor, targetColor) {
        const resultMessage = document.getElementById("richtigOderFalschMessageAusgabe");
        const correctBox = document.querySelector(`#buttons-container .star-button[style*="background-color: ${targetColor}"]`);

        if (selectedColor === targetColor) {
            resultMessage.textContent = "⭐️Yeaaah ⭐️ Farbe ⭐️ richtig!⭐️";
            resultMessage.style.color = "blue"; // Setze die Farbe auf Blau für richtig
            incrementCounter("correctCounter");
        } else {
            resultMessage.textContent = "❌OOOH, ❌ Falsche ❌ Farbe.❌";
            resultMessage.style.color = "red"; // Setze die Farbe auf Rot für falsch

            // Ändere die Größe der richtigen Box
            if (correctBox) {
                correctBox.style.transform = "scale(1.2)"; // Ändere die Skalierung nach Bedarf
            }

            incrementCounter("wrongCounter");
        }

        // Füge einen Timer hinzu, um die Größe nach einer kurzen Zeit zurückzusetzen (optional)
        setTimeout(() => {
            if (correctBox) {
                correctBox.style.transform = "scale(1)"; // Zurücksetzen der Skalierung
            }
            setColors();
        }, 1000);
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
