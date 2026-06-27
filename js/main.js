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

  const submitButton = form.querySelector('button[type="submit"]');
  const successMessage = document.createElement('div');
  successMessage.className = 'alert alert-success mt-3 d-none';
  successMessage.id = 'formSuccessMessage';
  successMessage.setAttribute('role', 'status');
  successMessage.setAttribute('aria-live', 'polite');

  if (submitButton) {
    submitButton.insertAdjacentElement('beforebegin', successMessage);
  }

  const setFieldState = (input, isValid, message) => {
    const hasValue = input.value.trim().length > 0;
    input.classList.toggle('is-invalid', !isValid);
    input.classList.toggle('is-valid', isValid && hasValue);
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
      successMessage.classList.add('d-none');
      return;
    }

    form.reset();
    fields.forEach(({ input }) => {
      setFieldState(input, true, '');
    });

    successMessage.textContent = 'Your request has been received. We will contact you shortly.';
    successMessage.classList.remove('d-none');
  });

  fields.forEach(({ input, message }) => {
    input.addEventListener('input', () => {
      successMessage.classList.add('d-none');
      validateField(input, message);
    });

    input.addEventListener('blur', () => {
      validateField(input, message);
    });
  });

  // Theme Toggle Handler
  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButtonIcon(themeToggleBtn, savedTheme);

    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeButtonIcon(themeToggleBtn, newTheme);
    });
  }

  // Gallery Filter Logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button style
        filterButtons.forEach(b => {
          b.classList.remove('btn-primary', 'active');
          b.classList.add('btn-outline-primary');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('btn-primary', 'active');
        btn.classList.remove('btn-outline-primary');
        btn.setAttribute('aria-pressed', 'true');

        const filter = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            // Force reflow to ensure display block takes effect before fade-in transition
            item.offsetHeight;
            item.classList.remove('fade-out');
          } else {
            item.classList.add('fade-out');
            // Wait for scale/opacity transition before removing from layout flow
            setTimeout(() => {
              if (item.classList.contains('fade-out')) {
                item.style.display = 'none';
              }
            }, 300);
          }
        });
      });
    });
  }

  // Lightbox Modal Logic
  const galleryImages = document.querySelectorAll('.gallery-img');
  const lightboxModalEl = document.getElementById('lightboxModal');

  if (galleryImages.length > 0 && lightboxModalEl) {
    const lightboxModal = new bootstrap.Modal(lightboxModalEl);
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    galleryImages.forEach(img => {
      img.style.cursor = 'pointer';
      
      img.addEventListener('click', () => {
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        
        // Find caption from sibling heading
        const cardBody = img.closest('.p-4');
        const titleText = cardBody ? cardBody.querySelector('h2').textContent : '';

        if (lightboxImage) {
          lightboxImage.setAttribute('src', src);
          lightboxImage.setAttribute('alt', alt);
        }
        if (lightboxCaption) {
          lightboxCaption.textContent = titleText;
        }
        
        lightboxModal.show();
      });
    });
  }

  // Initialize Bootstrap Tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

  function updateThemeButtonIcon(button, theme) {
    const iconSpan = button.querySelector('.theme-icon');
    if (iconSpan) {
      iconSpan.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
    button.classList.toggle('btn-outline-light', theme !== 'dark');
    button.classList.toggle('btn-outline-warning', theme === 'dark');
  }
});
