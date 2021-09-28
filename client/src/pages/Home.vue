<template>
  <main class="full-height">
    <LogoutButton />
    <AddModeButton />
    <MapboxMap />
  </main>
</template>

<script lang="ts">
import { LogEntriesDocument } from '@/generated/graphql';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { onMounted } from 'vue';
import MapboxMap from '@/components/Map.vue';
import AddModeButton from '@/components/Buttons/AddMode.vue';
import LogoutButton from '@/components/Buttons/Logout.vue';
import apolloClient from '@/lib/apollo';
import { useStore } from 'vuex';

export default {
  components: {
    MapboxMap,
    LogoutButton,
    AddModeButton,
  },
  setup() {
    useRequireAuth();
    const store = useStore();

    onMounted(async () => {
      const { data } = await apolloClient.query({
        query: LogEntriesDocument,
      });
      store.commit('uploadLogEntries', data.logEntries);
    });

    return {};
  },
};
</script>

<style scoped>
main {
  width: 100%;
  height: 100%;
}
</style>
