# La Caravane d'Albâtre

C'est un jeu de gestion en tour par tour se déroulant dans l'Égypte antique. Guidez votre caravane à travers le désert, gérez vos ressources, commercez avec les cités et survivez aux dangers du Nil.

## Objectifs

Votre mission : accumuler suffisamment de richesses pour acquérir une majestueuse barque de commerce naviguant sur le Nil. Pour cela, vous devrez :

- **Commercez astucieusement** : Achetez du papyrus dans les cités fluviales et revendez-le avec profit dans les cités du désert
- **Survivez aux éléments** : Gérez l'eau, la nourriture et le moral de votre équipage
- **Évitez les dangers** : Légionnaires corrompus sur les berges du Nil et bandits tapis dans les oasis

## Technologies utilisés
- **Langage** : HTML5 / CSS3 / JavaScript Vanilla / LiveServer Dev
- Design responsive et accessible
- Interface utilisateur intuitive

## Installation

### Cloner le repository

```bash
git clone https://github.com/naima-beck/Jeux_caravane_albatre.git
cd Jeux_caravane_albatre
```

### Structure du projet

```bash
/Jeux_caravane_albatre
│
├── /assets/                # Tous les fichiers statiques : images, sons, polices...
│   ├── /images/
│            ├── /backgrounds/    # illustration du lieu
│            ├── /map/
│            ├── /ui/
│                      ├── /button/
│                      ├── /modal/
│                      ├── /resources/
│                      ├── /stats/
│   ├── /sounds/
│   └── /fonts/
│
├── /css/                   # Feuilles de style CSS
│   └── style.css           # Fichier principal CSS
│
├── /js/                    # Scripts JavaScript
│   ├── main.js             # Script principal du jeu
│   ├── gameLogic.js        # Logique du jeu (gestion, règles, calculs)
│   ├── assignements.js 
│   ├── gameState.js 
│   ├── location.js 
│   ├── map.js 
│   ├── fight.js 
│   ├── commerce.js 
│   └── ui.js               # Gestion de l'interface utilisateur (animations, DOM)
│
├── /lib/                   # Bibliothèques externes (si utilisées)
│
├── /docs/   # l‘énonce est dedans
│
├── index.html              # Page principale HTML
│
├── gameOver.html     # Page de fin du jeu
│
├── README.md               # Description du projet, instructions, etc.
│
└── .gitignore              # Fichiers à ignorer par Git (si contrôle de version)

```

## Démarrer le projet

### Option 1 : Avec Live Server (recommandé)

**Prérequis :** Avoir installé [Visual Studio Code] (https://code.visualstudio.com/) et l’extension **Live Server**.

#### Étapes :
1. Ouvrir le dossier du projet dans **Visual Studio Code**
2. Installer l’extension **Live Server** (si ce n’est pas déjà fait)
   - Aller dans Extensions (icône en blocs à gauche)
   - Rechercher "Live Server"
   - Cliquer sur "Installer"
3. Dans le panneau de gauche, **clic droit sur `index.html`**
4. Cliquer sur **"Ouvrir avec Live Server"**

Le navigateur va s’ouvrir automatiquement à l’adresse :
http://127.0.0.1:5500/index.html
---

### Option 2 : Avec un serveur HTTP en ligne de commande

Si vous ne souhaitez pas utiliser Live Server, vous pouvez utiliser un petit serveur local via la ligne de commande.

#### Prérequis :
- Avoir **Node.js** installé (https://nodejs.org)
- (ou Python si vous préférez)

#### Avec Node.js :

```bash
# Installe un serveur web simple en global
npm install -g serve

# Lance le serveur dans le dossier du projet
serve .
```

Ensuite, ouvrez l'adresse indiquée (généralement http://localhost:3000)

Avec Python (si installé) :
```bash
# Pour Python 3.x
python3 -m http.server

# Pour Python 2.x
python -m SimpleHTTPServer
```

Puis ouvrez http://localhost:8000 dans votre navigateur


## Références

- **[Énoncé du projet](./docs/Projet_web_La_Caravane dAlbatre.pdf)**

## Auteur

- Naïma Beck alias [@naima-beck](https://www.github.com/naima-beck)
- Axelle Le Poul alias [@axellelepoul-ctrl](https://www.github.com/axellelepoul-ctrl)
- Antonin Biette alias [@Antonin287](https://github.com/Antonin287)

Cy Tech - Sciences-Po Saint-Germain-En-Laye - [2023/2024]


## License

Ce projet est réalisé dans un cadre académique. Les données sont fournies pour usage pédagogique.
Il est sous licence [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
![License](https://img.shields.io/badge/License-CC%20BY--NC--SA-blue.svg)
