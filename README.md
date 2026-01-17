# La Caravane d'Albâtre

C'est un jeu de gestion en tour par tour se déroulant dans l'Égypte antique. Guidez votre caravane à travers le désert, gérez vos ressources, commercez avec les cités et survivez aux dangers du Nil.


Le jeu intègre un marché qui s'actualise en temps réel selon l'endroit visité. Le système gère intelligemment les transactions en bloquant les achats ou les ventes si les conditions (argent ou ressources) ne sont pas réunies.
<img width="1280" height="675" alt="commerce" src="https://github.com/user-attachments/assets/b0968840-e682-467f-a835-3f2364625491" />


En voici le fonctionnement : 
https://github.com/user-attachments/assets/5f4ed43f-30d6-4c70-b112-59c3c75d44fd

Avant de se déplacer, il est très important d'assigner les habitants à des rôles : pour récupérer des ressources, augmenter le morale mais surtout se préparer à une possible attaque de brigants en allant vers l'oasis ou le bord du nil.
<img width="1280" height="675" alt="Assignement" src="https://github.com/user-attachments/assets/ae718cb5-f6de-439f-ab35-b494a8c6a090" />


Pour se déplacer, il faut cliquer sur la carte.
<img width="1280" height="675" alt="carte" src="https://github.com/user-attachments/assets/35c0f118-f8a4-4a19-8c67-eec7ea54aef6" />



Mais attention à la bonne gestion des ressources, pour se déplacer il faut respecter certaines règles.
https://github.com/user-attachments/assets/13cfdb85-6cee-4204-b616-741f69c3656a


Il y a aussi un menu réglage où on peut voir les règles du jeu, gérer le son, recommencer la partie et reinitialiser les paramètres.
https://github.com/user-attachments/assets/5c39b2dc-8756-4d8a-9022-b267a6e70259


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
