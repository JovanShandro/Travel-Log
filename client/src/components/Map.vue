<template>
  <mapbox-map
    :accessToken="accessToken"
    mapStyle="dark-v10"
    @click="showAddEntryPopup"
  >
    <template v-for="entry in logEntries" :key="entry.id">
      <mapbox-marker
        v-if="!isAddModeEnabled"
        :lngLat="[entry.longitude, entry.latitude]"
      >
        <mapbox-popup>
          <div className="popup">
            <img v-if="entry.image" :src="entry.image" :alt="entry.title" />
            <h3>{{ entry.title }}</h3>
            <p>{{ entry.comments }}</p>
            <small>
              Visited on:
              {{ new Date(+entry.visitDate).toLocaleDateString() }}
            </small>
          </div>
        </mapbox-popup>
      </mapbox-marker>
      <mapbox-marker v-else :lngLat="[entry.longitude, entry.latitude]" />
    </template>
    <mapbox-popup
      v-if="isAddModeEnabled && addEntryLocation.lng && addEntryLocation.lat"
      :lngLat="[addEntryLocation.lng, addEntryLocation.lat]"
      @close="resetAddEntryLocation"
    >
      <FormPopup />
    </mapbox-popup>
  </mapbox-map>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import FormPopup from '@/components/FormPopup.vue';

export default {
  components: {
    FormPopup,
  },
  setup() {
    const store = useStore();

    const showAddEntryPopup = (event) => {
      store.commit('setAddEntryLocation', event.lngLat);
    };

    const resetAddEntryLocation = () => {
      store.commit('setAddEntryLocation', { lng: null, lat: null });
    };

    return {
      isAddModeEnabled: computed(() => store.state.isAddModeEnabled),
      logEntries: computed(() => store.state.logEntries),
      addEntryLocation: computed(() => store.state.addEntryLocation),
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
      showAddEntryPopup,
      resetAddEntryLocation,
    };
  },
};
</script>

<style scoped>
.popup {
  min-width: 200px;
}

.popup img {
  height: 200px;
  width: auto;
  text-align: center;
  margin: 0 auto;
  display: block;
}
</style>
