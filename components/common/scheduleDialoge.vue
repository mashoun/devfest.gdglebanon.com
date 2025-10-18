<template>
  <v-dialog v-model="dialog" width="800" scrollable>
    <template v-slot:activator="{ props: activatorProps }">
      <div
        style="cursor: pointer"
        class="py-3 ma-1 fill-height"
        v-bind="activatorProps"
      >

        <p class="mb-0 h1-subheading google-font">{{ props.data.title }}</p>


      <v-chip v-if="props.data.track" small class="mt-2">
        {{ props.data.track }}
        <template v-if="speakers && speakers.length > 0">
          <span v-for="(speaker, index) in speakers" :key="index" class="ml-1">
            <span v-if="index === 0">•</span>
            <span class="ml-1" style="color: #1a73e8">👤 {{ speaker.name }}</span>
            <span v-if="index < speakers.length - 1">,</span>
          </span>
        </template>
      </v-chip> 
      </div>
    </template>

    <v-card class="pa-0 white" v-if="dialog" style="border-radius: 12px;border: 2px solid black" >
      <iframe
        v-if="props.data.link"
        class="ma-0 pa-0"
        width="100%"
        height="455"
        style="border: none"
        :src="props.data.link"
      >
      </iframe>
      <v-card-text class="px-2 google-font mt-n0">
        <v-container fluid class="py-0">
          <v-row>
            <v-col md="12" cols="12">
              <p
                class="my-2"
                style="text-align: left;font-size:25px;font-weight:500;color:black'line-height:15px"
              >
                {{ props.data.title }} Details
              </p>
              <p style="font-size: 100%">
                <!-- <span class="mr-3">{{item.timeDuration}} Min</span> -->
                <span v-if="props.data.date.length" class="mr-3"
                  ><v-icon small>mdi-calendar-month</v-icon>
                  {{ props.data.date }}</span
                >
                <span v-if="props.data.time.length" class="mr-3"
                  ><v-icon small>mdi-clock-outline</v-icon>
                  {{ props.data.time }}</span
                >

                <span>{{ props.data.timeDuration }} Min</span>
              </p>

              <p
                class="mt-5"
                style="font-size: 22px; color: black; font-weight: 500"
              >
                Overview
              </p>
              <p style="font-size: 95%; color: black; opacity: 0.9">
                {{ props.data.description }}
              </p>

              <!-- <v-chip small pill>{{ props.data.format }}</v-chip> -->
              <v-chip v-if="props.data.track" small class="mt-2">{{
                props.data.track
              }}</v-chip>

              <v-chip
                v-if="props.data.slide"
                :href="props.data.slide"
                color="indigo"
                outlined
                target="_blank"
                class="mt-2 mr-2"
                label
              >
                <v-avatar left>
                  <v-icon small>mdi-note-outline</v-icon>
                </v-avatar>
                Presentation
              </v-chip>
              <v-container fluid class="px-0 mx-0">
                <span v-for="(itemp, indexp) in speakers" :key="indexp">
                  <v-chip pill class="mt-2 mr-2" v-if="itemp">
                    <v-avatar start v-if="itemp.image">
                      <img :src="getImgUrl(itemp.image)" style="width: 100%" />
                    </v-avatar>
                    {{ itemp.name }}
                  </v-chip>
                </span>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn aria-label="close" text @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const { speakersData } = useJSONData();

let dialog = ref(false);
let speakers = ref([]);

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

onMounted(() => {
  if (props.data && props.data.speakers && Array.isArray(props.data.speakers)) {
    // Check if speakers are already objects or if they are IDs
    if (props.data.speakers.length > 0 && typeof props.data.speakers[0] === 'object') {
      // Speakers are already full objects, use them directly
      speakers.value = props.data.speakers;
    } else {
      // Speakers are IDs, look them up in speakersData
      speakers.value = props.data.speakers.map((speakerId) => {
        return speakersData.find(
          (speaker) => parseInt(speaker.id) === parseInt(speakerId)
        );
      }).filter(speaker => speaker !== undefined);
    }
  }
});

const getImgUrl = (pic, defaultimage = "avatar.png") => {
  if (pic && pic.length > 0) {
    return "/img/speakers/" + pic;
  } else {
    return "/img/common/" + defaultimage;
  }
};
</script>
