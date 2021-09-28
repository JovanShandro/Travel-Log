<template>
  <button class="btn logout" @click="logout">
    <img src="@/assets/logout.png" alt="log_out" />
  </button>
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    return {
      logout: () => store.dispatch('logout'),
    };
  },
};
</script>

<style scoped>
.logout {
  position: fixed;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  z-index: 2;
  border: 0;
  cursor: pointer;
  left: 20px;
  top: 20px;
  background: black;
}

.logout img {
  width: 20px;
  margin-left: 4px;
  filter: invert();
}
</style>
