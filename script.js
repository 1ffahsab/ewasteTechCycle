// ===== CENTERS DATA =====
const allCenters = [
  { 
    name: "Pusat Kitar Semula KLCC", 
    phone: "03-2161 2345", 
    hours: "Mon-Fri: 9AM-6PM", 
    address: "Suria KLCC, Kuala Lumpur City Centre, 50088 Kuala Lumpur",
    description: "Located in the heart of Kuala Lumpur, this center accepts all types of electronic waste with proper documentation.",
    keywords: "klcc kuala lumpur ampang city centre",
    icon: "🏙️"
  },
  { 
    name: "E-Waste Petaling Jaya", 
    phone: "03-7956 6789", 
    hours: "Mon-Sat: 8AM-7PM",
    address: "No. 15, Jalan SS2/24, 47300 Petaling Jaya, Selangor",
    description: "Modern recycling facility with dedicated drop-off points for different e-waste categories.",
    keywords: "petaling jaya pj selangor ss2",
    icon: "🏢"
  },
  { 
    name: "Pusat Kutipan Shah Alam", 
    phone: "03-5519 8765", 
    hours: "Wed-Sun: 10AM-5PM",
    address: "Seksyen 13, 40100 Shah Alam, Selangor",
    description: "Government-certified recycling center with emphasis on safe battery disposal.",
    keywords: "shah alam selangor seksyen",
    icon: "🏛️"
  },
  { 
    name: "Recycle Hub Penang", 
    phone: "04-2628 5432", 
    hours: "Mon-Fri: 7AM-5PM",
    address: "Bayan Lepas Free Industrial Zone, 11900 Penang",
    description: "Specializes in industrial and consumer electronic waste recycling.",
    keywords: "penang georgetown pulau pinang bayan lepas",
    icon: "🏝️"
  },
  { 
    name: "Kitar Semula Johor Bahru", 
    phone: "07-5591 2345", 
    hours: "Tue-Sat: 9AM-6PM",
    address: "Taman Perling, 81200 Johor Bahru, Johor",
    description: "Comprehensive e-waste recycling services with data destruction certification.",
    keywords: "johor bahru jb skudai perling",
    icon: "🏘️"
  },
  { 
    name: "Pusat E-Waste UKM", 
    phone: "03-8921 6789", 
    hours: "Mon-Fri: 11AM-4PM",
    address: "Universiti Kebangsaan Malaysia, 43600 Bangi, Selangor",
    description: "University-based research and recycling facility focusing on sustainable practices.",
    keywords: "ukm universiti kebangsaan malaysia bangi",
    icon: "🎓"
  }
];

// ===== FEEDBACK SYSTEM =====
let selectedRating = 0;
let feedbackToDelete = null;
let currentFeedbackPage = 1;
const FEEDBACK_PER_PAGE = 6;

// ===== INITIALIZE PAGE =====
document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize star rating system if on feedback page
  if (document.getElementById('rating-container')) {
    initStarRating();
  }
  
  // Initialize feedback system if on feedback page
  if (document.getElementById('feedback-form')) {
    initFeedbackSystem();
  }
  
  // Initialize centers search if on centers page
  if (document.getElementById('search-btn')) {
    initCentersSearch();
    // Display all centers on page load
    displayAllCenters();
  }
  
  // Initialize contact form if on contact page
  if (document.getElementById('contact-form')) {
    initContactForm();
  }
});

// ===== MOBILE MENU =====
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    
    document.querySelectorAll('#mobile-menu a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// ===== STAR RATING SYSTEM =====
function initStarRating() {
  const ratingContainer = document.getElementById('rating-container');
  const ratingText = document.getElementById('rating-text');
  
  if (!ratingContainer) return;
  
  // Clear existing stars
  ratingContainer.innerHTML = '';
  
  // Create 5 stars
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('button');
    star.type = 'button';
    star.className = 'rating-star text-4xl transition-colors text-gray-400 hover:text-yellow-400 focus:outline-none';
    star.dataset.rating = i;
    star.innerHTML = '☆';
    
    star.addEventListener('click', () => {
      selectedRating = i;
      updateStarRating();
      document.getElementById('feedback-rating').value = selectedRating;
    });
    
    star.addEventListener('mouseenter', () => {
      highlightStars(i);
    });
    
    ratingContainer.appendChild(star);
  }
  
  ratingContainer.addEventListener('mouseleave', updateStarRating);
}

function highlightStars(rating) {
  const stars = document.querySelectorAll('.rating-star');
  const ratingText = document.getElementById('rating-text');
  
  stars.forEach((star, index) => {
    if (index < rating) {
      star.innerHTML = '★';
      star.classList.add('text-yellow-400');
    } else {
      star.innerHTML = '☆';
      star.classList.remove('text-yellow-400');
    }
  });
  
  if (ratingText) {
    const ratingLabels = [
      'Click on a star to rate',
      'Poor',
      'Fair',
      'Good',
      'Very Good',
      'Excellent'
    ];
    ratingText.textContent = ratingLabels[rating];
  }
}

function updateStarRating() {
  const stars = document.querySelectorAll('.rating-star');
  const ratingText = document.getElementById('rating-text');
  
  stars.forEach((star, index) => {
    const starIndex = index + 1;
    
    if (starIndex <= selectedRating) {
      star.innerHTML = '★';
      star.classList.add('text-yellow-400');
      star.classList.add('filled');
    } else {
      star.innerHTML = '☆';
      star.classList.remove('text-yellow-400');
      star.classList.remove('filled');
    }
  });
  
  if (ratingText) {
    const ratingLabels = [
      'Click on a star to rate',
      'Poor',
      'Fair',
      'Good',
      'Very Good',
      'Excellent'
    ];
    ratingText.textContent = ratingLabels[selectedRating];
  }
}

// ===== CENTERS SEARCH =====
function initCentersSearch() {
  document.getElementById('search-btn').addEventListener('click', searchCenters);
  document.getElementById('location-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchCenters();
  });
  
  const clearSearchBtn = document.getElementById('clear-search');
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      document.getElementById('location-input').value = '';
      displayAllCenters();
    });
  }
}

function displayAllCenters() {
  const list = document.getElementById('centers-list');
  const countElement = document.getElementById('centers-count');
  
  if (!list) return;
  
  list.innerHTML = '';
  
  // Display all centers
  allCenters.forEach(center => {
    const card = createCenterCard(center);
    list.appendChild(card);
  });
  
  // Update count
  if (countElement) {
    countElement.textContent = allCenters.length;
  }
}

function searchCenters() {
  const term = document.getElementById('location-input').value.toLowerCase().trim();
  const list = document.getElementById('centers-list');
  const countElement = document.getElementById('centers-count');
  
  if (!list) return;
  
  list.innerHTML = '';
  
  // If search is empty, show all centers
  if (!term) {
    displayAllCenters();
    return;
  }
  
  // Search centers
  const filteredCenters = allCenters.filter(c => 
    c.keywords.includes(term) || 
    c.name.toLowerCase().includes(term) ||
    c.address.toLowerCase().includes(term)
  );
  
  // Display filtered centers or no results message
  if (filteredCenters.length === 0) {
    list.innerHTML = `
      <div class="col-span-3 text-center py-12">
        <div class="text-5xl mb-4">🔍</div>
        <h3 class="text-2xl font-semibold text-green-800 mb-2">No centers found</h3>
        <p class="text-gray-600 mb-6">Try searching with different keywords like "Kuala Lumpur", "Penang", or "Shah Alam"</p>
        <button id="show-all-centers" class="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
          Show All Centers
        </button>
      </div>
    `;
    
    document.getElementById('show-all-centers').addEventListener('click', displayAllCenters);
  } else {
    filteredCenters.forEach(center => {
      const card = createCenterCard(center);
      list.appendChild(card);
    });
  }
  
  // Update count
  if (countElement) {
    countElement.textContent = filteredCenters.length;
  }
}

function createCenterCard(center) {
  const card = document.createElement('div');
  card.className = 'center-card bg-white rounded-xl p-6 shadow-lg border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:scale-[1.02]';
  
  card.innerHTML = `
    <div class="flex items-start mb-4">
      <div class="text-3xl mr-4">${center.icon}</div>
      <div class="flex-1">
        <h3 class="text-xl font-semibold text-green-800 mb-1">${center.name}</h3>
        <div class="flex items-center text-sm text-gray-600 mb-2">
          <i class="fas fa-map-marker-alt mr-2 text-green-600"></i>
          <span>${center.address.split(',')[0]}</span>
        </div>
      </div>
    </div>
    
    <p class="text-gray-700 text-sm mb-4">${center.description}</p>
    
    <div class="space-y-3">
      <div class="flex items-center">
        <i class="fas fa-phone text-green-600 w-5 mr-3"></i>
        <span class="text-gray-700">${center.phone}</span>
      </div>
      <div class="flex items-center">
        <i class="fas fa-clock text-green-600 w-5 mr-3"></i>
        <span class="text-gray-700">${center.hours}</span>
      </div>
      <div class="flex items-start">
        <i class="fas fa-map text-green-600 w-5 mr-3 mt-1"></i>
        <span class="text-gray-700 text-sm">${center.address}</span>
      </div>
    </div>
    
    <div class="mt-6 pt-4 border-t border-green-100">
      <a href="feedback.html?center=${encodeURIComponent(center.name)}" class="inline-flex items-center text-green-600 hover:text-green-800 font-medium">
        <i class="fas fa-star mr-2"></i>
        Rate this center
      </a>
    </div>
  `;
  
  return card;
}

// ===== FEEDBACK SYSTEM =====
function initFeedbackSystem() {
  // Load existing feedback
  loadFeedback();
  
  // Setup form submission
  const feedbackForm = document.getElementById('feedback-form');
  feedbackForm.addEventListener('submit', submitFeedback);
  
  // Setup load more button
  const loadMoreBtn = document.getElementById('load-more-feedback');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreFeedback);
  }
  
  // Setup delete modal
  setupDeleteModal();
  
  // Check for center parameter in URL
  const urlParams = new URLSearchParams(window.location.search);
  const centerParam = urlParams.get('center');
  if (centerParam) {
    const centerSelect = document.getElementById('feedback-center');
    if (centerSelect) {
      for (let i = 0; i < centerSelect.options.length; i++) {
        if (centerSelect.options[i].text === decodeURIComponent(centerParam)) {
          centerSelect.selectedIndex = i;
          break;
        }
      }
    }
  }
}

function loadFeedback() {
  let feedbacks = JSON.parse(localStorage.getItem('techcycle_feedback')) || [];
  
  // Add sample data if empty
  if (feedbacks.length === 0) {
    feedbacks = getSampleFeedback();
    localStorage.setItem('techcycle_feedback', JSON.stringify(feedbacks));
  }
  
  displayFeedback(feedbacks);
  updateFeedbackCount(feedbacks.length);
}

function getSampleFeedback() {
  return [
    {
      id: generateId(),
      name: "Ahmad R.",
      center: "Pusat Kitar Semula KLCC",
      rating: 5,
      comments: "Excellent service! Very professional staff who explained the recycling process clearly.",
      date: "15 Mar 2024",
      userCanDelete: false
    },
    {
      id: generateId(),
      name: "Siti N.",
      center: "E-Waste Petaling Jaya",
      rating: 4,
      comments: "Easy drop-off process. Convenient location with ample parking space.",
      date: "12 Mar 2024",
      userCanDelete: false
    },
    {
      id: generateId(),
      name: "Rajesh K.",
      center: "Recycle Hub Penang",
      rating: 5,
      comments: "Great initiative! They even gave me a small plant as a thank you gift for recycling.",
      date: "10 Mar 2024",
      userCanDelete: false
    },
    {
      id: generateId(),
      name: "Wei Chen",
      center: "Pusat Kutipan Shah Alam",
      rating: 4,
      comments: "Friendly staff, quick processing. Will definitely recycle here again.",
      date: "8 Mar 2024",
      userCanDelete: false
    },
    {
      id: generateId(),
      name: "Fatimah A.",
      center: "Pusat E-Waste UKM",
      rating: 3,
      comments: "Good service but limited operating hours. Could improve accessibility.",
      date: "5 Mar 2024",
      userCanDelete: false
    },
    {
      id: generateId(),
      name: "James L.",
      center: "Kitar Semula Johor Bahru",
      rating: 5,
      comments: "Very organized system. They accept a wide range of electronic devices.",
      date: "2 Mar 2024",
      userCanDelete: false
    }
  ];
}

function displayFeedback(feedbacks) {
  const container = document.getElementById('previous-feedback-container');
  const noFeedbackMsg = document.getElementById('no-feedback-message');
  const loadMoreBtn = document.getElementById('load-more-feedback');
  
  if (!container) return;
  
  // Clear container
  container.innerHTML = '';
  
  // Show no feedback message if empty
  if (feedbacks.length === 0) {
    if (noFeedbackMsg) noFeedbackMsg.classList.remove('hidden');
    if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
    return;
  }
  
  if (noFeedbackMsg) noFeedbackMsg.classList.add('hidden');
  
  // Sort by date (newest first)
  const sortedFeedback = [...feedbacks].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  // Calculate pagination
  const startIndex = 0;
  const endIndex = currentFeedbackPage * FEEDBACK_PER_PAGE;
  const feedbackToShow = sortedFeedback.slice(startIndex, endIndex);
  
  // Display feedback
  feedbackToShow.forEach(feedback => {
    const card = createFeedbackCard(feedback);
    container.appendChild(card);
  });
  
  // Show/hide load more button
  if (loadMoreBtn) {
    if (endIndex < sortedFeedback.length) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      loadMoreBtn.classList.add('hidden');
    }
  }
}

function createFeedbackCard(feedback) {
  const card = document.createElement('div');
  card.className = 'feedback-card bg-white rounded-xl p-6 shadow-lg border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:scale-[1.02]';
  card.dataset.id = feedback.id;
  
  // Create star rating
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    starsHtml += i <= feedback.rating ? 
      '<span class="text-yellow-400 text-xl">★</span>' : 
      '<span class="text-gray-300 text-xl">★</span>';
  }
  
  // Create delete button if user can delete
  const deleteButton = feedback.userCanDelete ? 
    `<button class="delete-feedback-btn text-red-500 hover:text-red-700 transition-colors" data-id="${feedback.id}">
      <i class="fas fa-trash"></i>
    </button>` : 
    '';
  
  card.innerHTML = `
    <div class="flex justify-between items-start mb-3">
      <div class="flex-1">
        <h4 class="font-bold text-green-800 text-lg">${feedback.name}</h4>
        <p class="text-sm text-gray-600">${feedback.center}</p>
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-xs text-gray-500">${feedback.date}</span>
        ${deleteButton}
      </div>
    </div>
    <div class="mb-4">
      <div class="flex items-center">
        ${starsHtml}
        <span class="ml-2 text-sm text-gray-600">${feedback.rating}/5</span>
      </div>
    </div>
    <p class="text-gray-700 italic border-l-4 border-green-300 pl-3 py-1">"${feedback.comments}"</p>
  `;
  
  // Add event listener to delete button
  if (feedback.userCanDelete) {
    const deleteBtn = card.querySelector('.delete-feedback-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showDeleteModal(feedback.id);
    });
  }
  
  return card;
}

function updateFeedbackCount(count) {
  const countElement = document.getElementById('feedback-count');
  if (countElement) {
    countElement.textContent = count;
  }
}

function submitFeedback(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('feedback-name').value.trim();
  const centerSelect = document.getElementById('feedback-center');
  const center = centerSelect.options[centerSelect.selectedIndex].text;
  const rating = document.getElementById('feedback-rating').value;
  const comments = document.getElementById('feedback-comments').value.trim();
  
  // Validation
  if (!name || !center || !rating || !comments) {
    alert('Please fill in all fields.');
    return;
  }
  
  if (selectedRating === 0) {
    alert('Please select a rating.');
    return;
  }
  
  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const submitText = document.getElementById('submit-text');
  const submitLoader = document.getElementById('submit-loader');
  
  submitBtn.disabled = true;
  submitText.textContent = 'Submitting...';
  submitLoader.classList.remove('hidden');
  
  // Create feedback object
  const newFeedback = {
    id: generateId(),
    name: name,
    center: center,
    rating: parseInt(rating),
    comments: comments,
    date: new Date().toLocaleDateString('en-MY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    userCanDelete: true // User can delete their own feedback
  };
  
  // Simulate API call delay
  setTimeout(() => {
    // Save to localStorage
    saveFeedback(newFeedback);
    
    // Reset form
    e.target.reset();
    selectedRating = 0;
    updateStarRating();
    
    // Show success message
    const successMsg = document.getElementById('feedback-success');
    successMsg.classList.remove('hidden');
    
    // Reset button state
    submitBtn.disabled = false;
    submitText.textContent = 'Submit Feedback';
    submitLoader.classList.add('hidden');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMsg.classList.add('hidden');
    }, 5000);
  }, 1500);
}

function saveFeedback(feedback) {
  let feedbacks = JSON.parse(localStorage.getItem('techcycle_feedback')) || [];
  feedbacks.push(feedback);
  localStorage.setItem('techcycle_feedback', JSON.stringify(feedbacks));
  
  // Reload and display feedback
  loadFeedback();
}

function loadMoreFeedback() {
  currentFeedbackPage++;
  loadFeedback();
}

function setupDeleteModal() {
  const deleteModal = document.getElementById('delete-modal');
  const cancelDeleteBtn = document.getElementById('cancel-delete');
  const confirmDeleteBtn = document.getElementById('confirm-delete');
  
  if (!deleteModal || !cancelDeleteBtn || !confirmDeleteBtn) return;
  
  // Cancel delete
  cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.classList.add('hidden');
    feedbackToDelete = null;
  });
  
  // Confirm delete
  confirmDeleteBtn.addEventListener('click', () => {
    if (feedbackToDelete) {
      deleteFeedback(feedbackToDelete);
      deleteModal.classList.add('hidden');
      feedbackToDelete = null;
    }
  });
  
  // Close modal when clicking outside
  deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
      deleteModal.classList.add('hidden');
      feedbackToDelete = null;
    }
  });
}

function showDeleteModal(feedbackId) {
  const deleteModal = document.getElementById('delete-modal');
  feedbackToDelete = feedbackId;
  deleteModal.classList.remove('hidden');
}

function deleteFeedback(feedbackId) {
  let feedbacks = JSON.parse(localStorage.getItem('techcycle_feedback')) || [];
  feedbacks = feedbacks.filter(feedback => feedback.id !== feedbackId);
  localStorage.setItem('techcycle_feedback', JSON.stringify(feedbacks));
  
  // Reset to first page
  currentFeedbackPage = 1;
  
  // Reload feedback
  loadFeedback();
}

function generateId() {
  return 'feedback_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ===== CONTACT FORM =====
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', submitContactForm);
  }
}

function submitContactForm(e) {
  e.preventDefault();
  
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const successMsg = document.getElementById('contact-success');
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  // Simulate sending
  setTimeout(() => {
    e.target.reset();
    successMsg.classList.remove('hidden');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
    
    setTimeout(() => {
      successMsg.classList.add('hidden');
    }, 5000);
  }, 1500);
}