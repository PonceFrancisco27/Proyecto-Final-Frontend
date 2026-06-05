// fusion.js - Lógica para la página de login/registro

const container = document.getElementById('container');
const signInButton = document.getElementById('signIn');
const signUpButton = document.getElementById('signUp');

// Animación de cambio entre formularios
if (signUpButton && signInButton && container) {
    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
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
});

// Mostrar mensaje tipo toast
function showToast(message, isError = false) {
    // Eliminar toasts existentes
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
    
    if (!email || !password) {
        showToast('❌ Por favor completa todos los campos', true);
        return;
    }
    
    if (!email.includes('@')) {
        showToast('❌ Por favor ingresa un email válido', true);
        return;
    }
    
    const userName = email.split('@')[0];
    
    localStorage.setItem('musicPlayerUser', JSON.stringify({
        email: email,
        name: userName,
        loginTime: new Date().toISOString()
    }));
    
    const successMsg = currentLanguage === 'es' 
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
    
    if (!name || !email || !password) {
        showToast('❌ Por favor completa todos los campos', true);
        return;
    }
    
    if (!email.includes('@')) {
        showToast('❌ Por favor ingresa un email válido', true);
        return;
    }
    
    if (password.length < 6) {
        const msg = currentLanguage === 'es' 
            ? '❌ La contraseña debe tener al menos 6 caracteres'
            : '❌ Password must be at least 6 characters';
        showToast(msg, true);
        return;
    }
    
    localStorage.setItem('musicPlayerUser', JSON.stringify({
        email: email,
        name: name,
        registeredAt: new Date().toISOString()
    }));
    
    const successMsg = currentLanguage === 'es'
        ? `✅ ¡Cuenta creada exitosamente! Bienvenido, ${name}`
        : `✅ Account created successfully! Welcome, ${name}`;
    
    showToast(successMsg);
    
    setTimeout(() => {
        window.location.href = 'player.html';
    }, 1000);
}

window.handleSignIn = handleSignIn;
window.handleSignUp = handleSignUp;