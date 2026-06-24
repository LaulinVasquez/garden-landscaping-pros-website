document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quote-form');
  const feedback = document.getElementById('form-message');

  if (!form || !feedback) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const payload = Object.fromEntries(new FormData(form).entries());

    feedback.className = 'rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700';
    feedback.textContent = 'Sending your quote request...';

    try {
      const response = await fetch('/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data.errors
          ? Object.values(data.errors).join(' ')
          : data.message || 'Please correct the form and try again.';

        feedback.className = 'rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700';
        feedback.textContent = message;
        return;
      }

      feedback.className = 'rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700';
      feedback.textContent = data.message || 'Your quote request was sent.';
      form.reset();
    } catch (error) {
      feedback.className = 'rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700';
      feedback.textContent = 'We could not reach the server. Please try again later.';
    }
  });
});
