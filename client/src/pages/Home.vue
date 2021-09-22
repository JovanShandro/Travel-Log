<template>
  <div>
    Home
    <div>
      <div>{{ result }}</div>
      <div>{{ loading }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMeQuery } from '@/generated/graphql';
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

<style></style>
