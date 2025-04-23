// Category Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all category filter buttons
    const categoryFilters = document.querySelectorAll('.category-filter button');
    
    if (categoryFilters.length > 0) {
        // Add click event to each filter button
        categoryFilters.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryFilters.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get selected category
                const category = this.getAttribute('data-category');
                
                // Get all news items
                const newsItems = document.querySelectorAll('.news-card, .news-item');
                
                // Filter news items based on selected category
                newsItems.forEach(item => {
                    const itemCategory = item.querySelector('.category').textContent;
                    
                    if (category === 'all' || itemCategory === category) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm === '') return;
            
            // Get all news items
            const newsItems = document.querySelectorAll('.news-card, .news-item');
            
            // Filter news items based on search term
            let hasResults = false;
            
            newsItems.forEach(item => {
                const titleEn = item.querySelector('h3.en').textContent.toLowerCase();
                const titleAm = item.querySelector('h3.am').textContent;
                const contentEn = item.querySelector('p.en') ? item.querySelector('p.en').textContent.toLowerCase() : '';
                const contentAm = item.querySelector('p.am') ? item.querySelector('p.am').textContent : '';
                
                // Check if search term is in title or content
                if (titleEn.includes(searchTerm) || 
                    titleAm.includes(searchTerm) || 
                    contentEn.includes(searchTerm) || 
                    contentAm.includes(searchTerm)) {
                    item.style.display = 'flex';
                    hasResults = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show message if no results found
            const resultsMessage = document.querySelector('.search-results-message');
            
            if (resultsMessage) {
                if (!hasResults) {
                    resultsMessage.style.display = 'block';
                    resultsMessage.querySelector('.en').style.display = document.documentElement.classList.contains('am-lang') ? 'none' : 'block';
                    resultsMessage.querySelector('.am').style.display = document.documentElement.classList.contains('am-lang') ? 'block' : 'none';
                } else {
                    resultsMessage.style.display = 'none';
                }
            }
        });
    }
});

// Share Article Functionality
document.addEventListener('DOMContentLoaded', function() {
    const shareButtons = document.querySelectorAll('.share-button');
    
    if (shareButtons.length > 0) {
        shareButtons.forEach(button => {
            button.addEventListener('click', function() {
                const articleId = this.closest('[data-article-id]').getAttribute('data-article-id');
                const shareUrl = `${window.location.origin}/article.html?id=${articleId}`;
                
                // Check if Web Share API is supported
                if (navigator.share) {
                    navigator.share({
                        title: document.title,
                        url: shareUrl
                    })
                    .catch(error => console.log('Error sharing:', error));
                } else {
                    // Fallback: Copy to clipboard
                    navigator.clipboard.writeText(shareUrl)
                        .then(() => {
                            // Show copied message
                            const message = document.createElement('div');
                            message.className = 'copy-message';
                            
                            const messageText = document.documentElement.classList.contains('am-lang') 
                                ? 'ለመጋራት URL ተቀድቷል' 
                                : 'URL copied for sharing';
                                
                            message.textContent = messageText;
                            document.body.appendChild(message);
                            
                            // Remove message after 2 seconds
                            setTimeout(() => {
                                message.remove();
                            }, 2000);
                        })
                        .catch(error => console.log('Error copying:', error));
                }
            });
        });
    }
});

// Comment System
document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.querySelector('.comment-form');
    const commentsList = document.querySelector('.comments-list');
    
    if (commentForm && commentsList) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('comment-name');
            const commentInput = document.getElementById('comment-text');
            
            if (!nameInput || !commentInput) return;
            
            const name = nameInput.value.trim();
            const comment = commentInput.value.trim();
            
            if (name === '' || comment === '') {
                alert(document.documentElement.classList.contains('am-lang') 
                    ? 'እባክዎ ሁሉንም መስኮች ይሙሉ' 
                    : 'Please fill in all fields');
                return;
            }
            
            // Create new comment element
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            
            const date = new Date();
            const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            
            newComment.innerHTML = `
                <div class="comment-header">
                    <h4>${name}</h4>
                    <span class="comment-date">${formattedDate}</span>
                </div>
                <div class="comment-body">
                    <p>${comment}</p>
                </div>
            `;
            
            // Add new comment to the list
            commentsList.appendChild(newComment);
            
            // Clear form
            commentForm.reset();
        });
    }
});

// Print Article Functionality
document.addEventListener('DOMContentLoaded', function() {
    const printButtons = document.querySelectorAll('.print-button');
    
    if (printButtons.length > 0) {
        printButtons.forEach(button => {
            button.addEventListener('click', function() {
                window.print();
            });
        });
    }
});

// Font Size Adjustment
document.addEventListener('DOMContentLoaded', function() {
    const increaseFontButton = document.querySelector('.increase-font');
    const decreaseFontButton = document.querySelector('.decrease-font');
    const resetFontButton = document.querySelector('.reset-font');
    
    if (increaseFontButton && decreaseFontButton && resetFontButton) {
        // Default font size (in percentage)
        let currentFontSize = 100;
        
        // Increase font size
        increaseFontButton.addEventListener('click', function() {
            if (currentFontSize < 150) {
                currentFontSize += 10;
                document.body.style.fontSize = `${currentFontSize}%`;
            }
        });
        
        // Decrease font size
        decreaseFontButton.addEventListener('click', function() {
            if (currentFontSize > 70) {
                currentFontSize -= 10;
                document.body.style.fontSize = `${currentFontSize}%`;
            }
        });
        
        // Reset font size
        resetFontButton.addEventListener('click', function() {
            currentFontSize = 100;
            document.body.style.fontSize = '100%';
        });
    }
});

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            darkModeToggle.classList.add('active');
        }
        
        // Toggle dark mode
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            this.classList.toggle('active');
            
            // Save preference
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
});

// Related Articles Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.related-carousel');
    
    if (carousel) {
        const prevButton = carousel.querySelector('.carousel-prev');
        const nextButton = carousel.querySelector('.carousel-next');
        const carouselTrack = carousel.querySelector('.carousel-track');
        
        if (prevButton && nextButton && carouselTrack) {
            let position = 0;
            const slideWidth = carouselTrack.querySelector('.news-card').offsetWidth + 20; // Width + margin
            const slidesCount = carouselTrack.querySelectorAll('.news-card').length;
            const visibleSlides = Math.floor(carousel.offsetWidth / slideWidth);
            const maxPosition = (slidesCount - visibleSlides) * slideWidth;
            
            // Update carousel position
            function updatePosition() {
                carouselTrack.style.transform = `translateX(-${position}px)`;
                
                // Update button states
                prevButton.disabled = position === 0;
                nextButton.disabled = position >= maxPosition;
            }
            
            // Previous slide
            prevButton.addEventListener('click', function() {
                position = Math.max(0, position - slideWidth);
                updatePosition();
            });
            
            // Next slide
            nextButton.addEventListener('click', function() {
                position = Math.min(maxPosition, position + slideWidth);
                updatePosition();
            });
            
            // Initialize
            updatePosition();
            
            // Update on window resize
            window.addEventListener('resize', function() {
                const newVisibleSlides = Math.floor(carousel.offsetWidth / slideWidth);
                const newMaxPosition = (slidesCount - newVisibleSlides) * slideWidth;
                
                position = Math.min(position, newMaxPosition);
                updatePosition();
            });
        }
    }
});

// Weather Widget
document.addEventListener('DOMContentLoaded', function() {
    const weatherWidget = document.querySelector('.weather-widget');
    
    if (weatherWidget) {
        // Simulate weather data (in a real implementation, this would come from an API)
        const weatherData = {
            location: 'Teppi, Sheka Zone',
            temperature: 24,
            condition: 'Partly Cloudy',
            humidity: 65,
            wind: 8
        };
        
        // Update weather widget
        const locationElement = weatherWidget.querySelector('.weather-location');
        const tempElement = weatherWidget.querySelector('.weather-temp');
        const conditionElement = weatherWidget.querySelector('.weather-condition');
        const humidityElement = weatherWidget.querySelector('.weather-humidity');
        const windElement = weatherWidget.querySelector('.weather-wind');
        
        if (locationElement) locationElement.textContent = weatherData.location;
        if (tempElement) tempElement.textContent = `${weatherData.temperature}°C`;
        if (conditionElement) conditionElement.textContent = weatherData.condition;
        if (humidityElement) humidityElement.textContent = `${weatherData.humidity}%`;
        if (windElement) windElement.textContent = `${weatherData.wind} km/h`;
    }
});

// Newsletter Subscription Validation
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            
            if (!emailInput) return;
            
            const email = emailInput.value.trim();
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                alert(document.documentElement.classList.contains('am-lang') 
                    ? 'እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ' 
                    : 'Please enter a valid email address');
                return;
            }
            
            // Simulate subscription (in a real implementation, this would be sent to a server)
            const successMessage = document.createElement('div');
            successMessage.className = 'subscription-success';
            
            const messageText = document.documentElement.classList.contains('am-lang') 
                ? 'ለዜና መጽሄታችን በተሳካ ሁኔታ ተመዝግበዋል!' 
                : 'Successfully subscribed to our newsletter!';
                
            successMessage.textContent = messageText;
            
            // Replace form with success message
            newsletterForm.parentNode.replaceChild(successMessage, newsletterForm);
        });
    }
});

// Mobile Navigation Improvements
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Prevent body scrolling when menu is open
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});

// Scroll to Top Button
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Add article interaction features
document.addEventListener('DOMContentLoaded', function() {
    // Add share, print, and font size buttons to article pages
    const articleContent = document.getElementById('article-content');
    
    if (articleContent) {
        // Create article tools container
        const articleTools = document.createElement('div');
        articleTools.className = 'article-tools';
        
        // Add font size controls
        const fontControls = document.createElement('div');
        fontControls.className = 'font-controls';
        fontControls.innerHTML = `
            <button class="decrease-font" title="Decrease font size"><i class="fas fa-minus"></i></button>
            <button class="reset-font" title="Reset font size"><i class="fas fa-font"></i></button>
            <button class="increase-font" title="Increase font size"><i class="fas fa-plus"></i></button>
        `;
        
        // Add share and print buttons
        const shareTools = document.createElement('div');
        shareTools.className = 'share-tools';
        shareTools.innerHTML = `
            <button class="share-button" title="Share article"><i class="fas fa-share-alt"></i> <span class="en">Share</span><span class="am">አጋራ</span></button>
            <button class="print-button" title="Print article"><i class="fas fa-print"></i> <span class="en">Print</span><span class="am">አትም</span></button>
        `;
        
        // Add dark mode toggle
        const darkModeButton = document.createElement('button');
        darkModeButton.className = 'dark-mode-toggle';
        darkModeButton.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeButton.title = 'Toggle dark mode';
        
        // Append all tools
        articleTools.appendChild(fontControls);
        articleTools.appendChild(shareTools);
        articleTools.appendChild(darkModeButton);
        
        // Insert tools after article header
        const articleHeader = articleContent.querySelector('.article-header');
        if (articleHeader) {
            articleHeader.parentNode.insertBefore(articleTools, articleHeader.nextSibling);
        }
        
        // Add comments section
        const commentsSection = document.createElement('section');
        commentsSection.className = 'comments-section';
        commentsSection.innerHTML = `
            <h2 class="en">Comments</h2>
            <h2 class="am">አስተያየቶች</h2>
            
            <form class="comment-form">
                <div class="form-group">
                    <label for="comment-name" class="en">Your Name</label>
                    <label for="comment-name" class="am">ስምዎ</label>
                    <input type="text" id="comment-name" required>
                </div>
                
                <div class="form-group">
                    <label for="comment-text" class="en">Your Comment</label>
                    <label for="comment-text" class="am">አስተያየትዎ</label>
                    <textarea id="comment-text" required></textarea>
                </div>
                
                <button type="submit" class="en">Post Comment</button>
                <button type="submit" class="am">አስተያየት ይለጥፉ</button>
            </form>
            
            <div class="comments-list">
                <!-- Comments will be added here -->
            </div>
        `;
        
        // Add comments section after article content
        articleContent.parentNode.insertBefore(commentsSection, articleContent.nextSibling);
    }
});
