---
theme: default
title: "Groupie Tracker · Séance 1 · La page d'accueil"
info: |
  ## Groupie Tracker · Séance 1
  Un site web en Go qui affiche les artistes d'une API.
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

# Groupie Tracker

<p class="big">Aujourd'hui : la page d'accueil du site,<br/>avec les artistes d'une vraie API</p>

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

Un **site web**, écrit en **Go**, qui affiche les **52 artistes** d'une API.

Les données (noms, photos, années) ne sont pas dans votre code : votre site
**va les chercher sur Internet**, à chaque visite.

<div class="box info mt-5">
<span class="box-label">Les prochaines séances</span>

**Séance 2** : la page de chaque artiste, avec ses concerts.<br/>
**Séance 3** : une recherche, des filtres, une carte.

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
  <div class="flow-node"><b>Votre programme Go</b>va chercher les artistes</div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><b>L'API</b>renvoie la liste des artistes</div>
</div>

<div class="text-left mt-10">

1. Le navigateur demande la page à **votre programme Go**
2. Go demande la liste des artistes à **l'API** Groupie Tracker
3. Go range les artistes dans une **page HTML**, et la renvoie au navigateur

</div>

<div class="box good mt-6 text-left">

Une **API**, c'est un site qui ne renvoie pas des pages, mais des **données**.
Votre programme les récupère, puis les met en forme.

</div>

<!--
Le seul schéma de la séance. Y revenir à l'étape 4 ("on est ici : Go va
chercher les artistes").

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
  <div><b>6</b>Une carte par artiste</div>
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
  <div><b>6</b>Une carte par artiste</div>
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
mkdir groupie
cd groupie
go mod init groupie
code .
```

</div>

<div>

| Commande | Ce qu'elle fait |
| --- | --- |
| `mkdir groupie` | crée le dossier |
| `cd groupie` | entre dedans |
| `go mod init groupie` | déclare un projet Go nommé `groupie` (crée `go.mod`) |
| `code .` | ouvre le dossier dans VS Code |

<div class="box trap mt-6">
<span class="box-label">Toujours dans ce dossier</span>

Toutes les commandes de la séance se lancent **dans le dossier `groupie`**.

</div>

</div>

</div>

<!--
go mod init ≈ npm init. go.mod ≈ package.json.

Si "code ." ne marche pas : ouvrir VS Code à la main, Fichier > Ouvrir le
dossier > groupie.

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
groupie. cd groupie.

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
  <div><b>6</b>Une carte par artiste</div>
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
  <div><b>6</b>Une carte par artiste</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : le navigateur affiche une vraie page, avec un titre <b>Groupie Tracker</b></p>

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
  <title>Groupie Tracker</title>
</head>
<body>
  <h1>Groupie Tracker</h1>
</body>
</html>
```

</div>

<div class="col-span-2">

Créez d'abord un dossier **`templates`**, puis le fichier `index.html` dedans.

<div class="box info mt-4">
<span class="box-label">Votre projet</span>

<div class="term">groupie/<br/>├── go.mod<br/>├── main.go<br/>└── templates/<br/>&nbsp;&nbsp;&nbsp;&nbsp;└── index.html</div>

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

Le nil deviendra "artists" à l'étape 5 : l'annoncer.
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
go run n'est pas lancé depuis le dossier groupie.
-->

---
layout: center
---

# Pause · 10 minutes

<p class="big">Au retour : on va chercher les artistes sur Internet.</p>

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
  <div><b>6</b>Une carte par artiste</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : le terminal affiche <code>52 artistes</code></p>

---

# Regardez l'API dans le navigateur

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Ouvrez cette adresse dans un nouvel onglet :

<p class="big"><a href="https://groupietrackers.herokuapp.com/api/artists">groupietrackers.herokuapp.com/api/artists</a></p>

C'est la **liste des 52 artistes**, au format **JSON**. Voici le premier :

</div>

<div>

```json
[
  {
    "id": 1,
    "image": "https://groupietrackers…/queen.jpeg",
    "name": "Queen",
    "members": ["Freddie Mercury", "Brian May", …],
    "creationDate": 1970,
    "firstAlbum": "14-12-1973",
    …
  },
  …
]
```

<div class="box info mt-4">

`[ … ]` : une **liste**. `{ … }` : **un artiste**, avec ses informations.

</div>

</div>

</div>

<!--
Firefox affiche le JSON en arbre tout seul. Chrome : cocher "Impression
élégante".

Faire remarquer les noms exacts : "name", "image", "creationDate". On va les
recopier tels quels dans la slide suivante, à la majuscule près.
-->

---

# Décrivez un artiste en Go

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Ajoutez ce bloc **au-dessus** de la fonction `accueil` :

<div class="file">main.go</div>

```go
type Artist struct {
	ID           int      `json:"id"`
	Name         string   `json:"name"`
	Image        string   `json:"image"`
	CreationDate int      `json:"creationDate"`
	Members      []string `json:"members"`
}
```

</div>

<div>

Une **struct**, c'est la fiche d'un artiste : une ligne par information.

| Dans la ligne | Veut dire |
| --- | --- |
| `Name` | le nom du champ en Go, **avec une majuscule** |
| `string` | son type : du texte (`int` : un nombre, `[]string` : une liste de textes) |
| ``json:"name"`` | le nom **exact** de l'information dans le JSON |

<div class="box trap mt-4">

Les accents graves `` ` `` : <span class="kbd">AltGr</span> + <span class="kbd">7</span>, puis <span class="kbd">Espace</span>.

</div>

</div>

</div>

<!--
Les deux erreurs qui donnent un champ VIDE, sans aucun message d'erreur :
- le nom du champ en minuscule (name au lieu de Name)
- le texte du json:"..." mal écrit (creationdate au lieu de creationDate)
Si un élève voit une info vide à l'étape 5 ou 6 : c'est l'une des deux.

On ne met pas tous les champs du JSON : seulement ceux qu'on affiche. Les
autres sont ignorés.

POUR TOI : la struct ≈ une interface TS / un DTO.
-->

---

# La fonction qui appelle l'API

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-3">

Ajoutez cette fonction **sous** la struct `Artist` :

<div class="file">main.go</div>

```go
func getArtists() []Artist {
	resp, err := http.Get("https://groupietrackers.herokuapp.com/api/artists")
	if err != nil {
		fmt.Println("Erreur :", err)
		return nil
	}
	defer resp.Body.Close()

	var artists []Artist
	json.NewDecoder(resp.Body).Decode(&artists)
	return artists
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

**`Decode(&artists)`** transforme le JSON en une liste d'`Artist`.

**`return artists`** renvoie la liste.

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.58rem !important; }
</style>

<!--
[]Artist = une liste d'Artist (un "slice"). Ils ont vu les slices en Go.

Le & devant artists : "voilà l'adresse de ma variable, remplis-la". S'ils
l'oublient, la liste reste vide.

POUR TOI : http.Get ≈ fetch(url). Decode ≈ await res.json(), sauf qu'en Go
on donne la variable à remplir au lieu de récupérer un résultat.
defer ≈ un finally.
-->

---

# Testez : combien d'artistes ?

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Dans `accueil`, ajoutez les deux premières lignes :

<div class="file">main.go</div>

```go
func accueil(w http.ResponseWriter, r *http.Request) {
	artists := getArtists()
	fmt.Println(len(artists), "artistes")

	tmpl := template.Must(template.ParseFiles("templates/index.html"))
	tmpl.Execute(w, nil)
}
```

Puis : <span class="kbd">Ctrl</span> + <span class="kbd">C</span>, `go run .`, <span class="kbd">F5</span>.

</div>

<div>

<div class="box good">
<span class="box-label">Vous devez voir, dans le terminal</span>

<div class="term"><span class="prompt">$</span> go run .<br/>Serveur lancé sur http://localhost:8080<br/><span class="ok">52 artistes</span></div>

</div>

<div class="box info mt-4">

La ligne `52 artistes` apparaît **quand vous rechargez la page** : c'est à
ce moment-là que Go appelle l'API.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.55rem !important; }
</style>

<!--
Ceux qui voient "0 artistes" : le & oublié dans Decode, ou l'URL mal tapée.
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

type Artist struct {
	ID           int      `json:"id"`
	Name         string   `json:"name"`
	Image        string   `json:"image"`
	CreationDate int      `json:"creationDate"`
	Members      []string `json:"members"`
}

func getArtists() []Artist {
	resp, err := http.Get("https://groupietrackers.herokuapp.com/api/artists")
	if err != nil {
		fmt.Println("Erreur :", err)
		return nil
	}
	defer resp.Body.Close()
```

</div>

<div>

```go
	var artists []Artist
	json.NewDecoder(resp.Body).Decode(&artists)
	return artists
}

func accueil(w http.ResponseWriter, r *http.Request) {
	artists := getArtists()
	fmt.Println(len(artists), "artistes")

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
.slidev-layout pre.slidev-code { font-size: 0.53rem !important; line-height: 1.42 !important; }
</style>

<!--
Slide de rattrapage : celui qui est perdu compare son fichier avec celui-ci,
ligne par ligne. Le fichier est coupé en deux colonnes au milieu de
getArtists.
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
  <div><b>6</b>Une carte par artiste</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : les 52 noms s'affichent dans le navigateur</p>

---

# Envoyez les artistes à la page

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Dans `accueil` :

- **supprimez** la ligne `fmt.Println(len(artists), "artistes")`
- **remplacez** `nil` par `artists`

<div class="file">main.go</div>

```go
func accueil(w http.ResponseWriter, r *http.Request) {
	artists := getArtists()

	tmpl := template.Must(template.ParseFiles("templates/index.html"))
	tmpl.Execute(w, artists)
}
```

</div>

<div>

<div class="box info">

`tmpl.Execute(w, artists)` : Go envoie la page **et la liste des artistes**
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
  <h1>Groupie Tracker</h1>

  {{range .}}
    <p>{{.Name}}</p>
  {{end}}
</body>
```

</div>

<div>

| On écrit | Ça veut dire |
| --- | --- |
| `{{range .}}` | pour **chaque artiste** de la liste… |
| `{{.Name}}` | …écris **son nom** |
| `{{end}}` | fin de la boucle |

<div class="box info mt-6">

Tout ce qui est entre `{{range .}}` et `{{end}}` est **répété 52 fois**, une
fois par artiste.

</div>

</div>

</div>

<!--
Le point "." veut dire "les données reçues". Hors de la boucle, c'est la
liste entière (ce qu'on a passé à Execute). Dans la boucle, c'est l'artiste
en cours. Le dire une fois, pas plus.

Name avec la MAJUSCULE : c'est le nom du champ Go, pas la clé JSON.
Erreur fréquente : .name en minuscule → la page plante avec une erreur dans
le terminal ("can't evaluate field name").

POUR TOI : range ≈ artists.map(a => ...) dans du JSX.
-->

---

# Rechargez la page

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-2">

<span class="kbd">F5</span> dans le navigateur.

<div class="box info mt-4">

Les noms viennent **de l'API**, pas de votre code. Si l'API ajoutait un
artiste demain, il apparaîtrait sur votre site sans rien changer.

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

<p class="big">Au retour : chaque artiste devient une carte, avec sa photo.</p>

---
class: text-center
---

<div class="step-num">Étape 6</div>

# Une carte par artiste

<div class="steps mt-6">
  <div><b>1</b>Créer le projet</div>
  <div><b>2</b>Un serveur web</div>
  <div><b>3</b>Une page HTML</div>
  <div><b>4</b>Appeler l'API</div>
  <div><b>5</b>Les noms dans la page</div>
  <div class="on"><b>6</b>Une carte par artiste</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : chaque artiste a sa photo, son année de création et son nombre de membres</p>

---

# Remplacez la boucle dans `index.html`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

<div class="file">templates/index.html</div>

```html
<body>
  <h1>Groupie Tracker</h1>

  <div class="grille">
    {{range .}}
      <div class="carte">
        <img src="{{.Image}}" alt="{{.Name}}">
        <h2>{{.Name}}</h2>
        <p>Créé en {{.CreationDate}}</p>
        <p>{{len .Members}} membres</p>
      </div>
    {{end}}
  </div>
</body>
```

</div>

<div>

| On écrit | Ça affiche |
| --- | --- |
| `{{.Image}}` | l'adresse de la photo, dans le `src` de l'image |
| `{{.CreationDate}}` | l'année de création |
| `{{len .Members}}` | le **nombre** de membres |

<div class="box info mt-6">

Les classes `grille` et `carte` ne font rien pour l'instant. Elles serviront
au CSS, à l'étape 7.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.62rem !important; }
</style>

<!--
On n'a touché qu'au HTML : F5 suffit, pas besoin de relancer Go. Le
rappeler, c'est la règle de l'étape 2.

len .Members : len est une fonction Go qu'on peut appeler dans un template.
-->

---

# Rechargez la page

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-2">

On n'a modifié que le HTML : <span class="kbd">F5</span> suffit.

<div class="box trap mt-4">
<span class="box-label">C'est moche</span>

Les images sont énormes et tout est en colonne : **c'est normal**. Il n'y a
pas encore de CSS.

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
Une info vide sur toutes les cartes (pas d'année, 0 membres...) : regarder la
struct Artist. Majuscule et json:"..." exact. Voir les notes de la slide
"Décrivez un artiste en Go".
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
  <div><b>6</b>Une carte par artiste</div>
  <div class="on"><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : les artistes sont rangés en grille de cartes</p>

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
}
```

</div>

<div>

<div class="file">static/style.css (suite)</div>

```css
.grille {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.carte {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.carte img {
  width: 100%;
  border-radius: 8px;
}
```

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.6rem !important; }
</style>

<!--
Ici, le copier-coller est autorisé : ce n'est pas le sujet du cours. Ils
connaissent le CSS.

La grille : "autant de colonnes de 200px minimum que la largeur permet".
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
  <title>Groupie Tracker</title>
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

type Artist struct {
	ID           int      `json:"id"`
	Name         string   `json:"name"`
	Image        string   `json:"image"`
	CreationDate int      `json:"creationDate"`
	Members      []string `json:"members"`
}

func getArtists() []Artist {
	resp, err := http.Get("https://groupietrackers.herokuapp.com/api/artists")
	if err != nil {
		fmt.Println("Erreur :", err)
		return nil
	}
	defer resp.Body.Close()
```

</div>

<div>

```go
	var artists []Artist
	json.NewDecoder(resp.Body).Decode(&artists)
	return artists
}

func accueil(w http.ResponseWriter, r *http.Request) {
	artists := getArtists()

	tmpl := template.Must(template.ParseFiles("templates/index.html"))
	tmpl.Execute(w, artists)
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
.slidev-layout pre.slidev-code { font-size: 0.53rem !important; line-height: 1.42 !important; }
</style>

<!--
Fichier de référence. Il repart tel quel en séance 2 : leur dire de garder
le dossier groupie.
-->

---

# Le projet complet · `index.html`

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-3">

<div class="file">templates/index.html</div>

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Groupie Tracker</title>
  <link rel="stylesheet" href="/static/style.css">
</head>
<body>
  <h1>Groupie Tracker</h1>

  <div class="grille">
    {{range .}}
      <div class="carte">
        <img src="{{.Image}}" alt="{{.Name}}">
        <h2>{{.Name}}</h2>
        <p>Créé en {{.CreationDate}}</p>
        <p>{{len .Members}} membres</p>
      </div>
    {{end}}
  </div>
</body>
</html>
```

</div>

<div class="col-span-2">

<div class="box info">
<span class="box-label">Votre projet</span>

<div class="term">groupie/<br/>├── go.mod<br/>├── main.go<br/>├── static/<br/>│&nbsp;&nbsp;&nbsp;└── style.css<br/>└── templates/<br/>&nbsp;&nbsp;&nbsp;&nbsp;└── index.html</div>

</div>

<div class="box good mt-4">

**Go** va chercher les données et prépare la page.<br/>
**HTML et CSS** s'occupent de l'affichage.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.56rem !important; line-height: 1.4 !important; }
</style>

<!--
L'encadré vert, c'est la "séparation backend / frontend" du syllabus, dite
simplement. Elle sera reprise en séance 2.
-->

---

# Ça ne marche pas ?

| Ce que vous voyez | La solution |
| --- | --- |
| `go.mod file not found` | vous n'êtes pas dans le dossier : `cd groupie` |
| La page ne change pas après une modification | `main.go` modifié ? <span class="kbd">Ctrl</span> + <span class="kbd">C</span>, puis `go run .` |
| `bind: Only one usage of each socket address` | un autre serveur tourne déjà : fermez l'autre terminal |
| `open templates/index.html: The system cannot find the path specified` | vérifiez le nom du dossier `templates` et du fichier `index.html` |
| `imported and not used` ou `undefined: json` | un import en trop, ou un import manquant |
| `0 artistes`, ou une page sans artistes | le `&` devant `artists` dans `Decode`, et `Execute(w, artists)` |
| Une information vide sur toutes les cartes | dans la struct : la **majuscule**, et le texte exact de ``json:"…"`` |
| Le CSS ne s'applique pas | la ligne `http.Handle`, le `<link>`, puis <span class="kbd">Ctrl</span> + <span class="kbd">F5</span> |

<style>
.slidev-layout table { font-size: 0.78rem; }
.slidev-layout td, .slidev-layout th { padding: 0.32rem 0.6rem; }
</style>

<!--
La slide à garder ouverte pendant que tu circules.
-->

---

# Bonus : vous avez fini ?

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

**1. Le premier album**

Dans la struct `Artist` (`main.go`), ajoutez :

<div class="file">main.go</div>

```go
	FirstAlbum   string   `json:"firstAlbum"`
```

Dans la carte (`index.html`), ajoutez :

<div class="file">templates/index.html</div>

```html
<p>Premier album : {{.FirstAlbum}}</p>
```

Puis relancez Go.

</div>

<div>

**2. La liste des membres**

Dans la carte, ajoutez :

<div class="file">templates/index.html</div>

```html
<ul>
  {{range .Members}}
    <li>{{.}}</li>
  {{end}}
</ul>
```

Une boucle **dans** la boucle : pour chaque membre de l'artiste, `{{.}}`
écrit son nom.

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.64rem !important; }
</style>

<!--
Le bonus 2 réutilise exactement le principe de l'étape 5. Bon test pour voir
qui a compris range.
-->

---

# Ce que vous avez fait aujourd'hui

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

- un **serveur web** en Go
- une **page HTML** envoyée par Go (un template)
- un **appel à une API** et la lecture de son **JSON**
- une **boucle** dans le HTML pour afficher les 52 artistes
- un fichier **CSS** servi par Go

</div>

<div>

<div class="box info">
<span class="box-label">Séance 2</span>

On clique sur un artiste et on arrive **sur sa page**, avec ses concerts.

Et on gère les problèmes : un artiste qui n'existe pas, une API qui ne
répond pas.

</div>

<div class="box trap mt-4">
<span class="box-label">Gardez votre dossier groupie</span>

On repart de ce code la prochaine fois.

</div>

</div>

</div>
