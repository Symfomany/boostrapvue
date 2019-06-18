<template>
  <v-card>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-snackbar v-model="snackbar" :bottom="'bottom'" :timeout="6000" :vertical="'vertical'">
          Mauvais email / mot de passe
          <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
        </v-snackbar>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Login</h3>
          </div>
        </v-card-title>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

          <v-text-field
            type="password"
            v-model="password"
            :counter="10"
            :rules="nameRules"
            label="Mot de passe"
            required
          ></v-text-field>

          <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    valid: true,
    password: "",
    nameRules: [
      v => !!v || "Password is required",
      v => (v && v.length <= 10) || "Password must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        if (this.email == "admin@yahoo.fr" && this.password == "test") {
          localStorage.setItem("connected", true);
          window.location.href = "/";
        } else {
          this.snackbar = true;
        }
      }
    }
  }
};
</script>
