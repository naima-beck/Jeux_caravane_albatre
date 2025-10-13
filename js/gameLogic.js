import { gameState } from './gameState.js';

let famineTurns = 0;
let stayedInPlace = false;


// condition de défaite 

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

export function handleFamine() {
    if (gameState.resources.rations < gameState.crew) {
        famineTurns++;
        const losses = Math.pow(2, famineTurns) - 2;
        gameState.crew = Math.max(0, gameState.crew - losses);
        gameState.morale = Math.max(0, gameState.morale - 10);
        return true;
    } else {
        famineTurns = 0;
        return false;
    }
}

export function handleWater() {
    let waterNeeded = stayedInPlace 
        ? Math.floor(gameState.crew / 2)
        : gameState.crew;

    if (gameState.water >= waterNeeded) {
        gameState.water -= waterNeeded;
        return false;
    } else {
        const shortage = waterNeeded - gameState.water;
        gameState.crew = Math.max(0, gameState.crew - shortage);
        gameState.water = 0;
        return true;
    }
}

export function handleResources() {
    // Gestion de l'eau
    const waterShortage = handleWater();
    const waterDeaths = getWaterShortageDeaths();
    
    // Gestion des rations
    const famine = handleFamine();
    const famineDeaths = getFamineDeaths();
    
    // Si assez de rations
    if (!famine && gameState.resources.rations >= gameState.crew) {
        gameState.resources.rations -= gameState.crew;
    }
    
    return { waterShortage, famine, waterDeaths, famineDeaths };
}


export function getFamineTurns() {
    return famineTurns;
}

export function getFamineDeaths() {
    if (famineTurns > 0) {
        return Math.pow(2, famineTurns) - 1; // Retourne le nombre de morts ce tour-ci
    }
    return 0;
}

export function getWaterShortageDeaths() {
    let waterNeeded = stayedInPlace 
        ? Math.floor(gameState.crew / 2)
        : gameState.crew;
    return Math.max(0, waterNeeded - gameState.water);
}
