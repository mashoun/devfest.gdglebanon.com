<template>
  <NuxtLayout name="default">
    <v-container fluid class="mt-5">
      <v-row>
        <v-col md="12">
          <div class="d-flex justify-space-between align-center mb-4">
            <div>
              <h1>Sponsors</h1>
              <p>
                Our sponsors are innovative companies and organizations that 
                support our mission to build a thriving tech community. Their 
                partnership enables us to deliver exceptional experiences and 
                create meaningful connections within our ecosystem.
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
      
      <!-- Call-to-action section for potential sponsors -->
      <v-row class="mb-6">
        <v-col md="12">
          <v-card
            color="primary"
            variant="tonal"
            class="pa-4 text-center"
          >
            <v-card-title class="text-h5 mb-2">
              Partner with DevFest Beirut
            </v-card-title>
            <v-card-text>
              Become a key partner for Lebanon's premier developer conference. This is a unique opportunity to elevate your brand, engage with top talent, and support the growth of the local tech ecosystem. 
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                color="primary"
                variant="elevated"
                size="large"
                :href="sponsorshipUrl"
                target="_blank"
              >
                <v-icon left>mdi-handshake</v-icon>
                Become a Sponsor
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Sponsors display section -->
      <v-row v-if="sponsorsData && sponsorsData.length">
        <v-col md="2" sm="3" cols="6" v-for="(sponsor, index) in sponsorsData" :key="index">
          <common-sponsor-card :data="sponsor" />
        </v-col>
      </v-row>
      
      <!-- Empty state if no sponsors yet -->
      <v-row v-else>
        <v-col md="12" class="text-center py-8">
          <v-icon size="64" color="grey-lighten-1">mdi-office-building</v-icon>
          <h3 class="mt-4 mb-2 text-grey-darken-1">Sponsorship Opportunities Available</h3>
          <p class="text-grey-darken-1">
            We're currently seeking amazing sponsors to join our event. 
            Be part of something special!
          </p>
          <v-btn
            color="primary"
            variant="outlined"
            :href="sponsorshipUrl"
            target="_blank"
            class="mt-2"
          >
            <v-icon left>mdi-email</v-icon>
            Contact Us About Sponsorship
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
const { sponsorsData, mainData } = useJSONData();

// Sponsorship URL - you can set this in your mainData or hardcode it
const sponsorshipUrl = computed(() => {
  // Option 1: If you have it in your mainData
  return mainData.links?.sponsorship || 
         // Option 2: Or hardcode the URL
         'https://docs.google.com/presentation/d/1bgb4MhIZL0HRTJRbf5VyWAQcmabX-FmFA8ySMYQloHU' ||
         // Option 3: Or use a mailto link
         'mailto:info@gdglebanon.com?subject=Sponsorship Inquiry&body=Hello, I am interested in sponsoring DevFest Beirut...';
});

definePageMeta({
  layout: false,
});
</script>

<style scoped>
.sponsor-apply-btn {
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
  
  .sponsor-apply-btn {
    width: 100%;
  }
}
</style>