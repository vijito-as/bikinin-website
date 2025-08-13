// Lightweight client-side validation and fake submit
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const statusEl = document.getElementById('formStatus');

  function showError(input, message) {
    const errorEl = form.querySelector(`.error[data-for="${input.name}"]`);
    if (errorEl) errorEl.textContent = message || '';
  }

  function clearErrors() {
    form.querySelectorAll('.error').forEach((el) => (el.textContent = ''));
    if (statusEl) statusEl.textContent = '';
  }

  function isValidEmail(email) {
    return /.+@.+\..+/.test(email);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const date = (formData.get('date') || '').toString();

    let hasError = false;
    if (!name) { showError(form.name, 'Please enter your name'); hasError = true; }
    if (!email || !isValidEmail(email)) { showError(form.email, 'Enter a valid email'); hasError = true; }
    if (!date) { showError(form.date, 'Please select a date'); hasError = true; }

    if (hasError) return;

    if (statusEl) {
      statusEl.textContent = 'Sending…';
    }

    // Simulate async submit
    await new Promise((res) => setTimeout(res, 900));

    if (statusEl) {
      statusEl.textContent = 'Thanks! We will reach out shortly.';
    }
    form.reset();
  });

  form.addEventListener('reset', () => {
    clearErrors();
  });
})();


