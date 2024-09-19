<template>
  <v-container fluid class="px-5 mt-8" style="background-color: #202124">
    <CommonSpeakerSocialButton :socialLinks="mainData.communityLinks" :dark="true" class="footer-icons" />
  </v-container>
</template>

<script setup>
const { mainData } = useJSONData();
</script>

<style></style>
