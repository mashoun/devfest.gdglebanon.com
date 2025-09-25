<template>
  <NuxtLayout name="default">
    <!-- Dialog for Job Details -->
    <v-dialog v-if="selectedJob" v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <v-row align="center" no-gutters class="py-2">
            <v-col cols="auto">
              <v-avatar class="mr-4">
                <v-img
                  :src="`/img/${selectedJob.company_type === 'sponsor' ? 'sponsors' : 'partners'}/${selectedJob.logo}`"
                  :alt="selectedJob.company"
                ></v-img>
              </v-avatar>
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
          <v-btn color="grey" text @click="dialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="flat"
            :href="selectedJob.apply_link"
            target="_blank"
            @click="dialog = false"
          >
            Apply Now
          </v-btn>
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
                <v-avatar class="ma-3" size="64">
                  <v-img
                    :src="`/img/${job.company_type === 'sponsor' ? 'sponsors' : 'partners'}/${job.logo}`"
                    :alt="job.company"
                  ></v-img>
                </v-avatar>
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

const { jobsData, mainData } = useJSONData();
const { mobile } = useDisplay();

const searchQuery = ref("");

const filteredJobs = computed(() => {
  if (!searchQuery.value) {
    return jobsData;
  }
  const lowerCaseQuery = searchQuery.value.toLowerCase();
  return (jobsData || []).filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(lowerCaseQuery);
    const descriptionMatch = job.description.toLowerCase().includes(lowerCaseQuery);
    const companyMatch = job.company.toLowerCase().includes(lowerCaseQuery);
    return titleMatch || descriptionMatch || companyMatch;
  });
});

const dialog = ref(false);
const selectedJob = ref(null);

const showDetails = (job) => {
  selectedJob.value = job;
  dialog.value = true;
};

definePageMeta({
  layout: false,
});

useSeoMeta({
  title: "Job Board - " + mainData.eventInfo.name + " | " + mainData.communityName,
  description: "Explore exciting career opportunities from our DevFest partners.",
});
</script>