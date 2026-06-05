// artist-dashboard.js - Lógica del Dashboard de Artista

// ========== DATOS DEL ARTISTA ==========
let artistData = {
    name: "",
    email: "",
    totalStreams: 15234,
    totalListeners: 5234,
    totalEarnings: 1842.50,
    memberDays: 245,
    monthlyEarnings: 342.80,
    nextPayout: 342.80,
    songs: [],
    recentActivity: [],
    topSongs: [],
    genreStats: [
        { name: "Pop", percentage: 45 },
        { name: "Reggaeton", percentage: 28 },
        { name: "Rock", percentage: 27 }
    ],
    countryStats: [
        { name: "México", percentage: 35 },
        { name: "España", percentage: 25 },
        { name: "Argentina", percentage: 20 },
        { name: "Colombia", percentage: 12 },
        { name: "Chile", percentage: 8 }
    ],
    weeklyPlays: [234, 412, 523, 678, 745, 892, 1023]
};

// Cargar canciones guardadas
function loadSongs() {
    const savedSongs = localStorage.getItem('artist_songs');
    if (savedSongs) {
        artistData.songs = JSON.parse(savedSongs);
        updateTopSongs();
        updateStats();
    }
}

function saveSongs() {
    localStorage.setItem('artist_songs', JSON.stringify(artistData.songs));
}

function updateTopSongs() {
    artistData.topSongs = artistData.songs
        .sort((a, b) => b.plays - a.plays)
        .slice(0, 5)
        .map(song => ({
            id: song.id,
            title: song.title,
            plays: song.plays,
            earnings: song.earnings
        }));
    
    artistData.totalStreams = artistData.songs.reduce((sum, song) => sum + song.plays, 0);
    artistData.totalEarnings = artistData.songs.reduce((sum, song) => sum + song.earnings, 0);
}

function updateStats() {
    const totalStreamsSpan = document.getElementById('totalStreams');
    const totalEarningsSpan = document.getElementById('totalEarnings');
    const monthlyEarningsSpan = document.getElementById('monthlyEarnings');
    const totalEarningsRoyaltySpan = document.getElementById('totalEarningsRoyalty');
    const nextPayoutSpan = document.getElementById('nextPayout');
    
    if (totalStreamsSpan) totalStreamsSpan.textContent = artistData.totalStreams.toLocaleString();
    if (totalEarningsSpan) totalEarningsSpan.textContent = `$${artistData.totalEarnings.toFixed(2)}`;
    if (monthlyEarningsSpan) monthlyEarningsSpan.textContent = `$${artistData.monthlyEarnings.toFixed(2)}`;
    if (totalEarningsRoyaltySpan) totalEarningsRoyaltySpan.textContent = `$${artistData.totalEarnings.toFixed(2)}`;
    if (nextPayoutSpan) nextPayoutSpan.textContent = `$${artistData.monthlyEarnings.toFixed(2)}`;
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    const savedArtist = localStorage.getItem('musicground_artist');
    if (savedArtist) {
        const artist = JSON.parse(savedArtist);
        artistData.name = artist.name || 'Artista';
        artistData.email = artist.email || 'artista@musicground.com';
    } else {
        artistData.name = 'Artista Demo';
        artistData.email = 'artista@musicground.com';
    }
    
    loadSongs();
    updateUI();
    loadProfileImage();
    renderTopSongs();
    renderRecentActivity();
    renderSongsManagement();
    renderGenreStats();
    renderCountryStats();
    renderWeeklyStats();
});

function updateUI() {
    const nameElements = ['userNameDisplay', 'dropdownUserName', 'profileArtistName', 'welcomeArtistName'];
    nameElements.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = artistData.name;
    });
    
    const emailElements = ['profileArtistEmail', 'dropdownUserEmail'];
    emailElements.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = artistData.email;
    });
    
    const totalListenersSpan = document.getElementById('totalListeners');
    if (totalListenersSpan) totalListenersSpan.textContent = artistData.totalListeners.toLocaleString();
    
    const memberDaysSpan = document.getElementById('memberDays');
    if (memberDaysSpan) memberDaysSpan.textContent = artistData.memberDays;
}

function renderTopSongs() {
    const container = document.getElementById('topSongsTable');
    if (!container) return;
    
    if (artistData.topSongs.length === 0) {
        container.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--text-faint);">Aún no tienes canciones publicadas</div>';
        return;
    }
    
    container.innerHTML = `
        <div class="song-row header">
            <div>#</div>
            <div>Título</div>
            <div>Reproducciones</div>
            <div>Ganancias</div>
            <div></div>
        </div>
        ${artistData.topSongs.map((song, index) => `
            <div class="song-row">
                <div class="song-number">${index + 1}</div>
                <div class="song-title">${song.title}</div>
                <div class="song-plays">${song.plays.toLocaleString()}</div>
                <div class="song-earnings">$${song.earnings.toFixed(2)}</div>
                <div><i class='bx bx-play-circle' onclick="playSong(${song.id})" style="cursor: pointer; color: var(--accent);"></i></div>
            </div>
        `).join('')}
    `;
}

function renderRecentActivity() {
    const container = document.getElementById('recentActivity');
    if (!container) return;
    
    const activities = [
        { action: "Nueva canción", item: "Subiste una nueva canción", time: "Hace 2 días", icon: "bx-music" },
        { action: "Logro", item: "Alcanzaste 1000 reproducciones", time: "Hace 5 días", icon: "bx-trophy" },
        { action: "Pago", item: "Recibiste $124.50 por regalías", time: "Hace 1 semana", icon: "bx-dollar-circle" }
    ];
    
    container.innerHTML = activities.map(activity => `
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

function renderSongsManagement() {
    const container = document.getElementById('songsManagement');
    if (!container) return;
    
    if (artistData.songs.length === 0) {
        container.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--text-faint);">No tienes canciones subidas aún</div>';
        return;
    }
    
    container.innerHTML = artistData.songs.map(song => `
        <div class="song-management-item">
            <div class="song-management-info">
                <div class="song-management-cover"><i class='bx bx-music'></i></div>
                <div class="song-management-details">
                    <h4>${song.title}</h4>
                    <p>${song.genre} • ${song.date}</p>
                </div>
            </div>
            <div class="song-management-stats">
                <span>${song.plays.toLocaleString()} reproducciones</span>
                <span>$${song.earnings.toFixed(2)}</span>
            </div>
            <div class="song-management-actions">
                <button class="edit-song" onclick="editSong(${song.id})"><i class='bx bx-edit-alt'></i></button>
                <button class="delete-song" onclick="deleteSong(${song.id})"><i class='bx bx-trash'></i></button>
            </div>
        </div>
    `).join('');
}

function renderGenreStats() {
    const container = document.getElementById('genreStats');
    if (!container) return;
    
    container.innerHTML = artistData.genreStats.map(genre => `
        <div class="genre-bar">
            <span>${genre.name}</span>
            <div class="bar"><div class="fill" style="width: ${genre.percentage}%"></div></div>
            <span>${genre.percentage}%</span>
        </div>
    `).join('');
}

function renderCountryStats() {
    const container = document.getElementById('countryStats');
    if (!container) return;
    
    container.innerHTML = artistData.countryStats.map(country => `
        <div class="country-bar">
            <span>${country.name}</span>
            <div class="bar"><div class="fill" style="width: ${country.percentage}%"></div></div>
            <span>${country.percentage}%</span>
        </div>
    `).join('');
}

function renderWeeklyStats() {
    const container = document.getElementById('weeklyStats');
    if (!container) return;
    
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const maxValue = Math.max(...artistData.weeklyPlays);
    
    container.innerHTML = days.map((day, index) => {
        const height = (artistData.weeklyPlays[index] / maxValue) * 100;
        return `
            <div class="weekly-day">
                <span class="day">${day}</span>
                <div class="bar-container">
                    <div class="bar-fill" style="height: ${height}%;"></div>
                </div>
                <span class="value">${artistData.weeklyPlays[index]}</span>
            </div>
        `;
    }).join('');
}

// ========== SUBIR MÚSICA ==========
let selectedAudioFile = null;
let selectedCoverFile = null;

document.getElementById('audioFile').addEventListener('change', function(e) {
    selectedAudioFile = e.target.files[0];
    if (selectedAudioFile) {
        const uploadInfo = document.getElementById('uploadInfo');
        const uploadFileName = document.getElementById('uploadFileName');
        const uploadFileSize = document.getElementById('uploadFileSize');
        
        uploadFileName.textContent = selectedAudioFile.name;
        uploadFileSize.textContent = `${(selectedAudioFile.size / (1024 * 1024)).toFixed(2)} MB`;
        uploadInfo.style.display = 'block';
        document.getElementById('uploadStatus').textContent = 'Archivo seleccionado';
        document.getElementById('uploadStatus').style.color = 'var(--accent)';
    }
});

document.getElementById('coverImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const coverPreview = document.getElementById('coverPreview');
            coverPreview.innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
        };
        reader.readAsDataURL(file);
        selectedCoverFile = file;
    }
});

function uploadSong() {
    const title = document.getElementById('songTitle').value;
    const genre = document.getElementById('songGenre').value;
    const language = document.getElementById('songLanguage').value;
    const description = document.getElementById('songDescription').value;
    
    if (!selectedAudioFile) {
        alert('❌ Por favor selecciona un archivo de audio');
        return;
    }
    
    if (!title) {
        alert('❌ Por favor ingresa el título de la canción');
        return;
    }
    
    const statusSpan = document.getElementById('uploadStatus');
    statusSpan.textContent = 'Subiendo...';
    statusSpan.style.color = '#ffb800';
    
    setTimeout(() => {
        const newSong = {
            id: Date.now(),
            title: title,
            genre: genre,
            language: language,
            description: description,
            plays: Math.floor(Math.random() * 500),
            earnings: Math.random() * 50,
            date: new Date().toLocaleDateString(),
            cover: selectedCoverFile ? URL.createObjectURL(selectedCoverFile) : null
        };
        
        artistData.songs.unshift(newSong);
        saveSongs();
        updateTopSongs();
        updateStats();
        renderTopSongs();
        renderSongsManagement();
        
        statusSpan.textContent = '¡Publicado!';
        statusSpan.style.color = 'var(--accent)';
        
        setTimeout(() => {
            document.getElementById('uploadInfo').style.display = 'none';
            document.getElementById('songTitle').value = '';
            document.getElementById('songDescription').value = '';
            document.getElementById('coverPreview').innerHTML = '<i class="bx bx-image-add"></i><span>Seleccionar imagen</span>';
            selectedAudioFile = null;
            selectedCoverFile = null;
            document.getElementById('audioFile').value = '';
            document.getElementById('coverImage').value = '';
            statusSpan.textContent = 'Procesando...';
            
            alert('✅ Canción publicada exitosamente');
        }, 1500);
    }, 1500);
}

function editSong(songId) {
    const song = artistData.songs.find(s => s.id === songId);
    if (song) {
        const newTitle = prompt('Editar título:', song.title);
        if (newTitle && newTitle.trim()) {
            song.title = newTitle.trim();
            saveSongs();
            renderSongsManagement();
            renderTopSongs();
            alert('✅ Canción actualizada');
        }
    }
}

function deleteSong(songId) {
    if (confirm('¿Eliminar esta canción? Esta acción no se puede deshacer')) {
        artistData.songs = artistData.songs.filter(s => s.id !== songId);
        saveSongs();
        updateTopSongs();
        updateStats();
        renderSongsManagement();
        renderTopSongs();
        alert('✅ Canción eliminada');
    }
}

function requestWithdraw() {
    const amount = document.getElementById('withdrawAmount').value;
    const method = document.getElementById('paymentMethod').value;
    
    if (!amount || amount <= 0) {
        alert('❌ Ingresa un monto válido');
        return;
    }
    
    if (parseFloat(amount) > artistData.totalEarnings) {
        alert('❌ El monto solicitado excede tus ganancias disponibles');
        return;
    }
    
    alert(`✅ Solicitud de retiro de $${amount} enviada a ${method === 'paypal' ? 'PayPal' : 'transferencia bancaria'}. El pago se procesará en 3-5 días hábiles.`);
    document.getElementById('withdrawAmount').value = '';
}

function playSong(songId) {
    console.log(`Reproduciendo canción ID: ${songId}`);
}

// ========== FOTO DE PERFIL ==========
let currentProfileImage = null;

function loadProfileImage() {
    const savedImage = localStorage.getItem('artistProfileImage');
    const profileImg = document.querySelector('#profileAvatar img');
    const defaultIcon = document.querySelector('#profileAvatar i');
    
    if (savedImage && savedImage !== '') {
        currentProfileImage = savedImage;
        if (profileImg) {
            profileImg.src = savedImage;
            profileImg.style.display = 'block';
        }
        if (defaultIcon) {
            defaultIcon.style.display = 'none';
        }
    } else {
        if (profileImg) {
            profileImg.src = '';
            profileImg.style.display = 'none';
        }
        if (defaultIcon) {
            defaultIcon.style.display = 'flex';
        }
    }
    
    const dropdownAvatar = document.querySelector('.dropdown-avatar');
    if (dropdownAvatar) {
        if (savedImage && savedImage !== '') {
            dropdownAvatar.innerHTML = `<img src="${savedImage}" alt="Avatar">`;
        } else {
            dropdownAvatar.innerHTML = `<i class='bx bx-user-circle'></i>`;
        }
    }
}

function triggerFileUpload() {
    document.getElementById('profileImageInput').click();
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image/jpeg') && !file.type.match('image/png') && !file.type.match('image/jpg')) {
        alert('❌ Formato no soportado. Usa JPG o PNG');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        currentProfileImage = imageData;
        localStorage.setItem('artistProfileImage', imageData);
        
        const profileImg = document.querySelector('#profileAvatar img');
        const defaultIcon = document.querySelector('#profileAvatar i');
        
        if (profileImg && defaultIcon) {
            profileImg.src = imageData;
            profileImg.style.display = 'block';
            defaultIcon.style.display = 'none';
        }
        
        const dropdownAvatar = document.querySelector('.dropdown-avatar');
        if (dropdownAvatar) {
            dropdownAvatar.innerHTML = `<img src="${imageData}" alt="Avatar">`;
        }
        
        alert('✅ Foto de perfil actualizada');
    };
    reader.readAsDataURL(file);
}

function removeProfilePhoto() {
    if (confirm('¿Eliminar foto de perfil?')) {
        currentProfileImage = null;
        localStorage.removeItem('artistProfileImage');
        
        const profileImg = document.querySelector('#profileAvatar img');
        const defaultIcon = document.querySelector('#profileAvatar i');
        
        if (profileImg && defaultIcon) {
            profileImg.src = '';
            profileImg.style.display = 'none';
            defaultIcon.style.display = 'flex';
        }
        
        const dropdownAvatar = document.querySelector('.dropdown-avatar');
        if (dropdownAvatar) {
            dropdownAvatar.innerHTML = `<i class='bx bx-user-circle'></i>`;
        }
        
        alert('✅ Foto de perfil eliminada');
    }
}

document.getElementById('profileImageInput').addEventListener('change', handleImageUpload);

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
        localStorage.removeItem('musicground_artist');
        window.location.href = 'home.html';
    }
}

// Exponer funciones globales
window.toggleDropdown = toggleDropdown;
window.uploadSong = uploadSong;
window.editSong = editSong;
window.deleteSong = deleteSong;
window.requestWithdraw = requestWithdraw;
window.playSong = playSong;
window.triggerFileUpload = triggerFileUpload;
window.removeProfilePhoto = removeProfilePhoto;
window.handleLogout = handleLogout;