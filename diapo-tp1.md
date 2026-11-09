---
theme: default
title: "TP de groupe · Votre site avec une API"
info: |
  ## TP de groupe · Séance 1
  Refaire le site de la séance 1 avec une autre API, en groupe de 3.
  Bachelor 1
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

<div class="tag mb-6">Go · TP en groupe de 3 · noté</div>

# Votre site avec une API

<p class="big">Le même site que le Pokédex,<br/>avec une autre API, et sans les slides</p>

<div class="abs-br m-6 text-sm">
  <span class="kbd">→</span> avancer · <span class="kbd">d</span> thème clair / sombre
</div>

<!--
Présenter le TP en 10 minutes maximum, puis laisser les groupes se former
et choisir leur API.

Le message : "aujourd'hui vous avez recopié. Maintenant vous refaites la
même chose seuls, avec d'autres données. C'est là qu'on voit si vous avez
compris."
-->

---

# Choisissez votre API

<div class="text-left mt-4">

| Thème | Adresse |
|---|---|
| Rick and Morty | `https://rickandmortyapi.com/api/character` |
| Harry Potter | `https://potterapi-fedeperin.vercel.app/fr/characters` |
| Star Wars | `https://swapi.info/api/people` |
| Studio Ghibli | `https://ghibliapi.vercel.app/films` |
| Recettes | `https://www.themealdb.com/api/json/v1/1/search.php?s=` |

</div>

<div class="box trap mt-6 text-left">
<span class="box-label">Une autre API ?</span>

Possible, mais **validée par moi avant de coder**. Elle doit marcher
**sans clé ni inscription**, et renvoyer une **liste** en JSON.

</div>

<!--
Toutes testées le 09/11/2026. Les retester la veille : ce sont de petites
API gratuites (hp-api.onrender.com, l'ancienne API Harry Potter, a été
suspendue, et restcountries a fermé sa v3.1).

Pour la validation d'une API libre : l'ouvrir dans le navigateur devant le
groupe. Si on voit du JSON avec une liste, c'est bon.

Forme des réponses (pour la correction) :
- Rick and Morty : un objet, la liste est dans "results" (comme PokéAPI)
- Recettes : un objet, la liste est dans "meals"
- Harry Potter, Star Wars, Ghibli : directement un tableau [ ... ]
- Star Wars n'a pas d'image : deux champs texte suffisent
-->

---

# Ce qui est demandé

<div class="text-left mt-6">

1. Un **serveur Go** qui se lance avec `go run main.go`, sur `localhost:8080`
2. Une **fonction** qui appelle l'API et range la réponse dans vos **structs**
3. Une page `templates/index.html` avec **une carte par élément** (`{{range .}}`)
4. **Au moins deux informations** par carte (le nom et l'image, le nom et le réalisateur…)
5. Un fichier `static/style.css` **relié à la page**

</div>

<div class="box info mt-8 text-left">
<span class="box-label">Bonus</span>

Le nombre d'éléments avec `{{len .}}` · une image sur chaque carte · un CSS
soigné et personnel.

</div>

<!--
Ce sont exactement les 7 étapes de la séance, sans le code.
-->

---

# Par où commencer

<div class="steps mt-6">
  <div><b>1</b>Ouvrir l'API dans le navigateur</div>
  <div><b>2</b>Écrire la struct sur papier</div>
  <div><b>3</b>Le serveur et la page</div>
  <div><b>4</b>Appeler l'API</div>
  <div><b>5</b>Les cartes et le CSS</div>
</div>

<div class="box trap mt-10 text-left">
<span class="box-label">Le piège n°1</span>

Regardez le **premier caractère** de la réponse de l'API.
Une `{` et une `[` ne se décrivent pas de la même façon en Go.

</div>

<div class="box bad mt-4 text-left">
<span class="box-label">La page est vide, sans erreur ?</span>

Vérifiez vos structs : champs avec une **majuscule**, et tags `json:"..."`
écrits **exactement** comme dans l'API.

</div>

<!--
Passer voir chaque groupe à l'étape 2, avant qu'il touche au clavier : une
struct fausse dès le départ donne une page vide sans erreur, et c'est là
qu'ils perdent le plus de temps.

Le piège n°1 : PokéAPI renvoyait un objet { "results": [...] }. Harry
Potter, Star Wars et Ghibli renvoient directement un tableau : on décode
dans un []Personnage, sans struct autour. Ne pas donner la réponse, les
laisser chercher.
-->

---

# Le rendu sur Moodle

<div class="grid grid-cols-2 gap-8 mt-4 text-left">

<div>

Un **zip** par groupe, déposé sur **Moodle** :

```text
main.go
templates/index.html
static/style.css
README.md
```

</div>

<div>

<div class="box info">
<span class="box-label">README.md</span>

En titre, le **nom du groupe**. En dessous, le **nom des élèves**.

```md
# Nom du groupe

- NOM Prénom
- NOM Prénom
- NOM Prénom
```

</div>

<div class="box trap mt-4">
<span class="box-label">Date limite</span>

**[à compléter]** · pas de fichier `.exe` dans le zip.

</div>

</div>

</div>

<!--
Un seul dépôt par groupe : un membre dépose le zip, les noms sont dans le
README.
-->

---
class: text-center
---

# À vous

<p class="big">Faites vos groupes, choisissez votre API,<br/>et ouvrez-la dans le navigateur</p>

<div class="box good mt-10 text-left">

Bloqués ? Relisez **votre** code du Pokédex : tout ce dont vous avez besoin
y est déjà.

</div>
