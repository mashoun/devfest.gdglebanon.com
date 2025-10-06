<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row
      v-for="(item, index) in sponsorsData"
      :key="index"
      class="google-font mb-8 mt-0"
    >
      <v-col cols="12" class="mb-2">
        <h2 class="text-h5">{{ item.category_name }}</h2>
        <v-divider class="my-2"></v-divider>
      </v-col>
      
      <v-col
        v-for="(sponsor, indexp) in item.sponsors"
        :key="indexp"
        cols="6"
        md="3"
        class="pa-2"
      >
        <v-card
          :class="['sponsor-card', `category-${item.category_id}`]"
          :style="{ '--level-color': getLevelColor(sponsor.level, item.category_id) }"
          elevation="2"
          :href="sponsor.link"
          target="_blank"
          rel="noopener"
          height="100%"
        >
          <v-card-text class="text-center pa-4">
            <div class="logo-container">
              <v-img
                :src="'/img/sponsors/' + sponsor.logo"
                :alt="sponsor.name + ' logo'"
                contain
                max-height="80"
                class="mx-auto"
              />
            </div>

            <div class="sponsor-name text-subtitle-2 mt-2 google-sans">
              {{ sponsor.name }}
            </div>

            <v-chip
              v-if="sponsor.level"
              size="small"
              :color="getLevelColor(sponsor.level, item.category_id)"
              class="mt-2 text-caption font-weight-bold google-sans"
              label
              :class="getTextColorClass(sponsor.level)"
            >
              {{ formatLevel(sponsor.level) }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const { sponsorsData } = useJSONData();

const levelColors = {
  'gold': '#FFC000',
  'silver': '#A0A0A0',
  'bronze': '#B87333',
  'host': '#2E8B57',
  'main supporter': '#3367D6',
  'media partner': '#D33426',
  'partner': '#2E8B57'
};

const getLevelColor = (level, categoryId) => {
  // Return category-based colors first
  if (categoryId === 'supporter') return '#2E8B57'; // Green for supporters
  if (categoryId === 'partner') return '#3367D6';   // Blue for partners
  
  // Fall back to level-based colors for other categories
  if (!level) return 'primary';
  const lowerLevel = level.toLowerCase();
  return levelColors[lowerLevel] || 'primary';
};

const formatLevel = (level) => {
  if (!level) return '';
  // Convert to title case
  return level.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getTextColorClass = (level) => {
  if (!level) return 'text-white';
  const lowerLevel = level.toLowerCase();
  // Return dark text for light backgrounds and vice versa
  return ['gold', 'silver', 'bronze'].includes(lowerLevel) 
    ? 'text-dark' 
    : 'text-white';
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
  letter-spacing: 0.25px;
}
.sponsor-card {
  background-color: #FFFFFF;
  border-radius: 8px;
  border-top: 4px solid var(--level-color, #E0E0E0);
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin: 0 auto;
}

.v-img {
  max-height: 80px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  margin: 0 auto;
}

h2.text-h5 {
  font-family: var(--google-sans);
  font-weight: 500;
  color: #202124;
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.2;
}

.v-chip {
  font-size: 0.7rem;
  letter-spacing: 0.5px;
  height: 28px;
  margin: 0.5rem auto 0;
  text-transform: uppercase;
  font-weight: 600;
  min-width: 100px;
  max-width: 120px;
  justify-content: center;
  border-radius: 20px;
  padding: 0 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}

.v-chip:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0,0,0,0.15);
}

.sponsor-logo {
  max-height: 80px;
  max-width: 100%;
  width: auto;
  height: auto;
  margin: 0 auto;
  object-fit: contain;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .logo-container {
    min-height: 80px;
  }
  
  .v-img {
    max-height: 60px;
  }
}

/* Sponsor level chips */
.v-chip {
  --level-gold: #FFD700;
  --level-silver: #C0C0C0;
  --level-bronze: #CD7F32;
  --level-host: #34A853;
  --level-partner: #4285F4;
  --level-media-partner: #EA4335;
}

.v-chip[color="gold"] {
  background-color: var(--level-gold);
  border-color: var(--level-gold);
  color: #000;
}

.v-chip[color="silver"] {
  background-color: var(--level-silver);
  border-color: var(--level-silver);
  color: #000;
}

.v-chip[color="bronze"] {
  background-color: var(--level-bronze);
  border-color: var(--level-bronze);
  color: #fff;
}

.v-chip[color*="host"] {
  background-color: var(--level-host);
  border-color: var(--level-host);
  color: #fff;
}

.v-chip[color*="partner"] {
  background-color: var(--level-partner);
  border-color: var(--level-partner);
  color: #fff;
}

.v-chip[color*="media"] {
  background-color: var(--level-media-partner);
  border-color: var(--level-media-partner);
  color: #fff;
}

/* Default style for any undefined level */
.sponsor-level:not(.level-gold):not(.level-silver):not(.level-bronze):not(.level-partner):not(.level-host) {
  background-color: #34a853;
  color: #fff;
}
</style>