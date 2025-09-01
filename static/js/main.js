// tema oscuro
const saved = localStorage.getItem('theme');
if (saved) document.documentElement.classList.toggle('dark', saved === 'dark');
document.getElementById('themeToggle').addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});

// Verificar carga de imagen de perfil
function checkProfileImage() {
  const profileImg = document.querySelector('.profile-image');
  if (profileImg) {
    console.log('Profile image element found:', profileImg);
    console.log('Image src:', profileImg.src);
    
    // Verificar si la imagen se cargó correctamente
    if (profileImg.complete) {
      console.log('Image loaded successfully');
    } else {
      console.log('Image still loading...');
      profileImg.addEventListener('load', () => {
        console.log('Image loaded successfully');
      });
    }
    
    profileImg.addEventListener('error', (e) => {
      console.error('Error loading image:', e);
      console.log('Current src:', profileImg.src);
    });
  } else {
    console.log('Profile image element not found');
  }
}

// Efectos de partículas de fondo
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Tamaño aleatorio
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Posición aleatoria
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Animación personalizada
    particle.style.animationDelay = `${Math.random() * 6}s`;
    particle.style.animationDuration = `${Math.random() * 3 + 3}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// Animación de scroll suave
function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Animación de elementos al hacer scroll
function animateOnScroll() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observar elementos con animación
  const animatedElements = document.querySelectorAll('.animate-fade-in-up');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

// Efecto de parallax en el hero
function parallaxEffect() {
  const hero = document.querySelector('section');
  if (!hero) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const decorativeElements = hero.querySelectorAll('.absolute');
    decorativeElements.forEach((el, index) => {
      const speed = (index + 1) * 0.1;
      el.style.transform = `translateY(${rate * speed}px)`;
    });
  });
}

// Efecto de typing en el título
function typeWriterEffect() {
  const title = document.querySelector('h1');
  if (!title) return;
  
  const text = title.textContent;
  title.textContent = '';
  
  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < text.length) {
      title.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
    }
  }, 100);
}

// Efecto de hover en las tarjetas
function cardHoverEffects() {
  const cards = document.querySelectorAll('.experience-card, .skill-item');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Contador animado para estadísticas
function animateCounters() {
  const counters = document.querySelectorAll('.text-3xl');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + '+';
          }
        };
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  });
  
  counters.forEach(counter => observer.observe(counter));
}

// Efecto de cursor personalizado
function customCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
  });
  
  // Efecto de hover en enlaces
  const links = document.querySelectorAll('a, button');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
    });
    
    link.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
    });
  });
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Verificar imagen de perfil
  checkProfileImage();
  
  // Crear partículas de fondo
  createParticles();
  
  // Inicializar scroll suave
  smoothScroll();
  
  // Inicializar animaciones al hacer scroll
  animateOnScroll();
  
  // Inicializar efecto parallax
  parallaxEffect();
  
  // Inicializar efecto de typing
  setTimeout(typeWriterEffect, 500);
  
  // Inicializar efectos de hover en tarjetas
  cardHoverEffects();
  
  // Inicializar contadores animados
  animateCounters();
  
  // Inicializar cursor personalizado (opcional)
  // customCursor();
  
  // Efecto de carga inicial
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Efecto de scroll en la navegación
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
    nav.style.background = 'rgba(15, 23, 42, 0.95)';
    nav.style.backdropFilter = 'blur(20px)';
  } else {
    nav.classList.remove('scrolled');
    nav.style.background = 'rgba(255, 255, 255, 0.1)';
    nav.style.backdropFilter = 'blur(10px)';
  }
});

// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});