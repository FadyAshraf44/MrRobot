// Intersection Observer for section reveals
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px'
});

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
  sectionObserver.observe(section);
});

// Parallax scrolling effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.terminal-background');
  
  parallaxElements.forEach(element => {
    const speed = 0.5;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Update status bar time
function updateTime() {
  const now = new Date();
  const options = { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false };
  const timeString = now.toLocaleDateString('en-US', options)
    .replace(/,/g, '')
    .replace(/(?<=\d)(AM|PM)/, '');
  
  document.querySelector('.right span').textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime(); // Initial call