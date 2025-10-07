<template>
  <v-container fluid class="px-0 mx-0" style="max-width: 100%; overflow-x: hidden;">
    <v-row justify="center" align="center" class="mx-0">
      <v-col md="6" sm="6" cols="12" class="px-4 px-sm-6">
        <h1 class="responsive-h1 my-4">
          DevFest <br />
          {{ mainData.communityLocation.city }} 2025
        </h1>
        <p class="" :style="{ maxWidth: '90%' }">
          {{ mainData.eventInfo.description.short }}
        </p>

        <p class="my-5">
          <span class="mr-4">
            <v-icon class="mr-1">mdi-calendar-month</v-icon>
            {{ mainData.eventInfo.date }}
          </span>

          <span class="mr-4">
            <v-icon class="mr-1">mdi-map-legend</v-icon>
            <a :href="mainData.eventInfo.venue.map_link" target="_blank" style="color:black">
              {{ mainData.eventInfo.venue.address }}
            </a>
            
          </span>
        </p>

        <v-btn
          rounded
          size="large"
          color="#FFD427"
          v-if="
            mainData.eventInfo &&
            mainData.eventInfo.registeration.link.length &&
            new Date(mainData.eventInfo.registeration.end_date) > new Date()
          "
          :href="mainData.eventInfo.registeration.link"
          class="my-4 mt-3"
          target="_blank"
          style="border: 1.5px solid #1e1e1e; color: black"
          variant="flat"
          >Register Now</v-btn
        >
      </v-col>
      <v-col md="6" sm="6" cols="12" class="px-0">
        <v-img
          alt="logo"
          src="assets/img/hero-image.png"
          lazy-src="assets/img/hero-image.png"
          :width="mobile ? '100%' : 'auto'"
          :height="mobile ? 'auto' : '100%'"
          contain
          class="mx-auto"
          style="max-width: 100%;"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { width, mobile } = useDisplay();
const screenWidth = ref(width);
const { mainData } = useJSONData();
</script>

<style scoped>
:deep(.v-container) {
  padding-left: 0;
  padding-right: 0;
  margin: 0;
  max-width: 100%;
}

.responsive-h1 {
  font-size: 250%;
  line-height: 100%;
  word-break: break-word;
  padding-right: 16px;
}

/* Media query for screens larger than 600px */
@media (min-width: 600px) {
  .responsive-h1 {
    font-size: 300%;
    padding-right: 0;
  }
  
  :deep(.v-container) {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
