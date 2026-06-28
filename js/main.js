document.addEventListener('DOMContentLoaded', () => {
  // --- 1. APPOINTMENT FORM VALIDATION (contact.html) ---
  const appointmentForm = document.getElementById('appointmentForm');

  if (appointmentForm) {
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
      if (input) {
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.id = `${input.id}-error`;
        input.insertAdjacentElement('afterend', feedback);
      }
    });

    const submitButton = appointmentForm.querySelector('button[type="submit"]');
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

    appointmentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let isValid = true;

      fields.forEach(({ input, message }) => {
        if (input) {
          const fieldValid = validateField(input, message);
          if (!fieldValid) {
            isValid = false;
          }
        }
      });

      if (!isValid) {
        successMessage.classList.add('d-none');
        return;
      }

      appointmentForm.reset();
      fields.forEach(({ input }) => {
        if (input) {
          setFieldState(input, true, '');
        }
      });

      successMessage.textContent = 'Your request has been received. We will contact you shortly.';
      successMessage.classList.remove('d-none');
    });

    fields.forEach(({ input, message }) => {
      if (input) {
        input.addEventListener('input', () => {
          successMessage.classList.add('d-none');
          validateField(input, message);
        });

        input.addEventListener('blur', () => {
          validateField(input, message);
        });
      }
    });
  }

  // --- 2. TESTIMONIAL FORM VALIDATION & DYNAMIC REVIEWS (testimonials.html) ---
  const testimonialForm = document.getElementById('testimonialForm');
  const reviewsContainer = document.getElementById('reviewsContainer');

  if (testimonialForm) {
    const testimonialFields = [
      {
        input: document.getElementById('patientName'),
        message: 'Please enter your full name.'
      },
      {
        input: document.getElementById('patientRole'),
        message: 'Please select a patient type/category.'
      },
      {
        input: document.getElementById('ratingValue'),
        message: 'Please select a rating value.'
      },
      {
        input: document.getElementById('testimonialText'),
        message: 'Please share your smile story.'
      }
    ];

    testimonialFields.forEach(({ input }) => {
      if (input) {
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.id = `${input.id}-error`;
        input.insertAdjacentElement('afterend', feedback);
      }
    });

    const submitBtn = testimonialForm.querySelector('button[type="submit"]');
    const successMsg = document.createElement('div');
    successMsg.className = 'alert alert-success mt-3 d-none';
    successMsg.id = 'testimonialSuccessMsg';
    successMsg.setAttribute('role', 'status');
    successMsg.setAttribute('aria-live', 'polite');

    if (submitBtn) {
      submitBtn.insertAdjacentElement('beforebegin', successMsg);
    }

    const setTestimonialFieldState = (input, isValid, message) => {
      const hasValue = input.value.trim().length > 0;
      input.classList.toggle('is-invalid', !isValid);
      input.classList.toggle('is-valid', isValid && hasValue);
      input.setAttribute('aria-invalid', String(!isValid));

      const feedback = document.getElementById(`${input.id}-error`);
      if (feedback) {
        feedback.textContent = isValid ? '' : message;
      }
    };

    const validateTestimonialField = (input, message) => {
      const value = input.value.trim();
      let isValid = value.length > 0;

      if (input.tagName.toLowerCase() === 'select') {
        isValid = value !== '' && value !== null && value !== undefined;
      }

      setTestimonialFieldState(input, isValid, message);
      return isValid;
    };

    testimonialForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let isValid = true;

      testimonialFields.forEach(({ input, message }) => {
        if (input) {
          const fieldValid = validateTestimonialField(input, message);
          if (!fieldValid) {
            isValid = false;
          }
        }
      });

      if (!isValid) {
        successMsg.classList.add('d-none');
        return;
      }

      // Extract values before resetting
      const name = document.getElementById('patientName').value.trim();
      const role = document.getElementById('patientRole').value;
      const rating = parseInt(document.getElementById('ratingValue').value, 10);
      const text = document.getElementById('testimonialText').value.trim();

      // Reset Form
      testimonialForm.reset();
      testimonialFields.forEach(({ input }) => {
        if (input) {
          setTestimonialFieldState(input, true, '');
        }
      });

      successMsg.textContent = 'Thank you! Your testimonial has been submitted successfully.';
      successMsg.classList.remove('d-none');

      // Dynamically display new testimonial in reviewsContainer
      if (reviewsContainer) {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-md-4';

        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'P';
        const bgClasses = ['bg-primary', 'bg-success', 'bg-info', 'bg-warning', 'bg-danger'];
        const randomBg = bgClasses[Math.floor(Math.random() * bgClasses.length)];

        let starsStr = '';
        for (let i = 0; i < 5; i++) {
          starsStr += i < rating ? '★' : '☆';
        }

        colDiv.innerHTML = `
          <div class="p-4 border rounded shadow-sm bg-white h-100 testimonial-card transition-all">
            <div class="d-flex align-items-center mb-3">
              <div class="me-3">
                <span class="avatar-placeholder ${randomBg} text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 48px; height: 48px;">${initials}</span>
              </div>
              <div>
                <h2 class="h6 fw-bold mb-0">${name}</h2>
                <small class="text-muted">${role}</small>
              </div>
            </div>
            <div class="text-warning mb-2">${starsStr}</div>
            <p class="text-secondary mb-0">"${text}"</p>
          </div>
        `;

        // Add dynamic dark mode classes to the newly appended review card if current theme is dark
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
          const cardEl = colDiv.querySelector('.testimonial-card');
          if (cardEl) {
            cardEl.style.backgroundColor = 'var(--color-surface)';
            cardEl.style.borderColor = 'var(--color-border)';
            cardEl.style.color = 'var(--color-text)';
          }
        }

        reviewsContainer.insertBefore(colDiv, reviewsContainer.firstChild);
      }
    });

    testimonialFields.forEach(({ input, message }) => {
      if (input) {
        input.addEventListener('input', () => {
          successMsg.classList.add('d-none');
          validateTestimonialField(input, message);
        });

        input.addEventListener('change', () => {
          successMsg.classList.add('d-none');
          validateTestimonialField(input, message);
        });

        input.addEventListener('blur', () => {
          validateTestimonialField(input, message);
        });
      }
    });
  }

  // --- 3. PERSISTENT THEME TOGGLING ---
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    updateThemeButtonIcon(themeToggleBtn, savedTheme);

    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeButtonIcon(themeToggleBtn, newTheme);
    });
  }

  // Helper to change theme icon
  function updateThemeButtonIcon(button, theme) {
    const iconSpan = button.querySelector('.theme-icon');
    if (iconSpan) {
      iconSpan.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
    button.classList.toggle('btn-outline-light', theme !== 'dark');
    button.classList.toggle('btn-outline-warning', theme === 'dark');
  }

  // --- 4. GALLERY CATEGORY FILTERS (gallery.html) ---
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
            // Force reflow to register visibility before fading in
            item.offsetHeight;
            item.classList.remove('fade-out');
          } else {
            item.classList.add('fade-out');
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

  // --- 5. IMAGE LIGHTBOX MODAL (gallery.html) ---
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

  // --- 6. INITIALIZE BOOTSTRAP TOOLTIPS ---
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  if (tooltipTriggerList.length > 0) {
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }

  // --- 7. DYNAMIC BLOG VIEWER (blog.html) ---
  const blogCards = document.querySelectorAll('.blog-card');
  const blogListSection = document.getElementById('blogListSection');
  const blogDetailSection = document.getElementById('blogDetailSection');
  const backToBlogBtn = document.getElementById('backToBlogBtn');

  if (blogCards.length > 0 && blogListSection && blogDetailSection && backToBlogBtn) {
    const blogData = {
      cleaning: {
        title: 'When to Schedule a Professional Dental Cleaning',
        category: 'Oral Hygiene',
        date: 'June 15, 2026',
        image: 'assets/images/blog-cleaning.jpg',
        alt: 'Dental cleaning tools and professional hygiene scale',
        content: `
          <p class="mb-3">A professional dental cleaning does more than just shine your teeth. It removes plaque and hardened tartar build-up that regular brushing cannot. Most dental associations recommend scheduling a cleaning every six months. During a cleaning, your dental hygienist will use specialized scaling instruments to clean plaque below the gumline, polish the enamel, and conduct a brief check for gum pocket depth.</p>
          <p class="mb-3">If you have a history of periodontal disease, smoke, or have diabetes, we recommend scheduling cleanings every three to four months to support gum health. A regular schedule ensures minor enamel decay is caught and corrected early, preventing complex root canals or crowns down the road.</p>
          <p class="mb-3">Our cleaning sessions are designed around maximum patient comfort. We explain each step, offer sensitive-teeth scaling adjustments, and focus on collaborative guidance so you know exactly how to manage your oral hygiene at home.</p>
          <p class="mb-0"><strong>Interested in booking a professional cleaning?</strong> Visit our <a href="contact.html">Appointment Portal</a> or read more details on our <a href="services.html">Services page</a>.</p>
        `
      },
      whitening: {
        title: 'Enamel Safety & Preparing for Teeth Whitening Treatments',
        category: 'Cosmetic Dentistry',
        date: 'June 20, 2026',
        image: 'assets/images/blog-whitening.jpg',
        alt: 'Teeth whitening shade guide and smile beauty consultation',
        content: `
          <p class="mb-3">Teeth whitening is a popular way to brighten your smile, but it requires careful preparation to be safe and effective. Before starting any whitening regimen—whether in-office or take-home—a dental checkup is essential.</p>
          <p class="mb-3">Your dentist will inspect your teeth for active cavities, gum inflammation, or thin enamel, as whitening gels can cause severe pain if they seep into open cavities or sensitive roots. It is also important to note that crowns, veneers, and fillings do not respond to whitening bleach, which can result in an uneven smile color if not planned in advance.</p>
          <p class="mb-3">To ensure a safe and long-lasting bright smile, we recommend professional, monitored treatments over unverified over-the-counter options. Your dental team will guide you on shade selections and enamel-strengthening treatments to minimize sensitivity before and after your session.</p>
          <p class="mb-0"><strong>Ready to discuss your cosmetic smile goals?</strong> Head over to our <a href="contact.html">Contact page</a> to schedule a cosmetic consultation with our clinic team.</p>
        `
      },
      anxiety: {
        title: 'Tips for Managing Dental Anxiety & Stress-Free Appointments',
        category: 'Patient Comfort',
        date: 'June 25, 2026',
        image: 'assets/images/blog-anxiety.jpg',
        alt: 'Relaxing dental clinic room showing warm patient comfort focus',
        content: `
          <p class="mb-3">Dental anxiety is extremely common, but it should not stand in the way of your oral health. Modern dental offices place a high premium on patient comfort and use various strategies to keep visits stress-free.</p>
          <p class="mb-3">First, communicate your concerns openly with your dental team. Knowing what to expect can significantly ease nervousness. You can also establish a simple hand-raise signal to tell the dentist to pause treatment whenever you need a breather. Many clinics also offer ambient music, noise-canceling headphones, and customized sedation guidance to support a calm environment.</p>
          <p class="mb-3">At BrightSmile Dental Center, we practice a specialized Patient Comfort Mandate. We explain our treatments in detail, proceed at your pace, and provide quiet, modern reception areas to prevent sensory overload.</p>
          <p class="mb-0"><strong>Looking for a caring, gentle dental experience?</strong> Discover our clinic's legacy on the <a href="about.html">About page</a> or contact us directly using the <a href="contact.html">Contact form</a>.</p>
        `
      }
    };

    const detailCategory = document.getElementById('detailCategory');
    const detailTitle = document.getElementById('detailTitle');
    const detailDate = document.getElementById('detailDate');
    const detailImage = document.getElementById('detailImage');
    const detailContent = document.getElementById('detailContent');

    blogCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-blog-id');
        const post = blogData[id];

        if (post) {
          // Set detail contents
          if (detailCategory) detailCategory.textContent = post.category;
          if (detailTitle) detailTitle.textContent = post.title;
          if (detailDate) detailDate.textContent = post.date;
          if (detailImage) {
            detailImage.setAttribute('src', post.image);
            detailImage.setAttribute('alt', post.alt);
          }
          if (detailContent) detailContent.innerHTML = post.content;

          // Toggle views
          blogListSection.classList.add('d-none');
          blogDetailSection.classList.remove('d-none');

          // Scroll to top of content
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    backToBlogBtn.addEventListener('click', () => {
      blogDetailSection.classList.add('d-none');
      blogListSection.classList.remove('d-none');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
