# 🚀 DÉPLOYER SUR NETLIFY

## 📋 Prérequis

- ✅ GitHub account (vous l'avez)
- ✅ Code pushé sur GitHub (fait !)
- ✅ Compte Netlify free (créer si nécessaire)

---

## 🔗 OPTION 1 : Déploiement automatique (RECOMMANDÉ)

### Étape 1 : Se connecter à Netlify
1. Allez sur [netlify.com](https://netlify.com)
2. Cliquez **"Sign up"** (ou connectez-vous si vous avez un compte)
3. Choisissez **"GitHub"** pour vous connecter avec votre compte GitHub

### Étape 2 : Créer un nouveau site
1. Cliquez sur **"New site from Git"**
2. Sélectionnez **"GitHub"**
3. Cherchez et sélectionnez : **`Pyrrhate/gcanva.art`**

### Étape 3 : Configurer les paramètres de build
Netlify devrait détecter automatiquement, mais vérifiez:

```
Build command:     npm run build
Publish directory: dist
```

**NOTE:** Si c'est un Vite project (votre cas), les paramètres par défaut devraient être:
- Build: `npm run build`
- Publish: `dist`

### Étape 4 : Cliquez "Deploy site"
Netlify va :
- ✅ Cloner votre repo
- ✅ Installer les dépendances (`npm install`)
- ✅ Compiler (`npm run build`)
- ✅ Déployer sur leur serveur

### Résultat
1. Vous obtenez une URL auto-générée : `xxxxx.netlify.app`
2. Chaque `git push` déclenche un nouveau déploiement automatique
3. C'est gratuit et illimité pour un site statique

---

## 🔧 OPTION 2 : Déploiement manuel (sans GitHub)

Si vous préférez déployer manuellement sans GitHub:

### Étape 1 : Compiler localement
```bash
npm run build
```

### Étape 2 : Drag & drop sur Netlify
1. Aller sur [netlify.com](https://netlify.com)
2. Aller à "Deploys"
3. Drag & drop le dossier **`dist`** généré
4. Voilà, c'est déployé !

**Inconvénient:** Vous devez faire ça à chaque mise à jour manuelle

---

## ⚙️ CONFIGURATION AVANCÉE (Optionnel)

### Changer le domaine
1. Dans Netlify, allez à **Site settings**
2. **Domain management**
3. Changez le nom du site (avant `.netlify.app`)
4. Ou connectez votre propre domaine (ex: gcanva.art)

### Variables d'environnement
Si vous aviez des secrets (API keys, etc.):
1. **Site settings** → **Build & deploy** → **Environment**
2. **Edit variables** et ajoutez les clés/valeurs

### Redirection & Rewrites (pour React Router)
Si vous aviez du routage complexe plus tard:
1. Créer un fichier `public/_redirects`:
```
/* /index.html 200
```

---

## 🔗 CONNECTER VOTRE DOMAINE (gcanva.art)

Si vous voulez utiliser votre propre domaine:

### Avec Netlify DNS (RECOMMANDÉ)
1. **Site settings** → **Domain management**
2. **Add custom domain** → entrez `gcanva.art`
3. Suivez les instructions pour changer les nameservers chez votre registrar

### Avec votre registrar actuel
1. Aller chez votre registrar (OVH, GoDaddy, etc.)
2. Créer des **CNAME records** pointant vers Netlify
3. Instructions détaillées données par Netlify

---

## 🚀 WORKFLOW FINAL

### À chaque mise à jour:
```bash
# 1. Faire vos changements
# 2. Commit & push
git add .
git commit -m "description"
git push origin main

# 3. Netlify déploie automatiquement ! ✅
```

C'est tout ! Pas besoin de faire autre chose. Netlify fait le reste.

---

## ✅ CHECKLIST NETLIFY

- [ ] Créer/se connecter à netlify.com
- [ ] Se connecter avec GitHub
- [ ] Cliquer "New site from Git"
- [ ] Sélectionner `Pyrrhate/gcanva.art`
- [ ] Vérifier config de build (npm run build + dist)
- [ ] Cliquer "Deploy site"
- [ ] Attendre que le build termine (5-10 min)
- [ ] Tester le lien `xxxxx.netlify.app`
- [ ] Optionnel: Changer le domaine
- [ ] Optionnel: Connecter gcanva.art

---

## 📊 AVANTAGES NETLIFY

✅ Gratuit pour sites statiques  
✅ Déploiement automatique à chaque push  
✅ SSL/HTTPS automatique  
✅ CDN global ultra-rapide  
✅ Logs de build détaillés  
✅ Aperçu des PR (deploy preview)  
✅ Rollback simplement  

---

## 🆘 SI ÇA NE MARCHE PAS

### Build échoue ?
1. Vérifier les **Build logs** dans Netlify (très détaillé)
2. Vérifier que `npm run build` marche localement : `npm run build`
3. Vérifier que le dossier `dist` existe après build

### Site blanc/erreur ?
1. Vérifier que tout fonctionne localement : `npm run dev`
2. Vérifier les **Browser console** (F12) pour erreurs
3. Vérifier les chemins d'images (commencent par `/`)

### Images n'apparaissent pas ?
Assurez-vous que :
- [ ] Les images sont dans `public/images/`
- [ ] Les chemins dans le code commencent par `/images/`
- [ ] Exémple: `/images/mon-projet/image.jpg`

---

## 🎯 RÉSUMÉ RAPIDE

| Étape | Action |
|-------|--------|
| 1 | Aller sur [netlify.com](https://netlify.com) |
| 2 | "Sign up with GitHub" |
| 3 | "New site from Git" |
| 4 | Sélectionner `Pyrrhate/gcanva.art` |
| 5 | Config auto (verifier) |
| 6 | "Deploy site" |
| 7 | Attendre (5-10 min) |
| 8 | ✅ Site en ligne ! |

---

## 🔄 INTÉGRATION CONTINUE

Après le setup, voici le workflow:

```
Vous faites:                Netlify fait:
git push origin main   →    Détecte les changements
                       →    npm install
                       →    npm run build
                       →    Teste le build
                       →    Déploie automatiquement
                       →    ✅ Site à jour !
```

**Aucune intervention manuelle après le premier setup !**

---

## 💡 TIPS

- Mettez à jour `src/data/projects.ts` avec vos vrais projets avant le 1er déploiement
- Testez en local : `npm run dev`
- Compilez : `npm run build`
- Prévisualisez : `npm run preview`

---

Vous avez besoin d'aide pour une étape ? Demandez-moi ! 🚀
