window.addEventListener('load', function() {
    // alll variables we need
    const scrollLinks = document.querySelectorAll('.scroll-link')
    const headerFixedHeight = document.querySelector('.header').clientHeight;
    const sections = document.querySelectorAll('.section');
    const nav = document.querySelector('.nav');

    // auto-highlight links in nav 
    function checkScroll() {
        var windowY = window.scrollY; 
        // remove all active classes 
        scrollLinks.forEach((scrollLink) => {
            scrollLink.classList.remove('active');
        })
        sections.forEach((section) => {
            // get cooridnates of each section
            let sectionTop = section.offsetTop - headerFixedHeight - 30;
            let sectionBottom = sectionTop + section.offsetHeight;
            // cooordinates match so hightlight them.
            if (windowY >= sectionTop && windowY <= sectionBottom) {
                scrollLinks.forEach((scrollLink) => {
                    if (section.classList.contains(scrollLink.dataset.scroll)) {
                        scrollLink.classList.add('active');
                    } 
                })
            } 
        })
    }

    // eventlistener by scroll
    if (scrollLinks.length > 0) {
        document.addEventListener('scroll', checkScroll);
    }
    
    function scrollToSection(scrollTo, scrollLink) {
        // remove all active classes 
        scrollLinks.forEach((link) => {
            if (link.classList.contains('active')) {
                link.classList.remove('active');
            }
        });

        // We have nav in footer, so if we click on item in it, we need to highleight item in our main nav
        if (document.querySelector('.footer').contains(scrollLink)) {
            scrollLink = nav.querySelector(`[data-scroll='${scrollLink.getAttribute('data-scroll')}']`);
        }

        // get Y of top section's side
        const offsetTop = document.querySelector('.' + scrollTo).offsetTop - headerFixedHeight - 30;
        // we need to disable eventlistener during scroll by click on nav items
        document.removeEventListener('scroll', checkScroll);
        const scrollTime = 800;
        scrollLink.classList.add('active');
        scroll({
            top: offsetTop,
            behavior: "smooth"
        });        
        setTimeout(function() {
            // activate it again
            document.addEventListener('scroll', checkScroll)
        }, scrollTime);
    };

    // set eventlistener by click on nav item and data-scroll attribute to find section we need
    if (scrollLinks.length > 0) {
        scrollLinks.forEach((scrollLink) => {
            const scrollTo = scrollLink.dataset.scroll;
            scrollLink.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSection(scrollTo, scrollLink);
            });
        });
    };
});