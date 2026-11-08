---
theme: default
title: "Pokédex · Séance 1 · La page d'accueil"
info: |
  ## Pokédex · Séance 1
  Un site web en Go qui affiche les Pokémon d'une API.
  Cours 4h · Bachelor 1
class: text-center
transition: slide-left
colorSchema: auto
highlighter: shiki
lineNumbers: false
mdc: true
fonts:
  sans: Outfit
  mono: JetBrains Mono
  weights: '400,600,700,800'
drawings:
  persist: false
---

<div class="tag mb-6">Go · Séance 1 sur 3</div>

# Pokédex

<p class="big">Aujourd'hui : la page d'accueil du site,<br/>avec les Pokémon d'une vraie API</p>

<div class="abs-br m-6 text-sm">
  <span class="kbd">→</span> avancer · <span class="kbd">d</span> thème clair / sombre
</div>

<!--
Le cours entier est un "code-along" : les étudiants recopient le code de
chaque slide, lancent, et vérifient qu'ils voient la même capture. Ils n'ont
rien à inventer.

Le dire tout de suite : "vous n'avez pas besoin de comprendre chaque mot de
Go aujourd'hui. Vous suivez les slides, et à la fin vous avez un site."
-->

---

# Ce qu'on construit aujourd'hui

<div class="grid grid-cols-5 gap-6 mt-2 text-left">

<div class="col-span-3">
<div class="browser">
  <div class="browser-bar">localhost:8080</div>
  <img src="/img/etape-7.png" />
</div>
</div>

<div class="col-span-2">

Un **site web**, écrit en **Go**, qui affiche les **151 premiers Pokémon**
d'une API.

Les données (noms, numéros, images) ne sont pas dans votre code : votre site
**va les chercher sur Internet**, à chaque visite.

<div class="box info mt-5">
<span class="box-label">Les prochaines séances</span>

**Séance 2** : la fiche de chaque Pokémon, avec son nom en français.<br/>
**Séance 3** : une recherche, des filtres, un graphique.

</div>

</div>

</div>

<!--
C'est une vraie capture du site qu'ils auront à la fin de la séance. Le
montrer en direct si tu as fait le projet avant (recommandé).
-->

---

# Comment ça marche

<div class="flow mt-8">
  <div class="flow-node"><b>Le navigateur</b>demande la page</div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><b>Votre programme Go</b>va chercher les Pokémon</div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><b>L'API</b>renvoie la liste des Pokémon</div>
</div>

<div class="text-left mt-10">

1. Le navigateur demande la page à **votre programme Go**
2. Go demande la liste des Pokémon à **l'API** PokéAPI
3. Go range les Pokémon dans une **page HTML**, et la renvoie au navigateur

</div>

<div class="box good mt-6 text-left">

Une **API**, c'est un site qui ne renvoie pas des pages, mais des **données**.
Votre programme les récupère, puis les met en forme.

</div>

<!--
Le seul schéma de la séance. Y revenir à l'étape 4 ("on est ici : Go va
chercher les Pokémon").

PokéAPI (pokeapi.co) est gratuite, sans clé, et très utilisée : elle tient
la charge d'une salle entière.

POUR TOI : c'est exactement un serveur Nest qui appelle une API externe avec
fetch et renvoie une vue. Go fait le serveur ET le rendu HTML (comme un SSR).
-->

---

# Les 7 étapes

<div class="steps mt-6">
  <div><b>1</b>Créer le projet</div>
  <div><b>2</b>Un serveur web</div>
  <div><b>3</b>Une page HTML</div>
  <div><b>4</b>Appeler l'API</div>
  <div><b>5</b>Les noms dans la page</div>
  <div><b>6</b>Une carte par Pokémon</div>
  <div><b>7</b>Le CSS</div>
</div>

<div class="box info mt-10 text-left">
<span class="box-label">À chaque étape</span>

1. Vous **écrivez** le code de la slide, dans le fichier indiqué en violet
2. Vous **lancez**
3. Vous **vérifiez** que vous voyez la même chose que sur la slide

</div>

<div class="box trap mt-4 text-left">
<span class="box-label">Tapez le code</span>

Ne le copiez-collez pas : c'est en le tapant qu'on le retient.

</div>

<!--
Si la salle a du retard, autoriser le copier-coller à partir de l'étape 6
(le HTML et le CSS sont longs à taper et n'apprennent pas grand-chose).
-->

---
class: text-center
---

<div class="step-num">Étape 1</div>

# Créer le projet

<div class="steps mt-6">
  <div class="on"><b>1</b>Créer le projet</div>
  <div><b>2</b>Un serveur web</div>
  <div><b>3</b>Une page HTML</div>
  <div><b>4</b>Appeler l'API</div>
  <div><b>5</b>Les noms dans la page</div>
  <div><b>6</b>Une carte par Pokémon</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : le terminal affiche <code>Le projet marche !</code></p>

---

# Créez le dossier du projet

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

Dans un terminal :

```bash
go version
```

Il faut **go1.22** ou plus. Sinon, installez Go : [go.dev/dl](https://go.dev/dl/)

```bash
mkdir pokedex
cd pokedex
go mod init pokedex
code .
```

</div>

<div>

| Commande | Ce qu'elle fait |
| --- | --- |
| `mkdir pokedex` | crée le dossier |
| `cd pokedex` | entre dedans |
| `go mod init pokedex` | déclare un projet Go nommé `pokedex` (crée `go.mod`) |
| `code .` | ouvre le dossier dans VS Code |

<div class="box trap mt-6">
<span class="box-label">Toujours dans ce dossier</span>

Toutes les commandes de la séance se lancent **dans le dossier `pokedex`**.

</div>

</div>

</div>

<!--
go mod init ≈ npm init. go.mod ≈ package.json.

Le dossier s'écrit "pokedex", sans accent : un accent dans un nom de dossier
ou de module pose des problèmes.

Si "code ." ne marche pas : ouvrir VS Code à la main, Fichier > Ouvrir le
dossier > pokedex.

Conseiller l'extension Go de VS Code (éditeur Go Team at Google) : elle
ajoute toute seule les imports à l'enregistrement. Pratique, mais le cours
dit toujours quoi importer, donc elle n'est pas obligatoire.
-->

---

# Créez le fichier `main.go`

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

<div class="file">main.go</div>

```go
package main

import "fmt"

func main() {
	fmt.Println("Le projet marche !")
}
```

</div>

<div>

Puis, dans le terminal :

```bash
go run .
```

<div class="box good mt-4">
<span class="box-label">Vous devez voir</span>

<div class="term"><span class="prompt">$</span> go run .<br/>Le projet marche !</div>

</div>

<div class="box info mt-4">

`go run .` compile et lance le projet du dossier où vous êtes. Le point veut
dire « ici ».

</div>

</div>

</div>

<!--
Erreur classique : "go.mod file not found". Ils ne sont pas dans le dossier
pokedex. cd pokedex.

Si quelqu'un a une erreur ici, la régler AVANT de passer à l'étape 2 : tout
le reste en dépend.
-->

---
class: text-center
---

<div class="step-num">Étape 2</div>

# Un serveur web

<div class="steps mt-6">
  <div><b>1</b>Créer le projet</div>
  <div class="on"><b>2</b>Un serveur web</div>
  <div><b>3</b>Une page HTML</div>
  <div><b>4</b>Appeler l'API</div>
  <div><b>5</b>Les noms dans la page</div>
  <div><b>6</b>Une carte par Pokémon</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : votre navigateur affiche <code>Bonjour !</code> à l'adresse <code>localhost:8080</code></p>

---

# Remplacez tout le contenu de `main.go`

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-3">

<div class="file">main.go</div>

```go
package main

import (
	"fmt"
	"log"
	"net/http"
)

func accueil(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Bonjour !")
}

func main() {
	http.HandleFunc("/", accueil)

	fmt.Println("Serveur lancé sur http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
```

</div>

<div class="col-span-2 text-left">

**`accueil`** : la fonction qui répond quand on visite le site. Ce qu'elle
écrit dans `w` est envoyé au navigateur.

**`http.HandleFunc("/", accueil)`** : quand on demande la page `/`, appeler
`accueil`.

**`http.ListenAndServe(":8080", nil)`** : démarre le serveur sur le port
`8080`. Il tourne jusqu'à ce qu'on l'arrête.

**`log.Fatal(…)`** : si le serveur ne peut pas démarrer, affiche pourquoi.

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.68rem !important; }
</style>

<!--
Lire les quatre explications de droite, une par une, en montrant la ligne
dans le code. Pas plus : r (la requête) sera utile en séance 2.

POUR TOI :
- http.HandleFunc("/", accueil) ≈ @Get('/') dans un contrôleur Nest
- w (ResponseWriter) ≈ res, r (*Request) ≈ req
- ListenAndServe ≈ app.listen(8080)
-->

---

# Lancez, puis ouvrez le navigateur

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

**1.** Dans le terminal :

<div class="term"><span class="prompt">$</span> go run .<br/>Serveur lancé sur http://localhost:8080</div>

Le terminal reste bloqué : c'est **normal**, le serveur tourne.

**2.** Ouvrez **http://localhost:8080** dans le navigateur.

<div class="box info mt-4">
<span class="box-label">Arrêter le serveur</span>

Dans le terminal : <span class="kbd">Ctrl</span> + <span class="kbd">C</span>

</div>

</div>

<div>

<div class="box good">
<span class="box-label">Vous devez voir</span>

<div class="browser">
  <div class="browser-bar">localhost:8080</div>
  <img src="/img/etape-2.png" />
</div>

</div>

</div>

</div>

<!--
"localhost", c'est votre propre ordinateur. 8080, c'est le port qu'on a
choisi dans ListenAndServe.

Erreur possible au lancement :
  bind: Only one usage of each socket address ...
Un autre serveur tourne déjà sur 8080 (souvent : un autre terminal oublié).
Le fermer avec Ctrl+C. C'est pour voir ce message qu'on a mis log.Fatal.
-->

---

# La règle à retenir pour toute la séance

<div class="grid grid-cols-2 gap-8 mt-10">

<div class="box trap">
<span class="box-label">Vous modifiez main.go</span>

<p class="big">Arrêtez le serveur (<span class="kbd">Ctrl</span> + <span class="kbd">C</span>),<br/>relancez <code>go run .</code>,<br/>puis rechargez la page (<span class="kbd">F5</span>).</p>

</div>

<div class="box good">
<span class="box-label">Vous modifiez un fichier .html ou .css</span>

<p class="big">Rechargez la page (<span class="kbd">F5</span>).<br/>C'est tout.</p>

</div>

</div>

<div class="box info mt-8">

Essayez : remplacez `Bonjour !` par votre prénom dans `main.go`. Ça ne change
rien tant que vous n'avez pas relancé.

</div>

<!--
C'est la cause n°1 des "ça marche pas" de la séance : ils modifient main.go
et rechargent sans relancer. Faire l'essai du bas tous ensemble.

La règle "HTML : F5 suffit" n'est vraie qu'à partir de l'étape 3 (le template
est relu à chaque visite). Le dire.
-->

---
class: text-center
---

<div class="step-num">Étape 3</div>

# Une page HTML

<div class="steps mt-6">
  <div><b>1</b>Créer le projet</div>
  <div><b>2</b>Un serveur web</div>
  <div class="on"><b>3</b>Une page HTML</div>
  <div><b>4</b>Appeler l'API</div>
  <div><b>5</b>Les noms dans la page</div>
  <div><b>6</b>Une carte par Pokémon</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : le navigateur affiche une vraie page, avec un titre <b>Pokédex</b></p>

---

# Créez le fichier `templates/index.html`

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-3">

<div class="file">templates/index.html</div>

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Pokédex</title>
</head>
<body>
  <h1>Pokédex</h1>
</body>
</html>
```

</div>

<div class="col-span-2">

Créez d'abord un dossier **`templates`**, puis le fichier `index.html` dedans.

<div class="box info mt-4">
<span class="box-label">Votre projet</span>

<div class="term">pokedex/<br/>├── go.mod<br/>├── main.go<br/>└── templates/<br/>&nbsp;&nbsp;&nbsp;&nbsp;└── index.html</div>

</div>

<div class="box good mt-4">

Un **template**, c'est une page HTML dans laquelle Go pourra **ajouter des
données**. Pour l'instant, elle n'en a pas.

</div>

</div>

</div>

<!--
Le dossier s'appelle "templates", avec un s, en minuscules. Le nom compte :
main.go va le chercher par ce chemin exact.

Le é de Pokédex s'affiche bien grâce à meta charset="UTF-8".
-->

---

# Dans `main.go`, modifiez deux choses

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

**1.** Ajoutez `"html/template"` dans `import` :

<div class="file">main.go</div>

```go
import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)
```

</div>

<div>

**2.** Remplacez la fonction `accueil` :

<div class="file">main.go</div>

```go
func accueil(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("templates/index.html"))
	tmpl.Execute(w, nil)
}
```

<div class="box info mt-4">

**`template.ParseFiles`** lit le fichier HTML.

**`tmpl.Execute(w, nil)`** l'envoie au navigateur. Le `nil` veut dire :
« pas de données pour l'instant ».

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.56rem !important; }
</style>

<!--
template.Must : "si le fichier est introuvable, arrête tout". C'est la
version la plus simple ; la gestion d'erreur propre est pour la séance 2.

Le nil deviendra "pokemons" à l'étape 5 : l'annoncer.
-->

---

# Relancez

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

On a modifié `main.go`, donc :

1. <span class="kbd">Ctrl</span> + <span class="kbd">C</span> dans le terminal
2. `go run .`
3. <span class="kbd">F5</span> dans le navigateur

<div class="box info mt-6">
<span class="box-label">Essayez</span>

Changez le titre dans `index.html`, puis <span class="kbd">F5</span> : il
change **sans relancer Go**.

</div>

</div>

<div>

<div class="box good">
<span class="box-label">Vous devez voir</span>

<div class="browser">
  <div class="browser-bar">localhost:8080</div>
  <img src="/img/etape-3.png" />
</div>

</div>

</div>

</div>

<!--
Si la page est vide et que le terminal affiche
  http: panic serving ... open templates/index.html: The system cannot find the path specified.
→ le dossier templates est mal nommé, ou le fichier n'est pas dedans, ou
go run n'est pas lancé depuis le dossier pokedex.
-->

---
layout: center
---

# Pause · 10 minutes

<p class="big">Au retour : on va chercher les Pokémon sur Internet.</p>

---
class: text-center
---

<div class="step-num">Étape 4</div>

# Appeler l'API

<div class="steps mt-6">
  <div><b>1</b>Créer le projet</div>
  <div><b>2</b>Un serveur web</div>
  <div><b>3</b>Une page HTML</div>
  <div class="on"><b>4</b>Appeler l'API</div>
  <div><b>5</b>Les noms dans la page</div>
  <div><b>6</b>Une carte par Pokémon</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : le terminal affiche <code>151 Pokémon</code></p>

---

# Regardez l'API dans le navigateur

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Ouvrez cette adresse dans un nouvel onglet :

<p class="big"><a href="https://pokeapi.co/api/v2/pokemon?limit=151">pokeapi.co/api/v2/pokemon?limit=151</a></p>

C'est la **liste des 151 premiers Pokémon**, au format **JSON**.

<div class="box info mt-4">

`{ … }` : un **objet**. Dans **`results`**, une **liste** `[ … ]` : un
Pokémon par élément, avec son **nom**.

`?limit=151` : seulement les 151 premiers.

</div>

</div>

<div>

```json
{
  "count": 1351,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=151…",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
    …
  ]
}
```

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.6rem !important; }
</style>

<!--
Firefox affiche le JSON en arbre tout seul. Chrome : cocher "Impression
élégante".

count : l'API connaît 1351 Pokémon. Sans ?limit, elle n'en renvoie que 20.
Les 151 premiers sont ceux de la première génération (Rouge / Bleu).

Faire remarquer les noms exacts : "results", "name". On va les recopier tels
quels dans la slide suivante, à la majuscule près.

Les noms sont en anglais : c'est la langue de l'API. Le nom français arrive
en séance 2.
-->

---

# Décrivez la réponse en Go

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Ajoutez ce bloc **au-dessus** de la fonction `accueil` :

<div class="file">main.go</div>

```go
type Pokemon struct {
	Name string `json:"name"`
}

type ListePokemon struct {
	Results []Pokemon `json:"results"`
}
```

<div class="box info mt-4">

**`Pokemon`** : un Pokémon de la liste. On ne garde que son nom.<br/>
**`ListePokemon`** : la réponse entière. On ne garde que `results`.

</div>

</div>

<div>

Une **struct**, c'est une fiche : une ligne par information.

| Dans la ligne | Veut dire |
| --- | --- |
| `Name` | le nom du champ en Go, **avec une majuscule** |
| `string` | son type : du texte (`[]Pokemon` : une liste de `Pokemon`) |
| ``json:"name"`` | le nom **exact** de l'information dans le JSON |

<div class="box trap mt-4">

Les accents graves `` ` `` : <span class="kbd">AltGr</span> + <span class="kbd">7</span>, puis <span class="kbd">Espace</span>.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.66rem !important; }
</style>

<!--
On décrit le JSON tel qu'il est : un objet (ListePokemon) qui contient une
liste (Results) de Pokémon. Montrer la slide précédente en parallèle.

Les deux erreurs qui donnent une info VIDE, sans aucun message d'erreur :
- le nom du champ en minuscule (name au lieu de Name)
- le texte du json:"..." mal écrit (result au lieu de results)
Si un élève voit "0 Pokémon" ou une page vide : c'est l'une des deux.

On ne met pas tous les champs du JSON : seulement ceux qu'on affiche. Les
autres (count, next, url…) sont ignorés.

POUR TOI : la struct ≈ une interface TS / un DTO.
-->

---

# La fonction qui appelle l'API

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-3">

Ajoutez cette fonction **sous** la struct `ListePokemon` :

<div class="file">main.go</div>

```go
func getPokemons() []Pokemon {
	resp, err := http.Get("https://pokeapi.co/api/v2/pokemon?limit=151")
	if err != nil {
		fmt.Println("Erreur :", err)
		return nil
	}
	defer resp.Body.Close()

	var liste ListePokemon
	json.NewDecoder(resp.Body).Decode(&liste)
	return liste.Results
}
```

Et ajoutez `"encoding/json"` dans `import`.

</div>

<div class="col-span-2">

**`http.Get(…)`** demande la liste à l'API.

**`if err != nil`** : si l'API est injoignable (pas d'Internet…), on affiche
l'erreur.

**`defer resp.Body.Close()`** : on fermera la connexion à la fin de la
fonction.

**`Decode(&liste)`** transforme le JSON en une `ListePokemon`.

**`return liste.Results`** renvoie seulement la liste des Pokémon.

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.58rem !important; }
</style>

<!--
[]Pokemon = une liste de Pokemon (un "slice"). Ils ont vu les slices en Go.

Le & devant liste : "voilà l'adresse de ma variable, remplis-la". S'ils
l'oublient, la liste reste vide.

POUR TOI : http.Get ≈ fetch(url). Decode ≈ await res.json(), sauf qu'en Go
on donne la variable à remplir au lieu de récupérer un résultat.
defer ≈ un finally.
-->

---

# Testez : combien de Pokémon ?

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Dans `accueil`, ajoutez les deux premières lignes :

<div class="file">main.go</div>

```go
func accueil(w http.ResponseWriter, r *http.Request) {
	pokemons := getPokemons()
	fmt.Println(len(pokemons), "Pokémon")

	tmpl := template.Must(template.ParseFiles("templates/index.html"))
	tmpl.Execute(w, nil)
}
```

Puis : <span class="kbd">Ctrl</span> + <span class="kbd">C</span>, `go run .`, <span class="kbd">F5</span>.

</div>

<div>

<div class="box good">
<span class="box-label">Vous devez voir, dans le terminal</span>

<div class="term"><span class="prompt">$</span> go run .<br/>Serveur lancé sur http://localhost:8080<br/><span class="ok">151 Pokémon</span></div>

</div>

<div class="box info mt-4">

La ligne `151 Pokémon` apparaît **quand vous rechargez la page** : c'est à
ce moment-là que Go appelle l'API.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.55rem !important; }
</style>

<!--
La ligne peut apparaître deux fois : le navigateur demande aussi
/favicon.ico, et pour l'instant "/" répond à toutes les adresses. C'est
normal, on règle ça en séance 2.

Ceux qui voient "0 Pokémon" : le & oublié dans Decode, json:"results" mal
écrit, ou l'URL mal tapée.
Ceux qui voient "Erreur : ..." : pas d'accès Internet, ou proxy de l'école.

La page dans le navigateur ne change pas encore : c'est normal, on n'a rien
envoyé au template (nil). C'est l'étape 5.
-->

---

# Votre `main.go` à ce stade

<div class="grid grid-cols-2 gap-6 mt-2">

<div>

```go
package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
)

type Pokemon struct {
	Name string `json:"name"`
}

type ListePokemon struct {
	Results []Pokemon `json:"results"`
}

func getPokemons() []Pokemon {
	resp, err := http.Get("https://pokeapi.co/api/v2/pokemon?limit=151")
	if err != nil {
		fmt.Println("Erreur :", err)
		return nil
	}
	defer resp.Body.Close()
```

</div>

<div>

```go
	var liste ListePokemon
	json.NewDecoder(resp.Body).Decode(&liste)
	return liste.Results
}

func accueil(w http.ResponseWriter, r *http.Request) {
	pokemons := getPokemons()
	fmt.Println(len(pokemons), "Pokémon")

	tmpl := template.Must(template.ParseFiles("templates/index.html"))
	tmpl.Execute(w, nil)
}

func main() {
	http.HandleFunc("/", accueil)

	fmt.Println("Serveur lancé sur http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
```

</div>

</div>

<style>
h1 { margin-bottom: 0.3rem; }
.slidev-layout pre.slidev-code { font-size: 0.5rem !important; line-height: 1.4 !important; }
</style>

<!--
Slide de rattrapage : celui qui est perdu compare son fichier avec celui-ci,
ligne par ligne. Le fichier est coupé en deux colonnes au milieu de
getPokemons.
-->

---
class: text-center
---

<div class="step-num">Étape 5</div>

# Les noms dans la page

<div class="steps mt-6">
  <div><b>1</b>Créer le projet</div>
  <div><b>2</b>Un serveur web</div>
  <div><b>3</b>Une page HTML</div>
  <div><b>4</b>Appeler l'API</div>
  <div class="on"><b>5</b>Les noms dans la page</div>
  <div><b>6</b>Une carte par Pokémon</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : les 151 noms s'affichent dans le navigateur</p>

---

# Envoyez les Pokémon à la page

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Dans `accueil` :

- **supprimez** la ligne `fmt.Println(len(pokemons), "Pokémon")`
- **remplacez** `nil` par `pokemons`

<div class="file">main.go</div>

```go
func accueil(w http.ResponseWriter, r *http.Request) {
	pokemons := getPokemons()

	tmpl := template.Must(template.ParseFiles("templates/index.html"))
	tmpl.Execute(w, pokemons)
}
```

</div>

<div>

<div class="box info">

`tmpl.Execute(w, pokemons)` : Go envoie la page **et la liste des Pokémon**
au template. Dans le HTML, on pourra s'en servir.

</div>

<div class="box trap mt-4">

On a modifié `main.go` : <span class="kbd">Ctrl</span> + <span class="kbd">C</span>, puis `go run .`

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.55rem !important; }
</style>

<!--
Dernière modification de accueil de la séance. Elle ne bougera plus.
-->

---

# Affichez les noms dans `index.html`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Remplacez le `<body>` :

<div class="file">templates/index.html</div>

```html
<body>
  <h1>Pokédex</h1>

  {{range .}}
    <p>{{.Name}}</p>
  {{end}}
</body>
```

</div>

<div>

| On écrit | Ça veut dire |
| --- | --- |
| `{{range .}}` | pour **chaque Pokémon** de la liste… |
| `{{.Name}}` | …écris **son nom** |
| `{{end}}` | fin de la boucle |

<div class="box info mt-6">

Tout ce qui est entre `{{range .}}` et `{{end}}` est **répété 151 fois**,
une fois par Pokémon.

</div>

</div>

</div>

<!--
Le point "." veut dire "les données reçues". Hors de la boucle, c'est la
liste entière (ce qu'on a passé à Execute). Dans la boucle, c'est le Pokémon
en cours. Le dire une fois, pas plus.

Name avec la MAJUSCULE : c'est le nom du champ Go, pas la clé JSON.
Erreur fréquente : .name en minuscule → la page plante avec une erreur dans
le terminal ("can't evaluate field name").

POUR TOI : range ≈ pokemons.map(p => ...) dans du JSX.
-->

---

# Rechargez la page

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-2">

<span class="kbd">F5</span> dans le navigateur.

<div class="box info mt-4">

Les noms viennent **de l'API**, pas de votre code. Ils sont en anglais :
c'est la langue de l'API.

</div>

</div>

<div class="col-span-3">

<div class="box good">
<span class="box-label">Vous devez voir</span>

<div class="browser">
  <div class="browser-bar">localhost:8080</div>
  <img src="/img/etape-5.png" />
</div>

</div>

</div>

</div>

<!--
Le moment "ça marche" de la séance : le laisser respirer. Demander à ceux qui
ont la liste de lever la main, et aller voir les autres.
-->

---
layout: center
---

# Pause · 10 minutes

<p class="big">Au retour : chaque Pokémon devient une carte, avec son image.</p>

---
class: text-center
---

<div class="step-num">Étape 6</div>

# Une carte par Pokémon

<div class="steps mt-6">
  <div><b>1</b>Créer le projet</div>
  <div><b>2</b>Un serveur web</div>
  <div><b>3</b>Une page HTML</div>
  <div><b>4</b>Appeler l'API</div>
  <div><b>5</b>Les noms dans la page</div>
  <div class="on"><b>6</b>Une carte par Pokémon</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : chaque Pokémon a son numéro et son image</p>

---

# Donnez un numéro à chaque Pokémon

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

**1.** Dans la struct `Pokemon`, ajoutez la ligne `ID` :

<div class="file">main.go</div>

```go
type Pokemon struct {
	ID   int
	Name string `json:"name"`
}
```

**2.** Dans `getPokemons`, ajoutez la boucle **avant** le `return` :

<div class="file">main.go</div>

```go
	json.NewDecoder(resp.Body).Decode(&liste)

	for i := range liste.Results {
		liste.Results[i].ID = i + 1
	}
	return liste.Results
}
```

</div>

<div>

La liste de l'API **ne donne pas le numéro**. Mais elle est **dans
l'ordre** : le 1er est le n° 1, le 2e le n° 2… On l'ajoute nous-mêmes.

| On écrit | Ça veut dire |
| --- | --- |
| `ID int`, sans ``json:"…"`` | ce n'est pas l'API qui le remplit, c'est nous |
| `for i := range liste.Results` | pour chaque position `i` : 0, 1, 2… |
| `liste.Results[i].ID = i + 1` | le Pokémon en position 0 reçoit le n° 1… |

</div>

</div>

<style>
h1 { margin-bottom: 0.3rem; }
.slidev-layout pre.slidev-code { font-size: 0.56rem !important; line-height: 1.35 !important; }
.slidev-layout table { font-size: 0.8rem; }
</style>

<!--
Les positions dans une liste commencent à 0, les numéros des Pokémon à 1 :
d'où le + 1.

On écrit liste.Results[i].ID, et pas une boucle "for _, p := range" : p
serait une copie, et le numéro ne serait pas gardé. Ne pas entrer dans le
détail, sauf si on pose la question.

On a modifié main.go : il faudra relancer. Mais on fait d'abord le HTML.
-->

---

# Remplacez la boucle dans `index.html`

<div class="file">templates/index.html</div>

```html
<body>
  <h1>Pokédex</h1>

  <div class="grille">
    {{range .}}
      <div class="carte">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{.ID}}.png" alt="{{.Name}}">
        <p>n° {{.ID}}</p>
        <h2>{{.Name}}</h2>
      </div>
    {{end}}
  </div>
</body>
```

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

| On écrit | Ça affiche |
| --- | --- |
| `…/pokemon/{{.ID}}.png` | l'image du Pokémon : `1.png`, `2.png`… |
| `{{.ID}}` | son numéro |

</div>

<div class="box info">

Les images sont rangées **par numéro** sur GitHub. Les classes `grille` et
`carte` serviront au CSS, à l'étape 7.

</div>

</div>

<style>
h1 { margin-bottom: 0.3rem; }
.slidev-layout pre.slidev-code { font-size: 0.56rem !important; }
</style>

<!--
L'adresse de l'image est longue : copier-coller autorisé pour cette ligne.
Une faute dedans donne une image cassée (une petite icône à la place).

Ces images (les "sprites" des jeux) font 96 × 96 pixels et pèsent moins d'un
Ko : les 151 se chargent vite, même sur le Wi-Fi de l'école.
-->

---

# Relancez

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-2">

On a modifié `main.go` :

1. <span class="kbd">Ctrl</span> + <span class="kbd">C</span>
2. `go run .`
3. <span class="kbd">F5</span>

<div class="box trap mt-4">
<span class="box-label">C'est moche</span>

Tout est en colonne et les noms sont en minuscules : **c'est normal**. Il
n'y a pas encore de CSS.

</div>

</div>

<div class="col-span-3">

<div class="box good">
<span class="box-label">Vous devez voir</span>

<div class="browser">
  <div class="browser-bar">localhost:8080</div>
  <img src="/img/etape-6.png" />
</div>

</div>

</div>

</div>

<!--
Tous les numéros à 0, et des images cassées : la boucle n'est pas là, ou
Go n'a pas été relancé.

Le nom vide : la struct Pokemon (majuscule et json:"name" exact).
-->

---
class: text-center
---

<div class="step-num">Étape 7</div>

# Le CSS

<div class="steps mt-6">
  <div><b>1</b>Créer le projet</div>
  <div><b>2</b>Un serveur web</div>
  <div><b>3</b>Une page HTML</div>
  <div><b>4</b>Appeler l'API</div>
  <div><b>5</b>Les noms dans la page</div>
  <div><b>6</b>Une carte par Pokémon</div>
  <div class="on"><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : les Pokémon sont rangés en grille de cartes</p>

---

# Créez le fichier `static/style.css`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Créez un dossier **`static`**, puis `style.css` dedans.

<div class="file">static/style.css</div>

```css
body {
  font-family: sans-serif;
  background: #f4f4f8;
  margin: 0;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #e3350d;
}

.grille {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.5rem;
}
```

</div>

<div>

<div class="file">static/style.css (suite)</div>

```css
.carte {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.carte img {
  width: 120px;
  image-rendering: pixelated;
}

.carte h2 {
  text-transform: capitalize;
}
```

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.56rem !important; }
</style>

<!--
Ici, le copier-coller est autorisé : ce n'est pas le sujet du cours. Ils
connaissent le CSS.

La grille : "autant de colonnes de 160px minimum que la largeur permet".
image-rendering: pixelated : l'image est agrandie sans être floue, en gros
pixels, comme dans les vieux jeux.
text-transform: capitalize : une majuscule au début du nom.
-->

---

# Reliez le CSS à la page

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

**1.** Dans le `<head>` de `index.html`, ajoutez la ligne `link` :

<div class="file">templates/index.html</div>

```html
<head>
  <meta charset="UTF-8">
  <title>Pokédex</title>
  <link rel="stylesheet" href="/static/style.css">
</head>
```

**2.** Dans `main` de `main.go`, ajoutez la ligne `http.Handle` :

<div class="file">main.go</div>

```go
func main() {
	http.HandleFunc("/", accueil)
	http.Handle("/static/", http.FileServer(http.Dir(".")))
```

</div>

<div>

<div class="box info">

Le navigateur lit le `<link>` et demande **`/static/style.css`** à votre
serveur Go.

La ligne `http.Handle` dit à Go : « quand on te demande une adresse qui
commence par `/static/`, envoie le fichier qui porte ce nom ».

</div>

<div class="box trap mt-4">

Sans cette ligne, Go ne sait pas envoyer le fichier : la page reste sans
style.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.62rem !important; }
</style>

<!--
http.FileServer(http.Dir(".")) : sert les fichiers du dossier courant. Comme
on ne l'a branché que sur /static/, seuls les fichiers du dossier static
sont accessibles.

POUR TOI : ≈ app.useStaticAssets() / express.static.
-->

---

# Relancez

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-2">

On a modifié `main.go` :

1. <span class="kbd">Ctrl</span> + <span class="kbd">C</span>
2. `go run .`
3. <span class="kbd">F5</span>

<div class="box info mt-4">

Le style ne s'applique pas ? Rechargez **sans cache** :
<span class="kbd">Ctrl</span> + <span class="kbd">F5</span>.

</div>

</div>

<div class="col-span-3">

<div class="box good">
<span class="box-label">Vous devez voir</span>

<div class="browser">
  <div class="browser-bar">localhost:8080</div>
  <img src="/img/etape-7.png" />
</div>

</div>

</div>

</div>

<!--
C'est le site de la slide 2. Le leur faire remarquer : "vous avez fait
exactement ce qu'on vous a montré au début."
-->

---

# Le projet complet · `main.go`

<div class="grid grid-cols-2 gap-6 mt-2">

<div>

```go
package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
)

type Pokemon struct {
	ID   int
	Name string `json:"name"`
}

type ListePokemon struct {
	Results []Pokemon `json:"results"`
}

func getPokemons() []Pokemon {
	resp, err := http.Get("https://pokeapi.co/api/v2/pokemon?limit=151")
	if err != nil {
		fmt.Println("Erreur :", err)
		return nil
	}
	defer resp.Body.Close()
```

</div>

<div>

```go
	var liste ListePokemon
	json.NewDecoder(resp.Body).Decode(&liste)

	for i := range liste.Results {
		liste.Results[i].ID = i + 1
	}
	return liste.Results
}

func accueil(w http.ResponseWriter, r *http.Request) {
	pokemons := getPokemons()

	tmpl := template.Must(template.ParseFiles("templates/index.html"))
	tmpl.Execute(w, pokemons)
}

func main() {
	http.HandleFunc("/", accueil)
	http.Handle("/static/", http.FileServer(http.Dir(".")))

	fmt.Println("Serveur lancé sur http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
```

</div>

</div>

<style>
h1 { margin-bottom: 0.3rem; }
.slidev-layout pre.slidev-code { font-size: 0.5rem !important; line-height: 1.4 !important; }
</style>

<!--
Fichier de référence. Il repart tel quel en séance 2 : leur dire de garder
le dossier pokedex.
-->

---

# Le projet complet · `index.html`

<div class="file">templates/index.html</div>

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Pokédex</title>
  <link rel="stylesheet" href="/static/style.css">
</head>
<body>
  <h1>Pokédex</h1>

  <div class="grille">
    {{range .}}
      <div class="carte">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{.ID}}.png" alt="{{.Name}}">
        <p>n° {{.ID}}</p>
        <h2>{{.Name}}</h2>
      </div>
    {{end}}
  </div>
</body>
</html>
```

<div class="grid grid-cols-2 gap-8 mt-3">

<div class="box info">
<span class="box-label">Votre projet</span>

`pokedex/` : `go.mod`, `main.go`, `static/style.css`, `templates/index.html`

</div>

<div class="box good">

**Go** va chercher les données et prépare la page.<br/>
**HTML et CSS** s'occupent de l'affichage.

</div>

</div>

<style>
h1 { margin-bottom: 0.3rem; }
.slidev-layout pre.slidev-code { font-size: 0.5rem !important; line-height: 1.35 !important; }
</style>

<!--
L'encadré vert, c'est la "séparation backend / frontend" du syllabus, dite
simplement. Elle sera reprise en séance 2.
-->

---

# Ça ne marche pas ?

| Ce que vous voyez | La solution |
| --- | --- |
| `go.mod file not found` | vous n'êtes pas dans le dossier : `cd pokedex` |
| La page ne change pas après une modification | `main.go` modifié ? <span class="kbd">Ctrl</span> + <span class="kbd">C</span>, puis `go run .` |
| `bind: Only one usage of each socket address` | un autre serveur tourne déjà : fermez l'autre terminal |
| `open templates/index.html: The system cannot find the path specified` | vérifiez le nom du dossier `templates` et du fichier `index.html` |
| `imported and not used` ou `undefined: json` | un import en trop, ou un import manquant |
| `0 Pokémon`, ou une page sans Pokémon | le `&` devant `liste` dans `Decode`, ``json:"results"``, et `Execute(w, pokemons)` |
| Une information vide sur toutes les cartes | dans la struct : la **majuscule**, et le texte exact de ``json:"…"`` |
| Tous les numéros à 0, les images cassées | la boucle `ID = i + 1` dans `getPokemons`, puis relancez Go |
| Le CSS ne s'applique pas | la ligne `http.Handle`, le `<link>`, puis <span class="kbd">Ctrl</span> + <span class="kbd">F5</span> |

<style>
.slidev-layout table { font-size: 0.74rem; }
.slidev-layout td, .slidev-layout th { padding: 0.3rem 0.6rem; }
</style>

<!--
La slide à garder ouverte pendant que tu circules.
-->

---

# Bonus : vous avez fini ?

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

**1. Le nombre de Pokémon**

Dans `index.html`, sous le `<h1>`, ajoutez :

<div class="file">templates/index.html</div>

```html
<p>{{len .}} Pokémon</p>
```

Le point est la liste entière, comme dans `{{range .}}`. <span class="kbd">F5</span> suffit.

</div>

<div>

**2. La deuxième génération**

Dans `getPokemons` (`main.go`), changez le nombre à la fin de l'adresse :

<div class="file">main.go</div>

```go
"https://pokeapi.co/api/v2/pokemon?limit=251"
```

Puis relancez Go : 251 Pokémon, jusqu'à Celebi.

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.66rem !important; }
</style>

<!--
Le bonus 1 réutilise len, le bonus 2 montre que tout vient de l'API : on
change un nombre, le site affiche 100 Pokémon de plus, sans toucher au HTML.

Le numéro reste juste, car la liste de l'API est toujours dans l'ordre.
-->

---

# Ce que vous avez fait aujourd'hui

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

- un **serveur web** en Go
- une **page HTML** envoyée par Go (un template)
- un **appel à une API** et la lecture de son **JSON**
- une **boucle** dans le HTML pour afficher les 151 Pokémon
- un fichier **CSS** servi par Go

</div>

<div>

<div class="box info">
<span class="box-label">Séance 2</span>

On clique sur un Pokémon et on arrive **sur sa fiche** : sa grande image,
son nom en français, ses types.

Et on gère les problèmes : un Pokémon qui n'existe pas, une API qui ne
répond pas.

</div>

<div class="box trap mt-4">
<span class="box-label">Gardez votre dossier pokedex</span>

On repart de ce code la prochaine fois.

</div>

</div>

</div>
