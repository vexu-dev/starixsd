document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded, script running');
  const shootingStarsContainer = document.querySelector('.shooting-stars');
  let maxStars = 10;
  const starSlider = document.querySelector('.star-slider');
  const contentTextElement = document.querySelector('.content p');
  const sloganElement = document.querySelector('.nav-bar .slogan');
  const batteryStatusElement = document.querySelector('.nav-bar .battery-status');
  const clockElement = document.querySelector('.nav-bar .live-clock');
  const searchInput = document.querySelector('.search-input');
  const searchBar = document.querySelector('.search-bar');
  const gameItems = document.querySelectorAll('.game-item');
  const gamesGrid = document.querySelector('.games-grid');
  const navBar = document.querySelector('.nav-bar');
  const contentTexts = [
    '80% supported by the unemployed community.',
    'F student made me make this.',
    '2+2=5',
    'watchout for blackexl',
    'supporter of the unemployed community.',
    'grass free zone.',
    'SKOOL IS KOOL -not teacher',
    'Crafted in the heart of the stars.',
    'Your cosmic journey starts now.'
  ];
  const navSlogans = [
    'Your unblocked journey blasts off now.',
    'Break free, surf the cosmic web unblocked.',
    'No limits, just space—unblocked and infinite.',
    'Unlock the cosmos, your journey is unblocked.',
    'Unblocked vibes, explore the digital galaxy.',
    'Soar past barriers, your journey starts now.',
    'Unblocked access, ride the stellar waves.',
    'Free the universe, unblocked space awaits.',
    'Unblocked horizons, your path is clear.'
  ];

  // Debug: Log arrays and elements
  console.log('Content texts array:', contentTexts);
  console.log('Navigation slogans array:', navSlogans);
  console.log('Content text element:', contentTextElement || 'Not found');
  console.log('Slogan element:', sloganElement || 'Not found');
  console.log('Battery status element:', batteryStatusElement || 'Not found');
  console.log('Clock element:', clockElement || 'Not found');
  console.log('Star slider element:', starSlider || 'Not found');
  console.log('Search input element:', searchInput || 'Not found');
  console.log('Search bar element:', searchBar || 'Not found');
  console.log('Games grid element:', gamesGrid || 'Not found');
  console.log('Nav-bar element:', navBar || 'Not found');
  console.log(`Found ${gameItems.length} game items`);

  // Debug: Monitor nav-bar content width
  function debugNavBar() {
    if (navBar) {
      const navWidth = navBar.offsetWidth;
      const children = navBar.children;
      let totalChildrenWidth = 0;
      const childWidths = [];
      Array.from(children).forEach(child => {
        const style = getComputedStyle(child);
        const childWidth = child.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
        totalChildrenWidth += childWidth;
        childWidths.push({
          class: child.className || child.tagName,
          width: childWidth
        });
      });
      // Calculate available space and set dynamic margin for right-group
      const rightGroup = document.querySelector('.nav-bar .right-group');
      if (rightGroup) {
        const leftGroupWidth = document.querySelector('.nav-bar .left-group')?.offsetWidth || 0;
        const availableSpace = navWidth - totalChildrenWidth;
        const dynamicMargin = Math.min(50, Math.max(20, availableSpace / 2)); // Margin between 20px and 50px
        rightGroup.style.marginLeft = `${dynamicMargin}px`;
        console.log(`Right-group margin-left set to: ${dynamicMargin}px`);
      }
      console.log(`Nav-bar width: ${navWidth}px, Total children width: ${totalChildrenWidth}px at`, new Date().toLocaleTimeString());
      console.log('Child widths:', childWidths);
      if (totalChildrenWidth > navWidth) {
        console.warn('Nav-bar content exceeds container width, potential overflow detected.');
      } else {
        console.log('Nav-bar content fits within container.');
      }
    }
  }
  setInterval(debugNavBar, 2000); // Run every 2 seconds
  debugNavBar(); // Initial call

  // Scroll handling for search bar
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (searchBar) {
      if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
        searchBar.style.transform = 'translate(-50%, -100%)';
        console.log('Search bar hidden (scroll down)', new Date().toLocaleTimeString());
      } else {
        searchBar.style.transform = 'translate(-50%, 0)';
        console.log('Search bar shown (scroll up)', new Date().toLocaleTimeString());
      }
    }
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  });

  // Search functionality
  function filterGames(query) {
    query = query.toLowerCase().trim();
    console.log('Filtering games with query:', query);
    let visibleItems = 0;
    gameItems.forEach(item => {
      const gameTitle = item.querySelector('.game-title').textContent.toLowerCase();
      if (gameTitle.includes(query)) {
        item.style.display = 'flex';
        visibleItems++;
      } else {
        item.style.display = 'none';
      }
    });

    if (gamesGrid) {
      if (query.length > 0) {
        gamesGrid.style.top = '0'; // Move to top of viewport when searching
      } else {
        gamesGrid.style.top = '50%'; // Default position
      }
      console.log(`Games grid moved to top: ${gamesGrid.style.top} due to search query: "${query}"`);
    }

    console.log(`Visible game items: ${visibleItems}`);
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterGames(e.target.value);
    });

    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
      searchButton.addEventListener('click', () => {
        filterGames(searchInput.value);
      });
    }
  }

  function createStar() {
    const currentStars = shootingStarsContainer.querySelectorAll('.star').length;
    if (currentStars >= maxStars) return;

    const star = document.createElement('div');
    star.classList.add('star');
    
    const startTop = Math.random() * 60;
    star.style.setProperty('--start-top', `${startTop}%`);
    
    const duration = 5 + Math.random() * 3;
    star.style.animationDuration = `${duration}s`;
    
    shootingStarsContainer.appendChild(star);
    
    star.addEventListener('animationend', () => {
      star.remove();
    });
  }

  function changeContentText() {
    if (!contentTextElement) return;
    contentTextElement.style.opacity = '0';
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * contentTexts.length);
      contentTextElement.textContent = contentTexts[randomIndex];
      contentTextElement.style.opacity = '1';
      console.log('Content text changed to:', contentTextElement.textContent, 'at', new Date().toLocaleTimeString());
    }, 500);
  }

  function typeText(text, element, callback) {
    let index = 0;
    element.textContent = '';
    element.style.width = 'auto'; // Reset width to avoid layout shifts
    function type() {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
        setTimeout(type, 100);
      } else {
        setTimeout(callback, 2000);
      }
    }
    type();
  }

  function backspaceText(element, callback) {
    let text = element.textContent;
    let index = text.length;
    function backspace() {
      if (index > 0) {
        element.textContent = text.slice(0, index - 1);
        index--;
        setTimeout(backspace, 50);
      } else {
        callback();
      }
    }
    backspace();
  }

  function cycleSlogan() {
    const randomIndex = Math.floor(Math.random() * navSlogans.length);
    const selectedText = navSlogans[randomIndex];
    typeText(selectedText, sloganElement, () => {
      backspaceText(sloganElement, () => {
        setTimeout(cycleSlogan, 500);
      });
    });
    console.log('Slogan changed to:', selectedText, 'at', new Date().toLocaleTimeString());
  }

  function updateBatteryStatus() {
    if (navigator.getBattery && batteryStatusElement) {
      navigator.getBattery().then(battery => {
        function update() {
          const level = Math.floor(battery.level * 100);
          batteryStatusElement.textContent = `Battery: ${level}%`;
          console.log(`Battery updated to: ${level}% at`, new Date().toLocaleTimeString());
        }
        update();
        battery.addEventListener('levelchange', update);
        battery.addEventListener('chargingchange', update);
      }).catch(err => {
        console.error('Battery API error:', err);
        batteryStatusElement.textContent = 'Battery: N/A';
      });
    } else {
      console.warn('Battery API not supported or element missing');
      if (batteryStatusElement) batteryStatusElement.textContent = 'Battery: N/A';
    }
  }

  function updateClock() {
    if (clockElement) {
      const now = new Date();
      clockElement.textContent = now.toLocaleTimeString('en-US', { hour12: false });
      console.log('Clock updated to:', clockElement.textContent, 'at', new Date().toLocaleTimeString());
    }
  }

  function spawnStars() {
    createStar();
    setTimeout(spawnStars, 300 + Math.random() * 600);
  }

  if (starSlider) {
    starSlider.addEventListener('input', () => {
      maxStars = parseInt(starSlider.value);
      console.log('Max stars updated to:', maxStars, 'at', new Date().toLocaleTimeString());
    });
  }

  console.log('Starting star spawning');
  spawnStars();

  if (contentTextElement) {
    console.log('Setting up content text change interval');
    setInterval(changeContentText, 20000);
  }

  console.log('Starting slogan cycle');
  cycleSlogan();

  console.log('Starting battery status');
  updateBatteryStatus();

  console.log('Starting live clock');
  updateClock();
  setInterval(updateClock, 1000);

  if (contentTextElement) {
    console.log('Setting initial content text');
    changeContentText();
  }
});