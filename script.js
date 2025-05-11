document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initNavigation();
  initScrollAnimations();
  initScreenshotModals();
  initCopyButtons();
  initThemeToggle();
  initTypingEffects();
}); 

// Navigation functionality
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  // Update active nav link on scroll
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
  
  // Smooth scroll to section when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: 'smooth'
      });
    });
  });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

// Screenshot modal functionality
function initScreenshotModals() {
  const screenshots = document.querySelectorAll('.screenshot');
  const modal = document.getElementById('screenshot-modal');
  const modalImage = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const closeModal = document.querySelector('.close-modal');
  
  screenshots.forEach(screenshot => {
    screenshot.addEventListener('click', function() {
      const img = this.querySelector('img');
      const label = this.querySelector('.screenshot-label').textContent;
      
      // Use the actual image source from the thumbnail
      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modalCaption.textContent = label;
      
      // Show the modal
      modal.classList.remove('hidden');
    });
  });
  
  // Close modal when clicking the close button
  closeModal.addEventListener('click', function() {
    modal.classList.add('hidden');
  });
  
  // Close modal when clicking outside the content
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
  });
}


// Copy button functionality
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const codeBlock = this.closest('.code-block');
      const code = codeBlock.querySelector('pre').textContent;
      
      navigator.clipboard.writeText(code).then(() => {
        // Show success feedback
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        this.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
        
        setTimeout(() => {
          this.textContent = originalText;
          this.style.backgroundColor = '';
        }, 1500);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });
}

// Theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    
    // Update button text based on current theme
    if (document.body.classList.contains('light-theme')) {
      this.textContent = 'Dark Theme';
    } else {
      this.textContent = 'Light Theme';
    }
  });
}

// Terminal typing effect
function initTypingEffects() {
  // Check if Typed.js is loaded
  if (typeof Typed !== 'undefined') {
    // Add typing effect to code blocks that should be animated
    const typedElements = document.querySelectorAll('.typed-code');
    
    typedElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      
      new Typed(element, {
        strings: [text],
        typeSpeed: 30,
        showCursor: true,
        cursorChar: '█',
        onComplete: function() {
          // Add a class when typing is complete
          element.classList.add('typing-complete');
        }
      });
    });
  }
  
  // Fallback for when Typed.js is not available
  else {
    console.warn('Typed.js not loaded. Terminal typing effects disabled.');
  }
}

// Flag animation effect
document.querySelectorAll('.flag-found').forEach(flag => {
  // Add a subtle animation when flags come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add extra animation class when flag is visible
        entry.target.classList.add('flag-revealed');
        
        // Optional: Add confetti effect for flags
        if (typeof confetti !== 'undefined') {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(flag);
});

// Download PDF functionality (placeholder)
document.getElementById('download-pdf')?.addEventListener('click', function() {
  alert('PDF download functionality would be implemented here.');
  // In a real implementation, you would use a library like html2pdf.js
  // to generate a PDF from the current page content
});