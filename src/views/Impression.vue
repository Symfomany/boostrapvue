<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="location">
                <h3 class="headline mb-0">Requêtes</h3>
                <v-btn color="success">Requêtes simples</v-btn>
                <v-btn color="success">Requêtes experts</v-btn>
              </div>

              <div class="location">
                <h3 class="headline mb-0">Impressions</h3>
                <v-btn color="success">Impressions prédéfinies</v-btn>
              </div>

              <div class="location">
                <h3 class="headline mb-0">Import/Exports</h3>
                <v-btn color="success">Export routage</v-btn>
                <v-btn color="success">Export communes</v-btn>
                <v-btn color="success">Exports Comptables</v-btn>
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
