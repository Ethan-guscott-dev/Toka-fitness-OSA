// Mobile Menu Toggle
const menu = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Typing / Rotating Hero Text Effect
const words = ['Bodybuilding', 'Strength Training', 'Fat Loss', 'Weightlifting', 'Cardio Fitness'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const textElement = document.querySelector('.multiple-text');

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 60 : 110;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1500; // Pause at full word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// Modal Functionality for Join Buttons
const modal = document.getElementById('joinModal');
const closeModal = document.getElementById('closeModal');
const openModalBtns = document.querySelectorAll('.open-modal');
const selectedPlanText = document.getElementById('selectedPlanText');
const joinForm = document.getElementById('joinForm');
const successMsg = document.getElementById('successMsg');

openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const plan = btn.getAttribute('data-plan') || 'Membership';
        selectedPlanText.textContent = `Selected Option: ${plan}`;
        successMsg.style.display = 'none';
        joinForm.reset();
        modal.classList.add('show');
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.style.display = 'block';
    setTimeout(() => {
        modal.classList.remove('show');
    }, 2000);
});



// Login signup page

const authCard = document.getElementById("authCard");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");
const resetBtn = document.getElementById("resetBtn");
const errorBox = document.getElementById("errorBox");
const successBox = document.getElementById("successBox");

const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupMsg = document.getElementById("signupMsg");

// Store users in localStorage with a default demo account
const getUsers = () => {
  const saved = JSON.parse(localStorage.getItem("demo_users") || "{}");
  if (!saved["user@example.com"]) {
    saved["user@example.com"] = "password123";
  }
  return saved;
};

let wrongAttempts = 0;

const errorMessages = [
  "say nothing",
  "say mums you forgot",
  "yeah ggs"
];

function triggerShake() {
  authCard.classList.remove("shake");
  void authCard.offsetWidth; // restart animation
  authCard.classList.add("shake");
}

// Tab switching
loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
});

signupTab.addEventListener("click", () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
});

// Sign Up handler
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signupEmail.value.trim().toLowerCase();
  const password = signupPassword.value;

  const users = getUsers();
  users[email] = password;
  localStorage.setItem("demo_users", JSON.stringify(users));

  signupMsg.textContent = "Account created! Switch to Log In to test it.";
  signupMsg.classList.remove("hidden");
  signupForm.reset();
});

// Log In handler
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (wrongAttempts >= 3) return;

  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value;
  const users = getUsers();

  successBox.classList.add("hidden");

  if (users[email] && users[email] === password) {
    wrongAttempts = 0;
    errorBox.classList.add("hidden");
    successBox.textContent = "Logged in successfully!";
    successBox.classList.remove("hidden");
    return;
  }

  // Wrong password or unknown account
  const message = errorMessages[wrongAttempts];
  wrongAttempts++;

  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
  triggerShake();

  if (wrongAttempts === 3) {
    loginEmail.disabled = true;
    loginPassword.disabled = true;
    loginBtn.disabled = true;
    resetBtn.classList.remove("hidden");
  }
});

// Reset lockout for testing
resetBtn.addEventListener("click", () => {
  wrongAttempts = 0;
  loginEmail.disabled = false;
  loginPassword.disabled = false;
  loginBtn.disabled = false;
  loginPassword.value = "";
  errorBox.classList.add("hidden");
  successBox.classList.add("hidden");
  resetBtn.classList.add("hidden");
});
