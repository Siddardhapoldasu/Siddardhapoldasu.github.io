/* ================================================
   PORTFOLIO JAVASCRIPT
   Animated canvas, typing effect, scroll animations
   ================================================ */

// === CURSOR GLOW ===
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// === ANIMATED PARTICLE CANVAS ===
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let animationId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.hue = Math.random() > 0.6 ? 230 : (Math.random() > 0.5 ? 270 : 190);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = `hsl(${this.hue}, 70%, 65%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Create particles
for (let i = 0; i < 120; i++) {
  particles.push(new Particle());
}

// Connection lines
function drawConnections() {
  const maxDist = 130;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.12;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  drawConnections();
  animationId = requestAnimationFrame(animateCanvas);
}

animateCanvas();

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

function updateActiveNav() {
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];
  const scrollY = window.scrollY + 150;
  sections.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (link) link.classList.add('active');
    }
  });
}

// === HAMBURGER MENU ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// === TYPING EFFECT ===
const phrases = [
  'AI/ML Systems',
  'Computer Vision Apps',
  'Embedded Systems',
  'VLSI Designs',
  'Java Applications',
  'Deep Learning Models',
  'Intelligent Solutions'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeEffect() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, 60);
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    setTimeout(typeEffect, 80);
  }
}

setTimeout(typeEffect, 800);

// === CODE WINDOW ANIMATION ===
const codeLines = [
  '<span style="color:#8b5cf6">class</span> <span style="color:#06b6d4">Siddardha</span>:',
  '  <span style="color:#6366f1">name</span> = <span style="color:#10b981">"Siddardha Poldasu"</span>',
  '  <span style="color:#6366f1">role</span> = <span style="color:#10b981">"AI/ML Engineer"</span>',
  '  <span style="color:#6366f1">skills</span> = [',
  '    <span style="color:#10b981">"Python"</span>, <span style="color:#10b981">"Java"</span>,',
  '    <span style="color:#10b981">"C++"</span>, <span style="color:#10b981">"Verilog"</span>,',
  '    <span style="color:#10b981">"YOLOv8"</span>, <span style="color:#10b981">"GIS"</span>',
  '  ]',
  '',
  '  <span style="color:#8b5cf6">def</span> <span style="color:#06b6d4">passion</span>():',
  '    <span style="color:#8b5cf6">return</span> <span style="color:#10b981">"Building the future"</span>',
  '',
  '<span style="color:#475569"># Output: 🚀 Let\'s connect!</span>',
];

const codeDisplay = document.getElementById('code-display');
let lineIdx = 0;

function typeCodeLine() {
  if (lineIdx < codeLines.length) {
    const div = document.createElement('div');
    div.innerHTML = codeLines[lineIdx];
    codeDisplay.appendChild(div);
    div.style.opacity = '0';
    div.style.transform = 'translateY(5px)';
    div.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      div.style.opacity = '1';
      div.style.transform = 'translateY(0)';
    }, 50);
    lineIdx++;
    setTimeout(typeCodeLine, 180);
  }
}

setTimeout(typeCodeLine, 600);

// === STAT COUNTER ===
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// === SCROLL ANIMATIONS (Intersection Observer) ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;

      // Skill categories
      if (el.classList.contains('skill-category')) {
        const delay = parseInt(el.dataset.delay || 0);
        setTimeout(() => {
          el.classList.add('visible');
          // Animate skill bars
          el.querySelectorAll('.skill-fill').forEach(bar => {
            const width = bar.dataset.width;
            setTimeout(() => { bar.style.width = width + '%'; }, 200);
          });
        }, delay);
      }

      // Project cards
      if (el.classList.contains('project-card')) {
        const delay = parseInt(el.dataset.delay || 0);
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
      }

      // Stat counters
      if (el.classList.contains('stat-num')) {
        animateCounter(el);
      }

      observer.unobserve(el);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.skill-category, .project-card, .stat-num').forEach(el => {
  observer.observe(el);
});

// === PROJECT FILTERS ===
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        if (!card.classList.contains('visible')) {
          card.classList.add('visible');
        }
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// === CONTACT FORM ===
const form = document.getElementById('contact-form');
const toast = document.getElementById('toast');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('send-message-btn');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    showToast();
  }, 1200);
});

function showToast() {
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 3500);
}

// === SMOOTH SCROLL FOR NAV LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === HIGHLIGHT CARDS HOVER GLOW ===
document.querySelectorAll('.highlight-card, .contact-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.background = 'rgba(99, 102, 241, 0.06)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// === PROJECT CARDS TILT EFFECT ===
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// === INIT ===
console.log('%c✨ Siddardha Poldasu Portfolio', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with pure HTML, CSS & JS 🚀', 'color: #94a3b8; font-size: 12px;');
