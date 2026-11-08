---
theme: default
title: "Pokédex · Séance 2 · La fiche d'un Pokémon"
info: |
  ## Pokédex · Séance 2
  La fiche de chaque Pokémon, son nom en français, et les erreurs.
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

# Pokédex

<p class="big">Aujourd'hui : la fiche de chaque Pokémon, avec son nom en français,<br/>et des pages d'erreur quand ça se passe mal</p>

<div class="abs-br m-6 text-sm">
  <span class="kbd">→</span> avancer · <span class="kbd">d</span> thème clair / sombre
</div>

<!--
Même méthode qu'en séance 1 : ils recopient le code de chaque slide, lancent,
et comparent avec la capture. Rien à inventer.

On repart du dossier pokedex de la séance 1. Ceux qui ne l'ont plus le
récupèrent slide 3.
-->

---

# Ce qu'on construit aujourd'hui

<div class="grid grid-cols-5 gap-6 mt-2 text-left">

<div class="col-span-3">
<div class="browser">
  <div class="browser-bar">localhost:8080/pokemon/1</div>
  <img src="/img/s2-etape-7.png" />
</div>
</div>

<div class="col-span-2">

On **clique sur une carte**, et on arrive sur **la fiche du Pokémon** :
sa grande image, **son nom en français**, ses types.

<div class="box info mt-5">
<span class="box-label">Et quand ça se passe mal</span>

Un Pokémon qui n'existe pas, une API qui ne répond pas : le site affiche
une **vraie page d'erreur**, au lieu d'une page vide.

</div>

</div>

</div>

<!--
Vraie capture du site en fin de séance (Bulbizarre, /pokemon/1). Le montrer
en direct si tu as fait le projet avant.
-->

---

# Avant de commencer

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

**1.** Lancez votre projet de la séance 1 :

```bash
cd pokedex
go run .
```

**2.** Ouvrez **http://localhost:8080** : vous devez voir les 151 cartes.

<div class="box info mt-6">
<span class="box-label">La règle, toujours</span>

`main.go` modifié : <span class="kbd">Ctrl</span> + <span class="kbd">C</span>, `go run .`, <span class="kbd">F5</span>.<br/>
`.html` ou `.css` modifié : <span class="kbd">F5</span> suffit.

</div>

</div>

<div>

<div class="box trap">
<span class="box-label">Votre projet ne marche pas, ou vous l'avez perdu ?</span>

Récupérez celui de la séance 1, **à la place** de votre dossier `pokedex`.
Il est sur la **branche `seance-1`** :

<div class="term mt-3"><span class="prompt">$</span> git clone -b seance-1 https://github.com/ynov-vinsonneau-antoine/b1-go-web-api-pokedex pokedex</div>

Puis `cd pokedex` et `go run .`

</div>

</div>

</div>

<!--
Faire lever la main à ceux qui voient les 151 cartes. Les autres clonent le
dépôt sur la branche seance-1 (le projet exact de la fin de séance 1). Le
-b seance-1 du clone les place directement dessus. Ne pas commencer l'étape
1 tant que tout le monde n'a pas les cartes.

Le go.mod du dépôt demande Go 1.22 : c'est le minimum pour les adresses avec
{id} de l'étape 1.
-->

---

# Comment ça marche

<div class="flow mt-8">
  <div class="flow-node"><b>Le navigateur</b>demande /pokemon/1</div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><b>Votre programme Go</b>demande le Pokémon 1, puis son espèce</div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><b>L'API</b>renvoie le Pokémon, puis son espèce</div>
</div>

<div class="text-left mt-10">

1. On clique sur Bulbasaur : le navigateur demande la page **`/pokemon/1`**
2. Go demande à l'API **le Pokémon n° 1**, puis **son espèce** (où se trouve son nom en français) : deux appels
3. Go range tout dans la fiche du Pokémon, et la renvoie au navigateur

</div>

<div class="box good mt-6 text-left">

Un **endpoint**, c'est une adresse de l'API. En séance 1, on en utilisait un
(la liste). Aujourd'hui, on en ajoute deux : **un Pokémon**, et **son
espèce**.

</div>

<!--
Le même schéma qu'en séance 1, avec deux appels à l'API au lieu d'un. C'est
l'objectif "plusieurs endpoints" du syllabus.
-->

---

# Les 7 étapes

<div class="steps mt-6">
  <div><b>1</b>Une adresse par Pokémon</div>
  <div><b>2</b>Des cartes cliquables</div>
  <div><b>3</b>La fiche du Pokémon</div>
  <div><b>4</b>Son nom en français</div>
  <div><b>5</b>Pokémon introuvable</div>
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
Étapes 1 à 4 : on construit la fiche. Étapes 5 et 6 : on gère ce qui peut
mal tourner. Étape 7 : la mise en forme.
-->

---
class: text-center
---

<div class="step-num">Étape 1</div>

# Une adresse par Pokémon

<div class="steps mt-6">
  <div class="on"><b>1</b>Une adresse par Pokémon</div>
  <div><b>2</b>Des cartes cliquables</div>
  <div><b>3</b>La fiche du Pokémon</div>
  <div><b>4</b>Son nom en français</div>
  <div><b>5</b>Pokémon introuvable</div>
  <div><b>6</b>L'API en panne</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : <code>localhost:8080/pokemon/25</code> affiche <code>Pokémon 25</code></p>

---

# Ajoutez la fonction `fiche`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Ajoutez la fonction **au-dessus** de `main`, puis la ligne `HandleFunc`
dans `main` :

<div class="file">main.go</div>

```go
func fiche(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	fmt.Fprint(w, "Pokémon ", id)
}

func main() {
	http.HandleFunc("/", accueil)
	http.HandleFunc("/pokemon/{id}", fiche)
	http.Handle("/static/", http.FileServer(http.Dir(".")))
```

</div>

<div>

| On écrit | Ça veut dire |
| --- | --- |
| `"/pokemon/{id}"` | toutes les adresses `/pokemon/1`, `/pokemon/2`… |
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
"Pokémon " sans numéro.

Les adresses avec {id} existent depuis Go 1.22. Si un élève a un go.mod
avec "go 1.21" ou moins, /pokemon/25 affiche l'accueil : mettre "go 1.22"
dans go.mod.

POUR TOI : "/pokemon/{id}" + r.PathValue("id") ≈ @Get(':id') + @Param('id').
-->

---

# Relancez, puis tapez l'adresse

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

On a modifié `main.go` :

1. <span class="kbd">Ctrl</span> + <span class="kbd">C</span>, puis `go run .`
2. Ouvrez **http://localhost:8080/pokemon/25**

<div class="box info mt-6">
<span class="box-label">Essayez</span>

Remplacez `25` par `9999`, puis par `abc`. Go affiche ce qu'il y a dans
l'adresse, **sans rien vérifier**. On s'en occupera à l'étape 5.

</div>

</div>

<div>

<div class="box good">
<span class="box-label">Vous devez voir</span>

<div class="browser">
  <div class="browser-bar">localhost:8080/pokemon/25</div>
  <img src="/img/s2-etape-1.png" />
</div>

</div>

</div>

</div>

<!--
L'accueil marche toujours sur localhost:8080 : le "/" attrape toutes les
adresses, sauf celles qui ont leur propre ligne HandleFunc. Go choisit
toujours la ligne la plus précise.

25, c'est Pikachu : on le verra à l'étape 3.
-->

---
class: text-center
---

<div class="step-num">Étape 2</div>

# Des cartes cliquables

<div class="steps mt-6">
  <div><b>1</b>Une adresse par Pokémon</div>
  <div class="on"><b>2</b>Des cartes cliquables</div>
  <div><b>3</b>La fiche du Pokémon</div>
  <div><b>4</b>Son nom en français</div>
  <div><b>5</b>Pokémon introuvable</div>
  <div><b>6</b>L'API en panne</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : un clic sur une carte ouvre l'adresse du Pokémon</p>

---

# Transformez les cartes en liens

Dans la boucle, remplacez `<div class="carte">` par un lien `<a>`, et le
`</div>` de la carte par `</a>` :

<div class="file">templates/index.html</div>

```html
{{range .}}
  <a class="carte" href="/pokemon/{{.ID}}">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{.ID}}.png" alt="{{.Name}}">
    <p>n° {{.ID}}</p>
    <h2>{{.Name}}</h2>
  </a>
{{end}}
```

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Dans `.carte`, ajoutez les deux dernières lignes :

<div class="file">static/style.css</div>

```css
.carte {
  /* … les 5 lignes de la séance 1 … */
  color: black;
  text-decoration: none;
}
```

</div>

<div class="box info">

`{{.ID}}` : le numéro du Pokémon, celui de la séance 1. Bulbasaur a le
numéro 1 : sa carte mène à `/pokemon/1`.

</div>

</div>

<style>
h1 { margin-bottom: 0.3rem; }
.slidev-layout pre.slidev-code { font-size: 0.58rem !important; }
</style>

<!--
Seules la 2e et l'avant-dernière ligne changent : l'image, le numéro et le
nom restent les mêmes.

Sans les deux lignes CSS, tout le texte des cartes devient bleu et souligné,
comme n'importe quel lien. Le commentaire du CSS veut dire : on garde les
lignes déjà là (background, border-radius, padding, text-align, box-shadow).

On n'a touché ni à main.go ni à la struct : F5 suffit.
-->

---

# Cliquez sur une carte

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

On n'a modifié que le HTML et le CSS : <span class="kbd">F5</span> suffit.

Sur l'accueil, **cliquez sur Bulbasaur**, la première carte.

<div class="box info mt-6">

Le curseur devient une main sur les cartes. Après le clic, l'adresse est
**`localhost:8080/pokemon/1`**.

</div>

</div>

<div>

<div class="box good">
<span class="box-label">Vous devez voir</span>

<div class="browser">
  <div class="browser-bar">localhost:8080/pokemon/1</div>
  <img src="/img/s2-etape-2.png" />
</div>

</div>

</div>

</div>

<!--
Si le clic ramène sur l'accueil : l'adresse du lien et celle du HandleFunc ne
sont pas les mêmes (/pokemon/ des deux côtés, sans s, sans accent).
-->

---
class: text-center
---

<div class="step-num">Étape 3</div>

# La fiche du Pokémon

<div class="steps mt-6">
  <div><b>1</b>Une adresse par Pokémon</div>
  <div><b>2</b>Des cartes cliquables</div>
  <div class="on"><b>3</b>La fiche du Pokémon</div>
  <div><b>4</b>Son nom en français</div>
  <div><b>5</b>Pokémon introuvable</div>
  <div><b>6</b>L'API en panne</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : la fiche affiche la grande image, le numéro, le nom et les types du Pokémon</p>

---

# Regardez un Pokémon dans l'API

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Ouvrez cette adresse dans un nouvel onglet :

<p class="big"><a href="https://pokeapi.co/api/v2/pokemon/1">pokeapi.co/api/v2/pokemon/1</a></p>

**Un seul Pokémon**, avec beaucoup d'informations : la réponse est très
longue. On prend **`id`**, **`name`** et **`types`**.

<div class="box info mt-4">

Dans `types`, chaque élément contient un objet **`type`**, qui contient le
**`name`** : des objets **dans** des objets.

</div>

</div>

<div>

```json
{
  "id": 1,
  "name": "bulbasaur",
  …
  "types": [
    {
      "slot": 1,
      "type": { "name": "grass", "url": "…" }
    },
    {
      "slot": 2,
      "type": { "name": "poison", "url": "…" }
    }
  ],
  …
}
```

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.62rem !important; }
</style>

<!--
Firefox : replier "moves" (des centaines de lignes) pour trouver "types" plus
vite. Ou utiliser le filtre de la vue JSON.

Essayer aussi pokeapi.co/api/v2/pokemon/pikachu : l'API accepte le numéro
ou le nom anglais.
-->

---

# Décrivez un Pokémon en Go

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Remplacez la struct `Pokemon`, et ajoutez `Nom` et `Type` **au-dessus** :

<div class="file">main.go</div>

```go
type Nom struct {
	Name string `json:"name"`
}

type Type struct {
	Type Nom `json:"type"`
}

type Pokemon struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Types []Type `json:"types"`
}
```

</div>

<div>

On décrit le JSON **tel qu'il est**, de l'intérieur vers l'extérieur :

| On écrit | Ça veut dire |
| --- | --- |
| `Nom` | un objet qui n'a qu'un `name` |
| `Type` | un élément de `types` : il contient un `type`, qui est un `Nom` |
| `Types []Type` | la liste des types du Pokémon |
| `ID … json:"id"` | cette fois, **l'API donne** le numéro |

<div class="box trap mt-4">

`ListePokemon` et la boucle de la séance 1 **ne changent pas** : dans la
liste, il n'y a toujours pas d'`id`.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.6rem !important; }
</style>

<!--
Le seul vrai nouveau concept de l'étape : une struct dans une struct, comme
un objet dans un objet en JSON. Montrer la slide précédente en parallèle.

Nom resservira à l'étape 4 : la langue d'une traduction est aussi un objet
avec un seul "name".

POUR TOI : ≈ des interfaces TS imbriquées.
-->

---

# La fonction `getPokemon`

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-3">

Sous `getPokemons`, ajoutez :

<div class="file">main.go</div>

```go
func getPokemon(id string) Pokemon {
	resp, err := http.Get("https://pokeapi.co/api/v2/pokemon/" + id)
	if err != nil {
		fmt.Println("Erreur :", err)
		return Pokemon{}
	}
	defer resp.Body.Close()

	var pokemon Pokemon
	json.NewDecoder(resp.Body).Decode(&pokemon)
	return pokemon
}
```

</div>

<div class="col-span-2">

C'est `getPokemons` **sans le s** :

- l'adresse finit par **`+ id`**
- on renvoie **un seul** `Pokemon`
- pas de boucle : le numéro est **dans la réponse**

<div class="box info mt-4">

`Pokemon{}` : un Pokémon vide, renvoyé si l'API est injoignable.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.6rem !important; }
</style>

<!--
Faire comparer getPokemons et getPokemon côte à côte.

Le / à la fin de "…/api/v2/pokemon/" est indispensable : sans lui, l'adresse
devient …/api/v2/pokemon1.
-->

---

# Créez `templates/fiche.html`

<div class="file">templates/fiche.html</div>

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
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{{.ID}}.png" alt="{{.Name}}">
    <div>
      <p>n° {{.ID}}</p>
      <h1>{{.Name}}</h1>

      <h2>Types</h2>
      <ul class="types">
        {{range .Types}}
          <li>{{.Type.Name}}</li>
        {{end}}
      </ul>
    </div>
  </div>
</body>
</html>
```

<div class="box info mt-1">

À côté de `index.html`. **`…/official-artwork/{{.ID}}.png`** : la grande image. **`{{range .Types}}`** : pour chaque type… **`{{.Type.Name}}`** : …son nom.

</div>

<style>
h1 { margin-bottom: 0.2rem; }
.slidev-layout pre.slidev-code { font-size: 0.46rem !important; line-height: 1.3 !important; }
</style>

<!--
Copier-coller autorisé pour ce fichier si la salle est en retard : la
structure du head est la même que index.html. L'adresse de l'image surtout :
elle est longue.

{{.Type.Name}} : dans la boucle, le point est un Type ; .Type est son Nom ;
.Name est le texte. On suit le JSON.

La flèche de "← Retour" est difficile à taper : écrire simplement "Retour"
convient très bien.

Les classes fiche et types serviront au CSS, à l'étape 7.
-->

---

# Remplacez la fonction `fiche`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

<div class="file">main.go</div>

```go
func fiche(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	pokemon := getPokemon(id)

	tmpl := template.Must(template.ParseFiles("templates/fiche.html"))
	tmpl.Execute(w, pokemon)
}
```

<div class="box info mt-4">

Comme `accueil`, mais avec **un seul Pokémon** et le template
`fiche.html`.

</div>

</div>

<div>

<div class="box good">
<span class="box-label">Vous devez voir, après Ctrl + C, go run . et F5</span>

<div class="browser">
  <div class="browser-bar">localhost:8080/pokemon/1</div>
  <img src="/img/s2-etape-3.png" />
</div>

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.56rem !important; }
</style>

<!--
La photo au-dessus et le nom au centre : c'est normal, pas encore de CSS
pour cette page.

Essayer /pokemon/25 (Pikachu) et /pokemon/pikachu : les deux marchent,
l'API accepte le nom anglais.

Si le nom ou les types sont vides : la struct (majuscule et json:"…"), ou
le / à la fin de l'adresse dans getPokemon.
-->

---
layout: center
---

# Pause · 10 minutes

<p class="big">Au retour : le nom de chaque Pokémon en français.</p>

---
class: text-center
---

<div class="step-num">Étape 4</div>

# Son nom en français

<div class="steps mt-6">
  <div><b>1</b>Une adresse par Pokémon</div>
  <div><b>2</b>Des cartes cliquables</div>
  <div><b>3</b>La fiche du Pokémon</div>
  <div class="on"><b>4</b>Son nom en français</div>
  <div><b>5</b>Pokémon introuvable</div>
  <div><b>6</b>L'API en panne</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : la fiche affiche <b>Bulbizarre</b>, et plus seulement bulbasaur</p>

---

# Regardez l'espèce dans l'API

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Ouvrez cette adresse dans un nouvel onglet :

<p class="big"><a href="https://pokeapi.co/api/v2/pokemon-species/1">pokeapi.co/api/v2/pokemon-species/1</a></p>

L'**espèce** du Pokémon n° 1. Dans **`names`** : son nom **dans chaque
langue**. La langue est dans `language`, et le français s'écrit **`fr`**.

<div class="box info mt-4">

C'est un **autre endpoint** : pour afficher la fiche, Go va maintenant
appeler l'API **deux fois**.

</div>

</div>

<div>

```json
{
  "id": 1,
  "names": [
    …
    {
      "language": { "name": "fr", "url": "…" },
      "name": "Bulbizarre"
    },
    {
      "language": { "name": "de", "url": "…" },
      "name": "Bisasam"
    },
    …
  ],
  …
}
```

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.62rem !important; }
</style>

<!--
L'API sépare le Pokémon (ses combats : types, stats…) et son espèce (son
nom dans chaque langue, sa description…).

Le français n'est pas le premier de la liste (il y a d'abord le japonais,
le coréen…) : il faudra le chercher. C'est l'objet de la slide d'après.
-->

---

# Décrivez l'espèce en Go

<div class="grid grid-cols-5 gap-6 mt-2">

<div class="col-span-2">

**1.** Sous `ListePokemon`, ajoutez :

<div class="file">main.go</div>

```go
type Traduction struct {
	Name     string `json:"name"`
	Language Nom    `json:"language"`
}

type Espece struct {
	Names []Traduction `json:"names"`
}
```

`Language` est un `Nom` : on réutilise la struct de l'étape 3.

</div>

<div class="col-span-3">

**2.** Sous `getPokemon`, ajoutez :

<div class="file">main.go</div>

```go
func getEspece(id string) Espece {
	resp, err := http.Get("https://pokeapi.co/api/v2/pokemon-species/" + id)
	if err != nil {
		fmt.Println("Erreur :", err)
		return Espece{}
	}
	defer resp.Body.Close()

	var espece Espece
	json.NewDecoder(resp.Body).Decode(&espece)
	return espece
}
```

<div class="box info mt-4">

Encore la même forme. Seuls l'adresse et le type changent.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.52rem !important; }
</style>

<!--
À ce stade, getPokemons, getPokemon et getEspece se ressemblent beaucoup :
le faire remarquer. On les regroupera à l'étape 6.

Espece sans accent : un nom Go ne doit pas contenir d'accent (c'est permis,
mais on évite).
-->

---

# Trouvez le nom en français

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Sous `getEspece`, ajoutez :

<div class="file">main.go</div>

```go
func nomFrancais(espece Espece) string {
	for _, traduction := range espece.Names {
		if traduction.Language.Name == "fr" {
			return traduction.Name
		}
	}
	return ""
}
```

</div>

<div>

| On écrit | Ça veut dire |
| --- | --- |
| `for _, traduction := range espece.Names` | pour chaque traduction du nom… |
| `if traduction.Language.Name == "fr"` | …si sa langue est le français… |
| `return traduction.Name` | …on renvoie ce nom, et on s'arrête |
| `return ""` | aucune traduction française : un texte vide |

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.6rem !important; }
</style>

<!--
Le _ : range donne la position et l'élément. On n'a pas besoin de la
position, on la jette avec _.

traduction.Language.Name : on suit le JSON, comme {{.Type.Name}} dans le
template.

POUR TOI : ≈ espece.names.find(t => t.language.name === "fr")?.name ?? "".
-->

---

# Envoyez deux données à la page

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

**1.** Sous la struct `Espece`, ajoutez :

<div class="file">main.go</div>

```go
type PagePokemon struct {
	Pokemon Pokemon
	NomFr   string
}
```

<div class="box info mt-4">

`Execute` n'accepte **qu'une seule donnée**. Pour en envoyer deux, on les
range dans une struct, et on envoie la struct.

</div>

</div>

<div>

**2.** Remplacez la fonction `fiche` :

<div class="file">main.go</div>

```go
func fiche(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	page := PagePokemon{
		Pokemon: getPokemon(id),
		NomFr:   nomFrancais(getEspece(id)),
	}

	tmpl := template.Must(template.ParseFiles("templates/fiche.html"))
	tmpl.Execute(w, page)
}
```

<div class="box trap mt-4">

Dans le HTML, le point `.` est maintenant **la `PagePokemon`** : le numéro
devient `.Pokemon.ID`. On met à jour `fiche.html` juste après.

</div>

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.52rem !important; }
</style>

<!--
PagePokemon = "tout ce dont la page a besoin". Le même principe servira pour
toute page qui affiche plusieurs choses.

nomFrancais(getEspece(id)) : on appelle l'API, puis on cherche le nom
français dans la réponse.

POUR TOI : ≈ un DTO de vue / les props d'une page.
-->

---

# Remplacez tout le contenu de `fiche.html`

<div class="file">templates/fiche.html</div>

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>{{.NomFr}}</title>
  <link rel="stylesheet" href="/static/style.css">
</head>
<body>
  <a href="/">← Retour</a>
  <div class="fiche">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{{.Pokemon.ID}}.png" alt="{{.NomFr}}">
    <div>
      <p>n° {{.Pokemon.ID}}</p>
      <h1>{{.NomFr}}</h1>
      <p>En anglais : {{.Pokemon.Name}}</p>

      <h2>Types</h2>
      <ul class="types">
        {{range .Pokemon.Types}}
          <li>{{.Type.Name}}</li>
        {{end}}
      </ul>
    </div>
  </div>
</body>
</html>
```

<div class="box info mt-1">

Partout, **`.Pokemon.`** devant les infos du Pokémon. **`{{.NomFr}}`** : le nom français, dans le titre, le `<h1>` et le `alt`.

</div>

<style>
h1 { margin-bottom: 0.2rem; }
.slidev-layout pre.slidev-code { font-size: 0.44rem !important; line-height: 1.28 !important; }
</style>

<!--
Copier-coller autorisé si la salle est en retard : seuls les .Pokemon. et le
nom français sont nouveaux.

Dans {{range .Pokemon.Types}}, le point redevient le type en cours :
{{.Type.Name}} ne change pas.
-->

---

# Relancez

<div class="grid grid-cols-5 gap-8 mt-2">

<div class="col-span-2">

On a modifié `main.go` :

1. <span class="kbd">Ctrl</span> + <span class="kbd">C</span>
2. `go run .`
3. <span class="kbd">F5</span> sur `localhost:8080/pokemon/1`

Le nom français, et le nom anglais en dessous.

<div class="box info mt-4">
<span class="box-label">Essayez</span>

`/pokemon/4` : Salamèche. `/pokemon/7` : Carapuce.

</div>

</div>

<div class="col-span-3">

<div class="box good">
<span class="box-label">Vous devez voir, sous l'image</span>

<div class="browser">
  <div class="browser-bar">localhost:8080/pokemon/1</div>
  <img src="/img/s2-etape-4.png" />
</div>

</div>

</div>

</div>

<!--
Page blanche, ou qui s'arrête au milieu : il reste un {{.ID}} ou un
{{.Name}} sans .Pokemon devant dans fiche.html. Le terminal n'affiche rien,
la page s'arrête juste à cet endroit.

Pas de nom français : json:"names" ou json:"language" mal écrit, le "fr" en
majuscules, ou le / à la fin de l'adresse dans getEspece.
-->

---
class: text-center
---

<div class="step-num">Étape 5</div>

# Pokémon introuvable

<div class="steps mt-6">
  <div><b>1</b>Une adresse par Pokémon</div>
  <div><b>2</b>Des cartes cliquables</div>
  <div><b>3</b>La fiche du Pokémon</div>
  <div><b>4</b>Son nom en français</div>
  <div class="on"><b>5</b>Pokémon introuvable</div>
  <div><b>6</b>L'API en panne</div>
  <div><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : <code>/pokemon/9999</code> affiche une page d'erreur, avec le code 404</p>

---

# Essayez un Pokémon qui n'existe pas

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

**1.** Ouvrez **localhost:8080/pokemon/9999**

Une fiche vide : `n° 0`, pas de nom, une image cassée.

**2.** Regardez ce que répond l'API : [pokeapi.co/api/v2/pokemon/9999](https://pokeapi.co/api/v2/pokemon/9999)

```json
{
  "status": 404,
  "message": "Not Found"
}
```

</div>

<div>

<div class="box bad">
<span class="box-label">Le problème</span>

L'API répond bien « introuvable », mais **notre code ne regarde pas** : il
lit la réponse comme un Pokémon. Pas d'`id`, pas de `name` : le Pokémon
reste **vide, avec l'`ID` 0**. C'est à nous de le repérer.

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
Le 404 de l'API se voit dans F12 > Réseau, sur l'onglet de l'API. Notre site,
lui, répond encore 200 avec une fiche vide.

/pokemon/abc donne la même chose : l'API répond aussi 404. Le même test
réglera les deux cas.

On regardera le code de l'API lui-même à l'étape 6, quand on regroupera les
appels.
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
fiche.html, erreur.html.
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

# Vérifiez le Pokémon dans `fiche`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Remplacez la fonction `fiche` :

<div class="file">main.go</div>

```go
func fiche(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	pokemon := getPokemon(id)
	if pokemon.ID == 0 {
		erreur(w, 404, "Ce Pokémon n'existe pas.")
		return
	}

	page := PagePokemon{
		Pokemon: pokemon,
		NomFr:   nomFrancais(getEspece(id)),
	}

	tmpl := template.Must(template.ParseFiles("templates/fiche.html"))
	tmpl.Execute(w, page)
}
```

</div>

<div>

**`pokemon := getPokemon(id)`** : on récupère le Pokémon **avant** de faire
la page, pour pouvoir le vérifier.

**`if pokemon.ID == 0`** : le Pokémon est vide, il n'existe pas.

**`return`** : on arrête la fonction ici. Sans lui, Go continuerait et
ajouterait la fiche vide sous la page d'erreur.

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.55rem !important; }
</style>

<!--
L'oubli du return est l'erreur classique : la page d'erreur s'affiche, puis
la fiche vide en dessous.

Bonus de ce test : si le Pokémon n'existe pas, on n'appelle même pas l'API
pour son espèce.
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
	http.HandleFunc("/pokemon/{id}", fiche)
	http.HandleFunc("/", introuvable)
	http.Handle("/static/", http.FileServer(http.Dir(".")))
```

</div>

<div>

<div class="box info">
<span class="box-label">Pourquoi</span>

Avec `"/"`, l'accueil s'affiche pour **toutes** les adresses :
`/nimportequoi` montre les 151 Pokémon.

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

/static/ et /pokemon/{id} gardent leur propre ligne : Go choisit toujours
la plus précise.

Effet de bord utile : /favicon.ico ne déclenche plus l'appel à l'API.
-->

---

# Relancez et testez

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

<span class="kbd">Ctrl</span> + <span class="kbd">C</span>, `go run .`, puis
ouvrez ces adresses :

| Adresse | Vous devez voir |
| --- | --- |
| `/pokemon/1` | la fiche de Bulbizarre, comme avant |
| `/pokemon/9999` | Oups ! Ce Pokémon n'existe pas. |
| `/pokemon/abc` | Oups ! Ce Pokémon n'existe pas. |
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
  <div class="browser-bar">localhost:8080/pokemon/9999</div>
  <img src="/img/s2-etape-5.png" />
</div>

</div>

</div>

</div>

<!--
Le "Oups !" est centré et rouge, le message ne l'est pas : c'est le CSS de
la séance 1 (h1 centré et rouge). On règle ça à l'étape 7.

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
  <div><b>1</b>Une adresse par Pokémon</div>
  <div><b>2</b>Des cartes cliquables</div>
  <div><b>3</b>La fiche du Pokémon</div>
  <div><b>4</b>Son nom en français</div>
  <div><b>5</b>Pokémon introuvable</div>
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

<div class="term"><span class="err">Erreur : Get "https://pokeapi.co/api/v2/pokemon?limit=151": dial tcp: lookup pokeapi.co: no such host</span></div>

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

Sur une fiche, sans Wi-Fi, c'est pire : "Ce Pokémon n'existe pas", alors
qu'il existe. On mélange "introuvable" et "en panne" : c'est ce qu'on règle.
-->

---

# Une seule fonction pour appeler l'API

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Ajoutez `"time"` dans `import`, puis ce bloc **au-dessus** de `getPokemons` :

<div class="file">main.go</div>

```go
var client = &http.Client{Timeout: 5 * time.Second}

func appelerAPI(adresse string, resultat any) error {
	resp, err := client.Get("https://pokeapi.co/api/v2/" + adresse)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode == 404 {
		return nil
	}
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
| `StatusCode == 404` | introuvable : **pas une panne**. Le résultat reste vide, et `fiche` affichera le 404 |
| `StatusCode != 200` | l'API a répondu, mais avec une erreur |
| `return err` | on ne s'occupe pas de l'erreur ici : on la renvoie |

</div>

</div>

<style>
h1 { margin-bottom: 0.3rem; }
.slidev-layout pre.slidev-code { font-size: 0.5rem !important; line-height: 1.32 !important; }
.slidev-layout table { font-size: 0.78rem; }
</style>

<!--
Les trois cas de panne : pas de réseau (err de Get), API trop lente
(Timeout), API qui répond une erreur (StatusCode). Le syllabus demande 404,
500 et timeout : les trois sont là.

Le cas 404 est mis à part : l'API a bien répondu, elle n'a juste rien
trouvé. On renvoie nil (pas d'erreur), le Pokémon reste vide, et le test
pokemon.ID == 0 de l'étape 5 continue de marcher.

Sans Timeout, http.Get peut attendre très longtemps une API qui ne répond
pas.

POUR TOI : appelerAPI ≈ un petit service HTTP partagé. Renvoyer l'erreur ≈
la laisser remonter au lieu de faire un try/catch sur place.
-->

---

# Remplacez les trois fonctions `get…`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Remplacez `getPokemons`, `getPokemon` et `getEspece` par :

<div class="file">main.go</div>

```go
func getPokemons() ([]Pokemon, error) {
	var liste ListePokemon
	err := appelerAPI("pokemon?limit=151", &liste)
	for i := range liste.Results {
		liste.Results[i].ID = i + 1
	}
	return liste.Results, err
}

func getPokemon(id string) (Pokemon, error) {
	var pokemon Pokemon
	err := appelerAPI("pokemon/"+id, &pokemon)
	return pokemon, err
}

func getEspece(id string) (Espece, error) {
	var espece Espece
	err := appelerAPI("pokemon-species/"+id, &espece)
	return espece, err
}
```

</div>

<div>

**`([]Pokemon, error)`** : la fonction renvoie **deux choses** : le
résultat, et l'erreur. L'erreur vaut `nil` si tout s'est bien passé.

**`&liste`** : comme en séance 1, on donne l'adresse de la variable à
remplir.

`nomFrancais` **ne change pas** : elle n'appelle pas l'API.

<div class="box trap mt-4">
<span class="box-label">Ne relancez pas encore</span>

`accueil` et `fiche` attendent encore les anciennes fonctions : le
programme ne compile plus. On les met à jour sur les deux slides suivantes.

</div>

</div>

</div>

<style>
h1 { margin-bottom: 0.3rem; }
.slidev-layout pre.slidev-code { font-size: 0.5rem !important; line-height: 1.36 !important; }
</style>

<!--
Chaque fonction est beaucoup plus courte. Les comparer avec les anciennes :
c'est l'intérêt d'avoir regroupé le code dans appelerAPI.

La boucle du numéro reste dans getPokemons : elle n'a rien à voir avec
l'appel.

Si un élève relance quand même :
  assignment mismatch: 1 variable but getPokemons returns 2 values
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
	erreur(w, 500, "Le Pokédex ne répond pas. Réessayez plus tard.")
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
	pokemons, err := getPokemons()
	if err != nil {
		apiEnPanne(w, err)
		return
	}

	tmpl := template.Must(template.ParseFiles("templates/index.html"))
	tmpl.Execute(w, pokemons)
}
```

**`pokemons, err :=`** : on récupère le résultat **et** l'erreur.<br/>
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

# … et dans `fiche`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Remplacez la fonction `fiche` :

<div class="file">main.go</div>

```go
func fiche(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	pokemon, err := getPokemon(id)
	if err != nil {
		apiEnPanne(w, err)
		return
	}
	if pokemon.ID == 0 {
		erreur(w, 404, "Ce Pokémon n'existe pas.")
		return
	}

	espece, err := getEspece(id)
	if err != nil {
		apiEnPanne(w, err)
		return
	}

	page := PagePokemon{
		Pokemon: pokemon,
		NomFr:   nomFrancais(espece),
	}

	tmpl := template.Must(template.ParseFiles("templates/fiche.html"))
	tmpl.Execute(w, page)
}
```

</div>

<div>

Trois vérifications, dans l'ordre :

1. l'API a-t-elle répondu pour le Pokémon ? Sinon **500**
2. le Pokémon existe-t-il ? Sinon **404**
3. l'API a-t-elle répondu pour l'espèce ? Sinon **500**

<div class="box good mt-6">

Chaque problème a **sa page** et **son code**. Si tout va bien, on arrive
en bas : la fiche du Pokémon.

</div>

</div>

</div>

<style>
h1 { margin-bottom: 0.3rem; }
.slidev-layout pre.slidev-code { font-size: 0.48rem !important; line-height: 1.34 !important; }
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
3. Rallumez le Wi-Fi, puis <span class="kbd">F5</span> : les Pokémon reviennent

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

Vérifier aussi /pokemon/9999 avec le Wi-Fi : toujours le 404 (grâce au cas
StatusCode == 404 de appelerAPI).

Erreurs de compilation fréquentes ici :
- undefined: time → "time" manquant dans import
- assignment mismatch → une fonction accueil ou fiche pas remplacée
-->

---
class: text-center
---

<div class="step-num">Étape 7</div>

# Le CSS

<div class="steps mt-6">
  <div><b>1</b>Une adresse par Pokémon</div>
  <div><b>2</b>Des cartes cliquables</div>
  <div><b>3</b>La fiche du Pokémon</div>
  <div><b>4</b>Son nom en français</div>
  <div><b>5</b>Pokémon introuvable</div>
  <div><b>6</b>L'API en panne</div>
  <div class="on"><b>7</b>Le CSS</div>
</div>

<p class="mt-8">À la fin : la fiche est une vraie carte, les types sont des badges, et la page d'erreur est centrée</p>

---

# Ajoutez à la fin de `static/style.css`

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

<div class="file">static/style.css</div>

```css
.fiche {
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 800px;
  margin: 1.5rem auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.fiche img {
  width: 300px;
}

.fiche h1 {
  text-align: left;
  margin-top: 0;
}
```

</div>

<div>

<div class="file">static/style.css (suite)</div>

```css
.types {
  padding: 0;
}

.types li {
  display: inline-block;
  background: #e3350d;
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  text-transform: capitalize;
}

.erreur {
  text-align: center;
  margin-top: 4rem;
}
```

<div class="box info mt-3">

`.fiche` : l'image à gauche, les infos à droite.<br/>
`.types li` : chaque type devient un badge.

</div>

</div>

</div>

<style>
h1 { margin-bottom: 0.3rem; }
.slidev-layout pre.slidev-code { font-size: 0.54rem !important; line-height: 1.3 !important; }
</style>

<!--
Copier-coller autorisé, comme en séance 1.

display: inline-block met les types côte à côte, au lieu d'une liste à
puces. padding: 0 sur .types enlève le décalage de la liste.
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

`/pokemon/9999` : la page d'erreur est maintenant centrée.

</div>

</div>

<div class="col-span-3">

<div class="box good">
<span class="box-label">Vous devez voir</span>

<div class="browser">
  <div class="browser-bar">localhost:8080/pokemon/1</div>
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
| **Les données** | `Nom`, `Type`, `Pokemon`, `ListePokemon`, `Traduction`, `Espece`, `PagePokemon` |
| **Parler à l'API** | `client`, `appelerAPI`, `getPokemons`, `getPokemon`, `getEspece`, `nomFrancais` |
| **Les erreurs** | `erreur`, `apiEnPanne` |
| **Les pages** | `accueil`, `fiche`, `introuvable` |
| **Les adresses** | `main` |

</div>

<div>

<div class="box info">
<span class="box-label">Votre projet</span>

<div class="term">pokedex/<br/>├── go.mod<br/>├── main.go<br/>├── static/<br/>│&nbsp;&nbsp;&nbsp;└── style.css<br/>└── templates/<br/>&nbsp;&nbsp;&nbsp;&nbsp;├── erreur.html<br/>&nbsp;&nbsp;&nbsp;&nbsp;├── fiche.html<br/>&nbsp;&nbsp;&nbsp;&nbsp;└── index.html</div>

</div>

<div class="box good mt-4">
<span class="box-label">Le projet complet</span>

Sur GitHub, branche **seance-2** :<br/>
github.com/ynov-vinsonneau-antoine/b1-go-web-api-pokedex

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
| `/pokemon/25` affiche l'accueil | `"/pokemon/{id}"` dans `main`, et `go 1.22` ou plus dans `go.mod` |
| `Pokémon ` sans numéro | `{id}` et `PathValue("id")` : le même nom |
| Le clic sur une carte ramène à l'accueil | le `href` du lien : `/pokemon/`, comme dans `main` |
| Une info vide sur la fiche | la struct (**majuscule**, ``json:"…"``), et le `/` à la fin de l'adresse |
| Pas de nom français | ``json:"names"``, ``json:"language"``, et `"fr"` en minuscules |
| La fiche est blanche ou coupée | un `{{.ID}}` ou `{{.Name}}` sans `.Pokemon` devant dans `fiche.html` |
| `panic: pattern "/" … conflicts with pattern "/"` | l'accueil doit être sur `"/{$}"` |
| La page d'erreur, puis la fiche en dessous | le `return` après `erreur(…)` |
| `assignment mismatch` ou `undefined: time` | `accueil` ou `fiche` pas remplacée, ou `"time"` manquant dans `import` |
| Toujours la page « ne répond pas » | le Wi-Fi est-il rallumé ? Le message exact est dans le terminal |

<style>
.slidev-layout table { font-size: 0.68rem; }
.slidev-layout td, .slidev-layout th { padding: 0.24rem 0.6rem; }
</style>

<!--
La slide à garder ouverte pendant que tu circules.
-->

---

# Bonus 1 : les statistiques

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

**1.** Dans `main.go`, ajoutez la struct `Stat` **au-dessus** de
`Pokemon` :

<div class="file">main.go</div>

```go
type Stat struct {
	BaseStat int `json:"base_stat"`
	Stat     Nom `json:"stat"`
}
```

**2.** Dans la struct `Pokemon`, ajoutez la ligne :

<div class="file">main.go</div>

```go
	Stats []Stat `json:"stats"`
```

</div>

<div>

**3.** Dans `fiche.html`, sous la liste des types :

<div class="file">templates/fiche.html</div>

```html
<h2>Statistiques</h2>
<ul>
  {{range .Pokemon.Stats}}
    <li>{{.Stat.Name}} : {{.BaseStat}}</li>
  {{end}}
</ul>
```

Puis relancez Go : `hp : 45`, `attack : 49`…

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.6rem !important; }
</style>

<!--
Relancer Go (main.go modifié). Le même principe que les types : une struct
dans une struct. Ouvrir pokeapi.co/api/v2/pokemon/1 et chercher "stats" pour
voir d'où ça vient. Les stats serviront au graphique de la séance 3.
-->

---

# Bonus 2 : une couleur par type

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Dans `fiche.html`, donnez au badge le nom du type comme classe :

<div class="file">templates/fiche.html</div>

```html
<li class="{{.Type.Name}}">{{.Type.Name}}</li>
```

Le badge de Salamèche devient `<li class="fire">`.

</div>

<div>

À la fin de `style.css` :

<div class="file">static/style.css</div>

```css
.types .fire {
  background: #f08030;
}

.types .water {
  background: #6890f0;
}

.types .grass {
  background: #78c850;
}
```

<span class="kbd">F5</span>, puis essayez `/pokemon/4`, `/pokemon/7`.
Ajoutez d'autres types !

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.6rem !important; line-height: 1.35 !important; }
</style>

<!--
F5 suffit. Les noms des types de l'API : normal, fire, water,
grass, electric, ice, fighting, poison, ground, flying, psychic, bug, rock,
ghost, dragon, dark, steel, fairy.
-->

---

# Ce que vous avez fait aujourd'hui

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

- une **adresse par Pokémon** : `/pokemon/{id}`
- une **fiche**, avec **deux appels** à l'API
- des **structs dans des structs**, pour lire un JSON imbriqué
- une struct pour envoyer **plusieurs données** à une page
- des pages d'erreur **404** (introuvable) et **500** (API en panne)
- un **timeout** : on n'attend pas l'API plus de 5 secondes

</div>

<div>

<div class="box info">
<span class="box-label">Séance 3</span>

Une **recherche** et un **filtre par type** sur l'accueil, et un
**graphique** des statistiques sur chaque fiche.

</div>

<div class="box trap mt-4">
<span class="box-label">Gardez votre dossier pokedex</span>

On repart de ce code la prochaine fois.

</div>

</div>

</div>
