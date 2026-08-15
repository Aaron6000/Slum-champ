/* SLUMCHUMP Home Module Logic */

// Mock Player Dataset (No Digital Products, Pure Sports Scouting)
const players = [
    { id: 1, name: "Drian Mukasa", position: "Forward", age: 19, foot: "Right", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=800&fit=crop" },
    { id: 2, name: "Booner Otim", position: "Midfielder", age: 18, foot: "Left", image: "https://images.unsplash.com/photo-1517466789427-980f5f5a3b3f?w=600&h=800&fit=crop" },
    { id: 3, name: "Ranne Okello", position: "Defender", age: 20, foot: "Right", image: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=600&h=800&fit=crop" }
  ];
  
  let currentSlide = 0;
  let slideTimer = null;
  
  document.addEventListener('DOMContentLoaded', () => {
    renderDirectory(players);
    startCarousel();
  });
  
  // Render Prospect Roster
  function renderDirectory(data) {
    const grid = document.getElementById('directoryGrid');
    if (!grid) return;
  
    grid.innerHTML = data.map(player => `
      <div class="player-card">
        <img src="${player.image}" alt="${player.name}">
        <div class="player-info">
          <div class="player-header">
            <span class="player-name">${player.name}</span>
            <span class="pos-badge">${player.position}</span>
          </div>
          <div class="player-stats">
            <span><strong>Age:</strong> ${player.age}</span>
            <span><strong>Foot:</strong> ${player.foot}</span>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  // Search Filter Functionality
  function filterDirectory() {
    const input = document.getElementById('searchInput');
    if (!input) return;
  
    const query = input.value.toLowerCase();
    const filtered = players.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.position.toLowerCase().includes(query) ||
      p.foot.toLowerCase().includes(query)
    );
  
    renderDirectory(filtered);
  }
  
  // Carousel Controls
  function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    if (!slides.length) return;
  
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
  
    slides.forEach((slide, i) => {
      slide.style.display = i === currentSlide ? 'block' : 'none';
    });
  
    dots.forEach((dot, i) => {
      dot.className = i === currentSlide ? 'dot active' : 'dot';
    });
  }
  
  function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
    resetTimer();
  }
  
  function setSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    resetTimer();
  }
  
  function startCarousel() {
    slideTimer = setInterval(() => {
      currentSlide++;
      showSlide(currentSlide);
    }, 4000);
  }
  
  function resetTimer() {
    clearInterval(slideTimer);
    startCarousel();
  }
  
  // Scout Inquiry Form Handler
  function handleInquiry(e) {
    e.preventDefault();
    alert('Scouting request submitted! Our agency team will contact you shortly.');
    e.target.reset();
  }