document.addEventListener('DOMContentLoaded', () => {
    const toggleMenu = document.querySelector('.menu-icon');
    const navmovil = document.getElementById('navmovil');

    toggleMenu.addEventListener('click', () => {
        navmovil.classList.toggle('active');
    });
});