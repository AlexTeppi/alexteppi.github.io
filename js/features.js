// Features and functionality for Forest News Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize CMS
    const cms = new ForestNewsCMS();
    cms.loadArticles();
    
    // If no articles exist, initialize with sample content
    if (cms.getAllArticles().length === 0) {
        cms.initializeWithSampleContent();
    }
    
    // Create placeholder images for articles if they don't exist
    const articleImages = [
        { name: 'sheka-forest.jpg', color: '#2e7d32' },
        { name: 'climate-change.jpg', color: '#0277bd' },
        { name: 'indigenous-knowledge.jpg', color: '#8d6e63' },
        { name: 'ai-forest-monitoring.jpg', color: '#546e7a' },
        { name: 'community-conservation.jpg', color: '#558b2f' }
    ];
    
    // Create placeholder images for articles
    createPlaceholderImages(articleImages);
    
    // Populate featured articles
    populateFeaturedArticles(cms);
    
    // Populate latest articles
    populateLatestArticles(cms);
    
    // Language switcher functionality
    initLanguageSwitcher();
    
    // Mobile menu toggle
    initMobileMenu();
});

// Create placeholder images for articles
function createPlaceholderImages(images) {
    images.forEach(img => {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');
        
        // Fill background
        ctx.fillStyle = img.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(img.name.replace('.jpg', '').replace(/-/g, ' '), canvas.width/2, canvas.height/2);
        
        // Convert to data URL
        const dataUrl = canvas.toDataURL('image/jpeg');
        
        // Create image element with the data URL
        const img_element = document.createElement('img');
        img_element.src = dataUrl;
        img_element.alt = img.name.replace('.jpg', '').replace(/-/g, ' ');
        img_element.className = 'placeholder-image';
        img_element.dataset.filename = img.name;
        
        // Append to hidden container
        const container = document.createElement('div');
        container.style.display = 'none';
        container.appendChild(img_element);
        document.body.appendChild(container);
    });
}

// Populate featured articles
function populateFeaturedArticles(cms) {
    const featuredArticles = cms.getFeaturedArticles();
    const featuredContainer = document.querySelector('.news-grid');
    
    if (featuredContainer && featuredArticles.length > 0) {
        featuredContainer.innerHTML = '';
        
        featuredArticles.forEach(article => {
            const articleElement = createArticleCard(article);
            featuredContainer.appendChild(articleElement);
        });
    }
}

// Populate latest articles
function populateLatestArticles(cms) {
    const latestArticles = cms.getLatestArticles();
    const latestContainer = document.querySelector('.news-list');
    
    if (latestContainer && latestArticles.length > 0) {
        latestContainer.innerHTML = '';
        
        latestArticles.forEach(article => {
            const articleElement = createArticleListItem(article);
            latestContainer.appendChild(articleElement);
        });
    }
}

// Create article card for featured section
function createArticleCard(article) {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.dataset.id = article.id;
    
    // Find placeholder image if it exists
    let imageSrc = article.image;
    const placeholderImg = document.querySelector(`.placeholder-image[data-filename="${article.image.split('/').pop()}"]`);
    if (placeholderImg) {
        imageSrc = placeholderImg.src;
    }
    
    card.innerHTML = `
        <div class="news-image">
            <img src="${imageSrc}" alt="${article.title_en}">
        </div>
        <div class="news-content">
            <span class="category">${article.category}</span>
            <h3 class="en">${article.title_en}</h3>
            <h3 class="am">${article.title_am}</h3>
            <p class="en">${article.content_en.substring(0, 120)}...</p>
            <p class="am">${article.content_am.substring(0, 120)}...</p>
            <div class="news-meta">
                <span>${article.date}</span>
                <a href="article.html?id=${article.id}" class="read-more en">Read More</a>
                <a href="article.html?id=${article.id}" class="read-more am">ተጨማሪ ያንብቡ</a>
            </div>
        </div>
    `;
    
    return card;
}

// Create article list item for latest section
function createArticleListItem(article) {
    const item = document.createElement('div');
    item.className = 'news-item';
    item.dataset.id = article.id;
    
    // Find placeholder image if it exists
    let imageSrc = article.image;
    const placeholderImg = document.querySelector(`.placeholder-image[data-filename="${article.image.split('/').pop()}"]`);
    if (placeholderImg) {
        imageSrc = placeholderImg.src;
    }
    
    item.innerHTML = `
        <div class="news-item-image">
            <img src="${imageSrc}" alt="${article.title_en}">
        </div>
        <div class="news-item-content">
            <span class="category">${article.category}</span>
            <h3 class="en">${article.title_en}</h3>
            <h3 class="am">${article.title_am}</h3>
            <p class="en">${article.content_en.substring(0, 200)}...</p>
            <p class="am">${article.content_am.substring(0, 200)}...</p>
            <div class="news-meta">
                <span>${article.date} | ${article.author}</span>
                <a href="article.html?id=${article.id}" class="read-more en">Read More</a>
                <a href="article.html?id=${article.id}" class="read-more am">ተጨማሪ ያንብቡ</a>
            </div>
        </div>
    `;
    
    return item;
}

// Initialize language switcher
function initLanguageSwitcher() {
    const enBtn = document.getElementById('en-btn');
    const amBtn = document.getElementById('am-btn');
    
    if (enBtn && amBtn) {
        enBtn.addEventListener('click', function() {
            document.body.classList.remove('amharic');
            enBtn.classList.add('active');
            amBtn.classList.remove('active');
            localStorage.setItem('forestNewsLanguage', 'en');
        });
        
        amBtn.addEventListener('click', function() {
            document.body.classList.add('amharic');
            amBtn.classList.add('active');
            enBtn.classList.remove('active');
            localStorage.setItem('forestNewsLanguage', 'am');
        });
        
        // Set initial language based on localStorage
        const savedLanguage = localStorage.getItem('forestNewsLanguage');
        if (savedLanguage === 'am') {
            amBtn.click();
        } else {
            enBtn.click();
        }
    }
}

// Initialize mobile menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}
