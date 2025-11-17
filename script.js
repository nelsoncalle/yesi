document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del menú móvil ---
    const toggleMenu = document.querySelector('.menu-icon');
    const navmovil = document.getElementById('navmovil');

    let lastScrollY = window.scrollY; // Para detectar la dirección del scroll

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

    // Cierra el menú móvil si se hace scroll hacia abajo mientras está abierto
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (navmovil && navmovil.classList.contains('active') && currentScrollY > lastScrollY) {
            console.log('Scroll hacia abajo con menú abierto. Cerrando menú...');
            navmovil.classList.remove('active');
        }

        lastScrollY = currentScrollY;
    });


    // --- Lógica del Carrusel ---
    // Referencias a los elementos del DOM
    const carouselContainer = document.querySelector('.carousel-container'); // El contenedor visible del carrusel
    const carouselSlide = document.querySelector('.carousel-slide'); // El contenedor interno que se desplaza
    const images = document.querySelectorAll('.carousel-slide img'); // Todas las imágenes dentro del carrusel
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentIndex = 0; // Índice de la imagen actualmente visible
    let dots = []; // Array para almacenar los elementos de los puntos de navegación

    // Función para obtener el ancho actual del área visible del carrusel
    // Esto es crucial para saber cuánto debe desplazarse el carouselSlide
    function getCurrentSlideWidth() {
        if (carouselContainer) {
            return carouselContainer.clientWidth;
        }
        return 0; // Si el contenedor no existe, devuelve 0 para evitar errores
    }

    // Función para actualizar la posición del carrusel y el estado de los puntos
    function updateCarousel() {
        if (!carouselSlide || images.length === 0) {
            return; // No hacer nada si no hay carrusel o imágenes
        }

        const slideWidth = getCurrentSlideWidth(); // Obtiene el ancho actual del contenedor
        carouselSlide.style.transform = `translateX(${-currentIndex * slideWidth}px)`;

        // Actualizar la clase 'active' de los puntos de navegación
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Función para inicializar o reiniciar el carrusel (crear puntos, establecer posición inicial)
    function initializeCarousel() {
        if (!carouselContainer || !carouselSlide || images.length === 0) {
            console.warn("No se encontró el carrusel o no hay imágenes. No se inicializará el carrusel.");
            return;
        }

        // Limpiar puntos existentes antes de volver a crearlos (útil en resize)
        dotsContainer.innerHTML = '';
        dots = []; // Resetear el array de puntos

        // Crear los puntos de navegación dinámicamente
        for (let i = 0; i < images.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-index', i);
            dotsContainer.appendChild(dot);
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.getAttribute('data-index'));
                updateCarousel();
            });
            dots.push(dot); // Añadir el nuevo punto al array
        }

        // Asegurarse de que currentIndex no exceda el número de imágenes
        // si el número de imágenes cambia (menos probable aquí)
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        updateCarousel(); // Actualizar el carrusel a la posición inicial o actual
    }

    // --- Event Listeners para la navegación del carrusel ---
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length; // Avanza al siguiente, vuelve al inicio si llega al final
            updateCarousel();
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length; // Retrocede, vuelve al final si llega al inicio
            updateCarousel();
        });
    }

    // --- Inicialización del Carrusel al cargar el DOM ---
    initializeCarousel();

    // --- Actualizar el carrusel en caso de redimensionamiento de la ventana ---
    window.addEventListener('resize', () => {
        console.log('Ventana redimensionada. Actualizando carrusel...');
        updateCarousel(); // Solo recalcular la posición y el transform
    });

    // --- Opcional pero recomendado: Re-inicializar el carrusel una vez que todos los recursos (imágenes) han cargado ---
    // Esto asegura que `clientWidth` sea preciso después de que las imágenes tengan sus dimensiones finales.
    window.addEventListener('load', () => {
        console.log('Todas las imágenes y recursos cargados. Re-inicializando carrusel...');
        initializeCarousel();
    });

});