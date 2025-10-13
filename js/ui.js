import { porterage, gameState} from './gameState.js';
import { calculateAssignment } from './assignments.js'; 

export function updateUI() {
    updateStat('crew', gameState.crew);
    updateStat('morale', `${gameState.morale}%`);
    updateStat('debens', gameState.debens);
    updateStat('water', gameState.water);
    updateStat('authority', gameState.authority);

    document.getElementById('weapons').textContent = gameState.resources.weapons;
    document.getElementById('camels').textContent = gameState.resources.camels;
    document.getElementById('rations').textContent = gameState.resources.rations;
    document.getElementById('papyrus').textContent = gameState.resources.papyrus;
    document.getElementById('horses').textContent = gameState.resources.horses;

    document.getElementById('current-porterage').textContent = porterage.current;
    document.getElementById('needed-porterage').textContent = porterage.needed;
    document.getElementById('idle-count').textContent = gameState.crew - calculateAssignment();
}

function updateStat(elementId, value) {
    const element = document.getElementById(elementId);
    const img = element.querySelector('img');
    if (img) {
        // Garde l'image et met juste à jour la valeur
        const textNode = [...element.childNodes].find(node => node.nodeType === Node.TEXT_NODE);
        if (textNode) {
            textNode.textContent = ` ${value}`;
        } else {
            element.appendChild(document.createTextNode(` ${value}`));
        }
    } else {
        element.textContent = value;
    }
}



// Gère l'affichage et les interactions DOM
class UI {
    static updateStats(data) {
        document.getElementById('crew').innerHTML = `Troupe: <span>${data.crew}</span>`;
        document.getElementById('morale').innerHTML = `Moral: <span>${data.morale}%</span>`;
        // ... (mettre à jour toutes les stats)
    }

    static showModal(content) {
        const modal = document.getElementById('trade-modal');
        document.getElementById('trade-items').innerHTML = content;
        modal.style.display = 'block';
    }

    static addLogMessage(message) {
        const log = document.getElementById('log-messages');
        log.innerHTML += `<p>${message}</p>`;
        log.scrollTop = log.scrollHeight; // Auto-scroll
    }
}

// Exemple d'utilisation :
// UI.addLogMessage("Votre caravane a trouvé une oasis !");




export function showConfirmationPopup(message, onConfirm, onCancel) {
    const old = document.getElementById('confirmation-popup-overlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 'confirmation-popup-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';

    const box = document.createElement('div');
    box.style.backgroundColor = '#fff';
    box.style.padding = '24px';
    box.style.borderRadius = '12px';
    box.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    box.style.textAlign = 'center';
    box.style.maxWidth = '400px';
    box.style.width = '90%';
    box.innerHTML = `
        <h3 style="margin-top: 0;">❓ Confirmation</h3>
        <p style="margin: 15px 0;">${message}</p>
        <div style="margin-top: 20px;">
            <button id="popup-yes" style="
                margin-right: 10px;
                padding: 8px 16px;
                background-color: #c0392b;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            ">Oui</button>
            <button id="popup-no" style="
                padding: 8px 16px;
                background-color: #7f8c8d;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            ">Non</button>
        </div>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    document.getElementById('popup-yes').addEventListener('click', () => {
        overlay.remove();
        if (typeof onConfirm === 'function') onConfirm();
    });

    document.getElementById('popup-no').addEventListener('click', () => {
        overlay.remove();
        if (typeof onCancel === 'function') onCancel();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
            if (typeof onCancel === 'function') onCancel();
        }
    });
}

///////////////////////////////////////////////////////////////////////

// Initialisation des boutons d'ouverture de modale
    ['log', 'map', 'assign', 'trade', 'resources', 'porterage'].forEach(id => {
        document.getElementById(`${id}-btn`).addEventListener('click', () => {
            document.getElementById(`${id}-modal`).style.display = 'block';
        });
    });

