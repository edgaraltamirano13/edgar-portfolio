/* ============================
   Contact Form JS
   ============================ */

const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const apiBase = (window.PORTFOLIO_API_BASE || '').replace(/\/$/, '');
const contactEndpoint = `${apiBase}/api/contact`;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Basic validation
  if (!name || !email || !message) {
    showStatus('Please fill in all fields.', 'error');
    return;
  }
  if (!isValidEmail(email)) {
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

    if (response.ok) {
      showStatus('Message sent! I\'ll get back to you soon.', 'success');
      form.reset();
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    // Fallback: open mailto if server not available
    const mailtoLink = `mailto:edgaraltamirano13101@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
    showStatus('Opening your email client...', 'success');
  }

  submitBtn.innerHTML = originalText;
  submitBtn.disabled = false;
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
