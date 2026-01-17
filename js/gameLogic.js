import { gameState } from './gameState.js';

let famineTurns = 0;
let stayedInPlace = false;

// --- Conditions de défaite ---
export function verifLose() {
    if (gameState.crew <= 0) {
        return true;
    }
    if (gameState.morale <= 0) {
        return revolt();
    }
    return false;
}

export function revolt() {
    const deficit = Math.abs(gameState.morale) + 1;
    if (gameState.authority >= deficit) {
        gameState.authority -= deficit;
        gameState.morale = 1;
        return false;
    }
    return true;
}

// --- Gestion de la Faim (Renvoie le nombre de morts) ---
export function handleFamine() {
    let deaths = 0;

    // Si on n'a pas assez de rations
    if (gameState.resources.rations < gameState.crew) {
        famineTurns++;
        
        // Calcul des morts (Logique exponentielle : 1, 3, 7...)
        deaths = Math.pow(2, famineTurns) - 1;
        
        // Sécurité : on ne tue pas plus que de vivants
        deaths = Math.min(deaths, gameState.crew);

        // Application des effets
        gameState.crew -= deaths;
        gameState.morale = Math.max(0, gameState.morale - 10);
        
        // On vide le stock de nourriture car ils ont tout mangé avant de mourir
        gameState.resources.rations = 0; 

    } else {
        // Assez à manger
        gameState.resources.rations -= gameState.crew;
        famineTurns = 0;
        deaths = 0;
    }

    return deaths;
}

// --- Gestion de la Soif (Renvoie le nombre de morts) ---
export function handleWater() {
    let deaths = 0;

    // 1. Calcul du besoin basé sur l'équipage ACTUEL (avant les morts)
    let waterNeeded = stayedInPlace 
        ? Math.floor(gameState.crew / 2)
        : gameState.crew;

    // 2. Vérification
    if (gameState.water >= waterNeeded) {
        // Tout va bien
        gameState.water -= waterNeeded;
        deaths = 0;
    } else {
        // Manque d'eau
        const waterAvailable = gameState.water;
        
        // Le manque d'eau tue directement (1 manque = 1 mort)
        const shortage = waterNeeded - waterAvailable;
        deaths = shortage;

        // Sécurité
        deaths = Math.min(deaths, gameState.crew);

        // Application des effets
        gameState.crew -= deaths;
        gameState.water = 0; // Plus d'eau
    }

    return deaths;
}

// --- Fonction Principale appelée par main.js ---
export function handleResources() {
    // On exécute les fonctions qui appliquent les morts ET renvoient le nombre
    const waterDeaths = handleWater();
    const famineDeaths = handleFamine();
    
    // On détermine s'il y a eu pénurie pour l'affichage
    const waterShortage = waterDeaths > 0;
    const famine = famineDeaths > 0;
    
    return { waterShortage, famine, waterDeaths, famineDeaths };
}

// Setter pour le statut de déplacement
export function setStayedInPlace(value) {
    stayedInPlace = value;
}
