const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const themebtn = document.getElementById("themebtn");

// ================= MENU MOBILE =================
if (hamburger && menu) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("active");
    }
  });
}

// ================= SKILLS ANIMATION =================
function animateSkillBars() {
  const fills = document.querySelectorAll(".skill-fill");

  fills.forEach((fill, index) => {
    const target = fill.dataset.skill; // FIX IMPORTANT
    if (!target) return;

    setTimeout(() => {
      fill.style.width = target + "%";
    }, 150 + index * 100);
  });
}

function initSkillsObserver() {
  const skillsSection = document.getElementById("skills-list");
  if (!skillsSection) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars();
          obs.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(skillsSection);
}

// ================= THEME =================
document.addEventListener("DOMContentLoaded", () => {
  initSkillsObserver();

  if (!themebtn) return;

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themebtn.textContent = "🌙";
  } else {
    themebtn.textContent = "☀️";
  }

  themebtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      themebtn.textContent = "🌙";
    } else {
      localStorage.setItem("theme", "light");
      themebtn.textContent = "☀️";
    }
  });
});
emailjs.init("VOTRE_PUBLIC_KEY");

const form = document.getElementById("contact-form");
const status = document.getElementById("status");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.send("VOTRE_SERVICE_ID",
                 "VOTRE_TEMPLATE_ID",
                 {
                    nom: document.getElementById("nom").value,
                    prenom: document.getElementById("prenom").value,
                    message: document.getElementById("message").value
                 })
    .then(() => {
        status.textContent = "Message envoyé avec succès !";
        form.reset();
    })
    .catch((error) => {
        status.textContent = "Erreur lors de l'envoi.";
        console.error(error);
    });
});