// WHEN THE PAGE LOADS, SET EVERYTHING UP
document.addEventListener("DOMContentLoaded", function () {
  updateDate();
});

// UPDATE THE DATE IN THE HEADER
function updateDate() {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[now.getDay()];
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = now.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  document.getElementById("currentDay").textContent = dayName;
  document.getElementById("currentDate").textContent = formattedDate;
}

// DOM ELEMENT BINDINGS
const quoteElement = document.getElementById("quoteElement");
const quoteEmpty = document.getElementById("quoteEmpty");
const generateButton = document.getElementById("generateQuoteButton");
const favouriteButton = document.getElementById("favouriteQuoteButton");
const quoteForm = document.getElementById("quoteForm");
const quoteInput = document.getElementById("quoteInput");
const favouriteQuotesList = document.getElementById("favouriteQuotesList");
const personalQuotesList = document.getElementById("personalQuotesList");

// STATIC QUOTES ARRAY
const quotes = [
    "The only way to do great work is to love what you do. — Steve Jobs",
    "Believe you can and you're halfway there. — Theodore Roosevelt",
    "Life is what happens when you're busy making other plans.",
    "You miss 100% of the shots you don't take. — Wayne Gretzky",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Your time is limited, so don't waste it living someone else's life.",
    "Whether you think you can or you think you can't, you're right. — Henry Ford",
    "I have not failed. I've just found 10,000 ways that won't work.",
    "The only limit to our realization of tomorrow will be our doubts of today. — Franklin D. Roosevelt",
    "Do what you can, with what you have, where you are.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "The mind is everything. What you think you become.",
    "The journey of a thousand miles begins with a single step.",
    "That which does not kill us, only makes us stronger.",
    "Dream big and dare to fail.",
    "The purpose of our lives is to be happy.",
    "Turn your wounds into wisdom.",
    "In the end, we only regret the chances we didn't take.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "You only live once, but if you do it right, once is enough.",
    "Action is the foundational key to all success.",
    "Opportunities don't happen, you create them.",
    "The best revenge is massive success.",
    "The only person you should try to be better than is the person you were yesterday.",
    "Everything you've ever wanted is on the other side of fear.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Don't watch the clock; do what it does. Keep going.",
    "Keep your face always toward the sunshine - and shadows will fall behind you.",
    "A person who never made a mistake never tried anything new.",
    "It always seems impossible until it's done. — Nelson Mandela",
    "People will forget what you said, will forget what you did, but people will never forget how you made them feel. — Maya Angelou",
    "The best way out is always through. — Robert Frost",
    "Alone, we can do so little; together we can do so much. — Helen Keller",
    "Change your thoughts and you change your world. — Norman Vincent Peale",
    "You are enough just as you are. — Meghan Markle",
    "It does not matter how slowly you go as long as you do not stop. — Confucius",
    "Everything you can imagine is real. — Pablo Picasso",
    "The greatest thing you'll ever learn, is just to love and be loved in return.",
    "Don't worry about tomorrow, you did that yesterday!",
];

// IN-MEMORY STATE INITIALIZATION
let currentQuote = "";
const favouriteQuotes = [];
const userQuotes = [];

// LOAD FAVOURITE QUOTES FROM localStorage IF AVAILABLE
if (localStorage.getItem("favouriteQuotes")) {
    const storedFavourites = JSON.parse(localStorage.getItem("favouriteQuotes"));
    storedFavourites.forEach((quote) => {
        if (!favouriteQuotes.includes(quote)) {
            favouriteQuotes.push(quote);
        }        
    });
}

// LOAD USER QUOTES FOMR LOCAL STORAGE IF AVAILABLE
if (localStorage.getItem("userQuotes")) {
    const storedUserQuotes = JSON.parse(localStorage.getItem("userQuotes"));
    storedUserQuotes.forEach((quote) => {
        if (!userQuotes.includes(quote)) {
            userQuotes.push(quote);
        }
        // ENSURE THE QUOTE IS ALSO IN THE MAIN QUOTES ARRAY
        if (!quotes.includes(quote)) {
            quotes.push(quote);
        }
    });
}

// LOAD CURRENT QUOTE FROM localStorage IF AVAILABLE
if (localStorage.getItem("currentQuote")) {
    const storedQuote = localStorage.getItem("currentQuote");
    if (quotes.includes(storedQuote)) {
        currentQuote = storedQuote;
    }
}

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// CREATES HTML ELEMENTS FOR FAVOURITE QUOTES
function updateFavourites() {
    favouriteQuotesList.innerHTML = "";
    favouriteQuotes.forEach((quote) => {
        const listItem = document.createElement("li");
        listItem.className = "qotd__favourites--item";
        listItem.innerHTML = `
            <p class="qotd__favourite--quote">💜 - "${quote}"</p>
            <button class="qotd__button qotd__button--removeFavourite">Remove</button>
        `;
        favouriteQuotesList.appendChild(listItem);
        
    const removeButton = listItem.querySelector(".qotd__button--removeFavourite");
        removeButton.addEventListener("click", () => {
            favouriteQuotesList.removeChild(listItem);
            // REMOVE FROM favouriteQuotes ARRAYS
            const index = favouriteQuotes.indexOf(quote);
            if (index > -1) {
                favouriteQuotes.splice(index, 1);
            }
            updateDisplay();
        });
    });
}

// CREATES HTML ELEMENTS FOR PERSONAL QUOTES
function updatePersonalQuotes() {
    personalQuotesList.innerHTML = "";
    userQuotes.forEach((quote) => {
        const listItem = document.createElement("li");
        listItem.className = "qotd__personal--item";
        listItem.innerHTML = `
            <p class="qotd__personal--quote">🩶 - "${quote}"</p>
            <button class="qotd__button qotd__button--removePersonal">Remove</button>
        `;
        personalQuotesList.appendChild(listItem);
        
        removeButton.addEventListener("click", () => {
            personalQuotesList.removeChild(listItem);
            // REMOVE FROM userQuotes, favouriteQuotes, and quotes ARRAYS
            const index = userQuotes.indexOf(quote);
            if (index > -1) {
                userQuotes.splice(index, 1);
            }
            const favouriteIndex = favouriteQuotes.indexOf(quote);
            if (favouriteIndex > -1) {
                favouriteQuotes.splice(favouriteIndex, 1);
            }
            const allQuotesIndex = quotes.indexOf(quote);
            if (allQuotesIndex > -1) {
                quotes.splice(allQuotesIndex, 1);
            }
            updateDisplay();
        });
    });
}

// UPDATE THE DISPLAY OF QUOTES AND BUTTONS
function updateDisplay() {
    updateFavourites(); // UPDATES favouriteQuotesList
    updatePersonalQuotes(); // UPDATES personalQuotesList
    if (!currentQuote) {
        // IF NO QUOTE IS SELECTED, HIDE THE QUOTE ELEMENT AND SHOW THE EMPTY MESSAGE
        quoteElement.style.display = "none";
        quoteEmpty.style.display = "block";
        favouriteButton.style.display = "none";
    } else {
        // IF A QUOTE IS SELECTED, DISPLAY IT AND UPDATE THE FAVOURITE BUTTON
        quoteElement.style.display = "block";
        quoteEmpty.style.display = "none";
        quoteElement.textContent = `"${currentQuote}"`;
        favouriteButton.style.display = "inline-block";
        // UPDATE THE FAVOURITE BUTTON TEXT BASED ON WHETHER THE CURRENT QUOTE IS A FAVOURITE
        if (favouriteQuotes.includes(currentQuote)) {
            favouriteButton.textContent = "💔 Unfavourite Quote"; // IF INCLUDES
        } else {
            favouriteButton.textContent = "🧡 Favourite Quote"; // IT IT DOESN'T INCLUDE
        }
    }
    // IF THE favouriteQuotes ARRAY IS EMPTY (NO FAVOURITE QUOTES), DISPLAY AN EMPTY MESSAGE
    if (favouriteQuotes.length === 0) {
        favouriteQuotesList.innerHTML = "<li class='qotd__favourite--empty'>No favourite quotes yet.</li>";
    }
    // IF THE userQuotes ARRAY IS EMPTY (NO FAVOURITE QUOTES), DISPLAY AN EMPTY MESSAGE
    if (userQuotes.length === 0) {
        personalQuotesList.innerHTML = "<li class='qotd__personal--empty'>No personal quotes yet.</li>";
    }
    // SAVE THE CURRENT STATE TO localStorage
    localStorage.setItem("userQuotes", JSON.stringify(userQuotes));
    localStorage.setItem("favouriteQuotes", JSON.stringify(favouriteQuotes));
    localStorage.setItem("currentQuotes", JSON.stringify(currentQuote));
}

// RANDOM QUOTE GENERATION
generateButton.addEventListener("click", () => {
    currentQuote = getRandomQuote();
    updateDisplay();
});

// FAVOURITE BUTTON
favouriteButton.addEventListener("click", () => {
    if (!favouriteQuotes.includes(currentQuote)) {
        favouriteQuotes.push(currentQuote);
    } else {
        const index = favouriteQuotes.indexOf(currentQuote); // 1
        if (index > -1) { // DID YOU FIND IT ?
            favouriteQuotes.splice(index, 1);
        }
    }
    updateDisplay();
});

// ADD YOUR OWN QUOTE
quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newQuote = quoteInput.value.trim();
    if (newQuote) {
        quotes.push(newQuote);
        userQuotes.push(newQuote);
        quoteInput.value = "";
        currentQuote = newQuote;
        updateDisplay();
    }
});

updateDisplay();