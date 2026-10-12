document.addEventListener('DOMContentLoaded', () => {

  /*   1. FLIP CARD 180 DERAJAT (Event Handling + DOM Manipulation) */
  const profileCards = document.querySelectorAll('.profile-card');

  profileCards.forEach(card => {
    card.addEventListener('click', () => {
      const inner = card.querySelector('.card-inner');
      if (inner) inner.classList.toggle('is-flipped');
    });
  });


  /*  2. ANIMATED SKILL BAR ON SCROLL (Style & Animation) */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillsSection = document.querySelector('.skills-section');

  if (skillsSection && skillFills.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillFills.forEach((fill, index) => {
            const targetWidth = fill.getAttribute('data-width');
            setTimeout(() => {
              fill.style.width = targetWidth;
            }, index * 200);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
  }

});