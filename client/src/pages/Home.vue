<template>
  <main class="full-height">
    <button class="logout" @click="logout">
      <img src="../assets/logout.png" alt="log_out" />
    </button>
    <mapbox-map :accessToken="accessToken" mapStyle="light-v10">
      <mapbox-marker
        v-for="entry in logEntries"
        :lngLat="[entry.longitude, entry.latitude]"
        :key="entry.id"
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
    </mapbox-map>
  </main>
</template>

<script lang="ts">
import { MapboxMap } from 'vue-mapbox-ts';
import { useLogoutMutation, LogEntriesDocument } from '@/generated/graphql';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue-demi';
import { inject, ref } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';

export default {
  components: {
    MapboxMap,
  },
  setup() {
    useRequireAuth();
    const router = useRouter();
    const logEntries = ref([]);
    const { mutate } = useLogoutMutation();

    const apolloClient: any = inject(DefaultApolloClient);

    onMounted(async () => {
      const { data } = await apolloClient.query({
        query: LogEntriesDocument,
      });
      logEntries.value = data.logEntries;
    });

    const logout = async () => {
      await mutate();
      localStorage.removeItem('username');
      router.push('/auth');
    };

    return {
      logout,
      logEntries,
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
      mapStyle: 'dark',
    };
  },
};
</script>

<style scoped>
main {
  width: 100%;
  height: 100%;
}
.logout {
  position: fixed;
  left: 20px;
  top: 20px;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  z-index: 2;
  background: black;
  border: 0;
}

.logout img {
  width: 20px;
  margin-left: 4px;
  filter: invert();
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
</style>
