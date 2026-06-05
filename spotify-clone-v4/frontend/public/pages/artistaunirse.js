// artist-login.js - Animaciones y lógica para el login de artistas

// Animación de entrada de los formularios
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de aparición escalonada para los inputs
    const inputs = document.querySelectorAll('form input');
    inputs.forEach((input, index) => {
        input.style.opacity = '0';
        input.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            input.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            input.style.opacity = '1';
            input.style.transform = 'translateX(0)';
        }, index * 50);
    });
    
    // Efecto de enfoque en los inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement?.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement?.classList.remove('focused');
        });
    });
    
    // Animación del botón de submit
    const submitBtns = document.querySelectorAll('.artist-submit-btn');
    submitBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Efecto ripple en los botones
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

document.querySelectorAll('.artist-submit-btn, .ghost').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Agregar estilos para el efecto ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .artist-submit-btn, .ghost {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Función para alternar tema (si no existe en theme.js)
window.toggleTheme = window.toggleTheme || function() {
    const body = document.body;
    const isDark = body.classList.contains('light-theme');
    if (isDark) {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
};

// Función para cambiar idioma (si no existe en languages.js)
window.setLanguage = window.setLanguage || function(lang) {
    localStorage.setItem('language', lang);
    console.log('Idioma cambiado a:', lang);
};