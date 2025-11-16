const introOverlay = document.querySelector('.intro-overlay');
const startIntroReveal = () => {
  if (!introOverlay) return;
  introOverlay.classList.remove('is-hidden');
  setTimeout(() => {
    introOverlay.classList.add('is-hidden');
    setTimeout(() => introOverlay.remove(), 400);
  }, 2000);
};

if (document.readyState === 'complete') {
  startIntroReveal();
} else {
  window.addEventListener('load', startIntroReveal);
}

const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
  const toggleBtn = () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('is-visible');
    } else {
      scrollTopBtn.classList.remove('is-visible');
    }
  };
  window.addEventListener('scroll', toggleBtn);
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const visible = navLinks.getAttribute('data-visible') === 'true';
    navLinks.setAttribute('data-visible', (!visible).toString());
    navToggle.setAttribute('aria-expanded', (!visible).toString());
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.setAttribute('data-visible', 'false');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const stats = document.querySelectorAll('.stat[data-target]');
if (stats.length) {
  const animateValue = (el) => {
    const target = Number(el.dataset.target);
    const suffix = el.dataset.suffix ?? '';
    const duration = 1800;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  stats.forEach((stat) => observer.observe(stat));
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');
    if (button) {
      button.textContent = 'Message envoyé';
      button.disabled = true;
    }
  });
}
