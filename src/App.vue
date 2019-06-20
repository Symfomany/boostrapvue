<template>
  <v-app>
    <v-toolbar app v-if="connected">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Norma</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="connected" class="mr-2" color="error" @click="logout">Deconnexion</v-btn>
    </v-toolbar>

    <v-content>
      <v-layout row wrap>
        <v-flex xs2 v-if="connected">
          <Menu></Menu>
        </v-flex>
        <v-flex :xs12="connected ? false : true" xs10>
          <v-container grid-list-xl text-xs-center>
            <v-layout row wrap>
              <v-breadcrumbs v-if="connected" :items="items">
                <template v-slot:divider>
                  <v-icon>forward</v-icon>
                </template>
              </v-breadcrumbs>
            </v-layout>
          </v-container>
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
  methods: {
    logout() {
      localStorage.removeItem("connected");
      window.location.href = "/";
    }
  },
  data() {
    return {
      connected: localStorage.getItem("connected"),
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
