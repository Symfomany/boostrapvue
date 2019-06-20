<template>
  <v-layout>
    <v-flex xs12>
      <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
        <v-tab v-for="n in 3" :key="n" ripple>Item {{ n }}</v-tab>
        <v-tab-item v-for="n in 3" :key="n">
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>

      <v-card>
        <v-form ref="form" lazy-validation v-model="valid">
          <v-container>
            <v-layout>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="firstname"
                  :rules="nameRules"
                  :counter="10"
                  label="First name"
                  required
                >
                  <v-tooltip slot="append" bottom>
                    <v-icon slot="activator" color="primary" dark>home</v-icon>
                    <span>Tooltip</span>
                  </v-tooltip>
                </v-text-field>
                <span>Tooltip</span>
              </v-flex>

              <v-flex xs12 md4>
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
              </v-flex>

              <v-flex xs12 md4>
                <v-btn @click="validate" :disabled="!valid" color="success">Valider</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  name: "Create",
  data: () => ({
    active: null,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

    valid: false,
    firstname: "",
    email: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),

  methods: {
    next() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
    },
    validate() {
      if (this.$refs.form.validate()) {
        console.log("c'est ok");
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
    }
  }
};
</script>
