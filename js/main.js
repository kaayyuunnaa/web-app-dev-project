document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointmentForm');

  if (!form) {
    return;
  }

  const fields = [
    {
      input: document.getElementById('fullName'),
      message: 'Please enter your full name.'
    },
    {
      input: document.getElementById('emailAddress'),
      message: 'Please enter a valid email address.'
    },
    {
      input: document.getElementById('userMessage'),
      message: 'Please share your notes or scheduling context.'
    }
  ];

  fields.forEach(({ input }) => {
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.id = `${input.id}-error`;
    input.insertAdjacentElement('afterend', feedback);
  });

  const setFieldState = (input, isValid, message) => {
    input.classList.toggle('is-invalid', !isValid);
    input.setAttribute('aria-invalid', String(!isValid));

    const feedback = document.getElementById(`${input.id}-error`);
    if (feedback) {
      feedback.textContent = isValid ? '' : message;
    }
  };

  const validateField = (input, message) => {
    const value = input.value.trim();
    let isValid = value.length > 0;

    if (input.id === 'emailAddress' && value.length > 0) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailPattern.test(value);
    }

    setFieldState(input, isValid, message);
    return isValid;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isValid = true;

    fields.forEach(({ input, message }) => {
      const fieldValid = validateField(input, message);
      if (!fieldValid) {
        isValid = false;
      }
    });

    if (!isValid) {
      return;
    }

    form.reset();
    fields.forEach(({ input }) => {
      setFieldState(input, true, '');
    });
  });

  fields.forEach(({ input, message }) => {
    input.addEventListener('input', () => {
      validateField(input, message);
    });

    input.addEventListener('blur', () => {
      validateField(input, message);
    });
  });
});
