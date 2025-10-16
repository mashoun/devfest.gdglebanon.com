<template>
  <v-app-bar
    :elevation="0"
    fixed
    class="mt-0 px-2 toolbar-class mx-auto mt-4"
    rounded="xl"
    :color="isDark ? '#2a2a2a' : '#eeeeee'"
  >
  <v-app-bar-nav-icon
      class="d-md-none d-lg-none d-sm-flex d-flex"
      @click="drawerAction"
      aria-label="Open navigation menu"
    ></v-app-bar-nav-icon>
    <NuxtLink to="/" class="px-2 toolbar-logo-link">
      <div class="d-flex">
        <v-img
          width="100"
          alt="DevFest Coast Lebanon Logo"
          src="/assets/img/devfest-logo.svg"
          class="mr-2"
        ></v-img>
        <v-chip
          variant="outlined"
          color="black"
          size="small"
          class="align-center pt-1 year-chip"
          >2025</v-chip
        >
      </div>
    </NuxtLink>

    <!-- Navigation Links -->
    <div class="mx-4 d-none d-sm-none d-md-flex d-lg-flex">
      <template v-for="(item, index) in navbarData" :key="index">
        <v-btn
          rounded
          size="small"
          class="navbar-btn mx-1"
          :to="item.path"
          v-if="item.visible"
          >{{ item.name }}</v-btn
        >
      </template>
    </div>
    
    <v-spacer></v-spacer>
    
    <!-- Right side buttons -->
    <div class="d-flex align-center">
      <!-- Theme Toggle -->
      <ClientOnly>
        <v-btn
          icon
          @click="toggleTheme"
          class="mr-2 theme-toggle"
          size="small"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <v-icon size="small">{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
        </v-btn>
      </ClientOnly>
      
      <!-- Register Button -->
      <ClientOnly>
        <v-btn
          rounded
          v-if="
            mainData &&
            mainData.eventInfo.registration.link.length &&
            new Date(mainData.eventInfo.registration.end_date) > new Date()
          "
          :href="mainData.eventInfo.registration.link"
          class="d-md-flex d-lg-flex d-sm-flex d-none register-btn ml-2"
          target="_blank"
          color="#FFD427"
          variant="flat"
          size="small"
          >Register Now</v-btn
        >
      </ClientOnly>
    </div>
    
  </v-app-bar>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { mainData, navbarData } = useJSONData();
const sidebar = useSideBar();
const { isDark, toggleTheme } = useAppTheme();
const { width, mobile } = useDisplay();

const screenWidth = ref(width);

const drawerAction = () => {
  sidebar.value = !sidebar.value;
};
</script>

<style scoped>
.toolbar-class {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  margin-bottom: 80px;
  height: 56px;
  padding: 0 8px;
}

.toolbar-logo-link {
  text-decoration: none;
  color: rgb(var(--v-theme-on-surface));
}

.year-chip {
  display: inline;
  background-color: white;
}

.navbar-btn {
  text-transform: capitalize;
}

.register-btn {
  border: 1.5px solid #1e1e1e;
  color: black;
  text-transform: capitalize;
  font-weight: 100;
}

.theme-toggle {
  transition: transform 0.2s ease;
}

.theme-toggle:hover {
  transform: rotate(15deg);
}

/* Mobile breakpoint */
@media (max-width: 700px) {
  .toolbar-class {
    max-width: 100% !important;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-top: 0 !important;
    border-radius: 0 !important;
    height: 48px;
    padding: 0 4px;
  }
}

/* Tablet and larger screens */
@media (min-width: 700px) {
  .toolbar-class {
    max-width: 1200px !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}

/* Extra spacing for large screens */
@media (min-width: 1400px) {
  .toolbar-class {
    max-width: 1400px !important;
  }
}
</style>
