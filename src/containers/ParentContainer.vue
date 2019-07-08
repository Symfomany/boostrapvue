<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Création du Parent</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Création de l'enfant</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Abonnement</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <ParentForm @add="add"/>
        </v-stepper-content>
        <v-stepper-content step="2">
          <EnfantForm/>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import ParentForm from "../components/ParentForm";
import EnfantForm from "../components/EnfantForm";

export default {
  data() {
    return {
      e1: 0
    };
  },

  methods: {
    add() {
      this.e1++;
    }
  },
  components: {
    ParentForm,
    EnfantForm
  }
};
</script>
