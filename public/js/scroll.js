document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('#filters');
  
    function updateScrollButtons() {
      const leftButton = document.querySelector('.scroll-btn.left');
      const rightButton = document.querySelector('.scroll-btn.right');
      const tolerance = 2; // Small tolerance value to account for rounding issues
  
      // Show or hide left button
      if (container.scrollLeft > 0) {
        leftButton.style.display = 'block';
      } else {
        leftButton.style.display = 'none';
      }
  
      // Show or hide right button
      if (container.scrollLeft + container.clientWidth < container.scrollWidth - tolerance) {
        rightButton.style.display = 'block';
      } else {
        rightButton.style.display = 'none';
      }
    }
  
    // Initial update
    updateScrollButtons();
  
    // Update on scroll
    container.addEventListener('scroll', updateScrollButtons);
  
    // Update on resize
    window.addEventListener('resize', updateScrollButtons);
  
    // Enable drag to scroll
    let isDown = false;
    let startX;
    let scrollLeft;
  
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.classList.add('active');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = 'grabbing'; // Change cursor to grabbing
    });
  
    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('active');
      container.style.cursor = 'grab'; // Reset cursor
    });
  
    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('active');
      container.style.cursor = 'grab'; // Reset cursor
    });
  
    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed
      container.scrollLeft = scrollLeft - walk;
    });
  
    // Enable touch to scroll
    container.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
  
    container.addEventListener('touchend', () => {
      isDown = false;
    });
  
    container.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed
      container.scrollLeft = scrollLeft - walk;
    });
  });