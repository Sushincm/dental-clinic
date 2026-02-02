document.addEventListener("DOMContentLoaded", () => {
  // Sticky Header
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.createElement("div");
  mobileMenuBtn.className = "mobile-nav-toggle";
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector("nav").appendChild(mobileMenuBtn);

  const navLinks = document.querySelector(".nav-links");
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenuBtn.innerHTML = navLinks.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Smooth Scroll for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        navLinks.classList.remove("active");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Enhanced Scroll Animations - Optimized for faster load
  const observerOptions = {
    threshold: 0.05, // Trigger earlier for faster perceived performance
    rootMargin: "0px 0px -30px 0px", // Reduced margin for earlier triggering
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 50); // Reduced stagger from 100ms to 50ms for faster animations
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add animation classes to elements
  const fadeElements = document.querySelectorAll(".fade-in");
  const slideLeftElements = document.querySelectorAll(".slide-in-left");
  const slideRightElements = document.querySelectorAll(".slide-in-right");
  const scaleElements = document.querySelectorAll(".scale-in");

  // Observe all animation elements
  [
    ...fadeElements,
    ...slideLeftElements,
    ...slideRightElements,
    ...scaleElements,
  ].forEach((el) => observer.observe(el));

  // Lazy Loading for Images
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img").forEach((img) => {
    imageObserver.observe(img);
  });

  // Add image loading styles
  const imageStyles = document.createElement("style");
  imageStyles.textContent = `
        img {
            opacity: 0;
            transition: opacity 0.6s ease;
        }
        img.loaded {
            opacity: 1;
        }
    `;
  document.head.appendChild(imageStyles);

  // Reviews Carousel - Duplicate content for infinite loop
  const reviewsCarousel = document.getElementById("reviewsCarousel");
  if (reviewsCarousel) {
    const reviewCards = reviewsCarousel.innerHTML;
    reviewsCarousel.innerHTML = reviewCards + reviewCards; // Duplicate for seamless loop
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });
      // Toggle current item
      item.classList.toggle("active");
    });
  });

  // Form Submissions
  const appointmentForm = document.getElementById("appointmentForm");
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = appointmentForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = "Scheduling...";

      // Simulate API call
      setTimeout(() => {
        alert(
          "Thank you! Your appointment request has been sent. We will contact you shortly.",
        );
        appointmentForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }
});
