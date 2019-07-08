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

          <v-form ref="form" v-model="valid" lazy-validation>
            <h3>Conseil Local</h3>
            <v-text-field
              v-model="commune"
              :rules="communeRules"
              label="Commune du conseil"
              required
            ></v-text-field>
            <v-select :items="noms" label="Nom du conseil"></v-select>

            <h3>Parent 1</h3>

            <v-checkbox v-model="principal" label="Principal 1" required></v-checkbox>

            <v-select :items="gender" label="Civilité"></v-select>

            <v-text-field v-model="nom" label="Nom" required></v-text-field>

            <v-text-field v-model="prenom" label="Prénom" required></v-text-field>

            <h3>Parent 2</h3>

            <v-checkbox v-model="principalTwo" label="Principal 1" required></v-checkbox>

            <v-select :items="gender" label="Civilité"></v-select>

            <v-text-field v-model="nom" label="Nom" required></v-text-field>

            <v-text-field v-model="prenom" label="Prénom" required></v-text-field>

            <h3>Adresse</h3>

            <h3>Contact</h3>

            <v-btn @click="$emit('add')" :disabled="!valid" color="success">Créer ce parent</v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    nom: "",
    prenom: "",
    principal: false,
    principalTwo: false,
    noms: ["Ecole Pri", "COL Marcel", "Lyc Antoine Charial"],
    gender: ["M.", "Mme", "Mlle"],
    valid: false,
    commune: "",
    communeRules: [v => /.+@.+/.test(v) || !v.length || "E-mail must be valid"]
  }),
  methods: {
    add() {
      //console.log("laaa");
      this.$props.add();
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  },
  created() {}
};
</script>
