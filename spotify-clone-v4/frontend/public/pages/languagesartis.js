// languages.js - Sistema de internacionalización

const translations = {
    es: {
        // Navegación
        back_home: "Volver al inicio",
        
        // Login/Registro General
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
        sign_up_btn: "Crear Cuenta",
        
        // Artista Login específico
        create_artist_account: "Crear Cuenta de Artista",
        artist_benefits: "Distribuye tu música, monetiza y llega a más oyentes",
        benefit_upload: "Subidas ilimitadas",
        benefit_royalties: "70% de regalías",
        benefit_stats: "Estadísticas en tiempo real",
        become_artist: "Convertirse en Artista →",
        artist_note: "Al registrarte, aceptas nuestros Términos para Artistas",
        artist_sign_in_title: "Acceso Artistas",
        artist_note_access: "Acceso exclusivo para artistas registrados en MusicGround",
        artist_welcome_back: "¿Ya eres artista?",
        artist_welcome_desc: "Inicia sesión para acceder a tu panel de control, subir música y ver tus estadísticas.",
        artist_new: "¿Nuevo artista?",
        artist_new_desc: "Únete a MusicGround y comparte tu música con el mundo. Distribuye, monetiza y crece."
    },
    en: {
        // Navigation
        back_home: "Back to home",
        
        // Login/Register General
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
        sign_up_btn: "Sign Up",
        
        // Artist Login specific
        create_artist_account: "Create Artist Account",
        artist_benefits: "Distribute your music, monetize and reach more listeners",
        benefit_upload: "Unlimited uploads",
        benefit_royalties: "70% royalties",
        benefit_stats: "Real-time statistics",
        become_artist: "Become an Artist →",
        artist_note: "By registering, you agree to our Artist Terms",
        artist_sign_in_title: "Artist Access",
        artist_note_access: "Exclusive access for artists registered on MusicGround",
        artist_welcome_back: "Already an artist?",
        artist_welcome_desc: "Sign in to access your dashboard, upload music and view your statistics.",
        artist_new: "New artist?",
        artist_new_desc: "Join MusicGround and share your music with the world. Distribute, monetize and grow."
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