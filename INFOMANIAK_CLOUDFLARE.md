# 🔗 CONNECTER DOMAINE INFOMANIAK À CLOUDFLARE PAGES

## 🎯 Situation

- ✅ Domaine acheté chez Infomaniak
- ✅ Site déployé sur Cloudflare Pages
- ❌ Impossible de changer les nameservers DNS chez Infomaniak
- ✅ **Solution : Utiliser des enregistrements CNAME**

---

## 📋 Méthode : CNAME Records (Recommandé)

### Étape 1 : Obtenir l'URL Cloudflare Pages

1. Allez sur [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Workers & Pages** → Sélectionnez votre projet
3. **Custom domains** → **Set up a custom domain**
4. Entrez votre domaine : `gcanva.art`
5. Cloudflare vous donnera des instructions avec une URL comme :
   ```
   gcanva-art.pages.dev
   ```

---

### Étape 2 : Configuration DNS chez Infomaniak

1. Connectez-vous à [manager.infomaniak.com](https://manager.infomaniak.com)
2. Allez dans **Domaines & DNS**
3. Sélectionnez votre domaine : `gcanva.art`
4. Cliquez sur **Zone DNS** ou **Gérer les DNS**

---

### Étape 3 : Ajouter les Enregistrements

#### Pour le domaine principal (gcanva.art)

**Option A : Si CNAME est autorisé sur le domaine racine**

```
Type:  CNAME
Nom:   @  (ou laissez vide)
Cible: gcanva-art.pages.dev
TTL:   3600
```

**Option B : Si CNAME n'est pas autorisé (plus probable)**

Utilisez des **enregistrements A** :

```
Type:  A
Nom:   @  (ou laissez vide)
IPv4:  [IP fournie par Cloudflare]
TTL:   3600
```

Cloudflare vous donnera les IPs dans l'interface. Généralement :
- `172.64.155.XXX`
- `172.64.156.XXX`

Ajoutez **TOUS** les enregistrements A fournis par Cloudflare.

---

#### Pour www (www.gcanva.art)

```
Type:  CNAME
Nom:   www
Cible: gcanva-art.pages.dev
TTL:   3600
```

---

### Étape 4 : Configuration Complète

Voici ce que vous devriez avoir dans votre zone DNS Infomaniak :

```
Domaine racine (gcanva.art):
Type   Nom    Cible/IP
----------------------------------------
A      @      172.64.155.XXX  (IP 1)
A      @      172.64.156.XXX  (IP 2)

Sous-domaine www:
Type   Nom    Cible
----------------------------------------
CNAME  www    gcanva-art.pages.dev
```

---

### Étape 5 : Vérification

1. Sauvegardez les changements DNS chez Infomaniak
2. Retournez sur Cloudflare Pages
3. Cloudflare vérifiera automatiquement les DNS (peut prendre 5-10 min)
4. Une fois validé, SSL sera automatiquement configuré

---

## ⏱️ Délais de Propagation

- **Chez Infomaniak :** Changements immédiats (5-15 min)
- **Propagation DNS mondiale :** 1-48h (généralement 2-6h)
- **SSL Cloudflare :** Automatique après validation DNS

---

## ✅ Tester la Configuration

### Avant la propagation complète

Vérifiez les DNS avec :

```bash
# Windows PowerShell
nslookup gcanva.art 8.8.8.8
nslookup www.gcanva.art 8.8.8.8
```

Vous devriez voir les IPs Cloudflare (172.64.x.x) apparaître.

### Après propagation

Visitez :
- `https://gcanva.art`
- `https://www.gcanva.art`

Les deux devraient afficher votre site !

---

## 🔧 Configuration Détailée Infomaniak

### Accéder à la Zone DNS Infomaniak

1. **Manager Infomaniak** → https://manager.infomaniak.com
2. **Domaines & DNS** (menu gauche)
3. Cliquez sur votre domaine `gcanva.art`
4. **Zone DNS** ou **Gérer DNS**
5. **Ajouter un enregistrement**

### Supprimer les anciens enregistrements (si nécessaire)

Si vous aviez déjà des enregistrements A ou CNAME :
1. Supprimez les anciens enregistrements `@` et `www`
2. Ajoutez les nouveaux (voir Étape 3)

---

## 🆘 Si CNAME n'est pas autorisé pour @

Certains registrars (dont Infomaniak parfois) ne permettent pas CNAME sur le domaine racine.

**Solution : Utiliser CNAME Flattening (Infomaniak le supporte)**

Si disponible :
1. Cherchez l'option **"CNAME Flattening"** ou **"ALIAS"**
2. Créez un enregistrement **ALIAS** ou **ANAME** :
   ```
   Type:  ALIAS (ou ANAME)
   Nom:   @
   Cible: gcanva-art.pages.dev
   ```

Si pas disponible, utilisez les enregistrements A (Option B de l'Étape 3).

---

## 📸 Captures d'Écran Infomaniak (Guide Visuel)

### Zone DNS devrait ressembler à :

```
┌─────────────────────────────────────────────────┐
│ Type    Nom    Valeur/Cible         TTL         │
├─────────────────────────────────────────────────┤
│ A       @      172.64.155.XXX       3600        │
│ A       @      172.64.156.XXX       3600        │
│ CNAME   www    gcanva-art.pages.dev 3600        │
└─────────────────────────────────────────────────┘
```

---

## ⚡ Alternative : Cloudflare comme Registrar DNS (Avancé)

Si vous voulez vraiment utiliser les nameservers Cloudflare :

### Option 1 : Transférer le Domaine
Transférez le domaine d'Infomaniak vers Cloudflare Registrar
- Coût : Prix du domaine (généralement moins cher)
- Avantage : Tout géré sur Cloudflare

### Option 2 : Contacter Infomaniak
Parfois le changement de nameservers est bloqué temporairement
- Contactez le support Infomaniak
- Demandez à débloquer les nameservers
- Nameservers Cloudflare :
  ```
  ivan.ns.cloudflare.com
  reza.ns.cloudflare.com
  ```

---

## 🎯 Récapitulatif Simple

### Chez Cloudflare Pages
1. Demander à ajouter domaine custom
2. Noter l'URL `.pages.dev` OU les IPs fournies

### Chez Infomaniak
3. Aller dans Zone DNS
4. Ajouter les enregistrements A pour `@`
5. Ajouter CNAME pour `www`
6. Sauvegarder

### Attendre
7. Propagation DNS (2-6h généralement)
8. Validation automatique Cloudflare
9. SSL activé automatiquement

---

## ✅ Checklist

- [ ] Déployé sur Cloudflare Pages
- [ ] Domaine custom demandé sur Cloudflare
- [ ] IPs Cloudflare notées
- [ ] Connexion Infomaniak Manager
- [ ] Zone DNS Infomaniak ouverte
- [ ] Enregistrements A ajoutés pour `@`
- [ ] CNAME ajouté pour `www`
- [ ] Changements sauvegardés
- [ ] Test DNS (nslookup)
- [ ] Attendre propagation (2-6h)
- [ ] Vérifier site en ligne
- [ ] SSL actif (cadenas vert)

---

## 🆘 Problèmes Courants

### "Les enregistrements ne sont pas détectés"
- Attendez 15-30 minutes
- Videz le cache DNS : `ipconfig /flushdns` (Windows)
- Retestez avec nslookup

### "Site inaccessible après 24h"
- Vérifiez que TOUS les enregistrements A sont ajoutés
- Vérifiez l'orthographe de l'URL `.pages.dev`
- Contactez support Cloudflare (chat gratuit)

### "SSL non actif"
- SSL prend 10-30 min après validation DNS
- Force HTTPS dans Cloudflare : Settings → SSL → Full (strict)

---

## 📞 Support

**Infomaniak Support :**
- https://www.infomaniak.com/support
- Chat en ligne disponible

**Cloudflare Support :**
- https://dash.cloudflare.com/?to=/:account/support
- Forum communautaire très actif

---

**Besoin d'aide sur une étape ? Dites-moi où vous bloquez !** 🚀
