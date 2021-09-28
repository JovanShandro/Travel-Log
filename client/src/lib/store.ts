import { createStore } from 'vuex';
import { LogoutDocument } from '@/generated/graphql';
import apolloClient from '@/lib/apollo';
import router from '@/lib/router';

const store = createStore({
  state: {
    logEntries: [] as any[],
    addEntryLocation: { lng: null, lat: null },
    isAddModeEnabled: false,
  },
  mutations: {
    toggleAddMode: (state) => {
      state.isAddModeEnabled = !state.isAddModeEnabled;
    },
    uploadLogEntries: (state, entries) => {
      state.logEntries = [...entries];
    },
    setAddEntryLocation: (state, location) => {
      state.addEntryLocation = { ...location };
    },
    appendLogEntry: (state, entry) => {
      state.logEntries = [...state.logEntries, entry];
    },
  },
  actions: {
    logout: async () => {
      await apolloClient.mutate({
        mutation: LogoutDocument,
      });
      localStorage.removeItem('username');
      router.push('/auth');
    },
  },
});

export default store;
