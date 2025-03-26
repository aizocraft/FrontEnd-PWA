// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
  // Select DOM elements
  const themeToggle = document.getElementById('theme-toggle');
  const searchInput = document.getElementById('search-input');
  const navLinks = document.querySelector('.nav-links');
  const closeIcon = document.querySelector('.close-icon');

  // Function to apply the theme
  function applyTheme(theme) {
    // Set the data-theme attribute on the root element
    document.documentElement.setAttribute('data-theme', theme);
    // Update the theme toggle button's text content based on the theme
    themeToggle.textContent = theme === 'dark' ? '🔆' : '🌚';
  }

  // Load the saved theme from localStorage, default to 'light' if not found
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  // Event listener to toggle the theme
  themeToggle.addEventListener('click', () => {
    // Get the current theme from the root element
    const currentTheme = document.documentElement.getAttribute('data-theme');
    // Determine the new theme
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    // Apply the new theme
    applyTheme(newTheme);
    // Save the new theme to localStorage
    localStorage.setItem('theme', newTheme);
  });


  // Event listener for window scroll
  window.addEventListener('scroll', () => {
    // Select all elements with the 'reveal' class
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => {
      // Get the top position of the element relative to the viewport
      const revealTop = reveal.getBoundingClientRect().top;
      // Get the height of the window
      const windowHeight = window.innerHeight;
      // Add the 'visible' class if the element is within 100px of the viewport bottom
      if (revealTop < windowHeight - 100) {
        reveal.classList.add('visible');
      }
    });
  });


});



// Function to perform the search
function performSearch() {
  // Get the search term and normalize it
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.toLowerCase().trim().replace(/\s+/g, '');

  // Define a mapping of keywords to URLs
  const searchMappings = [
    { keywords: ['borehole'], url: 'borehole.html' },
    { keywords: ['pump', 'waterpump'], url: 'pump.html' },
    { keywords: ['solar', 'solarservices', 'solarpanels'], url: 'solar.html' },
    { keywords: ['watertanks', 'plumbing', 'watertower'], url: 'tower.html' },
    // Add more mappings as needed
  ];

  // Normalize the keywords in the mappings
  const normalizedMappings = searchMappings.map(mapping => ({
    ...mapping,
    normalizedKeywords: mapping.keywords.map(keyword => keyword.toLowerCase().replace(/\s+/g, ''))
  }));

  // Check for a match
  let matched = false;
  for (const mapping of normalizedMappings) {
    if (mapping.normalizedKeywords.some(keyword => searchTerm.includes(keyword))) {
      window.location.href = mapping.url;
      matched = true;
      break;
    }
  }

  // If no match is found, redirect to a generic search results page or show a message
  if (!matched) {
    window.location.href = 'search-results.html'; // Redirect to a search results page
    // Or show a message if preferred
    // alert('No specific page found for this search term.');
  }
}

// Add event listener for Enter key in the search input
document.getElementById('search-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    performSearch();
  }
});





// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
  // Select all list items in the services section
  const listItems = document.querySelectorAll('.services li');

  // Apply animations using GSAP
  gsap.from('.content', { opacity: 0, duration: 1, delay: 0.5, y: -50, ease: 'power2.out' });
  gsap.from('.services', { opacity: 0, duration: 1, delay: 0.5, y: 50, ease: 'power2.out' });

  // Apply animation to each list item with scroll trigger
  listItems.forEach(item => {
    gsap.from(item, { opacity: 0, duration: 1, y: 50, ease: 'power2.out', scrollTrigger: {
      trigger: item,
      start: 'top bottom-=50',
      end: '+=100',
      toggleActions: 'play none none none'
    }});
  });
});

// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
  // Select DOM elements for the gallery
  const galleryInner = document.querySelector('.gallery-inner');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const images = document.querySelectorAll('.gallery img');
  const imageWidth = images[0].clientWidth; // Get the width of an image

  let index = 0; // Initialize index for tracking the current image

  // Function to show the next image
  function showNextImage() {
    if (index < images.length - 1) {
      index++;
      updateGallery();
    }
  }

  // Function to show the previous image
  function showPrevImage() {
    if (index > 0) {
      index--;
      updateGallery();
    }
  }

  // Function to update the gallery position
  function updateGallery() {
    galleryInner.style.transform = `translateX(${-index * imageWidth}px)`;
  }

  // Event listeners for next and previous buttons
  nextButton.addEventListener('click', showNextImage);
  prevButton.addEventListener('click', showPrevImage);

  // Variables for touch events
  let startX = 0;
  let currentTranslate = 0;

  // Event listener for touch start
  galleryInner.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  });

  // Event listener for touch move
  galleryInner.addEventListener('touchmove', function(e) {
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    currentTranslate = -index * imageWidth + diffX;
    galleryInner.style.transform = `translateX(${currentTranslate}px)`;
  });

  // Event listener for touch end
  galleryInner.addEventListener('touchend', function(e) {
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    if (diffX > 50) {
      showPrevImage();
    } else if (diffX < -50) {
      showNextImage();
    } else {
      updateGallery();
    }
  });

  // Event listener for window resize to update gallery position
  window.addEventListener('resize', function() {
    updateGallery();
  });
});
// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
  // Select all elements with the class 'countervalue'
  const counters = document.querySelectorAll('.countervalue');
  const speed = 200; // Adjust the speed as needed for counter animation

  // Function to animate the counters
  function animateCounters() {
    counters.forEach(counter => {
      // Function to update the count
      const updateCount = () => {
        const target = +counter.getAttribute('data-value'); // Get the target value
        const count = +counter.innerText; // Get the current count

        const increment = target / speed; // Calculate the increment

        // If the current count is less than the target, increment the count
        if (count < target) {
          counter.innerText = Math.ceil(count + increment); // Update the counter display
          setTimeout(updateCount, 30); // Repeat after 30 milliseconds for smooth counting
        } else {
          counter.innerText = target; // Set to the target value if the count has reached the target
        }
      };

      updateCount(); // Start updating the count
      counter.classList.add('tallied'); // Add a class to mark the counter as tallied
    });
  }

  // Intersection Observer to trigger animation when the counters are in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate counters if they are not already tallied
        if (!entry.target.classList.contains('tallied')) {
          animateCounters();
        } else {
          // Remove tallied class to allow tallying again
          entry.target.classList.remove('tallied');
        }
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of the element is visible
  });

  // Observe each counter element
  counters.forEach(counter => {
    observer.observe(counter);
  });
});
// Function to show a popup with service details
function showPopup(serviceIndex) {
  // Data for the services
  const serviceData = [
    {
      title: "Borehole Drilling",
      description: "We provide top-quality borehole drilling services.",
      features: ["High-efficiency drilling", "Reliable water sources", "Expert installation"],
      link: "borehole.html"
    },
    {
      title: "Water Pumps",
      description: "Efficient and durable water pump systems.",
      features: ["Energy-efficient pumps", "Long-lasting performance", "Affordable solutions"],
      link: "waterpumps.html"
    },
    {
      title: "Solar Products",
      description: "High-performance solar energy products.",
      features: ["Renewable energy solutions", "Cost-effective", "Environmentally friendly"],
      link: "solar.html"
    },
    {
      title: "Water Testing",
      description: "Comprehensive water quality testing services.",
      features: ["Accurate results", "Advanced testing methods", "Quick turnaround"],
      link: "watertesting.html"
    },
    {
      title: "Generators",
      description: "Reliable generators for uninterrupted power supply.",
      features: ["High power output", "Low noise operation", "Various sizes available"],
      link: "generators.html"
    },
    {
      title: "Water Tower",
      description: "Sturdy and efficient water storage towers.",
      features: ["High capacity", "Durable construction", "Easy maintenance"],
      link: "watertower.html"
    },
  ];

  // Select popup elements
  const popup = document.getElementById('popup');
  const popupTitle = document.getElementById('popup-title');
  const popupText = document.getElementById('popup-text');
  const popupList = document.getElementById('popup-list');
  const popupLink = document.getElementById('popup-link');

  // Update the popup content with the selected service data
  popupTitle.innerText = serviceData[serviceIndex - 1].title;
  popupText.innerText = serviceData[serviceIndex - 1].description;

  // Clear the current list of features
  popupList.innerHTML = '';
  serviceData[serviceIndex - 1].features.forEach(feature => {
    // Create a new list item for each feature and add it to the popup list
    const li = document.createElement('li');
    li.innerText = feature;
    popupList.appendChild(li);
  });

  // Set the link for the popup
  popupLink.href = serviceData[serviceIndex - 1].link;
  popupLink.innerText = `Learn More about ${serviceData[serviceIndex - 1].title}`;

  // Show the popup
  popup.classList.add('show');
}

// Function to close the popup
function closePopup() {
  const popup = document.getElementById('popup');
  popup.classList.remove('show'); // Hide the popup
}



document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.querySelector('.menu-toggle img');
  const closeIcon = document.querySelector('.close-icon img');
  const navLinks = document.querySelector('.nav-links');
  const menuToggleContainer = document.querySelector('.menu-toggle');
  const closeIconContainer = document.querySelector('.close-icon');

  menuToggle.addEventListener('click', function() {
    navLinks.classList.add('active');
    menuToggleContainer.classList.add('active');
    closeIconContainer.classList.add('active');
  });

  closeIcon.addEventListener('click', function() {
    navLinks.classList.remove('active');
    menuToggleContainer.classList.remove('active');
    closeIconContainer.classList.remove('active');
  });
});









        const images = document.querySelectorAll('.banner img');
        let currentImageIndex = 0;
        const imageInterval = 3000; // 3 seconds

        function changeImage() {
            images[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % images.length;
            images[currentImageIndex].classList.add('active');
        }

        setInterval(changeImage, imageInterval);

        const titleText = "Plasma Water Africa";
        const subtitles = ["Borehole Drilling Services", "Solar Panels Installations", "Water Tower Constructions", "Water Pumps & Generators", "Irrigation Systems", "Plumbing Services"];
        const typingSpeed = 150; // typing speed in ms
        const deletingSpeed = 100; // deleting speed in ms
        const delayBetweenTexts = 2000; // delay between texts in ms

        let currentTitleIndex = 0;
        let isDeleting = false;
        let currentText = '';
        let subtitleIndex = 0;

        function typeText() {
            const targetText = titleText;
            if (isDeleting) {
                currentText = targetText.substring(0, currentText.length - 1);
            } else {
                currentText = targetText.substring(0, currentText.length + 1);
            }
            document.getElementById('title').innerHTML = currentText;

            if (!isDeleting && currentText === targetText) {
                setTimeout(() => isDeleting = true, delayBetweenTexts);
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                currentTitleIndex = (currentTitleIndex + 1) % targetText.length;
            }

            setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
        }

        function changeSubtitle() {
            document.getElementById('subtitle').innerHTML = subtitles[subtitleIndex];
            subtitleIndex = (subtitleIndex + 1) % subtitles.length;
            setTimeout(changeSubtitle, delayBetweenTexts);
        }

        document.addEventListener('DOMContentLoaded', () => {
            typeText();
            changeSubtitle();
        });



        document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-links a');
    const menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem[i].className = "active";
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const acc = document.getElementsByClassName('accordion');
  for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function() {
          for (let j = 0; j < acc.length; j++) {
              if (acc[j] !== this) {
                  acc[j].classList.remove('active');
                  acc[j].nextElementSibling.style.maxHeight = null;
              }
          }
          this.classList.toggle('active');
          const panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
          } else {
              panel.style.maxHeight = panel.scrollHeight + 'px';
          }
      });
  }

  const stars = document.querySelectorAll('.star');
  const ratingInput = document.getElementById('rating');
  const feedbackForm = document.getElementById('feedbackForm');
  const thankYouMessage = document.getElementById('thankYouMessage');

  stars.forEach(star => {
      star.addEventListener('click', () => {
          const value = star.getAttribute('data-value');
          ratingInput.value = value;

          stars.forEach(s => {
              s.classList.remove('selected');
              if (s.getAttribute('data-value') <= value) {
                  s.classList.add('selected');
              }
          });
      });
  });

  feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      feedbackForm.style.display = 'none';
      thankYouMessage.style.display = 'block';
      // Here you can handle form submission, e.g., send the data to your server
  });
});





var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("imgrel");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlides();
}






//

// Optional: Add JavaScript animations or interactions if needed
document.addEventListener('DOMContentLoaded', () => {
  // Example of adding smooth scroll for anchor links
  const links = document.querySelectorAll('.services-links a');
  links.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          document.querySelector(link.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
});
