// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
  // Add loading class to body
  document.body.classList.add('loading');
  
  // Create loading particles
  createLoadingParticles();
  
  // Simulate loading time and hide loading screen
  const loadingScreen = document.getElementById('loading-screen');
  const minLoadingTime = 2500; // Minimum loading time in milliseconds
  const startTime = Date.now();
  
  // Wait for all resources to load
  window.addEventListener('load', function() {
    const loadTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minLoadingTime - loadTime);
    
    setTimeout(() => {
      // Start fade out animation
      loadingScreen.classList.add('fade-out');
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
      
      // Remove loading screen from DOM after animation
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 800);
    }, remainingTime);
  });
});

// Create loading particles
function createLoadingParticles() {
  const particlesContainer = document.querySelector('.loading-particles');
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'loading-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Typing Animation
const typingText = document.getElementById("typing-text");
const words = ["Mobile Developer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Junior Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 100 : 150;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500; // Pause before next word
  }

  setTimeout(typeWriter, typeSpeed);
}

// Start typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeWriter, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(15, 15, 35, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 212, 255, 0.3)";
  } else {
    navbar.style.background = "rgba(15, 15, 35, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Special handling for skill items - animate every time they enter
      if (entry.target.classList.contains("skill-item")) {
        console.log("Skill item entering viewport:", entry.target); // Debug log
        entry.target.classList.add("animate-in");
        entry.target.classList.remove("animate-out");
      } else {
        // Add animation when element enters viewport
        entry.target.classList.add("fade-in-up");
        entry.target.classList.remove("fade-out-down");
      }
    } else {
      // For skill items, remove animation when leaving viewport
      if (entry.target.classList.contains("skill-item")) {
        entry.target.classList.remove("animate-in");
        entry.target.classList.add("animate-out");
        console.log("Skill item leaving viewport:", entry.target); // Debug log
      } else {
        // Remove animation when element leaves viewport for other elements
        entry.target.classList.remove("fade-in-up");
        entry.target.classList.add("fade-out-down");
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".section-title, .about-text, .skill-category, .project-card, .contact-info, .contact-form");
  animateElements.forEach((el) => observer.observe(el));

  // Observe skill items with main observer for re-triggering animation
  setTimeout(() => {
    const skillItems = document.querySelectorAll(".skill-item");
    console.log("Found skill items:", skillItems.length); // Debug log
    skillItems.forEach((item, index) => {
      observer.observe(item);
      console.log(`Observing skill item ${index + 1}`); // Debug log

      // Add a subtle entrance animation delay - lebih smooth
      item.style.transitionDelay = `${index * 0.15}s`;
    });
  }, 100);

  // Add continuous animations to skill items after they're loaded
  setTimeout(() => {
    const skillItems = document.querySelectorAll(".skill-item");
    skillItems.forEach((item) => {
      // Add random floating animation delays
      const randomDelay = Math.random() * 2;
      item.style.setProperty("--float-delay", `${randomDelay}s`);
    });
  }, 1000);
});

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceID: "service_69gr4il",
  templateID: "template_tcoj6tn",
  publicKey: "BS9Cxwt-fCxbX9qce",
};

// Initialize EmailJS
(function () {
  emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// Contact form handling
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data for validation
  const formData = new FormData(this);
  const name = formData.get("from_name");
  const email = formData.get("from_email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Simple validation
  if (!name || !email || !subject || !message) {
    showNotification("Please fill in all fields", "error");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  // Show loading state
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Send email using EmailJS
  emailjs
    .sendForm(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, this)
    .then(function (response) {
      console.log("SUCCESS!", response.status, response.text);
      showNotification("Message sent successfully! Thank you for contacting me.", "success");
      contactForm.reset();
    })
    .catch(function (error) {
      console.log("FAILED...", error);
      showNotification("Failed to send message. Please try again or contact me directly.", "error");
    })
    .finally(function () {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
});

// Notification function
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);

  // Close button functionality
  notification.querySelector(".notification-close").addEventListener("click", () => {
    notification.remove();
  });
}

// Add loading animation to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (this.classList.contains("btn-primary") || this.classList.contains("btn-secondary")) {
      // Add ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
  });
});

// Add ripple effect CSS
const style = document.createElement("style");
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Particle Effect
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 4 + 6 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles when page loads
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
});

// Add matrix rain effect
function createMatrixRain() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "-1";
  canvas.style.opacity = "0.1";

  document.body.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
  const charArray = chars.split("");
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function draw() {
    ctx.fillStyle = "rgba(15, 15, 35, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00d4ff";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 100);

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Initialize matrix rain
setTimeout(createMatrixRain, 2000);

// Toggle Description Function for Show More/Less with smooth animation
function toggleDescription(button) {
  const projectDescription = button.closest(".project-description");
  const shortDesc = projectDescription.querySelector(".description-short");
  const fullDesc = projectDescription.querySelector(".description-full");

  if (fullDesc.classList.contains("show")) {
    // Hide full description
    fullDesc.classList.remove("show");
    fullDesc.classList.add("hide");

    setTimeout(() => {
      fullDesc.style.display = "none";
      shortDesc.style.display = "block";
      shortDesc.classList.add("show");
    }, 300);

    button.textContent = "Show More";
    button.style.background = "linear-gradient(135deg, #00d4ff 0%, #ff00ff 100%)";
  } else {
    // Show full description
    shortDesc.style.display = "none";
    shortDesc.classList.remove("show");
    fullDesc.style.display = "block";

    setTimeout(() => {
      fullDesc.classList.add("show");
      fullDesc.classList.remove("hide");
    }, 10);

    button.textContent = "Show Less";
    button.style.background = "linear-gradient(135deg, #ff00ff 0%, #00d4ff 100%)";
  }
}

// Make toggleDescription function globally available
window.toggleDescription = toggleDescription;

console.log("Modern dark portfolio loaded successfully!");
