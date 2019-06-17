<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <!-- <span>Vuetify</span> -->
        <v-img :src="require('./assets/jetpulp.png')" class="my-4" contain height="150"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-2" color="error">Deconnexion</v-btn>
    </v-toolbar>

    <v-content>
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

<script>
import Main from "./components/Main";
import Menu from "./components/Menu";

export default {
  name: "App",
  components: {
    Main,
    Menu
  },
  data() {
    return {
      //
    };
  }
};
</script>
