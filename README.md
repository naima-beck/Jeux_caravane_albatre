# La Caravane d'Albâtre

Plongez au cœur de l'Égypte antique dans ce jeu de gestion stratégique au tour par tour. En tant que chef d'expédition, votre mission est de guider votre caravane à travers les étendues désertiques, de faire prospérer votre commerce et d'assurer la survie de votre équipage face aux périls du Nil.

## Mécaniques de Jeu

**Commerce et Économie**

Le commerce constitue le pilier central de votre aventure. Le jeu propose un marché dynamique dont les offres et les demandes s'actualisent en temps réel selon la localité visitée. Ce système intelligent sécurise chaque transaction en vérifiant la solvabilité et les stocks disponibles, garantissant une économie cohérente où chaque pièce compte.

<img width="1280" height="675" alt="Interface de commerce" src="https://github.com/user-attachments/assets/b0968840-e682-467f-a835-3f2364625491" />

Voici un aperçu des transactions en action :
<video src="https://github.com/user-attachments/assets/5f4ed43f-30d6-4c70-b112-59c3c75d44fd" controls="controls" style="max-width: 100%;">
</video>

<br>

**Gestion Stratégique de l'Équipage**

La préparation est la clé de la survie. Avant chaque départ, il est crucial de définir la stratégie du tour en assignant des rôles précis à vos membres. Que ce soit pour la récolte de ressources vitales, le maintien du moral des troupes ou la défense contre les brigands rôdant près des oasis, chaque décision impacte la suite de votre périple.

<img width="1280" height="675" alt="Menu d'assignation des rôles" src="https://github.com/user-attachments/assets/ae718cb5-f6de-439f-ab35-b494a8c6a090" />

<br>

**Exploration et Logistique**

L'exploration se fait via une carte interactive permettant de rallier les différents points d'intérêt de la région.

<img width="1280" height="675" alt="Carte du jeu" src="https://github.com/user-attachments/assets/35c0f118-f8a4-4a19-8c67-eec7ea54aef6" />

Cependant, chaque déplacement doit être minutieusement calculé. La gestion logistique est primordiale : un chargement trop lourd ou des ressources mal gérées peuvent immobiliser votre caravane. Il est impératif de respecter les règles de capacité de portage pour espérer traverser le désert sans encombre.

<video src="https://github.com/user-attachments/assets/13cfdb85-6cee-4204-b616-741f69c3656a" controls="controls" style="max-width: 100%;">
</video>

<br>

**Interface et Paramètres**

Pour offrir une expérience fluide, une interface de réglages complète permet à tout moment de consulter les règles détaillées, d'ajuster l'ambiance sonore ou de gérer la progression de la partie.

<video src="https://github.com/user-attachments/assets/5c39b2dc-8756-4d8a-9022-b267a6e70259" controls="controls" style="max-width: 100%;">
</video>

## Votre Mission

Votre quête ultime est d'amasser une fortune suffisante pour acquérir une majestueuse barque de commerce sur le Nil. Pour y parvenir, vous devrez maîtriser l'art du négoce en achetant du papyrus dans les cités fluviales pour le revendre à prix d'or dans le désert. Votre succès dépendra de votre capacité à maintenir l'équilibre précaire entre la soif de richesses, les besoins vitaux de votre équipage et les menaces constantes que représentent les légionnaires corrompus et les bandits des sables.

## Technologies Utilisées

Ce projet a été conçu avec une approche moderne et accessible, utilisant les standards du web :
* **HTML5 / CSS3** pour la structure et le design responsive.
* **JavaScript Vanilla** pour toute la logique du jeu, sans dépendance lourde.
* **LiveServer** pour l'environnement de développement.

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

- **[Énoncé du projet](./references/Projet_web_La_Caravane dAlbatre.pdf)**

## Auteur

- Naïma Beck alias [@naima-beck](https://www.github.com/naima-beck)
- Axelle Le Poul alias [@axellelepoul-ctrl](https://www.github.com/axellelepoul-ctrl)
- Antonin Biette alias [@Antonin287](https://github.com/Antonin287)

Cy Tech - Sciences-Po Saint-Germain-En-Laye - [2023/2024]


## License

Ce projet est réalisé dans un cadre académique. Les données sont fournies pour usage pédagogique.
Il est sous licence [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
![License](https://img.shields.io/badge/License-CC%20BY--NC--SA-blue.svg)
