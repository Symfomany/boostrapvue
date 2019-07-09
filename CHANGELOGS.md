# Commucate child props

Binded with @emmit: click="\$emit('enlarge-text')"
https://fr.vuejs.org/v2/guide/components.html#Emettre-une-valeur-avec-un-evenement

Utiliser avec v-model

# Change v-model

<input v-model="searchText">
<input v-bind:value="searchText" v-on:input="searchText = "$event.target.value">

https://fr.vuejs.org/v2/guide/components.html#Utiliser-v-model-sur-les-composants

# Change class

<div v-bind:class="[activeClass, errorClass]"></div>
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

data: {
activeClass: 'active',
errorClass: 'text-danger'
}

# Event Natif au composant

https://fr.vuejs.org/v2/guide/components-custom-events.html#Relier-des-evenements-natifs-aux-composants

# Slots

https://fr.vuejs.org/v2/guide/components-slots.html#Les-contenus-de-slot
https://fr.vuejs.org/v2/guide/components-slots.html#Contenu-par-defaut
https://fr.vuejs.org/v2/guide/components-slots.html#Les-slots-nommes

```
<a
  v-bind:href="url"
  class="nav-link"
>
  <slot></slot>
</a>
-------
<navigation-link url="/profile">
  <!-- Utilisation d'un composant dédié à l'ajout d'une icône -->
  <font-awesome-icon name="user"></font-awesome-icon>
  Mon profil
</navigation-link>

```

# Type de props

https://fr.vuejs.org/v2/guide/components-props.html#Types-des-props

# Flux de données unidirectionnel

Toutes les données forment un flux de donnée descendant unidirectionnel (« one-way-down binding ») entre la propriété enfant et la propriété parente : quand la propriété du parent est mise à jour, cela va mettre à jour celle de l’enfant mais pas l’inverse. Cela empêche un composant enfant de muter accidentellement l’état du parent, ce qui rendrait le flux de données de votre application difficile à appréhender.

https://fr.vuejs.org/v2/guide/components-props.html#Flux-de-donnees-unidirectionnel
