/* ============================
   Contact Form JS
   ============================ */

const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const mailtoFallbackBtn = document.getElementById('mailto-fallback-btn');
const apiBase = (window.PORTFOLIO_API_BASE || '').replace(/\/$/, '');
const contactEndpoint = `${apiBase}/api/contact`;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Basic validation
  if (!name || !email || !message) {
    hideMailtoFallback();
    showStatus('Please fill in all fields.', 'error');
    return;
  }
  if (!isValidEmail(email)) {
    hideMailtoFallback();
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  // Submit button loading state
  const submitBtn = document.querySelector('[form="contact-form"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span>Sending...</span>';
  submitBtn.disabled = true;

  try {
    // Send to Node.js server endpoint
    const response = await fetch(contactEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const payload = await response.json().catch(() => ({}));

    if (response.ok) {
      hideMailtoFallback();
      showStatus('Message sent! I\'ll get back to you soon.', 'success');
      form.reset();
    } else {
      throw new Error(payload.error || 'Server error while sending email.');
    }
  } catch (err) {
    showMailtoFallback(name, email, message);

    // Do not auto-open mail client; show errors and keep the UX in-page.
    if (err instanceof TypeError) {
      showStatus('Connection issue. Please try again in a moment.', 'error');
    } else {
      showStatus(err.message || 'Could not send message.', 'error');
    }
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

function showStatus(msg, type) {
  statusEl.textContent = msg;
  statusEl.classList.remove('hidden', 'bg-green-500/20', 'text-green-400', 'bg-red-500/20', 'text-red-400');

  if (type === 'success') {
    statusEl.classList.add('bg-green-500/20', 'text-green-400');
  } else {
    statusEl.classList.add('bg-red-500/20', 'text-red-400');
  }

  setTimeout(() => statusEl.classList.add('hidden'), 5000);
}

function showMailtoFallback(name, email, message) {
  if (!mailtoFallbackBtn) {
    return;
  }

  const mailtoLink = `mailto:edgaraltamirano13101@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
  mailtoFallbackBtn.href = mailtoLink;
  mailtoFallbackBtn.classList.remove('hidden');
}

function hideMailtoFallback() {
  if (!mailtoFallbackBtn) {
    return;
  }

  mailtoFallbackBtn.classList.add('hidden');
  mailtoFallbackBtn.href = '#';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Field focus animations
document.querySelectorAll('.form-field input, .form-field textarea').forEach(input => {
  input.addEventListener('focus', () => {
    input.closest('.form-field').style.transform = 'scale(1.01)';
    input.closest('.form-field').style.transition = 'transform 0.2s ease';
  });
  input.addEventListener('blur', () => {
    input.closest('.form-field').style.transform = 'scale(1)';
  });
});
