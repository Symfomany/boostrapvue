<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-snackbar
              v-model="snackbar"
              :bottom="'bottom'"
              :timeout="6000"
              :vertical="'vertical'"
            >
              Mauvais email ou mauvais mot de passe
              <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
            </v-snackbar>
            <v-toolbar dark color="primary" align-center justify-center>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="email"
                  prepend-icon="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>

                <v-text-field
                  type="password"
                  prepend-icon="lock"
                  v-model="password"
                  :rules="nameRules"
                  label="Mot de passe"
                  required
                  @keyup.enter.native="validate"
                ></v-text-field>

                <v-btn
                  align-center
                  justify-center
                  :disabled="!valid"
                  color="success"
                  @click="validate"
                >
                  Se connecter
                  <v-icon right dark>lock</v-icon>
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
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
        if (this.email == "admin@yahoo.fr" && this.password == "admin") {
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
