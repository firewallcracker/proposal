let currentPage = 1;
const totalPages = 4;

function openBook() {
    const cover = document.getElementById('cover');
    const book = document.getElementById('book');
    const closeBtn = document.getElementById('closeBtn');
    
    cover.style.display = 'none';
    book.style.display = 'block';
    closeBtn.style.display = 'block';
    
    // Show first page
    showPage(1);
}

function closeBook() {
    const cover = document.getElementById('cover');
    const book = document.getElementById('book');
    const closeBtn = document.getElementById('closeBtn');
    
    book.style.display = 'none';
    closeBtn.style.display = 'none';
    cover.style.display = 'flex';
    
    // Reset to first page
    currentPage = 1;
}

function showPage(pageNum) {
    // Hide all pages
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById(`page${i}`);
        if (page) {
            page.style.display = 'none';
        }
    }
    
    // Show current page
    const currentPageElement = document.getElementById(`page${pageNum}`);
    if (currentPageElement) {
        currentPageElement.style.display = 'block';
    }
    
    // Update navigation
    updateNavigation();
    updatePageIndicator();
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

function goToPage(pageNum) {
    if (pageNum >= 1 && pageNum <= totalPages) {
        currentPage = pageNum;
        showPage(currentPage);
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Show/hide previous button
    if (currentPage === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }
    
    // Update next button text and functionality
    if (currentPage === totalPages) {
        nextBtn.textContent = 'Finish';
        nextBtn.onclick = closeBook;
    } else {
        nextBtn.textContent = 'Next ❯';
        nextBtn.onclick = nextPage;
    }
}

function updatePageIndicator() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Fullscreen Image Functions
function openFullscreen(img) {
    const modal = document.getElementById('fullscreenModal');
    const fullscreenImg = document.getElementById('fullscreenImage');
    
    fullscreenImg.src = img.src;
    modal.style.display = 'block';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeFullscreen() {
    const modal = document.getElementById('fullscreenModal');
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Keyboard navigation - Single event listener
document.addEventListener('keydown', function(event) {
    const book = document.getElementById('book');
    const modal = document.getElementById('fullscreenModal');
    
    // Handle fullscreen modal first
    if (modal && modal.style.display === 'block') {
        if (event.key === 'Escape') {
            closeFullscreen();
        }
        return; // Don't process other keys when fullscreen is open
    }
    
    // Handle book navigation
    if (book.style.display === 'block') {
        if (event.key === 'ArrowRight' || event.key === ' ') {
            event.preventDefault();
            if (currentPage < totalPages) {
                nextPage();
            } else {
                closeBook();
            }
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            if (currentPage > 1) {
                prevPage();
            }
        } else if (event.key === 'Escape') {
            closeBook();
        }
    } else {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openBook();
        }
    }
});

// Touch/Swipe navigation for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const book = document.getElementById('book');
    
    if (book.style.display === 'block') {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - go to previous page
                if (currentPage > 1) {
                    prevPage();
                }
            } else {
                // Swipe left - go to next page
                if (currentPage < totalPages) {
                    nextPage();
                } else {
                    closeBook();
                }
            }
        }
    }
}

// Initialize page indicator on load
document.addEventListener('DOMContentLoaded', function() {
    updatePageIndicator();
});

// Add smooth transitions
const style = document.createElement('style');
style.textContent = `
    .page-container {
        transition: opacity 0.3s ease-in-out;
    }
    
    .nav-btn {
        transition: all 0.2s ease;
    }
    
    .dot {
        transition: all 0.2s ease;
    }
`;
document.head.appendChild(style);