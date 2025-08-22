// Funcionalidad de la página de detalle de producto
document.addEventListener('DOMContentLoaded', function() {
    initializeProductDetail();
});

async function initializeProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showProductError('Producto no encontrado');
        return;
    }

    try {
        // Simular retraso de carga
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const products = await loadProducts();
        const product = getProductById(parseInt(productId));

        if (!product) {
            showProductError('Producto no encontrado');
            return;
        }

        renderProductDetail(product);
        updateBreadcrumb(product);
        loadRelatedProducts(product);

    } catch (error) {
        console.error('Error loading product detail:', error);
        showProductError('Error al cargar el producto');
    }
}

function renderProductDetail(product) {
    const container = document.getElementById('product-container');
    const loadingElement = document.getElementById('loading');

    if (loadingElement) {
        loadingElement.style.display = 'none';
    }

    if (!container) return;

    container.innerHTML = `
        <div class="product-detail-content">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h1>${product.name}</h1>
                <div class="product-detail-price">${formatPrice(product.price)}</div>
                <div class="product-detail-description">
                    <p>${product.description}</p>
                </div>
                
                <div class="product-specs">
                    <h3>Especificaciones</h3>
                    <ul>
                        ${Object.entries(product.specifications).map(([key, value]) => 
                            `<li>
                                <span><strong>${key}:</strong></span>
                                <span>${value}</span>
                            </li>`
                        ).join('')}
                    </ul>
                </div>

                <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">
                    Añadir al Carrito
                </button>
            </div>
        </div>
    `;

    // Actualizar título de la página
    document.title = `${product.name} - Mueblería Hermanos Jota`;

    // Agregar animación
    const content = container.querySelector('.product-detail-content');
    if (content) {
        content.classList.add('fade-in');
    }
}

function updateBreadcrumb(product) {
    const breadcrumbProduct = document.getElementById('breadcrumb-product');
    if (breadcrumbProduct) {
        breadcrumbProduct.textContent = product.name;
    }
}

async function loadRelatedProducts(currentProduct) {
    const relatedContainer = document.getElementById('related-products-grid');
    if (!relatedContainer) return;

    try {
        const products = await loadProducts();
        
        // Obtener productos de la misma categoría (excluyendo el producto actual)
        let relatedProducts = products.filter(product => 
            product.category === currentProduct.category && 
            product.id !== currentProduct.id
        );

        // Si no hay suficientes productos relacionados, obtener productos aleatorios
        if (relatedProducts.length < 3) {
            const otherProducts = products.filter(product => 
                product.id !== currentProduct.id && 
                !relatedProducts.some(rp => rp.id === product.id)
            );
            
            relatedProducts = [...relatedProducts, ...otherProducts].slice(0, 4);
        } else {
            relatedProducts = relatedProducts.slice(0, 4);
        }

        if (relatedProducts.length > 0) {
            renderProducts(relatedProducts, 'related-products-grid');
            
            // Mostrar sección de productos relacionados
            const relatedSection = document.querySelector('.related-products');
            if (relatedSection) {
                relatedSection.style.display = 'block';
            }
        } else {
            // Ocultar sección de productos relacionados si no hay productos
            const relatedSection = document.querySelector('.related-products');
            if (relatedSection) {
                relatedSection.style.display = 'none';
            }
        }

    } catch (error) {
        console.error('Error loading related products:', error);
    }
}

function showProductError(message) {
    const container = document.getElementById('product-container');
    const loadingElement = document.getElementById('loading');

    if (loadingElement) {
        loadingElement.style.display = 'none';
    }

    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: var(--spacing-xxl) 0;">
                <h2 style="color: var(--error-color); margin-bottom: var(--spacing-md);">
                    ${message}
                </h2>
                <p style="color: var(--text-medium); margin-bottom: var(--spacing-lg);">
                    El producto que buscas no está disponible o ha sido removido.
                </p>
                <a href="productos.html" class="btn btn-primary">
                    Ver Catálogo
                </a>
            </div>
        `;
    }

    // Actualizar título de la página
    document.title = `Producto no encontrado - Mueblería Hermanos Jota`;
}

// Manejar zoom de imagen del producto (mejora opcional)
function initializeImageZoom() {
    const productImage = document.querySelector('.product-detail-image img');
    if (productImage) {
        productImage.style.cursor = 'zoom-in';
        
        productImage.addEventListener('click', function() {
            // Crear modal para imagen ampliada
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: zoom-out;
            `;
            
            const zoomedImage = document.createElement('img');
            zoomedImage.src = this.src;
            zoomedImage.alt = this.alt;
            zoomedImage.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
            `;
            
            modal.appendChild(zoomedImage);
            document.body.appendChild(modal);
            
            // Cerrar al hacer clic
            modal.addEventListener('click', () => modal.remove());
            
            // Cerrar con tecla escape
            const closeOnEscape = (e) => {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.removeEventListener('keydown', closeOnEscape);
                }
            };
            document.addEventListener('keydown', closeOnEscape);
        });
    }
}

// Inicializar zoom de imagen después de que se renderice el detalle del producto
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeImageZoom, 1500); // Esperar a que se cargue el producto
});