// user-dashboard.js - Lógica del Dashboard de Usuario

// ========== DATOS ==========
const songs = [
    { id: 1, title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
    { id: 2, title: "Flowers", artist: "Miley Cyrus", duration: "3:20" },
    { id: 3, title: "Cruel Summer", artist: "Taylor Swift", duration: "2:58" },
    { id: 4, title: "What Was I Made For", artist: "Billie Eilish", duration: "3:42" },
    { id: 5, title: "Vampire", artist: "Olivia Rodrigo", duration: "3:39" },
];

let currentSongIndex = 0;
let isPlaying = false;
let progressInterval = null;
let currentQueue = [...songs];

// ========== ELEMENTOS DEL DOM ==========
const miniSongTitle = document.getElementById('miniSongTitle');
const miniSongArtist = document.getElementById('miniSongArtist');
const miniPlayIcon = document.getElementById('miniPlayIcon');
const miniProgressFill = document.getElementById('miniProgressFill');
const miniCurrentTime = document.getElementById('miniCurrentTime');
const miniDuration = document.getElementById('miniDuration');

// ========== FUNCIONES DE REPRODUCCIÓN MANUAL ==========
function loadSong(index) {
    if (index < 0) index = 0;
    if (index >= currentQueue.length) index = 0;
    
    currentSongIndex = index;
    const song = currentQueue[currentSongIndex];
    
    if (miniSongTitle) miniSongTitle.textContent = song.title;
    if (miniSongArtist) miniSongArtist.textContent = song.artist;
    if (miniDuration) miniDuration.textContent = song.duration;
    if (miniCurrentTime) miniCurrentTime.textContent = "0:00";
    if (miniProgressFill) miniProgressFill.style.width = "0%";
    
    if (isPlaying) {
        if (progressInterval) clearInterval(progressInterval);
        playAudio();
    }
}

function playAudio() {
    isPlaying = true;
    if (miniPlayIcon) miniPlayIcon.className = 'bx bx-pause-circle';
    
    let progress = 0;
    const song = currentQueue[currentSongIndex];
    const durationParts = song.duration.split(':');
    const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
    
    if (progressInterval) clearInterval(progressInterval);
    
    progressInterval = setInterval(() => {
        if (isPlaying) {
            progress += 1;
            const percent = (progress / totalSeconds) * 100;
            if (miniProgressFill) miniProgressFill.style.width = `${Math.min(percent, 100)}%`;
            if (miniCurrentTime) {
                const mins = Math.floor(progress / 60);
                const secs = progress % 60;
                miniCurrentTime.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
            }
            if (progress >= totalSeconds) {
                playNext();
            }
        }
    }, 1000);
}

function togglePlay() {
    if (isPlaying) {
        isPlaying = false;
        if (miniPlayIcon) miniPlayIcon.className = 'bx bx-play-circle';
        if (progressInterval) clearInterval(progressInterval);
    } else {
        playAudio();
    }
}

function playNext() {
    if (currentSongIndex + 1 < currentQueue.length) {
        loadSong(currentSongIndex + 1);
    } else {
        loadSong(0);
    }
}

function playPrevious() {
    if (currentSongIndex - 1 >= 0) {
        loadSong(currentSongIndex - 1);
    } else {
        loadSong(currentQueue.length - 1);
    }
}

function playSongById(id) {
    const index = currentQueue.findIndex(s => s.id === id);
    if (index !== -1) loadSong(index);
}

function seek(event) {
    const bar = event.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    if (miniProgressFill) miniProgressFill.style.width = `${percent * 100}%`;
}

// ========== DATOS DE USUARIO ==========
let userData = {
    name: "",
    email: "",
    totalPlays: 1247,
    totalFavorites: 4,
    totalMinutes: 4156,
    memberDays: 365,
    recentActivity: [
        { action: "Escuchaste", item: "Blinding Lights - The Weeknd", time: "Hace 5 minutos", icon: "bx-play-circle" },
        { action: "Añadiste a favoritos", item: "Flowers - Miley Cyrus", time: "Hace 2 horas", icon: "bx-heart" },
        { action: "Creaste playlist", item: "Mis favoritas", time: "Ayer", icon: "bx-list-ul" },
    ],
    topArtists: [
        { name: "The Weeknd", plays: 234, avatar: "bx-user" },
        { name: "Taylor Swift", plays: 189, avatar: "bx-user" },
        { name: "Bad Bunny", plays: 156, avatar: "bx-user" },
    ],
    favorites: songs.slice(0, 4),
    playlists: [
        { id: 1, name: "Mis favoritas", songCount: 12, icon: "bx-heart" },
        { id: 2, name: "Para entrenar", songCount: 8, icon: "bx-run" },
        { id: 3, name: "Música relajante", songCount: 15, icon: "bx-sun" },
    ],
    history: songs.map((song, index) => ({ ...song, playedAt: new Date(Date.now() - index * 86400000).toISOString() }))
};

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    const savedUser = localStorage.getItem('musicground_user');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        userData.name = user.name || 'Usuario';
        userData.email = user.email || 'usuario@musicground.com';
    } else {
        userData.name = 'Usuario Demo';
        userData.email = 'demo@musicground.com';
    }
    
    // Cargar favoritos guardados
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        userData.favorites = JSON.parse(savedFavorites);
        userData.totalFavorites = userData.favorites.length;
        currentQueue = [...userData.favorites];
    }
    
    updateUI();
    loadProfileImage();
    loadSong(0);
    
    // Configurar evento de carga de imagen
    const fileInput = document.getElementById('profileImageInput');
    if (fileInput) fileInput.addEventListener('change', handleImageUpload);
});

function updateUI() {
    // Actualizar nombres
    const elements = ['userNameDisplay', 'dropdownUserName', 'profileUserName', 'welcomeUserName'];
    elements.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = userData.name;
    });
    
    const userEmailEl = document.getElementById('profileUserEmail');
    if (userEmailEl) userEmailEl.textContent = userData.email;
    
    const dropdownEmailEl = document.getElementById('dropdownUserEmail');
    if (dropdownEmailEl) dropdownEmailEl.textContent = userData.email;
    
    // Actualizar stats
    const totalPlaysSpan = document.getElementById('totalPlays');
    if (totalPlaysSpan) totalPlaysSpan.textContent = userData.totalPlays;
    
    const totalFavoritesSpan = document.getElementById('totalFavorites');
    if (totalFavoritesSpan) totalFavoritesSpan.textContent = userData.totalFavorites;
    
    const totalMinutesSpan = document.getElementById('totalMinutes');
    if (totalMinutesSpan) totalMinutesSpan.textContent = userData.totalMinutes;
    
    const memberDaysSpan = document.getElementById('memberDays');
    if (memberDaysSpan) memberDaysSpan.textContent = userData.memberDays;
    
    // Renderizar secciones
    renderRecentActivity();
    renderTopArtists();
    renderFavorites();
    renderPlaylists();
    renderHistory();
    renderGenreStats();
    renderWeeklyStats();
}

function renderRecentActivity() {
    const container = document.getElementById('recentActivity');
    if (!container) return;
    
    container.innerHTML = userData.recentActivity.map(activity => `
        <div class="activity-item">
            <div class="activity-icon"><i class='bx ${activity.icon}'></i></div>
            <div class="activity-info">
                <strong>${activity.action}</strong>
                <span>${activity.item}</span>
            </div>
            <div class="activity-time">${activity.time}</div>
        </div>
    `).join('');
}

function renderTopArtists() {
    const container = document.getElementById('topArtists');
    if (!container) return;
    
    container.innerHTML = userData.topArtists.map(artist => `
        <div class="artist-item" onclick="playArtistSongs('${artist.name}')">
            <div class="artist-avatar"><i class='bx ${artist.avatar}'></i></div>
            <div class="artist-info">
                <h4>${artist.name}</h4>
                <p>${artist.plays} reproducciones</p>
            </div>
        </div>
    `).join('');
}

function renderFavorites() {
    const container = document.getElementById('favoritesGrid');
    if (!container) return;
    
    if (userData.favorites.length === 0) {
        container.innerHTML = '<p style="color: var(--text-faint); text-align: center;">No tienes canciones favoritas aún</p>';
        return;
    }
    
    container.innerHTML = userData.favorites.map(song => `
        <div class="favorite-card" onclick="playSongById(${song.id})">
            <div class="favorite-cover"><i class='bx bx-music'></i></div>
            <div class="favorite-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
        </div>
    `).join('');
}

function renderPlaylists() {
    const container = document.getElementById('playlistsGrid');
    if (!container) return;
    
    container.innerHTML = userData.playlists.map(playlist => `
        <div class="playlist-card" onclick="openPlaylist(${playlist.id})">
            <div class="playlist-cover"><i class='bx ${playlist.icon}'></i></div>
            <div class="playlist-info">
                <h4>${playlist.name}</h4>
                <p>${playlist.songCount} canciones</p>
            </div>
        </div>
    `).join('');
}

function renderHistory() {
    const container = document.getElementById('historyList');
    if (!container) return;
    
    container.innerHTML = userData.history.map(item => `
        <div class="history-item" onclick="playSongById(${item.id})">
            <div class="history-cover"><i class='bx bx-music'></i></div>
            <div class="history-info">
                <h4>${item.title}</h4>
                <p>${item.artist}</p>
            </div>
            <div class="history-date">${formatDate(item.playedAt)}</div>
        </div>
    `).join('');
}

function renderGenreStats() {
    const container = document.getElementById('genreStats');
    if (!container) return;
    
    const genres = [
        { name: "Pop", percentage: 35 },
        { name: "Rock", percentage: 25 },
        { name: "Hip Hop", percentage: 20 },
        { name: "Electrónica", percentage: 12 },
        { name: "Alternativo", percentage: 8 }
    ];
    
    container.innerHTML = genres.map(genre => `
        <div class="genre-bar">
            <span>${genre.name}</span>
            <div class="bar"><div class="fill" style="width: ${genre.percentage}%"></div></div>
            <span>${genre.percentage}%</span>
        </div>
    `).join('');
}

function renderWeeklyStats() {
    const container = document.getElementById('weeklyStats');
    if (!container) return;
    
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const activity = [45, 62, 78, 85, 92, 120, 145];
    const maxValue = Math.max(...activity);
    
    container.innerHTML = days.map((day, index) => {
        const height = (activity[index] / maxValue) * 100;
        return `
            <div class="weekly-day">
                <span class="day">${day}</span>
                <div class="bar-container">
                    <div class="bar-fill" style="height: ${height}%;"></div>
                </div>
                <span class="value">${activity[index]}</span>
            </div>
        `;
    }).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days < 7) return `Hace ${days} días`;
    return date.toLocaleDateString('es-ES');
}

function playArtistSongs(artistName) {
    const filteredSongs = songs.filter(s => s.artist === artistName);
    if (filteredSongs.length > 0) {
        currentQueue = filteredSongs;
        loadSong(0);
    }
}

function openPlaylist(playlistId) {
    console.log(`Abriendo playlist ID: ${playlistId}`);
}

// ========== FOTO DE PERFIL ==========
let currentProfileImage = null;

function loadProfileImage() {
    const savedImage = localStorage.getItem('userProfileImage');
    if (savedImage) {
        currentProfileImage = savedImage;
        
        const profileAvatarImg = document.querySelector('#profileAvatar img');
        const profileDefaultIcon = document.querySelector('#profileAvatar i');
        if (profileAvatarImg && profileDefaultIcon) {
            profileAvatarImg.src = savedImage;
            profileAvatarImg.style.display = 'block';
            profileDefaultIcon.style.display = 'none';
        }
        
        const dropdownAvatar = document.querySelector('.dropdown-avatar');
        if (dropdownAvatar) {
            dropdownAvatar.innerHTML = `<img src="${savedImage}" alt="Avatar">`;
        }
    }
}

function triggerFileUpload() {
    const fileInput = document.getElementById('profileImageInput');
    if (fileInput) fileInput.click();
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image/jpeg') && !file.type.match('image/png') && !file.type.match('image/jpg')) {
        alert('❌ Por favor selecciona una imagen en formato JPG o PNG');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
        alert('❌ La imagen no puede superar los 5MB');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        currentProfileImage = imageData;
        localStorage.setItem('userProfileImage', imageData);
        
        const profileAvatarImg = document.querySelector('#profileAvatar img');
        const profileDefaultIcon = document.querySelector('#profileAvatar i');
        if (profileAvatarImg && profileDefaultIcon) {
            profileAvatarImg.src = imageData;
            profileAvatarImg.style.display = 'block';
            profileDefaultIcon.style.display = 'none';
        }
        
        const dropdownAvatar = document.querySelector('.dropdown-avatar');
        if (dropdownAvatar) {
            dropdownAvatar.innerHTML = `<img src="${imageData}" alt="Avatar">`;
        }
        
        alert('✅ Foto de perfil actualizada correctamente');
    };
    reader.readAsDataURL(file);
}

// ========== NAVEGACIÓN ==========
function toggleDropdown() {
    const menu = document.getElementById('dropdownMenu');
    if (menu) menu.classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('userDropdown');
    const menu = document.getElementById('dropdownMenu');
    if (dropdown && menu && !dropdown.contains(event.target)) {
        menu.classList.remove('active');
    }
});

document.querySelectorAll('.sidebar-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.sidebar-menu a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        const sectionId = this.getAttribute('data-section');
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    });
});

function handleLogout() {
    if (confirm('¿Cerrar sesión?')) {
        localStorage.removeItem('musicground_user');
        localStorage.removeItem('favorites');
        window.location.href = 'home.html';
    }
}

// Exponer funciones globales
window.toggleDropdown = toggleDropdown;
window.togglePlay = togglePlay;
window.playNext = playNext;
window.playPrevious = playPrevious;
window.playSongById = playSongById;
window.seek = seek;
window.playArtistSongs = playArtistSongs;
window.openPlaylist = openPlaylist;
window.triggerFileUpload = triggerFileUpload;
window.handleLogout = handleLogout;