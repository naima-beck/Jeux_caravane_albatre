import { gameState, place } from './gameState.js';
import { getGuards, setGuards } from './assignments.js';
import { updateUI } from './ui.js';
import { currentLocationKey } from './location.js';

// Variables de combat
export let fightLegionariesVar = false;
export let fightBanditsVar = false;
export let nbLegionaries = 0;
export let nbBandits = 0;

/* Détermine la rencontre avec des légionnaires */
export function checkLegionariesEncounter(currentLocationKey) {
    if (currentLocationKey === 'nil_shore') {
        const probabilityLegionariesHalting = 0.33;
        if (Math.random() < probabilityLegionariesHalting) {
            fightLegionariesVar = true;
            showAlertPopup('⚠️ Légionnaires en approche ! Préparez-vous au combat.');
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
            showAlertPopup('⚠️ Bandits en approche ! Préparez-vous au combat.');
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
export function fightLegionaries(addLog) {
    if (fightLegionariesVar) {
        const guards = getGuards();
        nbLegionaries = getRandomIntInclusive(3, Math.max(5, Math.round(gameState.crew / 4)));
        const caravanePower = 2 * guards;

        addLog(`⚔️ Rencontre avec ${nbLegionaries} légionnaires !`);

        if (guards === 0) {
            showAlertPopup('❌ Aucun garde assigné ! Vous ne pouvez pas combattre.');
            return;
        }

        if (caravanePower < 3 * nbLegionaries) {
            gameState.crew -= guards;
            gameState.morale = Math.floor(gameState.morale / 2);
            gameState.authority = Math.floor(gameState.authority / 2);
            addLog(`💥 Défaite ! Vous perdez ${guards} membres et fuyez dans le désert.`);
            showAlertPopup(`☠️ Défaite contre les légionnaires ! Vous perdez ${guards} membres.`);
        } else {
            const guardsLost = Math.floor(Math.random() * guards);
            setGuards(guards - guardsLost);
            gameState.resources.weapons += nbLegionaries;
            addLog(`🎉 Victoire ! Vous perdez ${guardsLost} gardes mais récupérez ${nbLegionaries} armes.`);
            showAlertPopup(`🏆 Victoire ! ${nbLegionaries} armes récupérées.`);
        }
        
        refreshFightProperties();
        updateUI();
    }
}

/* Combat contre les bandits */
export function fightBandits(addLog) {
    if (fightBanditsVar) {
        const guards = getGuards();
        nbBandits = getRandomIntInclusive(5, Math.max(10, Math.round(gameState.crew / 2)));
        const caravanePower = 2 * guards;

        addLog(`⚔️ Rencontre avec ${nbBandits} bandits !`);

        if (guards === 0) {
            showAlertPopup('❌ Aucun garde assigné ! Vous ne pouvez pas combattre.');
            return;
        }

        if (caravanePower < nbBandits) {
            gameState.crew -= guards;
            gameState.morale = Math.floor(gameState.morale / 2);
            gameState.authority = Math.floor(gameState.authority / 2);
            addLog(`💥 Défaite ! Vous perdez ${guards} membres et fuyez dans le désert.`);
            showAlertPopup(`☠️ Défaite contre les bandits ! Vous perdez ${guards} membres.`);
        } else {
            const guardsLost = Math.floor(Math.random() * guards);
            setGuards(guards - guardsLost);
            addLog(`🎉 Victoire ! Vous perdez ${guardsLost} gardes mais repoussez les bandits.`);
            showAlertPopup('🏆 Victoire contre les bandits !');
        }
        
        refreshFightProperties();
        updateUI();
    }
}

/* Corruption des légionnaires */
export function attemptBribe(addLog) {
    if (!fightLegionariesVar) return false;

    const bribe = getRandomIntInclusive(20, 50) * nbLegionaries;
    const acceptBribe = confirm(`Les légionnaires demandent ${bribe} debens pour vous laisser passer. Payer ?`);

    if (acceptBribe && gameState.debens >= bribe) {
        gameState.debens -= bribe;
        addLog(`💰 Vous payez ${bribe} debens pour corrompre les légionnaires.`);
        showAlertPopup(`💸 Corruption réussie ! -${bribe} debens.`);
        refreshFightProperties();
        updateUI();
        return true;
    } else if (acceptBribe) {
        showAlertPopup("❌ Vous n'avez pas assez d'argent pour les corrompre !");
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

/* Fonction d'alerte (à utiliser avec votre système existant) */
function showAlertPopup(message) {
    // Utilisez votre implémentation existante de showAlertPopup
    const existingFunction = window.showAlertPopup;
    if (existingFunction) {
        existingFunction(message);
    } else {
        alert(message); // Fallback simple
    }
}