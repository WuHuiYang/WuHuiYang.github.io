document.addEventListener('DOMContentLoaded', () => {

  // ── Typing Effect ──
  const typingEl = document.getElementById('typingText');
  const phrases = [
    'AI应用开发工程师',
    'AI全栈开发工程师',
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;
  const type = () => {
    const current = phrases[phraseIdx];
    if (!deleting) {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) { setTimeout(() => { deleting = true; type(); }, 2000); return; }
      setTimeout(type, 80);
    } else {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; setTimeout(type, 500); return; }
      setTimeout(type, 40);
    }
  };
  setTimeout(type, 1000);

  // ── Cursor Glow ──
  const glow = document.getElementById('cursorGlow');
  if (glow && window.innerWidth > 768) {
    let mx = 0, my = 0, gx = 0, gy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function animate() {
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;
      glow.style.left = gx + 'px';
      glow.style.top = gy + 'px';
      requestAnimationFrame(animate);
    })();
  }

  // ── Particle Field ──
  const particleField = document.getElementById('particleField');
  if (particleField && window.innerWidth > 768) {
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position:absolute;
        width:${2 + Math.random() * 3}px;
        height:${2 + Math.random() * 3}px;
        background:rgba(59,130,246,${0.1 + Math.random() * 0.3});
        border-radius:50%;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        animation:particleDrift ${10 + Math.random() * 20}s linear infinite;
        animation-delay:${-Math.random() * 20}s;
      `;
      particleField.appendChild(p);
    }
    const style = document.createElement('style');
    style.textContent = `@keyframes particleDrift{0%{transform:translate(0,0) scale(1);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translate(${Math.random()>0.5?'':'-'}${50+Math.random()*100}px,${-100-Math.random()*200}px) scale(0);opacity:0}}`;
    document.head.appendChild(style);
  }

  // ── Floating Nav ──
  const nav = document.getElementById('floatingNav');
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-links a');

  const updateNav = () => {
    nav.classList.toggle('visible', window.scrollY > 100);
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === current));
  };
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ── Reveal on Scroll ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Tilt effect on cards ──
  document.querySelectorAll('.experience-card, .contact-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) perspective(800px) rotateX(${y * -2}deg) rotateY(${x * 2}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // ── Parallax orbs ──
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const s = window.scrollY;
      document.querySelectorAll('.gradient-orb').forEach((orb, i) => {
        orb.style.transform = `translateY(${s * (0.1 + i * 0.05)}px)`;
      });
    }, { passive: true });
  }

  // ── Smooth scroll for navigation links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
