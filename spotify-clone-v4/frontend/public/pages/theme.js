// theme.js - Sistema de temas claro/oscuro

let currentTheme = localStorage.getItem('theme') || 'dark';

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme();
    
    // Actualizar textos del idioma actual después de cambiar tema
    if (typeof updateTexts === 'function') {
        updateTexts();
        updatePlaceholders();
    }
}

function applyTheme() {
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        // Modo claro: morado suave como acento
        document.documentElement.style.setProperty('--accent', '#b0a0e0');
        document.documentElement.style.setProperty('--accent-dim', 'rgba(176, 160, 224, 0.15)');
        document.documentElement.style.setProperty('--accent-glow', 'rgba(176, 160, 224, 0.3)');
        document.documentElement.style.setProperty('--bg-deep', '#f5f7fc');
        document.documentElement.style.setProperty('--bg-base', '#ffffff');
        document.documentElement.style.setProperty('--bg-panel', '#f0f2f5');
        document.documentElement.style.setProperty('--bg-card', 'rgba(0, 0, 0, 0.03)');
        document.documentElement.style.setProperty('--bg-card-hover', 'rgba(0, 0, 0, 0.06)');
        document.documentElement.style.setProperty('--text', '#1a1a2e');
        document.documentElement.style.setProperty('--text-muted', 'rgba(0, 0, 0, 0.6)');
        document.documentElement.style.setProperty('--text-faint', 'rgba(0, 0, 0, 0.4)');
        document.documentElement.style.setProperty('--border', 'rgba(0, 0, 0, 0.08)');
        document.documentElement.style.setProperty('--border-accent', 'rgba(176, 160, 224, 0.25)');
        
        // Cambiar icono del tema
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) themeIcon.className = 'bx bx-sun';
    } else {
        document.body.classList.remove('light-theme');
        // Modo oscuro: verde neón como acento
        document.documentElement.style.setProperty('--accent', '#00ff4c');
        document.documentElement.style.setProperty('--accent-dim', 'rgba(0, 255, 76, 0.15)');
        document.documentElement.style.setProperty('--accent-glow', 'rgba(0, 255, 76, 0.4)');
        document.documentElement.style.setProperty('--bg-deep', '#060610');
        document.documentElement.style.setProperty('--bg-base', '#0a0a1a');
        document.documentElement.style.setProperty('--bg-panel', '#0f0f22');
        document.documentElement.style.setProperty('--bg-card', 'rgba(255, 255, 255, 0.04)');
        document.documentElement.style.setProperty('--bg-card-hover', 'rgba(255, 255, 255, 0.08)');
        document.documentElement.style.setProperty('--text', '#e8e8f0');
        document.documentElement.style.setProperty('--text-muted', 'rgba(255, 255, 255, 0.55)');
        document.documentElement.style.setProperty('--text-faint', 'rgba(255, 255, 255, 0.3)');
        document.documentElement.style.setProperty('--border', 'rgba(255, 255, 255, 0.08)');
        document.documentElement.style.setProperty('--border-accent', 'rgba(0, 255, 76, 0.25)');
        
        // Cambiar icono del tema
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) themeIcon.className = 'bx bx-moon';
    }
}

function initTheme() {
    applyTheme();
}

document.addEventListener('DOMContentLoaded', initTheme);