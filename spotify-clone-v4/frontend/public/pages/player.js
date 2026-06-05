// player.js - Lógica del reproductor musical (sin toasts ni ripple)

// ========== DATOS DE EJEMPLO ==========
const songs = [
    { id: 1, title: "Blinding Lights", artist: "The Weeknd", duration: "3:20", cover: "bx-music" },
    { id: 2, title: "Flowers", artist: "Miley Cyrus", duration: "3:20", cover: "bx-music" },
    { id: 3, title: "Cruel Summer", artist: "Taylor Swift", duration: "2:58", cover: "bx-music" },
    { id: 4, title: "What Was I Made For", artist: "Billie Eilish", duration: "3:42", cover: "bx-music" },
    { id: 5, title: "Vampire", artist: "Olivia Rodrigo", duration: "3:39", cover: "bx-music" },
    { id: 6, title: "Paint The Town Red", artist: "Doja Cat", duration: "3:50", cover: "bx-music" },
    { id: 7, title: "Sicko Mode", artist: "Travis Scott", duration: "5:12", cover: "bx-music" },
    { id: 8, title: "God's Plan", artist: "Drake", duration: "3:18", cover: "bx-music" },
];

const playlists = [
    { id: 1, name: "Éxitos Globales", songs: [songs[0], songs[1], songs[2]] },
    { id: 2, name: "Indie Vibes", songs: [songs[3], songs[4]] },
    { id: 3, name: "Hip Hop Hits", songs: [songs[5], songs[6], songs[7]] },
];

const featuredPlaylists = [
    { id: 1, name: "Top 50 Global", description: "Los éxitos más escuchados", icon: "bx-trending-up" },
    { id: 2, name: "Novedades Viernes", description: "Los lanzamientos de la semana", icon: "bx-calendar" },
    { id: 3, name: "Éxitos Latinos", description: "Lo mejor del pop latino", icon: "bx-music" },
    { id: 4, name: "Chill Out", description: "Música para relajarse", icon: "bx-sun" },
];

const artists = [
    { id: 1, name: "The Weeknd", monthlyListeners: "45M" },
    { id: 2, name: "Taylor Swift", monthlyListeners: "38M" },
    { id: 3, name: "Bad Bunny", monthlyListeners: "52M" },
    { id: 4, name: "Drake", monthlyListeners: "41M" },
];

// ========== VARIABLES GLOBALES ==========
let currentSongIndex = 0;
let queue = [...songs];
let isPlaying = false;
let currentVolume = 0.7;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let userPlaylists = JSON.parse(localStorage.getItem('userPlaylists')) || [];
let progressInterval = null;

// ========== ELEMENTOS DEL DOM ==========
const userNameDisplay = document.getElementById('userNameDisplay');
const dropdownUserName = document.getElementById('dropdownUserName');
const dropdownUserEmail = document.getElementById('dropdownUserEmail');
const bottomCurrentTitle = document.getElementById('bottomCurrentTitle');
const bottomCurrentArtist = document.getElementById('bottomCurrentArtist');
const bottomFavoriteBtn = document.getElementById('bottomFavoriteBtn');
const playPauseIcon = document.getElementById('playPauseIcon');
const progressFill = document.getElementById('progressFill');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');
const volumeFill = document.getElementById('volumeFill');
const volumeIcon = document.getElementById('volumeIcon');
const queuePanel = document.getElementById('queuePanel');
const searchInput = document.getElementById('searchInput');
const recentGrid = document.getElementById('recentGrid');
const featuredGrid = document.getElementById('featuredGrid');
const artistsGrid = document.getElementById('artistsGrid');
const playlistsList = document.getElementById('playlists-list');

// ========== DROPDOWN MENU ==========
function toggleDropdown() {
    const menu = document.getElementById('dropdownMenu');
    if (menu) menu.classList.toggle('active');
}

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('userDropdown');
    const menu = document.getElementById('dropdownMenu');
    if (dropdown && menu && !dropdown.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    const savedUser = localStorage.getItem('musicground_artist') || localStorage.getItem('musicPlayerUser');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        const userName = user.name || user.email?.split('@')[0] || 'Usuario';
        if (userNameDisplay) userNameDisplay.textContent = userName;
        if (dropdownUserName) dropdownUserName.textContent = userName;
        if (dropdownUserEmail) dropdownUserEmail.textContent = user.email || 'usuario@musicground.com';
    } else {
        if (userNameDisplay) userNameDisplay.textContent = 'Invitado';
        if (dropdownUserName) dropdownUserName.textContent = 'Invitado';
    }
    
    renderRecentSongs();
    renderFeaturedPlaylists();
    renderArtists();
    renderPlaylistsList();
    updateFavoriteIcon();
    loadSong(0);
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Animación de entrada para las tarjetas
    document.querySelectorAll('.recent-card, .featured-card, .artist-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
});

// ========== FUNCIONES DE RENDERIZADO ==========
function renderRecentSongs() {
    if (!recentGrid) return;
    recentGrid.innerHTML = songs.slice(0, 6).map(song => `
        <div class="recent-card" onclick="playSongById(${song.id})">
            <div class="recent-icon"><i class='bx bx-music'></i></div>
            <div class="recent-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
        </div>
    `).join('');
}

function renderFeaturedPlaylists() {
    if (!featuredGrid) return;
    featuredGrid.innerHTML = featuredPlaylists.map(playlist => `
        <div class="featured-card" onclick="loadPlaylist(${playlist.id})">
            <div class="card-image"><i class='bx ${playlist.icon}'></i></div>
            <h4>${playlist.name}</h4>
            <p>${playlist.description}</p>
        </div>
    `).join('');
}

function renderArtists() {
    if (!artistsGrid) return;
    artistsGrid.innerHTML = artists.map(artist => `
        <div class="artist-card" onclick="searchArtist('${artist.name}')">
            <div class="card-image"><i class='bx bx-user'></i></div>
            <h4>${artist.name}</h4>
            <p>${artist.monthlyListeners} oyentes</p>
        </div>
    `).join('');
}

function renderPlaylistsList() {
    if (!playlistsList) return;
    const allPlaylists = [...playlists, ...userPlaylists];
    playlistsList.innerHTML = allPlaylists.map(playlist => `
        <div class="playlist-item" onclick="loadPlaylist(${playlist.id})">${playlist.name}</div>
    `).join('');
}

// ========== FUNCIONES DE REPRODUCCIÓN ==========
function loadSong(index) {
    if (index < 0) index = 0;
    if (index >= queue.length) index = 0;
    
    currentSongIndex = index;
    const song = queue[currentSongIndex];
    
    if (bottomCurrentTitle) bottomCurrentTitle.textContent = song.title;
    if (bottomCurrentArtist) bottomCurrentArtist.textContent = song.artist;
    
    updateFavoriteIcon();
    
    const durationParts = song.duration.split(':');
    const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
    if (durationSpan) durationSpan.textContent = song.duration;
    if (currentTimeSpan) currentTimeSpan.textContent = '0:00';
    if (progressFill) progressFill.style.width = '0%';
    
    if (isPlaying) {
        if (progressInterval) clearInterval(progressInterval);
        playAudio();
    }
}

function playAudio() {
    isPlaying = true;
    if (playPauseIcon) playPauseIcon.className = 'bx bx-pause-circle';
    
    let progress = 0;
    const song = queue[currentSongIndex];
    const durationParts = song.duration.split(':');
    const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
    
    if (progressInterval) clearInterval(progressInterval);
    
    progressInterval = setInterval(() => {
        if (isPlaying) {
            progress += 1;
            const percent = (progress / totalSeconds) * 100;
            if (progressFill) progressFill.style.width = `${Math.min(percent, 100)}%`;
            if (currentTimeSpan) {
                const mins = Math.floor(progress / 60);
                const secs = progress % 60;
                currentTimeSpan.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
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
        if (playPauseIcon) playPauseIcon.className = 'bx bx-play-circle';
        if (progressInterval) clearInterval(progressInterval);
    } else {
        playAudio();
    }
}

function playNext() {
    if (currentSongIndex + 1 < queue.length) {
        loadSong(currentSongIndex + 1);
    } else {
        loadSong(0);
    }
}

function playPrevious() {
    if (currentSongIndex - 1 >= 0) {
        loadSong(currentSongIndex - 1);
    } else {
        loadSong(queue.length - 1);
    }
}

function playSongById(id) {
    const index = queue.findIndex(s => s.id === id);
    if (index !== -1) loadSong(index);
}

function seek(event) {
    const bar = event.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    if (progressFill) progressFill.style.width = `${percent * 100}%`;
}

function setVolume(event) {
    const bar = event.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    currentVolume = percent;
    if (volumeFill) volumeFill.style.width = `${currentVolume * 100}%`;
    updateVolumeIcon();
}

function toggleMute() {
    if (currentVolume > 0) {
        currentVolume = 0;
        if (volumeFill) volumeFill.style.width = '0%';
    } else {
        currentVolume = 0.7;
        if (volumeFill) volumeFill.style.width = '70%';
    }
    updateVolumeIcon();
}

function updateVolumeIcon() {
    if (!volumeIcon) return;
    if (currentVolume === 0) volumeIcon.className = 'bx bx-volume-mute';
    else if (currentVolume < 0.5) volumeIcon.className = 'bx bx-volume-low';
    else volumeIcon.className = 'bx bx-volume-full';
}

// ========== FAVORITOS (SIN TOAST) ==========
function toggleFavorite() {
    const currentSong = queue[currentSongIndex];
    const index = favorites.findIndex(f => f.id === currentSong.id);
    
    if (index === -1) {
        favorites.push(currentSong);
    } else {
        favorites.splice(index, 1);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteIcon();
}

function updateFavoriteIcon() {
    const currentSong = queue[currentSongIndex];
    const isFavorite = favorites.some(f => f.id === currentSong.id);
    const favColor = isFavorite ? 'var(--accent)' : 'var(--text-muted)';
    if (bottomFavoriteBtn) bottomFavoriteBtn.style.color = favColor;
}

// ========== COLA DE REPRODUCCIÓN ==========
function toggleQueue() {
    if (!queuePanel) return;
    queuePanel.classList.toggle('active');
    renderQueue();
}

function renderQueue() {
    const queueListEl = document.getElementById('queueList');
    if (!queueListEl) return;
    queueListEl.innerHTML = queue.map((song, index) => `
        <div class="queue-item ${index === currentSongIndex ? 'active' : ''}" onclick="playSongById(${song.id})">
            <div class="queue-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
            <div class="queue-duration">${song.duration}</div>
        </div>
    `).join('');
}

// ========== PLAYLISTS ==========
function loadPlaylist(playlistId) {
    const allPlaylists = [...playlists, ...userPlaylists];
    const playlist = allPlaylists.find(p => p.id === playlistId);
    if (playlist && playlist.songs) {
        queue = [...playlist.songs];
        currentSongIndex = 0;
        loadSong(0);
        renderQueue();
    }
}

function crearPlaylist() {
    const name = prompt('Nombre de la nueva playlist:');
    if (!name) return;
    
    const newPlaylist = {
        id: Date.now(),
        name: name,
        songs: []
    };
    userPlaylists.push(newPlaylist);
    localStorage.setItem('userPlaylists', JSON.stringify(userPlaylists));
    renderPlaylistsList();
}

// ========== BÚSQUEDA ==========
function handleSearch() {
    const term = searchInput.value.toLowerCase();
    if (!term) {
        renderRecentSongs();
        return;
    }
    
    const filtered = songs.filter(song => 
        song.title.toLowerCase().includes(term) || 
        song.artist.toLowerCase().includes(term)
    );
    
    if (recentGrid) {
        recentGrid.innerHTML = filtered.map(song => `
            <div class="recent-card" onclick="playSongById(${song.id})">
                <div class="recent-icon"><i class='bx bx-music'></i></div>
                <div class="recent-info">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
            </div>
        `).join('');
    }
}

function searchArtist(artistName) {
    if (searchInput) {
        searchInput.value = artistName;
        handleSearch();
    }
}

// ========== NAVEGACIÓN ==========
function navigateTo(section) {
    console.log(`Navegando a: ${section}`);
    // Actualizar clase activa en el sidebar
    document.querySelectorAll('.sidebar li').forEach(li => {
        li.classList.remove('active');
    });
}

function handleLogout() {
    if (confirm('¿Cerrar sesión?')) {
        localStorage.removeItem('musicground_artist');
        localStorage.removeItem('musicPlayerUser');
        window.location.href = 'home.html';
    }
}

// ========== EXPOSICIÓN GLOBAL ==========
window.playSongById = playSongById;
window.togglePlay = togglePlay;
window.playNext = playNext;
window.playPrevious = playPrevious;
window.seek = seek;
window.setVolume = setVolume;
window.toggleMute = toggleMute;
window.toggleFavorite = toggleFavorite;
window.toggleQueue = toggleQueue;
window.toggleDropdown = toggleDropdown;
window.loadPlaylist = loadPlaylist;
window.crearPlaylist = crearPlaylist;
window.searchArtist = searchArtist;
window.navigateTo = navigateTo;
window.handleLogout = handleLogout;