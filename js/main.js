// ============================================
// BrightSmile Dental Center - Main JavaScript
// ============================================

// Dark / Light mode toggle
const toggleBtn = document.getElementById('darkModeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateToggleLabel(savedTheme);

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleLabel(next);
  });
}

function updateToggleLabel(theme) {
  if (!toggleBtn) return;
  toggleBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// Active nav link highlight
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
