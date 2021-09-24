import { InjectionKey } from '@vue/composition-api';
import { inject, provide, reactive } from 'vue';

interface AuthStore {
  user: string | null;
}

export const authStoreSymbol: InjectionKey<AuthStore> = Symbol('auth_state');
export const createAuthStore = () =>
  reactive<AuthStore>({ user: localStorage.getItem('username') });

export const useAuthStore = (): AuthStore =>
  inject(authStoreSymbol) as AuthStore;
export const provideState = () => provide(authStoreSymbol, createAuthStore());
