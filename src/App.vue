<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Norma</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-2" color="error">Deconnexion</v-btn>
    </v-toolbar>

    <v-content>
      <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>

      <v-layout row wrap>
        <v-flex xs2>
          <Menu></Menu>
        </v-flex>
        <v-flex xs10>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-content>

    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>


<style>
</style>


<script>
import Menu from "./components/Menu";

export default {
  name: "App",
  components: {
    Menu
  },
  data() {
    return {
      items: [
        {
          text: "Dashboard",
          disabled: false,
          href: "/"
        },
        {
          text: "Location",
          disabled: false,
          href: "/location"
        },
        {
          text: "Rechercher des location",
          disabled: true,
          href: "/location/search"
        }
      ]
    };
  }
};
</script>
