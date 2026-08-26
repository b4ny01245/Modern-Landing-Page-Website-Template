const toggleButton = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const header = document.querySelector('header');
const homeArea = document.querySelector('.hero') || document.getElementById('home');

if (!toggleButton) {
    console.warn('Theme toggle button not found.');
} else {
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        toggleButton.textContent = theme === 'dark' ? '☀️' : '🌙';
    };

    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    toggleButton.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}

const updateHeaderVisibility = () => {
    if (!header || !homeArea) return;

    if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
        header.classList.remove('header-hidden');
        return;
    }

    const homeBottom = homeArea.offsetTop + homeArea.offsetHeight;
    const shouldHide = window.scrollY > homeBottom - 120;
    header.classList.toggle('header-hidden', shouldHide);
};

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        updateHeaderVisibility();
    });

    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            updateHeaderVisibility();
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
        updateHeaderVisibility();
    });
}

window.addEventListener('scroll', updateHeaderVisibility);
window.addEventListener('load', updateHeaderVisibility);