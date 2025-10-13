import { backgroundMusic, gameState, place, locationBackgrounds, porterage } from './gameState.js';
import { assignmentSetup,resetAssignments, carriers,refreshCaravanProperties, calculateNeededPorterage, calculateCurrentPorterage , setCarriers} from './assignments.js';
import { setupTrade } from './commerce.js';
import { getCurrentLocation, setCurrentLocationKey, getCurrentLocationKey, setupLocationModal } from './location.js';
import { updateUI, showConfirmationPopup} from './ui.js';
import { setupMap } from './map.js';
import { verifLose, handleResources } from './gameLogic.js';

//import { checkLegionariesEncounter, checkBanditsEncounter, fightLegionaries, fightBandits, attemptBribe } from './fight.js';

console.log("Script loaded");
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM chargé");

    // Initialisation des boutons d'ouverture de modale
    ['log', 'map', 'assign', 'trade', 'resources', 'porterage'].forEach(id => {
        document.getElementById(`${id}-btn`).addEventListener('click', () => {
            document.getElementById(`${id}-modal`).style.display = 'block';
        });
    });

    /////////////////////// musique  ////////////////////////////////////////////////////////////////////////////////////////
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    backgroundMusic.play();
    const musicVolumeSlider = document.getElementById('music-volume');
    const soundBtn = document.getElementById("sound-toggle-btn");
    const soundIcon = document.getElementById("sound-icon");
    let soundOn = true;


    // Règles du jeu
    const rulesBtn = document.getElementById('rules-btn');
    const rulesModal = document.getElementById('rules-modal');
    const closeBtn = rulesModal.querySelector('.close-btn');
    
    
    // chepa
    window.addEventListener('click', (event) => {
        if (event.target === rulesModal) {
            console.log("chepa 1")
            rulesModal.style.display = 'none';
        }
    });

    // fermer une modale 
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                console.log("chepa 2")
                modal.style.display = 'none';
            });
        });
    });

    // chepa
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            console.log("chepa 3")
            e.target.style.display = 'none';
        }
    });

    // Résoudre le tour
    document.getElementById('resolve-btn').addEventListener('click', () => {
        // 1. Réinitialisation
        resetAssignments();
        setCarriers(0); 
        
        // 2. Calcul initial
        refreshCaravanProperties();
        
        // 3. Appliquer les effets de base
        gameState.morale = Math.max(0, gameState.morale - 5);
        
        // 4. Effets des porteurs
        if (carriers > 0) {
            gameState.morale = Math.max(0, gameState.morale - carriers);
        }
        
        // 5. Gestion des ressources
        const { waterShortage, famine, waterDeaths, famineDeaths } = handleResources();
        
        // 6. Journalisation (messages originaux conservés)
        addLog(`⚡ Début du tour - Moral: ${gameState.morale}%`);
        if (carriers > 0) {
            addLog(`🚶 ${carriers} porteurs assignés (-${carriers}% moral)`);
        }
        if (waterShortage) {
            addLog(`❌ Manque d'eau - ${waterDeaths} personnes mortes de soif !`);
        }
        if (famine) {
            addLog(`🍽️ Famine - ${famineDeaths} personnes mortes de faim et moral en baisse !`);
        }
        
        // 7. Alertes visuelles (pop-ups) pour les événements graves
        if (waterShortage && waterDeaths > 0) {
            showAlertPopup(`💧 Sécheresse ! ${waterDeaths} personnes sont mortes de soif.`);
        }
        if (famine && famineDeaths > 0) {
            showAlertPopup(`🍽️ Famine ! ${famineDeaths} personnes sont mortes de faim.`);
        }
        
        // 8. Mise à jour finale
        calculateNeededPorterage(); /////////❌ pb icu !!!!!
        calculateCurrentPorterage();
        //calculateNeededResources
        refreshCaravanProperties();
        updateUI();
        
        // 9. Vérifier défaite
        if (verifLose()) {
            window.location.href = 'gameOver.html';
            return;
        }
        
        addLog(`✓ Fin du tour - Équipage: ${gameState.crew} Moral: ${gameState.morale}%`);
    });

    ///////////////////// FONCTIONNALITÉS DU MENU RÉGLAGES /////////////////////////////////////////////////////////////////////////////

    // Règles ////////////////////////////////////////////////////////////////////

    // Modale des règles s'ouvre au click sur le bouton
    rulesBtn.addEventListener('click', () => {
        rulesModal.style.display = 'block';
    });
    
    // Fermeture de la fenêtre
    closeBtn.addEventListener('click', () => {
        rulesModal.style.display = 'none';
    });
    

    // Musique ////////////////////////////////////////////////////////////////////

    // La fenêtre de paramètres apparait au click sur le bouton
    document.getElementById('settings-btn').addEventListener('click', () => {
        document.getElementById('settings-modal').style.display = 'block';
    });

    // Fermeture de la fenêtre de paramètres
    document.querySelector('#settings-modal .close-btn').addEventListener('click', () => {
        document.getElementById('settings-modal').style.display = 'none';
    });

    // Musique en pause quand on clique sur le bouton
    soundBtn.addEventListener("click", () => {
        soundOn = !soundOn;
        soundIcon.src = soundOn ? "assets/images/ui/button/sound_on.png" : "assets/images/ui/button/sound_off.png";
        soundIcon.alt = soundOn ? "Son On" : "Son Off";
        soundOn ? backgroundMusic.play() : backgroundMusic.pause();
    }); 

    // Modification du volume de la musique
    musicVolumeSlider.addEventListener('input', () => {
        backgroundMusic.volume = musicVolumeSlider.value / 100;
    });


    // Réinitialisation des réglages //////////////////////////////////////////////
    document.getElementById('reset-settings-btn').addEventListener('click', () => {
        // Réinitialiser volume
        musicVolumeSlider.value = 50;
        backgroundMusic.volume = 0.5;

        // Réactiver le son si désactivé
        if (!soundOn) {
            soundOn = true;
            soundIcon.src = "assets/images/ui/button/sound_on.png";
            soundIcon.alt = "Son On";
            backgroundMusic.play();
        }

    });

    // Reinitialisation de l'interface utilisateur ///////////////////////////////////
    document.getElementById('restart-btn').addEventListener('click', () => {
        showConfirmationPopup(
            "Voulez-vous vraiment recommencer la partie ? Toute votre progression actuelle sera perdue.",
            () => {
                location.reload(); // Ou redirige vers la page d'accueil / reset du jeu
            },
            () => {
                console.log("Annulé par l'utilisateur.");
            }
        );
    });
 
    // Bouton "Règles" dans les réglages ///////////////////////////////////////////
    document.getElementById('rules-btn').addEventListener('click', () => {
        document.getElementById('settings-modal').style.display = 'none';
        document.getElementById('rules-modal').style.display = 'block';
    });
    

    // ?????? à quoi ça sert
    assignmentSetup(addLog);
    setupTrade(addLog, getCurrentLocation());
    setupLocationModal();
    updateUI();
    // Clics sur la carte
    setupMap(addLog);


    // Pop up qui apparait 
    function showAlertPopup(message) {
        const popup = document.createElement('div');
        popup.className = 'alert-popup';
        popup.innerHTML = `
            <div class="alert-content">
                <p>${message}</p>
                <button class="close-alert">OK</button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        popup.querySelector('.close-alert').addEventListener('click', () => {
            popup.remove();
        });
    }


    // peut etre le mettre autre part chepa 
    function addLog(message) {
        const log = document.getElementById('log-messages');
        const p = document.createElement('p');
        p.textContent = message;
        log.appendChild(p);
        log.scrollTop = log.scrollHeight;
    }

    // Chepa
    function setupModalPosition(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.right = '35%';
        modal.style.left = 'auto';
        modal.style.width = '55%';
        modal.style.top = '100px';
    }

    ['map', 'assign', 'trade', 'resources', 'porterage'].forEach(setupModalPosition);

});

