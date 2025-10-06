<script setup lang="ts">
import { ref, computed } from 'vue';

interface Company {
  name: string;
  designation?: string;
}

interface SocialLinks {
  [key: string]: string;
}

export interface Sponsor {
  id?: string | number;
  name: string;
  type?: string;
  level?: string;
  logo?: string;
  image?: string;
  bio?: string;
  description?: string;
  company?: Company;
  social?: SocialLinks;
}

const props = defineProps<{
  modelValue: boolean;
  sponsor: Sponsor | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const isOpen = computed<boolean>({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
});

const getLevelColor = (level?: string, type?: string): string => {
  if (level) {
    const colors: Record<string, string> = {
      'platinum': '#D4D2D0',  // Slightly darker platinum
      'gold': '#FFC107',      // More vibrant gold
      'silver': '#B0B0B0',    // Slightly darker silver
      'bronze': '#B87333',    // Richer bronze
      'partner': '#3367D6',   // Deeper blue
      'sponsor': '#2E7D32'    // Deeper green
    };
    return colors[level.toLowerCase()] || colors[type || 'sponsor'] || '#2E7D32';
  }
  return type === 'partner' ? '#3367D6' : '#2E7D32';
};

const formatLevel = (level?: string): string => {
  if (!level) return '';
  return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
};

const getSponsorType = (type?: string): string => {
  if (!type || type.toLowerCase() === 'sponsor' || type.toLowerCase() === 'partner') {
    return '';
  }
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
};

const onDialogUpdate = (value: boolean) => {
  isOpen.value = value;
  if (!value) {
    emit('update:modelValue', false);
  }
};
</script>

<template>
  <v-dialog 
    :model-value="modelValue" 
    @update:model-value="onDialogUpdate" 
    width="800"
    @keydown.esc="onDialogUpdate(false)"
  >
    <v-card
      max-width="800"
      rounded="xl"
      class="pa-4"
      :style="{
        '--level-color': getLevelColor(sponsor?.level, sponsor?.type),
        '--v-theme-surface': 'white',
        '--border-color': getLevelColor(sponsor?.level, sponsor?.type)
      }"
    >
      <v-container fluid>
        <v-row>
          <v-col md="4" cols="12">
            <div class="image-container">
              <v-img
                class="avatar mx-auto"
                :alt="sponsor?.name"
                max-width="200"
                max-height="150"
                contain
                :src="'/img/sponsors/' + (sponsor?.logo || sponsor?.image || 'default-logo.png')"
              ></v-img>
            </div>
            <div class="mt-4 text-center">
              <SpeakerSocialButton :social-links="sponsor?.social || {}" :dark="false" />
            </div>
          </v-col>
          <v-col md="8" cols="12" class="d-flex flex-column">
            <div class="d-flex align-center flex-wrap" style="gap: 1rem;">
              <h1 class="sponsor-name my-0">{{ sponsor?.name }}</h1>
              
              <!-- Level Badge -->
              <v-chip
                v-if="sponsor?.level || sponsor?.type"
                :color="getLevelColor(sponsor?.level, sponsor?.type)"
                class="level-badge"
                label
                size="small"
              >
                <v-icon start size="small" class="mr-1">mdi-medal</v-icon>
                {{ formatLevel(sponsor?.level || sponsor?.type || '') }}
              </v-chip>
            </div>
            
            <p class="mt-4" v-if="sponsor?.bio || sponsor?.description">
              {{ sponsor?.bio || sponsor?.description }}
            </p>
            
            <v-divider class="my-4"></v-divider>
            
            <div v-if="sponsor?.company?.name" class="text-body-2">
              <div class="d-flex align-center mb-2">
                <v-icon icon="mdi-domain" class="mr-2"></v-icon>
                <span>{{ sponsor.company.name }}</span>
                <span v-if="sponsor.company.designation"> - {{ sponsor.company.designation }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
      
      <v-card-actions class="px-4 pb-4">
        <v-spacer></v-spacer>
        <v-btn 
          color="primary" 
          variant="text" 
          @click="onDialogUpdate(false)"
          class="google-sans"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap');

:root {
  --google-sans: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.sponsor-name {
  font-family: var(--google-sans);
  font-size: 1.8rem;
  font-weight: 500;
  color: #202124;
  line-height: 1.2;
  word-break: break-word;
  letter-spacing: -0.02em;
}

.level-badge {
  font-family: var(--google-sans) !important;
  font-size: 0.8rem !important;
  padding: 0 12px !important;
  height: 28px !important;
  white-space: nowrap;
  flex-shrink: 0;
  margin: 0.5rem 0 !important;
  letter-spacing: 0.01em;
  text-transform: none !important;
}

p, .text-body-2 {
  font-family: var(--google-sans);
  color: #5f6368;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.01em;
}

:deep(.v-card) {
  font-family: var(--google-sans) !important;
  background-color: #FFFFFF !important;
  border: 1px solid #E0E0E0 !important;
  border-top: 4px solid var(--border-color, var(--level-color, #E0E0E0)) !important;
  transition: all 0.3s ease;
}

:deep(.v-btn) {
  font-family: var(--google-sans) !important;
  text-transform: none !important;
  letter-spacing: 0.01em;
}

/* Ensure proper spacing on mobile */
@media (max-width: 599px) {
  .sponsor-name {
    font-size: 1.5rem;
  }
  
  .level-badge {
    margin-top: 0.5rem !important;
  }
}

a {
  color: inherit;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--level-color, #1976D2);
}
</style>
