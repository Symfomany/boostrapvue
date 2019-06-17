<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="location">
                <h3 class="headline mb-0">Département/Conseils locaux</h3>

                <v-btn color="success" to="/location/search">Recherche CDPE/CL</v-btn>
                <v-btn color="success" to="/location/create">Création CDPE/CL</v-btn>

                <router-view></router-view>
              </div>

              <p></p>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
