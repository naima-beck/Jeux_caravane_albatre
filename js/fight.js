import { gameState, place } from './gameState.js';
import { getGuards, setGuards } from './assignments.js';
import { updateUI,addLog, showAlertPopup} from './ui.js';

// Variables de combat
export let fightLegionariesVar = false;
export let fightBanditsVar = false;
let nbLegionaries = 0;
let nbBandits = 0;

/* Détermine la rencontre avec des légionnaires */
export function checkLegionariesEncounter(currentLocationKey) {
    if (currentLocationKey === 'nil_shore') {
        const probabilityLegionariesHalting = 0.33;
        if (Math.random() < probabilityLegionariesHalting) {
            fightLegionariesVar = true;
            nbLegionaries = 0; // Reset
            return true;
        }
    } 
    return false;
}

/* Détermine la rencontre avec des bandits */
export function checkBanditsEncounter(currentLocationKey) {
    if (currentLocationKey === 'oasis') {
        const probabilityBanditsHalting = 0.5;
        if (Math.random() < probabilityBanditsHalting) {
            fightBanditsVar = true;
            nbBandits = 0; // Reset
            return true;
        }
    }
    return false;
}

/* Gère l'aléatoire pour le nombre d'ennemis */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Combat contre les légionnaires */
export function fightLegionaries() {
    if (fightLegionariesVar) {
        const guards = getGuards();
        // Si le nombre n'a pas été généré par la corruption, on le génère ici
        if (nbLegionaries === 0) {
            nbLegionaries = getRandomIntInclusive(3, Math.max(5, Math.round(gameState.crew / 4)));
        }
        const caravanePower = 10 * guards;

        addLog(`Rencontre avec ${nbLegionaries} légionnaires !`);

        if (guards === 0) {
            gameState.crew -= nbLegionaries;
            gameState.morale = Math.floor(gameState.morale / 2);
            gameState.authority = Math.floor(gameState.authority / 2);
            showAlertPopup(`Rencontre avec ${nbLegionaries} légionnaires ! Aucun garde assigné ! Vous ne pouvez pas combattre donc vous perdez ${nbLegionaries} membres.`);
            
            return;
        }

        else if (caravanePower < 3 * nbLegionaries) {
            gameState.crew -= guards;
            gameState.morale = Math.floor(gameState.morale / 2);
            gameState.authority = Math.floor(gameState.authority / 2);
            addLog(`Défaite ! Vous perdez ${guards} gardes et fuyez dans le désert.`);
            showAlertPopup(`Rencontre avec ${nbLegionaries} légionnaires ! Défaite contre les légionnaires ! Vous perdez ${guards} membres.`);
        } 
        else {
            const guardsLost = Math.floor(Math.random() * guards);
            //setGuards(guards - guardsLost);
            gameState.crew -= guardsLost;
            gameState.resources.weapons += nbLegionaries;
            addLog(`Victoire ! Vous perdez ${guardsLost} gardes et récupérez ${nbLegionaries} armes.`);
            showAlertPopup(`Rencontre avec ${nbLegionaries} légionnaires ! Victoire ! ${guardsLost} gardes perdus et ${nbLegionaries} armes récupérées.`);
        }
        
        refreshFightProperties();
        updateUI();
    }
}

/* Combat contre les bandits */
export function fightBandits() {
    if (fightBanditsVar) {
        const guards = getGuards();
        console.log(guards)
        nbBandits = getRandomIntInclusive(5, Math.max(10, Math.round(gameState.crew / 2)));
        const caravanePower = 2 * guards;

        addLog(`Rencontre avec ${nbBandits} bandits !`);

        if (guards === 0) {
            showAlertPopup(`Rencontre avec ${nbBandits} bandits ! Mais aucun garde assigné ! Vous ne pouvez pas combattre.`);
            addLog(`Défaite ! Vous perdez ${nbBandits} membres et fuyez dans le désert.`);
            gameState.crew -= nbBandits; // ils tuent une personne par bandit
            gameState.morale = Math.floor(gameState.morale / 2);
            gameState.authority = Math.floor(gameState.authority / 2);
            return;
        }

        else if (caravanePower < nbBandits) {
            gameState.crew -= guards;
            gameState.morale = Math.floor(gameState.morale / 2);
            gameState.authority = Math.floor(gameState.authority / 2);
            addLog(`Rencontre avec ${nbBandits} bandits ! Défaite ! Vous perdez ${guards} membres et fuyez dans le désert.`);
            showAlertPopup(`Défaite contre les bandits ! Vous perdez ${guards} membres.`);
        } 
        
        else {
            const guardsLost = Math.floor(Math.random() * guards);
            gameState.crew -= guardsLost;
            //setGuards(guards - guardsLost);
            addLog(`Rencontre avec ${nbBandits} bandits ! Victoire ! Vous perdez ${guardsLost} gardes mais repoussez les bandits.`);
            showAlertPopup('Victoire contre les bandits !');
        }
        
        refreshFightProperties();
        updateUI();
    }
}

/* Corruption des légionnaires */
export function attemptBribe() {
    if (!fightLegionariesVar) return false;

    // IMPORTANT : On doit générer le nombre maintenant pour calculer le prix
    if (nbLegionaries === 0) {
        nbLegionaries = getRandomIntInclusive(3, Math.max(5, Math.round(gameState.crew / 4)));
    }

    const bribe = getRandomIntInclusive(20, 50) * nbLegionaries;
    const acceptBribe = confirm(`Les légionnaires sont ${nbLegionaries}. Ils demandent ${bribe} debens. Payer ?`);

    if (acceptBribe && gameState.debens >= bribe) {
        gameState.debens -= bribe;
        addLog(`Vous payez ${bribe} debens pour corrompre les légionnaires.`);
        showAlertPopup(`Corruption réussie ! -${bribe} debens.`);
        refreshFightProperties();
        updateUI();
        return true;
    } else if (acceptBribe) {
        showAlertPopup("Vous n'avez pas assez d'argent pour les corrompre !");
    }
    return false;
}

/* Réinitialisation des variables de combat */
function refreshFightProperties() {
    fightLegionariesVar = false;
    fightBanditsVar = false;
    nbLegionaries = 0;
    nbBandits = 0;
}
