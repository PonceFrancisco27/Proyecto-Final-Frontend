// languages.js - Sistema de internacionalización

const translations = {
    es: {
        // Navegación
        back_home: "Volver al inicio",
        
        // Login/Registro
        create_account: "Crear Cuenta",
        or_use_email: "O usa un email asociado para registrar",
        name: "Nombre",
        email: "Email",
        password: "Contraseña",
        sign_up: "Registrarse",
        sign_in_title: "Iniciar Sesión",
        or_use_account: "O usa tu cuenta asociada",
        sign_in: "Ingresar",
        forgot_password: "¿Olvidaste la clave?",
        welcome_back: "¿Ya tienes cuenta?",
        welcome_back_desc: "Inicia sesión para acceder a tu biblioteca musical y playlists personalizadas.",
        hello_artist: "¿Nuevo en MusicGround?",
        hello_artist_desc: "Únete a nuestra comunidad y descubre millones de canciones sin límites.",
        sign_in_btn: "Iniciar Sesión",
        sign_up_btn: "Crear Cuenta"
    },
    en: {
        // Navigation
        back_home: "Back to home",
        
        // Login/Register
        create_account: "Create Account",
        or_use_email: "Or use email to register",
        name: "Name",
        email: "Email",
        password: "Password",
        sign_up: "Sign Up",
        sign_in_title: "Sign In",
        or_use_account: "Or use your associated account",
        sign_in: "Sign In",
        forgot_password: "Forgot password?",
        welcome_back: "Welcome Back!",
        welcome_back_desc: "Sign in to access your music library and personalized playlists.",
        hello_artist: "New to MusicGround?",
        hello_artist_desc: "Join our community and discover millions of songs without limits.",
        sign_in_btn: "Sign In",
        sign_up_btn: "Sign Up"
    }
};

let currentLanguage = localStorage.getItem('language') || 'es';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateTexts();
    updatePlaceholders();
}

function updateTexts() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

function updatePlaceholders() {
    const elements = document.querySelectorAll('[data-i18n-placeholder]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
}



function initLanguage() {
    updateTexts();
    updatePlaceholders();
}

// Exponer funciones globalmente
window.setLanguage = setLanguage;
window.updateTexts = updateTexts;
window.updatePlaceholders = updatePlaceholders;

document.addEventListener('DOMContentLoaded', initLanguage);