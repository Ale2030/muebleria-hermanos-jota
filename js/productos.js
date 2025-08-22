// Datos de productos
const products = [
    {
        id: 1,
        name: "Mesa de Comedor Rústica",
        description: "Mesa de comedor de madera maciza con acabado rústico. Perfecta para reuniones familiares.",
        price: 45000,
        image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "mesas",
        featured: true,
        specifications: {
            "Material": "Madera de roble macizo",
            "Dimensiones": "180cm x 90cm x 75cm",
            "Capacidad": "6-8 personas",
            "Acabado": "Barniz ecológico mate",
            "Garantía": "5 años"
        }
    },
    {
        id: 2,
        name: "Silla Artesanal Moderna",
        description: "Silla ergonómica con diseño moderno y estructura de madera resistente.",
        price: 12000,
        image: "https://images.pexels.com/photos/586765/pexels-photo-586765.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "sillas",
        featured: true,
        specifications: {
            "Material": "Madera de haya",
            "Dimensiones": "45cm x 50cm x 82cm",
            "Peso máximo": "120kg",
            "Acabado": "Lacado natural",
            "Garantía": "3 años"
        }
    },
    {
        id: 3,
        name: "Estantería de Pino",
        description: "Estantería versátil de 5 niveles, ideal para libros, decoración y almacenamiento.",
        price: 28000,
        image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "estanterias",
        featured: true,
        specifications: {
            "Material": "Madera de pino tratado",
            "Dimensiones": "80cm x 30cm x 180cm",
            "Niveles": "5 estantes ajustables",
            "Acabado": "Tinte nogal",
            "Garantía": "2 años"
        }
    },
    {
        id: 4,
        name: "Cama Matrimonial Elegante",
        description: "Cama de matrimonio con cabecero tallado a mano y estructura robusta.",
        price: 65000,
        image: "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "camas",
        featured: false,
        specifications: {
            "Material": "Madera de cedro",
            "Tamaño": "200cm x 180cm",
            "Altura cabecero": "120cm",
            "Acabado": "Cera natural",
            "Garantía": "10 años"
        }
    },
    {
        id: 5,
        name: "Escritorio de Trabajo",
        description: "Escritorio funcional con cajones y compartimentos para oficina en casa.",
        price: 32000,
        image: "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "escritorios",
        featured: false,
        specifications: {
            "Material": "Madera de fresno",
            "Dimensiones": "120cm x 60cm x 75cm",
            "Cajones": "3 cajones con rieles",
            "Acabado": "Aceite natural",
            "Garantía": "5 años"
        }
    },
    {
        id: 6,
        name: "Aparador Vintage",
        description: "Aparador de estilo vintage con puertas corredizas y compartimentos internos.",
        price: 48000,
        image: "https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "aparadores",
        featured: false,
        specifications: {
            "Material": "Madera de nogal",
            "Dimensiones": "160cm x 45cm x 85cm",
            "Puertas": "4 puertas corredizas",
            "Acabado": "Barniz satinado",
            "Garantía": "7 años"
        }
    },
    {
        id: 7,
        name: "Mesa de Centro Circular",
        description: "Mesa de centro con diseño circular único y base esculpida a mano.",
        price: 22000,
        image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "mesas",
        featured: true,
        specifications: {
            "Material": "Madera de teca",
            "Diámetro": "90cm",
            "Altura": "45cm",
            "Acabado": "Pulido espejo",
            "Garantía": "4 años"
        }
    },
    {
        id: 8,
        name: "Armario Ropero Clásico",
        description: "Armario de 3 puertas con espejo central y múltiples compartimentos internos.",
        price: 78000,
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "armarios",
        featured: false,
        specifications: {
            "Material": "Madera de caoba",
            "Dimensiones": "180cm x 60cm x 220cm",
            "Puertas": "3 puertas con espejo",
            "Acabado": "Laca brillante",
            "Garantía": "15 años"
        }
    }
];

// Simular carga asíncrona de datos
async function loadProducts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 1500); // Simular tiempo de carga de 1.5 segundos
    });
}

// Obtener producto por ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Obtener productos destacados
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Buscar productos
function searchProducts(query) {
    if (!query) return products;
    
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
}

// Formatear precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(price);
}

// Crear HTML de tarjeta de producto
function createProductCard(product) {
    return `
        <a href="producto.html?id=${product.id}" class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <span class="product-price">${formatPrice(product.price)}</span>
            </div>
        </a>
    `;
}

// Renderizar grid de productos
function renderProducts(productsToRender, containerId) {
    const container = document.getElementById(containerId);
    const loadingElement = document.getElementById('loading');
    
    if (!container) return;
    
    // Ocultar carga
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    if (productsToRender.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-medium); grid-column: 1/-1;">No se encontraron productos.</p>';
        return;
    }
    
    container.innerHTML = productsToRender.map(product => createProductCard(product)).join('');
    
    // Agregar animación de aparición
    const productCards = container.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}