document.addEventListener('DOMContentLoaded', () => {
    const toggleMenu = document.querySelector('.menu-icon');
    const navmovil = document.getElementById('navmovil');

    toggleMenu.addEventListener('click', () => {
        navmovil.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleMenu = document.querySelector('.menu-icon');
    const navmovil = document.getElementById('navmovil');

    // Variable para almacenar la última posición de scroll
    let lastScrollY = window.scrollY;

    // Función para abrir/cerrar el menú al hacer clic en el icono
    toggleMenu.addEventListener('click', () => {
        navmovil.classList.toggle('active');
    });

    // Evento de scroll para cerrar el menú
    window.addEventListener('scroll', () => {
        // Obtenemos la posición de scroll actual
        const currentScrollY = window.scrollY;

        // Comprobamos si el menú móvil está activo y si el usuario se desplaza hacia abajo
        if (navmovil.classList.contains('active') && currentScrollY > lastScrollY) {
            // Si el menú está abierto y bajando, lo cerramos
            navmovil.classList.remove('active');
        }

        // Actualizamos la última posición de scroll
        lastScrollY = currentScrollY;
    });
});