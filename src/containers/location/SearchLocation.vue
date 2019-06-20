<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Rechercher un établissement</h3>
          </div>
        </v-card-title>

        <v-form v-model="valid">
          <v-container>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  v-model="search"
                  :rules="searchRules"
                  label="Rechercher un établissement"
                  required
                ></v-text-field>

                <v-btn color="blue-grey" class="white--text" @click="changeAdvanced()">
                  Recherche avancée
                  <v-icon right dark>build</v-icon>
                </v-btn>
                <transition name="fade">
                  <v-container transition="fade-transition" fluid v-if="advanced === true">
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-combobox v-model="select" :items="items" label="Type de recherche"></v-combobox>
                        <v-combobox v-model="select" :items="items" label="Département"></v-combobox>
                        <v-combobox v-model="select" :items="items" label="Conseils locaux"></v-combobox>
                        <v-checkbox v-model="checkbox" :label="`Conseil principal`"></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </transition>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <v-container>
          <v-layout>
            <v-flex xs12>
              <v-btn absolute dark fab bottom right color="pink">
                <v-icon>add</v-icon>
              </v-btn>
              <h3 class="headline mb-0">Résultats de la recherche</h3>
              <v-data-table
                :loading="true"
                select-all
                :headers="headers"
                item-key="name"
                :items="desserts"
                :pagination.sync="pagination"
                class="elevation-1"
              >
                <template v-slot:headers="props">
                  <tr>
                    <th>
                      <v-checkbox
                        :input-value="props.all"
                        :indeterminate="props.indeterminate"
                        primary
                        hide-details
                        @click.stop="toggleAll()"
                      ></v-checkbox>
                    </th>
                    <th
                      v-for="header in props.headers"
                      :key="header.id"
                      :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                      @click="changeSort(header.value)"
                    >
                      <v-icon small>arrow_upward</v-icon>
                      {{ header.text }}
                    </th>
                  </tr>
                </template>

                <template v-slot:items="props">
                  <tr :active="props.selected" @click="props.selected = !props.selected">
                    <td>
                      <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
                    </td>

                    <td>
                      <router-link :to="`view/${props.item.id}`">{{ props.item.name }}</router-link>
                    </td>
                    <td class="text-xs-right">{{ props.item.id }}</td>
                    <td class="text-xs-right">{{ props.item.calories }}</td>
                    <td class="text-xs-right">{{ props.item.iron }}</td>
                    <td>X</td>
                    <td>X</td>
                    <td>X</td>
                  </tr>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  overflow-y: hidden;
  max-height: 500px; /* approximate max height */

  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.04, 1.07, 0.57, 0.97);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  max-height: 0;
}
</style>


<script>
export default {
  name: "Search",
  components: {},
  methods: {
    changeAdvanced() {
      this.advanced = !this.advanced;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.desserts.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  },
  created() {
    fetch("http://localhost:3000/conseils")
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      advanced: false,
      valid: true,
      search: "",
      pagination: {
        sortBy: "name"
      },
      selected: [],
      items: ["Programming", "Design", "Vue", "Vuetify"],
      searchRules: [
        v => !!v || "Search is required",
        v => v.length <= 25 || "Search must be less than 25 characters"
      ],

      headers: [
        {
          id: 1,
          text: "Nom",
          value: "name"
        },
        { id: 2, text: "Id", value: "id" },
        { id: 3, text: "CL Principal", value: "CL Principal" },
        {
          id: 4,
          text: "Parent Principal - Nom",
          value: "Parent Principal - Nom"
        },
        {
          id: 5,
          text: "Parent Principal - Prénom",
          value: "Parent Principal - Prénom"
        },
        { id: 8, text: "Abonné", value: "Abonné" },
        { id: 9, text: "Adhérent", value: "Adhérent" }
      ],
      desserts: [
        {
          id: 1,
          name: "Frozen Yogurt",
          protein: 4.0,
          iron: "1%"
        },
        {
          id: 2,
          name: "Ice cream sandwich",
          protein: 4.3,
          iron: "1%"
        },
        {
          id: 3,
          name: "Eclair",
          protein: 6.0,
          iron: "7%"
        },
        {
          id: 4,
          name: "Cupcake",
          protein: 4.3,
          iron: "8%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 1,
          name: "Frozen Yogurt",
          protein: 4.0,
          iron: "1%"
        },
        {
          id: 2,
          name: "Ice cream sandwich",
          protein: 4.3,
          iron: "1%"
        },
        {
          id: 3,
          name: "Eclair",
          protein: 6.0,
          iron: "7%"
        },
        {
          id: 4,
          name: "Cupcake",
          protein: 4.3,
          iron: "8%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 1,
          name: "Frozen Yogurt",
          protein: 4.0,
          iron: "1%"
        },
        {
          id: 2,
          name: "Ice cream sandwich",
          protein: 4.3,
          iron: "1%"
        },
        {
          id: 3,
          name: "Eclair",
          protein: 6.0,
          iron: "7%"
        },
        {
          id: 4,
          name: "Cupcake",
          protein: 4.3,
          iron: "8%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 1,
          name: "Frozen Yogurt",
          protein: 4.0,
          iron: "1%"
        },
        {
          id: 2,
          name: "Ice cream sandwich",
          protein: 4.3,
          iron: "1%"
        },
        {
          id: 3,
          name: "Eclair",
          protein: 6.0,
          iron: "7%"
        },
        {
          id: 4,
          name: "Cupcake",
          protein: 4.3,
          iron: "8%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 1,
          name: "Frozen Yogurt",
          protein: 4.0,
          iron: "1%"
        },
        {
          id: 2,
          name: "Ice cream sandwich",
          protein: 4.3,
          iron: "1%"
        },
        {
          id: 3,
          name: "Eclair",
          protein: 6.0,
          iron: "7%"
        },
        {
          id: 4,
          name: "Cupcake",
          protein: 4.3,
          iron: "8%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        },
        {
          id: 5,
          name: "Gingerbread",
          protein: 3.9,
          iron: "16%"
        }
      ]
    };
  }
};
</script>
