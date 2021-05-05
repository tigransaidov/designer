 window.addEventListener('load', function () {
 // Filter
    const filterItems = document.querySelectorAll('.filter-item');
    const articles = document.querySelectorAll('.work');

    // if data-category of block and data-filter of nav item matches, remove hide class else add it.
    function filter (category, articles) {
        articles.forEach((article) =>  {
            const articleCategory = article.dataset.category;
            if (category === 'all') {
                article.classList.remove('hide');
                return;
            }
            if (articleCategory !== category) {
                article.classList.add('hide');
            } else {
                article.classList.remove('hide');
            }
        });
    };

    if (filterItems.length > 0) {
        filterItems.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const currentCategory = item.dataset.filter;
                filter(currentCategory, articles);
            });
        });
    };
 })