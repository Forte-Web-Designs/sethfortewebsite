// Blog filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articles = document.querySelectorAll('.article-card, .article-featured');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter articles
            articles.forEach(article => {
                if (category === 'all') {
                    article.classList.remove('hidden');
                } else {
                    if (article.dataset.category === category) {
                        article.classList.remove('hidden');
                    } else {
                        article.classList.add('hidden');
                    }
                }
            });
        });
    });
});
