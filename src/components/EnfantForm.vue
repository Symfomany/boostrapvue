<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Création d'enfant</h3>
            </div>
          </v-card-title>

          <v-form ref="form" v-model="valid" lazy-validation>
            <h3>Information</h3>
            <v-text-field
              v-model="commune"
              :rules="communeRules"
              label="Commune du conseil"
              required
            ></v-text-field>
            <v-select :items="noms" label="Nom du conseil"></v-select>

            <h3>Etablissement scolaire</h3>
            <v-select :items="gender" label="Civilité"></v-select>

            <h3>Liste des enfants</h3>

            <v-btn :disabled="!valid" color="success" @click="validate">Créer ce parent</v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    noms: ["Ecole Pri", "COL Marcel", "Lyc Antoine Charial"],
    gender: ["M.", "Mme", "Mlle"],
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
