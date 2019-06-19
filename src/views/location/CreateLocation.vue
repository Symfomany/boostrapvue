<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Créer un établissement</h3>
            <create></create>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Create from "../../components/Create";

export default {
  name: "CreateLocation",
  components: {
    Create
  }
};
</script>