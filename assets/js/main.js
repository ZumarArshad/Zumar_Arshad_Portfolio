document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  year.textContent = new Date().getFullYear();

  const backTop = document.getElementById("backTop");
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("show", window.scrollY > 500);
  });
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".nav-link");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => observer.observe(section));

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => {
      const nav = document.querySelector(".navbar-collapse");
      if (nav.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(nav).hide();
    });
  });


  // Scroll reveal: elements gently appear as they enter the viewport.
  const revealElements = document.querySelectorAll("[data-reveal]");
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -60px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // Smoothly animate skill bars when the skills section enters the viewport.
  const skillBars = document.querySelectorAll(".skill-bar span");
  const skillsSection = document.querySelector("#skills");
  if (skillsSection && skillBars.length) {
    skillBars.forEach(bar => {
      const targetWidth = bar.style.width;
      bar.dataset.width = targetWidth;
      bar.style.width = "0";
    });

    const skillObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        skillBars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width;
          }, index * 120);
        });
        skillObserver.disconnect();
      }
    }, { threshold: 0.25 });
    skillObserver.observe(skillsSection);
  }

  // Front-end demo contact form: opens the user's email client with the submitted details.
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(data.get("subject") || "Portfolio Project Inquiry");
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:zzumararshad@gmail.com?subject=${subject}&body=${body}`;
    status.textContent = "Opening your email client…";
  });
});