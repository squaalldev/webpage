const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const form = document.querySelector('[data-contact-form]');
const formStatus = document.querySelector('[data-form-status]');
const year = document.querySelector('[data-year]');

const updateHeader = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

year.textContent = new Date().getFullYear();

menuToggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get('name').trim();
  const phone = formData.get('phone').trim();
  const pet = formData.get('pet').trim();
  const message = formData.get('message').trim();

  if (!name || !phone || !pet || !message) {
    formStatus.textContent = 'Completa todos los campos para enviar tu solicitud.';
    return;
  }

  const whatsappMessage = encodeURIComponent(
    `Hola, soy ${name}. Mi WhatsApp es ${phone}. Mi perro se llama ${pet}. Síntomas: ${message}`
  );

  formStatus.textContent = 'Solicitud lista. Te abriremos WhatsApp para enviarla.';
  window.open(`https://wa.me/5215555555555?text=${whatsappMessage}`, '_blank', 'noopener');
  form.reset();
});
