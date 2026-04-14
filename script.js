document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quote-form');
  const ownerEmail = 'gardenlandscapingpros@yahoo.com';

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const address = form.address.value.trim();
    const service = form.service.value;
    const details = form.details.value.trim() || 'No additional details provided.';

    const subject = encodeURIComponent(`Quote request from ${name}`);
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Address: ${address}`,
      `Service needed: ${service}`,
      '',
      `Project details:`,
      details,
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailtoUrl = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
  });
});
