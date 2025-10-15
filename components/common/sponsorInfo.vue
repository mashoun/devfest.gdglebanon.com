<template>
  <v-container fluid class="pa-0 ma-0" style="max-width: 100%; overflow-x: hidden;">
    <div v-for="(item, index) in sponsorsData || []" :key="index" class="mb-8">
      <v-row class="google-font mx-0">
        <v-col cols="12" class="py-0 px-4">
          <h2 class="text-h5 mb-1 text-left" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ item.category_name }}</h2>
          <v-divider class="mb-3"></v-divider>
        </v-col>
      </v-row>
      
      <v-row class="mt-0 mx-0 sponsor-grid" style="width: 100%;">
        <v-col
          v-for="(sponsor, indexp) in item.sponsors"
          :key="indexp"
          cols="6"
          md="3"
          class="pa-1 pa-sm-2"
          style="flex: 0 0 auto; max-width: 50%;"
        >
        <v-card
          :class="['sponsor-card', `category-${item.category_id}`]"
          :style="{ '--level-color': getLevelColor(sponsor.level, item.category_id) }"
          elevation="2"
          @click="() => openDialog({ ...sponsor, type: item.category_id })"
          class="d-flex flex-column"
          style="cursor: pointer; width: 100%;"
        >
          <v-card-text class="text-center pa-3 d-flex flex-column flex-grow-1">
            <div class="logo-container flex-grow-1 d-flex align-center justify-center" style="min-height: 80px; width: 100%; overflow: hidden;">
              <v-img
                :src="'/img/sponsors/' + (sponsor.logo || sponsor.image)"
                :alt="sponsor.name + ' logo'"
                contain
                max-height="80"
                max-width="60%"
                class="mx-auto"
                style="object-fit: contain; width: auto; height: auto;"
              />
            </div>

            <div class="sponsor-name text-subtitle-2 mt-2 google-sans">
              {{ sponsor.name }}
            </div>

            <div class="mt-auto pt-2">
              <v-chip
                v-if="sponsor.level"
                size="small"
                :color="getLevelColor(sponsor.level, item.category_id)"
                variant="flat"
                density="comfortable"
                class="text-caption font-weight-bold google-sans mx-auto"
                :text-color="getTextColorClass(sponsor.level)"
                label
                :class="getTextColorClass(sponsor.level)"
                style="min-width: 80px;"
              >
                {{ formatLevel(sponsor.level) }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
        </v-col>
      </v-row>
    </div>
    
    <sponsor-dialog
      v-model="dialog"
      :sponsor="selectedSponsor"
    />
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useJSONData } from '~/composables/useJSONData';
import SponsorDialog from './SponsorDialog.vue';

const { sponsorsData } = useJSONData();

const selectedSponsor = ref(null);
const dialog = ref(false);

const openDialog = (sponsor) => {
  // Ensure we have all necessary data
  const sponsorData = {
    ...sponsor,
    // Ensure we have a type (category_id) and level
    type: sponsor.type || 'sponsor',
    level: sponsor.level || 'sponsor',
    // Ensure we have a logo path
    logo: sponsor.logo || sponsor.image
  };
  selectedSponsor.value = sponsorData;
  dialog.value = true;
};


const levelColors = {
  'gold': '#ff9900',  /* Vibrant orange-gold */
  'silver': '#a0a0a0',  /* Darker, more vibrant silver */
  'bronze': '#e06666',  /* Warm coppery bronze */
  'host': '#00C853',  /* Brighter green */
  'partner': '#2962FF',  /* Brighter blue */
  'media partner': '#FF3D00'  /* Brighter red */
};

const getLevelColor = (level, categoryId) => {
  if (categoryId === 'supporter') return '#2E8B57';
  if (categoryId === 'partner') return '#3367D6';
  if (!level) return 'primary';
  const lowerLevel = level.toLowerCase();
  return levelColors[lowerLevel] || 'primary';
};

const formatLevel = (level) => {
  if (!level) return '';
  return level.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getTextColorClass = (level) => {
  if (!level) return '';
  const lowerLevel = level.toLowerCase();
  // Only silver will have black text, others will have white text for better contrast
  return 'white--text';
};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap');

:root {
  --google-sans: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

:deep(.v-application) {
  font-family: var(--google-sans);
}

.google-sans {
  font-family: var(--google-sans);
}
.sponsor-card {
  background-color: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #E0E0E0;
  border-top: 4px solid var(--level-color, #E0E0E0);
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin: 0;
  max-width: 100%;
}

.sponsor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
}

/* Category-based styling */
.category-sponsor .sponsor-card {
  border-top-color: var(--level-color, #4285F4);
}

/* Main Supporters - Green theme */
.category-supporter .sponsor-card {
  --level-color: #2E8B57;
  border-top-color: #2E8B57 !important;
  background-color: #FFFFFF;
}

.category-supporter .v-chip {
  background-color: #2E8B57 !important;
  color: white !important;
  border: none !important;
}

/* Force green color for all supporter levels */
.category-supporter .sponsor-card[style*="--level-color"] {
  border-top-color: #2E8B57 !important;
}

/* Partners - Blue theme */
.category-partner .sponsor-card {
  --level-color: #3367D6;
  border-top-color: #3367D6 !important;
  background-color: #FFFFFF;
}

.category-partner .v-chip {
  background-color: #3367D6 !important;
  color: white !important;
}

/* Override level colors for specific categories */
.category-supporter .sponsor-card .v-chip,
.category-partner .sponsor-card .v-chip {
  --level-color: inherit !important;
}

.logo-container {
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  margin-bottom: 8px;
  width: 100%;
}

.v-img {
  max-height: 80px;
  width: auto;
  max-width: 60%;
  object-fit: contain;
  margin: 0 auto;
}

h2.text-h5 {
  font-family: var(--google-sans);
  font-weight: 500;
  color: #202124;
  line-height: 1.2;
  margin: 8px 0;
  word-break: break-word;
  min-height: 2.4em;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  padding: 0 8px;
}

.v-chip {
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  margin: 0.75rem auto 0;
  text-transform: uppercase;
  font-weight: 700;
  min-width: 130px;
  max-width: 180px;
  height: 36px;
  justify-content: center;
  border-radius: 18px;
  padding: 0 22px;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  box-shadow: none !important;
}

.v-chip:hover {
  transform: translateY(-1px);
}

.v-chip:active {
  transform: translateY(0);
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .sponsor-grid .v-col {
    flex: 0 0 50%;
    max-width: 50%;
    padding-left: 8px;
    padding-right: 8px;
  }
  
  .v-container {
    padding-left: 8px;
    padding-right: 8px;
  }
  
  .sponsor-card {
    height: 100%;
  }
  
  .logo-container {
    min-height: 60px;
    padding: 4px;
  }
  
  .sponsor-name {
    font-size: 0.8125rem;
    min-height: 2.2em;
  }
  
  .v-chip {
    font-size: 0.7rem !important;
    height: 22px !important;
  }
}

@media (max-width: 600px) {
  .v-col {
    padding: 6px !important;
  }
  
  .sponsor-card {
    padding: 8px 0;
  }
  
  .logo-container {
    min-height: 50px;
  }
  
  .sponsor-name {
    font-size: 0.75rem;
    min-height: 2em;
    margin: 4px 0;
  }
  
  .v-chip {
    font-size: 0.7rem !important;
    height: 30px !important;
    min-width: 110px !important;
    padding: 0 16px !important;
  }
}

.v-chip[color="gold"] {
  background-color: var(--level-gold);
  color: #FFFFFF;
}

.v-chip[color="silver"] {
  background-color: var(--level-silver);
  color: #FFFFFF;
}

.v-chip[color="bronze"] {
  background-color: var(--level-bronze);
  color: #FFFFFF;
}

.v-chip[color="host"] {
  background-color: var(--level-host);
  color: #FFFFFF;
}

.v-chip[color="partner"] {
  background-color: var(--level-partner);
  color: #FFFFFF;
}

.v-chip[color="media-partner"] {
  background-color: var(--level-media-partner);
  color: #FFFFFF;
}

/* Default style for any undefined level */
.sponsor-level:not(.level-gold):not(.level-silver):not(.level-bronze):not(.level-partner):not(.level-host) {
  background-color: #34a853;
}
</style>