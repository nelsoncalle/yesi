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






    
        const carouselSlide = document.querySelector('.carousel-slide');
        const images = document.querySelectorAll('.carousel-slide img');
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        const dotsContainer = document.querySelector('.carousel-dots');

        let currentIndex = 0;
        const imageWidth = images[0].clientWidth; // Ancho de una imagen
        const totalImages = images.length;

        // Crear los puntos de navegación
        for (let i = 0; i < totalImages; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-index', i);
            dotsContainer.appendChild(dot);
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.getAttribute('data-index'));
                updateCarousel();
            });
        }

        const dots = document.querySelectorAll('.dot');

        // Función para actualizar la posición del carrusel y los puntos
        function updateCarousel() {
            carouselSlide.style.transform = `translateX(${-currentIndex * imageWidth}px)`;

            // Actualizar la clase 'active' de los puntos
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Navegación con los botones
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
        });

        // Inicializar el carrusel al cargar la página
        updateCarousel();

        // Actualizar el ancho de la imagen en caso de redimensionamiento de la ventana
        window.addEventListener('resize', () => {
            // Recalcula el ancho de la imagen para asegurar que el carrusel se vea bien
            // Esto es importante para la responsividad
            const newImageWidth = images[0].clientWidth;
            carouselSlide.style.transform = `translateX(${-currentIndex * newImageWidth}px)`;
        });
    

});