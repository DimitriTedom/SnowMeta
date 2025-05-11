# 📌 SnowMeta — Générateur de Post LinkedIn avec IA

**SnowMeta** est une automatisation basée sur [n8n](https://n8n.io), capable de :
- Extraire l'ID d'une vidéo YouTube,
- Obtenir la transcription complète via Supadata,
- Générer un post LinkedIn structuré et professionnel grâce à un Agent IA (Groq),
- Générer un prompt d’image cohérent basé sur le contenu du post,
- Renvoyer les résultats (post + prompt image) à un site web via Webhook.

---

## 🚀 Fonctionnalités

- 🔗 Entrée d’une **URL YouTube** et d’une **couleur principale**
- 🧠 Analyse intelligente du contenu (via transcription)
- ✍️ Rédaction automatique d’un **post LinkedIn percutant**
- 🖼️ Génération d’un **prompt image** pour illustrer le post
- 🌐 Envoi des résultats à votre application front-end

---

## 🛠️ Installation locale

### 1. Installer n8n

> Prérequis : Node.js ou Docker

```bash
npm install n8n -g
n8n
````

Ou via Docker :

```bash
docker run -it --rm \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

---

### 2. Importer le workflow

* Lancer n8n via `http://localhost:5678`
* Aller dans **Workflows → Import**
* Charger le fichier `SnowMeta.json` fourni

---

### 3. Activer le Webhook

Une fois activé, votre endpoint est accessible en local :

```
POST http://localhost:5678/webhook/generate-post
```

---

## 🧪 Exemple d'appel API (frontend)

```bash
curl -X POST http://localhost:5678/webhook/generate-post \
  -H "Content-Type: application/json" \
  -d '{
    "videoUrl": "https://www.youtube.com/watch?v=XXXXXXX",
    "color": "#5521B0"
  }'
```

✅ Réponse JSON attendue :

```json
{
  "post": "Texte LinkedIn généré",
  "imagePrompt": "Prompt d'image généré"
}
```

---

## 📦 Technologies utilisées

* 🧩 [n8n](https://n8n.io/) — Moteur d’automatisation open-source
* 🧠 [Groq / LLaMA](https://groq.com) — Génération de texte (via Agent IA)
* 📹 [Supadata](https://supadata.ai) — Récupération de transcription YouTube
* 🎨 Google Gemini (ou autre) — Génération de prompts d’image

---

## 🔒 Sécurité

* Ajoutez une vérification (`API Key`, `Authorization`) dans le webhook si exposé publiquement.
* Utilisez un proxy ou tunnel (`ngrok`, `localtunnel`) pour test externe sécurisé.

---

## ✨ Auteurs

**SnowDev Tech Services**
Développeur Web MERN Stack | Formateur IA | Automatisations créatives
🌐
