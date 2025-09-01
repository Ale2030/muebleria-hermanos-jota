const formulario = document.getElementById('contactForm');
const mensajeExito = document.getElementById('successMessage');

// Validación del formulario
function validarFormulario(nombre, email, mensaje) {
    if (nombre.trim().length < 2) {
        return 'Poné un nombre más largo';
    }
    if (!email.includes('@') || !email.includes('.')) {
        return 'Ese mail no parece válido';
    }
    if (mensaje.trim().length < 10) {
        return 'Escribí un mensaje un poco más largo';
    }
    return '';
}

// Mensaje de exito
function mostrarMensajeExito(nombre) {
    mensajeExito.querySelector('h3').textContent = `¡Gracias ${nombre}!`;
    mensajeExito.querySelector('p').textContent = 'Te vamos a responder pronto';
    
    mensajeExito.classList.remove('hidden');
    formulario.style.display = 'none';
}

// Envío del formulario
function enviarFormulario(evento) {
    evento.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    
    const error = validarFormulario(nombre, email, mensaje);
    if (error) {
        alert(error);
        return;
    }

    mostrarMensajeExito(nombre);

    console.log('Se envió el form!', { nombre, email, mensaje });
}

formulario.addEventListener('submit', enviarFormulario);

// Responsive 
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

