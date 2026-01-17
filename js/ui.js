import { porterage, gameState} from './gameState.js';
import { calculateAssignment,
    scouts, 
    guards, 
    waterGatherers, 
    foodHarvesters, 
    strollers, 
    carriers } from './assignments.js'; 

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

    if(document.getElementById('role-scouts')) {
        document.getElementById('role-scouts').textContent = scouts;
        document.getElementById('role-guards').textContent = guards;
        document.getElementById('role-water').textContent = waterGatherers;
        document.getElementById('role-food').textContent = foodHarvesters;
        document.getElementById('role-strollers').textContent = strollers;
        document.getElementById('role-carriers').textContent = carriers;

        // Calcul des inoccupés
        const totalAssigned = calculateAssignment() + carriers; // Si calculateAssignment inclut carriers, retire "+ carriers"
        const idle = Math.max(0, gameState.crew - totalAssigned);
        document.getElementById('role-idle').textContent = idle;
        document.getElementById('idle-count').textContent = idle; // Met à jour aussi la modale Portage
    }
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
        <h3 style="margin-top: 0;"> Confirmation</h3>
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

export function showAlertPopup(message, onClose) {
    // 1. Nettoyage : Si une popup existe déjà, on l'enlève
    const old = document.getElementById('alert-popup-overlay');
    if (old) old.remove();

    // 2. Création de l'Overlay (Fond noir transparent)
    const overlay = document.createElement('div');
    overlay.id = 'alert-popup-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '10000'; // Un peu plus haut que le reste pour être sûr

    // 3. Création de la Boîte (Contenu blanc)
    const box = document.createElement('div');
    box.style.backgroundColor = '#fff';
    box.style.padding = '24px';
    box.style.borderRadius = '12px';
    box.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    box.style.textAlign = 'center';
    box.style.maxWidth = '400px';
    box.style.width = '90%';
    
    // 4. Le contenu HTML (Titre, Message, Bouton OK)
    // J'ai utilisé une couleur bleue pour le OK pour le différencier du Rouge (Danger) de la confirmation
    // Mais tu peux remettre #c0392b (rouge) si tu préfères.
    box.innerHTML = `
        <h3 style="margin-top: 0;">Information</h3>
        <p style="margin: 15px 0;">${message}</p>
        <div style="margin-top: 20px;">
            <button id="alert-ok" style="
                padding: 8px 24px;
                background-color: #2980b9; 
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
            ">OK</button>
        </div>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // 5. Gestion de la fermeture
    function closePopup() {
        overlay.remove();
        if (typeof onClose === 'function') onClose();
    }

    // Clic sur le bouton OK
    document.getElementById('alert-ok').addEventListener('click', closePopup);

    // Clic en dehors de la boîte (sur l'overlay noir)
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closePopup();
        }
    });
}


// peut etre le mettre autre part chepa 
export function addLog(message) {
    const log = document.getElementById('log-messages');
    const p = document.createElement('p');
    p.textContent = message;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
}


///////////////////////////////////////////////////////////////////////

// Initialisation des boutons d'ouverture de modale
    ['log', 'map', 'assign', 'trade', 'resources', 'porterage',"roles"].forEach(id => {
        document.getElementById(`${id}-btn`).addEventListener('click', () => {
            document.getElementById(`${id}-modal`).style.display = 'block';
        });
    });

