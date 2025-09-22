/**
 * Chalet Miage - Build Guide JavaScript
 * Loads and displays construction articles
 */

document.addEventListener('DOMContentLoaded', function() {
    loadBuildArticles();
});

/**
 * Load and display build articles from posts.json
 */
async function loadBuildArticles() {
    try {
        const response = await fetch('posts/posts.json');
        const articles = await response.json();
        
        displayArticles(articles);
        updateArticleCount(articles.length);
        
    } catch (error) {
        console.error('Error loading build articles:', error);
        displayError();
    }
}

/**
 * Display articles in the grid
 */
function displayArticles(articles) {
    const articlesContainer = document.getElementById('build-articles');
    
    if (!articlesContainer) return;
    
    articlesContainer.innerHTML = '';
    
    articles.forEach((article, index) => {
        const articleCard = createArticleCard(article, index + 1);
        articlesContainer.appendChild(articleCard);
    });
}

/**
 * Create individual article card
 */
function createArticleCard(article, phaseNumber) {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.onclick = () => openArticle(article.file);
    
    const statusClass = getStatusClass(article.status);
    const phaseLabel = `Phase ${phaseNumber}`;
    
    card.innerHTML = `
        <div class="article-image" style="background-image: url('${getArticleImage(article)}')">
            <div class="article-phase">${phaseLabel}</div>
        </div>
        <div class="article-content">
            <h3 class="article-title">${article.title}</h3>
            <p class="article-description">${article.description}</p>
            <div class="article-meta">
                <span class="article-date">${article.date}</span>
                <span class="article-status ${statusClass}">${article.status || 'Complete'}</span>
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Get article image or fallback
 */
function getArticleImage(article) {
    if (article.image) {
        return `../images/build/${article.image}`;
    }
    
    // Generate placeholder based on article type
    const filename = article.file.toLowerCase();
    if (filename.includes('plot') || filename.includes('land')) {
        return '../images/build/land-placeholder.jpg';
    } else if (filename.includes('planning')) {
        return '../images/build/planning-placeholder.jpg';
    } else if (filename.includes('ground') || filename.includes('concrete')) {
        return '../images/build/groundworks-placeholder.jpg';
    } else if (filename.includes('sip')) {
        return '../images/build/sip-placeholder.jpg';
    } else if (filename.includes('window') || filename.includes('cladding')) {
        return '../images/build/exterior-placeholder.jpg';
    }
    
    return '../images/build/construction-default.jpg';
}

/**
 * Get status CSS class
 */
function getStatusClass(status) {
    if (!status) return 'status-complete';
    
    switch (status.toLowerCase()) {
        case 'complete':
        case 'completed':
            return 'status-complete';
        case 'in progress':
        case 'progress':
        case 'ongoing':
            return 'status-progress';
        case 'planned':
        case 'upcoming':
            return 'status-planned';
        default:
            return 'status-complete';
    }
}

/**
 * Update article count in hero section
 */
function updateArticleCount(count) {
    const countElement = document.getElementById('article-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

/**
 * Open individual article (when implemented)
 */
function openArticle(filename) {
    // For now, log the article - later we'll implement individual article pages
    console.log('Opening article:', filename);
    
    // Placeholder: Could open modal with article content
    // or navigate to individual article page
    loadAndDisplayArticle(filename);
}

/**
 * Load and display individual article content
 */
async function loadAndDisplayArticle(filename) {
    try {
        const response = await fetch(`posts/${filename}`);
        const markdownContent = await response.text();
        
        // Convert markdown to HTML (simple version)
        const htmlContent = convertMarkdownToHTML(markdownContent);
        
        // Display in modal or redirect to article page
        showArticleModal(htmlContent);
        
    } catch (error) {
        console.error('Error loading article:', filename, error);
    }
}

/**
 * Simple markdown to HTML converter
 */
function convertMarkdownToHTML(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    
    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Images
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />');
    
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    
    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    
    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    
    return html;
}

/**
 * Show article in modal (temporary solution)
 */
function showArticleModal(htmlContent) {
    // Create modal backdrop
    const modal = document.createElement('div');
    modal.className = 'article-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        border-radius: 12px;
        position: relative;
    `;
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: #2c3e50;
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1001;
    `;
    
    closeButton.onclick = () => document.body.removeChild(modal);
    
    // Add content
    modalContent.innerHTML = `
        <div class="article-body" style="padding: 4rem 2rem;">
            ${htmlContent}
        </div>
    `;
    
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close on backdrop click
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

/**
 * Display error message
 */
function displayError() {
    const articlesContainer = document.getElementById('build-articles');
    if (articlesContainer) {
        articlesContainer.innerHTML = `
            <div class="error-message" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3>Unable to load construction guides</h3>
                <p>Please check back later for our build documentation.</p>
            </div>
        `;
    }
}

/**
 * Search functionality (for future enhancement)
 */
function searchArticles(query) {
    // Implementation for searching through articles
    console.log('Searching for:', query);
}

/**
 * Filter articles by status (for future enhancement)
 */
function filterByStatus(status) {
    // Implementation for filtering articles
    console.log('Filtering by status:', status);
}
