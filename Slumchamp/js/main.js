document.addEventListener('DOMContentLoaded', () => {
  initDrawerNav();
  initBackToTop();
  initActiveSectionTracker();
  initPlayerForm();
  initContactForm();
  initPlayerRadarChart();
});

/**
 * Off-Canvas Slide-Out Navigation Controller
 */
function initDrawerNav() {
  const sidenav = document.getElementById('sidenav');
  const toggleBtn = document.getElementById('menuToggleBtn');
  const closeBtn = document.getElementById('menuCloseBtn');
  const backdrop = document.getElementById('navBackdrop');
  const navItems = document.querySelectorAll('.nav-item');

  if (!sidenav || !toggleBtn) return;

  function openMenu() {
    sidenav.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    sidenav.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  navItems.forEach(item => {
    item.addEventListener('click', closeMenu);
  });
}

/**
 * Back To Top Button Handler
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * Active Scroll Tracking
 */
function initActiveSectionTracker() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  });
}

/**
 * Player Application Form Handler
 */
function initPlayerForm() {
  const applyForm = document.getElementById('playerApplyForm');
  const statusBox = document.getElementById('playerFormStatus');

  if (!applyForm) return;

  applyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    statusBox.style.display = 'block';
    statusBox.className = 'form-status success';
    statusBox.textContent = 'Application received! Our scouting team will evaluate your profile.';
    applyForm.reset();
  });
}

/**
 * General & Scout Contact Form Handler
 */
function initContactForm() {
  const contactForm = document.getElementById('generalContactForm');
  const statusBox = document.getElementById('contactFormStatus');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    statusBox.style.display = 'block';
    statusBox.className = 'form-status success';
    statusBox.textContent = 'Thank you for reaching out! A representative will respond shortly.';
    contactForm.reset();
  });
}

/**
 * EA FC Style Radar Chart Initialization (Chart.js)
 */
function initPlayerRadarChart() {
  const ctx = document.getElementById('playerRadarChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['PAC (Pace)', 'SHO (Shooting)', 'PAS (Passing)', 'DRI (Dribbling)', 'DEF (Defending)', 'PHY (Physical)'],
      datasets: [
        {
          label: 'Current Attributes',
          data: [88, 82, 85, 86, 52, 74],
          backgroundColor: 'rgba(212, 175, 55, 0.35)',
          borderColor: '#ffd700',
          borderWidth: 2,
          pointBackgroundColor: '#ffd700',
          pointBorderColor: '#08090c'
        },
        {
          label: 'Scouted Potential Ceiling',
          data: [94, 88, 91, 92, 60, 82],
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.4)',
          borderWidth: 1.5,
          borderDash: [5, 5],
          pointBackgroundColor: 'rgba(255, 255, 255, 0.5)'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          angleLines: {
            color: 'rgba(212, 175, 55, 0.15)'
          },
          grid: {
            color: 'rgba(212, 175, 55, 0.15)'
          },
          pointLabels: {
            color: '#f4f5f7',
            font: {
              size: 11,
              weight: '600'
            }
          },
          ticks: {
            display: false,
            min: 0,
            max: 100
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#9aa0a6',
            font: {
              size: 11
            }
          }
        }
      }
    }
  });
}
/**
 * Renders Featured Talent Cards with Filtering Support
 */
function renderFeaturedTalent(filterPosition = 'ALL') {
  const container = document.getElementById('playerGridContainer');
  if (!container || typeof PLAYERS_DATA === 'undefined') return;

  // Filter array based on badge selection
  const filteredList = filterPosition === 'ALL' 
    ? PLAYERS_DATA 
    : PLAYERS_DATA.filter(player => player.positionBadge === filterPosition);

  if (filteredList.length === 0) {
    container.innerHTML = `<p style="text-align: center; grid-column: 1 / -1;">No players found for this position.</p>`;
    return;
  }

  container.innerHTML = filteredList.map(player => `
    <div class="player-card">
      <div class="player-img-wrapper">
        <img src="${player.image}" alt="${player.name}" class="player-img">
        <div class="player-badge">${player.positionBadge}</div>
      </div>
      <div class="player-info">
        <h3>${player.name}</h3>
        <p class="position"><i class="fa-solid fa-shirt"></i> ${player.positionTitle}</p>
        <ul class="stats">
          <li><span><i class="fa-solid fa-cake-candles"></i> Age:</span> ${player.age}</li>
          <li><span><i class="fa-solid fa-bolt"></i> Pace:</span> ${player.statsSummary.pace}</li>
          <li><span><i class="fa-solid fa-eye"></i> Vision:</span> ${player.statsSummary.vision}</li>
        </ul>
        <a href="player-profile.html?id=${player.id}" class="btn btn-secondary btn-full" style="margin-top: 14px;">
          <i class="fa-solid fa-address-card"></i> View Full Profile
        </a>
      </div>
    </div>
  `).join('');
}

// Function to handle click events on filter buttons
function filterPlayers(position) {
  // Update button active states
  document.querySelectorAll('.filter-controls .btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Re-render list
  renderFeaturedTalent(position);
}