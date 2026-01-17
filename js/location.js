import { place } from './gameState.js';

let currentLocationKey = 'fluvial_city';
let currentLocation = place[currentLocationKey];

export function setCurrentLocationKey(key) {
    currentLocationKey = key;
    currentLocation = place[key];
}

export function getCurrentLocationKey() {
    return currentLocationKey;
}

export function getCurrentLocation() {
    return currentLocation;
}

export function setupLocationModal() {
    const locationSpan = document.getElementById("current-location-name");
    const modal = document.getElementById("location-info-modal");
    const closeBtn = modal.querySelector(".close-btn");
    const modalContent = modal.querySelector(".location-info-content");

    locationSpan.addEventListener("click", () => {
        const locKey = getCurrentLocationKey();
        const data = place[locKey]?.data;

        modalContent.innerHTML = generateLocationHTML(locKey, data);
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

function generateLocationHTML(name, data) {
    const water = data.waterYield ?? 0;
    const food = data.foodYield ?? 0;

    const sellItems = data.sell ? Object.entries(data.sell)
        .map(([key, val]) => `<li>Vend : ${key} - ${val.volume} unités à ${val.price} debens </li>`).join('') : '';
    
    const buyItems = data.buy ? Object.entries(data.buy)
        .map(([key, val]) => `<li>Achète : ${key} - ${val.volume} unités à ${val.price} debens </li>`).join('') : '';

    return `
        <h2>${formatName(name)}</h2>
        <p>Eau disponible : ${water}</p>
        <p>Nourriture disponible : ${food}</p>
        <ul>
            ${sellItems}
            ${buyItems}
        </ul>
    `;
}

export function formatName(key) {
    return place[key].name;
}
