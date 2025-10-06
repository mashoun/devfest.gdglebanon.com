<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row
      v-for="(item, index) in sponsorsData"
      :key="index"
      class="google-font mb-5 mt-0"
    >
      <v-col md="12" cols="12" class="mb-n1"
        ><b>{{ item.category_name }}</b></v-col
      >
      <v-col
        md="3"
        cols="6"
        sm="4"
        class="text-center"
        v-for="(sponsor, indexp) in item.sponsors"
        :key="indexp"
      >
        <div class="sponsor-card">
          <ClientOnly>
            <v-tooltip location="bottom" :key="indexp">
              <template v-slot:activator="{ props }">
                <a 
                  aria-label="sponsor name" 
                  :href="sponsor.link" 
                  target="_blank" 
                  v-bind="props"
                  class="sponsor-link"
                >
                  <div class="sponsor-content">
                    <div class="logo-container">
                      <v-img 
                        alt="sponsor-logo" 
                        :src="'/img/sponsors/' + sponsor.logo"
                        class="sponsor-logo"
                        contain
                      ></v-img>
                    </div>
                    <div 
                      v-if="sponsor.level && sponsor.level.trim() !== ''" 
                      class="sponsor-level"
                      :class="[
                        item.category_name === 'Partners' ? 'level-partner' : 'level-' + (sponsor.level || '').toString().toLowerCase().trim()
                      ]"
                    >
                      {{ sponsor.level }}
                    </div>
                  </div>
                </a>
              </template>
              <span>{{ sponsor.name }}</span>
            </v-tooltip>
          </ClientOnly>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const { sponsorsData } = useJSONData();
</script>

<style scoped>
.sponsor-card {
  background-color: #F3F3F3;
  border-radius: 15px;
  border: 1.5px solid black;
  min-height: 200px;
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

.sponsor-link {
  display: flex;
  width: 100%;
  height: 100%;
  text-decoration: none;
}

.logo-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.sponsor-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.sponsor-logo {
  max-height: 120px;
  max-width: 100%;
  width: auto;
  height: auto;
  margin: 0 auto;
  object-fit: contain;
}

.sponsor-level {
  margin-top: 10px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: capitalize;
  position: absolute;
  bottom: 15px;
  color: #000;
}

.sponsor-level.level-gold {
  background-color: #ff9900;
  color: #000;
}

.sponsor-level.level-silver {
  background-color: #c0c0c0;
  color: #000;
}

.sponsor-level.level-bronze {
  background-color: #e06666;
  color: #fff;
}

.sponsor-level.level-partner {
  background-color: #4285f4;
  color: #fff;
}

.sponsor-level.level-host {
  background-color: #34a853;
  color: #fff;
}

/* Default style for any undefined level */
.sponsor-level:not(.level-gold):not(.level-silver):not(.level-bronze):not(.level-partner):not(.level-host) {
  background-color: #34a853;
  color: #fff;
}
</style>