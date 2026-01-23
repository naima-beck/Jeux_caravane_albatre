import { backgroundMusic, gameState, place, porterage } from './gameState.js';
import { assignmentSetup,resetAssignments, carriers,refreshCaravanProperties, calculateNeededPorterage, calculateCurrentPorterage , setCarriers} from './assignments.js';
import { setupTrade } from './commerce.js';
import { getCurrentLocation, setCurrentLocationKey, getCurrentLocationKey, setupLocationModal } from './location.js';
import { updateUI, showConfirmationPopup,showAlertPopup, addLog} from './ui.js';
import { setupMap } from './map.js';
import { verifLose, handleResources } from './gameLogic.js';

import { checkLegionariesEncounter, checkBanditsEncounter, fightLegionaries, fightBandits, attemptBribe } from './fight.js';

console.log("Script loaded");
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM chargé");

    // Initialisation des boutons d'ouverture de modale
    ['log', 'map', 'assign', 'trade', 'resources', 'porterage', 'roles'].forEach(id => {
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
        console.log("Début du tour...");

        // 1. Mise à jour initiale (au cas où)
        refreshCaravanProperties();
        
        // 2. Baisse du moral de base
        gameState.morale = Math.max(0, gameState.morale - 5);
        if (carriers > 0) {
            gameState.morale = Math.max(0, gameState.morale - carriers);
        }
        
        // 3. Gestion des ressources (C'est là que les gens meurent !)
        // handleResources renvoie maintenant le vrai nombre de morts
        const { waterShortage, famine, waterDeaths, famineDeaths } = handleResources();
        
        // --- CRUCIAL : MISE À JOUR APRÈS LES MORTS ---
        // Si des gens sont morts, on doit "nettoyer" les rôles (gardes, etc.)
        // pour ne pas que des morts participent aux combats.
        if (waterDeaths > 0 || famineDeaths > 0) {
            refreshCaravanProperties(); // Cela appelle sanitizeAssignments()
        }
        // ---------------------------------------------

        // 4. Logs et Alertes
        addLog(`⚡ Début du tour - Moral: ${gameState.morale}%`);
        if (carriers > 0) addLog(`${carriers} porteurs assignés (-${carriers}% moral)`);
        
        if (waterShortage) {
            addLog(`Manque d'eau - ${waterDeaths} morts !`);
            if(waterDeaths > 0) showAlertPopup(`Sécheresse ! ${waterDeaths} personnes sont mortes de soif.`);
        }
        
        if (famine) {
            addLog(`Famine - ${famineDeaths} morts !`);
            if(famineDeaths > 0) showAlertPopup(`Famine ! ${famineDeaths} personnes sont mortes de faim.`);
        }

        // 5. COMBATS
        const currentLocKey = getCurrentLocationKey();

        // Légionnaires
        if(checkLegionariesEncounter(currentLocKey)) {
            const bribed = attemptBribe();
            if(!bribed){
                fightLegionaries(); 
            }
        }
            
        // Bandits
        if(checkBanditsEncounter(currentLocKey, )) {
            fightBandits();
        }

        
        // 8. Mise à jour finale
        calculateNeededPorterage(); ///////// pb ici !!!!!
        calculateCurrentPorterage();
        //calculateNeededResources
        refreshCaravanProperties();
        
        // 9. Vérifier défaite
        if (verifLose()) {
            window.location.href = 'gameOver.html';
            return;
        }
        
        addLog(`✓ Fin du tour - Équipage: ${gameState.crew} Moral: ${gameState.morale}%`);

        resetAssignments(); 
        updateUI();
        setCarriers(0);
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
    assignmentSetup();
    setupTrade(getCurrentLocation());
    setupLocationModal();
    updateUI();
    // Clics sur la carte
    setupMap();


    

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

