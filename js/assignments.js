import { gameState, place, locationBackgrounds, porterage} from './gameState.js';
import { getCurrentLocation } from './location.js';
import { updateUI } from './ui.js';


// --- Assignations ------------------------------------------------------------------------
export let carriers = 0;

export let scouts = 0, 
        guards = 0, 
        waterGatherers = 0, 
        foodHarvesters = 0, 
        strollers = 0;
        

export function calculateMorale() {
    return gameState.morale;
}

export function calculateAssignment() {
    return [1, 2, 3, 4, 5].reduce((sum, i) => {
        return sum + parseInt(document.getElementById("input" + i).value || 0);
    }, 0);
}

export function plus1(n) {
    let input = document.getElementById("input" + n);
    let value = parseInt(input.value || 0);

    const totalAssign = calculateAssignment();
    if (totalAssign >= gameState.crew) return;

    if (
        (n === 1 && value >= gameState.resources.horses) || // scouts limités par chevaux
        (n === 2 && value >= gameState.resources.weapons)   // guards limités par armes
    ) {
        return;
    }

    input.value = value + 1;
}


export function minus1(n) {
    let input = document.getElementById("input" + n);
    if (!isNaN(input.value) && parseInt(input.value) > 0) {
        input.value = parseInt(input.value) - 1;
    } else {
        input.value = 0;
    }
}

export function assignmentSetup(addLog) {
    for (let i = 1; i <= 5; i++) {
        document.getElementById("btn-minus" + i).addEventListener("click", () => minus1(i));
        document.getElementById("btn-plus" + i).addEventListener("click", () => plus1(i));
    }

    document.getElementById("btnValidate1").addEventListener("click", () => {
        scouts = parseInt(document.getElementById("input1").value) || 0;
        guards = parseInt(document.getElementById("input2").value) || 0;
        waterGatherers = parseInt(document.getElementById("input3").value) || 0;
        foodHarvesters = parseInt(document.getElementById("input4").value) || 0;
        strollers = parseInt(document.getElementById("input5").value) || 0;

        document.getElementById("assign-modal").style.display = "none";

        const currentLocation = getCurrentLocation(); 

        collectWater(currentLocation);
        collectFood(currentLocation);

        calculateCurrentPorterage();
        calculateNeededPorterage();

        updateUI();
        
        addLog(`✅ Assignations confirmées : ${scouts} éclaireurs, ${guards} gardes, ${waterGatherers} collecteurs d’eau, ${foodHarvesters} récolteurs, ${strollers} promeneurs.`);
    });

}

//collecte des ressources
export function collectWater(currentLocation) { //p4
    gameState.water+=waterGatherers*currentLocation.data.waterYield;
}

export function collectFood(currentLocation) { //p4
    gameState.resources.rations+=foodHarvesters*currentLocation.data.foodYield;
}



///////////////////////////////////////////////////////////////////////////////////////////////
export function refreshPeopleProperties2() {  //sauf pour les scouts toujours en exploration (p9)
    assignements=0;
    guards=0;
    carriers=0;
    waterGatherers=0;
    foodHarvesters=0;
    strollers=0;
}

export function resetAssignments() {
    scouts = 0;
    guards = 0;
    waterGatherers = 0;
    foodHarvesters = 0;
    strollers = 0;
    carriers = 0;

    // Réinitialiser les inputs visibles
    for (let i = 1; i <= 5; i++) {
        const input = document.getElementById("input" + i);
        if (input) input.value = "0";
    }
}

// Modifiez les fonctions de calcul :
export function calculateNeededPorterage() {
    // Poids des ressources (ajustez selon vos besoins)
    const totalWeight = 
        gameState.resources.weapons * 1 +   // chaque arme pèse 1
        gameState.resources.camels * 0 +    // les chameaux ne comptent pas dans le poids
        gameState.resources.rations * 1 +   // chaque ration pèse 1
        gameState.resources.papyrus * 1 +   // chaque papyrus pèse 1
        gameState.resources.horses * 0 +    // les chevaux ne comptent pas
        gameState.water * 1;                // chaque unité d'eau pèse 1

    porterage.needed = totalWeight;
    return totalWeight;
}

export function calculateCurrentPorterage() {
    const camelCapacity = gameState.resources.camels * 100;  // chaque chameau porte 100
    const horseCapacity = gameState.resources.horses * 30;   // chaque cheval porte 30
    const humanCapacity = carriers * 10;                     // chaque porteur humain porte 10

    porterage.current = camelCapacity + horseCapacity + humanCapacity;
    return porterage.current;
}

export function refreshCaravanProperties() {
    // Réinitialisation
    carriers = 0;
    
    // Calcul des besoins
    const totalAssigned = calculateAssignment();
    const idle = Math.max(0, gameState.crew - totalAssigned);
    
    // Mise à jour des valeurs
    porterage.needed = calculateNeededPorterage();
    porterage.current = calculateCurrentPorterage();
    
    // Calcul des porteurs nécessaires
    const shortage = porterage.needed - porterage.current;
    if (shortage > 0) {
        carriers = Math.min(Math.ceil(shortage / 10), idle);
        porterage.current += carriers * 10;
    }

    console.log("Portage actualisé:", {
        current: porterage.current,
        needed: porterage.needed,
        carriers: carriers
    });
}

export function setStayedInPlace(value) {
    stayedInPlace = value;
}


export function setCarriers(val) {
    carriers = val;
}


///////////::

