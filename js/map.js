import { locationBackgrounds } from './gameState.js';
import { getCurrentLocation, setCurrentLocationKey, getCurrentLocationKey } from './location.js';
import { setupTrade } from './commerce.js';
import { updateUI } from './ui.js';

// Utilisé dans main.js pour ajouter un message
let addLogCallback = () => {};

export function setupMap(addLog) {
    addLogCallback = addLog;
    
    document.getElementById('map-btn').addEventListener('click', () => {
        document.getElementById('map-modal').style.display = 'block';
    });

    document.querySelectorAll('.map-zone').forEach(zone => {
        zone.addEventListener('click', () => {
            const locationKey = zone.dataset.location;
            setCurrentLocationKey(locationKey);
            updateMainBackground(locationKey);
            setupTrade(addLogCallback, getCurrentLocation());
            updateLocationDisplay();
            addLogCallback(`📍 Vous êtes arrivé à : ${locationKey}`);
            document.getElementById('map-modal').style.display = 'none';
        });
    });

    // Fermer la carte en cliquant en dehors
    document.getElementById('map-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('map-modal')) {
            document.getElementById('map-modal').style.display = 'none';
        }
    });

    updateMainBackground(getCurrentLocationKey());
    updateLocationDisplay();
    updateUI();
}

function updateMainBackground(locationKey) {
    const bgPath = locationBackgrounds[locationKey];
    if (bgPath) {
        document.body.style.backgroundImage = `url('${bgPath}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
    }
}

function updateLocationDisplay() {
    const locationName = {
        'fluvial_city': 'Fluvial City',
        'desert_city': 'Désert City',
        'desert': 'Désert',
        'nil_shore': 'Rive du Nil',
        'oasis': 'Oasis',
        'village': 'Village'
    };
    document.getElementById('current-location-name').textContent = locationName[getCurrentLocationKey()];
}

