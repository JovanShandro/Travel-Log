<template>
  <div>
    Home
    <button @click="logout">Logout</button>
    <div>
      <div>{{ result }}</div>
      <div>{{ loading }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { useLogoutMutation, useMeQuery } from '@/generated/graphql';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    useRequireAuth();
    const router = useRouter();
    const { result, loading } = useMeQuery();
    const { mutate } = useLogoutMutation();

    const logout = async () => {
      await mutate();
      localStorage.removeItem('username');
      router.push('/auth');
    };
    return {
      result,
      loading,
      logout,
    };
  },
};
</script>

<style></style>
