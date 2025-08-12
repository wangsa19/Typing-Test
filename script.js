// script.js

const texts_en = [
  "The art of programming is the art of organizing complexity. Good code is its own best documentation. When you feel the need to write a comment, first try to refactor the code so that any comment becomes superfluous.",
  "Design is not just what it looks like and feels like. Design is how it works. The best way to find out if you can trust somebody is to trust them. Innovation distinguishes between a leader and a follower.",
  "The only way to do great work is to love what you do. Stay hungry, stay foolish. Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
  "Technology is best when it brings people together. The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.",
  "Simplicity is the ultimate sophistication. It takes a lot of hard work to make something simple, to truly understand the underlying challenges and come up with elegant solutions.",
  "The future belongs to those who believe in the beauty of their dreams. Success is not final, failure is not fatal, it is the courage to continue that counts.",
];

const texts_id = [
  "Pendidikan adalah senjata paling ampuh yang bisa Anda gunakan untuk mengubah dunia. Jangan pernah berhenti belajar karena hidup tidak pernah berhenti mengajarkan.",
  "Setiap pagi di Afrika, seekor kijang bangun. Ia tahu ia harus berlari lebih cepat dari singa tercepat atau ia akan terbunuh. Setiap pagi seekor singa bangun. Ia tahu ia harus berlari lebih cepat dari kijang terlambat atau ia akan kelaparan.",
  "Untuk menjelajahi samudra baru, seseorang harus memiliki keberanian untuk melupakan pemandangan pantai. Keberanian bukanlah ketiadaan rasa takut, tetapi kemenangan atasnya.",
  "Inovasi digital terus mengubah cara kita hidup, bekerja, dan berkomunikasi. Mengadopsi teknologi baru adalah kunci untuk tetap relevan di era modern yang serba cepat.",
  "Waktu adalah sumber daya paling berharga yang tidak dapat diperbarui. Manfaatkan setiap detiknya untuk hal-hal yang berarti bagi pertumbuhan diri Anda dan orang lain.",
  "Bekerja keras dalam keheningan, biarkan kesuksesan Anda yang membuat kebisingan. Integritas adalah melakukan hal yang benar, bahkan ketika tidak ada yang melihat.",
];

let currentLanguageTexts = texts_en;
let currentText = "";
let currentIndex = 0;
let startTime = null;
let timeleft = 60;
let timer = null;
let isActive = false;
let errors = 0;
let totalChars = 0;

// Elemen DOM
const textContent = document.getElementById("textContent");
const typingInput = document.getElementById("typingInput");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const charactersElement = document.getElementById("characters");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const timerElement = document.getElementById("timer");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const resultsModal = document.getElementById("resultsModal");
const langEnBtn = document.getElementById("lang-en");
const langIdBtn = document.getElementById("lang-id");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

function loadNewText() {
  currentText =
    currentLanguageTexts[
      Math.floor(Math.random() * currentLanguageTexts.length)
    ];
  displayText();
  resetTest();
}

function displayText() {
  textContent.innerHTML = currentText
    .split("")
    .map(
      (char, index) =>
        `<span class="char pending" data-index="${index}">${char}</span>`
    )
    .join("");
}

function startTest() {
  isActive = true;
  startTime = Date.now();
  typingInput.disabled = false;
  typingInput.placeholder = "Start typing...";
  typingInput.focus();
  startBtn.style.display = "none";
  resetBtn.style.display = "inline-flex";
  progressText.textContent = "Test in progress...";
  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeleft--;
    timerElement.querySelector("span").textContent = timeleft;
    if (timeleft <= 0) {
      endTest();
    }
  }, 1000);
}

function handleInput(e) {
  if (!isActive) return;

  const inputValue = e.target.value;
  currentIndex = inputValue.length;

  updateDisplay(inputValue);
  updateStats();
  updateProgress();

  if (currentIndex === currentText.length) {
    endTest();
  }
}

function updateDisplay(inputValue) {
  const chars = document.querySelectorAll(".char");
  errors = 0; // Reset error di setiap input
  totalChars = currentIndex;

  chars.forEach((char, index) => {
    char.className = "char"; // Reset class

    if (index < inputValue.length) {
      if (inputValue[index] === currentText[index]) {
        char.classList.add("correct");
      } else {
        char.classList.add("incorrect");
        errors++; // FIX: Tambahkan jumlah error jika salah
      }
    } else if (index === inputValue.length) {
      char.classList.add("current");
    } else {
      char.classList.add("pending");
    }
  });
}

function updateStats() {
  const timeElapsed = (Date.now() - startTime) / 1000 / 60;
  if (timeElapsed === 0) return;

  const grossWPM = currentIndex / 5 / timeElapsed;
  const netWPM = Math.max(0, Math.round(grossWPM - errors / timeElapsed));
  const accuracy =
    totalChars > 0
      ? Math.round(((totalChars - errors) / totalChars) * 100)
      : 100;

  wpmElement.textContent = isFinite(netWPM) ? netWPM : 0;
  accuracyElement.textContent = accuracy;
  charactersElement.textContent = totalChars;
}

function updateProgress() {
  const progress = (currentIndex / currentText.length) * 100;
  progressFill.style.width = `${Math.min(progress, 100)}%`;
  if (progress >= 100) {
    progressText.textContent = "Completed!";
  } else {
    progressText.textContent = `${Math.round(progress)}% complete`;
  }
}

function endTest() {
  isActive = false;
  typingInput.disabled = true;
  clearInterval(timer);
  updateStats();
  showResults();
}

function showResults() {
  document.getElementById("finalWPM").textContent = wpmElement.textContent;
  document.getElementById("finalAccuracy").textContent =
    accuracyElement.textContent;
  document.getElementById("finalCharacters").textContent =
    charactersElement.textContent;
  resultsModal.classList.add("show");
}

function resetTest() {
  isActive = false;
  currentIndex = 0;
  errors = 0;
  totalChars = 0;
  timeleft = 60;
  startTime = null;

  clearInterval(timer);

  typingInput.value = "";
  typingInput.disabled = true;
  typingInput.placeholder = "Click start to begin typing...";
  timerElement.querySelector("span").textContent = timeleft;
  progressText.textContent = "Ready to Start";

  wpmElement.textContent = "0";
  accuracyElement.textContent = "100";
  charactersElement.textContent = "0";
  progressFill.style.width = "0%";

  startBtn.style.display = "inline-flex";
  resultsModal.classList.remove("show");

  // FIX: Jangan panggil loadNewText() di sini untuk menghindari loop
  displayText(); // Cukup tampilkan teks yang sudah dimuat
}

function closeResults() {
  resultsModal.classList.remove("show");
  loadNewText(); // Muat teks baru setelah menutup hasil
}

function toggleTheme() {
  body.classList.toggle("light-mode");
  const isLightMode = body.classList.contains("light-mode");
  localStorage.setItem("theme", isLightMode ? "light" : "dark");
  themeToggle.innerHTML = isLightMode
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i>';
}

// Event Listeners
langEnBtn.addEventListener("click", () => {
  currentLanguageTexts = texts_en;
  langEnBtn.classList.add("active");
  langIdBtn.classList.remove("active");
  loadNewText();
});

langIdBtn.addEventListener("click", () => {
  currentLanguageTexts = texts_id;
  langIdBtn.classList.add("active");
  langEnBtn.classList.remove("active");
  loadNewText();
});

startBtn.addEventListener("click", startTest);
resetBtn.addEventListener("click", loadNewText);
typingInput.addEventListener("input", handleInput);
typingInput.addEventListener("paste", (e) => e.preventDefault());
tryAgainBtn.addEventListener("click", closeResults);
themeToggle.addEventListener("click", toggleTheme);

// FIX: Gabungkan listener menjadi satu
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  loadNewText();
});
