/* Modo Oscuro*/

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
});

/* Alertas Modales*/

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('¡Formulario enviado con éxito!');
        });
    }
});

/* Efecto Mouse*/

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.hover-effect');
    elements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f0f0';
        });
        element.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
});

/* Iframe*/

// video
function changeYouTubeVideo(videoId) {
    const iframe = document.getElementById('youtubeIframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
}

// mapa de Google
function changeMapLocation(lat, lng) {
    const iframe = document.getElementById('googleMapIframe');
    iframe.src = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${lat},${lng}`;
}

/* Formulario*/

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            if (email === '' || message === '') {
                event.preventDefault();
                alert('Por favor, complete todos los campos obligatorios.');
            }
        });
    }
});
