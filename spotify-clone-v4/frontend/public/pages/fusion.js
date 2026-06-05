// fusion.js - Lógica para la página de login/registro

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
        
        // Restablecer después de la animación
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    });

    signInButton.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        container.classList.remove('right-panel-active');
        
        // Restablecer después de la animación
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
    container.classList.remove('right-panel-active');
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

function handleSignIn() {
    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value;
    const currentLang = getCurrentLanguage();
    
    if (!email || !password) {
        const msg = currentLang === 'es' ? '❌ Por favor completa todos los campos' : '❌ Please complete all fields';
        showToast(msg, true);
        return;
    }
    
    if (!email.includes('@')) {
        const msg = currentLang === 'es' ? '❌ Por favor ingresa un email válido' : '❌ Please enter a valid email';
        showToast(msg, true);
        return;
    }
    
    const userName = email.split('@')[0];
    
    localStorage.setItem('musicPlayerUser', JSON.stringify({
        email: email,
        name: userName,
        loginTime: new Date().toISOString(),
        role: 'user'
    }));
    
    const successMsg = currentLang === 'es' 
        ? `✅ ¡Bienvenido de vuelta, ${userName}!` 
        : `✅ Welcome back, ${userName}!`;
    
    showToast(successMsg);
    
    setTimeout(() => {
        window.location.href = 'player.html';
    }, 1000);
}

function handleSignUp() {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const currentLang = getCurrentLanguage();
    
    if (!name || !email || !password) {
        const msg = currentLang === 'es' ? '❌ Por favor completa todos los campos' : '❌ Please complete all fields';
        showToast(msg, true);
        return;
    }
    
    if (!email.includes('@')) {
        const msg = currentLang === 'es' ? '❌ Por favor ingresa un email válido' : '❌ Please enter a valid email';
        showToast(msg, true);
        return;
    }
    
    if (password.length < 6) {
        const msg = currentLang === 'es' 
            ? '❌ La contraseña debe tener al menos 6 caracteres'
            : '❌ Password must be at least 6 characters';
        showToast(msg, true);
        return;
    }
    
    localStorage.setItem('musicPlayerUser', JSON.stringify({
        email: email,
        name: name,
        registeredAt: new Date().toISOString(),
        role: 'user'
    }));
    
    const successMsg = currentLang === 'es'
        ? `✅ ¡Cuenta creada exitosamente! Bienvenido, ${name}`
        : `✅ Account created successfully! Welcome, ${name}`;
    
    showToast(successMsg);
    
    setTimeout(() => {
        window.location.href = 'player.html';
    }, 1000);
}

window.handleSignIn = handleSignIn;
window.handleSignUp = handleSignUp;