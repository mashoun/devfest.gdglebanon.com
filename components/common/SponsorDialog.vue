<template>
  <v-dialog v-model="isOpen" width="800" persistent>
    <v-card
      max-width="800"
      rounded="xl"
      class="pa-4"
      :style="{
        border: '2px solid black',
        backgroundColor: cardBackground,
        '--v-theme-surface': cardBackground
      }"
    >
      <v-container fluid>
        <v-row>
          <v-col md="4" cols="12">
            <div class="text-center image-container">
              <v-img alt="frame" class="frame" src="/assets/img/frame.png"></v-img>
              <v-img
                class="avatar"
                :alt="sponsor?.name"
                aspect-ratio="1"
                cover
                :src="'/img/sponsors/' + (sponsor?.logo || sponsor?.image || 'default-logo.png')"
              ></v-img>
            </div>
            <div class="mt-4 text-center">
              <SpeakerSocialButton :social-links="sponsor?.social || {}" :dark="false" />
            </div>
          </v-col>
          <v-col md="8" cols="12">
            <div class="d-flex align-center">
              <h1 class="mt-3 mb-0">{{ sponsor?.name }}</h1>
              <v-chip
                v-if="sponsor?.level"
                :color="getLevelColor(sponsor.level, sponsor?.type)"
                class="ml-4"
                label
                size="small"
              >
                {{ formatLevel(sponsor.level) }}
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
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn text @click="onDialogUpdate(false)">Close</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.image-container {
  position: relative;
  width: 80%;
  margin: 0 auto;
}

.avatar {
  width: 100%;
  height: auto;
  position: relative;
  border: 1px solid white;
}

.frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5;
}
</style>

<script setup>
import { ref, watch, computed } from 'vue';
import SpeakerSocialButton from './speakerSocialButton.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  sponsor: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(props.modelValue);

// Computed property for card background
const cardBackground = computed(() => {
  if (!props.sponsor?.type) return 'white';
  return props.sponsor.type === 'supporter' ? '#E8F5E9' : 
         props.sponsor.type === 'partner' ? '#E8EAF6' : 'white';
});

// Watch for changes in modelValue
watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal;
});

// Handle dialog update
const onDialogUpdate = (value) => {
  isOpen.value = value;
  emit('update:modelValue', value);};

const levelColors = {
  'gold': '#FFC000',
  'silver': '#A0A0A0',
  'bronze': '#B87333',
  'host': '#2E8B57',
  'main supporter': '#3367D6',
  'media partner': '#D33426',
  'partner': '#2E8B57',
  'supporter': '#2E8B57',
  'sponsor': '#4285F4'
};

const getLevelColor = (level, categoryId) => {
  if (categoryId === 'supporter') return '#2E8B57';
  if (categoryId === 'partner') return '#3367D6';
  if (categoryId === 'sponsor') return '#4285F4';
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
</script>

<style scoped>
:deep(.v-card) {
  background-color: #FFFFFF;
  border-top: 4px solid var(--level-color, #E0E0E0);
}

.v-chip {
  text-transform: capitalize;
}

a {
  color: inherit;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--level-color, #1976D2);
}
</style>
