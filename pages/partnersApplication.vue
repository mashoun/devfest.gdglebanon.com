<template>
  <NuxtLayout name="default">
    <v-container fluid class="mt-5">
      <v-row>
        <v-col md="12">
          <h1>Our Sponsors</h1>
          <p class="google-font">
            Our sponsors are innovative companies and organizations that 
            support our mission to build a thriving tech community. Their 
            partnership enables us to deliver exceptional experiences and 
            create meaningful connections within our ecosystem.
          </p>
        </v-col>
      </v-row>
      
      <!-- Sponsors display section -->
      <v-container v-if="sponsorsData && sponsorsData.length" fluid class="pa-0 mt-4">
        <CommonSponsorInfo />
      </v-container>
      
      <!-- Call-to-action section for potential sponsors -->
      <v-row class="mt-10">
        <v-col md="12">
          <v-card
            color="primary"
            variant="tonal"
            class="pa-4 text-center"
          >
            <v-card-title class="text-h5 mb-2">
              Partner with DevFest Beirut
            </v-card-title>
            <v-card-text class="google-font">
              Become a key partner for Lebanon's premier developer conference. This is a unique opportunity to elevate your brand, engage with top talent, and support the growth of the local tech ecosystem.
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                color="primary"
                variant="elevated"
                size="large"
                :href="sponsorshipUrl"
                target="_blank"
                class="google-font"
              >
                <v-icon left>mdi-handshake</v-icon>
                Become a Sponsor
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
const { sponsorsData, mainData } = useJSONData();

// Sponsorship URL - you can set this in your mainData or hardcode it
const sponsorshipUrl = computed(() => {
  return mainData.links?.sponsorship || 
         'https://docs.google.com/presentation/d/1bgb4MhIZL0HRTJRbf5VyWAQcmabX-FmFA8ySMYQloHU' ||
         'mailto:info@gdglebanon.com?subject=Sponsorship Inquiry&body=Hello, I am interested in sponsoring DevFest Beirut...';
});

definePageMeta({
  layout: false,
});
</script>

<style scoped>
/* Using the same styles as the main page */
.google-font {
  font-family: 'Google Sans', sans-serif;
  line-height: 1.6;
}

.v-card {
  border-radius: 8px;
  overflow: hidden;
}

.v-card-title {
  font-weight: 500;
}

.v-card-actions {
  padding: 0 16px 16px;
}

/* Ensure consistent spacing */
.v-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .v-card-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .v-btn {
    width: 100%;
  }
}
  
  .ml-4 {
    margin-left: 0 !important;
    margin-top: 16px;
    width: 100%;
  }
  
  .sponsor-apply-btn {
    width: 100%;
  }
</style>