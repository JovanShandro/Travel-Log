import { useRouter } from 'vue-router';

export const useRequireAuth = () => {
  const router = useRouter();

  if (!localStorage.getItem('username')) {
    router.replace('/auth');
  }
};
