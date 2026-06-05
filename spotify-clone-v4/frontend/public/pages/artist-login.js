// artist-login.js - Lógica para el login de artistas

const container = document.getElementById('container');
const signInButton = document.getElementById('signIn');
const signUpButton = document.getElementById('signUp');

// Variables para controlar la animación
let isAnimating = false;

// Configurar formularios con animación de cambio
if (signUpButton && signInButton && container) {
    signUpButton.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        container.classList.add('right-panel-active');
        
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    });

    signInButton.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        container.classList.remove('right-panel-active');
        
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    });
}

// Inicializar tema e idioma
document.addEventListener('DOMContentLoaded', function() {
    if (typeof initTheme === 'function') {
        initTheme();
    }
    
    if (typeof initLanguage === 'function') {
        initLanguage();
    }
    
    // Asegurar que el contenedor no tenga clase incorrecta al inicio
    if (container) {
        container.classList.remove('right-panel-active');
    }
    
    // Verificar si ya hay sesión de artista activa
    const savedArtist = localStorage.getItem('musicground_artist');
    if (savedArtist) {
        // Si ya hay sesión, redirigir al dashboard
        window.location.href = 'artistadashboard.html';
    }
});

// Obtener idioma actual para mensajes
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'es';
}

// Mostrar mensaje tipo toast
function showToast(message, isError = false) {
    const existingToasts = document.querySelectorAll('.toast-message');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<i class='bx ${isError ? 'bx-error-circle' : 'bx-check-circle'}'></i><span>${message}</span>`;
    
    const bgColor = isError ? '#ff4444' : 'var(--accent)';
    const textColor = isError ? 'white' : 'var(--bg-deep)';
    
    toast.style.cssText = `
        background: ${bgColor};
        color: ${textColor};
        padding: 12px 24px;
        border-radius: 40px;
        font-weight: 600;
        font-size: 14px;
        font-family: var(--font-body);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Redirigir a la página de planes para artistas
function goToArtistPro() {
    window.location.href = 'artistpro.html';
}

// Inicio de sesión para artistas - REDIRIGE AL DASHBOARD
function handleArtistSignIn() {
    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value;
    const currentLang = getCurrentLanguage();
    
    // Validar que los campos no estén vacíos
    if (!email || !password) {
        const msg = currentLang === 'es' ? '❌ Por favor completa todos los campos' : '❌ Please complete all fields';
        showToast(msg, true);
        return;
    }
    
    // Validar formato de email
    if (!email.includes('@')) {
        const msg = currentLang === 'es' ? '❌ Por favor ingresa un email válido' : '❌ Please enter a valid email';
        showToast(msg, true);
        return;
    }
    
    // Validar contraseña mínima
    if (password.length < 6) {
        const msg = currentLang === 'es' ? '❌ La contraseña debe tener al menos 6 caracteres' : '❌ Password must be at least 6 characters';
        showToast(msg, true);
        return;
    }
    
    // Obtener nombre del artista desde el email
    const artistName = email.split('@')[0];
    
    // Verificar si ya existe un artista registrado
    let savedArtist = localStorage.getItem('musicground_artist');
    
    if (savedArtist) {
        const artist = JSON.parse(savedArtist);
        if (artist.email === email) {
            // Actualizar última conexión
            artist.lastLogin = new Date().toISOString();
            localStorage.setItem('musicground_artist', JSON.stringify(artist));
            
            const successMsg = currentLang === 'es' 
                ? `✅ ¡Bienvenido de vuelta, ${artist.name || artistName}!` 
                : `✅ Welcome back, ${artist.name || artistName}!`;
            
            showToast(successMsg);
            
            // Redirigir al dashboard después de 1 segundo
            setTimeout(() => {
                window.location.href = 'artistadashboard.html';
            }, 1000);
            return;
        }
    }
    
    // Si no existe, crear un nuevo artista automáticamente
    const newArtist = {
        name: artistName,
        email: email,
        password: password,
        registeredAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        genre: 'No especificado',
        country: 'No especificado',
        bio: ''
    };
    
    localStorage.setItem('musicground_artist', JSON.stringify(newArtist));
    
    const successMsg = currentLang === 'es'
        ? `✅ ¡Cuenta creada exitosamente! Bienvenido, ${artistName}`
        : `✅ Account created successfully! Welcome, ${artistName}`;
    
    showToast(successMsg);
    
    // Redirigir al dashboard después de 1 segundo
    setTimeout(() => {
        window.location.href = 'artistadashboard.html';
    }, 1000);
}

// Exponer funciones globalmente
window.handleArtistSignIn = handleArtistSignIn;
window.goToArtistPro = goToArtistPro;