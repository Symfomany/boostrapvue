<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Informations Contacts</h3>
            </div>
          </v-card-title>

          <v-card-content>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-container>
                <v-layout>
                  <v-flex xs12 md3>
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 md3>
                    <v-text-field
                      v-model="emailTwo"
                      :rules="emailTwoRules"
                      label="E-mail 2 (Facultatif)"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 md3>
                    <v-text-field
                      type="tel"
                      v-model="phone"
                      :rules="phoneRule"
                      label="Téléphone (Facultatif)"
                    ></v-text-field>
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
    email: "",
    emailTwo: "",
    phone: "",
    phoneRule: [
      v =>
        /^(\+33 |0)[1-9]([ .-]?\d\d){4}$/.test(v) ||
        !v.length ||
        "Telephone must be valid"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    emailTwoRules: [v => /.+@.+/.test(v) || !v.length || "E-mail must be valid"]
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
