document.addEventListener('DOMContentLoaded', () => {
    const toggleMenu = document.querySelector('.menu-icon');
    const navmovil = document.getElementById('navmovil');

    let lastScrollY = window.scrollY;

    if (toggleMenu && navmovil) { // Asegúrate de que los elementos existan
        toggleMenu.addEventListener('click', () => {
            console.log('Clic en hamburguesa! Toggleando menú...');
            navmovil.classList.toggle('active'); // Esto añade o quita la clase 'active' en #navmovil
        });
    } else {
        console.error("ERROR: Elemento .menu-icon o #navmovil no encontrado. El menú no funcionará.");
        if (!toggleMenu) console.error("No se encontró el elemento con la clase .menu-icon");
        if (!navmovil) console.error("No se encontró el elemento con el ID #navmovil");
    }

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (navmovil && navmovil.classList.contains('active') && currentScrollY > lastScrollY) {
            console.log('Scroll hacia abajo con menú abierto. Cerrando menú...');
            navmovil.classList.remove('active');
        }

        lastScrollY = currentScrollY;
    });
});