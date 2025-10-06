<template>
  <NuxtLayout name="default">
    <!-- Dialog for Job Details -->
    <v-dialog v-if="selectedJob" v-model="jobDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <v-row align="center" no-gutters class="py-2">
            <v-col cols="auto">
              <div 
                class="mr-4 d-flex align-center justify-center" 
                style="width: 64px; height: 64px; border-radius: 50%; background: white;"
              >
                <v-img
                  :src="`/img/sponsors/${selectedJob.logo}`"
                  :alt="selectedJob.company"
                  :max-height="48"
                  :max-width="48"
                  contain
                  class="mx-auto"
                  style="object-fit: contain;"
                ></v-img>
              </div>
            </v-col>
            <v-col>
              <h3 class="text-h6 text-sm-h5">{{ selectedJob.title }}</h3>
              <div class="text-subtitle-1">{{ selectedJob.company }}</div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <div>
            <v-icon small class="mr-1">mdi-map-marker</v-icon>{{ selectedJob.location }}
            <v-icon small class="ml-4 mr-1">mdi-briefcase</v-icon>{{ selectedJob.type }}
          </div>
          <p class="mt-3">{{ selectedJob.description }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" text @click="jobDialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="flat"
            :href="selectedJob.apply_link"
            target="_blank"
            @click="jobDialog = false"
          >
            Apply Now
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog for Sponsor Details -->
    <v-dialog v-if="selectedSponsor" v-model="sponsorDialog" max-width="800px">
      <v-card
        rounded="xl"
        class="pa-4"
        :style="{
          backgroundColor: cardBackground(selectedSponsor.category_id)
        }"
      >
        <v-container fluid>
          <v-row>
            <v-col md="4" cols="12" class="text-center">
              <v-avatar size="200" class="mb-4">
                <v-img
                  :src="`/img/sponsors/${selectedSponsor.logo}`"
                  :alt="selectedSponsor.name"
                  contain
                ></v-img>
              </v-avatar>
              <v-btn
                v-if="selectedSponsor.link"
                :href="selectedSponsor.link"
                target="_blank"
                color="primary"
                class="mt-2"
              >
                Visit Website
              </v-btn>
            </v-col>
            <v-col md="8" cols="12">
              <h1 class="text-h4 mb-2">{{ selectedSponsor.name }}</h1>
              <v-chip
                v-if="selectedSponsor.level"
                :color="getLevelColor(selectedSponsor.level, selectedSponsor.category_id)"
                class="mb-4"
                label
              >
                {{ formatLevel(selectedSponsor.level) }}
              </v-chip>
              
              <p class="text-body-1 mb-4" v-if="selectedSponsor.description">
                {{ selectedSponsor.description }}
              </p>
              
              <div v-if="selectedSponsor.link" class="mt-4">
                <v-icon class="mr-2">mdi-web</v-icon>
                <a :href="selectedSponsor.link" target="_blank" class="text-decoration-none">
                  {{ new URL(selectedSponsor.link).hostname.replace('www.', '') }}
                </a>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="sponsorDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container fluid class="mt-5">
      <v-row>
        <v-col md="12">
          <h1>Job Board</h1>
          <p>
            Explore exciting career opportunities from our DevFest partners.
          </p>
          <p v-if="mobile" class="text-caption font-italic">
            Click on a card for more details.
          </p>
        </v-col>
      </v-row>
      <v-row class="mb-2">
        <v-col>
          <v-text-field
            v-model="searchQuery"
            label="Search by title or keyword or company"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            clearable
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12">
          <v-card
            v-for="(job, index) in filteredJobs"
            :key="index"
            class="mb-4 pa-2 pa-sm-3"
            outlined
            rounded="lg"
            @click="mobile ? showDetails(job) : null"
            style="border: 1.5px solid black"
          >
            <v-row align="center" no-gutters>
              <v-col cols="auto">
                <div 
                  class="ma-3 d-flex align-center justify-center" 
                  style="width: 64px; height: 64px; border-radius: 50%; background: white; cursor: pointer;"
                  @click.stop="showSponsorDetails(job)"
                >
                  <v-img
                    :src="`/img/sponsors/${job.logo}`"
                    :alt="job.company"
                    :max-height="48"
                    :max-width="48"
                    contain
                    class="mx-auto"
                    style="object-fit: contain;"
                  ></v-img>
                </div>
              </v-col>
              <v-col>
                <v-card-title class="pt-0 pb-1 px-0 text-wrap">
                  <h3 class="text-h6 text-sm-h5">{{ job.title }}</h3>
                </v-card-title>
                <v-card-subtitle class="px-0">{{ job.company }}</v-card-subtitle>
              </v-col>
            </v-row>
            <v-card-text>
              <div>
                <v-icon small class="mr-1">mdi-map-marker</v-icon>{{ job.location }}
                <v-icon small class="ml-4 mr-1">mdi-briefcase</v-icon>{{ job.type }}
              </div>
              <p v-if="!mobile" class="mt-3">{{ job.description }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                variant="flat"
                :href="job.apply_link"
                target="_blank"
                >Apply Now</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { computed } from "vue";

const { jobsData, mainData, sponsorsData } = useJSONData();
const { mobile } = useDisplay();

const searchQuery = ref("");

// Create a map of company details by company_id
const companyMap = computed(() => {
  const map = {};
  // Make sure sponsorsData is an array before iterating
  const sponsors = Array.isArray(sponsorsData) ? sponsorsData : sponsorsData?.value || [];
  
  sponsors.forEach(category => {
    if (category?.sponsors) {
      category.sponsors.forEach(company => {
        if (company?.company_id) {
          map[company.company_id] = {
            name: company.name,
            logo: company.logo,
            company_type: category.category_id === 'sponsor' ? 'sponsors' : 'partners'
          };
        }
      });
    }
  });
  return map;
});

// Enrich job data with company details
const enrichedJobs = computed(() => {
  if (!jobsData) return [];
  
  const jobs = Array.isArray(jobsData) ? jobsData : jobsData?.value || [];
  
  return jobs.map(job => {
    if (!job?.company_id) return job;
    
    const companyInfo = companyMap.value[job.company_id];
    if (!companyInfo) {
      console.warn(`No company found for company_id: ${job.company_id}`);
      return job;
    }
    
    return {
      ...job,
      company: companyInfo.name,
      logo: companyInfo.logo,
      company_type: companyInfo.company_type
    };
  });
});

const filteredJobs = computed(() => {
  if (!searchQuery.value) {
    return enrichedJobs.value;
  }
  const lowerCaseQuery = searchQuery.value.toLowerCase();
  return (enrichedJobs.value || []).filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(lowerCaseQuery);
    const descriptionMatch = job.description.toLowerCase().includes(lowerCaseQuery);
    const companyMatch = job.company.toLowerCase().includes(lowerCaseQuery);
    return titleMatch || descriptionMatch || companyMatch;
  });
});

const jobDialog = ref(false);
const sponsorDialog = ref(false);
const selectedJob = ref(null);
const selectedSponsor = ref(null);

const showDetails = (job) => {
  selectedJob.value = job;
  jobDialog.value = true;
};

const showSponsorDetails = (job) => {
  if (!job.company_id) return;
  
  // Find the sponsor in the sponsors data
  for (const category of sponsorsData) {
    const sponsor = category.sponsors?.find(s => s.company_id === job.company_id);
    if (sponsor) {
      selectedSponsor.value = {
        ...sponsor,
        category_id: category.category_id
      };
      sponsorDialog.value = true;
      break;
    }
  }
};

const cardBackground = (categoryId) => {
  if (!categoryId) return 'white';
  return categoryId === 'supporter' ? '#E8F5E9' : 
         categoryId === 'partner' ? '#E8EAF6' : 'white';
};

const formatLevel = (level) => {
  if (!level) return '';
  return level.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getLevelColor = (level, categoryId) => {
  if (categoryId === 'supporter') return '#2E8B57';
  if (categoryId === 'partner') return '#3367D6';
  if (!level) return 'primary';
  
  const levelColors = {
    'gold': '#FFC000',
    'silver': '#A0A0A0',
    'bronze': '#B87333',
    'host': '#2E8B57',
    'main supporter': '#3367D6',
    'media partner': '#D33426',
    'partner': '#34A853'
  };
  
  return levelColors[level.toLowerCase()] || 'primary';
};

definePageMeta({
  layout: false,
});

useSeoMeta({
  title: "Job Board - " + mainData.eventInfo.name + " | " + mainData.communityName,
  description: "Explore exciting career opportunities from our DevFest partners.",
});
</script>