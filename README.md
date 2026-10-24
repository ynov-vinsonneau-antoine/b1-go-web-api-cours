# Groupie Tracker · Développement Web & Consommation d'API

Bachelor 1 · trois séances de 4h (les 12h de cours du syllabus A2627_4661).

**Le cours** : construire un site web simple en Go, qui appelle une API
externe (Groupie Tracker : artistes, concerts, lieux) et affiche ses données
dans des pages HTML.

**La méthode** : du code-along. Les étudiants recopient le code de chaque
slide, lancent, et vérifient qu'ils voient la même capture. Ils n'ont rien à
inventer. Chaque séance ajoute un morceau **visible dans le navigateur**.

| Deck | Séance | À la fin | État |
|---|---|---|---|
| `diapo-1.md` | **La page d'accueil** | les 52 artistes en cartes | ✅ écrit, vérifié |
| `diapo-2.md` | **La page d'un artiste** | une page par artiste avec ses concerts, et les erreurs (artiste introuvable, API en panne) | ✅ écrit, vérifié |
| `diapo-3.md` | **Filtres et carte** | une recherche, des filtres, une carte des concerts | à écrire |

## Lancer

```bash
npm install
npm run dev:1        # http://localhost:3030
npm run dev:2        # la séance 2
```

`http://localhost:3030/presenter` sur ton écran (les notes), `http://localhost:3030`
sur le vidéoprojecteur. Touche `d` : thème clair / sombre.

## Avant la séance 1

- **Installer Go 1.22 ou plus** sur ton poste (https://go.dev/dl/), et faire
  vérifier les postes des étudiants (`go version`).
- **Faire le projet une fois toi-même** en suivant les slides : 30 minutes,
  et tu connaîtras chaque piège.
- Ouvrir https://groupietrackers.herokuapp.com/api/artists une fois : l'API
  est sur Heroku, le premier appel peut prendre 2-3 secondes.

## Diapo 1 · La page d'accueil

**39 slides, 7 étapes, 2 pauses.**

| Étape | Ce qu'ils écrivent | Ce qu'ils voient | Slides | Durée |
|---|---|---|---|---|
| | Ouverture : le site final, le schéma, les règles | | 1–4 | 15 min |
| **1** | `go mod init`, un `main.go` | `Le projet marche !` dans le terminal | 5–7 | 20 min |
| **2** | un serveur `net/http` | `Bonjour !` sur `localhost:8080` | 8–11 | 30 min |
| **3** | `templates/index.html` + `html/template` | une page avec un titre | 12–15 | 30 min |
| | Pause | | 16 | 10 min |
| **4** | la struct `Artist` + `getArtists()` | `52 artistes` dans le terminal | 17–22 | 45 min |
| **5** | `Execute(w, artists)` + `{{range .}}` | les 52 noms dans la page | 23–26 | 25 min |
| | Pause | | 27 | 10 min |
| **6** | une carte par artiste | photos, années, membres (sans style) | 28–30 | 20 min |
| **7** | `static/style.css` + `http.Handle` | la grille de cartes finale | 31–34 | 25 min |
| | Le projet complet, dépannage, bonus, bilan | | 35–39 | 10 min |
| | | | | **≈ 240 min** |

### Le format de chaque étape

1. Une slide d'étape : où on en est (les 7 étapes, celle du jour en violet)
   et ce qu'on verra à la fin.
2. Les slides de code : le **nom du fichier** en violet au-dessus du code, et
   ce qu'il faut ajouter ou remplacer.
3. Une slide « Vous devez voir » : une **vraie capture** du site à cette
   étape (`public/img/etape-N.png`).

### La règle qui évite la moitié des « ça marche pas »

Slide 11, à faire répéter :

- **`main.go` modifié** → `Ctrl+C`, `go run .`, `F5`
- **`.html` ou `.css` modifié** → `F5` suffit (le template est relu à chaque
  visite)

### Les choix « au plus simple »

- **Un seul fichier Go**, `main.go`. Pas de packages.
- **`json.NewDecoder(resp.Body).Decode(&artists)`** plutôt que
  `io.ReadAll` + `json.Unmarshal` : une ligne au lieu de cinq.
- **`template.Must(template.ParseFiles(…))` dans le handler** : le template
  est relu à chaque visite, donc le HTML se modifie sans relancer Go.
- **`http.Handle("/static/", http.FileServer(http.Dir(".")))`** : sert le
  dossier `static` sans `StripPrefix`.
- **`log.Fatal(http.ListenAndServe(…))`** : sans lui, un port déjà occupé
  fait quitter le programme **sans aucun message**. Avec lui, l'étudiant lit
  `bind: Only one usage of each socket address`.
- **Pas de gestion des erreurs HTTP** (404, statut, timeout) : c'est la
  séance 2. En séance 1, une API injoignable affiche juste `Erreur : …` dans
  le terminal.

### Code vérifié

Les 7 versions du projet (une par étape) ont été compilées, lancées et
photographiées avec Go 1.27 contre la vraie API, le 20/10/2026. Les captures
des slides sont ces vraies pages. Les messages d'erreur de la slide « Ça ne
marche pas ? » ont été reproduits sur Windows.

## Diapo 2 · La page d'un artiste

**45 slides, 7 étapes, 2 pauses.** On repart du dossier `groupie` de la
séance 1.

| Étape | Ce qu'ils écrivent | Ce qu'ils voient | Slides | Durée |
|---|---|---|---|---|
| | Ouverture : le site final, le rattrapage, le schéma | | 1–5 | 15 min |
| **1** | la route `/artiste/{id}` + `r.PathValue` | `Artiste 3` sur `/artiste/3` | 6–8 | 25 min |
| **2** | un lien `<a>` autour de chaque carte | un clic sur Queen mène à `/artiste/1` | 9–11 | 15 min |
| **3** | `getArtist(id)` + `templates/artiste.html` | photo, nom, album, membres (sans style) | 12–16 | 40 min |
| | Pause | | 17 | 10 min |
| **4** | `getConcerts(id)` (2e endpoint) + struct `PageArtiste` | la liste des concerts | 18–23 | 40 min |
| **5** | `erreur()`, test `ID == 0`, `"/{$}"` + `introuvable` | « Oups ! » et un 404 | 24–30 | 30 min |
| | Pause | | 31 | 10 min |
| **6** | `appelerAPI` (timeout, statut) + les `get…` qui renvoient une erreur | sans Wi-Fi : la page d'erreur 500 | 32–38 | 35 min |
| **7** | le CSS `.fiche` et `.erreur` | la fiche finale | 39–41 | 10 min |
| | Qui fait quoi, dépannage, bonus, bilan | | 42–45 | 10 min |
| | | | | **≈ 240 min** |

### Avant la séance 2

- Le dépôt [b1-go-web-api-groupie](https://github.com/ynov-vinsonneau-antoine/b1-go-web-api-groupie)
  a deux points de repère : le **tag `seance-1`** (le projet de fin de séance 1,
  pour ceux qui l'ont perdu, slide 3) et la **branche `seance-2`** (le projet de
  fin de séance 2, slide 42).
- L'étape 6 se teste **en coupant le Wi-Fi** : prévenir qu'on le rallume tout
  de suite après.

### Les choix « au plus simple »

- **`r.PathValue("id")`** (Go 1.22) plutôt qu'un `?id=` ou un découpage de
  l'adresse à la main.
- **`/api/relation/{id}`** pour les concerts : les lieux et les dates d'un
  coup, au lieu de croiser `/locations` et `/dates`.
- **Une struct `PageArtiste`** pour envoyer l'artiste et ses concerts au
  template : on écrit `.Artist.Name`. Pas de champ embarqué, qui
  permettrait `.Name` mais demanderait une explication de plus.
- **Les `get…` d'abord copiés-collés (étapes 3-4), puis regroupés dans
  `appelerAPI` à l'étape 6**, quand on a besoin d'y gérer les erreurs. Les
  élèves voient pourquoi on regroupe.
- **L'artiste introuvable se repère par `ID == 0`** : l'API répond 200 avec
  un artiste vide (voir « L'API » plus bas).
- **Les lieux restent bruts** (`los_angeles-usa`) : on les nettoie en
  séance 3, avec les filtres.
- **Le code d'erreur s'écrit en chiffres** (`404`, `500`) plutôt que
  `http.StatusNotFound` : c'est ce qu'ils voient dans F12.

### Code vérifié

Les 7 versions du projet ont été compilées, lancées et photographiées avec
Go 1.27 contre la vraie API, le 24/10/2026. Chaque ligne de code des slides
existe dans ces versions (vérifié par un script). Testé : `/artiste/1`, `/999`,
`/abc`, une adresse inconnue (404), l'API injoignable et une API qui répond
404 (500). Les messages de la slide « Ça ne marche pas ? » (`panic … conflicts`,
`assignment mismatch`, `undefined: time`) ont été reproduits.

## Couverture du syllabus

| Objectif | Séance |
|---|---|
| Consommer une API REST en Go | ✅ 1 (étape 4) |
| Parser et structurer du JSON | ✅ 1 (étape 4) · ✅ plusieurs endpoints : 2 (étapes 3, 4) |
| Templates Go pour du HTML dynamique | ✅ 1 (étapes 3, 5, 6) · ✅ 2 (étapes 3, 4) |
| Séparation frontend/backend | ✅ 1 (Go / templates / static) · ✅ 2 (slide « qui fait quoi ») |
| Erreurs HTTP (404, 500, timeout) | ✅ 2 (étapes 5, 6) |
| Filtres (géolocalisation, dates, relations) | 3 |
| Visualisations (carte, graphique) | 3 |

## L'API

`https://groupietrackers.herokuapp.com/api` · 52 artistes.

Ses bizarreries, utiles pour les séances 2 et 3 (vérifiées le 20/10/2026) :

| Appel | Réponse |
|---|---|
| `/api/artists/999` | **200** avec un artiste vide (`id: 0`), pas un 404 |
| `/api/artists/abc`, `/api/relation/999` | pareil : **200** avec un objet vide |
| `/api/artistes` (faute) | **404**, corps `404 page not found` |
| `/api/relation` (sans id) | le tableau est emballé : `{"index": [...]}` |
| lieux | `los_angeles-usa`, sans coordonnées GPS |
| `firstAlbum` | un **texte** `"14-12-1973"`, pas une date |

## Vérifier un deck · `npm run check:1`, `npm run check:2`

Build le deck, puis ouvre **chaque slide dans chacun de ses états de clic**
dans un Chromium headless et mesure les éléments qui passent sous le bord,
le code qui déborde en largeur, et les encadrés collés. État actuel des
diapos 1 et 2 : **aucun** des trois.

**Lance-le après toute modification** : les slides de code tiennent grâce à
un `<style>` local qui réduit la police.

## Éditer les slides

- **Jamais de contraste baissé** : pas de texte gris, pas d'`opacity`, pas de
  filigrane. Ça devient illisible à l'export PDF. On hiérarchise par la
  taille, le gras ou un encadré. Pour la même raison, **pas de surbrillance
  de lignes** dans le code (`{1|2-3}`) : Slidev pâlit les autres lignes.
- **Couleurs : toujours une variable** `var(--gt-…)`, définie deux fois dans
  `style.css` (`:root` pour le clair, `html.dark` pour le sombre).
- Le code utilise les thèmes `github-light` / `github-dark`
  (`setup/shiki.ts`), plus contrastés que ceux par défaut.
- Classes : `.file` (nom du fichier au-dessus d'un code), `.browser` +
  `.browser-bar` (capture du site), `.term` (terminal), `.steps` (les 7
  étapes, `.on` pour celle du jour), `.step-num`, `.box` + `.good` / `.info` /
  `.trap` / `.bad`, `.tag`, `.kbd`, `.flow`, `.big`.
- **Dans un `.term`, un retour à la ligne s'écrit `<br/>`** : Vue fusionne
  les espaces.
- **Ligatures désactivées** sur tout le code (`style.css`) : JetBrains Mono
  dessinait `!=` comme `≠` et `:=` comme un seul signe, et un étudiant qui
  recopie taperait le mauvais caractère. Ne pas les réactiver.
- La syntaxe des templates Go (`{{range .}}`) passe sans problème, dans le
  code comme dans le texte.
- Pas de balise à chevrons dans une ligne HTML, y compris dans les notes.
- Pas d'apostrophe dans le chemin du dossier : Slidev ne build plus.

### Refaire une capture

Les captures viennent du vrai site, lancé à l'étape voulue, puis photographié
avec Playwright (pages de texte : fenêtre de 480 px de large, zoom ×2, pour
rester lisibles dans une demi-slide). Celles de la séance 2 commencent par
`s2-` (`public/img/s2-etape-N.png`) ; la 6 est prise avec une adresse d'API
volontairement fausse, pour simuler la panne.

## Export

```bash
npm run build:1      # site statique dans dist/diapo-1
npm run export:1     # PDF
```

Les notes présentateur sont incluses dans le site publié. Si tu le publies
pour les élèves, retire d'abord les `<!-- -->`.
