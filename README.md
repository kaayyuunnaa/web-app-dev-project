# BrightSmile Dental Center

A premium, fully featured, and responsive multi-page web portal built for **BrightSmile Dental Center** as part of the Web Application Development coursework.

This project combines state-of-the-art styling, dark/light theme persistence, interactive search filters, modal image lightboxes, tooltips, and strict responsive design using HTML5, CSS3, JavaScript (ES6+), and Bootstrap 5.

---

## 📂 Pages Included
1. **Home (`index.html`)**: Interactive welcome portal featuring clinical stats, custom core values, and responsive image banners.
2. **About Us (`about.html`)**: Detailed overview of the clinic legacy, core mandates, and patient-first comfort policies.
3. **Services (`services.html`)**: Balanced 3x2 grid outlining the 6 major dental treatments offered with direct scheduling actions.
4. **Our Team (`team.html`)**: Custom professional grid cards detailing dentist roles, headshots, and clinic credentials.
5. **Gallery (`gallery.html`)**: A 6-item interactive clinical tour grid with dynamic category filter controls and a modal picture lightbox.
6. **Blog (`blog.html`)**: Educational articles featuring patient cleaning advice, cosmetic guides, and anxiety management with matching cover art.
7. **Testimonials (`testimonials.html`)**: Real-time feedback list showcasing patient ratings and a review submission form with instant local validation.
8. **Contact (`contact.html`)**: A centralized scheduling portal matching clinic information, Google Map location, and a fully verified appointment booking form.
9. **404 Error Page (`404.html`)**: A stylized error template matching the site theme, providing direct fallback options to home or contact.

---

## 🛠️ Key Technologies
* **Structure**: HTML5 with semantic structuring (sections, main, articles, navs)
* **Styling**: Bootstrap v5.3.3 paired with high-end Vanilla CSS overrides (custom fonts, smooth transitions, card layouts)
* **Logic**: Vanilla JavaScript ES6+ (state tracking, local storage persistence, DOM filtering, tooltips initialization)
* **Icons & Assets**: Scalable emojis and high-resolution optimized JPEGs matching dental settings

---

## 🌟 Interactive Features
* **Persistent Dark/Light Mode**: Styled using CSS variables (`[data-theme="dark"]` overrides) and driven by browser `localStorage` so user selections persist across page transitions and reloads.
* **Interactive Gallery Filter**: Category buttons that filter gallery spaces smoothly with scale and fade animations.
* **Modal Lightbox View**: Clicking any gallery item opens a full-screen centered lightbox dialog with responsive image sizing to fit viewports cleanly.
* **Interactive Tooltips**: Leverages Bootstrap's native `Tooltip` JS API to add sleek descriptions to footer social links.
* **Breadcrumb Navigation**: Breadcrumb bars added below the navbar across all sub-pages for natural navigation context.
* **Client-side Form Validation**: Forms (Feedback, Contact/Appointment) are verified with Bootstrap's `.needs-validation` styling and JavaScript logic to block empty submissions.

---

## 🚀 How to Run Locally
1. Clone or download the repository files.
2. Open any `.html` file (e.g., `index.html`) directly in a web browser, or use a local development server extension (e.g., VS Code *Live Server*) to run the project.
3. The dark/light mode toggle resides on the right side of the navigation header on all pages.
