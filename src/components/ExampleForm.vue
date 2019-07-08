<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Création de Parents</h3>
            </div>
          </v-card-title>

          <v-card-content>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-container>
                <v-layout>
                  <v-flex xs12 md3>
                    <v-text-field v-model="commune" :rules="communeRules" label="Commune" required></v-text-field>
                  </v-flex>

                  <v-btn :disabled="!valid" color="success" @click="validate">Soumettre ce contact</v-btn>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-content>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    commune: "",
    communeRules: [v => /.+@.+/.test(v) || !v.length || "E-mail must be valid"]
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  },
  created() {}
};
</script>
