# gcanva.art

Une application web de dessin/canvas construite avec React, TypeScript, Vite et Supabase.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- [Git](https://git-scm.com/)
- Un éditeur de code comme [Visual Studio Code](https://code.visualstudio.com/)

## 🚀 Installation sur votre ordinateur

### Option 1 : Avec Laragon (Windows)

Si vous utilisez Laragon et voulez le projet dans `C:\laragon\www\gcanva.art` :

1. **Ouvrir un terminal dans Laragon** :
   - Cliquez sur le menu Laragon
   - Sélectionnez "Terminal" ou "CMDER"

2. **Naviguer vers le dossier www** :
   ```bash
   cd C:\laragon\www
   ```

3. **Cloner le repository** :
   ```bash
   git clone https://github.com/Pyrrhate/gcanva.art.git
   ```

4. **Entrer dans le dossier du projet** :
   ```bash
   cd gcanva.art
   ```

5. **Installer les dépendances** :
   ```bash
   npm install
   ```

6. **Ouvrir dans Visual Studio Code** :
   ```bash
   code .
   ```
   Ou ouvrez manuellement VS Code et utilisez `Fichier > Ouvrir le dossier` pour sélectionner `C:\laragon\www\gcanva.art`

### Option 2 : Installation standard (tous systèmes)

1. **Cloner le repository** :
   ```bash
   git clone https://github.com/Pyrrhate/gcanva.art.git
   cd gcanva.art
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Ouvrir dans Visual Studio Code** :
   ```bash
   code .
   ```

## 🛠️ Commandes de développement

### Démarrer le serveur de développement
```bash
npm run dev
```
L'application sera accessible à l'adresse : `http://localhost:5173`

### Vérifier le code (linting)
```bash
npm run lint
```

### Vérifier les types TypeScript
```bash
npm run typecheck
```

### Construire pour la production
```bash
npm run build
```

### Prévisualiser la version de production
```bash
npm run preview
```

## 📁 Structure du projet

```
gcanva.art/
├── src/                # Code source de l'application
│   ├── components/     # Composants React
│   ├── App.tsx         # Composant principal
│   └── main.tsx        # Point d'entrée
├── public/             # Fichiers statiques
├── index.html          # Page HTML principale
└── package.json        # Dépendances et scripts
```

## 🔧 Configuration de Visual Studio Code

Extensions recommandées :
- **ESLint** - Analyse et correction du code JavaScript/TypeScript
- **Prettier** - Formatage automatique du code
- **Tailwind CSS IntelliSense** - Autocomplétion pour Tailwind CSS
- **ES7+ React/Redux/React-Native snippets** - Snippets React utiles

## ❓ Dépannage

### Erreur "npm not found"
- Assurez-vous que Node.js est installé : `node --version`
- Redémarrez votre terminal après l'installation de Node.js

### Problèmes avec les dépendances
```bash
# Recommandé : Utiliser npm ci (préserve le package-lock.json)
npm ci

# Si le problème persiste, supprimer le cache npm
npm cache clean --force
npm ci

# En dernier recours : Réinstaller complètement (attention aux versions)
# Windows (PowerShell ou CMD)
rmdir /s /q node_modules
del package-lock.json
npm install

# macOS/Linux
rm -rf node_modules package-lock.json
npm install
```

> **⚠️ Note de sécurité** : Supprimer `package-lock.json` peut installer des versions différentes des dépendances, ce qui peut introduire des vulnérabilités. Utilisez cette méthode uniquement si le fichier lock est corrompu.

### Le port 5173 est déjà utilisé
```bash
# Tuer le processus sur le port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## 🤝 Contribution

1. Créez une branche pour votre fonctionnalité : `git checkout -b feature/ma-fonctionnalite`
2. Committez vos changements : `git commit -m 'Ajout de ma fonctionnalité'`
3. Poussez vers la branche : `git push origin feature/ma-fonctionnalite`
4. Ouvrez une Pull Request

---

## 🌐 English Version

# gcanva.art

A drawing/canvas web application built with React, TypeScript, Vite, and Supabase.

## 📋 Prerequisites

Before you begin, make sure you have installed:

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [Git](https://git-scm.com/)
- A code editor like [Visual Studio Code](https://code.visualstudio.com/)

## 🚀 Local Installation

### Option 1: With Laragon (Windows)

If you're using Laragon and want the project in `C:\laragon\www\gcanva.art`:

1. **Open a terminal in Laragon**:
   - Click the Laragon menu
   - Select "Terminal" or "CMDER"

2. **Navigate to the www folder**:
   ```bash
   cd C:\laragon\www
   ```

3. **Clone the repository**:
   ```bash
   git clone https://github.com/Pyrrhate/gcanva.art.git
   ```

4. **Enter the project folder**:
   ```bash
   cd gcanva.art
   ```

5. **Install dependencies**:
   ```bash
   npm install
   ```

6. **Open in Visual Studio Code**:
   ```bash
   code .
   ```
   Or manually open VS Code and use `File > Open Folder` to select `C:\laragon\www\gcanva.art`

### Option 2: Standard installation (all systems)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pyrrhate/gcanva.art.git
   cd gcanva.art
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Open in Visual Studio Code**:
   ```bash
   code .
   ```

## 🛠️ Development Commands

### Start the development server
```bash
npm run dev
```
The application will be available at: `http://localhost:5173`

### Lint the code
```bash
npm run lint
```

### Check TypeScript types
```bash
npm run typecheck
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## 📁 Project Structure

```
gcanva.art/
├── src/                # Application source code
│   ├── components/     # React components
│   ├── App.tsx         # Main component
│   └── main.tsx        # Entry point
├── public/             # Static files
├── index.html          # Main HTML page
└── package.json        # Dependencies and scripts
```

## 🔧 Visual Studio Code Configuration

Recommended extensions:
- **ESLint** - JavaScript/TypeScript code analysis and fixing
- **Prettier** - Automatic code formatting
- **Tailwind CSS IntelliSense** - Tailwind CSS autocomplete
- **ES7+ React/Redux/React-Native snippets** - Useful React snippets

## ❓ Troubleshooting

### "npm not found" error
- Make sure Node.js is installed: `node --version`
- Restart your terminal after installing Node.js

### Issues with dependencies
```bash
# Recommended: Use npm ci (preserves package-lock.json)
npm ci

# If the problem persists, clear npm cache
npm cache clean --force
npm ci

# Last resort: Complete reinstall (beware of version changes)
# Windows (PowerShell or CMD)
rmdir /s /q node_modules
del package-lock.json
npm install

# macOS/Linux
rm -rf node_modules package-lock.json
npm install
```

> **⚠️ Security Note**: Deleting `package-lock.json` may install different dependency versions, which could introduce vulnerabilities. Use this method only if the lock file is corrupted.

### Port 5173 is already in use
```bash
# Kill the process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## 🤝 Contributing

1. Create a branch for your feature: `git checkout -b feature/my-feature`
2. Commit your changes: `git commit -m 'Add my feature'`
3. Push to the branch: `git push origin feature/my-feature`
4. Open a Pull Request

## 📄 License

This project is open source.
