<template>
  <div>
    App
    <div>
      <div>{{ result }}</div>
      <div>{{ loading }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMeQuery } from './generated/graphql';
export default {
  setup() {
    const { result, loading } = useMeQuery();
    return {
      result,
      loading,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
