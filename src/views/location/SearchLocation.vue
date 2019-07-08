<template>
  <v-layout>
    <v-flex xs12>
      <div>
        <h3 class="headline mb-0">Rechercher un établissement</h3>
      </div>

      <v-form v-model="valid">
        <v-container>
          <v-layout>
            <v-flex xs12>
              <v-text-field
                v-model="search"
                :rules="searchRules"
                @keyup="(e) => debounceInput(e, this)"
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
                      <v-combobox v-model="type" :items="types" label="Type de recherche"></v-combobox>
                      <v-combobox
                        @change="changedeps"
                        v-model="dep"
                        :items="deps"
                        label="Département"
                      ></v-combobox>
                      <v-combobox v-model="etab" :items="etabs" label="Etablissement scolaire"></v-combobox>
                    </v-flex>
                  </v-layout>
                </v-container>
              </transition>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>

      <v-btn absolute dark fab bottom right color="pink">
        <v-icon>add</v-icon>
      </v-btn>
      <h3
        class="headline mb-0"
      >Résultats de la recherche: {{search.length > 2 ? etablissementsSearch.length : etablissements.length }} resultats</h3>
      <!--
          <v-data-table
          :loading="this.loading"
          select-all
          :headers="headers"
          item-key="etablissement_scolaire_id"
          :items="this.etablissements"
          :pagination.sync="pagination"
          class="elevation-1"
          xs12
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
                <router-link
                  :to="`view/${props.item.etablissement_scolaire_id}`"
                >{{ props.item.etablissement_scolaire_id }}</router-link>
              </td>
              <td>
                <router-link
                  :to="`view/${props.item.etablissement_scolaire_id}`"
                >{{ props.item.code }}</router-link>
              </td>
              <td class="text-xs-right">{{ props.item.nom }}</td>
            </tr>
          </template>
      </v-data-table>-->
      <v-progress-linear v-if="loading == true" :indeterminate="true"></v-progress-linear>
      <v-progress-linear
        color="secondary"
        v-if="loading == false && etablissementsSearch.length == 0 && search.length"
        :indeterminate="true"
      ></v-progress-linear>

      <RecycleScroller
        container-tag="table"
        content-tag="tbody"
        v-if="etablissements.length > 0 || etablissementsSearch.length > 0"
        class="scroller"
        :items="search.length > 2 ? etablissementsSearch : etablissements"
        :item-size="90"
        key-field="etablissement_scolaire_id"
      >
        <template #before>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Adresse</th>
              <th>Tel</th>
              <th>Email</th>
            </tr>
          </thead>
        </template>

        <template slot-scope="props">
          <tr class="user" :key="props.item.etablissement_scolaire_id">
            <router-link :to="`view/${props.item.etablissement_scolaire_id}`">
              <td>{{props.item.nom}}</td>
            </router-link>
            <td>{{props.item.ligne1}}</td>
            <td>{{props.item.telephone_fixe}}</td>
            <td>{{props.item.email}}</td>
          </tr>
        </template>
      </RecycleScroller>
    </v-flex>
  </v-layout>
</template>

<style scoped>
.scroller {
  width: 800px;
  height: 700px;
  overflow: auto;
  border: 1px solid #eee;
  font-size: 14px;
  padding-left: 15px;
}

.user {
  height: 90%;
  font-size: 14px;
}
.scroller td,
.scroller th {
  padding: 10px;
}
.scroller thead {
  background: #eee;
}
.scroller th {
  font-size: 18px;
  font-weight: bold;
  text-transform: capitalize;
}
.scroller tr {
  border: 1px solid #eee;
}

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
import xhr from "../../plugins/axios.js";
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { debounce } from "lodash";

import Fuse from "fuse.js";
import { setTimeout } from "timers";

const options = {
  shouldSort: true,
  threshold: 0.1,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["nom", "code", "ligne1", "email", "telephone_mobile"]
};
export default {
  name: "Search",
  components: {},
  methods: {
    changedeps() {
      xhr
        .get(`/etablissementsbydep/${this.dep}`)
        .then(response => {
          this.etabs = response.data;
          this.etab = "";
        })
        .catch(err => {});
    },
    debounceInput: debounce((e, component) => {
      if (component.search.length > 2) {
        component.etablissementsSearch = component.fuse.search(
          component.search
        );
      }
    }, 300),

    changeAdvanced() {
      this.advanced = !this.advanced;
    }
    // toggleAll() {
    //   if (this.selected.length) this.selected = [];
    //   else this.selected = this.desserts.slice();
    // },
    // changeSort(column) {
    //   if (this.pagination.sortBy === column) {
    //     this.pagination.descending = !this.pagination.descending;
    //   } else {
    //     this.pagination.sortBy = column;
    //     this.pagination.descending = false;
    //   }
    // }
  },
  computed: {
    deps() {
      const tab = ["Tous"];
      for (let i = 1; i <= 103; i++) {
        if (i < 10) {
          i = "0" + i;
        }
        tab.push(i);
      }

      tab.push("971");
      tab.push("972");
      tab.push("973");
      tab.push("974");
      return tab;
    }
  },
  created() {
    const searching = this.$search;

    xhr
      .get("/etablissements")
      .then(response => {
        this.etablissements = response.data;
        this.loading = false;
        this.fuse = new Fuse(this.etablissements, options);
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      fuse: {},
      etablissements: [],
      etablissementsSearch: [],
      advanced: false,
      valid: true,
      loading: true,
      search: "",
      select: "",
      checkbox: "",
      pagination: {
        sortBy: "nom",
        rowsPerPage: 100
      },
      // selected: [],
      types: [
        "Tous",
        "Code",
        "Nom",
        "Commune (adresse légale)",
        "Commune (adresse postale)"
      ],
      type: "",
      dep: "",
      etabs: [],
      etab: "",
      searchRules: [
        v => !!v || "Search is required",
        v => v.length <= 25 || "Search must be less than 25 characters"
      ],
      headers: [
        {
          text: "Id",
          value: "etablissement_scolaire_id"
        },
        {
          text: "Code",
          value: "code"
        },
        { text: "Nom", value: "nom" }
      ]
    };
  }
};
</script>
