<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Welcome to Backend</h3>
              <p>Phrase: {{ phrase }} (soit {{ longeur }} avec premiere lettre "{{ firstLetter }}")</p>
              <v-text-field @keyup="changer" :value="phrase" label="Votre phrase" required></v-text-field>
              <v-btn color="error" @click="clear">Nettoyer le champ</v-btn>
              <v-btn color="warning" @click="maj">Majuscule</v-btn>
              <v-btn color="infos" @click="min">Minuscule</v-btn>
              <v-combobox
                @change="changerPays"
                v-model="pays"
                :items="itemsPays"
                label="Selectionner un pays"
              ></v-combobox>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import types from "../actions/types";

export default {
  methods: {
    ...mapActions([
      types.SENTENCE_MODIFY,
      types.SENTENCE_CLEAR,
      types.SENTENCE_MAJUSCULE,
      types.SENTENCE_MINUSCULE,
      types.SENTENCE_MANGER
    ]),
    changer(elt) {
      this.modify({ newSentence: elt.target.value });
    },
    changerPays() {
      if (this.pays == "Italie") {
        this.manger();
      }
    },
    maj() {
      this.majuscule();
    },
    min() {
      this.minuscule();
    },
    clear() {
      this.cleared();
    }
  },

  computed: {
    ...mapState(["phrase"]),
    ...mapGetters(["longeur", "firstLetter"])
  },
  data: () => ({
    itemsPays: ["France", "Espagne", "Italie", "Angleterre"],
    pays: "France",
    card_text:
      "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.",
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com"
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com"
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuetifyjs.com"
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify"
      }
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/layout/pre-defined"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ]
  })
};
</script>

<style>
</style>
