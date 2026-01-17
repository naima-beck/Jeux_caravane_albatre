import { place,porterage} from './gameState.js';
import { getCurrentLocation, setCurrentLocationKey, getCurrentLocationKey, formatName} from './location.js';
import { setupTrade } from './commerce.js';
import { updateUI,addLog,showAlertPopup} from './ui.js';


export function setupMap() {
    
    document.getElementById('map-btn').addEventListener('click', () => {
        document.getElementById('map-modal').style.display = 'block';
    });

    document.querySelectorAll('.map-zone').forEach(zone => {
        zone.addEventListener('click', () => {
            // --- VERIFICATION DU PORTAGE (AJOUT) ---
            if (porterage.current < porterage.needed) {
                // Si la capacité actuelle est inférieure au poids porté
                showAlertPopup(
                `<b>Déplacement impossible !</b><br><br>Votre chargement est trop lourd.<br>Capacité : ${porterage.current}<br>Poids : ${porterage.needed}<br><br>Assignez plus de porteurs/chameaux ou vendez des objets.`
                );
                return; // <--- STOP ! On arrête la fonction ici, donc pas de déplacement.
            }
            // ---------------------------------------
            const locationKey = zone.dataset.location;
            setCurrentLocationKey(locationKey);
            updateMainBackground(locationKey);
            setupTrade(getCurrentLocation());
            updateLocationDisplay(locationKey);
            addLog(`Vous êtes arrivé à : ${formatName(locationKey)}`);
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
    updateLocationDisplay(getCurrentLocationKey());
    updateUI();
}

function updateMainBackground(locationKey) {
    const bgPath = place[locationKey].background;
    if (bgPath) {
        document.body.style.backgroundImage = `url('${bgPath}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
    }
}

function updateLocationDisplay(key) {
    const el = document.getElementById('current-location-name');
    if(el) el.textContent = formatName(key);
}

