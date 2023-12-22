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
        // Ziel-Farbe im RGB-Format generieren
        const targetColor = generateRandomColor();

        // Ziel-Farbe im H1 setzen
        document.getElementById("outputColorCode").textContent = `Guess what color is: ${targetColor}`;

        // Buttons erstellen und Farben zuweisen
        const buttonColors = [];
        const correctButtonIndex = Math.floor(Math.random() * 5);

        for (let i = 0; i < 5; i++) {
            // Die Ziel-Farbe wird in einer zufällig gewählten Box platziert
            const color = (i === correctButtonIndex) ? targetColor : generateRandomColor();
            buttonColors.push(color);
        }

        // Buttons mit den generierten Farben erstellen
        const buttonsContainer = document.getElementById("buttons-container");
        buttonsContainer.innerHTML = ""; // Clear existing buttons

        buttonColors.forEach(color => {
            const button = document.createElement("button");
            button.style.backgroundColor = color;
            button.addEventListener("click", function () {
                checkAnswer(color, targetColor);
            });
            buttonsContainer.appendChild(button);
        });
    }

    // Funktion zur Überprüfung der Antwort
    function checkAnswer(selectedColor, targetColor) {
        const resultMessage = document.getElementById("richtigOderFalschMessageAusgabe");
        if (selectedColor === targetColor) {
            resultMessage.textContent = "🥳🥳🥳Yeaaah Ja, die Farbe ist richtig!🥳🥳🥳";
        } else {
            resultMessage.textContent = "🤪🤪🤪OOOH Nein, das ist nicht die richtige Farbe.🤪🤪🤪";
        }

        // Nach der Überprüfung die Farben aktualisieren
        setColors();
    }

    // Funktion zum Starten des Spiels
    function startGame() {
        setColors();
    }

    // Funktion zum Zurücksetzen des Spiels
    function reset() {
        // Zurücksetzen der Nachricht
        document.getElementById("richtigOderFalschMessageAusgabe").textContent = "";

        // Starten des Spiels
        startGame();
    }

    // Spiel beim Laden der Seite starten
    startGame();

    // Reset-Funktion mit dem Reset-Button verknüpfen
    document.getElementById("resetButton").addEventListener("click", reset);
});
