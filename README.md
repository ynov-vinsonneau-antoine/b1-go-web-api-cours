# Pokédex · Développement Web & Consommation d'API

Bachelor 1 · trois séances de 4h (les 12h de cours du syllabus A2627_4661).

**Le cours** : construire un site web simple en Go, qui appelle une API
externe (PokéAPI : Pokémon, espèces, types) et affiche ses données dans des
pages HTML.

**La méthode** : du code-along. Les étudiants recopient le code de chaque
slide, lancent, et vérifient qu'ils voient la même capture. Ils n'ont rien à
inventer. Chaque séance ajoute un morceau **visible dans le navigateur**.

> **Pourquoi PokéAPI ?** Le cours était construit sur l'API Groupie Tracker
> (`groupietrackers.herokuapp.com`), qui a été supprimée début novembre 2026
> (404 sur toutes les adresses). Les deux decks ont été adaptés à PokéAPI le
> 08/11/2026, en gardant les mêmes 7 étapes par séance.

| Deck | Séance | À la fin | État |
|---|---|---|---|
| `diapo-1.md` | **La page d'accueil** | les 151 premiers Pokémon en cartes | ✅ écrit, vérifié |
| `diapo-2.md` | **La fiche d'un Pokémon** | une fiche par Pokémon avec son nom français et ses types, et les erreurs (Pokémon introuvable, API en panne) | ✅ écrit, vérifié |
| `diapo-3.md` | **Filtres et graphique** | une recherche, un filtre par type, un graphique des statistiques | à écrire |

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
- Ouvrir https://pokeapi.co/api/v2/pokemon?limit=151 une fois, pour vérifier
  que le réseau de l'école laisse passer `pokeapi.co` et
  `raw.githubusercontent.com` (les images).

## Diapo 1 · La page d'accueil

**40 slides, 7 étapes, 2 pauses.**

| Étape | Ce qu'ils écrivent | Ce qu'ils voient | Slides | Durée |
|---|---|---|---|---|
| | Ouverture : le site final, le schéma, les règles | | 1–4 | 15 min |
| **1** | `go mod init`, un `main.go` | `Le projet marche !` dans le terminal | 5–7 | 20 min |
| **2** | un serveur `net/http` | `Bonjour !` sur `localhost:8080` | 8–11 | 30 min |
| **3** | `templates/index.html` + `html/template` | une page avec un titre | 12–15 | 30 min |
| | Pause | | 16 | 10 min |
| **4** | les structs `Pokemon` et `ListePokemon` + `getPokemons()` | `151 Pokémon` dans le terminal | 17–22 | 45 min |
| **5** | `Execute(w, pokemons)` + `{{range .}}` | les 151 noms dans la page | 23–26 | 25 min |
| | Pause | | 27 | 10 min |
| **6** | le numéro (`ID = i + 1`) + une carte par Pokémon | images, numéros, noms (sans style) | 28–31 | 25 min |
| **7** | `static/style.css` + `http.Handle` | la grille de cartes finale | 32–35 | 20 min |
| | Le projet complet, dépannage, bonus, bilan | | 36–40 | 10 min |
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
- **`/pokemon?limit=151`** : la liste est emballée dans `results`, d'où la
  deuxième struct `ListePokemon`. C'est l'occasion de montrer qu'on décrit
  le JSON tel qu'il est.
- **Le numéro ajouté en Go** (`liste.Results[i].ID = i + 1`) : la liste ne
  donne que le nom et une URL. Elle est dans l'ordre, donc la position suffit.
  Plus simple que de découper l'URL.
- **Les images construites dans le template** à partir du numéro
  (`…/sprites/pokemon/{{.ID}}.png`) : aucune struct à ajouter. Les sprites de
  l'accueil font moins d'un Ko chacun (le Wi-Fi de l'école tient), la grande
  image (`official-artwork`) n'est chargée que sur la fiche.
- **Les noms restent en anglais en séance 1** (c'est la langue de la liste),
  avec `text-transform: capitalize`. Le nom français arrive en séance 2.
- **`json.NewDecoder(resp.Body).Decode(&liste)`** plutôt que
  `io.ReadAll` + `json.Unmarshal` : une ligne au lieu de cinq.
- **`template.Must(template.ParseFiles(…))` dans le handler** : le template
  est relu à chaque visite, donc le HTML se modifie sans relancer Go.
- **`http.Handle("/static/", http.FileServer(http.Dir(".")))`** : sert le
  dossier `static` sans `StripPrefix`.
- **`log.Fatal(http.ListenAndServe(…))`** : sans lui, un port déjà occupé
  fait quitter le programme **sans aucun message**.
- **Pas de gestion des erreurs HTTP** (404, statut, timeout) : c'est la
  séance 2.

### Code vérifié

Les 7 versions du projet (une par étape) ont été compilées (`go vet`),
lancées et photographiées avec Go 1.27 contre la vraie API, le 08/11/2026.
Les captures des slides sont ces vraies pages (`etape-2.png` date de la
version Groupie : la page `Bonjour !` est identique). À l'étape 4, la ligne
`151 Pokémon` peut s'afficher deux fois (le navigateur demande aussi
`/favicon.ico`) : c'est dit dans les notes.

## Diapo 2 · La fiche d'un Pokémon

**48 slides, 7 étapes, 2 pauses.** On repart du dossier `pokedex` de la
séance 1.

| Étape | Ce qu'ils écrivent | Ce qu'ils voient | Slides | Durée |
|---|---|---|---|---|
| | Ouverture : le site final, le rattrapage, le schéma | | 1–5 | 15 min |
| **1** | la route `/pokemon/{id}` + `r.PathValue` | `Pokémon 25` sur `/pokemon/25` | 6–8 | 20 min |
| **2** | un lien `<a>` autour de chaque carte | un clic sur Bulbasaur mène à `/pokemon/1` | 9–11 | 15 min |
| **3** | les structs `Nom`, `Type`, `Pokemon` + `getPokemon(id)` + `templates/fiche.html` | grande image, numéro, nom, types (sans style) | 12–17 | 40 min |
| | Pause | | 18 | 10 min |
| **4** | `Traduction`, `Espece`, `getEspece(id)` (2e endpoint), `nomFrancais`, `PagePokemon` | « Bulbizarre » sur la fiche | 19–25 | 40 min |
| **5** | `erreur()`, test `ID == 0`, `"/{$}"` + `introuvable` | « Oups ! » et un 404 | 26–32 | 30 min |
| | Pause | | 33 | 10 min |
| **6** | `appelerAPI` (timeout, statut, 404) + les `get…` qui renvoient une erreur | sans Wi-Fi : la page d'erreur 500 | 34–40 | 35 min |
| **7** | le CSS `.fiche`, `.types` et `.erreur` | la fiche finale | 41–43 | 10 min |
| | Qui fait quoi, dépannage, 2 bonus, bilan | | 44–48 | 10 min |
| | | | | **≈ 240 min** |

### Avant la séance 2

- Le dépôt [b1-go-web-api-pokedex](https://github.com/ynov-vinsonneau-antoine/b1-go-web-api-pokedex)
  sert de rattrapage, une branche par séance : **`seance-1`** (le projet de
  fin de séance 1, pour ceux qui l'ont perdu, slide 3) et **`seance-2`**
  (celui de fin de séance 2, slide 44). Les deux sont à pousser toi-même
  avant la séance 2.
- L'étape 6 se teste **en coupant le Wi-Fi** : prévenir qu'on le rallume tout
  de suite après.

### Les choix « au plus simple »

- **`r.PathValue("id")`** (Go 1.22) plutôt qu'un `?id=` ou un découpage de
  l'adresse à la main. Bonus gratuit : `/pokemon/pikachu` marche aussi,
  l'API accepte le nom anglais.
- **Les types, premier JSON imbriqué** (`types[].type.name`) : deux petites
  structs, `Nom` et `Type`. `Nom` sert aussi pour la langue des traductions.
- **Le 2e endpoint est `/pokemon-species/{id}`**, pour le nom français :
  l'équivalent des concerts de l'ancienne version. Le français se trouve par
  une boucle dans `nomFrancais`, séparée de `getEspece` pour que `getEspece`
  garde la même forme que les autres `get…` (et se regroupe à l'étape 6).
- **Une struct `PagePokemon`** pour envoyer le Pokémon et son nom français
  au template : on écrit `.Pokemon.ID`. Pas de champ embarqué.
- **Les `get…` d'abord copiés-collés (étapes 3-4), puis regroupés dans
  `appelerAPI` à l'étape 6**, quand on a besoin d'y gérer les erreurs.
- **Le Pokémon introuvable se repère par `ID == 0`** : à l'étape 5, notre
  code lit la réponse 404 de l'API comme un Pokémon, qui reste vide. À
  l'étape 6, `appelerAPI` traite le **404 à part** (`return nil`, résultat
  vide) : ce n'est pas une panne, et le même test `ID == 0` continue de
  marcher. Tout autre code que 200 donne une page 500.
- **Le code d'erreur s'écrit en chiffres** (`404`, `500`) plutôt que
  `http.StatusNotFound` : c'est ce qu'ils voient dans F12.

### Code vérifié

Les 7 versions du projet, plus celle des deux bonus, ont été compilées,
lancées et photographiées avec Go 1.27 contre la vraie API, le 08/11/2026.
Testé : `/pokemon/1`, `/pokemon/pikachu` (200), `/pokemon/9999`,
`/pokemon/abc`, `/nimportequoi` (404), et l'API injoignable (500 sur
l'accueil et la fiche). La capture 6 est prise avec une adresse d'API
volontairement fausse, pour simuler la panne.

## Couverture du syllabus

| Objectif | Séance |
|---|---|
| Consommer une API REST en Go | ✅ 1 (étape 4) |
| Parser et structurer du JSON | ✅ 1 (étape 4) · ✅ JSON imbriqué et plusieurs endpoints : 2 (étapes 3, 4) |
| Templates Go pour du HTML dynamique | ✅ 1 (étapes 3, 5, 6) · ✅ 2 (étapes 3, 4) |
| Séparation frontend/backend | ✅ 1 (Go / templates / static) · ✅ 2 (slide « qui fait quoi ») |
| Erreurs HTTP (404, 500, timeout) | ✅ 2 (étapes 5, 6) |
| Filtres (le syllabus dit : géolocalisation, dates, relations) | 3 : recherche et filtre par type (`/type/{nom}`, la relation Pokémon ↔ type) |
| Visualisations (carte, graphique) | 3 : graphique des statistiques |

PokéAPI n'a pas de géolocalisation : la « carte » du syllabus devient un
graphique. Le filtre par type couvre les « relations entre entités ».

## L'API

`https://pokeapi.co/api/v2` · gratuite, sans clé, sans limite pour un usage
de classe. Vérifiée le 08/11/2026.

| Appel | Réponse |
|---|---|
| `/pokemon?limit=151` | `{"count": 1351, "results": [{"name", "url"}…]}` : pas de numéro, pas d'image |
| `/pokemon/1`, `/pokemon/bulbasaur` | un Pokémon : `id`, `name`, `types`, `stats`… (très long : `moves`) |
| `/pokemon-species/1` | `names` (une traduction par langue, `fr` inclus), `flavor_text_entries` (descriptions) |
| `/pokemon/9999`, `/pokemon/abc`, `/pokemon/0` | **404**, corps `{"status": 404, "message": "Not Found"}` |
| `/pokemonn/1` (faute) | **400**, `Invalid endpoint` |
| images | `raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png` (96 px, < 1 Ko) et `…/pokemon/other/official-artwork/{id}.png` (475 px, ~120 Ko) |
| noms | en anglais, en minuscules (`bulbasaur`, `mr-mime`, `nidoran-f`) |

Un cas limite, sans importance pour le cours : les formes spéciales
(`/pokemon/10001`) existent, mais pas leur espèce sous ce numéro. La fiche
s'affiche alors sans nom français.

## Vérifier un deck · `npm run check:1`, `npm run check:2`

Build le deck, puis ouvre **chaque slide dans chacun de ses états de clic**
dans un Chromium headless et mesure les éléments qui passent sous le bord,
le code qui déborde en largeur, et les encadrés collés. État actuel des
diapos 1 et 2 : **aucun** des trois.

**Lance-le après toute modification** : les slides de code tiennent grâce à
un `<style>` local qui réduit la police. Quand on réduit la police d'un
code, réduire aussi son `line-height`, sinon l'interligne reste grand.

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
- **Les adresses d'images sont longues** (jusqu'à 125 caractères dans
  `fiche.html`) : les slides qui les contiennent mettent le code sur toute
  la largeur.
- La syntaxe des templates Go (`{{range .}}`) passe sans problème, dans le
  code comme dans le texte.
- Pas de balise à chevrons dans une ligne HTML, y compris dans les notes.
- Pas d'apostrophe dans le chemin du dossier : Slidev ne build plus.

### Refaire une capture

Les captures viennent du vrai site, lancé à l'étape voulue, puis photographié
avec Playwright (pages de texte : fenêtre de 480 px de large, zoom ×2, pour
rester lisibles dans une demi-slide). Celles de la séance 2 commencent par
`s2-` (`public/img/s2-etape-N.png`).

## Export

```bash
npm run build:1      # site statique dans dist/diapo-1
npm run export:1     # PDF
```

Les notes présentateur sont incluses dans le site publié. Si tu le publies
pour les élèves, retire d'abord les `<!-- -->`.
