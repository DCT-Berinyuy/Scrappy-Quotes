// script.js
const quotes = {
  programming: [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "I don’t need a debugger, I have printf().",
    "There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors."
  ],
  life: [
    "I’m on a seafood diet. I see food, and I eat it.",
    "I put my phone in airplane mode, but it’s not flying. False advertising!",
    "I’m not lazy, I’m in energy-saving mode."
  ],
  art: [
    "I’m not a great artist; I’m just a good artist with great erasers.",
    "Art is never finished, only abandoned. Mostly because I’m tired.",
    "I don’t make mistakes. I create happy little accidents."
  ]
};

const categorySelect = document.getElementById("category");
const generateBtn = document.getElementById("generate-btn");
const quoteText = document.getElementById("quote-text");
const provocativeMessage = document.getElementById("provocative-message");

let moveCount = 0; // Track how many times the button has moved
let maxMoves = 2; // Start with 2 moves, increase by 2 each time
const maxMaxMoves = 18; // Maximum number of moves before resetting

// Provocative messages to display when the user misses the button
const provocativeMessages = [
  "Missed again! Are you even trying?",
  "Wow, you’re really bad at this.",
  "Click me, I dare you!",
  "Is your mouse broken?",
  "You’re making this too easy for me.",
  "I’m starting to feel sorry for you.",
  "Maybe try using both hands?",
  "This is getting embarrassing.",
  "I’m faster than your reflexes!",
  "You’re not very good at this, are you?"
];

// Function to move the button to a random position
function moveButtonRandomly() {
  if (moveCount < maxMoves) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const buttonWidth = generateBtn.offsetWidth;
    const buttonHeight = generateBtn.offsetHeight;

    const randomX = Math.floor(Math.random() * (screenWidth - buttonWidth));
    const randomY = Math.floor(Math.random() * (screenHeight - buttonHeight));

    generateBtn.style.left = `${randomX}px`;
    generateBtn.style.top = `${randomY}px`;

    moveCount++; // Increment the move counter

    // Display provocative messages after the fourth hover
    if (moveCount >= 4) {
      const randomMessage = provocativeMessages[Math.floor(Math.random() * provocativeMessages.length)];
      provocativeMessage.textContent = randomMessage;
    }
  } else {
    // After maxMoves, allow the button to be clicked
    generateBtn.removeEventListener("mouseover", moveButtonRandomly);
    provocativeMessage.textContent = ""; // Clear the message
  }
}

// Reset the button movement process
function resetButtonMovement() {
  moveCount = 0; // Reset the move counter
  generateBtn.addEventListener("mouseover", moveButtonRandomly); // Re-enable movement
}

// Move the button randomly when the user hovers over it
generateBtn.addEventListener("mouseover", moveButtonRandomly);

// Generate a quote when the button is clicked
generateBtn.addEventListener("click", () => {
  let selectedCategory = categorySelect.value;

  // Stupid twist: If "Art" is selected, randomly pick a different category
  if (selectedCategory === "art") {
    const categories = Object.keys(quotes).filter(cat => cat !== "art");
    selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    quoteText.textContent = `You chose Art, but here's a ${selectedCategory} quote instead!`;
  } else {
    quoteText.textContent = "";
  }

  const categoryQuotes = quotes[selectedCategory];
  const randomQuote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
  quoteText.textContent += `\n\n"${randomQuote}"`;

  // Increase maxMoves by 2 for the next round
  maxMoves += 2;
  if (maxMoves > maxMaxMoves) {
    maxMoves = 2; // Reset to 2 moves after reaching 18
  }

  // Reset the button movement process
  resetButtonMovement();
});