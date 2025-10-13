export let backgroundMusic = new Audio("assets/sounds/ancient_egypt.mp3");

// --- Lieux ---

export const place = {
    nil_shore: {
        data: {
            waterYield: 3,
            foodYield: 1,
            buy: {
            },
            sell: {
            }
        }
    },
    village: {
        data: {
            waterYield: 2,
            foodYield: 0,
            buy: {
            },
            sell: {
                rations: { volume: 100, price: 4 },
                horses: { volume: 3, price: 500 }
            }
        }
    },
    fluvial_city: {
        data: {
            waterYield: 3,
            foodYield: 0,
            buy: {
                weapons: { volume: 20, price: 100 }
            },
            sell: {
                papyrus: { volume: 50, price: 20 },
                rations: { volume: 100, price: 6 },
                weapons: { volume: 20, price: 200 }
            }
        }
    },
    desert: {
        data: {
            waterYield: 0,
            foodYield: 0,
            buy: {
            },
            sell: {
            }
        }
    },
    oasis: {
        data: {
            waterYield: 3,
            foodYield: 3,
            buy: {
            },
            sell: {
            }
        }
    },
    desert_city: {
        data: {
            waterYield: 1,
            foodYield: 0,
            buy: {
                papyrus: { volume: 50, price: 40 }
            },
            sell: {
                rations: { volume: 100, price: 8 },
                camels: { volume: 2, price: 1000 }
            }
        }
    }
};

// --- État du jeu ---

export const gameState = {
    crew: 20,
    morale: 50,
    debens: 1000,
    water : 50,
    authority : 10,
    resources: {
        weapons: 3,
        camels: 1,
        rations: 80,
        papyrus: 10,
        horses: 2
    }
};

// Dictionnaire des fonds par localisation
export const locationBackgrounds = {
    nil_shore: "assets/images/backgrounds/nil_shore.png",
    village: "assets/images/backgrounds/village.png",
    fluvial_city: "assets/images/backgrounds/fluvial_city.png",
    desert: "assets/images/backgrounds/desert.png",
    oasis: "assets/images/backgrounds/oasis.png",
    desert_city: "assets/images/backgrounds/desert_city.png"
};

export const porterage = {
    current: 160,
    needed: 143
};