<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Fiche d'un foyer</h3>
          </div>
        </v-card-title>

        <v-card-content>
          <v-container>
            <v-layout>
              <v-flex xs12>
                <p>Foyer {{ $route.params.id }}</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-content>
      </v-card>
    </v-flex>
  </v-layout>
</template>



<script>
export default {
  name: "View",
  components: {},
  methods: {},
  data() {
    return {};
  }
};
</script>
