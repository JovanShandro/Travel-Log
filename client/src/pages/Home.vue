<template>
  <main class="full-height">
    <button class="btn logout" @click="logout">
      <img src="../assets/logout.png" alt="log_out" />
    </button>
    <button
      :class="{
        btn: true,
        add: true,
        black: !isAddModeEnabled,
        gray: isAddModeEnabled,
      }"
      @click="toggleAddMode"
    >
      +
    </button>
    <mapbox-map
      :accessToken="accessToken"
      mapStyle="dark-v10"
      @click="showAddEntryPopup"
      @dblclick="showAddEntryPopup"
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
        @close="closePopup"
      >
        <FormPopup
          :updateLogEntries="updateLogEntries"
          :coordinates="addEntryLocation"
          :handleClose="closePopup"
        />
      </mapbox-popup>
    </mapbox-map>
  </main>
</template>

<script lang="ts">
import { MapboxMap } from 'vue-mapbox-ts';
import { useLogoutMutation, LogEntriesDocument } from '@/generated/graphql';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useRouter } from 'vue-router';
import { inject, ref, onMounted } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import FormPopup from '@/components/FormPopup.vue';

export default {
  components: {
    MapboxMap,
    FormPopup,
  },
  setup() {
    useRequireAuth();
    const router = useRouter();
    const logEntries = ref<any>([]);
    const addEntryLocation = ref({ lng: null, lat: null });
    const isAddModeEnabled = ref(false);
    const { mutate } = useLogoutMutation();

    const apolloClient: any = inject(DefaultApolloClient);

    const refreshLogEntries = async () => {
      const { data } = await apolloClient.query({
        query: LogEntriesDocument,
      });
      logEntries.value = data.logEntries;
    };

    const updateLogEntries = (newValue: any) => {
      logEntries.value = [...logEntries.value, newValue];
    };

    onMounted(refreshLogEntries);

    const logout = async () => {
      await mutate();
      localStorage.removeItem('username');
      router.push('/auth');
    };

    const showAddEntryPopup = (event: any) => {
      addEntryLocation.value = { ...event.lngLat };
    };

    const toggleAddMode = () => {
      isAddModeEnabled.value = !isAddModeEnabled.value;
    };

    const closePopup = () => {
      addEntryLocation.value = { lng: null, lat: null };
    };

    return {
      open,
      closePopup,
      logout,
      logEntries,
      toggleAddMode,
      showAddEntryPopup,
      addEntryLocation,
      isAddModeEnabled,
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
      mapStyle: 'dark',
      updateLogEntries,
    };
  },
};
</script>

<style scoped>
main {
  width: 100%;
  height: 100%;
}
.btn {
  position: fixed;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  z-index: 2;
  border: 0;
  cursor: pointer;
}

.add {
  left: 20px;
  top: 80px;
  color: white;
  font-size: 35px;
  padding-bottom: 5px;
}

.logout {
  left: 20px;
  top: 20px;
  background: black;
}

.logout img {
  width: 20px;
  margin-left: 4px;
  filter: invert();
}

.gray {
  background: darkslategray;
}

.black {
  background: black;
}

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

.vanish {
  display: none;
}
</style>
