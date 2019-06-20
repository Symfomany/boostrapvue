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
              <v-checkbox
                @change="changerSpec"
                v-model="special"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Voulez vous connaître la spécialité Lyonnaise?"
                required
              ></v-checkbox>

              <v-radio-group v-model="radioGroup">
                <v-radio
                  @change="changerNum"
                  v-for="n in 3"
                  :key="n"
                  :label="`Radio ${n}`"
                  :value="n"
                ></v-radio>
              </v-radio-group>
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
      types.SENTENCE_MANGER,
      types.SENTENCE_SPECIALITE
    ]),
    changerNum() {
      if (this.radioGroup == 2) {
        this.majuscule();
      } else if (this.radioGroup == 3) {
        this.minuscule();
      }
    },
    changerSpec() {
      if (this.special == true) {
        this.specialite();
      } else {
        this.cleared();
      }
    },
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
  created() {
    const datas = [
      {
        title: "Old Man's War",
        author: {
          firstName: "John",
          lastName: "Scalzi",
          note: 5,
          tel: "0674585649"
        }
      },
      {
        title: "The Lock Artist",
        author: {
          firstName: "Steve",
          lastName: "Hamilton",
          note: 2,
          tel: "0774585612"
        }
      },
      {
        title: "HTML5",
        author: {
          firstName: "Remy",
          lastName: "Sharp",
          note: 3,
          tel: "0174585649"
        }
      },
      {
        title: "Right Ho Jeeves",
        author: {
          firstName: "P.D",
          lastName: "Woodhouse",
          note: 1,
          tel: "0274585649"
        }
      },
      {
        title: "The Code of the Wooster",
        author: {
          firstName: "P.D",
          lastName: "Woodhouse",
          note: 4,
          tel: "0174581642"
        }
      },
      {
        title: "Thank You Jeeves",
        author: {
          firstName: "P.D",
          lastName: "Woodhouse",
          note: 3,
          tel: "0274585443"
        }
      },
      {
        title: "The DaVinci Code",
        author: {
          firstName: "Dan",
          lastName: "Brown"
        }
      },
      {
        title: "Angels & Demons",
        author: {
          firstName: "Dan",
          lastName: "Brown"
        }
      },
      {
        title: "The Silmarillion",
        author: {
          firstName: "J.R.R",
          lastName: "Tolkien"
        }
      },
      {
        title: "Syrup",
        author: {
          firstName: "Max",
          lastName: "Barry"
        }
      },
      {
        title: "The Lost Symbol",
        author: {
          firstName: "Dan",
          lastName: "Brown"
        }
      },
      {
        title: "The Book of Lies",
        author: {
          firstName: "Brad",
          lastName: "Meltzer"
        }
      },
      {
        title: "Lamb",
        author: {
          firstName: "Christopher",
          lastName: "Moore"
        }
      },
      {
        title: "Fool",
        author: {
          firstName: "Christopher",
          lastName: "Moore"
        }
      },
      {
        title: "Incompetence",
        author: {
          firstName: "Rob",
          lastName: "Grant"
        }
      },
      {
        title: "Fat",
        author: {
          firstName: "Rob",
          lastName: "Grant"
        }
      },
      {
        title: "Colony",
        author: {
          firstName: "Rob",
          lastName: "Grant"
        }
      },
      {
        title: "Backwards, Red Dwarf",
        author: {
          firstName: "Rob",
          lastName: "Grant"
        }
      },
      {
        title: "The Grand Design",
        author: {
          firstName: "Stephen",
          lastName: "Hawking"
        }
      },
      {
        title: "The Book of Samson",
        author: {
          firstName: "David",
          lastName: "Maine"
        }
      },
      {
        title: "The Preservationist",
        author: {
          firstName: "David",
          lastName: "Maine"
        }
      },
      {
        title: "Fallen",
        author: {
          firstName: "David",
          lastName: "Maine"
        }
      },
      {
        title: "Monster 1959",
        author: {
          firstName: "David",
          lastName: "Maine"
        }
      }
    ];

    const options = {
      shouldSort: true,
      threshold: 0.2, // 0: taux exact d'erreur 1: Approximative
      location: 0,
      distance: 100, // distance of leverkusen
      includeScore: true,
      maxPatternLength: 15,
      minMatchCharLength: 3,
      keys: [
        "title",
        "author.note",
        "author.tel",
        "author.firstName",
        "author.lastName"
      ]
    };
    this.$search("0674585649", datas, options).then(
      results =>
        // console.log(results)
        results
    );
  },
  computed: {
    ...mapState(["phrase"]),
    ...mapGetters(["longeur", "firstLetter"])
  },
  data: () => ({
    e1: 0,
    special: false,
    radioGroup: 1,
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
