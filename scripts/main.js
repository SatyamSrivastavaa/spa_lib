const app = {
    pages: [],
    show: new Event('show'),
    init: function() {
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach(page => page.addEventListener('show', app.pageShown));
        
        document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', app.nav));

        history.replaceState({}, 'Home', '#home');
        window.addEventListener('popstate', app.poppin);
    },
    nav: function(e) {
        e.preventDefault();
        let currentPage = e.target.getAttribute('data-target');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        history.pushState({}, currentPage, `#${currentPage}`);

        document.getElementById(currentPage).dispatchEvent(app.show);
    },
    pageShown: function(e) {
        const h1 = e.target.querySelector('h1');
        h1.classList.add('big');
        setTimeout(element => element.classList.remove('big'), 500, h1);
    },
    poppin: function(e) {
        let hash = location.hash.replace('#', '');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        document.getElementById(hash).dispatchEvent(app.show);
    }
}

document.addEventListener('DOMContentLoaded', app.init);