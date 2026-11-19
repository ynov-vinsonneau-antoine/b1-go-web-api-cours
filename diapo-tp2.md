---
theme: default
title: "TP 2 · Le Pokédex complet"
info: |
  ## TP · Séance 2
  Compléter la fiche Pokémon : talents, taille, statistiques, espèce,
  évolutions.
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

<div class="tag mb-6">Go · TP en groupe de 3 · 1h30</div>

# Le Pokédex complet

<p class="big">On ajoute des informations sur la fiche d'un Pokémon</p>

<div class="abs-br m-6 text-sm">
  <span class="kbd">→</span> avancer · <span class="kbd">d</span> thème clair / sombre
</div>

<!--
Présenter en 5 minutes, puis lancer le niveau 1. Présenter le niveau
suivant quand la majorité a fini.
-->

---

# Le programme

<p class="big text-left mt-4">Vous partez de <b>votre</b> projet de la séance 2.<br/>L'API : <code>https://pokeapi.co/api/v2/</code></p>

<div class="grid grid-cols-3 gap-6 mt-6 text-left">

<div class="box info">
<span class="box-label">Niveau 1</span>

- les talents
- la taille et le poids
- les statistiques

</div>

<div class="box good">
<span class="box-label">Niveau 2</span>

- la catégorie
- la description
- Légendaire ou Fabuleux

</div>

<div class="box trap">
<span class="box-label">Niveau 3</span>

- les évolutions

</div>

</div>

<!--
Ceux qui n'ont plus leur projet de la séance 2 : branche seance-2 du dépôt
de rattrapage.
-->

---

# Rappel : les types

<div class="grid grid-cols-2 gap-8 mt-4 text-left">

<div>

| Dans le JSON | En Go |
| --- | --- |
| `"pikachu"` | `string` |
| `25` | `int` |
| `true` ou `false` | `bool` |
| `0.7` | `float64` |
| `{ … }` | une struct |
| `[ … ]` | une liste `[]` |

</div>

<div>

<div class="box good">

Pour lire une information du JSON, il faut **créer un type** Go (une
struct) qui la décrit.

</div>

<div class="box trap mt-4">

Regardez le JSON **avant** d'écrire la struct.

</div>

<div class="box bad mt-4">

Un champ reste vide ? Vérifiez la **majuscule** et le **tag**
`json:"…"`.

</div>

</div>

</div>

---

# Niveau 1

<div class="grid grid-cols-2 gap-8 mt-2 text-left">

<div>

Sur la fiche, ajoutez :

1. les **talents**, avec `(caché)` pour le talent caché
2. la **taille** en mètres et le **poids** en kilos
3. les **statistiques**

Créez les **types** Go pour lire ces champs.

<div class="box info mt-4">
<span class="box-label">Sur /pokemon/1</span>

Taille : 0.7 m · Poids : 6.9 kg<br/>
overgrow<br/>
chlorophyll (caché)<br/>
hp : 45 · attack : 49 · …

</div>

</div>

<div>

`https://pokeapi.co/api/v2/pokemon/1`

```json
"abilities": [
  { "ability": { "name": "overgrow" },
    "is_hidden": false },
  { "ability": { "name": "chlorophyll" },
    "is_hidden": true }
],
"height": 7,
"weight": 69,
"stats": [
  { "base_stat": 45,
    "stat": { "name": "hp" } },
  …
]
```

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.8rem !important; line-height: 1.45 !important; }
</style>

<!--
Corrigé (testé contre la vraie API le 19/11/2026) :

type Talent struct {
	Ability  Nom  `json:"ability"`
	IsHidden bool `json:"is_hidden"`
}
type Stat struct {
	BaseStat int `json:"base_stat"`
	Stat     Nom `json:"stat"`
}
Dans Pokemon : Abilities []Talent, Height int, Weight int, Stats []Stat.
Dans PagePokemon : Taille float64, Poids float64,
remplis avec float64(pokemon.Height) / 10.

Template : {{if .IsHidden}} (caché){{end}}.
-->

---

# Niveau 1 · Indices

<div class="grid grid-cols-3 gap-6 mt-6 text-left">

<div class="box info">

`"ability"` et `"stat"` ressemblent à `"type"`. Vous avez **déjà** la
struct.

</div>

<div class="box info">

`{{if .IsHidden}}…{{end}}` affiche le texte seulement si c'est `true`.

</div>

<div class="box bad">

En Go, `7 / 10` donne **`0`**. Utilisez un `float64`.

</div>

</div>

<!--
Le piège : float64(pokemon.Height / 10) donne encore 0. Il faut convertir
avant de diviser : float64(pokemon.Height) / 10.

L'API donne la taille en décimètres et le poids en hectogrammes, d'où le
/ 10.
-->

---

# Niveau 2

<div class="grid grid-cols-2 gap-8 mt-2 text-left">

<div>

Avec l'espèce (déjà utilisée pour le nom français), ajoutez :

1. la **catégorie** en français
2. la **description** en français
3. un badge **Légendaire** ou **Fabuleux**

Créez les **types** Go pour lire ces champs.

<div class="box info mt-4">
<span class="box-label">À tester</span>

1 : « Pokémon Graine »<br/>
144 : Légendaire<br/>
151 : Fabuleux

</div>

</div>

<div>

`https://pokeapi.co/api/v2/pokemon-species/1`

```json
"is_legendary": false,
"is_mythical": false,
"genera": [
  { "genus": "Pokémon Graine",
    "language": { "name": "fr" } },
  …
],
"flavor_text_entries": [
  { "flavor_text": "Au matin de sa vie…",
    "language": { "name": "fr" } },
  …
]
```

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.8rem !important; line-height: 1.45 !important; }
</style>

<!--
Indice à donner : c'est la même boucle que nomFrancais.

Corrigé :

type Categorie struct {
	Genus    string `json:"genus"`
	Language Nom    `json:"language"`
}
type TexteDescription struct {
	FlavorText string `json:"flavor_text"`
	Language   Nom    `json:"language"`
}
Dans Espece : Genera []Categorie, FlavorTexts []TexteDescription
(tag "flavor_text_entries"), IsLegendary bool, IsMythical bool.

Deux fonctions comme nomFrancais : categorieFrancaise et
descriptionFrancaise. Pour les badges : mettre l'Espece dans PagePokemon,
puis {{if .Espece.IsLegendary}}.
-->

---

# Niveau 3

<div class="grid grid-cols-2 gap-8 mt-2 text-left">

<div>

Affichez les **évolutions**, avec un **lien** vers chaque fiche.

Créez les **types** Go pour lire ces champs.

<div class="box info mt-4">

L'adresse est dans l'espèce :

```json
"evolution_chain": {
  "url": "https://pokeapi.co/api/v2/evolution-chain/1/"
}
```

</div>

<div class="box good mt-4">

Le lien : `/pokemon/ivysaur` marche aussi.

</div>

</div>

<div>

`https://pokeapi.co/api/v2/evolution-chain/1`

```json
"chain": {
  "species": { "name": "bulbasaur" },
  "evolves_to": [
    {
      "species": { "name": "ivysaur" },
      "evolves_to": [
        {
          "species": { "name": "venusaur" },
          "evolves_to": []
        }
      ]
    }
  ]
}
```

</div>

</div>

<style>
.slidev-layout pre.slidev-code { font-size: 0.72rem !important; line-height: 1.4 !important; }
.slidev-layout .box pre.slidev-code { font-size: 0.6rem !important; }
</style>

<!--
Corrigé :

type Adresse struct {
	URL string `json:"url"`
}
Dans Espece : EvolutionChain Adresse `json:"evolution_chain"`.

type Maillon struct {
	Species   Nom       `json:"species"`
	EvolvesTo []Maillon `json:"evolves_to"`
}
type ChaineEvolution struct {
	Chain Maillon `json:"chain"`
}

func getEvolutions(espece Espece) (ChaineEvolution, error) {
	var chaine ChaineEvolution
	adresse := strings.TrimPrefix(espece.EvolutionChain.URL, "https://pokeapi.co/api/v2/")
	err := appelerAPI(adresse, &chaine)
	return chaine, err
}

Dans PagePokemon : Evolutions Maillon, rempli avec chaine.Chain.
Ne pas oublier "strings" dans les import.
-->

---

# Niveau 3 · Indices

<div class="grid grid-cols-3 gap-6 mt-6 text-left">

<div class="box info">

`evolves_to` contient des étapes, qui ont elles aussi un `evolves_to`.
La struct contient une liste **d'elle-même**.

</div>

<div class="box info">

`appelerAPI` ajoute déjà le début de l'adresse. Enlevez-le avec
`strings.TrimPrefix`.

</div>

<div class="box trap">

Testez **Évoli** (133) : 8 évolutions. Et **Artikodin** (144) : aucune.

</div>

</div>

<!--
Si un groupe bloque : dessiner l'arbre de Bulbizarre au tableau, puis
celui d'Évoli.

Template : un range dans un range, avec des listes imbriquées (ul dans
li). Avec des flèches, Évoli se lit comme une chaîne de 8 évolutions.

Pokémon testés : 1, 25 (Pichu, Pikachu, Raichu), 133, 144, et
/pokemon/ivysaur.
-->

---

# Bonus

<div class="text-left mt-6">

1. Les statistiques en **barres**
2. Une **couleur** par type
3. Des liens **Précédent** / **Suivant**
4. L'**image** de chaque évolution
5. Un **CSS** soigné

</div>

<!--
Barres : une div avec style="width: {{.BaseStat}}px".
Couleur : class="{{.Type.Name}}" et une règle CSS par type.
Précédent / Suivant : pokemon.ID - 1 et pokemon.ID + 1, calculés en Go.
Image d'une évolution : le numéro est à la fin de species.url.
-->

---

# Le rendu

<div class="grid grid-cols-2 gap-8 mt-6 text-left">

<div>

Votre **code** dans un **zip**, sur **Moodle**.

Avec un fichier `README.md` :

```md
- NOM Prénom
- NOM Prénom
- NOM Prénom
```

</div>

<div>

<div class="box trap">
<span class="box-label">Date limite</span>

**30 novembre 2026**

</div>

</div>

</div>

<!--
Un seul dépôt par groupe.
-->

---
class: text-center
---

# À vous

<p class="big">Formez des groupes de 3,<br/>et ouvrez <code>pokeapi.co/api/v2/pokemon/1</code></p>
