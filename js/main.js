// DOM Elements
const featuredGamesContainer = document.getElementById('featured-games-container');
const allGamesContainer = document.getElementById('all-games-container');
const ownedGamesContainer = document.getElementById('owned-games-container');
const wishlistGamesContainer = document.getElementById('wishlist-games-container');
const gameDetailContainer = document.getElementById('game-detail-container');

// Helper Functions
function createStarRating(score, maxScore = 5) {
    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('rating');
    
    for (let i = 1; i <= maxScore; i++) {
        const star = document.createElement('span');
        star.classList.add('star');
        
        if (i <= Math.floor(score)) {
            star.classList.add('filled');
            star.innerHTML = '★';
        } else if (i - 0.5 <= score) {
            star.classList.add('filled');
            star.innerHTML = '★'; // Could use a half-star character if available
        } else {
            star.innerHTML = '☆';
        }
        
        ratingContainer.appendChild(star);
    }
    
    // Add numeric rating
    const numericRating = document.createElement('span');
    numericRating.classList.add('numeric-rating');
    numericRating.textContent = ` ${score}/${maxScore}`;
    ratingContainer.appendChild(numericRating);
    
    return ratingContainer;
}

function createGameCard(game) {
    const gameCard = document.createElement('div');
    gameCard.classList.add('game-card');
    
    gameCard.innerHTML = `
        <img src="${game.image}" alt="${game.title}">
        <h3>${game.title}</h3>
        <div class="categories">${game.categories.join(' • ')}</div>
        <p>${game.description}</p>
        <a href="game.html?id=${game.id}" class="read-more">Read full review</a>
    `;
    
    // Insert rating after the title
    const titleElement = gameCard.querySelector('h3');
    const ratingElement = createStarRating(game.rating);
    titleElement.parentNode.insertBefore(ratingElement, titleElement.nextSibling);
    
    return gameCard;
}

// Display Featured Games
function displayFeaturedGames() {
    if (!featuredGamesContainer) return;
    
    const featuredGames = games.filter(game => game.featured);
    
    featuredGames.forEach(game => {
        const gameCard = createGameCard(game);
        featuredGamesContainer.appendChild(gameCard);
    });
}

// Display All Games with Filtering
function displayAllGames() {
    if (!allGamesContainer) return;
    
    // Get filter elements
    const categoryFilter = document.getElementById('category-filter');
    const complexityFilter = document.getElementById('complexity-filter');
    const sortBy = document.getElementById('sort-by');
    
    // Function to apply filters and sort
    function updateGamesList() {
        // Clear container
        allGamesContainer.innerHTML = '';
        
        // Get filter values
        const categoryValue = categoryFilter.value;
        const complexityValue = complexityFilter.value;
        const sortValue = sortBy.value;
        
        // Filter games
        let filteredGames = [...games];
        
        if (categoryValue !== 'all') {
            filteredGames = filteredGames.filter(game => 
                game.categories.includes(categoryValue)
            );
        }
        
        if (complexityValue !== 'all') {
            filteredGames = filteredGames.filter(game => 
                game.complexity === complexityValue
            );
        }
        
        // Sort games
        switch (sortValue) {
            case 'rating-desc':
                filteredGames.sort((a, b) => b.rating - a.rating);
                break;
            case 'rating-asc':
                filteredGames.sort((a, b) => a.rating - b.rating);
                break;
            case 'name-asc':
                filteredGames.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                filteredGames.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }
        
        // Display filtered and sorted games
        filteredGames.forEach(game => {
            const gameCard = createGameCard(game);
            allGamesContainer.appendChild(gameCard);
        });
    }
    
    // Add event listeners to filters
    if (categoryFilter) categoryFilter.addEventListener('change', updateGamesList);
    if (complexityFilter) complexityFilter.addEventListener('change', updateGamesList);
    if (sortBy) sortBy.addEventListener('change', updateGamesList);
    
    // Initial display
    updateGamesList();
}

// Display Collection (Owned and Wishlist)
function displayCollection() {
    if (!ownedGamesContainer && !wishlistGamesContainer) return;
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Display owned games
    if (ownedGamesContainer) {
        const ownedGames = games.filter(game => game.owned);
        
        ownedGames.forEach(game => {
            const gameCard = createGameCard(game);
            ownedGamesContainer.appendChild(gameCard);
        });
    }
    
    // Display wishlist games
    if (wishlistGamesContainer) {
        const wishlistGames = games.filter(game => game.wishlist);
        
        wishlistGames.forEach(game => {
            const gameCard = createGameCard(game);
            wishlistGamesContainer.appendChild(gameCard);
        });
    }
}

// Display Game Detail
function displayGameDetail() {
    if (!gameDetailContainer) return;
    
    // Get game ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = parseInt(urlParams.get('id'));
    
    // Find game
    const game = games.find(g => g.id === gameId);
    
    if (!game) {
        gameDetailContainer.innerHTML = '<p>Game not found.</p>';
        return;
    }
    
    // Update page title
    document.title = `${game.title} | Forest Gamer's Haven`;
    
    // Create game detail HTML
    gameDetailContainer.innerHTML = `
        <div class="game-header">
            <img src="${game.image}" alt="${game.title}" class="game-header-image">
            <div class="game-header-overlay"></div>
            <div class="game-header-content">
                <h1>${game.title}</h1>
                <div id="game-rating"></div>
                <div class="game-meta">
                    <div class="game-meta-item">
                        <span>Complexity:</span>
                        <span>${game.complexity}</span>
                    </div>
                    <div class="game-meta-item">
                        <span>Play Time:</span>
                        <span>${game.playTime}</span>
                    </div>
                    <div class="game-meta-item">
                        <span>Players:</span>
                        <span>${game.players}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="game-body">
            <div class="game-info-grid">
                <div class="game-description">
                    <h2>Description</h2>
                    <p>${game.description}</p>
                </div>
                <div class="game-details">
                    <h2>Game Details</h2>
                    <ul class="game-details-list">
                        <li>
                            <span class="detail-label">Designer:</span>
                            <span>${game.designer}</span>
                        </li>
                        <li>
                            <span class="detail-label">Publisher:</span>
                            <span>${game.publisher}</span>
                        </li>
                        <li>
                            <span class="detail-label">Year:</span>
                            <span>${game.year}</span>
                        </li>
                        <li>
                            <span class="detail-label">Categories:</span>
                            <span>${game.categories.join(', ')}</span>
                        </li>
                        <li>
                            <span class="detail-label">Status:</span>
                            <span>${game.owned ? 'In Collection' : game.wishlist ? 'On Wishlist' : 'Not Owned'}</span>
                        </li>
                    </ul>
                </div>
            </div>
            ${game.review ? `
                <div class="game-review">
                    <h2>My Review</h2>
                    <p>${game.review}</p>
                </div>
            ` : ''}
        </div>
    `;
    
    // Add star rating
    const ratingContainer = document.getElementById('game-rating');
    ratingContainer.appendChild(createStarRating(game.rating));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedGames();
    displayAllGames();
    displayCollection();
    displayGameDetail();
}); 