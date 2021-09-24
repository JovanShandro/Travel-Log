import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';
import { watchEffect } from 'vue';

export const useRequireAuth = () => {
  const router = useRouter();
  const authStore = useAuthStore();

  watchEffect(() => {
    console.log('UseReqAuth: ', authStore);
    if (!authStore.user) {
      router.replace('/auth');
    }
  });
};
