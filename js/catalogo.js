// Animaciones de entrada para la página de productos
document.addEventListener('DOMContentLoaded', () => {
    // Función para verificar si un elemento está visible en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Función para animar elementos cuando entran en el viewport
    function animateOnScroll() {
        const purchaseTips = document.querySelector('.purchase-tips');
        
        if (purchaseTips && isElementInViewport(purchaseTips)) {
            purchaseTips.classList.add('show');
        }
    }

    // Agregar event listener para scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Ejecutar una vez al cargar para elementos ya visibles
    animateOnScroll();
    
    // Inicializar menú móvil
    initializeMobileMenu();
});

// Funcionalidad del menú móvil
function initializeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}
