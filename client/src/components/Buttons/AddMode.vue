<template>
  <button
    id="add_btn"
    :class="{
      black: !isAddModeEnabled,
      gray: isAddModeEnabled,
    }"
    @click="toggleAddMode"
  >
    +
  </button>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();

    return {
      isAddModeEnabled: computed(() => store.state.isAddModeEnabled),
      toggleAddMode: () => store.commit('toggleAddMode'),
    };
  },
};
</script>

<style scoped>
#add_btn {
  position: fixed;
  left: 20px;
  top: 80px;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  z-index: 2;
  border: 0;
  cursor: pointer;
  color: white;
  font-size: 35px;
  padding-bottom: 5px;
}

.gray {
  background: darkslategray;
}

.black {
  background: black;
}
</style>
