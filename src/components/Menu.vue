<template>
  <v-navigation-drawer permanent>
    <v-toolbar flat>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="https://randomuser.me/api/portraits/men/85.jpg">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile>
            <v-list-tile-title class="title">Application</v-list-tile-title>
          </v-list-tile>
        </v-list-tile-content>
      </v-list-tile>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list dense class="pt-0">
      <v-list-tile v-for="item in items" :to="item.link" :key="item.title">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Menu",
  components: {},
  data() {
    return {
      items: [
        { title: "Home", icon: "dashboard", link: "/" },
        {
          title: "Département/Conseils locaux",
          icon: "accessibility_new",
          link: "/location"
        },
        {
          title: "Adhésions/Abonnements",
          icon: "accessibility_new",
          link: "/adhesion"
        },
        {
          title: "Etablissements scolaires",
          icon: "accessibility_new",
          link: "/etablissement"
        },
        {
          title: "Promotionnels",
          icon: "accessibility_new",
          link: "/promotion"
        },
        {
          title: "Recherches et impressions",
          icon: "accessibility_new",
          link: "/impression"
        },
        {
          title: "Paramétrages",
          icon: "accessibility_new",
          link: "/parametre"
        }
      ],
      right: null
    };
  }
};
</script>
