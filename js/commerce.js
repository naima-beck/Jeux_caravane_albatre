import { gameState, place, locationBackgrounds } from './gameState.js';
import { calculateNeededPorterage, calculateCurrentPorterage } from './assignments.js';
import { updateUI } from './ui.js';


// Commerce -------------------------------------------------------------------------------------------------------------------------------
export function setupTrade(addLog, currentLocation) {
    const tradeState = {
        volumeList: [0, 0, 0, 0, 0],
        priceList: [0, 0, 0, 0, 0],
        currentLocation: currentLocation || place.fluvial_city,
        resources: {...gameState.resources}, // Copie directe de gameState
        debens: gameState.debens
    };

    document.getElementById('trade-btn').addEventListener('click', () => {
        // Réinitialiser tous les inputs à 0
        for (let i = 1; i <= 5; i++) {
            const input = document.getElementById(`input${i}`);
            if (input) input.value = '0';
        }
        
        document.getElementById('trade-modal').style.display = 'block';
        tradeState.currentLocation = currentLocation || place.fluvial_city;
        
        const locationKey = Object.keys(place).find(key => place[key] === tradeState.currentLocation);
        const bgPath = locationBackgrounds[locationKey] || locationBackgrounds.fluvial_city;
        
        document.getElementById('game-window2').style.backgroundImage = `url('${bgPath}')`;
        
        updateProductSelling(tradeState);
        updateProductBuying(tradeState);
        setupTradeButtons(tradeState, addLog);
        updateTradeTotal(tradeState); // Mettre à jour les totaux
        
    });

    document.getElementById('btnValidate2').addEventListener('click', () => {
    const totalCost = calculateTotalLoss(tradeState) - calculateTotalProfit(tradeState);
    
        if (totalCost > tradeState.debens) {
            addLog("❌ Fonds insuffisants pour cette transaction");
            return;
        }
        
        if (updateTradeValues(tradeState)) {
            document.getElementById('trade-modal').style.display = 'none';
            addLog("🛒 Transaction commerciale effectuée");
            
            // Réinitialiser les inputs après validation
            for (let i = 1; i <= 5; i++) {
                const input = document.getElementById(`input${i}`);
                if (input) input.value = '0';
            }

            calculateNeededPorterage();
            calculateCurrentPorterage();
            updateTradeTotal(tradeState);
            updateUI();
        }
    });
}

function updateProductSelling(tradeState) {
    const location = tradeState.currentLocation;
    if (!location.data.sell) return;

    const listSell = Object.keys(location.data.sell);
    const elements1 = document.getElementById('elements1');
    elements1.innerHTML = '';

    listSell.forEach((product, i) => {
        const productData = location.data.sell[product];
        const index = i + 1;

        const formRow = document.createElement('div');
        formRow.className = 'formRow';
        formRow.id = `formRow${index}`;
        formRow.innerHTML = `
            <div class="product">
                <p id="product${index}">${product}</p>
                <img class="icons" id="icons${index}" src="assets/images/ui/resources/${product}.png">
            </div>
            <div class="bottom">
                <div class="informations">
                    <p id="price${index}">Price: ${productData.price} debens</p>
                    <p id="volume${index}">Volume: ${productData.volume}</p>
                </div>
                <div class="bloc">
                    <img class="btnMinus" id="btnMinus${index}" src="assets/images/ui/button/minus.png" alt="-">
                    <input id="input${index}" type="text" value="0">
                    <img class="btnPlus" id="btnPlus${index}" src="assets/images/ui/button/plus.png" alt="+">
                </div>
            </div>
        `;

        elements1.appendChild(formRow);
        formRow.style.display = "block";
        tradeState.volumeList[i] = productData.volume;
        tradeState.priceList[i] = productData.price;
    });
}

function updateProductBuying(tradeState) {
    const location = tradeState.currentLocation;
    if (!location.data.buy) return;

    const listBuy = Object.keys(location.data.buy);
    const elements2 = document.getElementById('elements2');
    elements2.innerHTML = '';

    listBuy.forEach((product, i) => {
        const productData = location.data.buy[product];
        const index = i + 4; // Commence à 4 pour les achats

        const formRow = document.createElement('div');
        formRow.className = 'formRow';
        formRow.id = `formRow${index}`;
        formRow.innerHTML = `
            <div class="product">
                <p id="product${index}">${product}</p>
                <img class="icons" id="icons${index}" src="assets/images/ui/resources/${product}.png">
            </div>
            <div class="bottom">
                <div class="informations">
                    <p id="price${index}">Price: ${productData.price} debens</p>
                    <p id="volume${index}">Volume: ${productData.volume}</p>
                </div>
                <div class="bloc">
                    <img class="btnMinus" id="btnMinus${index}" src="assets/images/ui/button/minus.png" alt="-">
                    <input id="input${index}" type="text" value="0">
                    <img class="btnPlus" id="btnPlus${index}" src="assets/images/ui/button/plus.png" alt="+">
                </div>
            </div>
        `;

        elements2.appendChild(formRow);
        formRow.style.display = "block";
        tradeState.volumeList[index-1] = productData.volume;
        tradeState.priceList[index-1] = productData.price;
    });
}

function setupTradeButtons(tradeState, addLog) {
    const totalProducts = tradeState.priceList.length;
    
    for (let i = 1; i <= totalProducts; i++) {
        const minusBtn = document.getElementById(`btnMinus${i}`);
        const plusBtn = document.getElementById(`btnPlus${i}`);
        
        if (minusBtn && plusBtn) {
            minusBtn.addEventListener('click', () => {
                minusTrade(i, tradeState);
                updateTradeTotal(tradeState);
            });
            
            plusBtn.addEventListener('click', () => {
                plusTrade(i, tradeState);
                updateTradeTotal(tradeState);
            });
        }
    }
}


function plusTrade(n, tradeState) {
    const input = document.getElementById(`input${n}`);
    if (!input) return;

    const value = parseInt(input.value) || 0;
    const product = document.getElementById(`product${n}`).textContent;
    
    if (n < 4) { // Vente
        if (value < tradeState.volumeList[n-1] && value < tradeState.resources[product]) {
            input.value = value + 1;
        }
    } else { // Achat
        const cost = tradeState.priceList[n-1];
        const totalLoss = calculateTotalLoss(tradeState) + cost;
        const totalProfit = calculateTotalProfit(tradeState);
        
        if (value < tradeState.volumeList[n-1] && 
            (tradeState.debens + totalProfit - totalLoss) >= 0) {
            input.value = value + 1;
        }
    }
    updateTradeTotal(tradeState);
}

function minusTrade(n, tradeState) {
    const input = document.getElementById(`input${n}`);
    if (!input) return;

    const value = parseInt(input.value) || 0;
    if (value > 0) {
        input.value = value - 1;
    }
}

function calculateTotalProfit(tradeState) {
    let profit = 0;
    for (let i = 1; i <= 3; i++) {
        const input = document.getElementById(`input${i}`);
        if (input) {
            profit += (parseInt(input.value) || 0) * tradeState.priceList[i-1];
        }
    }
    return profit;
}

function calculateTotalLoss(tradeState) {
    let loss = 0;
    for (let i = 4; i <= 5; i++) {
        const input = document.getElementById(`input${i}`);
        if (input) {
            loss += (parseInt(input.value) || 0) * tradeState.priceList[i-1];
        }
    }
    return loss;
}

function updateTradeTotal(tradeState) {
    const totalProfit = calculateTotalProfit(tradeState);
    const totalLoss = calculateTotalLoss(tradeState);
    const balance = tradeState.debens + totalProfit - totalLoss;
    
    document.getElementById("totalProfit").textContent = totalProfit;
    const lossElement = document.getElementById("totalLoss");
    lossElement.textContent = totalLoss;
    
    // Applique un style si solde insuffisant
    if (balance < 0) {
        lossElement.classList.add('insufficient-funds');
    } else {
        lossElement.classList.remove('insufficient-funds');
    }
}

function updateTradeValues(tradeState) {
    const listSell = Object.keys(tradeState.currentLocation.data.sell || {});
    const listBuy = Object.keys(tradeState.currentLocation.data.buy || {});
    
    // Créer une copie temporaire des ressources
    const tempResources = {...gameState.resources}; // Utilise directement gameState
    let tempDebens = gameState.debens; // Utilise directement gameState
    
    // Vente
    listSell.forEach((product, i) => {
        const input = document.getElementById(`input${i+1}`);
        if (input) {
            const value = parseInt(input.value) || 0;
            tempResources[product] = (tempResources[product] || 0) - value;
            tempDebens += value * tradeState.priceList[i];
        }
    });
    
    // Achat
    listBuy.forEach((product, i) => {
        const input = document.getElementById(`input${i+4}`);
        if (input) {
            const value = parseInt(input.value) || 0;
            tempResources[product] = (tempResources[product] || 0) + value;
            tempDebens -= value * tradeState.priceList[i+3];
        }
    });
    
    // Vérifier que les ressources ne deviennent pas négatives
    const validTransaction = Object.values(tempResources).every(val => val >= 0) && tempDebens >= 0;
    
    if (validTransaction) {
        // Appliquer les changements si tout est valide
        gameState.resources = tempResources;
        gameState.debens = tempDebens;
        
        // Mettre à jour l'affichage
        updateResourcesDisplay();
        document.getElementById('debens').textContent = `💰 ${tempDebens}`;
        
        // Mettre à jour la modale des ressources
        document.getElementById('weapons').textContent = gameState.resources.weapons;
        document.getElementById('camels').textContent = gameState.resources.camels;
        document.getElementById('rations').textContent = gameState.resources.rations;
        document.getElementById('papyrus').textContent = gameState.resources.papyrus;
        document.getElementById('horses').textContent = gameState.resources.horses;
        
        return true;
    } else {
        addLog("❌ Transaction impossible - ressources insuffisantes");
        return false;
    }
}

function updateResourcesDisplay() {
    document.getElementById('weapons').textContent = gameState.resources.weapons;
    document.getElementById('camels').textContent = gameState.resources.camels;
    document.getElementById('rations').textContent = gameState.resources.rations;
    document.getElementById('papyrus').textContent = gameState.resources.papyrus;
    document.getElementById('horses').textContent = gameState.resources.horses;
}

function getCurrentLocation() {
    // Implémentez cette fonction pour retourner l'emplacement actuel
    // Par exemple, vous pourriez avoir une variable globale currentLocation
    return place.fluvial_city; // Exemple temporaire
} 