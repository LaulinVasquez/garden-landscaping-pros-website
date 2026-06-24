class Quote {
  constructor(payload = {}) {
    this.name = payload.name || '';
    this.email = payload.email || '';
    this.phone = payload.phone || '';
    this.address = payload.address || '';
    this.service = payload.service || '';
    this.details = payload.details || '';
  }

  normalize() {
    return {
      name: this.name.trim(),
      email: this.email.trim().toLowerCase(),
      phone: this.phone.trim(),
      address: this.address.trim(),
      service: this.service.trim(),
      details: this.details.trim() || 'No additional details provided.',
    };
  }

  validate() {
    const errors = {};
    const data = this.normalize();

    if (!data.name || data.name.length < 2) {
      errors.name = 'Please enter your name.';
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s.'-]{2,80}$/.test(data.name)) {
      errors.name = 'Please use letters and common punctuation in your name.';
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!data.phone || !/^\+?[0-9\s().-]{7,15}$/.test(data.phone)) {
      errors.phone = 'Please enter a valid phone number.';
    }

    if (!data.address || data.address.length < 5) {
      errors.address = 'Please enter the property address.';
    }

    if (!data.service) {
      errors.service = 'Please select the service you need.';
    }

    if (data.details.length > 1200) {
      errors.details = 'Project details cannot exceed 1200 characters.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  toEmailContent() {
    const data = this.normalize();
    return [
      'New Quote Request',
      '=================',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Address: ${data.address}`,
      `Service needed: ${data.service}`,
      '',
      'Project details:',
      data.details,
    ].join('\n');
  }
}

module.exports = Quote;
