// Function to update the percentage label
function updatePercentageLabel(value) {
  document.getElementById("percentageLabel").textContent = `${value}%`;
}

// Function to hide random words in the user's input text
function hideWords() {
  const inputText = document.getElementById("userInput").value.trim();
  const outputDiv = document.getElementById("output");

  if (!inputText) {
    outputDiv.innerHTML = "<p>Please enter some text.</p>";
    return;
  }

  const hidePercentage = document.getElementById("hidePercentage").value / 100;

  // Split input text into words while keeping original formatting
  const words = inputText.split(/(\s+)/); // Split by spaces, keeping them

  // Filter to count only "real words" for hiding (non-punctuation words)
  const validWordsIndexes = [];
  words.forEach((word, index) => {
    if (/\w/.test(word)) {
      // Only include words that contain alphanumeric characters
      validWordsIndexes.push(index);
    }
  });

  const totalValidWords = validWordsIndexes.length;
  const numToHide = Math.ceil(totalValidWords * hidePercentage);

  // Randomly select indexes to hide
  const hiddenIndexes = new Set();
  let attempts = 0;

  while (hiddenIndexes.size < numToHide && attempts < totalValidWords * 2) {
    const randomIndex = Math.floor(Math.random() * totalValidWords);
    const actualIndex = validWordsIndexes[randomIndex]; // Map back to actual indexes in the array
    if (!hiddenIndexes.has(actualIndex)) {
      hiddenIndexes.add(actualIndex);
    }
    attempts++;
  }

  // Generate output with hidden words
  const processedWords = words.map((word, index) => {
    if (hiddenIndexes.has(index)) {
      const placeholder = "_".repeat(word.length); // Replace word with underscores
      return `<span class="hidden-word" aria-label="Hidden word. Click to reveal." data-word="${word}" onclick="revealWord(this)">${placeholder}</span>`;
    }
    return word;
  });

  // Display processed text inside a <pre> to preserve formatting
  outputDiv.innerHTML = `<pre>${processedWords.join("")}</pre>`;
}

// Function to reveal a hidden word
function revealWord(element) {
  if (element.classList.contains("revealed")) {
    // Toggle back to hidden
    const placeholder = "_".repeat(element.textContent.length);
    element.textContent = placeholder;
    element.classList.remove("revealed");
  } else {
    // Reveal the word
    const originalWord = element.getAttribute("data-word");
    element.textContent = originalWord;
    element.classList.add("revealed");
  }
}

// Function to reset the app
function resetApp() {
  document.getElementById("userInput").value = "";
  document.getElementById("output").innerHTML = "";
  document.getElementById("hidePercentage").value = 30;
  updatePercentageLabel(30);
}

// Attach event listeners
document.getElementById("hideWordsButton").addEventListener("click", hideWords);
document.getElementById("resetButton").addEventListener("click", resetApp);
