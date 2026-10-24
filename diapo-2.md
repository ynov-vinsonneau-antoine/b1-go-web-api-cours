---
theme: default
title: "Groupie Tracker · Séance 2 · La page d'un artiste"
info: |
  ## Groupie Tracker · Séance 2
  La page de chaque artiste, ses concerts, et les erreurs.
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

<div class="tag mb-6">Go · Séance 2 sur 3</div>

# Groupie Tracker

<p class="big">Aujourd'hui : la page de chaque artiste, avec ses concerts,<br/>et des pages d'erreur quand ça se passe mal</p>

<div class="abs-br m-6 text-sm">
  <span class="kbd">→</span> avancer · <span class="kbd">d</span> thème clair / sombre
</div>

<!--
Même méthode qu'en séance 1 : ils recopient le code de chaque slide, lancent,
et comparent avec la capture. Rien à inventer.

On repart du dossier groupie de la séance 1. Ceux qui ne l'ont plus le
récupèrent slide 3.
-->

---

# Ce qu'on construit aujourd'hui

<div class="grid grid-cols-5 gap-6 mt-2 text-left">

<div class="col-span-3">
<div class="browser">
  <div class="browser-bar">localhost:8080/artiste/1</div>
  <img src="/img/s2-etape-7.png" />
</div>
</div>

<div class="col-span-2">

On **clique sur une carte**, et on arrive sur **la page de l'artiste** :
ses membres, son premier album, **ses concerts**.

<div class="box info mt-5">
<span class="box-label">Et quand ça se passe mal</span>

Un artiste qui n'existe pas, une API qui ne répond pas : le site affiche
une **vraie page d'erreur**, au lieu d'une page vide.

</div>

</div>

</div>

<!--
Vraie capture du site en fin de séance (Queen, /artiste/1). Le montrer en
direct si tu as fait le projet avant.
-->

---

# Avant de commencer

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

**1.** Lancez votre projet de la séance 1 :

```bash
cd groupie
go run .
```

**2.** Ouvrez **http://localhost:8080** : vous devez voir les 52 cartes.

<div class="box info mt-6">
<span class="box-label">La règle, toujours</span>

`main.go` modifié : <span class="kbd">Ctrl</span> + <span class="kbd">C</span>, `go run .`, <span class="kbd">F5</span>.<br/>
`.html` ou `.css` modifié : <span class="kbd">F5</span> suffit.

</div>

</div>

<div>

<div class="box trap">
<span class="box-label">Votre projet ne marche pas, ou vous l'avez perdu ?</span>

Récupérez celui de la séance 1, **à la place** de votre dossier `groupie` :

<div class="term mt-3"><span class="prompt">$</span> git clone -b seance-1 https://github.com/ynov-vinsonneau-antoine/b1-go-web-api-groupie groupie</div>

Puis `cd groupie` et `go run .`

</div>

</div>

</div>

<!--
Faire lever la main à ceux qui voient les 52 cartes. Les autres clonent le
dépôt (tag seance-1 : le projet exact de la fin de séance 1). Ne pas
commencer l'étape 1 tant que tout le monde n'a pas les cartes.

Après le clone, git affiche "You are in 'detached HEAD' state" : c'est
normal, ça ne gêne en rien. Ils ne font pas de commit dans ce dossier.

Le go.mod du dépôt demande Go 1.22 : c'est le minimum pour les adresses avec
{id} de l'étape 1.
-->

---

# Comment ça marche

<div class="flow mt-8">
  <div class="flow-node"><b>Le navigateur</b>demande /artiste/1</div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><b>Votre programme Go</b>demande l'artiste 1, puis ses concerts</div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><b>L'API</b>renvoie l'artiste, puis ses concerts</div>
</div>

<div class="text-left mt-10">

1. On clique sur Queen : le navigateur demande la page **`/artiste/1`**
2. Go demande à l'API **l'artiste n°1**, puis **ses concerts** : deux appels
3. Go range tout dans la page de l'artiste, et la renvoie au navigateur

</div>

<div class="box good mt-6 text-left">

Un **endpoint**, c'est une adresse de l'API. En séance 1, on en utilisait un
(`/api/artists`). Aujourd'hui, on en ajoute deux : **un artiste**, et **ses
concerts**.

</div>

<!--
Le même schéma qu'en séance 1, avec deux appels à l'API au lieu d'un. C'est
l'objectif "plusieurs endpoints" du syllabus.
-->

---

# Les 7 étapes

<div class="steps mt-6">
  <div><b>1</b>Une adresse par artiste</div>
  <div><b>2</b>Des cartes cliquables</div>
  <div><b>3</b>La page de l'artiste</div>
  <div><b>4</b>Ses concerts</div>
  <div><b>5</b>Artiste introuvable</div>
  <div><b>6</b>L'API en panne</div>
  <div><b>7</b>Le CSS</div>
</div>

<div class="box info mt-10 text-left">
<span class="box-label">À chaque étape, comme en séance 1</span>

1. Vous **écrivez** le code de la slide, dans le fichier indiqué en violet
2. Vous **lancez**
3. Vous **vérifiez** que vous voyez la même chose que sur la slide

</div>

<!--
Étapes 1 à 4 : on construit la page. Étapes 5 et 6 : on gère ce qui peut
mal tourner. Étape 7 : la mise en forme.
-->

---
class: text-center
---

<div class="step-num">Étape 1</div>

# Une adresse par artiste

<div class="steps mt-6">
  <div class="on"><b>1</b>Une adresse par artiste</div>
  <div><b>2</b>Des cartes cliquables</div>
  <div><b>3</b>La page de l'artiste</div>
  <div><b>4</b>Ses concerts</div>
  <div><b>5</b>Artiste introuvable</div>
  <div><b>6</b>L'API en panne</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : <code>localhost:8080/artiste/3</code> affiche <code>Artiste 3</code></p>

---

# Ajoutez la fonction `artiste`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Ajoutez la fonction **au-dessus** de `main`, puis la ligne `HandleFunc`
dans `main` :

<div class="file">main.go</div>

```go
func artiste(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	fmt.Fprint(w, "Artiste ", id)
}

func main() {
	http.HandleFunc("/", accueil)
	http.HandleFunc("/artiste/{id}", artiste)
	http.Handle("/static/", http.FileServer(http.Dir(".")))
```

</div>

<div>

| On écrit | Ça veut dire |
| --- | --- |
| `"/artiste/{id}"` | toutes les adresses `/artiste/1`, `/artiste/2`… |
| `{id}` | la partie qui change. On l'appelle `id` |
| `r.PathValue("id")` | lit ce qu'il y a à la place de `{id}` |
| `fmt.Fprint(w, …)` | écrit du texte dans la page, comme le `Bonjour !` de la séance 1 |

<div class="box info mt-4">

`r`, c'est **la requête** : tout ce que le navigateur a demandé, dont
l'adresse.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.58rem !important; }
</style>

<!--
Le nom entre accolades et le texte de PathValue doivent être identiques :
{id} et "id". Sinon PathValue renvoie un texte vide et la page affiche
"Artiste " sans numéro.

Les adresses avec {id} existent depuis Go 1.22. Si un élève a un go.mod
avec "go 1.21" ou moins, /artiste/3 affiche l'accueil : mettre "go 1.22"
dans go.mod.

POUR TOI : "/artiste/{id}" + r.PathValue("id") ≈ @Get(':id') + @Param('id').
-->

---

# Relancez, puis tapez l'adresse

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

On a modifié `main.go` :

1. <span class="kbd">Ctrl</span> + <span class="kbd">C</span>, puis `go run .`
2. Ouvrez **http://localhost:8080/artiste/3**

<div class="box info mt-6">
<span class="box-label">Essayez</span>

Remplacez `3` par `42`, puis par `abc`. Go affiche ce qu'il y a dans
l'adresse, **sans rien vérifier**. On s'en occupera à l'étape 5.

</div>

</div>

<div>

<div class="box good">
<span class="box-label">Vous devez voir</span>

<div class="browser">
  <div class="browser-bar">localhost:8080/artiste/3</div>
  <img src="/img/s2-etape-1.png" />
</div>

</div>

</div>

</div>

<!--
L'accueil marche toujours sur localhost:8080 : le "/" attrape toutes les
adresses, sauf celles qui ont leur propre ligne HandleFunc. Go choisit
toujours la ligne la plus précise.
-->

---
class: text-center
---

<div class="step-num">Étape 2</div>

# Des cartes cliquables

<div class="steps mt-6">
  <div><b>1</b>Une adresse par artiste</div>
  <div class="on"><b>2</b>Des cartes cliquables</div>
  <div><b>3</b>La page de l'artiste</div>
  <div><b>4</b>Ses concerts</div>
  <div><b>5</b>Artiste introuvable</div>
  <div><b>6</b>L'API en panne</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : un clic sur une carte ouvre l'adresse de l'artiste</p>

---

# Transformez les cartes en liens

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Dans la boucle, remplacez `<div class="carte">` par un lien `<a>`, et le
`</div>` de la carte par `</a>` :

<div class="file">templates/index.html</div>

```html
{{range .}}
  <a class="carte" href="/artiste/{{.ID}}">
    <img src="{{.Image}}" alt="{{.Name}}">
    <h2>{{.Name}}</h2>
    <p>Créé en {{.CreationDate}}</p>
    <p>{{len .Members}} membres</p>
  </a>
{{end}}
```

</div>

<div>

Dans `.carte`, ajoutez les deux dernières lignes :

<div class="file">static/style.css</div>

```css
.carte {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  color: black;
  text-decoration: none;
}
```

<div class="box info mt-4">

`{{.ID}}` : le numéro de l'artiste. Il est dans la struct depuis la
séance 1. Queen a le numéro 1 : sa carte mène à `/artiste/1`.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.6rem !important; }
</style>

<!--
Sans les deux lignes CSS, tout le texte des cartes devient bleu et souligné,
comme n'importe quel lien.

On n'a touché ni à main.go ni à la struct : F5 suffit.
-->

---

# Cliquez sur une carte

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

On n'a modifié que le HTML et le CSS : <span class="kbd">F5</span> suffit.

Sur l'accueil, **cliquez sur Queen**, la première carte.

<div class="box info mt-6">

Le curseur devient une main sur les cartes. Après le clic, l'adresse est
**`localhost:8080/artiste/1`**.

</div>

</div>

<div>

<div class="box good">
<span class="box-label">Vous devez voir</span>

<div class="browser">
  <div class="browser-bar">localhost:8080/artiste/1</div>
  <img src="/img/s2-etape-2.png" />
</div>

</div>

</div>

</div>

<!--
Si le clic ramène sur l'accueil : l'adresse du lien et celle du HandleFunc ne
sont pas les mêmes (/artiste/ des deux côtés, sans s).
-->

---
class: text-center
---

<div class="step-num">Étape 3</div>

# La page de l'artiste

<div class="steps mt-6">
  <div><b>1</b>Une adresse par artiste</div>
  <div><b>2</b>Des cartes cliquables</div>
  <div class="on"><b>3</b>La page de l'artiste</div>
  <div><b>4</b>Ses concerts</div>
  <div><b>5</b>Artiste introuvable</div>
  <div><b>6</b>L'API en panne</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : la page de l'artiste affiche sa photo, son nom, son premier album et ses membres</p>

---

# Regardez un artiste dans l'API

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Ouvrez cette adresse dans un nouvel onglet :

<p class="big"><a href="https://groupietrackers.herokuapp.com/api/artists/1">groupietrackers.herokuapp.com/api/artists/1</a></p>

La même adresse que la liste, **avec le numéro au bout**. Cette fois, il n'y
a **qu'un seul artiste** : pas de `[ … ]`, directement `{ … }`.

<div class="box info mt-4">

Un artiste a le même format que dans la liste : notre struct `Artist` sait
déjà le lire.

</div>

</div>

<div>

```json
{
  "id": 1,
  "image": "https://groupietrackers…/queen.jpeg",
  "name": "Queen",
  "members": ["Freddie Mercury", "Brian May", …],
  "creationDate": 1970,
  "firstAlbum": "14-12-1973",
  …
}
```

</div>

</div>

<!--
firstAlbum est un texte ("14-12-1973"), pas une date. On l'affiche tel quel.
-->

---

# Ajoutez `firstAlbum`, puis `getArtist`

<div class="grid grid-cols-2 gap-6 mt-2">

<div>

**1.** Dans la struct `Artist`, ajoutez la dernière ligne :

<div class="file">main.go</div>

```go
type Artist struct {
	ID           int      `json:"id"`
	Name         string   `json:"name"`
	Image        string   `json:"image"`
	CreationDate int      `json:"creationDate"`
	Members      []string `json:"members"`
	FirstAlbum   string   `json:"firstAlbum"`
}
```

<div class="box trap mt-4">

Déjà ajoutée au bonus de la séance 1 ? Ne la remettez pas.

</div>

</div>

<div>

**2.** Sous `getArtists`, ajoutez :

<div class="file">main.go</div>

```go
func getArtist(id string) Artist {
	resp, err := http.Get("https://groupietrackers.herokuapp.com/api/artists/" + id)
	if err != nil {
		fmt.Println("Erreur :", err)
		return Artist{}
	}
	defer resp.Body.Close()

	var artist Artist
	json.NewDecoder(resp.Body).Decode(&artist)
	return artist
}
```

<div class="box info mt-4">

C'est `getArtists` **sans le s** : l'adresse finit par `+ id`, et on
renvoie **un seul** `Artist`.

</div>

</div>

</div>

<style>
h1 { margin-bottom: 0.3rem; }
.slidev-layout pre.slidev-code { font-size: 0.5rem !important; }
</style>

<!--
Faire comparer getArtists et getArtist côte à côte : trois différences
seulement (le nom, l'adresse + id, Artist au lieu de []Artist).

Artist{} : un artiste vide, renvoyé si l'API est injoignable.

Le / à la fin de "…/api/artists/" est indispensable : sans lui, l'adresse
devient …/api/artists1.
-->

---

# Créez `templates/artiste.html`

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-3">

<div class="file">templates/artiste.html</div>

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>{{.Name}}</title>
  <link rel="stylesheet" href="/static/style.css">
</head>
<body>
  <a href="/">← Retour</a>
  <div class="fiche">
    <img src="{{.Image}}" alt="{{.Name}}">
    <div>
      <h1>{{.Name}}</h1>
      <p>Créé en {{.CreationDate}}</p>
      <p>Premier album : {{.FirstAlbum}}</p>

      <h2>Membres</h2>
      <ul>
        {{range .Members}}
          <li>{{.}}</li>
        {{end}}
      </ul>
    </div>
  </div>
</body>
</html>
```

</div>

<div class="col-span-2">

À côté de `index.html`, dans le dossier `templates`.

| On écrit | Ça affiche |
| --- | --- |
| `{{.Name}}` | le nom de l'artiste |
| `{{range .Members}}` | pour **chaque membre**… |
| `{{.}}` | …son nom |

<div class="box info mt-4">

Dans la boucle, le point `.` est **le membre en cours**.

</div>

<div class="box good mt-4">

La classe `fiche` servira au CSS, à l'étape 7.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.5rem !important; line-height: 1.38 !important; }
</style>

<!--
Copier-coller autorisé pour ce fichier si la salle est en retard : la
structure du head est la même que index.html.

La flèche de "← Retour" est difficile à taper : écrire simplement "Retour"
convient très bien.
-->

---

# Remplacez la fonction `artiste`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

<div class="file">main.go</div>

```go
func artiste(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	artist := getArtist(id)

	tmpl := template.Must(template.ParseFiles("templates/artiste.html"))
	tmpl.Execute(w, artist)
}
```

<div class="box info mt-4">

Comme `accueil`, mais avec **un seul artiste** et le template
`artiste.html`.

</div>

</div>

<div>

<div class="box good">
<span class="box-label">Vous devez voir, après Ctrl + C, go run . et F5</span>

<div class="browser">
  <div class="browser-bar">localhost:8080/artiste/1</div>
  <img src="/img/s2-etape-3.png" />
</div>

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.56rem !important; }
</style>

<!--
Le nom au centre et la photo au-dessus : c'est normal, pas encore de CSS
pour cette page.

Si le nom, l'année ou l'album sont vides : la struct (majuscule et
json:"…"), ou le / à la fin de l'adresse dans getArtist.
-->

---
layout: center
---

# Pause · 10 minutes

<p class="big">Au retour : les concerts de chaque artiste.</p>

---
class: text-center
---

<div class="step-num">Étape 4</div>

# Ses concerts

<div class="steps mt-6">
  <div><b>1</b>Une adresse par artiste</div>
  <div><b>2</b>Des cartes cliquables</div>
  <div><b>3</b>La page de l'artiste</div>
  <div class="on"><b>4</b>Ses concerts</div>
  <div><b>5</b>Artiste introuvable</div>
  <div><b>6</b>L'API en panne</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : la page de l'artiste affiche la liste de ses concerts, avec les lieux et les dates</p>

---

# Regardez les concerts dans l'API

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Ouvrez cette adresse dans un nouvel onglet :

<p class="big"><a href="https://groupietrackers.herokuapp.com/api/relation/1">groupietrackers.herokuapp.com/api/relation/1</a></p>

Les concerts de l'artiste n°1. Dans **`datesLocations`** : pour chaque
**lieu**, la liste de ses **dates**.

<div class="box info mt-4">

C'est un **autre endpoint** : pour afficher la page d'un artiste, Go va
maintenant appeler l'API **deux fois**.

</div>

</div>

<div>

```json
{
  "id": 1,
  "datesLocations": {
    "dunedin-new_zealand": ["10-02-2020"],
    "georgia-usa": ["22-08-2019"],
    "los_angeles-usa": ["20-08-2019"],
    "nagoya-japan": ["30-01-2019"],
    …
  }
}
```

</div>

</div>

<!--
"relation" : l'API relie les lieux et les dates. Il existe aussi /locations
et /dates séparés, mais relation donne les deux d'un coup : c'est le plus
simple.
-->

---

# Décrivez les concerts en Go

<div class="grid grid-cols-5 gap-6 mt-2">

<div class="col-span-2">

**1.** Sous la struct `Artist`, ajoutez :

<div class="file">main.go</div>

```go
type Relation struct {
	DatesLocations map[string][]string `json:"datesLocations"`
}
```

| Dans `map[string][]string` | Veut dire |
| --- | --- |
| `map` | un dictionnaire : une **clé** → une **valeur** |
| `[string]` | la clé : le **lieu** |
| `[]string` | la valeur : la **liste des dates** |

</div>

<div class="col-span-3">

**2.** Sous `getArtist`, ajoutez :

<div class="file">main.go</div>

```go
func getConcerts(id string) map[string][]string {
	resp, err := http.Get("https://groupietrackers.herokuapp.com/api/relation/" + id)
	if err != nil {
		fmt.Println("Erreur :", err)
		return nil
	}
	defer resp.Body.Close()

	var relation Relation
	json.NewDecoder(resp.Body).Decode(&relation)
	return relation.DatesLocations
}
```

<div class="box info mt-4">

Encore la même forme. On ne garde que **`DatesLocations`** : c'est ce qu'on
affiche.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.5rem !important; }
</style>

<!--
Ils ont vu les maps en Go. Le rappeler en une phrase : comme un dictionnaire,
on cherche une clé, on trouve une valeur.

À ce stade, getArtists, getArtist et getConcerts se ressemblent beaucoup :
le faire remarquer. On les regroupera à l'étape 6.

POUR TOI : map[string][]string ≈ Record<string, string[]>.
-->

---

# Envoyez deux données à la page

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

**1.** Sous la struct `Relation`, ajoutez :

<div class="file">main.go</div>

```go
type PageArtiste struct {
	Artist   Artist
	Concerts map[string][]string
}
```

<div class="box info mt-4">

`Execute` n'accepte **qu'une seule donnée**. Pour en envoyer deux, on les
range dans une struct, et on envoie la struct.

</div>

</div>

<div>

**2.** Remplacez la fonction `artiste` :

<div class="file">main.go</div>

```go
func artiste(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	page := PageArtiste{
		Artist:   getArtist(id),
		Concerts: getConcerts(id),
	}

	tmpl := template.Must(template.ParseFiles("templates/artiste.html"))
	tmpl.Execute(w, page)
}
```

<div class="box trap mt-4">

Dans le HTML, le point `.` est maintenant **la `PageArtiste`** : le nom
devient `.Artist.Name`. On met à jour `artiste.html` juste après.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.52rem !important; }
</style>

<!--
PageArtiste = "tout ce dont la page a besoin". Le même principe servira pour
toute page qui affiche plusieurs choses.

POUR TOI : ≈ un DTO de vue / les props d'une page.
-->

---

# Remplacez tout le contenu de `artiste.html`

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-3">

<div class="file">templates/artiste.html</div>

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>{{.Artist.Name}}</title>
  <link rel="stylesheet" href="/static/style.css">
</head>
<body>
  <a href="/">← Retour</a>
  <div class="fiche">
    <img src="{{.Artist.Image}}" alt="{{.Artist.Name}}">
    <div>
      <h1>{{.Artist.Name}}</h1>
      <p>Créé en {{.Artist.CreationDate}}</p>
      <p>Premier album : {{.Artist.FirstAlbum}}</p>

      <h2>Membres</h2>
      <ul>
        {{range .Artist.Members}}
          <li>{{.}}</li>
        {{end}}
      </ul>

      <h2>Concerts</h2>
      <ul>
        {{range $lieu, $dates := .Concerts}}
          <li>{{$lieu}} : {{range $dates}}{{.}} {{end}}</li>
        {{end}}
      </ul>
    </div>
  </div>
</body>
</html>
```

</div>

<div class="col-span-2">

Partout, `.Artist.` devant les infos de l'artiste. Puis le bloc
**Concerts**, à la fin :

| On écrit | Ça veut dire |
| --- | --- |
| `{{range $lieu, $dates := .Concerts}}` | pour chaque concert… |
| `$lieu` | …le lieu (la clé) |
| `$dates` | …ses dates (la valeur) |
| `{{range $dates}}{{.}} {{end}}` | écrit chaque date |

</div>

</div>

<style>
h1 { margin-bottom: 0.3rem; }
.slidev-layout pre.slidev-code { font-size: 0.46rem !important; line-height: 1.26 !important; }
</style>

<!--
$lieu et $dates : des variables du template. Le $ est obligatoire. On en a
besoin parce qu'une map a deux choses par élément : la clé et la valeur.

Copier-coller autorisé si la salle est en retard : seul le bloc Concerts est
nouveau.
-->

---

# Relancez

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-2">

On a modifié `main.go` :

1. <span class="kbd">Ctrl</span> + <span class="kbd">C</span>
2. `go run .`
3. <span class="kbd">F5</span> sur `localhost:8080/artiste/1`

Sous les membres, la liste des concerts.

<div class="box info mt-4">

Les lieux sont écrits comme dans l'API : `los_angeles-usa`. On les rendra
lisibles en séance 3.

</div>

</div>

<div class="col-span-3">

<div class="box good">
<span class="box-label">Vous devez voir, en bas de la page</span>

<div class="browser">
  <div class="browser-bar">localhost:8080/artiste/1</div>
  <img src="/img/s2-etape-4.png" />
</div>

</div>

</div>

</div>

<!--
Les lieux sont dans l'ordre alphabétique : le template trie tout seul les
clés d'une map.

Page blanche : il reste un {{.Name}} sans .Artist devant dans artiste.html.
Le terminal n'affiche rien, la page s'arrête juste à cet endroit.

Pas de concerts : json:"datesLocations" mal écrit, ou le / à la fin de
l'adresse dans getConcerts.
-->

---
class: text-center
---

<div class="step-num">Étape 5</div>

# Artiste introuvable

<div class="steps mt-6">
  <div><b>1</b>Une adresse par artiste</div>
  <div><b>2</b>Des cartes cliquables</div>
  <div><b>3</b>La page de l'artiste</div>
  <div><b>4</b>Ses concerts</div>
  <div class="on"><b>5</b>Artiste introuvable</div>
  <div><b>6</b>L'API en panne</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : <code>/artiste/999</code> affiche une page d'erreur, avec le code 404</p>

---

# Essayez un artiste qui n'existe pas

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

**1.** Ouvrez **localhost:8080/artiste/999**

Une page avec un nom vide et `Créé en 0`.

**2.** Regardez ce que répond l'API : [groupietrackers.herokuapp.com/api/artists/999](https://groupietrackers.herokuapp.com/api/artists/999)

```json
{
  "id": 0,
  "name": "",
  "creationDate": 0,
  …
}
```

</div>

<div>

<div class="box bad">
<span class="box-label">Le problème</span>

L'API ne dit pas « introuvable » : elle renvoie **un artiste vide, avec
l'`id` 0**. C'est à nous de le repérer.

</div>

<div class="box info mt-4">
<span class="box-label">Le code 404</span>

Avec chaque page, le serveur envoie un **code** : **200** quand tout va
bien, **404** quand la page n'existe pas.

On va renvoyer une page d'erreur, avec le code 404.

</div>

</div>

</div>

<!--
C'est une bizarrerie de cette API : une API bien faite répondrait 404. Le
dire : "on ne choisit pas les API qu'on consomme, on fait avec".

/artiste/abc donne la même chose : l'API renvoie aussi un artiste vide. Le
même test réglera les deux cas.
-->

---

# Créez `templates/erreur.html`

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-3">

<div class="file">templates/erreur.html</div>

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Erreur</title>
  <link rel="stylesheet" href="/static/style.css">
</head>
<body>
  <div class="erreur">
    <h1>Oups !</h1>
    <p>{{.}}</p>
    <a href="/">← Retour à l'accueil</a>
  </div>
</body>
</html>
```

</div>

<div class="col-span-2">

<div class="box info">

`{{.}}` : **le message** qu'on enverra depuis Go. Ici, le point est un
simple texte.

</div>

<div class="box good mt-4">

**Une seule page** pour toutes les erreurs : seul le message change.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.6rem !important; }
</style>

<!--
Le dossier templates contient maintenant trois fichiers : index.html,
artiste.html, erreur.html.
-->

---

# La fonction qui affiche une erreur

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Ajoutez cette fonction **au-dessus** de `accueil` :

<div class="file">main.go</div>

```go
func erreur(w http.ResponseWriter, code int, message string) {
	w.WriteHeader(code)
	tmpl := template.Must(template.ParseFiles("templates/erreur.html"))
	tmpl.Execute(w, message)
}
```

</div>

<div>

| On écrit | Ça fait |
| --- | --- |
| `code int` | le code à envoyer : `404`, `500`… |
| `message string` | le texte à afficher |
| `w.WriteHeader(code)` | envoie le code au navigateur |
| `tmpl.Execute(w, message)` | envoie la page, avec le message |

<div class="box trap mt-4">

`WriteHeader` doit venir **avant** `Execute` : le code part en premier.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.56rem !important; }
</style>

<!--
Jusqu'ici, Go envoyait toujours 200 sans qu'on le demande.

POUR TOI : w.WriteHeader(404) ≈ res.status(404).
-->

---

# Vérifiez l'artiste dans `artiste`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Remplacez la fonction `artiste` :

<div class="file">main.go</div>

```go
func artiste(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	artist := getArtist(id)
	if artist.ID == 0 {
		erreur(w, 404, "Cet artiste n'existe pas.")
		return
	}

	page := PageArtiste{
		Artist:   artist,
		Concerts: getConcerts(id),
	}

	tmpl := template.Must(template.ParseFiles("templates/artiste.html"))
	tmpl.Execute(w, page)
}
```

</div>

<div>

**`artist := getArtist(id)`** : on récupère l'artiste **avant** de faire la
page, pour pouvoir le vérifier.

**`if artist.ID == 0`** : l'API a renvoyé un artiste vide, il n'existe pas.

**`return`** : on arrête la fonction ici. Sans lui, Go continuerait et
ajouterait la page de l'artiste sous la page d'erreur.

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.55rem !important; }
</style>

<!--
L'oubli du return est l'erreur classique : la page d'erreur s'affiche, puis
la page artiste vide en dessous.
-->

---

# Les adresses qui n'existent pas

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

**1.** Ajoutez cette fonction **au-dessus** de `main` :

<div class="file">main.go</div>

```go
func introuvable(w http.ResponseWriter, r *http.Request) {
	erreur(w, 404, "Cette page n'existe pas.")
}
```

**2.** Dans `main`, modifiez la première ligne et ajoutez la troisième :

<div class="file">main.go</div>

```go
func main() {
	http.HandleFunc("/{$}", accueil)
	http.HandleFunc("/artiste/{id}", artiste)
	http.HandleFunc("/", introuvable)
	http.Handle("/static/", http.FileServer(http.Dir(".")))
```

</div>

<div>

<div class="box info">
<span class="box-label">Pourquoi</span>

Avec `"/"`, l'accueil s'affiche pour **toutes** les adresses :
`/nimportequoi` montre les 52 artistes.

</div>

| On écrit | Ça veut dire |
| --- | --- |
| `"/{$}"` | l'adresse `/` **exactement** : l'accueil |
| `"/"` | **toutes les autres** adresses : introuvable |

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.56rem !important; }
</style>

<!--
Si un élève garde "/" pour accueil ET ajoute "/" pour introuvable, le
programme s'arrête au lancement :
  panic: pattern "/" (...) conflicts with pattern "/" (...)
→ la première ligne doit devenir "/{$}".

/static/ et /artiste/{id} gardent leur propre ligne : Go choisit toujours
la plus précise.
-->

---

# Relancez et testez

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

<span class="kbd">Ctrl</span> + <span class="kbd">C</span>, `go run .`, puis
ouvrez ces adresses :

| Adresse | Vous devez voir |
| --- | --- |
| `/artiste/1` | la page de Queen, comme avant |
| `/artiste/999` | Oups ! Cet artiste n'existe pas. |
| `/artiste/abc` | Oups ! Cet artiste n'existe pas. |
| `/nimportequoi` | Oups ! Cette page n'existe pas. |

<div class="box info mt-4">
<span class="box-label">Voir le code 404</span>

<span class="kbd">F12</span>, onglet **Réseau**, puis <span class="kbd">F5</span> :
la page apparaît avec le statut **404**.

</div>

</div>

<div>

<div class="box good">
<span class="box-label">Vous devez voir</span>

<div class="browser">
  <div class="browser-bar">localhost:8080/artiste/999</div>
  <img src="/img/s2-etape-5.png" />
</div>

</div>

</div>

</div>

<!--
Le "Oups !" est centré et le message ne l'est pas : c'est le CSS de la
séance 1 (h1 centré). On règle ça à l'étape 7.

Le panneau Réseau : le montrer au vidéoprojecteur, tout le monde n'a pas
besoin de le faire.
-->

---
layout: center
---

# Pause · 10 minutes

<p class="big">Au retour : et si l'API ne répond plus ?</p>

---
class: text-center
---

<div class="step-num">Étape 6</div>

# L'API en panne

<div class="steps mt-6">
  <div><b>1</b>Une adresse par artiste</div>
  <div><b>2</b>Des cartes cliquables</div>
  <div><b>3</b>La page de l'artiste</div>
  <div><b>4</b>Ses concerts</div>
  <div><b>5</b>Artiste introuvable</div>
  <div class="on"><b>6</b>L'API en panne</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : sans Internet, le site affiche une page d'erreur, avec le code 500</p>

---

# Coupez le Wi-Fi

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

**1.** Coupez le Wi-Fi (ou débranchez le câble).

**2.** <span class="kbd">F5</span> sur **localhost:8080** : le titre, et
**aucune carte**.

**3.** Dans le terminal :

<div class="term"><span class="err">Erreur : Get "https://groupietrackers.herokuapp.com/api/artists": dial tcp: lookup groupietrackers.herokuapp.com: no such host</span></div>

**4.** Rallumez le Wi-Fi.

</div>

<div>

<div class="box bad">
<span class="box-label">Le problème</span>

Le visiteur voit une page vide, **sans explication**. Le message d'erreur
n'est que dans le terminal.

</div>

<div class="box info mt-4">
<span class="box-label">Le code 500</span>

Quand le problème vient **du serveur** (ici, l'API qu'il appelle), le code
est **500**. On va afficher la page d'erreur, avec ce code.

</div>

</div>

</div>

<!--
Faire l'essai tous ensemble, puis faire rallumer le Wi-Fi tout de suite : le
reste de l'étape a besoin d'Internet pour tester.

Le message exact peut varier selon le système ("no such host", "connectex"…).
-->

---

# Une seule fonction pour appeler l'API

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Ajoutez `"time"` dans `import`, puis ce bloc **au-dessus** de `getArtists` :

<div class="file">main.go</div>

```go
var client = &http.Client{Timeout: 5 * time.Second}

func appelerAPI(adresse string, resultat any) error {
	resp, err := client.Get("https://groupietrackers.herokuapp.com/api/" + adresse)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return fmt.Errorf("l'API a répondu %d", resp.StatusCode)
	}
	return json.NewDecoder(resp.Body).Decode(resultat)
}
```

</div>

<div>

Nos trois fonctions `get…` font la même chose : on regroupe tout ici, et on
gère les erreurs **une seule fois**.

| On écrit | Ça veut dire |
| --- | --- |
| `Timeout: 5 * time.Second` | au bout de 5 secondes sans réponse, on abandonne |
| `resultat any` | la variable à remplir, de n'importe quel type |
| `resp.StatusCode != 200` | l'API a répondu, mais avec une erreur |
| `return err` | on ne s'occupe pas de l'erreur ici : on la renvoie |

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.5rem !important; }
</style>

<!--
Les trois cas de panne : pas de réseau (err de Get), API trop lente
(Timeout), API qui répond une erreur (StatusCode). Le syllabus demande 404,
500 et timeout : les trois sont là.

Sans Timeout, http.Get peut attendre très longtemps une API qui ne répond
pas.

POUR TOI : appelerAPI ≈ un petit service HTTP partagé. Renvoyer l'erreur ≈
la laisser remonter au lieu de faire un try/catch sur place.
-->

---

# Remplacez les trois fonctions `get…`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Remplacez `getArtists`, `getArtist` et `getConcerts` par :

<div class="file">main.go</div>

```go
func getArtists() ([]Artist, error) {
	var artists []Artist
	err := appelerAPI("artists", &artists)
	return artists, err
}

func getArtist(id string) (Artist, error) {
	var artist Artist
	err := appelerAPI("artists/"+id, &artist)
	return artist, err
}

func getConcerts(id string) (map[string][]string, error) {
	var relation Relation
	err := appelerAPI("relation/"+id, &relation)
	return relation.DatesLocations, err
}
```

</div>

<div>

**`([]Artist, error)`** : la fonction renvoie **deux choses** : le
résultat, et l'erreur. L'erreur vaut `nil` si tout s'est bien passé.

**`&artists`** : comme en séance 1, on donne l'adresse de la variable à
remplir.

<div class="box trap mt-6">
<span class="box-label">Ne relancez pas encore</span>

`accueil` et `artiste` attendent encore les anciennes fonctions : le
programme ne compile plus. On les met à jour sur les deux slides suivantes.

</div>

</div>

</div>

<style>
h1 { margin-bottom: 0.3rem; }
.slidev-layout pre.slidev-code { font-size: 0.5rem !important; line-height: 1.38 !important; }
</style>

<!--
Chaque fonction fait maintenant trois lignes. Les comparer avec les
anciennes : c'est l'intérêt d'avoir regroupé le code dans appelerAPI.

Si un élève relance quand même :
  assignment mismatch: 1 variable but getArtists returns 2 values
→ c'est normal, il faut finir l'étape.
-->

---

# Gérez la panne dans `accueil`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

**1.** Sous la fonction `erreur`, ajoutez :

<div class="file">main.go</div>

```go
func apiEnPanne(w http.ResponseWriter, err error) {
	fmt.Println("Erreur :", err)
	erreur(w, 500, "Le site des artistes ne répond pas. Réessayez plus tard.")
}
```

<div class="box info mt-4">

**`apiEnPanne`** écrit l'erreur dans le terminal (pour vous), et affiche
la page d'erreur avec le code **500** (pour le visiteur).

</div>

</div>

<div>

**2.** Remplacez la fonction `accueil` :

<div class="file">main.go</div>

```go
func accueil(w http.ResponseWriter, r *http.Request) {
	artists, err := getArtists()
	if err != nil {
		apiEnPanne(w, err)
		return
	}

	tmpl := template.Must(template.ParseFiles("templates/index.html"))
	tmpl.Execute(w, artists)
}
```

**`artists, err :=`** : on récupère le résultat **et** l'erreur.<br/>
**`if err != nil`** : un problème ? Page d'erreur, puis `return`.

</div>

</div>

<style>
h1 { margin-bottom: 0.3rem; }
.slidev-layout pre.slidev-code { font-size: 0.48rem !important; }
</style>

<!--
Le message technique (no such host, timeout…) va dans le terminal : il sert
au développeur. Le visiteur reçoit une phrase simple.
-->

---

# … et dans `artiste`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Remplacez la fonction `artiste` :

<div class="file">main.go</div>

```go
func artiste(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	artist, err := getArtist(id)
	if err != nil {
		apiEnPanne(w, err)
		return
	}
	if artist.ID == 0 {
		erreur(w, 404, "Cet artiste n'existe pas.")
		return
	}

	concerts, err := getConcerts(id)
	if err != nil {
		apiEnPanne(w, err)
		return
	}

	page := PageArtiste{
		Artist:   artist,
		Concerts: concerts,
	}

	tmpl := template.Must(template.ParseFiles("templates/artiste.html"))
	tmpl.Execute(w, page)
}
```

</div>

<div>

Trois vérifications, dans l'ordre :

1. l'API a-t-elle répondu pour l'artiste ? Sinon **500**
2. l'artiste existe-t-il ? Sinon **404**
3. l'API a-t-elle répondu pour les concerts ? Sinon **500**

<div class="box good mt-6">

Chaque problème a **sa page** et **son code**. Si tout va bien, on arrive
en bas : la page de l'artiste.

</div>

</div>

</div>

<style>
h1 { margin-bottom: 0.3rem; }
.slidev-layout pre.slidev-code { font-size: 0.5rem !important; line-height: 1.38 !important; }
</style>

<!--
C'est la fonction la plus longue du projet, mais elle se lit de haut en bas :
"si problème, on s'arrête". C'est la façon normale d'écrire du Go.
-->

---

# Relancez, puis coupez le Wi-Fi

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

1. <span class="kbd">Ctrl</span> + <span class="kbd">C</span>, `go run .`, <span class="kbd">F5</span> : le site marche comme avant
2. Coupez le Wi-Fi, puis <span class="kbd">F5</span> : la page d'erreur
3. Rallumez le Wi-Fi, puis <span class="kbd">F5</span> : les artistes reviennent

<div class="box info mt-6">

Le terminal affiche toujours le message technique :
`Erreur : Get "https://…": dial tcp: …`

</div>

</div>

<div>

<div class="box good">
<span class="box-label">Vous devez voir, sans Wi-Fi</span>

<div class="browser">
  <div class="browser-bar">localhost:8080</div>
  <img src="/img/s2-etape-6.png" />
</div>

</div>

</div>

</div>

<!--
Le site ne s'arrête plus quand l'API tombe, et il repart tout seul quand
elle revient : rien à relancer.

Erreurs de compilation fréquentes ici :
- undefined: time → "time" manquant dans import
- assignment mismatch → une fonction accueil ou artiste pas remplacée
-->

---
class: text-center
---

<div class="step-num">Étape 7</div>

# Le CSS

<div class="steps mt-6">
  <div><b>1</b>Une adresse par artiste</div>
  <div><b>2</b>Des cartes cliquables</div>
  <div><b>3</b>La page de l'artiste</div>
  <div><b>4</b>Ses concerts</div>
  <div><b>5</b>Artiste introuvable</div>
  <div><b>6</b>L'API en panne</div>
  <div class="on"><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : la page de l'artiste est une fiche, et la page d'erreur est centrée</p>

---

# Ajoutez à la fin de `static/style.css`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

<div class="file">static/style.css</div>

```css
.fiche {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  max-width: 800px;
  margin: 1.5rem auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
```

</div>

<div>

<div class="file">static/style.css (suite)</div>

```css
.fiche img {
  width: 240px;
  border-radius: 8px;
}

.fiche h1 {
  text-align: left;
  margin-top: 0;
}

.erreur {
  text-align: center;
  margin-top: 4rem;
}
```

<div class="box info mt-4">

`.fiche` : la photo à gauche, les infos à droite.<br/>
`.erreur` : tout le contenu de la page d'erreur, centré.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.6rem !important; }
</style>

<!--
Copier-coller autorisé, comme en séance 1.

align-items: flex-start empêche la photo d'être étirée sur toute la hauteur
de la fiche. Les photos de l'API font 240 × 240 : on ne les agrandit pas.
-->

---

# Rechargez

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-2">

On n'a modifié que le CSS : <span class="kbd">F5</span> suffit.

<div class="box info mt-4">

Le style ne s'applique pas ? Rechargez **sans cache** :
<span class="kbd">Ctrl</span> + <span class="kbd">F5</span>.

</div>

<div class="box info mt-4">
<span class="box-label">Essayez</span>

`/artiste/999` : la page d'erreur est maintenant centrée.

</div>

</div>

<div class="col-span-3">

<div class="box good">
<span class="box-label">Vous devez voir</span>

<div class="browser">
  <div class="browser-bar">localhost:8080/artiste/1</div>
  <img src="/img/s2-etape-7.png" />
</div>

</div>

</div>

</div>

<!--
C'est la capture de la slide 2 : "vous avez fait ce qu'on vous a montré au
début".
-->

---

# Votre `main.go` : qui fait quoi

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

| Partie | Dans `main.go` |
| --- | --- |
| **Les données** | `Artist`, `Relation`, `PageArtiste` |
| **Parler à l'API** | `client`, `appelerAPI`, `getArtists`, `getArtist`, `getConcerts` |
| **Les erreurs** | `erreur`, `apiEnPanne` |
| **Les pages** | `accueil`, `artiste`, `introuvable` |
| **Les adresses** | `main` |

</div>

<div>

<div class="box info">
<span class="box-label">Votre projet</span>

<div class="term">groupie/<br/>├── go.mod<br/>├── main.go<br/>├── static/<br/>│&nbsp;&nbsp;&nbsp;└── style.css<br/>└── templates/<br/>&nbsp;&nbsp;&nbsp;&nbsp;├── artiste.html<br/>&nbsp;&nbsp;&nbsp;&nbsp;├── erreur.html<br/>&nbsp;&nbsp;&nbsp;&nbsp;└── index.html</div>

</div>

<div class="box good mt-4">
<span class="box-label">Le projet complet</span>

Sur GitHub, branche **seance-2** :<br/>
github.com/ynov-vinsonneau-antoine/b1-go-web-api-groupie

</div>

</div>

</div>

<!--
La séparation backend / frontend de la séance 1, en plus fin : Go va
chercher les données et choisit la page (et son code), les templates
affichent, le CSS met en forme.

Celui qui est perdu compare son main.go avec la branche seance-2, fonction
par fonction, dans l'ordre du tableau.
-->

---

# Ça ne marche pas ?

| Ce que vous voyez | La solution |
| --- | --- |
| `/artiste/3` affiche l'accueil | `"/artiste/{id}"` dans `main`, et `go 1.22` ou plus dans `go.mod` |
| `Artiste ` sans numéro | `{id}` et `PathValue("id")` : le même nom |
| Le clic sur une carte ramène à l'accueil | le `href` du lien : `/artiste/`, comme dans `main` |
| Une info vide sur la page de l'artiste | la struct (**majuscule**, ``json:"…"``), et le `/` à la fin de l'adresse |
| La page de l'artiste est blanche | un `{{.Name}}` sans `.Artist` devant dans `artiste.html` |
| `panic: pattern "/" … conflicts with pattern "/"` | l'accueil doit être sur `"/{$}"` |
| La page d'erreur, puis la page de l'artiste en dessous | le `return` après `erreur(…)` |
| `assignment mismatch` ou `undefined: time` | `accueil` ou `artiste` pas remplacée, ou `"time"` manquant dans `import` |
| Toujours la page « ne répond pas » | le Wi-Fi est-il rallumé ? Le message exact est dans le terminal |

<style>
.slidev-layout table { font-size: 0.72rem; }
.slidev-layout td, .slidev-layout th { padding: 0.28rem 0.6rem; }
</style>

<!--
La slide à garder ouverte pendant que tu circules.
-->

---

# Bonus : vous avez fini ?

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

**1. Le nombre de concerts**

Dans `artiste.html`, remplacez le titre des concerts :

<div class="file">templates/artiste.html</div>

```html
<h2>Concerts ({{len .Concerts}})</h2>
```

`len` marche aussi sur une map : le nombre de lieux.

</div>

<div>

**2. Le nombre d'artistes sur l'accueil**

Dans `index.html`, sous le `<h1>` :

<div class="file">templates/index.html</div>

```html
<p>{{len .}} artistes</p>
```

Le point est la liste entière, comme dans `{{range .}}`.

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.7rem !important; }
</style>

<!--
Deux modifications de template seulement : F5 suffit, pas besoin de
relancer Go.
-->

---

# Ce que vous avez fait aujourd'hui

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

- une **adresse par artiste** : `/artiste/{id}`
- une **page par artiste**, avec **deux appels** à l'API
- une struct pour envoyer **plusieurs données** à une page
- des pages d'erreur **404** (introuvable) et **500** (API en panne)
- un **timeout** : on n'attend pas l'API plus de 5 secondes

</div>

<div>

<div class="box info">
<span class="box-label">Séance 3</span>

Une **recherche** et des **filtres** sur les artistes, des lieux de concert
**lisibles**, et une **carte** des concerts.

</div>

<div class="box trap mt-4">
<span class="box-label">Gardez votre dossier groupie</span>

On repart de ce code la prochaine fois.

</div>

</div>

</div>
