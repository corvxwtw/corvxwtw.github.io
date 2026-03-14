// MADE BY KEYZZILLA DON'T STEAL
window.addEventListener('load', () => {
    setTimeout(() => {
        const overlay = document.getElementById('power-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 1000);
        }
    }, 1200);
});

function nav(id, btn) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
    document.getElementById('view-' + id).classList.add('active');
    if (btn) btn.classList.add('active');
}

const playlist = [
    { name: "4X4", url: "assets/4x4.mp3" },
    { name: "SHAKIRA!", url: "assets/shakira.mp3" },
    { name: "THTTO", url: "assets/thtto.mp3" },
    { name: "SS", url: "assets/ss.mp3" }
];
let idx = 0;
let audio = new Audio(playlist[idx].url);
audio.volume = 0.15;

function togglePlay() {
    const btn = document.getElementById('play-btn');
    if (!btn) return;
    if (audio.paused) {
        audio.play();
        btn.className = "fa-solid fa-pause";
        document.getElementById('track-name').innerText = playlist[idx].name;
    } else {
        audio.pause();
        btn.className = "fa-solid fa-play";
    }
}

function nextTrack() { idx = (idx + 1) % playlist.length; updateTrack(); }
function prevTrack() { idx = (idx - 1 + playlist.length) % playlist.length; updateTrack(); }

function updateTrack() {
    const isPlaying = !audio.paused;
    audio.pause();
    audio.src = playlist[idx].url;
    const trackNameEl = document.getElementById('track-name');
    if (trackNameEl) trackNameEl.innerText = playlist[idx].name;
    if (isPlaying) audio.play();
}

audio.addEventListener('timeupdate', () => {
    const timeValEl = document.getElementById('time-val');
    if (!timeValEl) return;
    const m = Math.floor(audio.currentTime / 60);
    const s = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    timeValEl.innerText = `${m}:${s}`;
});

const volSlider = document.getElementById('vol-slider');
if (volSlider) {
    volSlider.addEventListener('input', (e) => audio.volume = e.target.value);
}

function toggleSettingsPanel() {
    document.getElementById('settingsOverlay').classList.toggle('active');
}

function closeSettings(event) {
    if (event.target.id === 'settingsOverlay') toggleSettingsPanel();
}

function updateSettings() {
    const settings = {
        lightTheme: document.getElementById('themeSwitch').checked,
        bgDesign: document.getElementById('bgDesign').value,
        primaryColor: document.getElementById('primaryColor').value,
        secondaryColor: document.getElementById('secondaryColor').value,
        crtAnimation: document.getElementById('animationSwitch').checked,
        bgEffects: document.getElementById('bgSwitch').checked
    };

    applySettings(settings);
    localStorage.setItem('corvetteSettings', JSON.stringify(settings));
}

function applySettings(settings) {
    const body = document.body;

    if (settings.lightTheme) {
        body.setAttribute('data-theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
    updateThemeIcon(settings.lightTheme ? 'light' : 'dark');

    document.documentElement.style.setProperty('--accent', settings.primaryColor);

    if (settings.crtAnimation) {
        body.classList.remove('no-crt');
    } else {
        body.classList.add('no-crt');
    }

    const vortexBg = document.querySelector('.vortex-bg');
    if (vortexBg) {
        if (!settings.bgEffects) {
            vortexBg.style.display = 'none';
        } else {
            vortexBg.style.display = 'block';
            if (settings.bgDesign === 'vortex') {
                vortexBg.style.background = `radial-gradient(circle at 50% 50%, rgba(var(--vortex-color), 0.05) 0%, transparent 70%), repeating-linear-gradient(0deg, transparent 0, transparent 1px, rgba(var(--vortex-color),0.02) 1px, rgba(var(--vortex-color),0.02) 2px)`;
                vortexBg.style.backgroundSize = '100% 100%, 100% 4px';
            } else if (settings.bgDesign === 'grid') {
                vortexBg.style.background = `repeating-linear-gradient(0deg, transparent 0, transparent 1px, rgba(var(--vortex-color),0.02) 1px, rgba(var(--vortex-color),0.02) 2px)`;
                vortexBg.style.backgroundSize = '100% 4px';
            } else if (settings.bgDesign === 'solid') {
                vortexBg.style.background = 'transparent';
            }
        }
    }
}

function toggleTheme() {
    const themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) {
        themeSwitch.checked = !themeSwitch.checked;
        updateSettings();
    }
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle');
    if (icon) {
        if (theme === 'light') {
            icon.className = 'fa-solid fa-sun theme-toggle';
        } else {
            icon.className = 'fa-solid fa-moon theme-toggle';
        }
    }
}

window.addEventListener('load', () => {
    const saved = localStorage.getItem('corvetteSettings');
    if (saved) {
        const settings = JSON.parse(saved);

        const themeSwitch = document.getElementById('themeSwitch');
        if (themeSwitch) themeSwitch.checked = settings.lightTheme;

        const animationSwitch = document.getElementById('animationSwitch');
        if (animationSwitch) animationSwitch.checked = settings.crtAnimation;

        const bgSwitch = document.getElementById('bgSwitch');
        if (bgSwitch) bgSwitch.checked = settings.bgEffects;

        const bgDesign = document.getElementById('bgDesign');
        if (bgDesign) bgDesign.value = settings.bgDesign;

        const primaryColor = document.getElementById('primaryColor');
        if (primaryColor) primaryColor.value = settings.primaryColor;

        const secondaryColor = document.getElementById('secondaryColor');
        if (secondaryColor) secondaryColor.value = settings.secondaryColor || '#000000';

        applySettings(settings);
    }
});
