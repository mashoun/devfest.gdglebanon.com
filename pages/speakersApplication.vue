<template>
  <NuxtLayout name="default">
    <v-container fluid class="mt-5">
      <v-row>
        <v-col md="12">
          <div class="d-flex justify-space-between align-center mb-4">
            <div>
              <h1>Speakers</h1>
              <p>
                Our speakers are influential leaders and allies actively involved in
                various communities within their organizations, cities, countries,
                and beyond, making a significant impact through their contributions
                and support.
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
      
      <!-- Add a call-to-action section if you want it more prominent -->
      <v-row class="mb-6">
        <v-col md="12">
          <v-card
            color="primary"
            variant="tonal"
            class="pa-4 text-center"
          >
            <v-card-title class="text-h5 mb-2">
              Interested in Speaking at DevFest Beirut?
            </v-card-title>
            <v-card-text>
              We're looking for passionate speakers to share their expertise 
              and inspire our community. This is your opportunity to Amplify Your Voice!
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                color="primary"
                variant="elevated"
                size="large"
                :href="speakerApplicationUrl"
                target="_blank"
              >
                <v-icon left>mdi-microphone</v-icon>
                Submit Speaker Application
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
const { speakersData, mainData } = useJSONData();

// Speaker application URL - you can set this in your mainData or hardcode it
const speakerApplicationUrl = computed(() => {
  // Option 1: If you have it in your mainData
  return mainData.links?.speakerApplication || 
         // Option 2: Or hardcode the URL
         'https://sessionize.com/beirut25' ||
         // Option 3: Or use a mailto link
         'mailto:info@gdglebanon.com?subject=Speaker Application';
});

definePageMeta({
  layout: false,
});


</script>

<style scoped>
.speaker-apply-btn {
  white-space: nowrap;
}

@media (max-width: 768px) {
  .d-flex.justify-space-between {
    flex-direction: column;
    align-items: flex-start !important;
  }
  
  .ml-4 {
    margin-left: 0 !important;
    margin-top: 16px;
    width: 100%;
  }
  
  .speaker-apply-btn {
    width: 100%;
  }
}
</style>